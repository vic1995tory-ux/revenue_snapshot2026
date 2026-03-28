"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

type MetricItem = {
  label: string;
  value: string;
};

type BlockDetails = {
  summary: string;
  strengths: string[];
  risks: string[];
  actions: string[];
  metrics: MetricItem[];
};

type InsightBlock = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  score: number;
  status: string;
  shortPoints: string[];
  tags: string[];
  links: string[];
  details: BlockDetails;
};

type CompanyData = {
  name: string;
  project: string;
  summary: string;
  executive: string;
  score: number;
  maturity: string;
  horizon: string;
  expires: string;
  resultLabel: string;
};

type ResultsPayload = {
  company: CompanyData;
  blocks: InsightBlock[];
  solution?: {
    title?: string;
    subtitle?: string;
    sections?: string[];
  };
};

type SlotItem = {
  id: string;
  label: string;
  iso?: string;
};

type ActivePanel =
  | {
      type: "block" | "solution";
      id?: string;
    }
  | null;

const RESULTS_WEBHOOK =
  "https://hook.us2.make.com/z5en2sa55efywylbva4w5sc57mawkrpb";

const SLOTS_WEBHOOK =
  "https://hook.us2.make.com/1ksamfmvyq0c30rtse55qj61e0wd698r";

const FALLBACK_DATA: ResultsPayload = {
  company: {
    name: "GROWTH AVENUE",
    project: "Revenue Snapshot Results",
    summary:
      "Бизнес выглядит жизнеспособным, но рост сейчас ограничен не спросом как таковым, а связкой позиционирования, перегруженной обработки входящего потока и неоднородной продуктовой структуры.",
    executive:
      "Главный вывод: компания уже создаёт ценность для рынка, но часть выручки теряется между интересом клиента, обработкой спроса и упаковкой наиболее маржинальных решений. Потенциал роста есть, но его раскрытие требует не просто наращивания трафика, а выравнивания модели: что продаём, кому продаём, как ведём до результата и где управляем цифрами, а не ощущениями.",
    score: 74,
    maturity: "Growth Model with Friction",
    horizon: "Primary 6–12 week unlock",
    expires: "27 March 2027",
    resultLabel: "Snapshot ready",
  },
  solution: {
    title: "Solutions & Practice",
    subtitle: "Placeholder layer ready for later content",
    sections: [
      "Primary Growth Lever",
      "Revenue Loss Source",
      "Model Change Recommendation",
      "Strategic Priority",
      "Business Impact",
      "Implementation Conditions",
    ],
  },
  blocks: [
    {
      id: "economics",
      title: "Economics",
      subtitle: "Margin, revenue, structure, KPI",
      icon: "◔",
      score: 71,
      status: "Stable, but margin-sensitive",
      shortPoints: [
        "Маржа держится, но запас прочности не выглядит высоким.",
        "Выручка формируется без явного разделения сильных и слабых единиц экономики.",
        "KPI есть, но управленческий слой по цифрам пока неполный.",
        "Рост расходов может съедать часть эффекта от расширения спроса.",
      ],
      tags: ["Margin", "Revenue", "KPI", "Costs"],
      links: ["product", "flow", "analytics"],
      details: {
        summary:
          "Экономика не выглядит критичной, но она реагирует на рост неидеально: при усилении потока или расширении команды прибыльность может размываться быстрее, чем должна.",
        strengths: [
          "Есть базовая управляемость по выручке и объёму.",
          "Бизнес не выглядит убыточным на уровне модели.",
          "Есть пространство для роста без немедленной перестройки всей структуры.",
        ],
        risks: [
          "Нет явной защиты маржи на уровне ассортимента и каналов.",
          "Не все метрики замыкаются в понятные решения.",
          "При росте расходов команда может переоценить реальную эффективность.",
        ],
        actions: [
          "Разложить выручку по сегментам и маржинальности.",
          "Отделить управляющие KPI от наблюдаемых KPI.",
          "Собрать быстрый unit view: канал → клиент → чек → маржа.",
        ],
        metrics: [
          { label: "Economic Rate", value: "71/100" },
          { label: "Margin Resilience", value: "Medium" },
          { label: "Decision Readiness", value: "Partial" },
        ],
      },
    },
    {
      id: "flow",
      title: "Clients & Flow",
      subtitle: "Segment, demand, capacity, channels",
      icon: "◎",
      score: 67,
      status: "Demand exists, capacity leaks",
      shortPoints: [
        "Спрос есть, но обработка потока неравномерна.",
        "Самый прибыльный сегмент не выглядит жёстко закреплённым.",
        "Каналы приводят поток, но не все дают одинаково сильный результат.",
        "Часть обращений может теряться на этапе квалификации и доведения.",
      ],
      tags: ["Demand", "Segments", "Capacity", "Channels"],
      links: ["positioning", "product", "structure"],
      details: {
        summary:
          "Клиентский поток создаётся, но система пока не выглядит идеально настроенной на извлечение максимума из входящего спроса. Ограничение похоже не на отсутствие рынка, а на пропускную способность и фокус по сегментам.",
        strengths: [
          "У компании уже есть рабочие каналы привлечения.",
          "Рынок реагирует, то есть точка входа в спрос существует.",
          "Есть база для усиления конверсии без полного перезапуска маркетинга.",
        ],
        risks: [
          "Слабое разделение сегментов снижает эффективность усилий.",
          "Поток и capacity не синхронизированы.",
          "Часть лидов может быть слишком дорогой или плохо обрабатываться.",
        ],
        actions: [
          "Закрепить приоритетный сегмент как управленческую ось.",
          "Собрать карту: канал → тип лида → скорость обработки → сделка.",
          "Убрать перегруз на первом касании и квалификации.",
        ],
        metrics: [
          { label: "Flow Quality", value: "67/100" },
          { label: "Demand vs Capacity", value: "Unbalanced" },
          { label: "Channel Focus", value: "Blurred" },
        ],
      },
    },
    {
      id: "product",
      title: "Product & Sales",
      subtitle: "Offer mix, retention, CJM",
      icon: "◈",
      score: 79,
      status: "Strong leverage zone",
      shortPoints: [
        "Здесь, вероятно, лежит главный рычаг роста прибыли.",
        "Маржинальные решения есть, но они не доминируют в общей модели.",
        "CJM даёт ценность, но местами выглядит длиннее нужного.",
        "Повторная monetization может быть сильнее, чем сейчас.",
      ],
      tags: ["Offer", "CJM", "Retention", "Sales"],
      links: ["economics", "flow", "positioning"],
      details: {
        summary:
          "Продуктово-продажный блок выглядит самым перспективным для вмешательства: здесь можно усиливать и выручку, и маржу одновременно, не только за счёт большего числа лидов, но и через другой акцент в продаже и упаковке решений.",
        strengths: [
          "Есть база для выделения наиболее сильных офферов.",
          "Продажа уже опирается на понятную клиентскую ценность.",
          "Потенциал upsell / repeat / bundle выглядит реальным.",
        ],
        risks: [
          "Не самый маржинальный продукт может забирать слишком много внимания.",
          "Путь клиента может содержать лишние точки трения.",
          "Удержание может быть скорее ситуативным, чем системным.",
        ],
        actions: [
          "Выстроить продуктовый приоритет вокруг маржинального ядра.",
          "Упростить CJM там, где клиент уже готов двигаться дальше.",
          "Собрать механику повторной ценности после первого результата.",
        ],
        metrics: [
          { label: "Growth Lever", value: "Primary" },
          { label: "Offer Clarity", value: "Medium-High" },
          { label: "Retention Potential", value: "High" },
        ],
      },
    },
    {
      id: "positioning",
      title: "Positioning",
      subtitle: "Narrative, perception, geography",
      icon: "◌",
      score: 73,
      status: "Readable, but not sharp enough",
      shortPoints: [
        "Обещание считывается, но может быть недостаточно заострено.",
        "Не до конца ясно, какой сегмент должен реагировать первым.",
        "Рынок присутствия и рынок продаж стоит развести сильнее.",
        "Упаковка может недодавать ценность сильным решениям.",
      ],
      tags: ["Narrative", "Perception", "Market", "Segment"],
      links: ["flow", "product", "strategy"],
      details: {
        summary:
          "Позиционирование не выглядит слабым, но оно может быть слишком общим для того уровня роста, которого бизнес хочет добиться. Не хватает более жёсткого ответа на вопрос: кому именно это решение нужно в первую очередь и почему сейчас.",
        strengths: [
          "Образ компании уже существует и не выглядит хаотичным.",
          "Есть база для сильного B2B / expert framing.",
          "Можно усилить конверсию без смены сути продукта.",
        ],
        risks: [
          "Широкий образ размывает фокус на прибыльном сегменте.",
          "Клиент может не сразу считывать главный differentiator.",
          "География продаж и коммуникация могут жить в разной логике.",
        ],
        actions: [
          "Собрать одну ведущую формулу обещания.",
          "Привязать упаковку к самому прибыльному типу клиента.",
          "Усилить message hierarchy на первом экране и в продаже.",
        ],
        metrics: [
          { label: "Clarity", value: "73/100" },
          { label: "Segment Fit", value: "Needs sharpening" },
          { label: "Market Readiness", value: "Good" },
        ],
      },
    },
    {
      id: "structure",
      title: "Structure & Processes",
      subtitle: "Roles, overload, execution",
      icon: "▣",
      score: 62,
      status: "Execution bottleneck",
      shortPoints: [
        "Рост, вероятно, упирается в ручное управление и перегруз.",
        "Связки между ролями могут тормозить скорость изменений.",
        "Система не выглядит ещё полностью собранной под масштаб.",
        "Часть усилий команды может идти в компенсацию процессов.",
      ],
      tags: ["Team", "Execution", "Roles", "Overload"],
      links: ["flow", "analytics", "strategy"],
      details: {
        summary:
          "Структурно бизнес, вероятно, уже вышел из стадии, где всё можно тянуть вручную, но ещё не до конца перешёл в режим предсказуемой системы. Это создаёт ограничение для скорости и качества роста.",
        strengths: [
          "Команда уже выполняет ключевые функции.",
          "Есть операционная база для улучшений без полной перестройки.",
          "Рычаги роста понятны и могут быть распределены по ролям.",
        ],
        risks: [
          "Founder dependency может оставаться слишком высокой.",
          "Задержки между функциями бьют по конверсии и качеству решения.",
          "Рост объёма может усиливать хаос, а не результат.",
        ],
        actions: [
          "Определить критичные handoff points между ролями.",
          "Развести ownership по revenue-цепочке.",
          "Убрать ручные решения из повторяющихся сценариев.",
        ],
        metrics: [
          { label: "Scalability", value: "62/100" },
          { label: "Founder Load", value: "High" },
          { label: "Process Integrity", value: "Medium-Low" },
        ],
      },
    },
    {
      id: "analytics",
      title: "Analytics & Management",
      subtitle: "Visibility, decisions, control",
      icon: "▤",
      score: 69,
      status: "Enough to steer, not enough to scale confidently",
      shortPoints: [
        "Решения принимаются не вслепую, но и не на полном контуре данных.",
        "Улучшения уже делаются, однако не все замыкаются в контроль.",
        "Управление может опережать аналитическая глубина не всегда.",
        "Есть пространство для более жёсткой причинно-следственной модели.",
      ],
      tags: ["Analytics", "Control", "Management", "KPI"],
      links: ["economics", "structure", "strategy"],
      details: {
        summary:
          "Управление не выглядит хаотичным, но аналитическая глубина пока не всегда достаточна, чтобы уверенно выбирать, что масштабировать, что сокращать, а что перестраивать.",
        strengths: [
          "Есть привычка смотреть на метрики и улучшения.",
          "Команда уже предпринимает изменения, а не стоит на месте.",
          "Базовая опора для управленческой модели присутствует.",
        ],
        risks: [
          "Часть решений может приниматься по ощущению силы сигнала, а не по реальной экономике.",
          "Связка между цифрами, сегментом и действиями неполная.",
          "Можно усилить контроль без увеличения бюрократии.",
        ],
        actions: [
          "Свести ключевые сигналы в единый управленческий слой.",
          "Привязать решения к сегментам и unit-эффекту.",
          "Выделить 5–7 контрольных точек для weekly review.",
        ],
        metrics: [
          { label: "Control Layer", value: "69/100" },
          { label: "Decision Confidence", value: "Medium" },
          { label: "Signal Quality", value: "Improving" },
        ],
      },
    },
    {
      id: "strategy",
      title: "Strategy",
      subtitle: "Targets, direction, sequencing",
      icon: "✦",
      score: 76,
      status: "Good ambition, sequence needs discipline",
      shortPoints: [
        "Амбиция роста считывается и выглядит реалистично.",
        "Основной риск не в цели, а в последовательности действий.",
        "Часть инициатив может конкурировать между собой за ресурс.",
        "Нужен более жёсткий приоритетный порядок, а не параллельность.",
      ],
      tags: ["Priority", "Targets", "Roadmap", "Focus"],
      links: ["positioning", "structure", "analytics"],
      details: {
        summary:
          "Стратегически компания уже думает про следующий уровень, но для реального перехода нужно сократить расфокус и выстроить очередность: сначала что открывает рост, затем что закрепляет его, и только после — что масштабирует.",
        strengths: [
          "Есть горизонт и стремление к понятному результату.",
          "Бизнес не выглядит застрявшим в коротком операционном цикле.",
          "Можно быстро собрать сильный JTBD-приоритет.",
        ],
        risks: [
          "Параллельные инициативы могут растаскивать команду.",
          "Без sequencing даже хорошие гипотезы не дадут полного эффекта.",
          "Часть стратегических решений может не иметь операционной опоры.",
        ],
        actions: [
          "Определить один primary growth objective.",
          "Собрать приоритеты 1/2/3 по влиянию на выручку и прибыль.",
          "Увязать roadmap с ownership и контрольными точками.",
        ],
        metrics: [
          { label: "Strategic Readiness", value: "76/100" },
          { label: "Priority Discipline", value: "Needs tightening" },
          { label: "Execution Alignment", value: "Medium" },
        ],
      },
    },
  ],
};

const ICON_BY_ID: Record<string, string> = {
  economics: "◔",
  flow: "◎",
  clients_flow: "◎",
  clientsandflow: "◎",
  product: "◈",
  productsales: "◈",
  product_sales: "◈",
  positioning: "◌",
  structure: "▣",
  structure_processes: "▣",
  analytics: "▤",
  analytics_management: "▤",
  strategy: "✦",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clampScore(value: unknown, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n|•|- /g)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function humanizeTitle(value: string) {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeLinks(value: unknown): string[] {
  return toArray(value).map((item) => {
    const clean = item.toLowerCase().replace(/\s+/g, "_");
    if (clean.includes("client") && clean.includes("flow")) return "flow";
    if (clean.includes("product")) return "product";
    if (clean.includes("position")) return "positioning";
    if (clean.includes("structure")) return "structure";
    if (clean.includes("analytic")) return "analytics";
    if (clean.includes("strateg")) return "strategy";
    if (clean.includes("economic")) return "economics";
    return clean;
  });
}

function normalizeMetrics(value: unknown): MetricItem[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const entry = item as Record<string, unknown>;
        const label = String(entry.label ?? entry.name ?? "").trim();
        const rawValue = entry.value ?? entry.score ?? entry.text ?? "";
        const metricValue = String(rawValue).trim();
        if (!label || !metricValue) return null;
        return { label, value: metricValue };
      })
      .filter(Boolean) as MetricItem[];
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([label, metricValue]) => ({
        label: humanizeTitle(label),
        value: String(metricValue ?? "").trim(),
      }))
      .filter((item) => item.label && item.value);
  }

  return [];
}

function normalizeBlock(raw: unknown, index: number): InsightBlock {
  const fallback = FALLBACK_DATA.blocks[index] ?? FALLBACK_DATA.blocks[0];
  const item = (raw ?? {}) as Record<string, unknown>;
  const idSource = String(item.id ?? item.key ?? fallback.id).toLowerCase();
  const id =
    idSource
      .replace(/&/g, "and")
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "") || fallback.id;

  const detailsRaw = (item.details ?? item.inner ?? {}) as Record<string, unknown>;

  const shortPoints = toArray(
    item.shortPoints ?? item.points ?? item.preview_points ?? item.card_points,
  ).slice(0, 4);
  const tags = toArray(item.tags ?? item.relations ?? item.logic_tags);
  const links = normalizeLinks(
    item.links ?? item.connected_blocks ?? item.related_blocks,
  );
  const strengths = toArray(detailsRaw.strengths ?? item.strengths);
  const risks = toArray(detailsRaw.risks ?? item.risks ?? item.losses);
  const actions = toArray(
    detailsRaw.actions ?? item.actions ?? item.recommendations,
  );
  const metrics = normalizeMetrics(detailsRaw.metrics ?? item.metrics);

  return {
    id,
    title: String(item.title ?? item.name ?? fallback.title),
    subtitle: String(item.subtitle ?? item.description ?? fallback.subtitle),
    icon: String(item.icon ?? ICON_BY_ID[id] ?? fallback.icon),
    score: clampScore(item.score ?? item.rate ?? item.rating, fallback.score),
    status: String(item.status ?? item.label ?? fallback.status),
    shortPoints: shortPoints.length > 0 ? shortPoints : fallback.shortPoints,
    tags: tags.length > 0 ? tags : fallback.tags,
    links: links.length > 0 ? links : fallback.links,
    details: {
      summary: String(
        detailsRaw.summary ?? item.summary ?? fallback.details.summary,
      ),
      strengths: strengths.length > 0 ? strengths : fallback.details.strengths,
      risks: risks.length > 0 ? risks : fallback.details.risks,
      actions: actions.length > 0 ? actions : fallback.details.actions,
      metrics: metrics.length > 0 ? metrics : fallback.details.metrics,
    },
  };
}

function normalizePayload(raw: unknown): ResultsPayload {
  const base =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const payload = (base.data && typeof base.data === "object"
    ? (base.data as Record<string, unknown>)
    : base) as Record<string, unknown>;

  const companyRaw = (payload.company ??
    payload.hero ??
    payload.summary ??
    {}) as Record<string, unknown>;

  const blocksRaw = Array.isArray(payload.blocks)
    ? payload.blocks
    : Array.isArray(payload.cards)
      ? payload.cards
      : Array.isArray(payload.sections)
        ? payload.sections
        : FALLBACK_DATA.blocks;

  const solutionRaw = (payload.solution ??
    payload.solutions ??
    {}) as Record<string, unknown>;

  return {
    company: {
      name: String(
        companyRaw.name ??
          companyRaw.company_name ??
          payload.company_name ??
          FALLBACK_DATA.company.name,
      ),
      project: String(
        companyRaw.project ?? payload.project ?? FALLBACK_DATA.company.project,
      ),
      summary: String(
        companyRaw.summary ??
          companyRaw.short_summary ??
          payload.summary ??
          FALLBACK_DATA.company.summary,
      ),
      executive: String(
        companyRaw.executive ??
          companyRaw.executive_summary ??
          payload.executive_summary ??
          FALLBACK_DATA.company.executive,
      ),
      score: clampScore(
        companyRaw.score ?? companyRaw.overall_score ?? payload.overall_score,
        FALLBACK_DATA.company.score,
      ),
      maturity: String(
        companyRaw.maturity ??
          companyRaw.model_label ??
          payload.model_label ??
          FALLBACK_DATA.company.maturity,
      ),
      horizon: String(
        companyRaw.horizon ??
          companyRaw.primary_horizon ??
          payload.primary_horizon ??
          FALLBACK_DATA.company.horizon,
      ),
      expires: String(
        companyRaw.expires ??
          companyRaw.expiration_date ??
          payload.expiration_date ??
          FALLBACK_DATA.company.expires,
      ),
      resultLabel: String(
        companyRaw.resultLabel ??
          companyRaw.result_label ??
          payload.result_label ??
          FALLBACK_DATA.company.resultLabel,
      ),
    },
    solution: {
      title: String(
        solutionRaw.title ?? FALLBACK_DATA.solution?.title ?? "Solutions & Practice",
      ),
      subtitle: String(
        solutionRaw.subtitle ??
          solutionRaw.summary ??
          FALLBACK_DATA.solution?.subtitle ??
          "Placeholder layer ready for later content",
      ),
      sections:
        toArray(solutionRaw.sections ?? solutionRaw.items).length > 0
          ? toArray(solutionRaw.sections ?? solutionRaw.items)
          : FALLBACK_DATA.solution?.sections ?? [],
    },
    blocks: blocksRaw.map((block, index) => normalizeBlock(block, index)),
  };
}

function formatDateInCET(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "CET",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function normalizeSlotsPayload(raw: unknown): SlotItem[] {
  const base =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const payload = (base.data && typeof base.data === "object"
    ? (base.data as Record<string, unknown>)
    : base) as Record<string, unknown>;

  const sourceArray = Array.isArray(payload.slots)
    ? payload.slots
    : Array.isArray(payload.items)
      ? payload.items
      : Array.isArray(payload.options)
        ? payload.options
        : Array.isArray(payload.data)
          ? payload.data
          : [];

  return sourceArray
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          id: `slot-${index + 1}`,
          label: `${formatDateInCET(item)} CET`,
          iso: item,
        };
      }

      if (!item || typeof item !== "object") return null;
      const entry = item as Record<string, unknown>;
      const iso = String(
        entry.iso ?? entry.datetime ?? entry.date ?? entry.start ?? "",
      ).trim();
      const label =
        String(entry.label ?? entry.text ?? "").trim() ||
        (iso ? formatDateInCET(iso) : "");

      if (!label) return null;

      return {
        id: String(entry.id ?? `slot-${index + 1}`),
        label: label.includes("CET") ? label : `${label} CET`,
        iso: iso || undefined,
      };
    })
    .filter(Boolean)
    .slice(0, 4) as SlotItem[];
}

function Ring({ progress, size = 104 }: { progress: number; size?: number }) {
  const radius = 44;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88" className="-rotate-90">
        <defs>
          <linearGradient id={`grad-${size}-${progress}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#47adff" />
            <stop offset="55%" stopColor="#7e84ff" />
            <stop offset="100%" stopColor="#f7d237" />
          </linearGradient>
        </defs>
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke={`url(#grad-${size}-${progress})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: "drop-shadow(0 0 10px rgba(90,146,255,0.25))",
            transition: "all 420ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[28px] font-semibold leading-none text-white">{progress}</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-white/45">
          score
        </div>
      </div>
    </div>
  );
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
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl",
        className,
      )}
      style={{
        boxShadow:
          "0 18px 70px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.045)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(71,173,255,0.10),transparent_28%),radial-gradient(circle_at_70%_20%,rgba(247,210,55,0.07),transparent_22%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function TiltButton({
  children,
  onClick,
  highlight,
}: {
  children: React.ReactNode;
  onClick: () => void;
  highlight?: boolean;
}) {
  const [style, setStyle] = useState({
    transform:
      "perspective(1600px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
  });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 8;

    setStyle({
      transform: `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.004)`,
    });
  }

  function reset() {
    setStyle({
      transform:
        "perspective(1600px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className={cn(
        "group block w-full text-left transition-[filter] duration-300",
        highlight && "drop-shadow-[0_0_24px_rgba(247,210,55,0.12)]",
      )}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transition:
          "transform 220ms cubic-bezier(0.22,1,0.36,1), filter 220ms ease",
      }}
    >
      {children}
    </button>
  );
}

function RelationPills({
  block,
  onTagClick,
  onBlockJump,
  activeTag,
  allBlocks,
}: {
  block: InsightBlock;
  onTagClick: (tag: string) => void;
  onBlockJump: (id: string) => void;
  activeTag: string | null;
  allBlocks: InsightBlock[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {block.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition",
              activeTag === tag
                ? "border-[#f7d237]/35 bg-[#f7d237]/12 text-[#fff1a1]"
                : "border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/[0.07]",
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {block.links.map((linkId) => {
          const target = allBlocks.find((item) => item.id === linkId);
          if (!target) return null;

          return (
            <button
              key={linkId}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBlockJump(linkId);
              }}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/16"
            >
              ↗ {target.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  const params = useParams<{ token: string }>();
  const token = typeof params?.token === "string" ? params.token : "";

  const [data, setData] = useState<ResultsPayload>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [slotsOpen, setSlotsOpen] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotItem[]>([]);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      setLoading(true);
      setFetchError(null);

      try {
        const response = await fetch(RESULTS_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "vercel_results_page",
            page: "results",
            token,
          }),
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Webhook responded with ${response.status}`);
        }

        const responseText = await response.text();
        let parsed: unknown = {};

        try {
          parsed = JSON.parse(responseText);
        } catch {
          parsed = { summary: responseText };
        }

        if (!isMounted) return;
        setData(normalizePayload(parsed));
      } catch (error) {
        if (!isMounted) return;
        setFetchError(error instanceof Error ? error.message : "Unknown error");
        setData(FALLBACK_DATA);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (token) {
      void loadResults();
    } else {
      setLoading(false);
      setFetchError("Token not found in route.");
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  async function openSlotsPopup() {
    setSlotsOpen(true);
    setSlotsLoading(true);
    setSlotsError(null);

    try {
      const response = await fetch(SLOTS_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "results_decompose",
          token,
          timezone: "CET",
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Slots webhook responded with ${response.status}`);
      }

      const responseText = await response.text();
      let parsed: unknown = {};

      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = { slots: [responseText] };
      }

      setSlots(normalizeSlotsPayload(parsed));
    } catch (error) {
      setSlots([]);
      setSlotsError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setSlotsLoading(false);
    }
  }

  const relatedCards = useMemo(() => {
    if (!activeTag) return new Set<string>();
    return new Set(
      data.blocks
        .filter((block) => block.tags.includes(activeTag))
        .map((block) => block.id),
    );
  }, [activeTag, data.blocks]);

  function jumpToCard(id: string) {
    const el = cardRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setActivePanel({ type: "block", id }), 220);
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActivePanel(null);
        setSlotsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeBlock =
    activePanel?.type === "block"
      ? data.blocks.find((block) => block.id === activePanel.id) ?? null
      : null;

  const allTags = [...new Set(data.blocks.flatMap((block) => block.tags))];
  const profileHref = token ? `/account/${token}` : "/account";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06142a] text-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #06142a;
        }

        @keyframes floatA {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(30px, -20px, 0) scale(1.05); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes floatB {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-40px, 30px, 0) scale(1.08); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes floatC {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, 20px, 0) scale(0.98); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateX(42px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes overlayIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(6px);
          }
        }

        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-[10%] top-[-5%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(95,149,255,0.22),transparent_62%)] blur-3xl"
          style={{ animation: "floatA 20s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-10%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(247,210,55,0.13),transparent_62%)] blur-3xl"
          style={{ animation: "floatB 24s ease-in-out infinite" }}
        />
        <div
          className="absolute left-[20%] bottom-[-10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(190,118,255,0.12),transparent_62%)] blur-3xl"
          style={{ animation: "floatC 22s ease-in-out infinite" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,25,0.18),rgba(4,12,25,0.4))]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-[1520px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <img src="/logo.svg" alt="growth avenue" className="h-10 w-auto md:h-12" />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openSlotsPopup}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/[0.07]"
            >
              Decompose
            </button>
            <a
              href={profileHref}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/[0.07]"
            >
              Profile
            </a>
          </div>
        </header>

        <div className="mb-5 flex flex-wrap gap-3">
          <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
            Snapshot status
          </div>
          <div className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff1a1]">
            {loading ? "Loading" : data.company.resultLabel}
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70">
            Result page assembled
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70">
            Key growth zone found
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70">
            Cross-block links available
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          <GlassCard className="p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/42">
                  <span className="text-[#f7d237]">●</span>
                  {data.company.project}
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-white/55">
                    {data.company.horizon}
                  </span>
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-[0.96] text-[#fefefe] md:text-6xl xl:text-[72px]">
                  {data.company.name}
                </h1>

                <p className="mt-5 max-w-4xl text-lg leading-8 text-[#d8dde7] md:text-[22px] md:leading-9">
                  {loading
                    ? "Собираем итоговую выдачу по блокам и связям между ними..."
                    : data.company.summary}
                </p>

                <p className="mt-5 max-w-4xl text-sm leading-7 text-[#a5aeb2] md:text-base">
                  {loading
                    ? "Webhook response is loading from Make."
                    : data.company.executive}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="rounded-full border border-[#f7d237]/22 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff1a1]">
                    Executive Summary
                  </div>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                    {data.company.maturity}
                  </div>
                  {fetchError && (
                    <div className="rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm text-rose-100">
                      fallback mode
                    </div>
                  )}
                </div>
              </div>

              <div className="relative min-h-[280px]">
                <div className="absolute right-0 top-0 flex flex-col items-end gap-6 text-right">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Overall score
                    </div>
                    <div className="mt-3 flex items-center justify-end">
                      <Ring progress={data.company.score} size={148} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Expiration
                    </div>
                    <div className="mt-2 text-2xl font-semibold leading-tight text-white">
                      {data.company.expires}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <TiltButton onClick={() => setActivePanel({ type: "solution" })}>
            <GlassCard className="h-full min-h-[320px] p-6 md:p-7">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white/45">
                      {data.solution?.title ?? "Solutions & Practice"}
                    </div>
                    <div className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff1a1]">
                      open full view
                    </div>
                  </div>

                  <div className="mt-8 max-w-md text-3xl font-semibold leading-tight text-white md:text-[42px]">
                    Main follow-up layer for transformation and implementation
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
                    {data.solution?.subtitle ??
                      "Здесь откроется отдельный полноэкранный слой справа. Пока это каркас под будущий Solution & Practice."}
                  </p>
                </div>

                <div className="mt-8 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(71,173,255,0.18),rgba(189,95,234,0.16),rgba(247,210,55,0.12))] p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                    What will live here
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                    {(data.solution?.sections ?? []).map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </TiltButton>
        </section>

        <section className="mt-8">
          <GlassCard className="p-5 md:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="text-[12px] uppercase tracking-[0.24em] text-[#f7d237]">
                  Cross-block logic
                </div>
                <h2 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
                  How the blocks interact
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58 md:text-base">
                  Нажмите на тег, чтобы подсветить связанные карточки. Так можно
                  быстро увидеть, где один вывод влияет на соседние блоки.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setActiveTag((prev) => (prev === tag ? null : tag))
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition",
                      activeTag === tag
                        ? "border-[#f7d237]/35 bg-[#f7d237]/12 text-[#fff1a1] shadow-[0_0_18px_rgba(247,210,55,0.12)]"
                        : "border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/[0.07]",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {loading ? (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <GlassCard key={index} className="h-[430px] p-5 md:p-6">
                <div
                  className="h-full animate-pulse rounded-[24px] bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04))] bg-[length:200%_100%]"
                  style={{ animation: "shimmer 1.8s linear infinite" }}
                />
              </GlassCard>
            ))}
          </section>
        ) : (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data.blocks.map((block, index) => {
              const highlighted = !activeTag || relatedCards.has(block.id);
              const dimmed = !!activeTag && !relatedCards.has(block.id);

              return (
                <div
                  key={block.id}
                  ref={(el) => {
                    cardRefs.current[block.id] = el;
                  }}
                  className={cn(
                    "transition duration-300",
                    dimmed && "opacity-45 saturate-[0.8]",
                  )}
                >
                  <TiltButton
                    onClick={() =>
                      setActivePanel({ type: "block", id: block.id })
                    }
                    highlight={highlighted}
                  >
                    <GlassCard className="h-full p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-[#f7d237] shadow-[0_0_24px_rgba(247,210,55,0.08)]">
                          {block.icon}
                        </div>
                        <Ring progress={block.score} size={82} />
                      </div>

                      <div className="mt-6">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/32">
                          Block {index + 1}
                        </div>
                        <div className="mt-2 text-[32px] font-semibold leading-[1.02] text-[#fefefe]">
                          {block.title}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-[#a5aeb2]">
                          {block.subtitle}
                        </div>
                        <div className="mt-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-cyan-100">
                          {block.status}
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {block.shortPoints.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="flex items-start gap-3 text-sm leading-7 text-white/70"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7d237]" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 border-t border-white/8 pt-4">
                        <RelationPills
                          block={block}
                          onTagClick={setActiveTag}
                          onBlockJump={jumpToCard}
                          activeTag={activeTag}
                          allBlocks={data.blocks}
                        />
                      </div>

                      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm transition duration-300 group-hover:border-[#f7d237]/20 group-hover:bg-[#f7d237]/[0.04]">
                        <span className="text-white/55">Открыть выводы</span>
                        <div className="flex items-center gap-2 text-[#f7d237]">
                          <span>{block.score}</span>
                          <span>→</span>
                        </div>
                      </div>
                    </GlassCard>
                  </TiltButton>
                </div>
              );
            })}
          </section>
        )}
      </div>

      {slotsOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
            style={{ animation: "overlayIn 280ms cubic-bezier(0.22,1,0.36,1)" }}
            onClick={() => setSlotsOpen(false)}
          />

          <div
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-32px)] max-w-[760px] -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "popupIn 320ms cubic-bezier(0.22,1,0.36,1)" }}
          >
            <GlassCard className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                    Decompose
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                    ближайшие свободные слоты
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    Показываем ближайшие 4 свободных слота. Время отображается в CET.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSlotsOpen(false)}
                  className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Закрыть
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {slotsLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="min-h-[110px] animate-pulse rounded-[24px] border border-white/10 bg-white/[0.04]"
                    />
                  ))
                ) : slotsError ? (
                  <div className="md:col-span-2 rounded-[24px] border border-rose-300/20 bg-rose-400/10 p-5 text-sm leading-7 text-rose-100">
                    Не удалось загрузить слоты. {slotsError}
                  </div>
                ) : slots.length > 0 ? (
                  slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        CET slot
                      </div>
                      <div className="mt-4 text-2xl font-semibold text-white">
                        {slot.label}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/65">
                    Свободные слоты пока не пришли из webhook.
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </>
      )}

      {activePanel && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            style={{ animation: "overlayIn 280ms cubic-bezier(0.22,1,0.36,1)" }}
            onClick={() => setActivePanel(null)}
          />

          <div
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-[980px] overflow-y-auto border-l border-white/10 bg-[#08162df2] backdrop-blur-3xl"
            style={{ animation: "panelIn 420ms cubic-bezier(0.22,1,0.36,1)" }}
          >
            <div className="sticky top-0 z-10 border-b border-white/8 bg-[#08162dd9] px-5 py-4 backdrop-blur-2xl md:px-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                    {activePanel.type === "solution"
                      ? "full-screen layer"
                      : "insight block"}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[#fefefe] md:text-3xl">
                    {activePanel.type === "solution"
                      ? data.solution?.title ?? "Solutions & Practice"
                      : activeBlock?.title}
                  </div>
                  <div className="mt-1 text-sm text-[#a5aeb2]">
                    {activePanel.type === "solution"
                      ? data.solution?.subtitle ??
                        "Placeholder layer ready for later content"
                      : activeBlock?.subtitle}
                  </div>
                </div>

                <button
                  onClick={() => setActivePanel(null)}
                  className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Закрыть
                </button>
              </div>
            </div>

            {activePanel.type === "solution" ? (
              <div className="space-y-5 px-5 py-5 md:px-7 md:py-7">
                <GlassCard className="p-6 md:p-7">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                    Structure placeholder
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                    {data.solution?.title ?? "Solution & Practice will live here"}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 md:text-base">
                    {data.solution?.subtitle ??
                      "Этот слой уже подключён как отдельная полноэкранная плоскость справа. Его можно будет наполнить позже блоками Primary Growth Lever, Revenue Loss Source, Model Change Recommendation, Strategic Priority, Business Impact, Implementation Conditions и дальнейшей JTBD-логикой."}
                  </p>
                </GlassCard>

                <div className="grid gap-5 md:grid-cols-2">
                  {(data.solution?.sections ?? []).map((item) => (
                    <GlassCard key={item} className="min-h-[180px] p-5">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Future section
                      </div>
                      <div className="mt-4 text-2xl font-semibold text-white">
                        {item}
                      </div>
                      <div className="mt-4 text-sm leading-7 text-white/50">
                        Empty placeholder card for later prompt-driven content.
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            ) : activeBlock ? (
              <div className="space-y-5 px-5 py-5 md:px-7 md:py-7">
                <GlassCard className="p-6 md:p-7">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                        Summary
                      </div>
                      <h3 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                        {activeBlock.status}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
                        {activeBlock.details.summary}
                      </p>
                    </div>
                    <Ring progress={activeBlock.score} size={150} />
                  </div>
                </GlassCard>

                <div className="grid gap-5 md:grid-cols-3">
                  {activeBlock.details.metrics.map((metric) => (
                    <GlassCard key={metric.label} className="p-5">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        {metric.label}
                      </div>
                      <div className="mt-4 text-3xl font-semibold text-white">
                        {metric.value}
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                  <GlassCard className="p-5 md:p-6">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                      Strengths
                    </div>
                    <div className="mt-5 space-y-3">
                      {activeBlock.details.strengths.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-sm leading-7 text-white/75"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 md:p-6">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                      Risks
                    </div>
                    <div className="mt-5 space-y-3">
                      {activeBlock.details.risks.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-sm leading-7 text-white/75"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7d237]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 md:p-6">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                      Priority actions
                    </div>
                    <div className="mt-5 space-y-3">
                      {activeBlock.details.actions.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-sm leading-7 text-white/75"
                        >
                          <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/55">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                <GlassCard className="p-5 md:p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                    Cross-links
                  </div>
                  <div className="mt-5">
                    <RelationPills
                      block={activeBlock}
                      onTagClick={(tag) => {
                        setActiveTag(tag);
                        setActivePanel(null);
                        setTimeout(() => jumpToCard(activeBlock.id), 120);
                      }}
                      onBlockJump={(id) => {
                        setActivePanel(null);
                        setTimeout(() => jumpToCard(id), 120);
                      }}
                      activeTag={activeTag}
                      allBlocks={data.blocks}
                    />
                  </div>
                </GlassCard>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
