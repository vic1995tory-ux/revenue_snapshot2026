"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  DEFAULT_CONSENT,
  persistConsent,
  readStoredConsent,
  type ConsentState,
} from "@/lib/consent";

export default function CookieConsent() {
  const visible = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      const handleChange = () => onStoreChange();
      window.addEventListener(CONSENT_EVENT, handleChange);
      return () => window.removeEventListener(CONSENT_EVENT, handleChange);
    },
    () => !readStoredConsent(),
    () => false,
  );

  const applyConsent = (consent: ConsentState) => {
    persistConsent(consent);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "min(960px, 100%)",
          borderRadius: 24,
          border: "1px solid rgba(247,210,55,0.22)",
          background:
            "linear-gradient(180deg, rgba(6,18,44,0.96), rgba(4,16,39,0.98))",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          padding: "20px 22px",
          color: "rgba(255,255,255,0.92)",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 420px" }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#f7d237",
                fontWeight: 800,
              }}
            >
              Cookie Consent
            </div>
            <p style={{ margin: "10px 0 0", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              We use analytics and advertising cookies only after your consent. This helps
              Google Analytics and Meta Pixel work in line with EEA consent requirements.
              You can review details in our <Link href="/privacy-policy" style={{ color: "#f7d237" }}>Privacy Policy</Link> and{" "}
              <Link href="/terms-of-use" style={{ color: "#f7d237" }}>Terms of Use</Link>.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button
              type="button"
              onClick={() => applyConsent(DEFAULT_CONSENT)}
              style={{
                minHeight: 44,
                padding: "0 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "transparent",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Necessary only
            </button>
            <button
              type="button"
              onClick={() => applyConsent({ analytics: true, marketing: true })}
              style={{
                minHeight: 44,
                padding: "0 18px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, rgba(247,210,55,0.98), rgba(247,210,55,0.9))",
                color: "#0b1d3a",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Accept analytics and ads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
