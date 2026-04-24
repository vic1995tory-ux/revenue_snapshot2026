import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { getSessionOptions, type AppSessionData } from "@/lib/session";
import { derivePasswordAttempt } from "@/lib/passwords";

const MAKE_LOGIN_WEBHOOK_URL =
  process.env.MAKE_LOGIN_WEBHOOK_URL ||
  "https://hook.us2.make.com/29vgewdq138z7nlxajc7ozsogq9a3nwb";

const MAKE_LOGIN_LOOKUP_WEBHOOK_URL =
  process.env.MAKE_LOGIN_LOOKUP_WEBHOOK_URL || "";

type MakeLoginResponse = {
  ok?: boolean;
  error?: string;
  access_token?: unknown;
  accessToken?: unknown;
  full_name?: unknown;
  fullName?: unknown;
  company_name?: unknown;
  companyName?: unknown;
  password_salt?: unknown;
  passwordSalt?: unknown;
  password_version?: unknown;
  passwordVersion?: unknown;
  data?: MakeLoginResponse;
};

function tryParseJson(raw: string): MakeLoginResponse | null {
  try {
    return JSON.parse(raw) as MakeLoginResponse;
  } catch {
    return null;
  }
}

function toStringSafe(value: unknown, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

async function readMakeJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await res.json()) as MakeLoginResponse;
  }

  const rawText = await res.text();
  const parsed = tryParseJson(rawText);

  if (!parsed) {
    throw new Error("Сервис логина вернул невалидный ответ.");
  }

  return parsed;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const login = String(body?.login ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "").trim();

    if (!login) {
      return NextResponse.json(
        { ok: false, error: "Введите логин." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { ok: false, error: "Введите пароль." },
        { status: 400 }
      );
    }

    if (!MAKE_LOGIN_LOOKUP_WEBHOOK_URL) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Secure login lookup webhook is not configured. Configure MAKE_LOGIN_LOOKUP_WEBHOOK_URL.",
        },
        { status: 503 }
      );
    }

    const lookupRes = await fetch(MAKE_LOGIN_LOOKUP_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login_lookup",
        login,
      }),
      cache: "no-store",
    });

    const lookupData = await readMakeJson(lookupRes);

    if (!lookupRes.ok || !lookupData?.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            lookupData?.error ||
            "Либо пользователя с таким логином не существует, либо пароль неверный.",
        },
        { status: 401 }
      );
    }

    const passwordSalt = toStringSafe(
      lookupData?.password_salt ??
        lookupData?.passwordSalt ??
        lookupData?.data?.password_salt ??
        lookupData?.data?.passwordSalt,
      ""
    );

    const passwordVersion = toStringSafe(
      lookupData?.password_version ??
        lookupData?.passwordVersion ??
        lookupData?.data?.password_version ??
        lookupData?.data?.passwordVersion,
      ""
    );

    const passwordAttempt = await derivePasswordAttempt(
      password,
      passwordSalt,
      passwordVersion
    );

    const makeRes = await fetch(MAKE_LOGIN_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login",
        login,
        password_hash: passwordAttempt.password_hash,
        password_salt: passwordAttempt.password_salt,
        password_version: passwordAttempt.password_version,
      }),
      cache: "no-store",
    });

    const makeData = await readMakeJson(makeRes);

    if (!makeRes.ok || !makeData?.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            makeData?.error ||
            "Либо пользователя с таким логином не существует, либо пароль неверный.",
        },
        { status: 401 }
      );
    }

    const accessToken = toStringSafe(
      makeData?.access_token ??
        makeData?.accessToken ??
        makeData?.data?.access_token ??
        makeData?.data?.accessToken,
      ""
    );

    if (!accessToken) {
      return NextResponse.json(
        {
          ok: false,
          error: "Логин выполнен, но сервис не вернул access token.",
        },
        { status: 502 }
      );
    }

    const fullName = toStringSafe(
      makeData?.full_name ??
        makeData?.fullName ??
        makeData?.data?.full_name ??
        makeData?.data?.fullName,
      ""
    );

    const companyName = toStringSafe(
      makeData?.company_name ??
        makeData?.companyName ??
        makeData?.data?.company_name ??
        makeData?.data?.companyName,
      ""
    );

    const cookieStore = await cookies();
    const session = await getIronSession<AppSessionData>(
      cookieStore,
      getSessionOptions()
    );

    session.isLoggedIn = true;
    session.accessToken = accessToken;
    session.login = login;
    session.fullName = fullName;
    session.companyName = companyName;

    await session.save();

    return NextResponse.json({
      ok: true,
      accessToken,
      redirectUrl: `/account/${encodeURIComponent(accessToken)}`,
    });
  } catch (error) {
    console.error("auth/login error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Не удалось выполнить вход.",
      },
      { status: 500 }
    );
  }
}
