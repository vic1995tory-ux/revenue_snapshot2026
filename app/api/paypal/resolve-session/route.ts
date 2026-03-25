import { NextRequest, NextResponse } from "next/server";

const MAKE_RESOLVE_WEBHOOK_URL =
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

function generateFallbackToken() {
  return (
    "rs_" +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36)
  );
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
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
    if (!MAKE_RESOLVE_WEBHOOK_URL) {
      return NextResponse.json(
        {
          ok: false,
          error: "MAKE_RESOLVE_WEBHOOK_URL is not set",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const tx = body?.tx ?? body?.payment_id ?? "";
    const st = body?.st ?? body?.payment_status ?? "";
    const amt = body?.amt ?? body?.gross_amount ?? "";
    const cc = body?.cc ?? body?.currency ?? "";
    const firstName = body?.first_name ?? "";
    const clientEmail = body?.client_email ?? "";
    const source = "paypal";

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
      String(st).toUpperCase() === "COMPLETED" ? "confirmed" : "pending";

    const fallbackToken = generateFallbackToken();
    const expiresAt = addDays(new Date(), 365).toISOString();

    /**
     * Вот payload, который уйдет в Make.
     * Ключи уже названы так, как тебе удобно дальше мапить в Notion.
     */
    const makePayload = {
      action: "resolve_session",

      // ключ оплаты
      payment_id: tx,

      // paypal данные
      paypal_status_raw: st,
      payment_status: normalizedStatus,
      gross_amount: amt ? Number(amt) : null,
      currency: cc || null,
      source,

      // клиентские поля
      "First Name": firstName || null,
      client_email: clientEmail || null,

      // доступ
      access_token: fallbackToken,
      access_expires_at: expiresAt,
      launch_count: 0,
      launch_limit: 3,
      status: "active",

      // для отладки
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
    const makeData = contentType.includes("application/json")
      ? await makeRes.json()
      : { raw: await makeRes.text() };

    if (!makeRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Make webhook returned non-200 response",
          make_status: makeRes.status,
          make_response: makeData,
        },
        { status: 502 }
      );
    }

    /**
     * Ожидаем, что Make вернет уже итог:
     * {
     *   ok: true,
     *   access_token: "...",
     *   created: true/false,
     *   page_id: "...",
     *   launch_count: 0,
     *   launch_limit: 3
     * }
     */
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

    return NextResponse.json({
      ok: true,
      access_token: resolvedToken,
      launch_count: resolvedLaunchCount,
      launch_limit: resolvedLaunchLimit,
      created: makeData?.created ?? makeData?.data?.created ?? null,
      page_id: makeData?.page_id ?? makeData?.data?.page_id ?? null,
      payment_id: tx,
      payment_status: normalizedStatus,
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
