import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  clearSnapshotDraft,
  getSnapshotDraft,
  setSnapshotDraft,
} from "@/lib/server/snapshot-draft-store";

const SESSION_COOKIE_NAME = "rs_snapshot_session";
const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12;

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

async function getOrCreateSessionId() {
  const cookieStore = await cookies();
  const current = cookieStore.get(SESSION_COOKIE_NAME)?.value?.trim();
  return current || crypto.randomUUID();
}

function withSessionCookie(response: NextResponse, sessionId: string) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}

export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get("access_token")?.trim() || "";
  const launchAttemptId =
    req.nextUrl.searchParams.get("launch_attempt_id")?.trim() || "";

  if (!accessToken || !launchAttemptId) {
    return NextResponse.json(
      { ok: false, error: "access_token and launch_attempt_id are required" },
      { status: 400 },
    );
  }

  const sessionId = await getOrCreateSessionId();
  const draft = getSnapshotDraft(sessionId, accessToken, launchAttemptId);

  return withSessionCookie(
    NextResponse.json({
      ok: true,
      draft,
    }),
    sessionId,
  );
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const accessToken = getString(body.access_token);
  const launchAttemptId = getString(body.launch_attempt_id);

  if (!accessToken || !launchAttemptId) {
    return NextResponse.json(
      { ok: false, error: "access_token and launch_attempt_id are required" },
      { status: 400 },
    );
  }

  const sessionId = await getOrCreateSessionId();
  const record = setSnapshotDraft(sessionId, {
    accessToken,
    launchAttemptId,
    mode: getString(body.mode),
    answers:
      typeof body.answers_raw === "object" && body.answers_raw !== null
        ? (body.answers_raw as Record<string, unknown>)
        : {},
    preparedAnswers: Array.isArray(body.answers)
      ? body.answers
          .filter((item): item is { question: string; answer: string } => {
            return (
              typeof item === "object" &&
              item !== null &&
              typeof (item as { question?: unknown }).question === "string" &&
              typeof (item as { answer?: unknown }).answer === "string"
            );
          })
      : [],
    progress: {
      total: getNumber((body.progress as Record<string, unknown> | undefined)?.total, 0),
      totalQuestions: getNumber(
        (body.progress as Record<string, unknown> | undefined)?.totalQuestions,
        0,
      ),
      sectionProgress:
        typeof (body.progress as Record<string, unknown> | undefined)?.sectionProgress ===
          "object" &&
        (body.progress as Record<string, unknown>).sectionProgress !== null
          ? Object.fromEntries(
              Object.entries(
                (body.progress as Record<string, unknown>).sectionProgress as Record<
                  string,
                  unknown
                >,
              ).map(([key, value]) => [key, getNumber(value, 0)]),
            )
          : {},
    },
    draftStep: getNumber(body.draft_step, 1),
    updatedAt: new Date().toISOString(),
  });

  return withSessionCookie(
    NextResponse.json({
      ok: true,
      draft: record,
    }),
    sessionId,
  );
}

export async function DELETE(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const accessToken = getString(body.access_token);
  const launchAttemptId = getString(body.launch_attempt_id);

  if (!accessToken || !launchAttemptId) {
    return NextResponse.json(
      { ok: false, error: "access_token and launch_attempt_id are required" },
      { status: 400 },
    );
  }

  const sessionId = await getOrCreateSessionId();
  clearSnapshotDraft(sessionId, accessToken, launchAttemptId);

  return withSessionCookie(NextResponse.json({ ok: true }), sessionId);
}
