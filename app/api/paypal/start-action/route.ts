import { NextRequest, NextResponse } from "next/server";

const MAKE_START_ACTION_WEBHOOK_URL =
  process.env.MAKE_START_ACTION_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

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

function isSha256Hex(value: string) {
  return /^[a-f0-9]{64}$/i.test(value);
}

export async function POST(req: NextRequest) {
  try {
    if (!MAKE_START_ACTION_WEBHOOK_URL) {
      return NextResponse.json(
        {
          ok: false,
          error: "MAKE_START_ACTION_WEBHOOK_URL is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const payload = {
      action: "start-action",

      payment_id: toTrimmedString(body?.payment_id),
      access_token: toTrimmedString(body?.access_token),

      full_name: toTrimmedString(body?.full_name),
      company_name: toTrimmedString(body?.company_name),
      whatsapp: toTrimmedString(body?.whatsapp),

      login: toTrimmedString(body?.login).toLowerCase(),
      password_hash: toTrimmedString(body?.password_hash),
      password_version: toTrimmedString(body?.password_version) || "sha256-v1",

      start_page_link: toTrimmedString(body?.start_page_link),
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

    if (!isSha256Hex(payload.password_hash)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid password hash format.",
        },
        { status: 400 }
      );
    }

    const webhookRes = await fetch(MAKE_START_ACTION_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const contentType = webhookRes.headers.get("content-type") || "";
    let webhookData: any = {};
    let rawText = "";

    if (contentType.includes("application/json")) {
      webhookData = await webhookRes.json();
    } else {
      rawText = await webhookRes.text();

      const parsed = tryParseJson(rawText);
      if (parsed) {
        webhookData = parsed;
      } else {
        const trimmed = rawText.trim();
        const looksLikeHtml =
          trimmed.startsWith("<!DOCTYPE") ||
          trimmed.startsWith("<html") ||
          trimmed.includes("<body");

        if (looksLikeHtml) {
          return NextResponse.json(
            {
              ok: false,
              error: "Make returned HTML instead of JSON.",
              make_status: webhookRes.status,
              make_content_type: contentType || null,
              make_response_preview: rawText.slice(0, 500),
            },
            { status: 502 }
          );
        }

        if (!webhookRes.ok) {
          return NextResponse.json(
            {
              ok: false,
              error: rawText || "Webhook returned an error.",
              make_status: webhookRes.status,
              make_content_type: contentType || null,
            },
            { status: webhookRes.status || 500 }
          );
        }

        return NextResponse.json({
          ok: true,
          raw: rawText,
        });
      }
    }

    if (!webhookRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Make webhook returned non-200 response.",
          make_status: webhookRes.status,
          make_content_type: contentType || null,
          make_response: webhookData,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: webhookData,
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
