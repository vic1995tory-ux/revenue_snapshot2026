"use client";

import type { ReactNode } from "react";

export function InfoPill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex min-h-[34px] items-center rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-sm text-white/84">
      {children}
    </div>
  );
}
