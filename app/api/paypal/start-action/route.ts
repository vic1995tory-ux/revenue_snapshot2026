import { NextResponse } from "next/server";

const MAKE_START_ACTION_WEBHOOK_URL =
  process.env.MAKE_START_ACTION_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "start-action is alive",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payment_id = String(body?.payment_id ?? "").trim();
    const access_token = String(body?.access_token ?? "").trim();
    const full_name = String(body?.full_name ?? "").trim();
    const company_name = String(body?.company_name ?? "").trim();
    const whatsapp = String(body?.whatsapp ?? "").trim();
    const start_page_link = String(body?.start_page_link ?? "").trim();

    if (!payment_id) {
      return NextResponse.json(
        { ok: false, error: "payment_id is required" },
        { status: 400 }
      );
    }

    if (!access_token) {
      return NextResponse.json(
        { ok: false, error: "access_token is required" },
        { status: 400 }
      );
    }

    if (!full_name || !company_name || !whatsapp) {
      return NextResponse.json(
        { ok: false, error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    const makePayload = {
      action: "start_action",
      payment_id,
      access_token,
      full_name,
      company_name,
      whatsapp,

      client_name: full_name,
      company: company_name,
      client_whatsapp: whatsapp,
      start_page_link: start_page_link || null,
    };

    const makeRes = await fetch(MAKE_START_ACTION_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload),
      cache: "no-store",
    });

    const contentType = makeRes.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const raw = await makeRes.text();

      return NextResponse.json(
        {
          ok: false,
          error: "Make returned non-JSON response",
          raw_response: raw.slice(0, 500),
        },
        { status: 502 }
      );
    }

    const makeData = await makeRes.json();

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

    return NextResponse.json({
      ok: true,
      updated: true,
      make_response: makeData,
    });
  } catch (error) {
    console.error("start-action error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "start-action failed",
      },
      { status: 500 }
    );
  }
}
