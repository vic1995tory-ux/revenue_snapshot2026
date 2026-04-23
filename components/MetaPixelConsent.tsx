"use client";

import { useEffect, useRef } from "react";
import {
  CONSENT_EVENT,
  readStoredConsent,
  type ConsentState,
} from "@/lib/consent";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      push?: (...args: unknown[]) => void;
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
  }
}

const META_PIXEL_ID = "3488346524650921";

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  if (document.getElementById("meta-pixel-script")) return;

  ((f, b, e, v, n?: typeof window.fbq, t?: HTMLScriptElement, s?: Element | null) => {
    if (f.fbq) return;
    n = function (...args: unknown[]) {
      if (n?.callMethod) {
        n.callMethod(...args);
      } else {
        n?.queue?.push(args);
      }
    };
    if (!f._fbq) f._fbq = n;
    n.push = (...args: unknown[]) => n?.queue?.push(args);
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e) as HTMLScriptElement;
    t.id = "meta-pixel-script";
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
    f.fbq = n;
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

export default function MetaPixelConsent() {
  const loadedRef = useRef(false);

  useEffect(() => {
    const syncMeta = (consent: ConsentState | null) => {
      if (!consent?.marketing || loadedRef.current) return;

      loadMetaPixel();
      loadedRef.current = true;
    };

    syncMeta(readStoredConsent());

    const handleConsent = (event: Event) => {
      syncMeta((event as CustomEvent<ConsentState>).detail);
    };

    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsent);
  }, []);

  return null;
}
