import { NextResponse } from "next/server";

const MAKE_RESULTS_WEBHOOK_URL =
  process.env.MAKE_RESULTS_WEBHOOK_URL ||
  "https://hook.us2.make.com/0uyhpfhytn08yvtlwwl61jv345h7ckp9";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    const response = await fetch(MAKE_RESULTS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          error: "Failed to fetch results from Make",
          details: text || `HTTP ${response.status}`,
        },
        { status: 502 }
      );
    }

    const raw = await response.json();

    // На случай если Make вернет либо payload напрямую,
    // либо завернет его в results_payload_json
    const payload =
      raw?.results_payload_json && typeof raw.results_payload_json === "object"
        ? raw.results_payload_json
        : raw;

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
