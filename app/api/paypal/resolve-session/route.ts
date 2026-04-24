import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  getPayPalCaptureDetails,
  getPayPalOrderDetails,
} from "@/lib/paypal-expanded";
import {
  getServiceCodeFromPlan,
  type PurchaseServiceCode,
} from "@/lib/purchase-service";

const MAKE_RESOLVE_WEBHOOK_URL =
  process.env.MAKE_RESOLVE_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

function generateFallbackToken(serviceCode: PurchaseServiceCode | null) {
  const prefix = serviceCode || "rs";
  return `${prefix}_` + crypto.randomUUID().replace(/-/g, "");
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function tryParseJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toTrimmedString(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function parseAmount(value: unknown) {
  if (value === null || value === undefined) return null;

  const normalized = String(value).replace(",", ".").replace(/[^\d.-]/g, "");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function normalizePaymentStatus(rawStatus: string) {
  const status = rawStatus.trim().toUpperCase();

  if (status === "COMPLETED" || status === "CONFIRMED") {
    return "confirmed";
  }

  if (
    status === "FAILED" ||
    status === "DENIED" ||
    status === "VOIDED" ||
    status === "CANCELED" ||
    status === "CANCELLED" ||
    status === "EXPIRED"
  ) {
    return "failed";
  }

  if (
    status === "REFUNDED" ||
    status === "PARTIALLY_REFUNDED" ||
    status === "REVERSED"
  ) {
    return "refunded";
  }

  if (!status) {
    return "unknown";
  }

  return "pending";
}

function toRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function resolveCaptureOrderId(capture: Record<string, unknown>) {
  const supplemental = toRecord(capture.supplementary_data);
  const relatedIds = toRecord(supplemental?.related_ids);

  return toTrimmedString(relatedIds?.order_id);
}

function extractOrderVerification(order: Record<string, unknown>) {
  const purchaseUnits = Array.isArray(order.purchase_units) ? order.purchase_units : [];
  const firstUnit = toRecord(purchaseUnits[0]);
  const amount = toRecord(firstUnit?.amount);
  const payments = toRecord(firstUnit?.payments);
  const captures = Array.isArray(payments?.captures) ? payments?.captures : [];
  const firstCapture = toRecord(captures[0]);

  return {
    orderId: toTrimmedString(order.id),
    orderStatus: toTrimmedString(order.status),
    customId: toTrimmedString(firstUnit?.custom_id),
    amountValue: parseAmount(amount?.value),
    currencyCode: toTrimmedString(amount?.currency_code).toUpperCase(),
    captureId: toTrimmedString(firstCapture?.id),
    captureStatus: toTrimmedString(firstCapture?.status),
  };
}

type WebhookJson = Record<string, unknown> & {
  data?: Record<string, unknown>;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  return NextResponse.json({
    ok: true,
    route: "paypal resolve-session is alive",
    received: {
      tx: searchParams.get("tx"),
      oid: searchParams.get("oid"),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!MAKE_RESOLVE_WEBHOOK_URL) {
      return NextResponse.json(
        {
          ok: false,
          error: "MAKE_RESOLVE_WEBHOOK_URL is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const captureId = toTrimmedString(body?.tx ?? body?.payment_id);
    const orderIdFromBody = toTrimmedString(body?.oid ?? body?.order_id);
    const currentUrl = toTrimmedString(body?.current_url);
    const servicePlan = toTrimmedString(body?.service_plan);
    const requestedServiceCode =
      getServiceCodeFromPlan(
        toTrimmedString(body?.service_code) || servicePlan || null
      ) || null;

    if (!captureId) {
      return NextResponse.json(
        {
          ok: false,
          error: "payment_id / tx is required",
        },
        { status: 400 }
      );
    }

    const capture = await getPayPalCaptureDetails(captureId);
    const captureStatus = toTrimmedString(capture.status).toUpperCase();

    if (captureStatus !== "COMPLETED") {
      return NextResponse.json(
        {
          ok: false,
          error: "PayPal capture is not completed.",
        },
        { status: 402 }
      );
    }

    const resolvedOrderId = orderIdFromBody || resolveCaptureOrderId(capture);

    if (!resolvedOrderId) {
      return NextResponse.json(
        {
          ok: false,
          error: "PayPal order id was not found for this capture.",
        },
        { status: 502 }
      );
    }

    const order = await getPayPalOrderDetails(resolvedOrderId);
    const verification = extractOrderVerification(order);

    if (verification.orderStatus.toUpperCase() !== "COMPLETED") {
      return NextResponse.json(
        {
          ok: false,
          error: "PayPal order is not completed.",
        },
        { status: 402 }
      );
    }

    if (verification.captureId && verification.captureId !== captureId) {
      return NextResponse.json(
        {
          ok: false,
          error: "Capture mismatch detected.",
        },
        { status: 409 }
      );
    }

    const verifiedServiceCode =
      getServiceCodeFromPlan(verification.customId) || requestedServiceCode;

    if (!verifiedServiceCode) {
      return NextResponse.json(
        {
          ok: false,
          error: "PayPal order does not contain a valid service code.",
        },
        { status: 422 }
      );
    }

    if (requestedServiceCode && requestedServiceCode !== verifiedServiceCode) {
      return NextResponse.json(
        {
          ok: false,
          error: "Requested service does not match the verified PayPal order.",
        },
        { status: 409 }
      );
    }

    if (!verification.amountValue || verification.amountValue <= 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Verified PayPal amount is invalid.",
        },
        { status: 422 }
      );
    }

    if (!verification.currencyCode) {
      return NextResponse.json(
        {
          ok: false,
          error: "Verified PayPal currency is missing.",
        },
        { status: 422 }
      );
    }

    const normalizedStatus = normalizePaymentStatus(captureStatus);
    const fallbackToken = generateFallbackToken(verifiedServiceCode);
    const expiresAt = addDays(new Date(), 365).toISOString();

    const makePayload = {
      action: "resolve_session",

      payment_id: captureId,
      order_id: verification.orderId,
      paypal_status_raw: captureStatus,
      payment_status: normalizedStatus,

      gross_amount: verification.amountValue,
      currency: verification.currencyCode,
      source: "paypal",
      service_plan: servicePlan || null,
      service_code: verifiedServiceCode,
      create_on_rec_result: verifiedServiceCode === "on_rec",

      access_token: fallbackToken,
      access_expires_at: expiresAt,

      launch_count: 0,
      launch_limit: 3,
      status: "active",

      start_page_link: currentUrl || null,

      verified_by_paypal: true,
      verified_capture_id: captureId,
      verified_order_id: verification.orderId,
      verified_custom_id: verification.customId || verifiedServiceCode,
      verified_capture_status: captureStatus,
      verified_order_status: verification.orderStatus,

      created_at: new Date().toISOString(),
      raw_payload: body,
    };

    const makeRes = await fetch(MAKE_RESOLVE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload),
      cache: "no-store",
    });

    const contentType = makeRes.headers.get("content-type") || "";
    let makeData: WebhookJson = {};
    let rawText = "";

    if (contentType.includes("application/json")) {
      makeData = await makeRes.json();
    } else {
      rawText = await makeRes.text();

      const parsed = tryParseJson(rawText);
      if (parsed) {
        makeData = parsed;
      } else {
        const trimmed = rawText.trim();
        const looksLikeHtml =
          trimmed.startsWith("<!DOCTYPE") ||
          trimmed.startsWith("<html") ||
          trimmed.includes("<body");

        return NextResponse.json(
          {
            ok: false,
            error: looksLikeHtml
              ? "Make returned HTML instead of JSON"
              : "Make returned non-JSON response",
            make_status: makeRes.status,
            make_content_type: contentType || null,
            make_response_preview: rawText.slice(0, 500),
          },
          { status: 502 }
        );
      }
    }

    if (!makeRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Make webhook returned non-200 response",
          make_status: makeRes.status,
          make_content_type: contentType || null,
          make_response: makeData,
        },
        { status: 502 }
      );
    }

    const resolvedToken =
      makeData?.access_token ||
      makeData?.data?.access_token ||
      fallbackToken;

    const resolvedLaunchCount =
      makeData?.launch_count ??
      makeData?.data?.launch_count ??
      0;

    const resolvedLaunchLimit =
      makeData?.launch_limit ??
      makeData?.data?.launch_limit ??
      3;

    const expiresAtResolved =
      makeData?.access_expires_at ??
      makeData?.data?.access_expires_at ??
      expiresAt;

    return NextResponse.json({
      ok: true,
      access_token: resolvedToken,
      launch_count: resolvedLaunchCount,
      launch_limit: resolvedLaunchLimit,
      created: makeData?.created ?? makeData?.data?.created ?? null,
      page_id: makeData?.page_id ?? makeData?.data?.page_id ?? null,
      payment_id: captureId,
      payment_status: normalizedStatus,
      access_expires_at: expiresAtResolved,
      order_id: verification.orderId,
      verified_by_paypal: true,
      service_code:
        makeData?.service_code ??
        makeData?.data?.service_code ??
        verifiedServiceCode,
      create_on_rec_result:
        makeData?.create_on_rec_result ??
        makeData?.data?.create_on_rec_result ??
        (verifiedServiceCode === "on_rec"),
    });
  } catch (error) {
    console.error("resolve-session error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "resolve-session failed",
      },
      { status: 500 }
    );
  }
}
