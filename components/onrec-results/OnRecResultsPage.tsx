"use client";

import { ResultsTopMenu } from "@/components/results/ResultsTopMenu";
import type { OnRecResultPageData } from "@/lib/onrec-results/types";

function slugHref(id: string) {
  return `#${id}`;
}

export function OnRecResultsPage({
  data,
  profileHref,
}: {
  data: OnRecResultPageData;
  profileHref?: string;
}) {
  return (
    <main className="min-h-screen bg-[#08111e] text-white">
      <div className="results-mobile-placeholder">
        <div className="results-mobile-placeholder__inner">
          <div className="results-mobile-placeholder__kicker">On Rec Results</div>
          <h1 className="results-mobile-placeholder__title">
            Отображается только на десктоп версии
          </h1>
          <p className="results-mobile-placeholder__copy">
            Для просмотра результата открой эту страницу с ноутбука или десктопа.
          </p>
        </div>
      </div>
      <div className="results-desktop-shell">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,169,59,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(39,89,168,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(199,169,59,0.08),transparent_26%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,30,0.65),rgba(8,17,30,0.96))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-16 pt-6">
        <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[#121923] px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:px-8 md:py-8">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[30px] bg-white/[0.04] p-6 md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,169,59,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(199,169,59,0.08),transparent_28%)]" />
              <div className="relative z-10">
                <div className="text-[11px] uppercase tracking-[0.24em] text-[#c7a93b]">
                  {data.subtitle}
                </div>
                <h1 className="mt-4 max-w-[780px] text-[38px] font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-[60px]">
                  {data.title}
                </h1>
                <p className="mt-5 max-w-[820px] text-[18px] leading-[1.45] text-white/80 md:text-[20px]">
                  {data.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-white/78">
                    Service: On Rec
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-white/78">
                    Token prefix: {data.tokenLabel}
                  </div>
                  <div className="rounded-full border border-[#c7a93b]/20 bg-[#c7a93b]/10 px-4 py-2 text-sm text-[#f0d56f]">
                    {data.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-[30px] bg-[#0d131b] p-5 md:p-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#c7a93b]">
                  Навигация
                </div>
                <div className="mt-4 grid gap-3">
                  {data.sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={slugHref(section.id)}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-[#c7a93b]/40 hover:bg-white/[0.05]"
                    >
                      <div className="text-[12px] uppercase tracking-[0.18em] text-[#c7a93b]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-[20px] font-semibold leading-[1.08] text-white">
                        {section.title}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-white/56">
                        {section.subtitle}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="sticky top-3 z-30 flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-white/10 bg-[#0d131b]/88 p-3 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {data.sections.map((section) => (
              <a
                key={section.id}
                href={slugHref(section.id)}
                className="inline-flex min-h-10 items-center rounded-[16px] border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white/76 transition hover:bg-white/[0.08] hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </div>
          <ResultsTopMenu profileHref={profileHref} />
        </nav>

        <section className="grid gap-5">
          {data.sections.map((section, index) => (
            <article
              id={section.id}
              key={section.id}
              className="scroll-mt-28 overflow-hidden rounded-[32px] border border-white/10 bg-[#121923] shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
            >
              <div className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="border-b border-white/8 p-6 xl:border-b-0 xl:border-r xl:p-8">
                  <div className="text-[56px] font-semibold leading-none tracking-[-0.06em] text-white/14 md:text-[84px]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[#c7a93b]">
                    {section.subtitle}
                  </div>
                  <h2 className="mt-3 text-[30px] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[42px]">
                    {section.title}
                  </h2>
                  <div className="mt-8 rounded-[24px] border border-white/10 bg-[#0d131b] p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#c7a93b]">
                      {section.purposeTitle}
                    </div>
                    <div className="mt-4 space-y-3 text-[15px] leading-7 text-white/72">
                      {section.purpose.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 xl:p-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                      >
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/36">
                          Поле
                        </div>
                        <div className="mt-3 text-[18px] font-medium leading-[1.3] text-white">
                          {item}
                        </div>
                        <div className="mt-3 text-sm leading-6 text-white/46">
                          Сюда позже подставим данные из Notion / Make для конкретного клиента.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      </div>
      <style jsx global>{`
        @media (max-width: 1023px) {
          .results-desktop-shell {
            display: none;
          }

          .results-mobile-placeholder {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
          }

          .results-mobile-placeholder__inner {
            width: 100%;
            max-width: 560px;
            border-radius: 28px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(13, 19, 27, 0.88);
            padding: 28px 24px;
            text-align: center;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
          }

          .results-mobile-placeholder__kicker {
            font-size: 11px;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: #c7a93b;
          }

          .results-mobile-placeholder__title {
            margin: 14px 0 0;
            font-size: 34px;
            line-height: 1.02;
            letter-spacing: -0.04em;
            color: #fff;
          }

          .results-mobile-placeholder__copy {
            margin: 14px 0 0;
            font-size: 16px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.68);
          }
        }

        @media (min-width: 1024px) {
          .results-mobile-placeholder {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
