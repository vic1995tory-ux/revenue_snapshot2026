"use client";

import type { RoadmapData } from "@/lib/results/types";

export function ResultsRoadmapSection({ roadmap }: { roadmap: RoadmapData }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
        Roadmap
      </div>

      <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em]">
        Пошаговая логика внедрения
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {roadmap.phases.map((phase) => (
          <article
            key={phase.period}
            className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5"
          >
            <div className="text-sm text-[#f7d237]">{phase.period}</div>
            <div className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">
              {phase.title}
            </div>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/68">
              {phase.description}
            </p>

            <div className="mt-4 grid gap-2">
              {phase.tasks.map((task) => (
                <div key={task} className="rounded-full bg-white/6 px-3 py-2 text-sm text-white/82">
                  {task}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
