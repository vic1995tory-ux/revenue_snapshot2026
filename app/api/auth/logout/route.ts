import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function POST() {
  try {
const cookieStore = await cookies();
const session = (await getIronSession(
  cookieStore as any,
  sessionOptions
)) as any;

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
