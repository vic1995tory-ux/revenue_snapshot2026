"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type {
  ConfidenceLevel,
  RoadmapData,
  RoadmapTask,
} from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";

type DrawerState =
  | {
      phaseIndex: number;
      phasePeriod: string;
      phaseTitle: string;
      phaseDescription: string;
      task: RoadmapTask;
      globalStep: number;
    }
  | null;

type FlatTimelineTask = {
  globalStep: number;
  phaseIndex: number;
  phasePeriod: string;
  phaseTitle: string;
  phaseDescription: string;
  task: RoadmapTask;
};

function getPhaseAccent(index: number) {
  if (index === 0) {
    return {
      border: "border-[#f7d237]/24",
      glow: "shadow-[0_0_0_1px_rgba(247,210,55,0.08)]",
      title: "text-[#f7d237]",
      dot: "bg-[#f7d237]",
      line: "bg-[#f7d237]/40",
      lineSoft: "bg-[#f7d237]/16",
      nodeBorder: "border-[#f7d237]/28",
      nodeBg: "bg-[#f7d237]/10",
      nodeText: "text-[#fff8d6]",
      nodeGlow: "shadow-[0_0_24px_rgba(247,210,55,0.22)]",
    };
  }

  if (index === 1) {
    return {
      border: "border-[#8ea8ff]/20",
      glow: "shadow-[0_0_0_1px_rgba(142,168,255,0.07)]",
      title: "text-[#b9c8ff]",
      dot: "bg-[#8ea8ff]",
      line: "bg-[#8ea8ff]/34",
      lineSoft: "bg-[#8ea8ff]/14",
      nodeBorder: "border-[#8ea8ff]/24",
      nodeBg: "bg-[#8ea8ff]/10",
      nodeText: "text-[#dfe6ff]",
      nodeGlow: "shadow-[0_0_24px_rgba(142,168,255,0.18)]",
    };
  }

  return {
    border: "border-white/10",
    glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
    title: "text-white/72",
    dot: "bg-white/38",
    line: "bg-white/20",
    lineSoft: "bg-white/10",
    nodeBorder: "border-white/14",
    nodeBg: "bg-white/[0.05]",
    nodeText: "text-white/84",
    nodeGlow: "shadow-[0_0_22px_rgba(255,255,255,0.08)]",
  };
}

function phaseLabel(period: string) {
  if (period === "unlock") return "Unlock";
  if (period === "leverage") return "Leverage";
  if (period === "scale") return "Scale";
  return period;
}

function prettyPhase(period: string, index: number) {
  return `Phase ${index + 1} · ${phaseLabel(period)}`;
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

  const flatTasks = useMemo<FlatTimelineTask[]>(() => {
    let step = 1;

    return phases.flatMap((phase) =>
      phase.tasks.map((task) => {
        const item = {
          globalStep: step,
          phaseIndex: phase.index,
          phasePeriod: phase.period,
          phaseTitle: phase.title,
          phaseDescription: phase.description,
          task,
        };
        step += 1;
        return item;
      }),
    );
  }, [phases]);

  const totalSteps = flatTasks.length;

  const phaseSegments = useMemo(() => {
    let cursor = 0;

    return phases.map((phase) => {
      const count = phase.tasks.length;
      const startIndex = cursor;
      const endIndex = cursor + count - 1;
      cursor += count;

      return {
        phaseIndex: phase.index,
        period: phase.period,
        title: phase.title,
        count,
        startIndex,
        endIndex,
        accent: phase.accent,
      };
    });
  }, [phases]);

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
              Это одна общая дорожка внедрения. Каждый шаг занимает свое место
              в последовательности, а не существует как отдельная параллельная задача.
            </p>
          </div>

          <div className="text-sm text-white/46">
            {totalSteps} steps total
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {phases.map((phase) => (
            <div
              key={`${phase.period}-${phase.title}`}
              className={`rounded-[24px] border bg-[#0d1c36] p-5 ${phase.accent.border} ${phase.accent.glow}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${phase.accent.dot}`} />
                  <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
                    {prettyPhase(phase.period, phase.index)}
                  </div>
                </div>

                <div
                  className={`text-[11px] uppercase tracking-[0.16em] ${phase.accent.title}`}
                >
                  {phaseLabel(phase.period)}
                </div>
              </div>

              <div
                className={`mt-4 text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-white`}
              >
                {phase.title}
              </div>

              <div className="mt-4 text-sm leading-[1.65] text-white/62">
                {phase.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto">
          <div
            className="relative min-w-[1280px] px-8 pb-10 pt-14"
            style={{
              height: totalSteps > 10 ? 360 : 320,
            }}
          >
            <div className="absolute left-8 right-8 top-[154px] h-px bg-white/10" />

            {phaseSegments.map((segment) => {
              const startPercent = (segment.startIndex / Math.max(totalSteps - 1, 1)) * 100;
              const endPercent = (segment.endIndex / Math.max(totalSteps - 1, 1)) * 100;
              const widthPercent = endPercent - startPercent;

              return (
                <div
                  key={`${segment.period}-${segment.startIndex}`}
                  className={`absolute top-[153px] h-[3px] rounded-full ${segment.accent.line}`}
                  style={{
                    left: `calc(32px + (${startPercent}% * (100% - 64px) / 100))`,
                    width:
                      totalSteps === 1
                        ? "calc(100% - 64px)"
                        : `calc(${widthPercent}% * (100% - 64px) / 100)`,
                  }}
                />
              );
            })}

            <div className="mb-10 grid grid-cols-3 gap-6 px-2">
              {phaseSegments.map((segment) => (
                <div
                  key={`${segment.period}-legend`}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${segment.accent.dot}`} />
                    <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
                      Phase {segment.phaseIndex + 1}
                    </div>
                  </div>

                  <div
                    className={`text-[11px] uppercase tracking-[0.16em] ${segment.accent.title}`}
                  >
                    {phaseLabel(segment.period)}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="relative grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${Math.max(totalSteps, 1)}, minmax(72px, 1fr))`,
              }}
            >
              {flatTasks.map((item, index) => {
                const isTop = index % 2 === 0;
                const accent = phases[item.phaseIndex].accent;

                return (
                  <div
                    key={`${item.phasePeriod}-${item.globalStep}`}
                    className="relative flex justify-center"
                  >
                    <div
                      className={`absolute left-1/2 top-[154px] w-px -translate-x-1/2 ${
                        isTop ? "h-[68px] -translate-y-[68px]" : "h-[68px]"
                      } ${accent.lineSoft}`}
                    />

                    <motion.button
                      type="button"
                      onClick={() =>
                        setDrawer({
                          phaseIndex: item.phaseIndex,
                          phasePeriod: item.phasePeriod,
                          phaseTitle: item.phaseTitle,
                          phaseDescription: item.phaseDescription,
                          task: item.task,
                          globalStep: item.globalStep,
                        })
                      }
                      whileHover={{ y: isTop ? -2 : 2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`absolute left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border text-base font-semibold transition ${accent.nodeBorder} ${accent.nodeBg} ${accent.nodeText} ${accent.nodeGlow} ${
                        isTop ? "top-[54px]" : "top-[190px]"
                      }`}
                    >
                      {item.globalStep}
                    </motion.button>

                    <div
                      className={`absolute left-1/2 -translate-x-1/2 text-center ${
                        isTop ? "top-[22px]" : "top-[266px]"
                      }`}
                    >
                      <div
                        className={`text-[11px] uppercase tracking-[0.14em] ${accent.title}`}
                      >
                        Step {item.globalStep}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                      {prettyPhase(drawer.phasePeriod, drawer.phaseIndex)}
                    </div>

                    <h3 className="mt-2 text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                      Step {drawer.globalStep}
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
                        Этот шаг стоит в общей последовательности внедрения и
                        должен запускаться в своем месте, а не параллельно со всем остальным.
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
