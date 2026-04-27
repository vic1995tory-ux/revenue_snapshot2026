import { NextRequest, NextResponse } from "next/server";
import { onRecResultsMockData } from "@/lib/onrec-results/mock-data";
import { resultsMockData } from "@/lib/results/mock-data";
import {
  fetchResultPayloadForToken,
  isNonEmptyObject,
} from "@/lib/results/make-results";

const DEMO_RESULT_TOKENS = new Set(["mock-token", "demo-result-1", "demo-result-2"]);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await context.params;
    const normalizedToken = token.trim().toLowerCase();

    if (DEMO_RESULT_TOKENS.has(token)) {
      return NextResponse.json(resultsMockData, {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    if (
      normalizedToken === "on_rec_demo" ||
      normalizedToken === "on_rec" ||
      normalizedToken === "on_rec_demo_result"
    ) {
      return NextResponse.json(onRecResultsMockData, {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    const url = new URL(req.url);
    const launchAttemptId =
      url.searchParams.get("launch_attempt_id") ?? undefined;

    let result;

    try {
      result = await fetchResultPayloadForToken(launchAttemptId || token);
    } catch {
      return NextResponse.json(
        { error: "Result source is not configured" },
        { status: 404 },
      );
    }

    if (!result.ok || !isNonEmptyObject(result.payload)) {
      return NextResponse.json(
        { error: "Result not found" },
        { status: 404 },
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
      { status: 500 },
    );
  }
}
