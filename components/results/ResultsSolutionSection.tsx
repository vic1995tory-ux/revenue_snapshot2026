"use client";

import type { ReactNode } from "react";
import type {
  ForecastsData,
  RoadmapData,
  SolutionCard,
  SolutionData,
  SolutionKPI,
  SolutionPriorityItem,
} from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";
import {
  ArrowRight,
  CircleAlert,
  Gauge,
  Layers3,
  MoveRight,
  TrendingUp,
} from "lucide-react";

type PriorityTone = "high" | "medium" | "low";

function getPhaseTone(index: number): PriorityTone {
  if (index === 0) return "high";
  if (index === 1) return "medium";
  return "low";
}

function getPhaseToneClasses(tone: PriorityTone) {
  if (tone === "high") {
    return {
      badge: "border-[#f7d237]/30 bg-[#f7d237]/12 text-[#f7d237]",
      bar: "from-[#f7d237] to-[#d4b11d]",
      dot: "bg-[#f7d237]",
      label: "Immediate priority",
    };
  }

  if (tone === "medium") {
    return {
      badge: "border-white/15 bg-white/[0.08] text-white/80",
      bar: "from-[#8fa8ff] to-[#5f79d9]",
      dot: "bg-[#8fa8ff]",
      label: "Second priority",
    };
  }

  return {
    badge: "border-white/10 bg-white/[0.05] text-white/65",
    bar: "from-[#5f6b85] to-[#3e4960]",
    dot: "bg-white/35",
    label: "Later phase",
  };
}

function getPhaseProgress(index: number) {
  if (index === 0) return "w-full";
  if (index === 1) return "w-2/3";
  return "w-1/3";
}

function SolutionSignalCard({
  eyebrow,
  title,
  note,
  icon,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0b2148] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-white/52">{eyebrow}</div>
        <div className="mt-0.5 text-white/40">{icon}</div>
      </div>

      <div className="mt-3 text-[18px] font-medium leading-[1.35] text-white">
        {title}
      </div>

      {note ? (
        <div className="mt-3 text-sm leading-[1.58] text-white/60">{note}</div>
      ) : null}
    </div>
  );
}

function getLinkedSolutionCard(index: number, cards: SolutionCard[]) {
  if (index === 0) return cards[1] ?? cards[0];
  if (index === 1) return cards[0] ?? cards[2];
  return cards[3] ?? cards[0];
}

function getStagePriority(
  index: number,
  priorities: SolutionPriorityItem[],
) {
  return priorities[index];
}

function getStageKpis(
  index: number,
  kpis: SolutionKPI[],
  forecasts: ForecastsData,
) {
  if (index === 0) {
    return [
      kpis.find((item) => item.label === "Capacity load") ?? {
        label: "Capacity load",
        current: forecasts.costs.current,
        target: forecasts.costs.target,
        change: `${forecasts.costs.delta}%`,
      },
    ];
  }

  if (index === 1) {
    return [
      kpis.find((item) => item.label === "Conversion"),
      kpis.find((item) => item.label === "Revenue") ?? {
        label: "Revenue",
        current: forecasts.revenue.current,
        target: forecasts.revenue.target,
        change: `+${forecasts.revenue.delta}%`,
      },
    ].filter(Boolean) as SolutionKPI[];
  }

  return [
    kpis.find((item) => item.label === "Profit") ?? {
      label: "Profit",
      current: forecasts.profit.current,
      target: forecasts.profit.target,
      change: `+${forecasts.profit.delta}%`,
    },
    kpis.find((item) => item.label === "Revenue"),
  ].filter(Boolean) as SolutionKPI[];
}

function getStageControlPoints(roadmap: RoadmapData, index: number) {
  const points = roadmap.controlPoints ?? [];
  const chunkSize = Math.ceil(points.length / Math.max(roadmap.phases.length, 1));
  return points.slice(index * chunkSize, index * chunkSize + chunkSize);
}

function SolutionStageSystem({
  solution,
  roadmap,
  forecasts,
}: {
  solution: SolutionData;
  roadmap: RoadmapData;
  forecasts: ForecastsData;
}) {
  const priorities = solution.priorities ?? [];
  const kpis = solution.kpis ?? [];

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Solution system
          </div>
          <h3 className="mt-2 text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            One logic, three stages, measurable impact
          </h3>
        </div>

        <div className="text-sm leading-[1.6] text-white/52 md:max-w-[430px] md:text-right">
          Solution, roadmap and forecasts are combined by stage: each phase
          shows what it fixes, what to do, and which numbers should move.
        </div>
      </div>

      {solution.decisionRule ? (
        <div className="mt-6 rounded-[22px] border border-white/10 bg-[#0a1b38] p-4">
          <div className="text-[11px] uppercase tracking-[0.12em] text-white/40">
            Decision rule
          </div>
          <div className="mt-2 text-[17px] font-medium leading-[1.45] text-white">
            {solution.decisionRule}
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5">
        {roadmap.phases.map((phase, index) => {
          const tone = getPhaseTone(index);
          const styles = getPhaseToneClasses(tone);
          const linkedCard = getLinkedSolutionCard(index, solution.cards);
          const priority = getStagePriority(index, priorities);
          const stageKpis = getStageKpis(index, kpis, forecasts);
          const controlPoints = getStageControlPoints(roadmap, index);

          return (
            <div
              key={`${phase.period}-${phase.title}`}
              className="rounded-[26px] border border-white/10 bg-[#0a1b38] p-5 md:p-6"
            >
              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.08em] ${styles.badge}`}
                    >
                      Stage {index + 1}: {phase.period}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/38">
                      <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
                      {styles.label}
                    </span>
                  </div>

                  <div className="mt-4 text-[22px] font-semibold leading-[1.16] tracking-[-0.03em] text-white md:text-[28px]">
                    {phase.title}
                  </div>

                  <div className="mt-3 text-sm leading-[1.65] text-white/60">
                    {phase.description}
                  </div>

                  {linkedCard ? (
                    <div className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-[#f7d237]">
                        Linked solution piece
                      </div>
                      <div className="mt-2 text-[17px] font-medium leading-[1.35] text-white">
                        {linkedCard.value}
                      </div>
                      {linkedCard.note ? (
                        <div className="mt-2 text-sm leading-[1.6] text-white/58">
                          {linkedCard.note}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-4">
                  {priority ? (
                    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/40">
                        <ArrowRight size={14} />
                        Priority action
                      </div>
                      <div className="mt-2 text-[17px] font-medium leading-[1.4] text-white">
                        {priority.label}
                      </div>
                      <div className="mt-2 text-sm leading-[1.6] text-white/58">
                        {priority.description}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid gap-3 md:grid-cols-2">
                    {stageKpis.map((item) => (
                      <div
                        key={`${phase.period}-${item.label}`}
                        className="rounded-[18px] border border-white/10 bg-[#091934] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                            {item.label}
                          </div>
                          {item.change ? (
                            <div className="text-xs font-medium text-emerald-300">
                              {item.change}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.12em] text-white/32">
                              Current
                            </div>
                            <div className="mt-1 text-[15px] font-medium text-white">
                              {item.current ?? "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.12em] text-white/32">
                              Target
                            </div>
                            <div className="mt-1 text-[15px] font-medium text-white">
                              {item.target ?? "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-[0.12em] text-white/38">
                      Execution weight
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${styles.bar} ${getPhaseProgress(index)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {phase.tasks.slice(0, 3).map((task) => (
                  <div
                    key={`${phase.period}-${task.action}`}
                    className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="text-[11px] uppercase tracking-[0.12em] text-white/35">
                      {task.label}
                    </div>
                    <div className="mt-2 text-sm leading-[1.55] text-white/78">
                      {task.action}
                    </div>
                  </div>
                ))}
              </div>

              {controlPoints.length ? (
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {controlPoints.map((point) => (
                    <div
                      key={`${phase.period}-${point.metric}`}
                      className="rounded-[18px] border border-white/8 bg-white/[0.025] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-[#f7d237]">
                          Control point
                        </div>
                        {point.confidenceLevel ? (
                          <ConfidenceDots level={point.confidenceLevel} />
                        ) : null}
                      </div>
                      <div className="mt-2 text-[15px] font-medium text-white">
                        {point.metric}
                      </div>
                      <div className="mt-2 text-sm leading-[1.55] text-white/58">
                        {point.signal}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {index < roadmap.phases.length - 1 ? (
                <div className="mt-5 flex justify-center text-white/24">
                  <MoveRight size={20} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ResultsSolutionSection({
  solution,
  roadmap,
  forecasts,
}: {
  solution: SolutionData;
  roadmap: RoadmapData;
  forecasts: ForecastsData;
}) {
  const [leverCard, constraintCard, lossCard, modelShiftCard] = solution.cards;
  const priorityLabels = (solution.priorities ?? []).slice(0, 3);

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[980px]">
            <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
              Solution
            </div>

            <h2 className="mt-3 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[52px]">
              {solution.title}
            </h2>

            <p className="mt-5 max-w-[980px] text-[17px] leading-[1.7] text-white/72 md:text-[18px]">
              {solution.summary}
            </p>
          </div>

          <div className="shrink-0 pt-1">
            <ConfidenceDots level={solution.confidenceLevel} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              {leverCard ? (
                <SolutionSignalCard
                  eyebrow={leverCard.title}
                  title={leverCard.value}
                  note={leverCard.note}
                  icon={<TrendingUp size={18} />}
                />
              ) : null}

              {constraintCard ? (
                <SolutionSignalCard
                  eyebrow={constraintCard.title}
                  title={constraintCard.value}
                  note={constraintCard.note}
                  icon={<CircleAlert size={18} />}
                />
              ) : null}

              {lossCard ? (
                <SolutionSignalCard
                  eyebrow={lossCard.title}
                  title={lossCard.value}
                  note={lossCard.note}
                  icon={<Gauge size={18} />}
                />
              ) : null}

              {modelShiftCard ? (
                <SolutionSignalCard
                  eyebrow={modelShiftCard.title}
                  title={modelShiftCard.value}
                  note={modelShiftCard.note}
                  icon={<Layers3 size={18} />}
                />
              ) : null}
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="h-full rounded-[28px] border border-white/10 bg-[#0a1b38] p-5">
              <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
                Decision rule
              </div>

              <div className="mt-3 text-[22px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                {solution.decisionRule || "Do not add demand before system repair"}
              </div>

              <div className="mt-4 text-sm leading-[1.65] text-white/60">
                The solution logic here is sequential: remove founder overload,
                increase processing quality, then convert existing demand better,
                and only after that build repeatable scale.
              </div>

              <div className="mt-6 space-y-3">
                {priorityLabels[0] ? (
                  <div className="rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                      First
                    </div>
                    <div className="mt-1 text-sm leading-[1.55] text-white/84">
                      {priorityLabels[0].label}
                    </div>
                  </div>
                ) : null}

                {priorityLabels[1] ? (
                  <div className="rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                      Then
                    </div>
                    <div className="mt-1 text-sm leading-[1.55] text-white/84">
                      {priorityLabels[1].label}
                    </div>
                  </div>
                ) : null}

                {priorityLabels[2] ? (
                  <div className="rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                      Then
                    </div>
                    <div className="mt-1 text-sm leading-[1.55] text-white/84">
                      {priorityLabels[2].label}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <SolutionStageSystem
          solution={solution}
          roadmap={roadmap}
          forecasts={forecasts}
        />
      </div>
    </section>
  );
}
