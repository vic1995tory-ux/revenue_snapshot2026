export const RESULTS_BY_TOKEN = {
  rs_demo_001: {
    // ---------------- UI SYSTEM ----------------
    confidence_ui_system: {
      component: "reliability_dots",
      dots_total: 3,
      dot_size_px: 7,
      gap_px: 4,
      hover_zone: "group",
      inactive_style: "low_opacity",
      levels: {
        high: { display: "● ● ●", active_dots: 3 },
        medium: { display: "● ● ○", active_dots: 2 },
        preliminary: { display: "● ○ ○", active_dots: 1 },
      },
    },

    // ---------------- HERO ----------------
    hero_block: {
      companyName: "—",
      summary:
        "Бизнес-девелоперская и консалтинговая компания для seed-stage SaaS, рост ограничен capacity и перегрузом founders.",
      description:
        "Компания занимается стратегией, MVP и автоматизациями. Ранняя стадия, 2 основателя, founder-led модель.",
      growth_limit: "capacity и перегруз команды",
      sales_geography: ["ЕС", "СНГ"],
      roles: [
        {
          role: "CMO",
          responsibility: "маркетинг, операционка",
          decision_maker: true,
        },
        {
          role: "CSO/busdev",
          responsibility: "продажи, финансы",
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
          { product: "разработка MVP", margin: 50 },
          { product: "Страт Сессии", margin: 80 },
          { product: "автоматизации", margin: 30 },
        ],
      },
      clients_vs_leads_chart: {
        series: [
          { label: "Клиенты", value: 1 },
          { label: "Лиды", value: 13 },
        ],
      },
    },

    // ---------------- SUMMARY ----------------
    summary: {
      snapshot:
        "Бизнес на ранней стадии с уже существующим спросом, но слабой способностью его обрабатывать.",
      current_position:
        "Founder-led сервис с перегрузом и низкой repeatability.",
      economics:
        "Маржа выглядит высокой, но не подтверждена масштабом.",
      primary_need: "Стабилизировать поток и обработку лидов.",
      confidence_level: "preliminary",
    },

    // ---------------- INSIGHTS ----------------
    insights: {
      current_state: {
        title: "Текущее состояние",
        text:
          "Есть спрос, но система не способна стабильно его обрабатывать.",
      },
      main_loss: {
        title: "Главная потеря",
        text:
          "Потеря выручки происходит в processing — команда не успевает обрабатывать поток.",
      },
      growth_limit: {
        title: "Ограничение роста",
        text:
          "Основной лимит — структура и перегруз founders, а не отсутствие лидов.",
      },
    },

    confidence_note:
      "Данные предварительные: бизнес ранний, выборка маленькая.",

    // ---------------- SOLUTION ----------------
    solution: {
      solution_summary: {
        headline: "Рост блокирует capacity, а не спрос",
        core_logic:
          "Спрос уже есть, но не обрабатывается из-за founder-led модели.",
        confidence_level: "medium",
      },

      primary_growth_lever: {
        lever: "Перестроить processing и delivery",
        reason:
          "Уже есть лиды, но они не конвертируются в выручку.",
        supported_by_blocks: [
          "structure_processes",
          "clients_flow",
        ],
        confidence_level: "medium",
      },

      primary_constraint: {
        constraint_type: "structure",
        label: "Founder overload",
        reason:
          "Два основателя держат весь процесс.",
        supported_by_blocks: [
          "structure_processes",
          "analytics_management",
        ],
        confidence_level: "medium",
      },
    },

    // ---------------- ROADMAP ----------------
    roadmap: {
      strategic_objective:
        "Перевести бизнес в управляемую модель без зависимости от founders.",
      core_jtbd:
        "Собрать стабильный процесс от лида до delivery.",
      first_priority_actions: [
        "Разделить роли founders",
        "Собрать pipeline",
        "Сузить оффер",
      ],
      expected_outcomes: {
        "3_months": "Появляется контроль над потоком",
        "6_months": "Повышается конверсия",
        "12_months": "Стабильные проекты",
      },
    },

    // ---------------- FORECASTS ----------------
    forecasts: {
      current_vs_target: {
        current_state: {
          revenue: "1900 USD",
          conversion: "7.69%",
          capacity: "4",
        },
        target_state: {
          revenue: "стабильный поток",
          conversion: "10-15%",
          capacity: "управляемая",
        },
        gap_summary:
          "Главный разрыв — processing capacity.",
      },
    },

    // ---------------- BLOCKS ----------------
    positioning: {
      truth_summary: {
        summary:
          "Позиционирование размыто между стратегией, MVP и автоматизациями.",
        confidence_level: "preliminary",
      },
    },

    economics: {
      truth_summary: {
        summary:
          "Экономика нестабильна и основана на единичной сделке.",
        confidence_level: "preliminary",
      },
    },

    clients_flow: {
      truth_summary: {
        summary:
          "Спрос превышает capacity (3.25x), часть лидов теряется.",
        confidence_level: "high",
      },
    },

    product_sales: {
      truth_summary: {
        summary:
          "Модель гибридная и плохо масштабируется.",
        confidence_level: "medium",
      },
    },

    analytics_management: {
      truth_summary: {
        summary:
          "Аналитика есть, но решения founder-driven.",
        confidence_level: "medium",
      },
    },

    structure_processes: {
      truth_summary: {
        summary:
          "Основной bottleneck — структура и перегруз founders.",
        confidence_level: "high",
      },
    },

    strategy: {
      truth_summary: {
        summary:
          "Цели возможны только после фикса capacity.",
        confidence_level: "medium",
      },
    },

    // ---------------- META ----------------
    meta: {
      generated_at: "2026-04-17",
      result_status: "ready",
      account_href: "/account",
      whatsapp_href: "https://wa.me/",
      telegram_href: "https://t.me/",
    },
  },
};
