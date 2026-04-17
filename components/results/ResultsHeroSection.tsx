"use client";

import type { HeroData } from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";
import { InfoPill } from "./InfoPill";

export function ResultsHeroSection({ hero }: { hero: HeroData }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <InfoPill>{hero.companyName}</InfoPill>
            <InfoPill>{hero.salesGeography}</InfoPill>
            <ConfidenceDots level={hero.confidenceLevel} />
          </div>

          <h1 className="text-[38px] font-semibold leading-[0.95] tracking-[-0.04em] md:text-[58px]">
            Revenue Snapshot
          </h1>

          <p className="mt-4 max-w-[760px] text-[20px] leading-[1.2] text-white/86">
            {hero.summary}
          </p>

          <p className="mt-4 max-w-[760px] text-[15px] leading-[1.6] text-white/62">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {hero.roles.map((role) => (
              <InfoPill key={`${role.role}-${role.responsibility}`}>
                {role.role}: {role.responsibility}
              </InfoPill>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5">
            <div className="text-sm text-white/52">Growth limit</div>
            <div className="mt-2 text-[24px] font-semibold leading-[1.05] tracking-[-0.03em]">
              {hero.growthLimit}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5">
            <div className="text-sm text-white/52">Cash-in</div>
            <div className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.04em]">
              {hero.cashIn}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5">
            <div className="text-sm text-white/52">Product margins</div>

            <div className="mt-4 grid gap-3">
              {hero.productMargins.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4">
                  <span className="text-white/72">{item.name}</span>
                  <span className="font-medium">{item.marginPercent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
