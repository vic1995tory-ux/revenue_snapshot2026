import { NextRequest, NextResponse } from "next/server";

/**
 * Здесь ты подключаешь свою БД / Notion / storage
 * Ниже — универсальный пример интерфейса
 */
type ResultRecord = {
  token: string;
  launch_attempt_id: string;
  payload: any;
};

/**
 * 🔴 ЗАМЕНИ ЭТУ ФУНКЦИЮ НА СВОЮ ЛОГИКУ
 * (Notion / DB / Make storage)
 */
async function findResult({
  token,
  launchAttemptId,
}: {
  token?: string;
  launchAttemptId?: string;
}): Promise<ResultRecord | null> {
  // 👉 MOCK (для теста)
  const mock: ResultRecord = {
    token: "rs_demo_001",
    launch_attempt_id: "launch_123",
    payload: {
      meta: {
        generated_at: "2026-04-17",
        result_status: "ready",
      },
      hero_block: {
        companyName: "Test Company",
        summary: "Demo summary",
        description: "Demo description",
      },
      solution: {
        solution_summary: {
          headline: "Main bottleneck is capacity",
          core_logic: "Demand > processing",
          confidence_level: "medium",
        },
      },
    },
  };

  // поиск по token
  if (token && token === mock.token) return mock;

  // поиск по launch_attempt_id
  if (launchAttemptId && launchAttemptId === mock.launch_attempt_id)
    return mock;

  return null;
}

/**
 * MAIN ROUTE
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // из URL path (если /api/results/[token])
    const tokenFromPath = url.pathname.split("/").pop();

    // из query (?launch_attempt_id=xxx)
    const launchAttemptId = url.searchParams.get("launch_attempt_id");

    const result = await findResult({
      token: tokenFromPath,
      launchAttemptId: launchAttemptId ?? undefined,
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
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/results failed:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
