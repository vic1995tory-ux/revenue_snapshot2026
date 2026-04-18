import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

const MAKE_LOGIN_WEBHOOK_URL =
  process.env.MAKE_LOGIN_WEBHOOK_URL ||
  "https://hook.us2.make.com/29vgewdq138z7nlxajc7ozsogq9a3nwb";

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

    const makeRes = await fetch(MAKE_LOGIN_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login",
        login,
        password,
      }),
      cache: "no-store",
    });

    const contentType = makeRes.headers.get("content-type") || "";
    let makeData: any = {};
    let rawText = "";

    if (contentType.includes("application/json")) {
      makeData = await makeRes.json();
    } else {
      rawText = await makeRes.text();
      makeData = tryParseJson(rawText);

      if (!makeData) {
        return NextResponse.json(
          {
            ok: false,
            error: "Сервис логина вернул невалидный ответ.",
            make_status: makeRes.status,
            make_content_type: contentType || null,
            make_response_preview: rawText.slice(0, 500),
          },
          { status: 502 }
        );
      }
    }

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

    const session = await getIronSession(cookies(), sessionOptions);

    session.isLoggedIn = true;
    session.accessToken = accessToken;
    session.login = login;
    session.fullName = fullName;
    session.companyName = companyName;

    await session.save();

    return NextResponse.json({
      ok: true,
      redirectUrl: "/account",
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
