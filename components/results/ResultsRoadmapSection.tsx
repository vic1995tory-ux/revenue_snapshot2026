"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import type { ConfidenceLevel, RoadmapData, RoadmapTask } from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";

type DrawerState =
  | {
      phaseIndex: number;
      phasePeriod: string;
      phaseTitle: string;
      phaseDescription: string;
      task: RoadmapTask;
    }
  | null;

function getPhaseAccent(index: number) {
  if (index === 0) {
    return {
      border: "border-[#f7d237]/24",
      glow: "shadow-[0_0_0_1px_rgba(247,210,55,0.08)]",
      title: "text-[#f7d237]",
      dot: "bg-[#f7d237]",
      line: "bg-[#f7d237]/30",
      node:
        "border-[#f7d237]/18 bg-[#f7d237]/10 hover:bg-[#f7d237]/14 text-[#fff8d6]",
    };
  }

  if (index === 1) {
    return {
      border: "border-[#8ea8ff]/18",
      glow: "shadow-[0_0_0_1px_rgba(142,168,255,0.06)]",
      title: "text-[#b9c8ff]",
      dot: "bg-[#8ea8ff]",
      line: "bg-[#8ea8ff]/22",
      node:
        "border-[#8ea8ff]/16 bg-[#8ea8ff]/10 hover:bg-[#8ea8ff]/14 text-white/88",
    };
  }

  return {
    border: "border-white/10",
    glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
    title: "text-white/72",
    dot: "bg-white/40",
    line: "bg-white/14",
    node:
      "border-white/10 bg-white/[0.05] hover:bg-white/[0.08] text-white/84",
  };
}

function prettyPhase(period: string, index: number) {
  if (period === "unlock") return `Phase ${index + 1}`;
  if (period === "leverage") return `Phase ${index + 1}`;
  if (period === "scale") return `Phase ${index + 1}`;
  return `Phase ${index + 1}`;
}

function phaseLabel(period: string) {
  if (period === "unlock") return "Unlock";
  if (period === "leverage") return "Leverage";
  if (period === "scale") return "Scale";
  return period;
}

function confidenceText(level?: ConfidenceLevel) {
  if (level === 3) return "Устойчивый сигнал";
  if (level === 2) return "Вероятный сигнал";
  return "Предварительный сигнал";
}

export function ResultsRoadmapSection({ roadmap }: { roadmap: RoadmapData }) {
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const phases = useMemo(() => {
    return roadmap.phases.map((phase, index) => ({
      ...phase,
      index,
      accent: getPhaseAccent(index),
    }));
  }, [roadmap.phases]);

  return (
    <>
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
              Roadmap
            </div>

            <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
              Step-by-step execution timeline
            </h2>

            <p className="mt-4 max-w-[920px] text-[16px] leading-[1.7] text-white/66">
              Здесь важна не календарная сетка, а логика последовательности:
              у каждого действия есть свое место внутри стадии, и это не набор задач,
              которые нужно делать одновременно.
            </p>
          </div>

          <div className="text-sm text-white/46">
            Click any step
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[1180px]">
            <div className="grid grid-cols-3 gap-6">
              {phases.map((phase) => (
                <div key={`${phase.period}-${phase.title}`} className="relative">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${phase.accent.dot}`} />
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
                        {prettyPhase(phase.period, phase.index)}
                      </div>
                    </div>

                    <div className={`text-[11px] uppercase tracking-[0.16em] ${phase.accent.title}`}>
                      {phaseLabel(phase.period)}
                    </div>
                  </div>

                  <div
                    className={`rounded-[24px] border bg-[#0d1c36] p-5 ${phase.accent.border} ${phase.accent.glow}`}
                  >
                    <div className={`text-[11px] uppercase tracking-[0.14em] ${phase.accent.title}`}>
                      Stage objective
                    </div>

                    <div className="mt-3 text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
                      {phase.title}
                    </div>

                    <div className="mt-4 text-sm leading-[1.65] text-white/62">
                      {phase.description}
                    </div>
                  </div>

                  <div className="relative mt-6 px-4">
                    <div className={`absolute left-[26px] right-[26px] top-[24px] h-[2px] ${phase.accent.line}`} />

                    <div className="relative flex items-start justify-between gap-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <div
                          key={`${phase.period}-${task.label}-${taskIndex}`}
                          className="flex min-w-0 flex-1 flex-col items-center"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setDrawer({
                                phaseIndex: phase.index,
                                phasePeriod: phase.period,
                                phaseTitle: phase.title,
                                phaseDescription: phase.description,
                                task,
                              })
                            }
                            className={`group flex h-12 min-w-[96px] items-center justify-center rounded-full border px-4 text-sm font-medium transition hover:translate-y-[-1px] ${phase.accent.node}`}
                          >
                            <span>{task.label}</span>
                          </button>

                          <div className="mt-3 max-w-[160px] text-center text-[12px] leading-[1.45] text-white/46">
                            {task.action}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {drawer ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(null)}
            />

            <motion.aside
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[560px] border-l border-white/10 bg-[#081427] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">
                      {prettyPhase(drawer.phasePeriod, drawer.phaseIndex)} · {phaseLabel(drawer.phasePeriod)}
                    </div>

                    <h3 className="mt-2 text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                      {drawer.task.label}
                    </h3>

                    <div className="mt-3 text-sm text-white/46">
                      {drawer.phaseTitle}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDrawer(null)}
                    className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70 transition hover:bg-white/[0.08]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="space-y-5">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                        Action
                      </div>
                      <div className="mt-2 text-sm leading-[1.75] text-white/84">
                        {drawer.task.action}
                      </div>
                    </div>

                    {drawer.task.whyThisPhase ? (
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          Why this phase
                        </div>
                        <div className="mt-2 text-sm leading-[1.75] text-white/76">
                          {drawer.task.whyThisPhase}
                        </div>
                      </div>
                    ) : null}

                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                            Confidence
                          </div>
                          <div className="mt-2 text-sm leading-[1.7] text-white/76">
                            {confidenceText(drawer.task.confidenceLevel)}
                          </div>
                        </div>

                        <ConfidenceDots level={drawer.task.confidenceLevel ?? 1} />
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-[#0d1c36] p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[#f7d237]">
                        Sequence note
                      </div>
                      <div className="mt-2 text-sm leading-[1.75] text-white/76">
                        Этот шаг закреплен внутри своей стадии, чтобы визуально показать:
                        сначала выполняются действия текущего этапа, затем переход к следующему.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
