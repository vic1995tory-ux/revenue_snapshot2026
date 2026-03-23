"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ResolveSuccess = {
  ok: true;
  access_token: string;
  expires_at: string;
  launch_count: number;
  launch_limit: number;
  redirect_to?: string;
};

type ResolveError = {
  ok: false;
  code:
    | "missing_payment_reference"
    | "payment_not_found"
    | "payment_not_confirmed"
    | "plan_mismatch"
    | "server_error";
  message: string;
};

type ResolveResponse = ResolveSuccess | ResolveError;

export default function StartPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const src = searchParams.get("src") ?? "";
  const plan = searchParams.get("plan") ?? "";
  const tx = searchParams.get("tx") ?? "";
  const paypalToken = searchParams.get("token") ?? "";

  const paymentRef = useMemo(() => tx || paypalToken, [tx, paypalToken]);

  const [status, setStatus] = useState<
    "loading" | "error" | "redirecting"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function resolveSession() {
      if (!paymentRef) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(
          "Мы не нашли идентификатор оплаты в ссылке возврата."
        );
        setDebugInfo("Отсутствует tx или token от PayPal.");
        return;
      }

      try {
        const query = new URLSearchParams({
          payment_ref: paymentRef,
          plan,
          src,
        });

        const response = await fetch(
          `/api/paypal/resolve-session?${query.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = (await response.json()) as ResolveResponse;

        if (!isMounted) return;

        if (!response.ok || !data.ok) {
          setStatus("error");
          setErrorMessage(
            data.ok === false
              ? data.message
              : "Не удалось подтвердить оплату."
          );
          setDebugInfo(
            data.ok === false
              ? `Код: ${data.code}`
              : `HTTP ${response.status}`
          );
          return;
        }

        setStatus("redirecting");

        const redirectTo =
          data.redirect_to || `/start/${encodeURIComponent(data.access_token)}`;

        router.replace(redirectTo);
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(
          "Произошла техническая ошибка при проверке оплаты."
        );
        setDebugInfo(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }

    resolveSession();

    return () => {
      isMounted = false;
    };
  }, [paymentRef, plan, router, src]);

  return (
    <main className="min-h-screen bg-[#0b1d3a] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,210,55,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
          <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[32px] border border-white/12 bg-white/8 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:p-10">
              <div className="inline-flex rounded-full border border-[#f7d237]/35 bg-[#f7d237]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">
                secure access check
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white lg:text-5xl">
                {status === "loading" && "Проверяем оплату и подготавливаем доступ"}
                {status === "redirecting" && "Доступ подтверждён"}
                {status === "error" && "Не удалось открыть доступ"}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 lg:text-base">
                {status === "loading" &&
                  "Мы сверяем параметры возврата из PayPal, ищем подтверждённую оплату и формируем защищённую ссылку для запуска анкеты."}
                {status === "redirecting" &&
                  "Сейчас перенаправим вас на персональную стартовую страницу. Обычно это занимает пару секунд."}
                {status === "error" &&
                  "Похоже, что оплату не удалось сопоставить с активной сессией. Это не всегда означает проблему с платежом — иногда просто ещё не успела обновиться запись."}
              </p>

              <div className="mt-8">
                {status !== "error" ? (
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-[#f7d237] transition-all duration-700 ${
                        status === "loading" ? "w-1/2 animate-pulse" : "w-full"
                      }`}
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#f7d237]/20 bg-[#f7d237]/8 p-4 text-sm text-white/80">
                    <div className="font-medium text-white">Что проверить</div>
                    <div className="mt-2 space-y-1 text-white/68">
                      <p>• корректно ли сработал возврат с PayPal</p>
                      <p>• есть ли подтверждённая запись об оплате</p>
                      <p>• совпадает ли plan с нужным продуктом</p>
                    </div>
                  </div>
                )}
              </div>

              {status === "error" && (
                <div className="mt-6 rounded-[24px] border border-white/12 bg-white/6 p-5">
                  <p className="text-sm font-medium text-white">
                    {errorMessage}
                  </p>
                  {debugInfo ? (
                    <p className="mt-2 text-xs text-white/45">{debugInfo}</p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => window.location.reload()}
                      className="rounded-full border border-white/14 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/14"
                    >
                      Повторить проверку
                    </button>

                    <button
                      onClick={() => router.replace("/access-denied")}
                      className="rounded-full border border-[#f7d237]/30 bg-[#f7d237]/10 px-5 py-3 text-sm text-[#f7d237] transition hover:bg-[#f7d237]/15"
                    >
                      Перейти далее
                    </button>
                  </div>
                </div>
              )}
            </section>

            <aside className="rounded-[32px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl lg:p-8">
              <div className="text-xs uppercase tracking-[0.24em] text-white/42">
                return params
              </div>

              <div className="mt-5 space-y-4">
                <InfoRow label="src" value={src || "—"} />
                <InfoRow label="plan" value={plan || "—"} />
                <InfoRow label="tx / token" value={paymentRef || "—"} />
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-[#09162c]/70 p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Что происходит сейчас
                </div>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  Эта страница не открывает анкету напрямую. Она только проверяет,
                  что возврат действительно связан с подтверждённой оплатой, и
                  после этого переводит пользователя на защищённый адрес с токеном.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">
        {label}
      </div>
      <div className="mt-2 break-all text-sm text-white/82">{value}</div>
    </div>
  );
}
