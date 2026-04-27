import type { OnRecResultPageData } from "@/lib/onrec-results/types";
import type { ResultsPageData } from "@/lib/results/types";
import { adaptRawResultsPayload } from "./adapters";

const MAKE_RESULTS_FETCH_WEBHOOK_URL =
  process.env.MAKE_RESULTS_FETCH_WEBHOOK_URL || "";

type UnknownRecord = Record<string, unknown>;

export type AccountResultRow = {
  id: string;
  date: string;
  executiveSummary: string;
  mainLever: string;
  riskZone: string;
  comment: string;
  resultUrl: string;
  status: string;
};

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

function toArraySafe(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toDateLabel(value: unknown) {
  const raw = toStringSafe(value, "").trim();
  if (!raw) return "";

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

async function postResultsWebhook(payload: Record<string, unknown>) {
  if (!MAKE_RESULTS_FETCH_WEBHOOK_URL) {
    throw new Error("MAKE_RESULTS_FETCH_WEBHOOK_URL is not configured");
  }

  const response = await fetch(MAKE_RESULTS_FETCH_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  let data: unknown = {};
  let rawText = "";

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    rawText = await response.text();
    data = tryParseJson(rawText) ?? rawText;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    rawText,
  };
}

function extractPayloadContainer(input: unknown): unknown {
  if (!isRecord(input)) return input;

  if ("payload" in input) return input.payload;
  if ("result" in input) return input.result;
  if ("data" in input) return extractPayloadContainer(input.data);

  return input;
}

function extractResultsArray(input: unknown): unknown[] {
  if (Array.isArray(input)) return input;
  if (!isRecord(input)) return [];

  if (Array.isArray(input.results)) return input.results;
  if (isRecord(input.data) && Array.isArray(input.data.results)) {
    return input.data.results;
  }
  if (Array.isArray(input.items)) return input.items;
  if (isRecord(input.data) && Array.isArray(input.data.items)) {
    return input.data.items;
  }

  return [];
}

function toResultLookupToken(item: UnknownRecord, fallback: string) {
  return (
    toStringSafe(
      item.result_token ??
        item.resultToken ??
        item.id ??
        item.key ??
        item.launch_attempt_id ??
        item.launchAttemptId,
      fallback,
    ) || fallback
  );
}

export function normalizeResultsList(input: unknown): AccountResultRow[] {
  const results = extractResultsArray(input);

  return results.map((rawItem, index) => {
    const item = isRecord(rawItem) ? rawItem : {};
    const id = toResultLookupToken(item, `result-${index + 1}`);
    const resultUrlRaw = toStringSafe(
      item.resultUrl ?? item.result_url ?? item.url ?? item.link,
      "",
    );

    return {
      id,
      date: toDateLabel(
        item.date ?? item.created_at ?? item.createdAt ?? item.timestamp,
      ),
      executiveSummary: toStringSafe(
        item.executiveSummary ?? item.executive_summary ?? item.summary,
        "",
      ),
      mainLever: toStringSafe(
        item.mainLever ?? item.main_lever,
        "",
      ),
      riskZone: toStringSafe(
        item.riskZone ?? item.risk_zone,
        "",
      ),
      comment: toStringSafe(item.comment, ""),
      resultUrl: resultUrlRaw || `/results/${encodeURIComponent(id)}`,
      status: toStringSafe(item.status, "result_ready"),
    };
  });
}

export async function fetchResultsListForAccount(accessToken: string) {
  const response = await postResultsWebhook({
    action: "list_results",
    access_token: accessToken,
  });

  return {
    ...response,
    results: normalizeResultsList(response.data),
  };
}

export async function fetchResultPayloadForToken(resultToken: string) {
  const response = await postResultsWebhook({
    action: "get_result",
    result_token: resultToken,
    launch_attempt_id: resultToken,
  });

  const extractedPayload = extractPayloadContainer(response.data);
  const adaptedPayload = adaptRawResultsPayload(extractedPayload);

  return {
    ...response,
    payload: adaptedPayload ?? extractedPayload,
  };
}

export function isResultsPageData(value: unknown): value is ResultsPageData {
  return isRecord(value) && isRecord(value.hero) && isRecord(value.solution);
}

export function isOnRecPageData(value: unknown): value is OnRecResultPageData {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    Array.isArray(value.sections)
  );
}

export function isNonEmptyObject(value: unknown): value is UnknownRecord {
  return isRecord(value) && Object.keys(value).length > 0;
}
