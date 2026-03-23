import { Suspense } from "react";
import StartPageClient from "./StartPageClient";

export default function StartPagePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0b1d3a] text-white">
          <div className="relative isolate overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,210,55,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%)]" />
            <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
              <div className="w-full max-w-xl rounded-[28px] border border-white/12 bg-white/8 p-8 backdrop-blur-xl">
                <div className="mb-5 inline-flex rounded-full border border-[#f7d237]/30 bg-[#f7d237]/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                  Revenue Snapshot
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  Проверяем оплату...
                </h1>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Подождите пару секунд. Мы сверяем оплату и подготавливаем ваш
                  защищённый доступ.
                </p>

                <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-[#f7d237]" />
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    >
      <StartPageClient />
    </Suspense>
  );
}
