import { IronSessionOptions } from "iron-session";

export type AppSessionData = {
  isLoggedIn?: boolean;
  accessToken?: string;
  login?: string;
  fullName?: string;
  companyName?: string;
};

const password = process.env.SESSION_SECRET;

if (!password) {
  throw new Error("SESSION_SECRET is not set");
}

if (password.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters long");
}

export const sessionOptions: IronSessionOptions = {
  cookieName: "rs_session",
  password,
  ttl: 60 * 60 * 24 * 30, // 30 days
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
};

declare module "iron-session" {
  interface IronSessionData extends AppSessionData {}
}
