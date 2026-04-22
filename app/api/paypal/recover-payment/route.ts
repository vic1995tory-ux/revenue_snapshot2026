import { NextRequest, NextResponse } from "next/server";

const MAKE_PAYMENT_RECOVERY_WEBHOOK_URL =
  process.env.MAKE_PAYMENT_RECOVERY_WEBHOOK_URL ||
  process.env.MAKE_RESOLVE_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

type RecoveryResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
  redirectUrl?: string;
  redirect_url?: string;
  data?: RecoveryResponse;
};

function toTrimmedString(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function tryParseJson(raw: string): RecoveryResponse | null {
  try {
    return JSON.parse(raw) as RecoveryResponse;
  } catch {
    return null;
  }
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function sanitizeWhatsapp(value: string) {
  let result = value.replace(/[^\d+]/g, "");

  if (result.includes("+")) {
    result = (result.startsWith("+") ? "+" : "") + result.replace(/\+/g, "");
  }

  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const paymentId = toTrimmedString(
      body?.payment_id ?? body?.paymentId ?? body?.tx
    );
    const email = normalizeEmail(toTrimmedString(body?.email));
    const whatsapp = sanitizeWhatsapp(toTrimmedString(body?.whatsapp));
    const note = toTrimmedString(body?.note);
    const currentUrl = toTrimmedString(body?.current_url);

    if (!paymentId && !email && !whatsapp) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Укажите PayPal Transaction ID, email или WhatsApp, чтобы найти оплату.",
        },
        { status: 400 }
      );
    }

    const makePayload = {
      action: "recover_payment",
      payment_id: paymentId || null,
      email: email || null,
      whatsapp: whatsapp || null,
      note: note || null,
      current_url: currentUrl || null,
      requested_at: new Date().toISOString(),
    };

    const makeRes = await fetch(MAKE_PAYMENT_RECOVERY_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload),
      cache: "no-store",
    });

    const contentType = makeRes.headers.get("content-type") || "";
    let makeData: RecoveryResponse | null = {};
    let rawText = "";

    if (contentType.includes("application/json")) {
      makeData = (await makeRes.json()) as RecoveryResponse;
    } else {
      rawText = await makeRes.text();
      makeData = tryParseJson(rawText);

      if (!makeData) {
        return NextResponse.json(
          {
            ok: false,
            error: "Make returned non-JSON response.",
            make_status: makeRes.status,
            make_content_type: contentType || null,
            make_response_preview: rawText.slice(0, 500),
          },
          { status: 502 }
        );
      }
    }

    if (!makeRes.ok || !makeData?.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            makeData?.error ||
            makeData?.message ||
            "Оплату не удалось найти автоматически.",
        },
        { status: makeRes.ok ? 404 : 502 }
      );
    }

    const redirectUrl =
      makeData.redirectUrl ||
      makeData.redirect_url ||
      makeData.data?.redirectUrl ||
      makeData.data?.redirect_url ||
      "";

    return NextResponse.json({
      ok: true,
      message:
        makeData.message ||
        makeData.data?.message ||
        "Оплата найдена. Можно завершить регистрацию.",
      redirectUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment recovery failed.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
