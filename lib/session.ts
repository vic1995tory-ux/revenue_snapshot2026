import type { SessionOptions } from "iron-session";

export type AppSessionData = {
  isLoggedIn?: boolean;
  accessToken?: string;
  login?: string;
  fullName?: string;
  companyName?: string;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "revenue_snapshot_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};
