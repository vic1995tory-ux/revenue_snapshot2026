"use client";

export function BlockTabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 text-sm transition",
        active
          ? "border-[#f7d237]/40 bg-[#f7d237] text-[#0b1d3a]"
          : "border-white/12 bg-white/6 text-white/82",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
