import { NextRequest, NextResponse } from "next/server";
import { RESULTS_BY_TOKEN } from "@/lib/mock-results";

type ResultPayload = Record<string, unknown>;

type ResultRecord = {
  token: string;
  launch_attempt_id?: string;
  payload: ResultPayload;
};

function buildIndex(): ResultRecord[] {
  return Object.entries(RESULTS_BY_TOKEN).map(([token, payload]) => {
    const typedPayload = payload as ResultPayload & {
      meta?: { launch_attempt_id?: string };
      launch_attempt_id?: string;
    };

    return {
      token,
      launch_attempt_id:
        typedPayload.launch_attempt_id ??
        typedPayload.meta?.launch_attempt_id,
      payload: typedPayload,
    };
  });
}

async function findResult({
  token,
  launchAttemptId,
}: {
  token?: string;
  launchAttemptId?: string;
}): Promise<ResultRecord | null> {
  const records = buildIndex();

  if (token) {
    const byToken = records.find((record) => record.token === token);
    if (byToken) return byToken;
  }

  if (launchAttemptId) {
    const byLaunchId = records.find(
      (record) => record.launch_attempt_id === launchAttemptId
    );
    if (byLaunchId) return byLaunchId;
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const tokenFromPath = url.pathname.split("/").pop() ?? "";
    const launchAttemptId = url.searchParams.get("launch_attempt_id") ?? undefined;

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
