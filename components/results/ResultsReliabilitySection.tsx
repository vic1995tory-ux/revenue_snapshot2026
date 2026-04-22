"use client";

import type { ReliabilityData } from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";

export function ResultsReliabilitySection({
  reliability,
}: {
  reliability: ReliabilityData;
}) {
  return (
    <section className="rounded-[32px] bg-[#121923] p-6 md:p-8">
      <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
        Надёжность
      </div>
      <h2 className="mt-2 text-[36px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
        Риски
      </h2>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <table className="w-full text-left text-sm">
            <tbody>
              {reliability.risks.map((item) => (
                <tr key={item.risk} className="border-b border-white/7 last:border-b-0">
                  <th className="w-[34%] py-4 pr-4 align-top font-medium text-white">
                    {item.risk}
                  </th>
                  <td className="py-4 pr-4 align-top text-white/62">
                    {item.whyItMatters}
                  </td>
                  <td className="py-4 align-top">
                    {item.confidenceLevel ? (
                      <ConfidenceDots level={item.confidenceLevel} />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Не хватает
          </div>
          <div className="mt-4 grid gap-2">
            {reliability.missingData.map((item) => (
              <div key={item} className="text-[15px] leading-[1.55] text-white/68">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-7 max-w-[980px] text-[15px] leading-[1.7] text-white/54">
        {reliability.confidenceNote}
      </p>
    </section>
  );
}
