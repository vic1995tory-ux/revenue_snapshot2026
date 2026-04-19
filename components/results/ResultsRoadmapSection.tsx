"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, MoveRight, X } from "lucide-react";
import type { RoadmapData } from "@/lib/results/types";

type DrawerState =
  | {
      kind: "phase";
      phaseIndex: number;
      period: string;
      title: string;
      description: string;
      tasks: string[];
    }
  | {
      kind: "task";
      phaseIndex: number;
      period: string;
      phaseTitle: string;
      taskIndex: number;
      task: string;
      description: string;
    }
  | null;

function getPhaseMeta(index: number) {
  if (index === 0) {
    return {
      label: "Start here",
      accent: "text-[#f7d237]",
      badge:
        "border-[#f7d237]/30 bg-[#f7d237]/12 text-[#f7d237]",
      card:
        "border-[#f7d237]/20 bg-[linear-gradient(180deg,rgba(247,210,55,0.08),rgba(255,255,255,0.03))]",
      node:
        "border-[#f7d237]/18 bg-[#f7d237]/10 hover:bg-[#f7d237]/14",
      dot: "bg-[#f7d237]",
      line: "bg-[#f7d237]/35",
    };
  }

  if (index === 1) {
    return {
      label: "Next",
      accent: "text-[#9fb5ff]",
      badge:
        "border-[#8fa8ff]/20 bg-[#8fa8ff]/10 text-[#b9c8ff]",
      card:
        "border-white/10 bg-[linear-gradient(180deg,rgba(143,168,255,0.08),rgba(255,255,255,0.03))]",
      node:
        "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]",
      dot: "bg-[#8fa8ff]",
      line: "bg-white/14",
    };
  }

  return {
    label: "Later",
    accent: "text-white/55",
    badge:
      "border-white/10 bg-white/[0.05] text-white/62",
    card:
      "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]",
    node:
      "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]",
    dot: "bg-white/35",
    line: "bg-white/12",
  };
}

function prettyPhase(period: string, index: number) {
  if (period === "unlock") return `Phase ${index + 1} · Unlock`;
  if (period === "leverage") return `Phase ${index + 1} · Leverage`;
  if (period === "scale") return `Phase ${index + 1} · Scale`;
  return `Phase ${index + 1}`;
}

function taskDescription(phaseTitle: string, task: string, index: number) {
  return `Шаг ${index + 1} внутри фазы "${phaseTitle}". Это действие относится именно к этому этапу и должно выполняться в рамках текущей фазы, а не параллельно со всеми остальными инициативами.`;
}

export function ResultsRoadmapSection({ roadmap }: { roadmap: RoadmapData }) {
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const phases = useMemo(() => {
    return roadmap.phases.map((phase, index) => ({
      ...phase,
      index,
      meta: getPhaseMeta(index),
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
              Execution timeline
            </h2>

            <p className="mt-4 max-w-[920px] text-[16px] leading-[1.7] text-white/66">
              Это не календарь, а схема пошагового движения. Каждая колонка — отдельный этап.
              Задачи внутри этапа показывают, что работу нужно делать по очереди, а не запускать всё одновременно.
            </p>
          </div>

          <div className="text-sm text-white/46">
            Click any phase or task
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[1080px]">
            <div className="relative grid grid-cols-3 gap-5">
              <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[54px] h-px bg-white/12" />

              {phases.map((phase, index) => (
                <div key={`${phase.period}-${phase.title}`} className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${phase.meta.dot}`} />
                    <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
                      {prettyPhase(phase.period, index)}
                    </div>
                    <div className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${phase.meta.badge}`}>
                      {phase.meta.label}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setDrawer({
                        kind: "phase",
                        phaseIndex: index,
                        period: phase.period,
                        title: phase.title,
                        description: phase.description,
                        tasks: phase.tasks,
                      })
                    }
                    className={`w-full rounded-[24px] border p-5 text-left transition hover:translate-y-[-1px] ${phase.meta.card}`}
                  >
                    <div className={`text-[11px] uppercase tracking-[0.14em] ${phase.meta.accent}`}>
                      Main objective
                    </div>

                    <div className="mt-3 text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                      {phase.title}
                    </div>

                    <div className="mt-4 text-sm leading-[1.65] text-white/62">
                      {phase.description}
                    </div>
                  </button>

                  <div className="mt-5 flex justify-center">
                    <div className={`h-8 w-px ${phase.meta.line}`} />
                  </div>

                  <div className="space-y-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={`${phase.period}-${taskIndex}-${task}`} className="relative">
                        <div className="pointer-events-none absolute left-5 top-1/2 h-px w-5 -translate-y-1/2 bg-white/10" />

                        <button
                          type="button"
                          onClick={() =>
                            setDrawer({
                              kind: "task",
                              phaseIndex: index,
                              period: phase.period,
                              phaseTitle: phase.title,
                              taskIndex,
                              task,
                              description: taskDescription(phase.title, task, taskIndex),
                            })
                          }
                          className={`ml-10 flex w-[calc(100%-40px)] items-center justify-between gap-3 rounded-full border px-4 py-3 text-left text-sm leading-[1.45] text-white/84 transition ${phase.meta.node}`}
                        >
                          <span>{task}</span>
                          <ChevronRight size={14} className="shrink-0 text-white/42" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {index < phases.length - 1 ? (
                    <div className="mt-5 flex items-center justify-center text-white/20">
                      <MoveRight size={18} />
                    </div>
                  ) : null}
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
                      {drawer.kind === "phase" ? "Phase" : "Task"}
                    </div>

                    <h3 className="mt-2 text-[26px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                      {drawer.kind === "phase" ? drawer.title : drawer.task}
                    </h3>

                    <div className="mt-3 text-sm text-white/46">
                      {drawer.kind === "phase"
                        ? prettyPhase(drawer.period, drawer.phaseIndex)
                        : `${prettyPhase(drawer.period, drawer.phaseIndex)} · ${drawer.phaseTitle}`}
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
                  {drawer.kind === "phase" ? (
                    <div className="space-y-6">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          Role of this phase
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/78">
                          {drawer.description}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-[#f7d237]">
                          Included tasks
                        </div>

                        <div className="mt-3 space-y-3">
                          {drawer.tasks.map((task, index) => (
                            <div
                              key={`${task}-${index}`}
                              className="rounded-[18px] border border-white/10 bg-[#0d1c36] px-4 py-4"
                            >
                              <div className="text-[11px] uppercase tracking-[0.14em] text-white/36">
                                Step {index + 1}
                              </div>
                              <div className="mt-2 text-sm leading-[1.65] text-white/82">
                                {task}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          Phase
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/82">
                          {drawer.phaseTitle}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          Why this is here
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/76">
                          {drawer.description}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-[#0d1c36] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-[#f7d237]">
                          Sequence note
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/76">
                          Этот шаг визуально закреплен внутри своей фазы, чтобы показать:
                          его место — именно здесь, а не “когда-нибудь параллельно со всем остальным”.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
