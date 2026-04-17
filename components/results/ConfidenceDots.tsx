"use client";

export function ConfidenceDots({
  level,
}: {
  level: 1 | 2 | 3;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className={[
            "h-[7px] w-[7px] rounded-full",
            dot <= level ? "bg-[#f7d237]" : "bg-white/18",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
