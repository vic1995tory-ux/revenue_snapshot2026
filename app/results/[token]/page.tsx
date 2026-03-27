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

Need output corrected full code likely based on uploaded current file. We can ignore citations. Need fix error. We know actual current file has old useSearchParams, imported next/navigation. But user's pasted text had mixed code, yet canmore latest state shows current canvas file has old useSearchParams. Need produce final corrected full code. To keep manageable, maybe not include entire fallback data? But asked full code. We need include full code. Use useParams, Decompose/Profile, logo.svg, status flags, hero layout, slot popup. Must be syntactically valid. Let's craft from prior improved code but using useParams. Need ensure no client exception. Avoid use(params) and use(window). Use useParams robustly. Need import useParams. Could use const params = useParams<{token:string}>(); const token = typeof params?.token==='string'?params.token:''.

Need maybe type for React.ReactNode with jsx transform doesn't need import React. Fine.

Need maybe profile route "cabinet-login" not sure but user asked comparable with token current page. Use /account/${token}; mention adjust if LK path differs. But code okay.

Let's provide concise preface.
