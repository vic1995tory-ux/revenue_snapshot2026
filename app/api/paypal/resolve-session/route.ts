import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MAKE_RESOLVE_WEBHOOK_URL =
  process.env.MAKE_RESOLVE_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

function generateFallbackToken() {
  return "rs_" + crypto.randomUUID().replace(/-/g, "");
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  return NextResponse.json({
    ok: true,
    route: "paypal resolve-session is alive",
    received: {
      tx: searchParams.get("tx"),
      st: searchParams.get("st"),
      amt: searchParams.get("amt"),
      cc: searchParams.get("cc"),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const tx = String(body?.tx ?? body?.payment_id ?? "").trim();
    const st = String(body?.st ?? body?.payment_status ?? "").trim();
    const amt = String(body?.amt ?? body?.gross_amount ?? "").trim();
    const cc = String(body?.cc ?? body?.currency ?? "").trim();
    const currentUrl = String(body?.current_url ?? "").trim();

    if (!tx) {
      return NextResponse.json(
        {
          ok: false,
          error: "payment_id / tx is required",
        },
        { status: 400 }
      );
    }

    const normalizedStatus =
      st.toUpperCase() === "COMPLETED" ||
      st.toUpperCase() === "CONFIRMED"
        ? "confirmed"
        : "pending";

    const fallbackToken = generateFallbackToken();
    const expiresAt = addDays(new Date(), 365).toISOString();

    const makePayload = {
      action: "resolve_session",

      payment_id: tx,
      paypal_status_raw: st,
      payment_status: normalizedStatus,

      gross_amount: amt ? Number(amt) : null,
      currency: cc || null,
      source: "paypal",

      access_token: fallbackToken,
      access_expires_at: expiresAt,

      launch_count: 0,
      launch_limit: 3,
      status: "active",

      start_page_link: currentUrl || null,

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
    let makeData: any = {};
    let rawText = "";

    if (contentType.includes("application/json")) {
      makeData = await makeRes.json();
    } else {
      rawText = await makeRes.text();

      const parsed = tryParseJson(rawText);
      if (parsed) {
        makeData = parsed;
      } else {
        const looksLikeHtml =
          rawText.trim().startsWith("<!DOCTYPE") ||
          rawText.trim().startsWith("<html") ||
          rawText.includes("<body");

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
      payment_id: tx,
      payment_status: normalizedStatus,
      access_expires_at: expiresAtResolved,
    });
  } catch (error) {
    console.error("resolve-session error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "resolve-session failed",
      },
      { status: 500 }
    );
  }
}
