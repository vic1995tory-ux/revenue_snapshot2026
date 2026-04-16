type ConfidenceLevel = "high" | "medium" | "preliminary";

type ConfidenceUiLevel = {
  display: string;
  active_dots: number;
  tooltip_title?: string;
  tooltip_text?: string;
};

type ConfidenceUiSystem = {
  component: "reliability_dots";
  dots_total: number;
  dot_size_px: number;
  gap_px: number;
  hover_zone: string;
  inactive_style: string;
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
};

type ResultPayload = {
  confidence_ui_system: ConfidenceUiSystem;
  hero_block: {
    companyName: string;
    summary: string;
    description: string;
    growth_limit: string;
    sales_geography: string[];
    roles: Array<{
      role: string;
      responsibility: string;
      decision_maker?: boolean;
    }>;
    cash_in: {
      value: number;
      currency: string;
      period: string;
    };
    product_margins_chart: {
      series: Array<{
        product: string;
        margin: number;
      }>;
    };
    clients_vs_leads_chart: {
      series: Array<{
        label: string;
        value: number;
      }>;
    };
  };
  normalized_data: any;
  summary: any;
  insights: any;
  confidence_note: string;
  solution: any;
  roadmap: any;
  forecasts: any;
  overall_conclusions: any;
  positioning: any;
  economics: any;
  clients_flow: any;
  product_sales: any;
  analytics_management: any;
  structure_processes: any;
  strategy: any;
  meta: {
    generated_at: string;
    result_status: string;
    account_href: string;
    whatsapp_href: string;
    telegram_href: string;
  };
};

const DEFAULT_CONFIDENCE_UI_SYSTEM: ConfidenceUiSystem = {
  component: "reliability_dots",
  dots_total: 3,
  dot_size_px: 7,
  gap_px: 4,
  hover_zone: "group",
  inactive_style: "low_opacity",
  levels: {
    high: {
      display: "● ● ●",
      active_dots: 3,
      tooltip_title: "Устойчивый показатель",
      tooltip_text: "Можно опираться в выводах.",
    },
    medium: {
      display: "● ● ○",
      active_dots: 2,
      tooltip_title: "Вероятный показатель",
      tooltip_text: "Можно использовать с оговоркой.",
    },
    preliminary: {
      display: "● ○ ○",
      active_dots: 1,
      tooltip_title: "Предварительный показатель",
      tooltip_text:
        "Показывает направление, но требует подтверждения дополнительными данными.",
    },
  },
};

export const RESULTS_BY_TOKEN: Record<string, ResultPayload> = {
  rs_demo_001: {
    confidence_ui_system: DEFAULT_CONFIDENCE_UI_SYSTEM,

    hero_block: {
      companyName: "Growth Avenue Studio",
      summary:
        "Спрос уже есть, но бизнес теряет часть выручки из-за founder-led capacity и слабого handoff между продажей и delivery.",
      description:
        "Ранний B2B service business с фокусом на strategy, MVP и automations для seed-stage SaaS.",
      growth_limit:
        "Основной лимит роста находится в processing и delivery, а не в отсутствии входящего спроса.",
      sales_geography: ["EU", "CIS"],
      roles: [
        {
          role: "CMO / Founder",
          responsibility: "Demand generation, marketing, inbound handling",
          decision_maker: true,
        },
        {
          role: "CSO / Founder",
          responsibility: "Sales, partnerships, delivery coordination",
          decision_maker: true,
        },
      ],
      cash_in: {
        value: 1900,
        currency: "USD",
        period: "last_month",
      },
      product_margins_chart: {
        series: [
          { product: "Strategy sessions", margin: 80 },
          { product: "MVP", margin: 50 },
          { product: "Automations", margin: 30 },
        ],
      },
      clients_vs_leads_chart: {
        series: [
          { label: "Лиды", value: 13 },
          { label: "Клиенты", value: 1 },
        ],
      },
    },

    normalized_data: {
      company: {
        name: "Growth Avenue Studio",
        stage: "early-stage service business",
        founded: "2025-11",
        business_age_months: 5,
        physical_location: "Tbilisi",
        sales_geography: ["EU", "CIS"],
        team_size_core: 2,
        uses_contractors: false,
        confidence_level: "medium",
      },
      offer: {
        business_type: "B2B consulting / delivery hybrid",
        target_customers: ["seed-stage SaaS", "B2B SaaS", "B2C SaaS"],
        most_profitable_segment: "strategy sessions",
        other_experience_verticals: ["MVP", "automations"],
      },
      financials: {
        last_month_cash_in: 1900,
        last_month_currency: "USD",
        contract_value: 6100,
        reported_margin_percent: 55,
        target_margin_at_scale_percent: 30,
        profit_last_month_estimated: 1045,
        goal_net_profit_growth_percent: 100,
        contract_payment_structure: "1 client, 5-month contract",
        confidence_level: "preliminary",
      },
      sales: {
        last_month_clients: 1,
        client_period_note: "1 signed client over a 5-month contract",
        lead_volume: 13,
        processing_capacity: 4,
        conversion_rate: 0.0769,
        avg_check_last_month: 1900,
        unmet_demand: 9,
        demand_to_capacity: 3.25,
        confidence_level: "medium",
      },
      acquisition: {
        channels: [
          { channel: "Meta Ads", share_percent: 25 },
          { channel: "Referrals", share_percent: 30 },
          { channel: "Cold outreach", share_percent: 12 },
          { channel: "Google Ads", share_percent: 25 },
          { channel: "Returning clients", share_percent: 8 },
        ],
      },
      goals: {
        "3_months": [
          "Launch a new product",
          "Build contacted client base",
          "Develop retention mechanics",
        ],
        "6_months": ["Sign 2 new contracts"],
        "12_months": [
          "Create a cash cow",
          "Cover fixed costs",
          "Maintain 3 stable projects",
        ],
      },
    },

    summary: {
      snapshot:
        "Business is not blocked by lack of demand. It is blocked by inability to process and deliver demand consistently.",
      current_position:
        "Early founder-led service business with visible demand and weak operational scalability.",
      economics:
        "Current margin looks strong on a thin sample, but it is not yet a scalable economic baseline.",
      primary_need: "Stable inbound flow and predictable processing.",
      confidence_level: "medium",
    },

    insights: {
      current_state: {
        title: "Current state",
        text: "Demand exists, but the team cannot process it at current founder-led capacity.",
      },
      main_loss: {
        title: "Main loss",
        text: "Revenue is lost before sale and at handoff to delivery because the system is overloaded.",
      },
      growth_limit: {
        title: "Growth limit",
        text: "The key bottleneck is structure and capacity, not only acquisition volume.",
      },
    },

    confidence_note:
      "The direction of the conclusion is strong, but margin stability and long-run unit economics still need more months of observation.",

    solution: {
      solution_summary: {
        headline: "Рост блокирует founder-led capacity, а не спрос",
        core_logic:
          "Пока управление, обработка лидов и delivery завязаны на двух основателях, бизнес теряет уже существующий спрос.",
        confidence_level: "medium",
      },
      primary_growth_lever: {
        lever:
          "Разгрузить founder-led processing и delivery через более стандартизированную сервисную модель",
        reason:
          "Спрос уже есть, но он не конвертируется и не обрабатывается из-за перегруженной структуры.",
        supported_by_blocks: [
          "structure_processes",
          "clients_flow",
          "strategy",
          "product_sales",
        ],
        confidence_level: "medium",
      },
      primary_constraint: {
        constraint_type: "structure",
        label: "Founder-centric управленческая и операционная перегрузка",
        reason:
          "Два основателя держат решения, обработку спроса и delivery.",
        supported_by_blocks: [
          "structure_processes",
          "clients_flow",
          "strategy",
          "analytics_management",
        ],
        confidence_level: "medium",
      },
      revenue_loss_source: {
        loss_type: "hidden_capacity_loss",
        label: "Потеря выручки в processing до продажи и в handoff к исполнению",
        explanation:
          "Деньги теряются на необработанном спросе и в разрывах между продажей и delivery.",
        visible_or_hidden: "visible",
        supported_by_blocks: [
          "economics",
          "clients_flow",
          "product_sales",
        ],
        confidence_level: "medium",
      },
      model_change_recommendation: {
        current_model_problem:
          "Гибрид «стратегия + кастомная реализация» плохо масштабируется на двух founders.",
        proposed_model_shift:
          "Сместиться в более узкий стандартизированный сервисный оффер вокруг одного понятного входного предложения.",
        why_this_shift:
          "Это уменьшает управленческую сложность и делает продажу и delivery более предсказуемыми.",
        expected_unlock:
          "Больше обработанного спроса, выше управляемость, меньше зависимости от единичных сделок.",
      },
      strategic_priorities: [
        {
          priority_rank: 1,
          action:
            "Собрать один управляемый контур обработки спроса и handoff от лида к delivery",
          why_now:
            "Пока processing ломается, дополнительный рост усиливает потери.",
          dependency: "Нужно разделить ownership между founders.",
          expected_result:
            "Меньше необработанных лидов и ниже операционный хаос.",
        },
        {
          priority_rank: 2,
          action:
            "Сузить и упростить оффер до одного понятного входного продукта",
          why_now:
            "Следующий разрыв после processing — слабая понятность ценности.",
          dependency:
            "Нужен уже собранный процесс обработки и выбранный сервисный формат.",
          expected_result:
            "Выше повторяемость sales-диалога и ниже leakage до сделки.",
        },
      ],
      business_impact: {
        revenue_impact:
          "Возврат части уже существующего, но теряемого спроса в выручку.",
        profit_impact:
          "Прибыль станет менее иллюзорной и ближе к масштабируемой модели.",
        flow_impact:
          "Поток станет менее рваным за счет лучшей обработки спроса.",
        team_impact:
          "Снизится расфокус двух основателей и нагрузка на ручную координацию.",
        management_impact:
          "Решения станут менее ad hoc и более исполнимыми.",
        scalability_impact:
          "Бизнес сможет расти через процесс и оффер, а не только через личное усилие founders.",
      },
      implementation_conditions: {
        prerequisites: [
          "Зафиксировать один приоритетный оффер",
          "Разделить ownership между основателями",
          "Формализовать handoff от лида к сделке и к исполнению",
        ],
        internal_constraints: [
          "Команда из 2 человек уже перегружена",
          "Текущая модель решений полу-ручная",
        ],
      },
    },

    roadmap: {
      strategic_objective:
        "Перевести бизнес из founder-led ручной модели в управляемый сервисный контур.",
      core_jtbd:
        "Собрать предсказуемую систему от лида до delivery, чтобы не терять уже существующий спрос.",
      phases: [
        {
          phase: "unlock",
          goal:
            "Снять bottleneck в processing и управлении, разделить ownership.",
          key_actions: [
            {
              action:
                "Зафиксировать один входной оффер для продаж на ближайший цикл",
              why_this_phase:
                "Без этого нельзя сократить сложность продажи и handoff.",
              confidence_level: "medium",
            },
            {
              action:
                "Назначить владельца спроса и владельца delivery",
              why_this_phase:
                "Это снижает перегруз и число совместных операционных решений.",
              confidence_level: "high",
            },
          ],
          linked_constraint:
            "Founder-centric overload and demand above capacity",
          confidence_level: "medium",
        },
      ],
      workstreams: [
        {
          name: "Demand processing redesign",
          focus:
            "Собрать единый контур обработки лидов от входа до сделки",
          related_blocks: [
            "clients_flow",
            "structure_processes",
            "analytics_management",
          ],
          confidence_level: "high",
        },
      ],
      dependencies: [
        {
          dependency:
            "Нельзя масштабировать входящий поток до controlled intake",
          reason:
            "Сейчас спрос уже превышает capacity, дополнительный поток увеличит утечки.",
        },
      ],
      first_priority_actions: [
        "Определить один входной оффер",
        "Разделить ownership founders",
        "Собрать единый pipeline",
      ],
      expected_outcomes: {
        "3_months":
          "Появляется owner контуров, прозрачный pipeline и controlled intake.",
        "6_months":
          "Продажа становится проще и repeatable за счет одного входного оффера.",
        "12_months":
          "Бизнес переходит к более стабильной сервисной модели.",
      },
    },

    forecasts: {
      current_vs_target: {
        current_state: {
          revenue: "$1.9k cash-in last month",
          profit: "~$1.0k estimated",
          conversion: "7.69%",
          capacity_load: "13 leads vs capacity 4",
        },
        target_state: {
          revenue: "repeatable monthly inflow",
          profit: "grow absolute profit with normalized margin",
          conversion: "~10-15%",
          capacity_load: "~1.0-1.5x of designed capacity",
        },
        gap_summary:
          "The main gap is not raw demand volume but inability to process, convert and deliver consistently.",
        confidence_level: "preliminary",
      },
      expected_kpi_changes: [
        {
          metric: "Conversion rate",
          current: "7.69%",
          expected: "~10-15%",
          delta: "+2 to +7 p.p.",
          driver:
            "Less demand leakage from better qualification and simpler offer.",
          confidence_level: "preliminary",
        },
      ],
      scenarios: {
        baseline: {
          description:
            "Business continues with current founder-led structure.",
          expected_outcome:
            "Revenue remains volatile and dependent on single deals.",
          risk:
            "Occasional wins are mistaken for a stable model.",
        },
        improved_execution: {
          description:
            "Demand is processed more consistently and delivery becomes more manageable.",
          expected_outcome:
            "Better capture of current demand and higher stable cash-in.",
          upside:
            "Closer to 2 new contracts in 6 months and 3 stable projects in 12 months.",
        },
        failure_case: {
          description:
            "The team adds initiatives without reducing founder overload.",
          expected_outcome:
            "Lead response slows, conversion stays low, delivery strain increases.",
          downside:
            "More operational load with no repeatable revenue base.",
        },
      },
    },

    overall_conclusions: {
      summary: {
        snapshot:
          "Visible demand exists, but current structure cannot convert it into stable growth.",
        current_position:
          "The business is early, founder-led, and operationally fragile.",
        economics:
          "Current economics are positive but not yet reliable as a scale model.",
        primary_need: "Stable inbound flow and predictable processing.",
      },
      insights: {
        current_state: {
          title: "Current state",
          text:
            "The business has demand but lacks the structure to process and deliver it repeatably.",
        },
        main_loss: {
          title: "Main loss",
          text:
            "Revenue is lost in processing before sale and in handoff to delivery.",
        },
        growth_limit: {
          title: "Growth limit",
          text:
            "The strongest growth limit is founder overload and low process repeatability.",
        },
      },
      solution: {
        solution_summary: {
          headline: "Спрос есть, система его не переваривает",
          core_logic:
            "The business should first fix processing and offer clarity before adding more growth pressure.",
          confidence_level: "medium",
        },
        primary_growth_lever: {
          lever: "Processing redesign and offer simplification",
          reason:
            "This unlocks demand already entering the system.",
          supported_by_blocks: [
            "clients_flow",
            "structure_processes",
            "product_sales",
          ],
          confidence_level: "medium",
        },
        primary_constraint: {
          label: "Founder-led operating bottleneck",
          reason:
            "Founders remain the central processing layer for demand and delivery.",
          supported_by_blocks: [
            "structure_processes",
            "analytics_management",
          ],
          confidence_level: "medium",
        },
      },
      positioning: {
        truth_summary: {
          summary:
            "Positioning is still somewhat broad, which weakens clarity at the sales entry point.",
          confidence_level: "medium",
        },
      },
      economics: {
        truth_summary: {
          summary:
            "Economics are positive but too thin-sample to treat as stable scale economics.",
          confidence_level: "preliminary",
        },
      },
      clients_flow: {
        truth_summary: {
          summary:
            "Demand is above capacity, so the business loses revenue before sale.",
          confidence_level: "high",
        },
      },
      product_sales: {
        truth_summary: {
          summary:
            "The offer mix creates friction and reduces repeatability in sales and delivery.",
          confidence_level: "medium",
        },
      },
      analytics_management: {
        truth_summary: {
          summary:
            "Analytics exist directionally, but management still depends heavily on founders.",
          confidence_level: "medium",
        },
      },
      structure_processes: {
        truth_summary: {
          summary:
            "The core scalability limit is structural, not purely commercial.",
          confidence_level: "high",
        },
      },
      strategy: {
        truth_summary: {
          summary:
            "The stated goals are directionally feasible only if the operating model is simplified first.",
          confidence_level: "medium",
        },
      },
    },

    positioning: {
      truth_summary: {
        summary:
          "Positioning is broad and still mixes several service directions.",
        confidence_level: "medium",
      },
      takeaway:
        "A narrower offer would improve sales clarity and repeatability.",
    },

    economics: {
      truth_summary: {
        summary:
          "Economics are currently driven by a thin sample and overload.",
        confidence_level: "preliminary",
      },
      strongest_numeric_signal: {
        metric: "Demand / capacity",
        value: "3.25x",
        interpretation:
          "The business already has more incoming demand than it can process.",
      },
    },

    clients_flow: {
      truth_summary: {
        summary:
          "Lead volume is not the main issue; processing quality is.",
        confidence_level: "high",
      },
      strongest_numeric_signal: {
        metric: "Lead to client",
        value: "1 / 13",
        interpretation:
          "A large share of incoming demand is not turning into revenue.",
      },
    },

    product_sales: {
      truth_summary: {
        summary:
          "Product mix is too hybrid to support smooth repeatable growth.",
        confidence_level: "medium",
      },
    },

    analytics_management: {
      truth_summary: {
        summary:
          "Management visibility exists, but decisions are still too founder-dependent.",
        confidence_level: "medium",
      },
    },

    structure_processes: {
      truth_summary: {
        summary:
          "Structure is the central growth bottleneck in the current model.",
        confidence_level: "high",
      },
    },

    strategy: {
      truth_summary: {
        summary:
          "Growth goals are credible only after processing and delivery become more controlled.",
        confidence_level: "medium",
      },
    },

    meta: {
      generated_at: "2026-04-17",
      result_status: "ready",
      account_href: "/account",
      whatsapp_href: "https://wa.me/1234567890",
      telegram_href: "https://t.me/example",
    },
  },
};
