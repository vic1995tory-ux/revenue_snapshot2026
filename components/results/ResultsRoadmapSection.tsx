"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type {
  ConfidenceLevel,
  RoadmapData,
  RoadmapTask,
} from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";

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
      line: "bg-[#f7d237]/38",
      lineSoft: "bg-[#f7d237]/14",
      nodeBorder: "border-[#f7d237]/28",
      nodeBg: "bg-[#f7d237]/10",
      nodeText: "text-[#fff8d6]",
      nodeGlow: "shadow-[0_0_34px_rgba(247,210,55,0.22)]",
      drawerAccent: "text-[#f7d237]",
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
      nodeGlow: "shadow-[0_0_34px_rgba(142,168,255,0.18)]",
      drawerAccent: "text-[#b9c8ff]",
    };
  }

  return {
    border: "border-white/10",
    glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
    title: "text-white/72",
    dot: "bg-white/38",
    line: "bg-white/18",
    lineSoft: "bg-white/10",
    nodeBorder: "border-white/14",
    nodeBg: "bg-white/[0.05]",
    nodeText: "text-white/84",
    nodeGlow: "shadow-[0_0_26px_rgba(255,255,255,0.08)]",
    drawerAccent: "text-white/76",
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

function dockScale(distance: number | null) {
  if (distance === null) return 1;
  if (distance === 0) return 1.28;
  if (distance === 1) return 1.16;
  if (distance === 2) return 1.08;
  return 1;
}

function dockOffset(distance: number | null, isTop: boolean) {
  if (distance === null) return 0;
  const base = distance === 0 ? 10 : distance === 1 ? 6 : distance === 2 ? 2 : 0;
  return isTop ? -base : base;
}

type DrawerCardProps = {
  item: FlatTimelineTask;
  stackPosition: number;
  stackLength: number;
  maxStack: number;
  onCloseAll: () => void;
  onPopToHere: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
};

function DrawerCard({
  item,
  stackPosition,
  stackLength,
  maxStack,
  onCloseAll,
  onPopToHere,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: DrawerCardProps) {
  const accent = getPhaseAccent(item.phaseIndex);
  const offset = (stackLength - 1 - stackPosition) * 58;
  const widthReduction = (stackLength - 1 - stackPosition) * 26;
  const zIndex = 60 + stackPosition;
  const isRightmost = stackPosition === stackLength - 1;

  return (
    <motion.aside
      className="fixed inset-y-0 right-0 border-l border-white/10 bg-[#081427] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
      style={{
        width: `min(560px, calc(100vw - 24px - ${widthReduction}px))`,
        right: `${offset}px`,
        zIndex,
      }}
      initial={{ x: "100%", opacity: 0.98 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.98 }}
      transition={{ type: "spring", damping: 30, stiffness: 260 }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
          <div>
            <div className={`text-[11px] uppercase tracking-[0.16em] ${accent.drawerAccent}`}>
              {prettyPhase(item.phasePeriod, item.phaseIndex)}
            </div>

            <h3 className="mt-2 text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              Step {item.globalStep}
            </h3>

            <div className="mt-3 text-sm text-white/46">{item.phaseTitle}</div>
          </div>

          <div className="flex items-center gap-2">
            {!isRightmost ? (
              <button
                type="button"
                onClick={onPopToHere}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/70 transition hover:bg-white/[0.08]"
              >
                Вернуться
              </button>
            ) : null}

            <button
              type="button"
              onClick={onCloseAll}
              className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70 transition hover:bg-white/[0.08]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-5">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                Action
              </div>
              <div className="mt-2 text-sm leading-[1.75] text-white/84">
                {item.task.action}
              </div>
            </div>

            {item.task.whyThisPhase ? (
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                  Why this phase
                </div>
                <div className="mt-2 text-sm leading-[1.75] text-white/76">
                  {item.task.whyThisPhase}
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
                    {confidenceText(item.task.confidenceLevel)}
                  </div>
                </div>

                <ConfidenceDots level={item.task.confidenceLevel ?? 1} />
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-[#0d1c36] p-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#f7d237]">
                Sequence note
              </div>
              <div className="mt-2 text-sm leading-[1.75] text-white/76">
                Этот шаг закреплен в общей последовательности и должен запускаться
                на своем месте, а не параллельно со всеми остальными инициативами.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev || stackLength >= maxStack && !isRightmost}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft size={16} />
              Предыдущий шаг
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext || stackLength >= maxStack && !isRightmost}
              className="inline-flex items-center gap-2 rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 px-4 py-2.5 text-sm text-[#fff2a9] transition hover:bg-[#f7d237]/14 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Следующий шаг
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export function ResultsRoadmapSection({ roadmap }: { roadmap: RoadmapData }) {
  const [openStack, setOpenStack] = useState<number[]>([]);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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
  const maxStack = 3;

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
        count,
        startIndex,
        endIndex,
        accent: phase.accent,
      };
    });
  }, [phases]);

  const openStep = (index: number) => {
    setOpenStack([index]);
  };

  const appendStep = (index: number) => {
    setOpenStack((prev) => {
      if (prev[prev.length - 1] === index) return prev;
      if (prev.includes(index)) return prev.slice(0, prev.indexOf(index) + 1);
      const next = [...prev, index];
      return next.length > maxStack ? next.slice(next.length - maxStack) : next;
    });
  };

  const appendNext = () => {
    setOpenStack((prev) => {
      if (!prev.length) return prev;
      const last = prev[prev.length - 1];
      if (last >= flatTasks.length - 1) return prev;
      const next = [...prev, last + 1];
      return next.length > maxStack ? next.slice(next.length - maxStack) : next;
    });
  };

  const appendPrev = () => {
    setOpenStack((prev) => {
      if (!prev.length) return prev;
      const last = prev[prev.length - 1];
      if (last <= 0) return prev;
      const nextIndex = last - 1;
      if (prev.includes(nextIndex)) {
        return prev.slice(0, prev.indexOf(nextIndex) + 1);
      }
      const next = [...prev, nextIndex];
      return next.length > maxStack ? next.slice(next.length - maxStack) : next;
    });
  };

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

          <div className="text-sm text-white/46">{totalSteps} steps total</div>
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

              <div className="mt-4 text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
                {phase.title}
              </div>

              <div className="mt-4 text-sm leading-[1.65] text-white/62">
                {phase.description}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 overflow-x-auto"
          onMouseLeave={() => setHoveredStep(null)}
        >
          <div
            className="relative min-w-[1280px] px-8 pb-12 pt-12"
            style={{
              height: totalSteps > 10 ? 360 : 320,
            }}
          >
            <div className="mb-8 grid grid-cols-3 gap-6 px-2">
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

            <div className="absolute left-8 right-8 top-[180px] h-px bg-white/10" />

            {phaseSegments.map((segment) => {
              const startPercent =
                (segment.startIndex / Math.max(totalSteps - 1, 1)) * 100;
              const endPercent =
                (segment.endIndex / Math.max(totalSteps - 1, 1)) * 100;
              const widthPercent = endPercent - startPercent;

              return (
                <div
                  key={`${segment.period}-${segment.startIndex}`}
                  className={`absolute top-[179px] h-[3px] rounded-full ${segment.accent.line}`}
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

            <div
              className="relative grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${Math.max(totalSteps, 1)}, minmax(72px, 1fr))`,
              }}
            >
              {flatTasks.map((item, index) => {
                const isTop = index % 2 === 0;
                const accent = phases[item.phaseIndex].accent;
                const distance =
                  hoveredStep === null ? null : Math.abs(hoveredStep - index);
                const scale = dockScale(distance);
                const translateY = dockOffset(distance, isTop);
                const isOpened = openStack.includes(index);

                return (
                  <div
                    key={`${item.phasePeriod}-${item.globalStep}`}
                    className="relative flex justify-center"
                    onMouseEnter={() => setHoveredStep(index)}
                  >
                    <div
                      className={`absolute left-1/2 top-[180px] w-px -translate-x-1/2 ${
                        isTop ? "h-[58px] -translate-y-[58px]" : "h-[58px]"
                      } ${accent.lineSoft}`}
                    />

                    <motion.button
                      type="button"
                      onClick={() => openStep(index)}
                      animate={{
                        scale,
                        y: translateY,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 24,
                        mass: 0.8,
                      }}
                      className={`absolute left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border text-[28px] font-semibold transition ${
                        accent.nodeBorder
                      } ${accent.nodeBg} ${accent.nodeText} ${
                        accent.nodeGlow
                      } ${isOpened ? "ring-1 ring-white/14" : ""} ${
                        isTop ? "top-[104px]" : "top-[224px]"
                      }`}
                    >
                      {item.globalStep}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openStack.length ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenStack([])}
            />

            {openStack.map((taskIndex, stackPosition) => {
              const item = flatTasks[taskIndex];
              if (!item) return null;

              return (
                <DrawerCard
                  key={`drawer-${taskIndex}`}
                  item={item}
                  stackPosition={stackPosition}
                  stackLength={openStack.length}
                  maxStack={maxStack}
                  onCloseAll={() => setOpenStack([])}
                  onPopToHere={() =>
                    setOpenStack((prev) => prev.slice(0, stackPosition + 1))
                  }
                  onNext={appendNext}
                  onPrev={appendPrev}
                  hasNext={taskIndex < flatTasks.length - 1}
                  hasPrev={taskIndex > 0}
                />
              );
            })}
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
