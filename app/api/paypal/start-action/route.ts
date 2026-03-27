import { NextRequest, NextResponse } from "next/server";

const MAKE_WEBHOOK_URL =
  process.env.MAKE_START_ACTION_WEBHOOK_URL ||
  "https://hook.us2.make.com/PUT_YOUR_REAL_WEBHOOK_HERE";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      payment_id: body?.payment_id ?? "",
      access_token: body?.access_token ?? "",
      full_name: body?.full_name ?? "",
      company_name: body?.company_name ?? "",
      whatsapp: body?.whatsapp ?? "",
      login: body?.login ?? "",
      password_hash: body?.password_hash ?? "",
      password_version: body?.password_version ?? "sha256-v1",
      start_page_link: body?.start_page_link ?? "",
    };

    if (!payload.access_token) {
      return NextResponse.json(
        { ok: false, error: "Missing access token." },
        { status: 400 }
      );
    }

    if (!payload.full_name) {
      return NextResponse.json(
        { ok: false, error: "Missing full name." },
        { status: 400 }
      );
    }

    if (!payload.company_name) {
      return NextResponse.json(
        { ok: false, error: "Missing company name." },
        { status: 400 }
      );
    }

    if (!payload.whatsapp) {
      return NextResponse.json(
        { ok: false, error: "Missing whatsapp." },
        { status: 400 }
      );
    }

    if (!payload.login) {
      return NextResponse.json(
        { ok: false, error: "Missing login." },
        { status: 400 }
      );
    }

    if (!payload.password_hash) {
      return NextResponse.json(
        { ok: false, error: "Missing password hash." },
        { status: 400 }
      );
    }

    const webhookRes = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const contentType = webhookRes.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await webhookRes.json();
      return NextResponse.json(data, { status: webhookRes.status });
    }

    const rawText = await webhookRes.text();

    if (!webhookRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: rawText || "Webhook returned an error.",
        },
        { status: webhookRes.status || 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      raw: rawText,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
