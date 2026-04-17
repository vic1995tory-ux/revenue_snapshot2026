import { NextRequest, NextResponse } from "next/server";
import { resultsMockData } from "@/lib/results/mock-data";

type ResultPayload = Record<string, unknown>;

type ResultRecord = {
  token: string;
  launch_attempt_id?: string;
  payload: ResultPayload;
};

// Пока у тебя один mock-result после новой структуры.
// Позже сюда можно подставить реальные данные из БД / API.
const MOCK_RESULT: ResultRecord = {
  token: "mock-token",
  payload: resultsMockData as ResultPayload,
};

async function findResult({
  token,
  launchAttemptId,
}: {
  token?: string;
  launchAttemptId?: string;
}): Promise<ResultRecord | null> {
  const payload = MOCK_RESULT.payload as ResultPayload & {
    meta?: { launch_attempt_id?: string };
    launch_attempt_id?: string;
  };

  const record: ResultRecord = {
    token: MOCK_RESULT.token,
    launch_attempt_id:
      payload.launch_attempt_id ?? payload.meta?.launch_attempt_id,
    payload,
  };

  if (token && token === record.token) {
    return record;
  }

  if (launchAttemptId && launchAttemptId === record.launch_attempt_id) {
    return record;
  }

  // Пока у тебя один mock-result, можно возвращать его даже без точного match.
  // Если хочешь строгую проверку — замени на `return null;`
  return record;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const tokenFromPath = url.pathname.split("/").pop() ?? "";
    const launchAttemptId =
      url.searchParams.get("launch_attempt_id") ?? undefined;

    const result = await findResult({
      token: tokenFromPath || undefined,
      launchAttemptId,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.payload, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("GET /api/results/[token] failed:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
