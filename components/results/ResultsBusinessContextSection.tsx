"use client";

import { useState } from "react";
import type { BusinessContextData } from "@/lib/results/types";

export function ResultsBusinessContextSection({
  context,
}: {
  context: BusinessContextData;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-[32px] bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
            Контекст
          </div>
          <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em]">
            Данные
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full bg-white/8 px-4 py-2 text-sm text-white"
        >
          {open ? "Свернуть" : "Показать полностью"}
        </button>
      </div>

      <p className="mt-4 max-w-[960px] text-[15px] leading-[1.65] text-white/68">
        {context.summary}
      </p>

      {open ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {context.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[24px] bg-transparent p-0"
            >
              <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
                {section.title}
              </div>
              <table className="mt-4 w-full text-left text-sm">
                <tbody>
                  {section.rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/6 last:border-b-0">
                      <th className="w-[45%] py-3 pr-4 font-normal text-white/54">
                        {row.label}
                      </th>
                      <td className="py-3 text-white/88">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
