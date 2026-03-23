import { NextResponse } from "next/server";

type PaymentStatus = "confirmed" | "pending" | "failed";
type AccessStatus = "active" | "expired" | "exhausted" | "revoked";

type PaymentRecord = {
  payment_id: string;
  plan: string;
  source?: string;
  payment_status: PaymentStatus;

  access_token?: string;
  access_expires_at?: string;
  launch_count?: number;
  launch_limit?: number;
  status?: AccessStatus;
};

type AttachAccessPayload = {
  access_token: string;
  access_expires_at: string;
  launch_count: number;
  launch_limit: number;
  status: AccessStatus;
};

type ResolveSessionSuccess = {
  ok: true;
  access_token: string;
  expires_at: string;
  launch_count: number;
  launch_limit: number;
  redirect_to: string;
};

type ResolveSessionError = {
  ok: false;
  code:
    | "missing_payment_reference"
    | "payment_not_found"
    | "payment_not_confirmed"
    | "plan_mismatch"
    | "server_error";
  message: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const paymentRef = (searchParams.get("payment_ref") || "").trim();
    const plan = (searchParams.get("plan") || "").trim();
    const src = (searchParams.get("src") || "").trim();

    if (!paymentRef) {
      const response: ResolveSessionError = {
        ok: false,
        code: "missing_payment_reference",
        message: "Не найден идентификатор оплаты в URL возврата.",
      };

      return NextResponse.json(response, { status: 400 });
    }

    const payment = await findPaymentByReference(paymentRef, src);

    if (!payment) {
      const response: ResolveSessionError = {
        ok: false,
        code: "payment_not_found",
        message: "Мы не нашли подтверждённую оплату по этому возврату.",
      };

      return NextResponse.json(response, { status: 404 });
    }

    if (payment.payment_status !== "confirmed") {
      const response: ResolveSessionError = {
        ok: false,
        code: "payment_not_confirmed",
        message: "Оплата ещё не подтверждена. Попробуйте снова через минуту.",
      };

      return NextResponse.json(response, { status: 409 });
    }

    if (plan && payment.plan && payment.plan !== plan) {
      const response: ResolveSessionError = {
        ok: false,
        code: "plan_mismatch",
        message: "Параметры тарифа не совпадают с записью об оплате.",
      };

      return NextResponse.json(response, { status: 409 });
    }

    let accessToken = payment.access_token;
    let expiresAt = payment.access_expires_at;
    let launchCount = payment.launch_count ?? 0;
    let launchLimit = payment.launch_limit ?? 3;

    if (!accessToken) {
      accessToken = generateAccessToken(32);
      expiresAt = addDaysToNowIso(7);
      launchCount = 0;
      launchLimit = 3;

      await attachAccessTokenToPayment(payment.payment_id, {
        access_token: accessToken,
        access_expires_at: expiresAt,
        launch_count: launchCount,
        launch_limit: launchLimit,
        status: "active",
      });
    }

    const response: ResolveSessionSuccess = {
      ok: true,
      access_token: accessToken,
      expires_at: expiresAt!,
      launch_count: launchCount,
      launch_limit: launchLimit,
      redirect_to: `/start/${encodeURIComponent(accessToken)}`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("resolve-session error:", error);

    const response: ResolveSessionError = {
      ok: false,
      code: "server_error",
      message: "Внутренняя ошибка при создании сессии доступа.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

function generateAccessToken(length = 32) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

function addDaysToNowIso(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/**
 * ЗАГЛУШКА №1
 * Замени это на реальный поиск оплаты:
 * - через Notion API
 * - или через Make webhook / internal endpoint
 */
async function findPaymentByReference(
  paymentRef: string,
  src?: string
): Promise<PaymentRecord | null> {
  console.log("findPaymentByReference()", { paymentRef, src });

  // ВРЕМЕННАЯ ЗАГЛУШКА ДЛЯ ТЕСТА
  // Удалишь потом, когда подключишь реальное хранилище
  if (!paymentRef) return null;

  return {
    payment_id: paymentRef,
    plan: "playground",
    source: src || "paypal",
    payment_status: "confirmed",
    access_token: undefined,
    access_expires_at: undefined,
    launch_count: 0,
    launch_limit: 3,
    status: "active",
  };
}

/**
 * ЗАГЛУШКА №2
 * Замени это на реальное обновление записи:
 * - в Notion
 * - или через Make
 */
async function attachAccessTokenToPayment(
  paymentId: string,
  payload: AttachAccessPayload
): Promise<void> {
  console.log("attachAccessTokenToPayment()", { paymentId, payload });

  // Здесь потом будет реальный update
  return;
}
