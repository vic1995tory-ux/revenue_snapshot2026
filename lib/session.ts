import type { SessionOptions } from "iron-session";

export type AppSessionData = {
  isLoggedIn?: boolean;
  accessToken?: string;
  login?: string;
  fullName?: string;
  companyName?: string;
};

const sessionPassword =
  process.env.SESSION_PASSWORD ?? process.env.SESSION_SECRET;

if (!sessionPassword) {
  throw new Error("SESSION_PASSWORD is required for encrypted sessions.");
}

export const sessionOptions: SessionOptions = {
  password: sessionPassword,
  cookieName: "revenue_snapshot_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};
