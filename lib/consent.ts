export const CONSENT_STORAGE_KEY = "growth_avenue_consent_v1";
export const CONSENT_COOKIE_NAME = "growth_avenue_consent";
export const CONSENT_EVENT = "growth-avenue-consent-change";

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

export const DEFAULT_CONSENT: ConsentState = {
  analytics: false,
  marketing: false,
};

export function serializeConsent(consent: ConsentState) {
  return JSON.stringify(consent);
}

export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function writeConsentCookie(consent: ConsentState) {
  if (typeof document === "undefined") return;

  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(serializeConsent(consent))}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}

export function persistConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(consent));
  writeConsentCookie(consent);
  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_EVENT, {
      detail: consent,
    }),
  );
}

export function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}
