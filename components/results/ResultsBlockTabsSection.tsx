"use client";

import { useMemo, useState } from "react";
import type { AnalyticalBlockData, OverallSummaryData } from "@/lib/results/types";
import { BlockTabButton } from "./BlockTabButton";
import { StrategyBlock } from "./blocks/StrategyBlock";
import { StructureProcessesBlock } from "./blocks/StructureProcessesBlock";
import { AnalyticsManagementBlock } from "./blocks/AnalyticsManagementBlock";
import { ProductSalesBlock } from "./blocks/ProductSalesBlock";
import { ClientsFlowBlock } from "./blocks/ClientsFlowBlock";
import { PositioningBlock } from "./blocks/PositioningBlock";
import { EconomicsBlock } from "./blocks/EconomicsBlock";

const BLOCK_ORDER = [
  "strategy",
  "structure_processes",
  "analytics_management",
  "product_sales",
  "clients_flow",
  "positioning",
  "economics",
] as const;

export function ResultsBlockTabsSection({
  blocks,
}: {
  blocks: AnalyticalBlockData[];
  overallSummary: OverallSummaryData;
}) {
  const orderedBlocks = useMemo(() => {
    return BLOCK_ORDER.map((id) => blocks.find((block) => block.id === id)).filter(
      Boolean
    ) as AnalyticalBlockData[];
  }, [blocks]);

  const [activeId, setActiveId] = useState<string>(orderedBlocks[0]?.id ?? "");

  const activeBlock = orderedBlocks.find((block) => block.id === activeId);

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex flex-wrap gap-2">
        {orderedBlocks.map((block) => (
          <BlockTabButton
            key={block.id}
            label={block.title}
            active={block.id === activeId}
            onClick={() => setActiveId(block.id)}
          />
        ))}
      </div>

      <div className="mt-6">
        {activeBlock?.id === "strategy" && <StrategyBlock block={activeBlock} />}
        {activeBlock?.id === "structure_processes" && (
          <StructureProcessesBlock block={activeBlock} />
        )}
        {activeBlock?.id === "analytics_management" && (
          <AnalyticsManagementBlock block={activeBlock} />
        )}
        {activeBlock?.id === "product_sales" && (
          <ProductSalesBlock block={activeBlock} />
        )}
        {activeBlock?.id === "clients_flow" && <ClientsFlowBlock block={activeBlock} />}
        {activeBlock?.id === "positioning" && <PositioningBlock block={activeBlock} />}
        {activeBlock?.id === "economics" && <EconomicsBlock block={activeBlock} />}
      </div>
    </section>
  );
}
