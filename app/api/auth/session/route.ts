import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type AppSessionData } from "@/lib/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<AppSessionData>(
      cookieStore,
      sessionOptions
    );

    if (!session.isLoggedIn || !session.accessToken) {
      return NextResponse.json(
        {
          ok: true,
          authenticated: false,
          data: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ok: true,
      authenticated: true,
      data: {
        login: session.login ?? "",
        accessToken: session.accessToken ?? "",
        fullName: session.fullName ?? "",
        companyName: session.companyName ?? "",
      },
    });
  } catch (error) {
    console.error("auth/session error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Не удалось прочитать сессию.",
      },
      { status: 500 }
    );
  }
}
