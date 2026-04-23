export type PurchaseServiceCode =
  | "pg"
  | "on_rec"
  | "ss"
  | "gs"
  | "mvp"
  | "ls"
  | "men"
  | "sa";

export type CheckoutPlan = "playground" | "onrec";

const PLAN_TO_SERVICE_CODE: Record<CheckoutPlan, PurchaseServiceCode> = {
  playground: "pg",
  onrec: "on_rec",
};

export const TOKEN_SERVICE_LABELS: Array<[PurchaseServiceCode, string]> = [
  ["on_rec", "On Rec Revenue Snapshot"],
  ["pg", "Playground Revenue Snapshot"],
  ["ss", "Strat Session"],
  ["gs", "Growth Strategy"],
  ["mvp", "MVP"],
  ["ls", "Leading Strategy"],
  ["men", "Mentoring"],
  ["sa", "Sales Architecture"],
];

export function getServiceCodeFromPlan(
  value: string | null | undefined
): PurchaseServiceCode | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();

  if (
    normalized === "pg" ||
    normalized === "on_rec" ||
    normalized === "ss" ||
    normalized === "gs" ||
    normalized === "mvp" ||
    normalized === "ls" ||
    normalized === "men" ||
    normalized === "sa"
  ) {
    return normalized as PurchaseServiceCode;
  }

  if (normalized === "playground") return PLAN_TO_SERVICE_CODE.playground;
  if (normalized === "onrec" || normalized === "on_rec") {
    return PLAN_TO_SERVICE_CODE.onrec;
  }

  return null;
}

export function getServiceCodeFromToken(
  token: string | null | undefined
): PurchaseServiceCode | null {
  if (!token) return null;

  const normalized = token.trim().toLowerCase();

  for (const [prefix] of TOKEN_SERVICE_LABELS) {
    if (
      normalized === prefix ||
      normalized.startsWith(`${prefix}_`) ||
      normalized.startsWith(`${prefix}-`)
    ) {
      return prefix;
    }
  }

  return null;
}

export function getPurchasedServiceLabel(
  token: string,
  isDemoAccount: boolean
) {
  if (isDemoAccount) return "Revenue Snapshot";

  const code = getServiceCodeFromToken(token);
  if (!code) return "Revenue Snapshot";

  const match = TOKEN_SERVICE_LABELS.find(([prefix]) => prefix === code);
  return match?.[1] ?? "Revenue Snapshot";
}
