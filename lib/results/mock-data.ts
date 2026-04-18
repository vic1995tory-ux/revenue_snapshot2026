import type { ResultsPageData } from "./types";

export const resultsPayloadMock = {
  hero_block: {
    companyName: "Growth Avenue",
    sales_geography: ["ЕС", "СНГ"],
    summary:
      "Бизнес-девелоперская и консалтинговая компания для SaaS, ограничение роста сейчас находится в capacity и founder-led модели.",
    description:
      "Компания помогает seed-stage и growing SaaS проектам с GTM, стратегией, MVP и автоматизациями.",
    growth_limit: "Founder-led capacity bottleneck",
    cash_in: {
      value: 1900,
    },
    roles: [
      {
        role: "CMO",
        responsibility: "Marketing / Ops",
      },
      {
        role: "CSO",
        responsibility: "Sales / Finance",
      },
    ],
    product_margins_chart: {
      series: [
        { product: "MVP", margin: 50 },
        { product: "Strategy Sessions", margin: 80 },
        { product: "Automations", margin: 30 },
      ],
    },
clientsVsLeads: {
  clients: resultsPayloadMock.hero_block.clients_vs_leads_chart.series.find(
    (item) => item.label === "Клиенты"
  )?.value ?? 0,
  leads: resultsPayloadMock.hero_block.clients_vs_leads_chart.series.find(
    (item) => item.label === "Лиды"
  )?.value ?? 0,
},
  },

  normalized_data: {
    company: {
      stage: "Startup",
      business_age_months: 6,
      physical_location: "Тбилиси",
      team_size_core: 2,
    },

    sales: {
      lead_volume: 13,
      processing_capacity: 4,
    },

    acquisition: {
      channels: [
        { channel: "Meta Ads", share_percent: 25 },
        { channel: "Referrals", share_percent: 30 },
        { channel: "Cold Outreach", share_percent: 12 },
        { channel: "Google Ads", share_percent: 25 },
        { channel: "Returning", share_percent: 8 },
      ],
    },

    financials: {
      last_month_cash_in: 1900,
      profit_last_month_estimated: 1045,
    },
  },

  summary: {
    snapshot:
      "Early-stage company with demand already above current processing capacity.",
    current_position:
      "Leads exist, but system cannot fully convert and deliver them efficiently.",
    primary_need: "Stabilize revenue flow without increasing chaos.",
  },

  confidence_note:
    "Preliminary confidence. Dataset is small and based on early-stage operating history.",

  insights: {
    growth_limit: {
      text: "Growth is limited by processing capacity, not market demand.",
    },
  },

  solution: {
    solution_summary: {
      headline: "Fix structure before scaling demand",
      core_logic:
        "More leads now would increase overload. First step is rebuilding processing and delivery system.",
    },

    primary_growth_lever: {
      lever: "Operational capacity + clearer offer",
      reason:
        "Demand already exists. Unlocking conversion and fulfillment gives faster ROI than more acquisition.",
    },

    primary_constraint: {
      label: "Founder dependency",
      reason:
        "Too many functions concentrated on 2 people slows decisions and delivery.",
    },

    revenue_loss_source: {
      label: "Unprocessed demand",
      explanation:
        "Leads are entering the system faster than they can be processed.",
    },

    model_change_recommendation: {
      proposed_model_shift:
        "Move from founder-led custom service to narrower standardized service model.",
      expected_unlock:
        "Higher throughput, cleaner sales process, less chaos, repeatable revenue.",
    },
  },

  roadmap: {
    phases: [
      {
        phase: "unlock",
        goal: "Remove immediate bottlenecks in processing",
        linked_constraint: "Founder overload",
        key_actions: [
          { action: "Split ownership between founders" },
          { action: "Create unified lead pipeline" },
          { action: "Standardize handoff to delivery" },
        ],
      },
      {
        phase: "leverage",
        goal: "Improve conversion from existing demand",
        linked_lever: "Sharper offer and simpler sales process",
        key_actions: [
          { action: "Narrow main offer" },
          { action: "Simplify first-call sales flow" },
          { action: "Re-engage warm leads" },
        ],
      },
      {
        phase: "scale",
        goal: "Create repeatable operating system",
        linked_system: "Management cadence + delegation",
        key_actions: [
          { action: "Weekly KPI review" },
          { action: "Controlled contractor expansion" },
          { action: "Track unit economics by offer" },
        ],
      },
    ],
  },
} as const;

export const resultsMockData: ResultsPageData = {
  hero: {
    companyName: resultsPayloadMock.hero_block.companyName,
    salesGeography: resultsPayloadMock.hero_block.sales_geography.join(" + "),
    summary: resultsPayloadMock.hero_block.summary,
    description: resultsPayloadMock.hero_block.description,
    growthLimit: resultsPayloadMock.hero_block.growth_limit,
    cashIn: `$${resultsPayloadMock.hero_block.cash_in.value}`,
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
        title: "Growth Lever",
        value: resultsPayloadMock.solution.primary_growth_lever.lever,
        note: resultsPayloadMock.solution.primary_growth_lever.reason,
      },
      {
        title: "Constraint",
        value: resultsPayloadMock.solution.primary_constraint.label,
        note: resultsPayloadMock.solution.primary_constraint.reason,
      },
      {
        title: "Revenue Loss",
        value: resultsPayloadMock.solution.revenue_loss_source.label,
        note: resultsPayloadMock.solution.revenue_loss_source.explanation,
      },
      {
        title: "Model Shift",
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
      const description =
        ("linked_constraint" in phase && phase.linked_constraint
          ? phase.linked_constraint
          : "linked_lever" in phase && phase.linked_lever
            ? phase.linked_lever
            : "linked_system" in phase && phase.linked_system
              ? phase.linked_system
              : "");

      return {
        period: phase.phase,
        title: phase.goal,
        description,
        tasks: phase.key_actions.map((item) => item.action),
      };
    }),
  },

  forecasts: {
    revenue: {
      current: "$1900",
      target: "$3800",
      delta: 100,
    },
    costs: {
      current: "$855",
      target: "$1140",
      delta: 33,
    },
    profit: {
      current: "$1045",
      target: "$2090",
      delta: 100,
    },
    assumptions: [
      "Existing demand is converted better",
      "Processing bottleneck is reduced",
      "Delivery becomes more repeatable",
      "Offer is narrower and easier to sell",
    ],
  },

  businessContext: {
    summary:
      "Unified business context assembled from payload: company, sales, economics, channels and constraints.",
    sections: [
      {
        title: "Company",
        rows: [
          { label: "Stage", value: "Startup" },
          { label: "Location", value: "Тбилиси" },
          { label: "Core Team", value: "2" },
        ],
      },
      {
        title: "Sales",
        rows: [
          { label: "Leads", value: "13" },
          { label: "Capacity", value: "4" },
          { label: "Clients", value: "1" },
        ],
      },
      {
        title: "Financials",
        rows: [
          { label: "Cash-in", value: "$1900" },
          { label: "Profit", value: "$1045" },
        ],
      },
    ],
  },

  blocks: [
    {
      id: "economics",
      title: "Economics",
      truthSummary:
        "Economics constrained more by throughput than by lack of demand.",
      mainDiagnosis:
        "Current profit exists, but system leaks revenue through low capacity.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Cash-in", value: "$1900" },
        { label: "Profit", value: "$1045" },
        { label: "Demand/Capacity", value: "3.25x" },
      ],
      explanation:
        "Demand exceeds operational ability to convert and fulfill it.",
      implication:
        "Scaling ads now would likely increase waste rather than profit.",
    },

    {
      id: "clients_flow",
      title: "Clients & Flow",
      truthSummary: "Lead flow exists but conversion system is overloaded.",
      mainDiagnosis: "13 leads vs 4 capacity creates lost opportunities.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Leads", value: "13" },
        { label: "Capacity", value: "4" },
        { label: "Clients", value: "1" },
      ],
      explanation: "Lead intake outpaces processing.",
      implication: "Need triage + better pipeline before scaling demand.",
    },
  ],

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
