import { type CheckoutPlan } from "@/lib/purchase-service";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || "https://api-m.paypal.com";

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

const PAYPAL_CLIENT_SECRET =
  process.env.PAYPAL_CLIENT_SECRET || "";

export function getPayPalClientId() {
  return PAYPAL_CLIENT_ID;
}

export function assertPayPalServerConfig() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials are not configured.");
  }
}

export async function getPayPalAccessToken() {
  assertPayPalServerConfig();

  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = (await response.json()) as { access_token?: string; error_description?: string };

  if (!response.ok || !data?.access_token) {
    throw new Error(data?.error_description || "Failed to get PayPal access token.");
  }

  return data.access_token;
}

export async function createPayPalOrder({
  plan,
  amount,
}: {
  plan: CheckoutPlan;
  amount: number;
}) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
          description:
            plan === "onrec"
              ? "On Rec Revenue Snapshot"
              : "Online Playground Revenue Snapshot",
          custom_id: plan === "onrec" ? "on_rec" : "pg",
        },
      ],
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as { id?: string; message?: string };

  if (!response.ok || !data?.id) {
    throw new Error(data?.message || "Failed to create PayPal order.");
  }

  return data;
}

export async function capturePayPalOrder(orderID: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(
      (typeof data?.message === "string" && data.message) ||
        "Failed to capture PayPal order."
    );
  }

  return data;
}

export async function getPayPalCaptureDetails(captureID: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/payments/captures/${captureID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(
      (typeof data?.message === "string" && data.message) ||
        "Failed to fetch PayPal capture details."
    );
  }

  return data;
}

export async function getPayPalOrderDetails(orderID: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(
      (typeof data?.message === "string" && data.message) ||
        "Failed to fetch PayPal order details."
    );
  }

  return data;
}
