"use client";

function getDeltaTone(delta: number, invert?: boolean) {
  if (invert) {
    if (delta < 0) return "text-emerald-300";
    if (delta > 0) return "text-rose-300";
    return "text-white/50";
  }

  if (delta > 0) return "text-emerald-300";
  if (delta < 0) return "text-rose-300";
  return "text-white/50";
}

export function MetricCard({
  title,
  current,
  target,
  delta,
  invert,
}: {
  title: string;
  current: string;
  target: string;
  delta: number;
  invert?: boolean;
}) {
  const sign = delta > 0 ? "+" : "";

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-white/52">{title}</div>
        <div className={`text-sm font-medium ${getDeltaTone(delta, invert)}`}>
          {sign}
          {Math.round(delta)}%
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-white/40">Current</div>
          <div className="mt-1 text-[24px] font-semibold tracking-[-0.03em]">{current}</div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-white/40">Target</div>
          <div className="mt-1 text-[24px] font-semibold tracking-[-0.03em]">{target}</div>
        </div>
      </div>
    </div>
  );
}
