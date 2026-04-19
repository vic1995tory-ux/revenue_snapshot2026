"use client";

import type { ReactNode } from "react";
import type { RoadmapData, SolutionData } from "@/lib/results/types";
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

function getPriorityToneClasses(tone: PriorityTone) {
  if (tone === "high") {
    return {
      badge: "border-[#f7d237]/30 bg-[#f7d237]/12 text-[#f7d237]",
      dot: "bg-[#f7d237]",
      label: "High priority",
    };
  }

  if (tone === "medium") {
    return {
      badge: "border-white/15 bg-white/[0.08] text-white/80",
      dot: "bg-[#8fa8ff]",
      label: "Medium priority",
    };
  }

  return {
    badge: "border-white/10 bg-white/[0.05] text-white/65",
    dot: "bg-white/35",
    label: "Lower priority",
  };
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

function SolutionFlow({
  roadmap,
}: {
  roadmap: RoadmapData;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Priority flow
          </div>
          <h3 className="mt-2 text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            Task order and execution sequence
          </h3>
        </div>

        <div className="text-sm leading-[1.6] text-white/52 md:max-w-[420px] md:text-right">
          Solution should behave as an operating sequence: first remove overload,
          then improve conversion, then scale the system.
        </div>
      </div>

      <div className="mt-6 hidden items-center gap-3 lg:flex">
        {roadmap.phases.map((phase, index) => {
          const tone = getPhaseTone(index);
          const styles = getPhaseToneClasses(tone);

          return (
            <div
              key={`${phase.period}-${phase.title}`}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <div className="min-w-0 flex-1 rounded-[20px] border border-white/10 bg-[#0a1b38] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-white/45">
                    Phase {index + 1}
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] ${styles.badge}`}
                  >
                    {styles.label}
                  </span>
                </div>

                <div className="mt-3 text-[18px] font-medium leading-[1.3] text-white">
                  {phase.title}
                </div>

                <div className="mt-2 text-sm leading-[1.55] text-white/58">
                  {phase.description}
                </div>

                <div className="mt-4">
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

              {index < roadmap.phases.length - 1 ? (
                <div className="shrink-0 text-white/24">
                  <MoveRight size={18} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:hidden">
        {roadmap.phases.map((phase, index) => {
          const tone = getPhaseTone(index);
          const styles = getPhaseToneClasses(tone);

          return (
            <div
              key={`${phase.period}-${phase.title}-mobile`}
              className="rounded-[22px] border border-white/10 bg-[#0a1b38] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
                  <div className="text-xs uppercase tracking-[0.14em] text-white/45">
                    Phase {index + 1}
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] ${styles.badge}`}
                >
                  {styles.label}
                </span>
              </div>

              <div className="mt-3 text-[17px] font-medium leading-[1.35] text-white">
                {phase.title}
              </div>

              <div className="mt-2 text-sm leading-[1.55] text-white/58">
                {phase.description}
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/8">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${styles.bar} ${getPhaseProgress(index)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SolutionExecutionMap({
  solution,
}: {
  solution: SolutionData;
}) {
  const priorities = solution.priorities ?? [];
  const outcomes = solution.expectedOutcomes ?? [];

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Execution map
          </div>
          <h3 className="mt-2 text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            What needs to be executed inside the solution
          </h3>
        </div>

        <div className="text-sm leading-[1.6] text-white/52 md:max-w-[430px] md:text-right">
          This layer should show concrete execution priorities, not repeat the roadmap.
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

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {priorities.map((item, index) => {
          const tone = item.priority ?? (index === 0 ? "high" : index === 1 ? "medium" : "low");
          const styles = getPriorityToneClasses(tone);

          return (
            <div
              key={`${item.step}-${item.label}`}
              className="rounded-[24px] border border-white/10 bg-[#0a1b38] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
                  <div className="text-xs uppercase tracking-[0.14em] text-white/42">
                    Step {item.step}
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] ${styles.badge}`}
                >
                  {styles.label}
                </span>
              </div>

              <div className="mt-3 text-[19px] font-medium leading-[1.3] text-white">
                {item.label}
              </div>

              <div className="mt-3 text-sm leading-[1.6] text-white/60">
                {item.description}
              </div>
            </div>
          );
        })}
      </div>

      {outcomes.length ? (
        <div className="mt-6">
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Expected outcomes
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {outcomes.map((item) => (
              <div
                key={item.label}
                className="rounded-[20px] border border-white/10 bg-[#0a1b38] p-4"
              >
                <div className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                  {item.label}
                </div>
                <div className="mt-2 text-sm leading-[1.6] text-white/76">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ResultsSolutionSection({
  solution,
  roadmap,
}: {
  solution: SolutionData;
  roadmap: RoadmapData;
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

        <SolutionFlow roadmap={roadmap} />

        <SolutionExecutionMap solution={solution} />
      </div>
    </section>
  );
}
