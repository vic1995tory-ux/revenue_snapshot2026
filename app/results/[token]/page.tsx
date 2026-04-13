"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type SimpleMetric = {
  id?: string;
  label: string;
  value: string | number;
  note?: string;
  kind?: "loss" | "normal";
};

type HeroTag = {
  id?: string;
  label: string;
  tone?: "yellow" | "cyan" | "red" | string;
};

type InterpretationBlock = {
  id: string;
  title: string;
  signal?: string;
  interpretation?: string;
  dependencies?: string;
  risk?: string;
  unknown?: string;
  conclusion?: string;
};

type LeverSystemItem = {
  id?: string;
  name: string;
  role?: string;
  zone?: string;
  text?: string;
};

type LeverMechanic = {
  lever: string;
  affected_metric?: string;
  economic_shift?: string;
  business_result?: string;
};

type RoadmapPhase = {
  phase: string;
  objective?: string;
  why_this_phase_now?: string;
  key_actions?: string[];
  expected_intermediate_result?: string;
  dependencies?: string[];
  owner_logic?: string;
  control_points?: string[];
  risk_if_not_done?: string;
};

type ControlMetric = {
  name: string;
  why_it_matters?: string;
  current_if_known?: string;
  target_if_inferable?: string;
  direction?: string;
  review_frequency?: string;
};

type AlertRule = {
  label: string;
  trigger_logic?: string;
  interpretation?: string;
  required_action?: string;
};

type ResultsPayload = {
  company?: {
    name?: string;
    niche?: string;
    stage?: string;
    geography?: string;
  };
  hero?: {
    eyebrow?: string[];
    headline?: string;
    summary?: string;
    tags?: HeroTag[];
    metrics?: Array<{
      id?: string;
      label: string;
      value: string | number;
      note?: string;
    }>;
    growth_limit?: {
      title?: string;
      bottleneck?: string;
      explanation?: string;
    };
    primary_lever?: {
      title?: string;
      description?: string;
      zone?: string;
    };
    market_adjustment?: {
      title?: string;
      text?: string;
    };
  };
  analytics?: {
    baseKpis?: SimpleMetric[];
    calculatedKpis?: SimpleMetric[];
    losses?: SimpleMetric[];
    revenueWaterfall?: Array<{ name: string; value: number }>;
    demandCapacity?: Array<{ name: string; value: number }>;
  };
  interpretation?: {
    title?: string;
    intro?: string;
    blocks?: InterpretationBlock[];
  };
  solution?: {
    strategic_scenario?: {
      type?: string;
      why_this_scenario?: string;
      market_limits?: string;
      not_now?: string[];
    };
    primary_growth_lever?: {
      name?: string;
      essence?: string;
      zone?: string;
      why_this_lever?: string;
      model_change_recommendation?: string;
    };
    lever_system?: LeverSystemItem[];
    lever_mechanics?: LeverMechanic[];
    implementation_logic?: {
      what_must_change?: string;
      application_points?: string[];
      what_system_must_appear?: string[];
      implementation_conditions?: string[];
      core_dependencies?: string[];
      main_risks?: string[];
      fail_conditions?: string[];
    };
    strategic_priorities?: {
      priority_1?: string;
      priority_2?: string;
      priority_3?: string;
      forbidden_now?: string[];
    };
    expected_business_shift?: {
      what_decreases?: string[];
      what_grows?: string[];
      key_metric_of_success?: string;
      near_term_effect?: string;
      medium_term_effect?: string;
    };
  };
  roadmap?: {
    title?: string;
    intro?: string;
    phases?: RoadmapPhase[];
    control_metrics?: ControlMetric[];
    alert_rules?: AlertRule[];
    decision_signals?: string[];
  };
};

type NormalizedResults = ResultsPayload & {
  analytics: {
    baseKpis: SimpleMetric[];
    calculatedKpis: SimpleMetric[];
    losses: SimpleMetric[];
    revenueWaterfall: Array<{ name: string; value: number }>;
    demandCapacity: Array<{ name: string; value: number }>;
  };
  uplift: {
    currentMarginPct: number;
    targetMarginPct: number;
    currentProfit: number;
    targetProfit: number;
    extraProfitNeeded: number;
    revenueRecoveryNeeded: number;
    lostRevenueShareNeeded: number;
    avgCheck: number;
    leads: number;
    clients: number;
    extraClientsNeeded: number;
    currentConversionPct: number;
    targetConversionPct: number;
    conversionDeltaPct: number;
  };
};

const BRAND = {
  yellow: "#f7d237",
};

const FALLBACK_RESULTS: ResultsPayload = {
  company: {
    name: "n/a",
    niche: "консалтинг + реализация (B2B услуги)",
    stage: "ранняя стадия",
    geography: "ЕС и СНГ",
  },
  hero: {
    eyebrow: [
      "Стартап (6 месяцев), B2B консалтинг + реализация стратегий, фокус на SaaS, 1 клиент, проектная модель с элементами подписки",
      "Бизнес не упирается в поток — он упирается в неспособность конвертировать существующий спрос из-за сложного оффера и перегруженной системы исполнения",
    ],
    headline:
      "Бизнес теряет рост не из-за недостатка спроса, а из-за неспособности упаковать и продать ценность в понятной и масштабируемой форме",
    summary:
      "Главный провал находится в product-sales слое: спрос уже есть, но он плохо конвертируется в сделки и повторяемую экономику.",
    tags: [{ id: "main_loss_type", label: "conversion_loss", tone: "yellow" }],
    metrics: [
      { id: "revenue", label: "revenue", value: "1900", note: "разовая, не повторяющаяся" },
      { id: "conversion", label: "conversion", value: "0.0769", note: "низкая конверсия при наличии спроса" },
      { id: "clients", label: "clients", value: "1", note: "1 контракт ($6100)" },
    ],
    growth_limit: {
      title: "growth_limit",
      bottleneck: "product_sales (упаковка и донесение ценности)",
      explanation: "низкая конверсия из-за слабой упаковки ценности",
    },
    primary_lever: {
      title: "productized_offer + conversion_system",
      description:
        "Превращение сложного консалтинга в стандартизированный, понятный и ограниченный по объему продукт с четким результатом и быстрым time-to-value",
      zone: "product_sales",
    },
    market_adjustment: {
      title: "market_limits",
      text: "Малые и средние рынки ЕС с высокой ценовой чувствительностью требуют четкой ценности и предсказуемого результата; сложные кастомные продажи снижают доверие и конверсию.",
    },
  },
  analytics: {
    baseKpis: [
      { label: "Revenue", value: "€42,000" },
      { label: "Profit", value: "€8,400" },
      { label: "Margin %", value: "20%" },
      { label: "Clients", value: "56" },
      { label: "Leads", value: "190" },
    ],
    calculatedKpis: [
      { label: "Avg Check", value: "€750" },
      { label: "Lead → Sale", value: "29.5%" },
      { label: "Gross Profit", value: "€8,400" },
      { label: "Demand / Capacity", value: "190 / 150" },
      { label: "Capacity Gap", value: "26.7%" },
    ],
    losses: [
      { label: "Lost Revenue", value: "€12,500", kind: "loss" },
      { label: "Lost Profit", value: "€2,500", kind: "loss" },
      { label: "Conversion Loss", value: "18%", kind: "loss" },
      { label: "Capacity Loss", value: "7%", kind: "loss" },
    ],
    revenueWaterfall: [
      { name: "Фактическая выручка", value: 42000 },
      { name: "Потерянная выручка", value: 12500 },
      { name: "Потенциальная выручка", value: 54500 },
    ],
    demandCapacity: [
      { name: "Спрос", value: 190 },
      { name: "Мощность", value: 150 },
    ],
  },
  interpretation: {
    title: "diagnostic interpretation",
    intro:
      "Бизнес не упирается в поток — он упирается в неспособность конвертировать существующий спрос из-за сложного оффера и перегруженной системы исполнения",
    blocks: [
      {
        id: "positioning",
        title: "positioning",
        signal:
          "Стартап, проектная модель, позиционирование в SaaS пока не подтверждено стабильными кейсами",
        interpretation:
          "Модель еще ищет repeatable формат, поэтому выручка нестабильна, а доверие к офферу не закреплено.",
        dependencies:
          "Связано с экономикой и product-sales слоем.",
        risk:
          "Сегмент декларируется уже, но фактически еще не доказан.",
        conclusion:
          "Ранняя стадия с незафиксированным позиционированием.",
      },
      {
        id: "economics",
        title: "economics",
        signal:
          "Экономика выглядит положительно, но не подтверждена на масштабе.",
        interpretation:
          "При малой выборке прибыльность и маржинальность легко переоценить.",
        dependencies:
          "Зависит от оффера, конверсии и операционной способности команды.",
        risk:
          "Преждевременное масштабирование исказит unit-экономику.",
        conclusion:
          "Экономика пока нестабильна и требует закрепления.",
      },
      {
        id: "clients_flow",
        title: "clients_flow",
        signal:
          "Спрос выше способности качественно обработать его и довести до сделки.",
        interpretation:
          "Корневая проблема не в верхе воронки, а в переходе из интереса в контракт.",
        dependencies:
          "Связано с оффером, sales-процессом и capacity.",
        risk:
          "Теплые лиды сгорают без понятного и стандартизированного сценария.",
        conclusion:
          "Главный тип потерь — conversion loss.",
      },
      {
        id: "structure_processes",
        title: "structure_processes",
        signal:
          "Команда перегружена продажами, delivery и ручным управлением.",
        interpretation:
          "Даже рост конверсии быстро упрется в throughput.",
        dependencies:
          "Связано с capacity, качеством исполнения и скоростью cashflow.",
        risk:
          "Рост нагрузки ухудшит клиентский опыт.",
        conclusion:
          "Система исполнения — второе ключевое ограничение.",
      },
    ],
  },
  solution: {
    strategic_scenario: {
      type: "conversion-first productization",
      why_this_scenario:
        "Спрос уже есть, но не конвертируется из-за перегруженного оффера и отсутствия стандартизации. Масштабировать трафик до фиксации конверсии нельзя.",
      market_limits:
        "В ценочувствительных рынках сложная кастомизация бьет по доверию и скорости покупки.",
      not_now: [
        "масштабирование трафика",
        "расширение линейки услуг",
        "найм без стандартизации продукта",
        "переход в премиум без доказанной ценности",
      ],
    },
    primary_growth_lever: {
      name: "productized_offer + conversion_system",
      essence:
        "Переход от сложного кастомного консалтинга к 1–2 четким продуктам с фиксированным scope, сроком и результатом",
      zone: "product_sales",
      why_this_lever:
        "Упрощение оффера напрямую влияет на conversion rate и на repeatability экономики.",
      model_change_recommendation:
        "Собрать diagnostic + implementation sprint как понятную двухступенчатую модель.",
    },
    lever_system: [
      {
        id: "primary",
        name: "productized_offer + conversion_system",
        role: "primary",
        zone: "product_sales",
        text: "Основной драйвер роста на текущем этапе.",
      },
      {
        id: "amplifies",
        name: "positioning (узкий ICP)",
        role: "amplifies",
        zone: "strategy",
        text: "Сужает ICP и повышает точность месседжа.",
      },
      {
        id: "amplifies_2",
        name: "sales_process",
        role: "amplifies",
        zone: "sales",
        text: "Скрипты, стадии и квалификация лида.",
      },
      {
        id: "stabilizes",
        name: "retention_ltv",
        role: "stabilizes",
        zone: "retention",
        text: "Подписка или follow-up после результата.",
      },
      {
        id: "rejected",
        name: "acquisition_scaling",
        role: "rejected_now",
        zone: "marketing",
        text: "Усилит текущие потери при слабой конверсии.",
      },
    ],
    lever_mechanics: [
      {
        lever: "productized_offer",
        affected_metric: "conversion_rate",
        economic_shift: "рост конверсии снижает CAC на сделку",
        business_result: "рост выручки без увеличения лидов",
      },
      {
        lever: "offer_simplification",
        affected_metric: "sales_cycle_length",
        economic_shift: "ускорение оборота денег",
        business_result: "быстрее cashflow и меньше потерь лидов",
      },
      {
        lever: "capacity_structuring",
        affected_metric: "delivery_throughput",
        economic_shift: "больше выручки на ту же команду",
        business_result: "масштабируемость без найма",
      },
    ],
    implementation_logic: {
      what_must_change:
        "Сложный кастомный оффер → стандартизированные продукты с ограниченным scope и предсказуемым результатом",
      application_points: [
        "коммерческое предложение",
        "демо и презентация",
        "скрипты продаж",
        "delivery-процесс",
      ],
      what_system_must_appear: [
        "2-ступенчатый продукт",
        "CRM со стадиями воронки",
        "шаблоны delivery",
        "календарь capacity",
      ],
      implementation_conditions: [
        "жесткое ограничение кастомизации",
        "выбор одного ICP",
        "декомпозиция опыта в шаблоны",
      ],
      core_dependencies: [
        "готовность отказаться от универсальности",
        "дисциплина в продажах",
        "фокус основателей",
      ],
      main_risks: [
        "переупрощение без ценности",
        "несовпадение ожиданий клиента и формата",
      ],
      fail_conditions: [
        "сохранение кастомных продаж",
        "отсутствие четкого ICP",
        "игнорирование обратной связи по сделкам",
      ],
    },
    strategic_priorities: {
      priority_1: "упаковка и упрощение оффера",
      priority_2: "рост конверсии через sales system",
      priority_3: "стандартизация delivery",
      forbidden_now: [
        "масштабирование маркетинга",
        "усложнение продукта",
        "расширение ICP",
      ],
    },
    expected_business_shift: {
      what_decreases: ["потери лидов", "длина сделки", "нагрузка на основателей"],
      what_grows: ["конверсия", "предсказуемость выручки", "пропускная способность"],
      key_metric_of_success: "conversion_rate",
      near_term_effect: "рост сделок без увеличения трафика",
      medium_term_effect: "появление repeatable revenue модели",
    },
  },
  roadmap: {
    title: "roadmap",
    intro:
      "Сначала фиксируем оффер и конверсию, только потом думаем о масштабировании спроса.",
    phases: [
      {
        phase: "0–30 days",
        objective: "зафиксировать продукт и упростить оффер",
        why_this_phase_now: "без этого нельзя поднять конверсию",
        key_actions: [
          "выбрать узкий ICP",
          "собрать 1 основной продукт",
          "описать результат, срок, формат",
          "упростить презентацию",
          "ввести базовую CRM",
        ],
        expected_intermediate_result: "понятный оффер и рост качества первых звонков",
        dependencies: ["фокус основателей", "текущий поток лидов"],
        owner_logic: "фаундеры напрямую",
        control_points: ["рост конверсии звонок → сделка", "снижение времени сделки"],
        risk_if_not_done: "дальнейшая потеря лидов",
      },
      {
        phase: "30–90 days",
        objective: "стандартизировать продажи и delivery",
        why_this_phase_now: "иначе рост спроса упрется в ручное исполнение",
        key_actions: [
          "прописать sales-этапы",
          "ввести шаблоны предложений",
          "ограничить кастомизацию",
          "собрать capacity-план",
        ],
        expected_intermediate_result: "устойчивая обработка входящего спроса",
        dependencies: ["понятный оффер", "базовая CRM"],
        owner_logic: "основатель + операционный контур",
        control_points: ["доля выигранных сделок", "срок от лида до оплаты"],
        risk_if_not_done: "рост загрузки без роста прибыли",
      },
    ],
    control_metrics: [
      {
        name: "conversion_rate",
        why_it_matters: "ключевой ограничитель роста",
        current_if_known: "0.0769",
        target_if_inferable: "0.2",
        direction: "up",
        review_frequency: "weekly",
      },
    ],
    alert_rules: [
      {
        label: "low_conversion",
        trigger_logic: "conversion_rate < 10%",
        interpretation: "оффер не работает",
        required_action: "перепаковка оффера",
      },
    ],
    decision_signals: [
      "рост конверсии без роста трафика → можно масштабировать",
      "стабильные повторные сделки → можно вводить retention-механику",
      "перегруз delivery → нужна делегация или шаблонизация",
    ],
  },
};

function numberFrom(value: unknown): number {
  if (typeof value === "number") return value;
  const cleaned = String(value ?? "")
    .replace(/\s/g, "")
    .replace(/€/g, "")
    .replace(/\$/g, "")
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function percentFrom(value: unknown): number {
  const raw = String(value ?? "");
  const parsed = numberFrom(value);
  if (raw.includes("%")) return parsed;
  if (parsed > 0 && parsed <= 1) return parsed * 100;
  return parsed;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits).replace(/\.0$/, "")}%`;
}

function formatInt(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeLabel(label: string) {
  return label.replace(/\s+/g, " ").trim().toLowerCase();
}

function getMetricValue(items: SimpleMetric[] = [], label: string) {
  const found = items.find(
    (item) => normalizeLabel(item.label) === normalizeLabel(label)
  );
  return found?.value ?? "";
}

function toneClasses(tone?: string) {
  if (tone === "red") {
    return "border-red-400/25 bg-red-400/10 text-red-100";
  }
  if (tone === "cyan") {
    return "border-cyan-300/25 bg-cyan-400/10 text-cyan-100";
  }
  return "border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff3b2]";
}

function metricDisplay(label: string, value: string | number) {
  const l = normalizeLabel(label);

  if (
    l.includes("revenue") ||
    l.includes("profit") ||
    l.includes("check") ||
    l.includes("gross")
  ) {
    return formatCurrency(numberFrom(value));
  }

  if (
    l.includes("margin") ||
    l.includes("conversion") ||
    l.includes("loss") ||
    l.includes("lead → sale") ||
    l.includes("lead->sale") ||
    l.includes("capacity gap")
  ) {
    return formatPercent(percentFrom(value));
  }

  return formatInt(numberFrom(value));
}

function buildUplift(analytics: NormalizedResults["analytics"]) {
  const revenue = numberFrom(getMetricValue(analytics.baseKpis, "Revenue"));
  const profit = numberFrom(getMetricValue(analytics.baseKpis, "Profit"));
  const marginPct =
    percentFrom(getMetricValue(analytics.baseKpis, "Margin %")) ||
    (revenue > 0 ? (profit / revenue) * 100 : 0);

  const leads = numberFrom(getMetricValue(analytics.baseKpis, "Leads"));
  const clients = numberFrom(getMetricValue(analytics.baseKpis, "Clients"));
  const avgCheck =
    numberFrom(getMetricValue(analytics.calculatedKpis, "Avg Check")) ||
    (clients > 0 ? revenue / clients : 0);

  const currentConversionPct =
    percentFrom(getMetricValue(analytics.calculatedKpis, "Lead → Sale")) ||
    (leads > 0 ? (clients / leads) * 100 : 0);

  const lostRevenue = numberFrom(getMetricValue(analytics.losses, "Lost Revenue"));

  const targetMarginPct = marginPct + 3;
  const targetProfit = revenue * (targetMarginPct / 100);
  const extraProfitNeeded = Math.max(0, targetProfit - profit);
  const revenueRecoveryNeeded =
    marginPct > 0 ? extraProfitNeeded / (marginPct / 100) : extraProfitNeeded;
  const lostRevenueShareNeeded =
    lostRevenue > 0 ? (revenueRecoveryNeeded / lostRevenue) * 100 : 0;
  const extraClientsNeeded =
    avgCheck > 0 ? Math.ceil(revenueRecoveryNeeded / avgCheck) : 0;
  const targetConversionPct =
    leads > 0 ? ((clients + extraClientsNeeded) / leads) * 100 : currentConversionPct;
  const conversionDeltaPct = targetConversionPct - currentConversionPct;

  return {
    currentMarginPct: marginPct,
    targetMarginPct,
    currentProfit: profit,
    targetProfit,
    extraProfitNeeded,
    revenueRecoveryNeeded,
    lostRevenueShareNeeded,
    avgCheck,
    leads,
    clients,
    extraClientsNeeded,
    currentConversionPct,
    targetConversionPct,
    conversionDeltaPct,
  };
}

function normalizeResults(raw: ResultsPayload | null | undefined): NormalizedResults {
  const merged: ResultsPayload = {
    ...FALLBACK_RESULTS,
    ...raw,
    company: {
      ...FALLBACK_RESULTS.company,
      ...raw?.company,
    },
    hero: {
      ...FALLBACK_RESULTS.hero,
      ...raw?.hero,
    },
    analytics: {
      ...FALLBACK_RESULTS.analytics,
      ...raw?.analytics,
    },
    interpretation: {
      ...FALLBACK_RESULTS.interpretation,
      ...raw?.interpretation,
    },
    solution: {
      ...FALLBACK_RESULTS.solution,
      ...raw?.solution,
      strategic_scenario: {
        ...FALLBACK_RESULTS.solution?.strategic_scenario,
        ...raw?.solution?.strategic_scenario,
      },
      primary_growth_lever: {
        ...FALLBACK_RESULTS.solution?.primary_growth_lever,
        ...raw?.solution?.primary_growth_lever,
      },
      implementation_logic: {
        ...FALLBACK_RESULTS.solution?.implementation_logic,
        ...raw?.solution?.implementation_logic,
      },
      strategic_priorities: {
        ...FALLBACK_RESULTS.solution?.strategic_priorities,
        ...raw?.solution?.strategic_priorities,
      },
      expected_business_shift: {
        ...FALLBACK_RESULTS.solution?.expected_business_shift,
        ...raw?.solution?.expected_business_shift,
      },
    },
    roadmap: {
      ...FALLBACK_RESULTS.roadmap,
      ...raw?.roadmap,
    },
  };

  const analytics = {
    baseKpis: merged.analytics?.baseKpis ?? FALLBACK_RESULTS.analytics!.baseKpis!,
    calculatedKpis:
      merged.analytics?.calculatedKpis ?? FALLBACK_RESULTS.analytics!.calculatedKpis!,
    losses: merged.analytics?.losses ?? FALLBACK_RESULTS.analytics!.losses!,
    revenueWaterfall:
      merged.analytics?.revenueWaterfall ??
      FALLBACK_RESULTS.analytics!.revenueWaterfall!,
    demandCapacity:
      merged.analytics?.demandCapacity ?? FALLBACK_RESULTS.analytics!.demandCapacity!,
  };

  return {
    ...merged,
    analytics,
    uplift: buildUplift(analytics),
  };
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl ${className}`}
      style={{
        boxShadow:
          "0 18px 56px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.045)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,55,0.09),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.045),transparent_24%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Ring({ progress, size = 110 }: { progress: number; size?: number }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88" className="-rotate-90">
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.045)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke={BRAND.yellow}
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: "drop-shadow(0 0 4px rgba(247,210,55,0.22))",
            transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-white">
          {Math.round(progress)}%
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">
          score
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-5">
      <div className="text-[11px] uppercase tracking-[0.28em] text-white/38">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#a5aeb2]">{text}</p>
      ) : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  tone = "default",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "default" | "loss" | "accent";
}) {
  const toneClass =
    tone === "loss"
      ? "border-red-400/20 bg-red-400/10"
      : tone === "accent"
      ? "border-[#f7d237]/25 bg-[#f7d237]/10"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={`rounded-[24px] border p-4 ${toneClass}`}>
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {note ? <div className="mt-2 text-sm leading-6 text-white/55">{note}</div> : null}
    </div>
  );
}

function BarsChart({
  title,
  data,
  formatter = (n: number) => formatInt(n),
  barClassName = "bg-[#f7d237]",
}: {
  title: string;
  data: Array<{ name: string; value: number }>;
  formatter?: (n: number) => string;
  barClassName?: string;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <GlassCard className="p-5 md:p-6">
      <div className="mb-5 text-lg font-medium text-white">{title}</div>
      <div className="space-y-4">
        {data.map((item) => {
          const width = `${(item.value / max) * 100}%`;
          return (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div className="text-sm text-white/70">{item.name}</div>
                <div className="text-sm font-medium text-white">
                  {formatter(item.value)}
                </div>
              </div>
              <div className="h-3 rounded-full bg-white/8">
                <div
                  className={`h-3 rounded-full ${barClassName}`}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function TableList({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
      <div className="grid border-b border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white/45 md:grid-cols-4">
        {headers.map((header) => (
          <div key={header} className="py-1">
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, idx) => (
        <div
          key={`${row[0]}-${idx}`}
          className="grid gap-2 border-b border-white/8 px-4 py-4 text-sm text-white/75 last:border-b-0 md:grid-cols-4"
        >
          {row.map((cell, cellIdx) => (
            <div key={`${idx}-${cellIdx}`}>{cell || "—"}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <GlassCard className="w-full max-w-[560px] p-8">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 p-3">
          <div className="h-full w-full animate-spin rounded-full border-2 border-[#f7d237]/25 border-t-[#f7d237]" />
        </div>
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">
            Revenue Snapshot
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            Загружаем результаты
          </div>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Получаем payload по token и собираем страницу.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

export default function ResultsPage() {
  const params = useParams<{ token: string }>();
  const token = Array.isArray(params?.token) ? params.token[0] : params?.token ?? "";

  const [data, setData] = useState<NormalizedResults | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/results/${encodeURIComponent(token)}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const raw = await response.json();

        if (!alive) return;
        setData(normalizeResults(raw));
      } catch (err) {
        if (!alive) return;
        setError(
          err instanceof Error
            ? err.message
            : "Не удалось загрузить данные. Показан fallback payload."
        );
        setData(normalizeResults(FALLBACK_RESULTS));
      } finally {
        if (alive) setLoading(false);
      }
    }

    if (token) {
      load();
    } else {
      setLoading(false);
      setError("Missing token");
      setData(normalizeResults(FALLBACK_RESULTS));
    }

    return () => {
      alive = false;
    };
  }, [token]);

  const score = useMemo(() => {
    if (!data) return 0;
    const lostRevenue = numberFrom(getMetricValue(data.analytics.losses, "Lost Revenue"));
    const potential =
      data.analytics.revenueWaterfall.find((x) => x.name === "Потенциальная выручка")
        ?.value ?? 0;

    if (!potential) return 0;
    const efficiency = Math.max(0, 100 - (lostRevenue / potential) * 100);
    return Math.round(efficiency);
  }, [data]);

  if (loading) {
    return (
      <div
        className="min-h-screen text-white"
        style={{
          background:
            "radial-gradient(circle at top, rgba(247,210,55,0.08), transparent 18%), linear-gradient(180deg, #0b1d3a 0%, #08162d 100%)",
        }}
      >
        <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-8 lg:px-10">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    company,
    hero,
    analytics,
    interpretation,
    solution,
    roadmap,
    uplift,
  } = data;

  const leverageRows =
    solution?.lever_mechanics?.map((item) => [
      item.lever,
      item.affected_metric ?? "—",
      item.economic_shift ?? "—",
      item.business_result ?? "—",
    ]) ?? [];

  const controlRows =
    roadmap?.control_metrics?.map((item) => [
      item.name,
      item.current_if_known ?? "—",
      item.target_if_inferable ?? "—",
      item.review_frequency ?? "—",
    ]) ?? [];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(247,210,55,0.08), transparent 18%), linear-gradient(180deg, #0b1d3a 0%, #08162d 100%)",
      }}
    >
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-2xl md:px-5">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Growth Avenue"
              width={160}
              height={36}
              className="h-auto w-auto"
              priority
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm text-white/70">
              token: {token || "fallback"}
            </div>
            <Link
              href={`/account/${encodeURIComponent(token || "demo")}`}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              Profile
            </Link>
          </div>
        </header>

        {error ? (
          <div className="mb-6 rounded-2xl border border-yellow-400/25 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
            {error}
          </div>
        ) : null}

        <GlassCard className="mb-8 p-5 md:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                <span className="text-[#f7d237]">●</span>
                Revenue Snapshot — Results
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#fefefe] md:text-5xl">
                {hero?.headline ?? "Results page"}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a5aeb2] md:text-base">
                {hero?.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {hero?.tags?.map((tag) => (
                  <span
                    key={tag.id ?? tag.label}
                    className={`rounded-full border px-3 py-1.5 text-sm ${toneClasses(tag.tone)}`}
                  >
                    {tag.label}
                  </span>
                ))}
                {company?.stage ? (
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70">
                    {company.stage}
                  </span>
                ) : null}
                {company?.geography ? (
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/70">
                    {company.geography}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {(hero?.metrics ?? []).map((metric) => (
                  <MetricCard
                    key={metric.id ?? metric.label}
                    label={metric.label}
                    value={metricDisplay(metric.label, metric.value)}
                    note={metric.note}
                    tone="accent"
                  />
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Growth limit
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    {hero?.growth_limit?.bottleneck}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/55">
                    {hero?.growth_limit?.explanation}
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#f7d237]/25 bg-[#f7d237]/10 p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]/70">
                    Primary lever
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    {hero?.primary_lever?.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/70">
                    {hero?.primary_lever?.description}
                  </div>
                </div>
              </div>

              {hero?.market_adjustment?.text ? (
                <div className="mt-4 rounded-[24px] border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
                  {hero.market_adjustment.text}
                </div>
              ) : null}
            </div>

            <GlassCard className="p-6 md:p-7">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                  Efficiency score
                </div>

                <div className="mt-6">
                  <Ring progress={score} size={172} />
                </div>

                <div className="mt-5 text-2xl font-semibold text-[#fefefe]">
                  Текущая эффективность монетизации
                </div>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#a5aeb2]">
                  Score считается от доли нереализованной выручки к потенциальной.
                </p>

                <div className="mt-5 grid w-full grid-cols-2 gap-3 text-left">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Company
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      {company?.name || "n/a"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Niche
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      {company?.niche || "n/a"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
                  <Image
                    src="/hero.svg"
                    alt="Revenue Snapshot"
                    width={900}
                    height={600}
                    className="h-auto w-full opacity-80"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <section className="mb-8">
          <SectionTitle
            eyebrow="economics"
            title="KPI layer and lost revenue"
            text="Блок показывает базовые показатели, расчетные KPI, потери, воронку выручки и простую формульную модель: сколько нужно вернуть из lost revenue, чтобы чистая прибыльность выросла на 3 п.п."
          />

          <div className="grid gap-3 md:grid-cols-5">
            {analytics.baseKpis.map((item) => (
              <MetricCard
                key={item.label}
                label={item.label}
                value={metricDisplay(item.label, item.value)}
              />
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {analytics.calculatedKpis.map((item) => (
              <MetricCard
                key={item.label}
                label={item.label}
                value={
                  item.label === "Demand / Capacity"
                    ? String(item.value)
                    : metricDisplay(item.label, item.value)
                }
              />
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {analytics.losses.map((item) => (
              <MetricCard
                key={item.label}
                label={item.label}
                value={metricDisplay(item.label, item.value)}
                tone="loss"
              />
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <BarsChart
              title="Revenue waterfall"
              data={analytics.revenueWaterfall}
              formatter={formatCurrency}
              barClassName="bg-[linear-gradient(90deg,#f7d237_0%,#ffe88b_100%)]"
            />

            <BarsChart
              title="Demand vs capacity"
              data={analytics.demandCapacity}
              formatter={formatInt}
              barClassName="bg-[linear-gradient(90deg,#7dd3fc_0%,#f7d237_100%)]"
            />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard className="p-5 md:p-6">
              <div className="mb-5 text-lg font-medium text-white">
                Profit uplift to +3 p.p. margin
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard
                  label="Current margin"
                  value={formatPercent(uplift.currentMarginPct)}
                />
                <MetricCard
                  label="Target margin"
                  value={formatPercent(uplift.targetMarginPct)}
                  tone="accent"
                />
                <MetricCard
                  label="Current profit"
                  value={formatCurrency(uplift.currentProfit)}
                />
                <MetricCard
                  label="Target profit"
                  value={formatCurrency(uplift.targetProfit)}
                  tone="accent"
                />
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-white/60">
                    <span>Current profit</span>
                    <span>{formatCurrency(uplift.currentProfit)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/8">
                    <div
                      className="h-3 rounded-full bg-white/40"
                      style={{
                        width: `${
                          uplift.targetProfit > 0
                            ? (uplift.currentProfit / uplift.targetProfit) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-white/60">
                    <span>Target profit</span>
                    <span>{formatCurrency(uplift.targetProfit)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/8">
                    <div className="h-3 w-full rounded-full bg-[linear-gradient(90deg,#f7d237_0%,#ffe88b_100%)]" />
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <div className="mb-5 text-lg font-medium text-white">
                Что нужно вернуть из lost revenue
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <MetricCard
                  label="Extra profit needed"
                  value={formatCurrency(uplift.extraProfitNeeded)}
                  tone="accent"
                />
                <MetricCard
                  label="Revenue to recover"
                  value={formatCurrency(uplift.revenueRecoveryNeeded)}
                  tone="accent"
                />
                <MetricCard
                  label="Share of lost revenue"
                  value={formatPercent(uplift.lostRevenueShareNeeded)}
                />
                <MetricCard
                  label="Extra clients needed"
                  value={formatInt(uplift.extraClientsNeeded)}
                />
              </div>

              <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/70">
                При текущем среднем чеке <span className="text-[#fff3b2]">{formatCurrency(uplift.avgCheck)}</span> и текущей базе из{" "}
                <span className="text-[#fff3b2]">{formatInt(uplift.leads)}</span> лидов нужно примерно{" "}
                <span className="text-[#fff3b2]">{formatInt(uplift.extraClientsNeeded)}</span> дополнительных продаж.
                Это поднимает Lead → Sale примерно с{" "}
                <span className="text-[#fff3b2]">{formatPercent(uplift.currentConversionPct)}</span> до{" "}
                <span className="text-[#fff3b2]">{formatPercent(uplift.targetConversionPct)}</span>,
                то есть на <span className="text-[#fff3b2]">{formatPercent(uplift.conversionDeltaPct)}</span>.
              </div>

              <div className="mt-4 rounded-[24px] border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
                Здесь я трактую твою задачу как рост чистой прибыльности на <strong>+3 процентных пункта</strong>, без сложного обработчика — только простыми расчетами поверх текущих KPI.
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle
            eyebrow="diagnostic interpretation"
            title={interpretation?.title || "Interpretation"}
            text={interpretation?.intro}
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {(interpretation?.blocks ?? []).map((block) => (
              <GlassCard key={block.id} className="p-5 md:p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-lg font-medium text-white">{block.title}</div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/45">
                    block
                  </span>
                </div>

                <div className="space-y-4 text-sm leading-7 text-white/70">
                  {block.signal ? (
                    <div>
                      <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Signal
                      </div>
                      <div>{block.signal}</div>
                    </div>
                  ) : null}

                  {block.interpretation ? (
                    <div>
                      <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Interpretation
                      </div>
                      <div>{block.interpretation}</div>
                    </div>
                  ) : null}

                  {block.dependencies ? (
                    <div>
                      <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Dependencies
                      </div>
                      <div>{block.dependencies}</div>
                    </div>
                  ) : null}

                  {block.risk ? (
                    <div>
                      <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Risk
                      </div>
                      <div>{block.risk}</div>
                    </div>
                  ) : null}

                  {block.conclusion ? (
                    <div className="rounded-[20px] border border-[#f7d237]/25 bg-[#f7d237]/10 p-4 text-white">
                      <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]/70">
                        Conclusion
                      </div>
                      <div>{block.conclusion}</div>
                    </div>
                  ) : null}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle
            eyebrow="solution"
            title="Strategic scenario and implementation logic"
            text="Здесь собран основной сценарий, primary lever, система усиливающих рычагов, механика влияния на экономику и список условий внедрения."
          />

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <GlassCard className="p-5 md:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                Strategic scenario
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {solution?.strategic_scenario?.type}
              </div>
              <div className="mt-4 text-sm leading-7 text-white/70">
                {solution?.strategic_scenario?.why_this_scenario}
              </div>

              {solution?.strategic_scenario?.market_limits ? (
                <div className="mt-4 rounded-[20px] border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
                  {solution.strategic_scenario.market_limits}
                </div>
              ) : null}

              {(solution?.strategic_scenario?.not_now ?? []).length > 0 ? (
                <div className="mt-4">
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Not now
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {solution?.strategic_scenario?.not_now?.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-sm text-red-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                Primary growth lever
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {solution?.primary_growth_lever?.name}
              </div>
              <div className="mt-4 text-sm leading-7 text-white/70">
                {solution?.primary_growth_lever?.essence}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MetricCard
                  label="Zone"
                  value={solution?.primary_growth_lever?.zone || "—"}
                />
                <MetricCard
                  label="Model change"
                  value={solution?.primary_growth_lever?.model_change_recommendation || "—"}
                  tone="accent"
                />
              </div>

              {solution?.primary_growth_lever?.why_this_lever ? (
                <div className="mt-4 rounded-[20px] border border-[#f7d237]/25 bg-[#f7d237]/10 p-4 text-sm leading-7 text-white">
                  {solution.primary_growth_lever.why_this_lever}
                </div>
              ) : null}
            </GlassCard>
          </div>

          {(solution?.lever_system ?? []).length > 0 ? (
            <div className="mt-6">
              <div className="mb-4 text-lg font-medium text-white">Lever system</div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {solution?.lever_system?.map((item) => {
                  const roleTone =
                    item.role === "primary"
                      ? "border-[#f7d237]/25 bg-[#f7d237]/10"
                      : item.role === "rejected_now"
                      ? "border-red-400/20 bg-red-400/10"
                      : "border-white/10 bg-white/[0.03]";

                  return (
                    <div
                      key={item.id ?? item.name}
                      className={`rounded-[24px] border p-4 ${roleTone}`}
                    >
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        {item.role || "lever"}
                      </div>
                      <div className="mt-2 text-base font-medium text-white">
                        {item.name}
                      </div>
                      {item.zone ? (
                        <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
                          {item.zone}
                        </div>
                      ) : null}
                      {item.text ? (
                        <div className="mt-3 text-sm leading-6 text-white/65">
                          {item.text}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {leverageRows.length > 0 ? (
            <div className="mt-6">
              <div className="mb-4 text-lg font-medium text-white">Lever mechanics</div>
              <TableList
                headers={["Lever", "Affected metric", "Economic shift", "Business result"]}
                rows={leverageRows}
              />
            </div>
          ) : null}

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <GlassCard className="p-5 md:p-6">
              <div className="mb-4 text-lg font-medium text-white">Implementation logic</div>

              {solution?.implementation_logic?.what_must_change ? (
                <div className="mb-4 rounded-[20px] border border-[#f7d237]/25 bg-[#f7d237]/10 p-4 text-sm leading-7 text-white">
                  {solution.implementation_logic.what_must_change}
                </div>
              ) : null}

              <div className="space-y-4 text-sm leading-7 text-white/70">
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Application points
                  </div>
                  <ul className="space-y-1">
                    {(solution?.implementation_logic?.application_points ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    System must appear
                  </div>
                  <ul className="space-y-1">
                    {(solution?.implementation_logic?.what_system_must_appear ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <div className="mb-4 text-lg font-medium text-white">Constraints and risks</div>

              <div className="grid gap-4 md:grid-cols-2 text-sm leading-7">
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Conditions
                  </div>
                  <ul className="space-y-1 text-white/70">
                    {(solution?.implementation_logic?.implementation_conditions ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Dependencies
                  </div>
                  <ul className="space-y-1 text-white/70">
                    {(solution?.implementation_logic?.core_dependencies ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Main risks
                  </div>
                  <ul className="space-y-1 text-white/70">
                    {(solution?.implementation_logic?.main_risks ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    Fail conditions
                  </div>
                  <ul className="space-y-1 text-white/70">
                    {(solution?.implementation_logic?.fail_conditions ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <GlassCard className="p-5 md:p-6">
              <div className="mb-4 text-lg font-medium text-white">Strategic priorities</div>
              <div className="space-y-3">
                <MetricCard
                  label="Priority 1"
                  value={solution?.strategic_priorities?.priority_1 || "—"}
                  tone="accent"
                />
                <MetricCard
                  label="Priority 2"
                  value={solution?.strategic_priorities?.priority_2 || "—"}
                />
                <MetricCard
                  label="Priority 3"
                  value={solution?.strategic_priorities?.priority_3 || "—"}
                />
              </div>

              {(solution?.strategic_priorities?.forbidden_now ?? []).length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {solution?.strategic_priorities?.forbidden_now?.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-sm text-red-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <div className="mb-4 text-lg font-medium text-white">Expected business shift</div>

              <div className="grid gap-4 md:grid-cols-2 text-sm leading-7">
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    What decreases
                  </div>
                  <ul className="space-y-1 text-white/70">
                    {(solution?.expected_business_shift?.what_decreases ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    What grows
                  </div>
                  <ul className="space-y-1 text-white/70">
                    {(solution?.expected_business_shift?.what_grows ?? []).map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <MetricCard
                  label="Success metric"
                  value={solution?.expected_business_shift?.key_metric_of_success || "—"}
                />
                <MetricCard
                  label="Near term"
                  value={solution?.expected_business_shift?.near_term_effect || "—"}
                />
                <MetricCard
                  label="Medium term"
                  value={solution?.expected_business_shift?.medium_term_effect || "—"}
                />
              </div>
            </GlassCard>
          </div>
        </section>

        <section>
          <SectionTitle
            eyebrow="roadmap"
            title={roadmap?.title || "Roadmap"}
            text={roadmap?.intro}
          />

          {(roadmap?.phases ?? []).length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {roadmap?.phases?.map((phase) => (
                <GlassCard key={phase.phase} className="p-5 md:p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-xl font-semibold text-white">{phase.phase}</div>
                    <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-xs text-[#fff3b2]">
                      phase
                    </span>
                  </div>

                  <div className="space-y-4 text-sm leading-7 text-white/70">
                    {phase.objective ? (
                      <div>
                        <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                          Objective
                        </div>
                        <div>{phase.objective}</div>
                      </div>
                    ) : null}

                    {phase.why_this_phase_now ? (
                      <div>
                        <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                          Why now
                        </div>
                        <div>{phase.why_this_phase_now}</div>
                      </div>
                    ) : null}

                    {(phase.key_actions ?? []).length > 0 ? (
                      <div>
                        <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                          Key actions
                        </div>
                        <ul className="space-y-1">
                          {phase.key_actions?.map((item) => (
                            <li key={item}>— {item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {phase.expected_intermediate_result ? (
                      <div className="rounded-[20px] border border-cyan-300/20 bg-cyan-400/10 p-4 text-cyan-100">
                        {phase.expected_intermediate_result}
                      </div>
                    ) : null}

                    {(phase.control_points ?? []).length > 0 ? (
                      <div>
                        <div className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                          Control points
                        </div>
                        <ul className="space-y-1">
                          {phase.control_points?.map((item) => (
                            <li key={item}>— {item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : null}

          {controlRows.length > 0 ? (
            <div className="mt-6">
              <div className="mb-4 text-lg font-medium text-white">Control metrics</div>
              <TableList
                headers={["Metric", "Current", "Target", "Review"]}
                rows={controlRows}
              />
            </div>
          ) : null}

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <GlassCard className="p-5 md:p-6">
              <div className="mb-4 text-lg font-medium text-white">Alert rules</div>
              <div className="space-y-3">
                {(roadmap?.alert_rules ?? []).map((rule) => (
                  <div
                    key={rule.label}
                    className="rounded-[20px] border border-red-400/20 bg-red-400/10 p-4"
                  >
                    <div className="text-sm font-medium text-white">{rule.label}</div>
                    <div className="mt-2 text-sm leading-7 text-red-100">
                      <div>Trigger: {rule.trigger_logic || "—"}</div>
                      <div>Interpretation: {rule.interpretation || "—"}</div>
                      <div>Action: {rule.required_action || "—"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <div className="mb-4 text-lg font-medium text-white">Decision signals</div>
              <div className="space-y-3 text-sm leading-7 text-white/70">
                {(roadmap?.decision_signals ?? []).map((signal) => (
                  <div
                    key={signal}
                    className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4"
                  >
                    {signal}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
    </div>
  );
}
