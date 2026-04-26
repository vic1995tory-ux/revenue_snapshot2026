"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  CONSENT_EVENT,
  readStoredConsent,
  type ConsentState,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-3C4NMTKDRJ";

export default function GoogleAnalyticsConsent() {
  const initializedRef = useRef(false);

  useEffect(() => {
    const syncAnalytics = (consent: ConsentState | null) => {
      if (typeof window === "undefined" || typeof window.gtag !== "function") {
        return;
      }

      const normalized = consent ?? { analytics: false, marketing: false };

      window.gtag("consent", "update", {
        analytics_storage: normalized.analytics ? "granted" : "denied",
        ad_storage: normalized.marketing ? "granted" : "denied",
        ad_user_data: normalized.marketing ? "granted" : "denied",
        ad_personalization: normalized.marketing ? "granted" : "denied",
      });
    };

    const handleReady = () => {
      if (initializedRef.current) return;
      if (typeof window === "undefined" || typeof window.gtag !== "function") {
        return;
      }

      initializedRef.current = true;
      syncAnalytics(readStoredConsent());
    };

    handleReady();

    const handleConsent = (event: Event) => {
      syncAnalytics((event as CustomEvent<ConsentState>).detail);
    };

    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsent);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-global" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
