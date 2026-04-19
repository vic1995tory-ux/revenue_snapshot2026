"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, PanelRightOpen, X } from "lucide-react";
import type { RoadmapData } from "@/lib/results/types";

type RoadmapDrawerItem =
  | {
      type: "phase";
      phaseIndex: number;
      period: string;
      title: string;
      description: string;
      tasks: string[];
    }
  | {
      type: "task";
      phaseIndex: number;
      period: string;
      phaseTitle: string;
      taskIndex: number;
      task: string;
      description: string;
    };

function getPhaseTone(index: number) {
  if (index === 0) {
    return {
      border: "border-[#f7d237]/30",
      bg: "bg-[#f7d237]/10",
      text: "text-[#f7d237]",
      chip: "bg-[#f7d237]/14 border-[#f7d237]/20 text-[#fff4bf]",
      line: "bg-[#f7d237]/35",
      badge: "Immediate",
    };
  }

  if (index === 1) {
    return {
      border: "border-[#8ea8ff]/25",
      bg: "bg-[#8ea8ff]/10",
      text: "text-[#b9c8ff]",
      chip: "bg-[#8ea8ff]/12 border-[#8ea8ff]/18 text-white/88",
      line: "bg-[#8ea8ff]/28",
      badge: "Core",
    };
  }

  return {
    border: "border-white/12",
    bg: "bg-white/[0.05]",
    text: "text-white/72",
    chip: "bg-white/[0.06] border-white/10 text-white/82",
    line: "bg-white/16",
    badge: "Scale",
  };
}

function prettyPeriod(value: string) {
  if (value === "unlock") return "Phase 1";
  if (value === "leverage") return "Phase 2";
  if (value === "scale") return "Phase 3";
  return value;
}

function buildTaskDescription(phaseTitle: string, task: string) {
  return `Задача относится к фазе "${phaseTitle}" и является частью логики внедрения внутри этого этапа.`;
}

export function ResultsRoadmapSection({ roadmap }: { roadmap: RoadmapData }) {
  const [drawerItem, setDrawerItem] = useState<RoadmapDrawerItem | null>(null);

  const columns = useMemo(() => {
    return roadmap.phases.map((phase, phaseIndex) => ({
      ...phase,
      phaseIndex,
      tone: getPhaseTone(phaseIndex),
    }));
  }, [roadmap.phases]);

  return (
    <>
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
              Roadmap
            </div>

            <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
              Execution roadmap
            </h2>

            <p className="mt-4 max-w-[880px] text-[16px] leading-[1.7] text-white/66">
              Не карточки с текстом, а схема внедрения: слева направо по фазам,
              внутри — конкретные узлы действий. Каждый узел открывает отдельную
              правую панель с деталями.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/46">
            <PanelRightOpen size={16} />
            <span>Click any node to open details</span>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-3 gap-4">
              {columns.map((phase) => (
                <button
                  key={`${phase.period}-header`}
                  type="button"
                  onClick={() =>
                    setDrawerItem({
                      type: "phase",
                      phaseIndex: phase.phaseIndex,
                      period: phase.period,
                      title: phase.title,
                      description: phase.description,
                      tasks: phase.tasks,
                    })
                  }
                  className={`rounded-[20px] border px-5 py-4 text-left transition hover:translate-y-[-1px] hover:bg-white/[0.06] ${phase.tone.border} ${phase.tone.bg}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={`text-[11px] uppercase tracking-[0.16em] ${phase.tone.text}`}>
                      {prettyPeriod(phase.period)}
                    </div>

                    <div
                      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${phase.tone.border} ${phase.tone.text}`}
                    >
                      {phase.tone.badge}
                    </div>
                  </div>

                  <div className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
                    {phase.title}
                  </div>

                  <div className="mt-3 text-sm leading-[1.65] text-white/62">
                    {phase.description}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
              {columns.map((phase) => (
                <div
                  key={`${phase.period}-lane`}
                  className="relative rounded-[26px] border border-white/10 bg-[#0d1c36] px-4 pb-5 pt-6"
                >
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/8" />

                  <div className="relative z-10 flex flex-col gap-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={`${phase.period}-${task}-${taskIndex}`} className="relative">
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[18px] -translate-y-1/2 bg-white/16" />
                        <button
                          type="button"
                          onClick={() =>
                            setDrawerItem({
                              type: "task",
                              phaseIndex: phase.phaseIndex,
                              period: phase.period,
                              phaseTitle: phase.title,
                              taskIndex,
                              task,
                              description: buildTaskDescription(phase.title, task),
                            })
                          }
                          className={`relative ml-[28px] flex w-[calc(100%-28px)] items-center justify-between gap-3 rounded-full border px-4 py-3 text-left text-sm leading-[1.45] transition hover:translate-x-[2px] hover:bg-white/[0.08] ${phase.tone.chip}`}
                        >
                          <span className="pr-3">{task}</span>
                          <ChevronRight size={15} className="shrink-0 text-white/48" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
              {columns.map((phase) => (
                <div
                  key={`${phase.period}-footer`}
                  className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    Phase output
                  </div>
                  <div className="mt-2 text-sm leading-[1.6] text-white/72">
                    {phase.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {drawerItem ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerItem(null)}
            />

            <motion.aside
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[540px] border-l border-white/10 bg-[#081427] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">
                      {drawerItem.type === "phase" ? "Roadmap phase" : "Execution node"}
                    </div>

                    <h3 className="mt-2 text-[26px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                      {drawerItem.type === "phase" ? drawerItem.title : drawerItem.task}
                    </h3>

                    <div className="mt-3 text-sm text-white/48">
                      {drawerItem.type === "phase"
                        ? prettyPeriod(drawerItem.period)
                        : `${prettyPeriod(drawerItem.period)} · ${drawerItem.phaseTitle}`}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDrawerItem(null)}
                    className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70 transition hover:bg-white/[0.08]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5">
                  {drawerItem.type === "phase" ? (
                    <div className="space-y-6">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          Phase role
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/76">
                          {drawerItem.description}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-[#f7d237]">
                          Included actions
                        </div>

                        <div className="mt-3 space-y-3">
                          {drawerItem.tasks.map((task, index) => (
                            <div
                              key={`${task}-${index}`}
                              className="rounded-[18px] border border-white/10 bg-[#0d1c36] px-4 py-4"
                            >
                              <div className="text-[11px] uppercase tracking-[0.14em] text-white/36">
                                Action {index + 1}
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
                          Belongs to
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/82">
                          {drawerItem.phaseTitle}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                          What this node means
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/76">
                          {drawerItem.description}
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-[#0d1c36] p-4">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-[#f7d237]">
                          Execution note
                        </div>
                        <div className="mt-2 text-sm leading-[1.7] text-white/76">
                          Этот drawer сейчас заполняется из текущего `roadmap.tasks`.
                          Если захочешь, следующим шагом можно обогатить его отдельными
                          полями: `owner`, `dependency`, `expected_result`, `risk`,
                          `linked_block`.
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
