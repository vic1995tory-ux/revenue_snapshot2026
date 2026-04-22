"use client";

export function GrowthKpiCard({
  title,
  current,
  target,
  delta,
  driver,
}: {
  title: string;
  current?: string;
  target?: string;
  delta?: string;
  driver?: string;
}) {
  return (
    <div className="rounded-[28px] bg-[#0d131b] p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[13px] uppercase tracking-[0.18em] text-white/42">
          {title}
        </div>
        {delta ? (
          <div className="max-w-[45%] text-right text-[18px] font-semibold leading-[1.18] text-[#57d6a3]">
            {delta}
          </div>
        ) : null}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-5">
        <div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-white/34">
            Current
          </div>
          <div className="mt-3 text-[22px] font-semibold leading-[1.18] text-white">
            {current || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-white/34">
            Target
          </div>
          <div className="mt-3 text-[22px] font-semibold leading-[1.18] text-white">
            {target || "N/A"}
          </div>
        </div>
      </div>

      {driver ? (
        <div className="mt-5 border-t border-white/7 pt-4 text-sm leading-[1.6] text-white/58">
          {driver}
        </div>
      ) : null}
    </div>
  );
}
