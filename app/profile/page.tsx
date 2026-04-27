import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { getSessionOptions, type AppSessionData } from "@/lib/session";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = await getIronSession<AppSessionData>(
    cookieStore,
    getSessionOptions()
  );

  if (session.isLoggedIn && session.accessToken) {
    redirect(`/account/${encodeURIComponent(session.accessToken)}`);
  }

  redirect("/cabinet-login");
}
