import { NextRequest, NextResponse } from "next/server";

const MAKE_ACCOUNT_SESSION_WEBHOOK_URL =
  process.env.MAKE_ACCOUNT_SESSION_WEBHOOK_URL ||
  "https://hook.us2.make.com/m1ep9hxrd16zwufpp8yfyj1sm9qcjkhr";

const DEFAULT_LAUNCH_LIMIT = 3;

const DEMO_ACCOUNT_TOKEN = "demo";

const demoAccountData = {
  fullName: "Demo Account",
  companyName: "Revenue Snapshot Demo",
  position: "Founder",
  positionLocked: true,
  expiresAt: new Date("2027-04-04T00:00:00.000Z").toISOString(),
  companySummary:
    "Демо-аккаунт с двумя примерами результатов Revenue Snapshot.",
  launchCount: 2,
  launchLimit: DEFAULT_LAUNCH_LIMIT,
  results: [
    {
      id: "demo-result-1",
      date: "04.04.2026",
      executiveSummary:
        "Бизнес ограничен не спросом, а обработкой входящего потока и управленческой фокусировкой.",
      mainLever: "Собрать единый входной offer и сократить handoff между продажей и исполнением.",
      riskZone: "Рост нагрузки без стабилизации маржи.",
      comment: "Пример результата для service business.",
      resultUrl: "/results/demo-result-1",
      status: "result_ready",
    },
    {
      id: "demo-result-2",
      date: "04.04.2026",
      executiveSummary:
        "Основной потенциал находится в пересборке продуктовой линейки и повышении качества повторных продаж.",
      mainLever: "Выделить самый маржинальный сегмент и закрепить roadmap на 90 дней.",
      riskZone: "Размытый фокус команды и долгий цикл принятия решений.",
      comment: "Пример результата для product-led команды.",
      resultUrl: "/results/demo-result-2",
      status: "result_ready",
    },
  ],
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function tryParseJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toStringSafe(value: unknown, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function toBooleanSafe(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  if (typeof value === "number") return value !== 0;
  return fallback;
}

function toNumberSafe(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
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

    if (token.toLowerCase() === DEMO_ACCOUNT_TOKEN) {
      return NextResponse.json({
        ok: true,
        data: demoAccountData,
      });
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
    let makeData: unknown = {};
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

    const sourceCandidate = isRecord(makeData) && "data" in makeData
      ? makeData.data
      : makeData;
    const source = isRecord(sourceCandidate) ? sourceCandidate : {};

    const normalizedResults = Array.isArray(source?.results)
      ? source.results.map((rawItem, index: number) => {
        const item = isRecord(rawItem) ? rawItem : {};

        return {
          id: toStringSafe(item.id, String(index + 1)),
          date: toStringSafe(item.date, ""),
          executiveSummary: toStringSafe(
            item.executiveSummary ??
              item.executive_summary ??
              item.summary,
            ""
          ),
          mainLever: toStringSafe(
            item.mainLever ??
              item.main_lever,
            ""
          ),
          riskZone: toStringSafe(
            item.riskZone ??
              item.risk_zone,
            ""
          ),
          comment: toStringSafe(item.comment, ""),
          resultUrl: toStringSafe(
            item.resultUrl ??
              item.result_url ??
              item.url ??
              item.link,
            ""
          ),
          status: toStringSafe(item.status, "result_ready"),
        };
      })
      : [];

    const launchCountRaw =
      source?.launchCount ??
      source?.launch_count ??
      source?.results_count;

    const launchLimitRaw =
      source?.launchLimit ??
      source?.launch_limit;

    const normalized = {
      fullName: toStringSafe(
        source?.fullName ??
          source?.full_name ??
          source?.client_name ??
          source?.name,
        "Имя Фамилия"
      ),
      companyName: toStringSafe(
        source?.companyName ??
          source?.company_name ??
          source?.company,
        "Название компании"
      ),
      position: toStringSafe(source?.position, ""),
      positionLocked: toBooleanSafe(
        source?.positionLocked ?? source?.position_locked,
        false
      ),
      expiresAt: toStringSafe(
        source?.expiresAt ??
          source?.expires_at ??
          source?.access_expires_at,
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString()
      ),
      companySummary: toStringSafe(
        source?.companySummary ??
          source?.company_summary,
        ""
      ),
      launchCount: toNumberSafe(launchCountRaw, normalizedResults.length),
      launchLimit: toNumberSafe(launchLimitRaw, DEFAULT_LAUNCH_LIMIT),
      results: normalizedResults,
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
