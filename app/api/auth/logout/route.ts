import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function POST() {
  try {
    const session = await getIronSession(cookies(), sessionOptions);
    session.destroy();

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("auth/logout error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Не удалось завершить сессию.",
      },
      { status: 500 }
    );
  }
}
