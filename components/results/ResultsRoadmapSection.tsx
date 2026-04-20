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

type ControlPointItem = {
  metric: string;
  signal: string;
  whyItMatters: string;
  confidenceLevel?: ConfidenceLevel;
};

type BoardStepPlacement = {
  top: number;
  left: number;
  width: number;
  anchorLeft: number;
};

function getPhaseAccent(index: number) {
  if (index === 0) {
    return {
      border: "border-[#f7d237]/28",
      glow: "shadow-[0_0_26px_rgba(247,210,55,0.10)]",
      title: "text-[#f7d237]",
      dot: "bg-[#f7d237]",
      line: "bg-[#f7d237]/48",
      lineSoft: "bg-[#f7d237]/24",
      cardBorder: "border-[#f7d237]",
      cardBg: "bg-[#f7d237]",
      cardGlow: "shadow-[0_0_22px_rgba(247,210,55,0.16)]",
      cardText: "text-[#071225]",
      drawerAccent: "text-[#f7d237]",
      tagFill: "bg-[#f7d237]",
      tagText: "text-[#111827]",
      tagBorder: "border-[#f7d237]",
    };
  }

  if (index === 1) {
    return {
      border: "border-[#8ea8ff]/26",
      glow: "shadow-[0_0_26px_rgba(142,168,255,0.08)]",
      title: "text-[#b9c8ff]",
      dot: "bg-[#8ea8ff]",
      line: "bg-[#8ea8ff]/42",
      lineSoft: "bg-[#8ea8ff]/22",
      cardBorder: "border-[#8ea8ff]/46",
      cardBg: "bg-[#1d2b52]",
      cardGlow: "shadow-[0_0_22px_rgba(142,168,255,0.10)]",
      cardText: "text-[#e2e8ff]",
      drawerAccent: "text-[#b9c8ff]",
      tagFill: "bg-[#8ea8ff]",
      tagText: "text-[#111827]",
      tagBorder: "border-[#8ea8ff]",
    };
  }

  return {
    border: "border-white/14",
    glow: "shadow-[0_0_18px_rgba(255,255,255,0.04)]",
    title: "text-white/72",
    dot: "bg-[#9aa4b2]",
    line: "bg-white/24",
    lineSoft: "bg-white/12",
    cardBorder: "border-white/18",
    cardBg: "bg-[#20293b]",
    cardGlow: "shadow-[0_0_18px_rgba(255,255,255,0.05)]",
    cardText: "text-white/88",
    drawerAccent: "text-white/76",
    tagFill: "bg-[#9aa4b2]",
    tagText: "text-[#0f172a]",
    tagBorder: "border-[#9aa4b2]",
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

function splitControlPointsByPhase<T>(items: T[], phaseCount: number) {
  if (!items.length || phaseCount <= 0) {
    return Array.from({ length: phaseCount }, () => [] as T[]);
  }

  const buckets: T[][] = Array.from({ length: phaseCount }, () => []);
  const base = Math.floor(items.length / phaseCount);
  const remainder = items.length % phaseCount;

  let cursor = 0;

  for (let i = 0; i < phaseCount; i += 1) {
    const size = base + (i < remainder ? 1 : 0);
    buckets[i] = items.slice(cursor, cursor + size);
    cursor += size;
  }

  return buckets;
}

function lineClampStyle(lines: number) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}

function firstWordsWithEllipsis(text: string, limit = 4) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sliced = words.slice(0, limit).join(" ");

  if (!sliced) return "";
  return words.length > limit ? `${sliced}...` : sliced;
}

function getBoardStepPlacement(index: number): BoardStepPlacement {
  const pattern: BoardStepPlacement[] = [
    { top: 0, left: 0, width: 88, anchorLeft: 74 },
    { top: 96, left: 12, width: 84, anchorLeft: 24 },
    { top: 192, left: 0, width: 88, anchorLeft: 74 },
    { top: 288, left: 12, width: 84, anchorLeft: 24 },
    { top: 384, left: 4, width: 92, anchorLeft: 50 },
  ];

  const row = index % pattern.length;
  const cycle = Math.floor(index / pattern.length);
  const placement = pattern[row];

  return {
    ...placement,
    top: placement.top + cycle * 480,
  };
}

type DrawerCardProps = {
  item: FlatTimelineTask;
  stackPosition: number;
  stackLength: number;
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
  onCloseAll,
  onPopToHere,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: DrawerCardProps) {
  const accent = getPhaseAccent(item.phaseIndex);
  const widthPercent = 33.3333;
  const leftPercent =
    100 - widthPercent * stackLength + stackPosition * widthPercent;
  const isRightmost = stackPosition === stackLength - 1;

  return (
    <motion.aside
      className="fixed inset-y-0 border-l border-white/10 bg-[#081427] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        zIndex: 60 + stackPosition,
      }}
      initial={{ x: "100%", opacity: 0.98 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.98 }}
      transition={{ type: "spring", damping: 30, stiffness: 260 }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
          <div className="min-w-0">
            <div
              className={`text-[11px] uppercase tracking-[0.16em] ${accent.drawerAccent}`}
            >
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
              aria-label="Close roadmap details"
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
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/82 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft size={16} />
              Предыдущий шаг
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
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

  const tasksByPhase = useMemo(() => {
    const buckets = phases.map(() => [] as FlatTimelineTask[]);

    flatTasks.forEach((task) => {
      if (buckets[task.phaseIndex]) {
        buckets[task.phaseIndex].push(task);
      }
    });

    return buckets;
  }, [flatTasks, phases]);

  const totalSteps = flatTasks.length;

  const controlPointColumns = useMemo(() => {
    return splitControlPointsByPhase<ControlPointItem>(
      roadmap.controlPoints ?? [],
      phases.length,
    );
  }, [roadmap.controlPoints, phases.length]);

  const openStep = (index: number) => {
    setOpenStack([index]);
  };

  const appendNext = () => {
    setOpenStack((prev) => {
      if (!prev.length) return prev;

      const last = prev[prev.length - 1];
      if (last >= flatTasks.length - 1) return prev;

      const next = [...prev, last + 1];
      return next.length > 3 ? next.slice(next.length - 3) : next;
    });
  };

  const appendPrev = () => {
    setOpenStack((prev) => {
      if (!prev.length) return prev;

      const last = prev[prev.length - 1];
      if (last <= 0) return prev;

      const next = [...prev, last - 1];
      return next.length > 3 ? next.slice(next.length - 3) : next;
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
              Одна общая дорожка внедрения: шаги сгруппированы по фазам и
              собраны в компактную карту, чтобы все действия читались на одном
              экране без горизонтальной прокрутки.
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

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {phases.map((phase, phaseIndex) => (
            <div
              key={`${phase.period}-control-points`}
              className={`rounded-[24px] border bg-[#0d1c36] p-5 ${phase.accent.border} ${phase.accent.glow}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`text-[11px] uppercase tracking-[0.16em] ${phase.accent.title}`}
                >
                  Control points
                </div>

                <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {phaseLabel(phase.period)}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {controlPointColumns[phaseIndex]?.map((item, itemIndex) => (
                  <div
                    key={`${phase.period}-${item.metric}-${itemIndex}`}
                    className={`rounded-full border px-3 py-2 text-[12px] leading-[1.35] ${phase.accent.tagFill} ${phase.accent.tagText} ${phase.accent.tagBorder}`}
                    title={`${item.metric}\n\n${item.signal}\n\n${item.whyItMatters}`}
                  >
                    {item.metric}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-[28px] border border-white/10 bg-[#0d1c36] p-4 md:p-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        >
          <div className="grid gap-4 xl:grid-cols-3">
            {phases.map((phase, phaseIndex) => {
              const phaseTasks = tasksByPhase[phaseIndex] ?? [];
              const boardHeight = Math.max(456, phaseTasks.length * 96 - 24);

              return (
                <div
                  key={`${phase.period}-roadmap-board`}
                  className={`relative overflow-hidden rounded-[24px] border bg-[#081427]/88 p-4 ${phase.accent.border}`}
                  style={{ minHeight: boardHeight + 88 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div
                        className={`text-[11px] uppercase tracking-[0.16em] ${phase.accent.title}`}
                      >
                        {prettyPhase(phase.period, phase.index)}
                      </div>
                      <div className="mt-1 text-sm text-white/52">
                        {phase.tasks.length} steps
                      </div>
                    </div>

                    <div className={`h-3 w-3 rounded-full ${phase.accent.dot}`} />
                  </div>

                  <div
                    className="relative mt-5"
                    style={{ height: boardHeight }}
                  >
                    {phaseTasks.map((item, itemIndex) => {
                      const placement = getBoardStepPlacement(itemIndex);
                      const nextPlacement = getBoardStepPlacement(itemIndex + 1);
                      const hasConnector = itemIndex < phaseTasks.length - 1;
                      const connectorTop = placement.top + 70;
                      const connectorHeight = Math.max(
                        nextPlacement.top - placement.top - 34,
                        34,
                      );

                      return (
                        <div
                          key={`${item.phasePeriod}-${item.globalStep}`}
                          className="absolute inset-x-0"
                          style={{ top: 0 }}
                        >
                          {hasConnector ? (
                            <>
                              <div
                                className={`absolute w-[3px] rounded-full ${phase.accent.line}`}
                                style={{
                                  left: `${placement.anchorLeft}%`,
                                  top: connectorTop,
                                  height: connectorHeight,
                                }}
                              />

                              <div
                                className={`absolute h-8 w-8 -translate-x-1/2 rounded-full ${phase.accent.dot}`}
                                style={{
                                  left: `${placement.anchorLeft}%`,
                                  top: connectorTop + connectorHeight - 14,
                                }}
                              />
                            </>
                          ) : null}

                          <motion.div
                            whileHover={{ scale: 1.018 }}
                            transition={{ duration: 0.14 }}
                            className="absolute z-10"
                            style={{
                              top: placement.top,
                              left: `${placement.left}%`,
                              width: `${placement.width}%`,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => openStep(item.globalStep - 1)}
                              className={`flex h-20 w-full items-center gap-3 rounded-full border px-3 text-left transition hover:-translate-y-0.5 ${phase.accent.cardBorder} ${phase.accent.cardBg} ${phase.accent.cardGlow}`}
                            >
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#061226] text-[22px] font-semibold text-white">
                                {item.globalStep}
                              </div>

                              <div
                                className={`min-w-0 text-[15px] font-semibold leading-[1.15] tracking-[-0.01em] ${phase.accent.cardText}`}
                                style={lineClampStyle(2)}
                              >
                                {firstWordsWithEllipsis(item.task.action, 5)}
                              </div>
                            </button>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
                  key={`drawer-${taskIndex}-${stackPosition}`}
                  item={item}
                  stackPosition={stackPosition}
                  stackLength={openStack.length}
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
