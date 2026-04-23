import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import MetaPixelConsent from "@/components/MetaPixelConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://revenue-snapshot2026.vercel.app"),
  title: "Revenue Snapshot",
  description: "Интерактивная карта экономики бизнеса",
  icons: {
    icon: "/fav.ico",
    shortcut: "/fav.ico",
    apple: "/fav.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050f28",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <MetaPixelConsent />
        <CookieConsent />
      </body>
    </html>
  );
}
