import type { ResultsPageData } from "./types";

export const resultsMockData: ResultsPageData = {
  hero: {
    companyName: resultsPayloadMock.hero_block.companyName || "N/A",
    salesGeography: resultsPayloadMock.hero_block.sales_geography.join(" + "),
    summary: resultsPayloadMock.hero_block.summary,
    description: resultsPayloadMock.hero_block.description,
    growthLimit: resultsPayloadMock.hero_block.growth_limit,
    cashIn: `$${resultsPayloadMock.hero_block.cash_in.value.toLocaleString()}`,
    confidenceLevel: 2,

    roles: resultsPayloadMock.hero_block.roles.map((item) => ({
      role: item.role,
      responsibility: item.responsibility,
    })),

    productMargins:
      resultsPayloadMock.hero_block.product_margins_chart.series.map((item) => ({
        name: item.product,
        marginPercent: item.margin,
      })),

    clientsVsLeads: {
      clients:
        resultsPayloadMock.hero_block.clients_vs_leads_chart.series.find(
          (item) => item.label === "Клиенты",
        )?.value ?? 0,
      leads:
        resultsPayloadMock.hero_block.clients_vs_leads_chart.series.find(
          (item) => item.label === "Лиды",
        )?.value ?? 0,
    },

    demandVsCapacity: {
      demand: resultsPayloadMock.normalized_data.sales.lead_volume,
      capacity: resultsPayloadMock.normalized_data.sales.processing_capacity,
    },

    channelMix:
      resultsPayloadMock.normalized_data.acquisition.channels.map((item) => ({
        name: item.channel,
        value: item.share_percent,
      })),

    stage: resultsPayloadMock.normalized_data.company.stage,
    businessAgeMonths:
      resultsPayloadMock.normalized_data.company.business_age_months,
    physicalLocation:
      resultsPayloadMock.normalized_data.company.physical_location,
    teamSizeCore: resultsPayloadMock.normalized_data.company.team_size_core,

    snapshot: resultsPayloadMock.summary.snapshot,
    currentPosition: resultsPayloadMock.summary.current_position,
    confidenceNote: resultsPayloadMock.confidence_note,
  },

  solution: {
    title: resultsPayloadMock.solution.solution_summary.headline,
    summary: resultsPayloadMock.solution.solution_summary.core_logic,
    confidenceLevel: 2,
    cards: [
      {
        title: "Primary growth lever",
        value: resultsPayloadMock.solution.primary_growth_lever.lever,
        note: resultsPayloadMock.solution.primary_growth_lever.reason,
      },
      {
        title: "Primary constraint",
        value: resultsPayloadMock.solution.primary_constraint.label,
        note: resultsPayloadMock.solution.primary_constraint.reason,
      },
      {
        title: "Revenue loss source",
        value: resultsPayloadMock.solution.revenue_loss_source.label,
        note: resultsPayloadMock.solution.revenue_loss_source.explanation,
      },
      {
        title: "Model shift",
        value:
          resultsPayloadMock.solution.model_change_recommendation
            .proposed_model_shift,
        note:
          resultsPayloadMock.solution.model_change_recommendation
            .expected_unlock,
      },
    ],
  },

  roadmap: {
    phases: resultsPayloadMock.roadmap.phases.map((phase) => {
      let description = "";

      if ("linked_constraint" in phase) {
        description = phase.linked_constraint;
      } else if ("linked_lever" in phase) {
        description = phase.linked_lever;
      } else if ("linked_system" in phase) {
        description = phase.linked_system;
      }

      return {
        period: phase.phase,
        title: phase.goal,
        description,
        tasks: phase.key_actions.map((action) => action.action),
      };
    }),
  },

  forecasts: {
    revenue: {
      current: `$${resultsPayloadMock.normalized_data.financials.last_month_cash_in.toLocaleString()}`,
      target: "$3,800",
      delta: 100,
    },
    costs: {
      current: "$855",
      target: "$1,140",
      delta: 33,
    },
    profit: {
      current: `$${resultsPayloadMock.normalized_data.financials.profit_last_month_estimated.toLocaleString()}`,
      target: "$2,090",
      delta: 100,
    },
    assumptions: [
      "Сначала стабилизируется processing и снижается hidden capacity loss",
      "Конверсия растет за счет более ясного входного оффера",
      "Рост идет через управляемый delivery",
      "Часть уже существующего спроса возвращается в выручку",
      "Маржа постепенно нормализуется ближе к 30%",
    ],
  },

  businessContext: {
    summary:
      "Полный нормализованный контекст бизнеса, на котором основаны выводы.",
    sections: [],
  },

  blocks: [],

  overallSummary: {
    cards: [
      {
        title: "Snapshot",
        value: resultsPayloadMock.summary.snapshot,
      },
      {
        title: "Primary Need",
        value: resultsPayloadMock.summary.primary_need,
      },
      {
        title: "Growth Limit",
        value: resultsPayloadMock.insights.growth_limit.text,
      },
    ],
  },
};
