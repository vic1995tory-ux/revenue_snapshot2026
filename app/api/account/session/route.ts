import { NextRequest, NextResponse } from "next/server";

const MAKE_ACCOUNT_SESSION_WEBHOOK_URL =
  process.env.MAKE_ACCOUNT_SESSION_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

function tryParseJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = String(searchParams.get("token") ?? "").trim();

    if (!token) {
      return NextResponse.json(
        {
          ok: false,
          error: "token is required",
        },
        { status: 400 }
      );
    }

    const makePayload = {
      action: "account_session",
      access_token: token,
    };

    const makeRes = await fetch(MAKE_ACCOUNT_SESSION_WEBHOOK_URL, {
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

    const source = makeData?.data ?? makeData;

    const normalized = {
      fullName: String(
        source?.fullName ??
          source?.full_name ??
          source?.client_name ??
          source?.name ??
          "Имя Фамилия"
      ),
      companyName: String(
        source?.companyName ??
          source?.company_name ??
          source?.company ??
          "Название компании"
      ),
      position: String(source?.position ?? ""),
      positionLocked: Boolean(source?.positionLocked ?? source?.position_locked ?? false),
      expiresAt: String(
        source?.expiresAt ??
          source?.expires_at ??
          source?.access_expires_at ??
          new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString()
      ),
      companySummary: String(
        source?.companySummary ??
          source?.company_summary ??
          ""
      ),
      results: Array.isArray(source?.results)
        ? source.results.map((item: any, index: number) => ({
            id: String(item?.id ?? index + 1),
            date: String(item?.date ?? ""),
            executiveSummary: String(
              item?.executiveSummary ?? item?.executive_summary ?? ""
            ),
            mainLever: String(item?.mainLever ?? item?.main_lever ?? ""),
            riskZone: String(item?.riskZone ?? item?.risk_zone ?? ""),
            comment: String(item?.comment ?? ""),
          }))
        : [],
    };

    return NextResponse.json({
      ok: true,
      data: normalized,
    });
  } catch (error) {
    console.error("account/session error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "account/session failed",
      },
      { status: 500 }
    );
  }
}
