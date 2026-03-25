'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type StatusTone = 'stable' | 'watch' | 'priority';
type PanelKey =
  | 'solution'
  | 'economic'
  | 'clients'
  | 'product'
  | 'sales'
  | 'positioning'
  | 'structure'
  | 'analytics'
  | 'strategy'
  | null;

type LeverSim = {
  key: string;
  label: string;
  deltaLabel: string;
  why: string;
  min: number;
  max: number;
  step: number;
  unit: '%' | 'x';
  current: number;
  ceilingNote: string;
  base: {
    revenue: number;
    opex: number;
    cogs: number;
    grossProfit: number;
    leads: number;
    deals: number;
    aov: number;
    margin: number;
  };
  project: (v: number) => {
    revenue: number;
    opex: number;
    cogs: number;
    grossProfit: number;
    leads: number;
    deals: number;
    aov: number;
    margin: number;
    explanation: string;
  };
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function pctDelta(a: number, b: number) {
  if (!a) return '0%';
  const d = ((b - a) / a) * 100;
  const sign = d > 0 ? '+' : '';
  return `${sign}${Math.round(d)}%`;
}

function toneClass(tone: StatusTone) {
  if (tone === 'priority') return 'bg-amber-400/15 text-amber-200 border-amber-300/25';
  if (tone === 'watch') return 'bg-violet-400/15 text-violet-200 border-violet-300/25';
  return 'bg-emerald-400/15 text-emerald-200 border-emerald-300/25';
}

const sectionCards: {
  key: Exclude<PanelKey, 'solution' | null>;
  title: string;
  short: string;
  score: string;
  status: StatusTone;
  points: string[];
  detail: string;
}[] = [
  {
    key: 'economic',
    title: 'Economic Rate',
    short: 'Экономика держится, но прибыльность ограничена неравномерной нагрузкой и структурой дохода.',
    score: '0.5',
    status: 'watch',
    points: ['Тип потерь: conversion + structure', 'Главный разрыв: спрос приходит быстрее, чем перерабатывается', 'Pressure: margin'],
    detail:
      'Блок раскрывает, где именно модель теряет деньги: в недообработанном спросе, слабой конверсии или структуре маржи. На карточке оставляем короткий вывод, а вся расшифровка открывается в правом окне.',
  },
  {
    key: 'clients',
    title: 'Clients & Flow',
    short: 'Поток есть, но часть лидов не доходит до обработки и квалификации.',
    score: '0.7',
    status: 'priority',
    points: ['Сегмент перегрет', 'Capacity ниже входящего потока', 'Потери в качестве входящего потока'],
    detail:
      'Внутри панели показываем, где именно теряется входящий поток: источник, распределение, capacity gap и качество сегмента.',
  },
  {
    key: 'product',
    title: 'Product',
    short: 'Маржинальность продукта нормальная, но роль апселла и упаковки используется слабо.',
    score: '0.4',
    status: 'watch',
    points: ['Margin stable', 'Upsell low', 'Повторные продажи не оформлены в систему'],
    detail:
      'Этот блок должен показывать, за счёт чего держится маржа, какие продукты тянут прибыль и где можно усилить вклад нового продукта.',
  },
  {
    key: 'sales',
    title: 'Sales',
    short: 'Продажи недобирают из-за слабого перевода интереса в сделку и слабого усиления AOV.',
    score: '0.8',
    status: 'priority',
    points: ['Conversion below target', 'AOV leverage underused', 'Pipeline uneven'],
    detail:
      'Здесь должны быть выводы по CJM, скорости сделки, месту потерь на этапах и влиянию продаж на итоговую выручку.',
  },
  {
    key: 'positioning',
    title: 'Positioning',
    short: 'Ценность считывается, но не монетизируется в цене и аргументации.',
    score: '0.3',
    status: 'stable',
    points: ['Core promise exists', 'Price logic weak', 'Differentiation partially visible'],
    detail:
      'Показываем, как рынок воспринимает компанию, где есть разрыв между восприятием и ценой, и как это влияет на продажи.',
  },
  {
    key: 'structure',
    title: 'Structure & Processes',
    short: 'Команда перегружена в точках принятия решений и передачи клиента между ролями.',
    score: '0.6',
    status: 'watch',
    points: ['Founder overload', 'Handoffs slow', 'Responsibility blurred'],
    detail:
      'Здесь раскрываем перегруз, роли, decision-making и где именно процессы тормозят рост.',
  },
  {
    key: 'analytics',
    title: 'Analytics & Management',
    short: 'Аналитика есть частично, но решения принимаются без полной картины по экономике и сегментам.',
    score: '0.5',
    status: 'watch',
    points: ['Blind spots in metrics', 'No systematic market layer', 'Management sees symptoms first'],
    detail:
      'Блок описывает, что измеряется, чего не хватает в данных и почему это влияет на скорость решений.',
  },
  {
    key: 'strategy',
    title: 'Strategy',
    short: 'Цели есть, но в текущем виде не до конца связаны с главным ограничением модели.',
    score: '0.9',
    status: 'priority',
    points: ['Need tighter 3/6/12 horizon', 'Target does not fully reflect bottleneck', 'Execution order matters'],
    detail:
      'Здесь важно показать реализм горизонтов и как стратегия должна быть перестроена вокруг основного ограничения.',
  },
];

const levers: LeverSim[] = [
  {
    key: 'aov',
    label: 'Средний чек',
    deltaLabel: '+рост среднего заказа',
    why: 'Рост среднего чека упирается не только в цену, а в упаковку предложения, bundle-логику и допродажи. Выше +20% без пересборки оффера рост становится малореалистичным.',
    min: 0,
    max: 20,
    step: 1,
    unit: '%',
    current: 12,
    ceilingNote: 'Выше +20% без новой упаковки и доп. продукта рост становится малореалистичным.',
    base: { revenue: 13000, opex: 3300, cogs: 3900, grossProfit: 5800, leads: 10, deals: 2.0, aov: 3200, margin: 44 },
    project: (v) => {
      const lift = 1 + v / 100;
      const revenue = Math.round(13000 * lift);
      const opex = 3300;
      const cogs = Math.round(3900 * (1 + v / 140));
      const grossProfit = revenue - opex - cogs;
      const aov = Math.round(3200 * lift);
      const margin = Math.round((grossProfit / revenue) * 100);
      return {
        revenue,
        opex,
        cogs,
        grossProfit,
        leads: 10,
        deals: 2.0,
        aov,
        margin,
        explanation: 'Рост опирается на bundle, допродажи и более дорогую упаковку входного предложения.',
      };
    },
  },
  {
    key: 'marketing',
    label: 'Маркетинг',
    deltaLabel: '+рост входящего потока',
    why: 'Дополнительный маркетинговый бюджет имеет смысл только пока команда способна переработать входящий поток. Без capacity-изменений рост быстро упирается в обработку.',
    min: 0,
    max: 30,
    step: 1,
    unit: '%',
    current: 15,
    ceilingNote: 'Выше +30% лидов без расширения capacity часть спроса снова будет теряться.',
    base: { revenue: 13000, opex: 3500, cogs: 3900, grossProfit: 5600, leads: 10, deals: 2.0, aov: 3200, margin: 40 },
    project: (v) => {
      const leadLift = 1 + v / 100;
      const leads = Number((10 * leadLift).toFixed(1));
      const deals = Number((2.0 * (1 + v / 125)).toFixed(1));
      const revenue = Math.round(13000 * (1 + v / 80));
      const opex = Math.round(3500 * (1 + v / 120));
      const cogs = Math.round(3900 * (1 + v / 110));
      const grossProfit = revenue - opex - cogs;
      const margin = Math.round((grossProfit / revenue) * 100);
      return {
        revenue,
        opex,
        cogs,
        grossProfit,
        leads,
        deals,
        aov: 3200,
        margin,
        explanation: 'Эффект строится на росте лидов и небольшом подъёме числа сделок, но зависит от capacity и качества потока.',
      };
    },
  },
  {
    key: 'pricing',
    label: 'Повышение цены',
    deltaLabel: '+повышение цены и аргументации',
    why: 'Поднимать цену можно только пока ценность воспринимается и не рушится конверсия. Поэтому диапазон ограничен и требует поддержки позиционированием.',
    min: 0,
    max: 15,
    step: 1,
    unit: '%',
    current: 8,
    ceilingNote: 'Выше +15% без усиления позиционирования и кейсов растёт риск потери конверсии.',
    base: { revenue: 13000, opex: 3300, cogs: 3900, grossProfit: 5800, leads: 10, deals: 2.0, aov: 3200, margin: 44 },
    project: (v) => {
      const revenue = Math.round(13000 * (1 + v / 100) * (1 - v / 500));
      const opex = 3300;
      const cogs = 3900;
      const grossProfit = revenue - opex - cogs;
      const margin = Math.round((grossProfit / revenue) * 100);
      return {
        revenue,
        opex,
        cogs,
        grossProfit,
        leads: 10,
        deals: Number((2.0 * (1 - v / 180)).toFixed(1)),
        aov: Math.round(3200 * (1 + v / 100)),
        margin,
        explanation: 'Эффект опирается на пересборку ценовой аргументации, а не просто на механическое поднятие цены.',
      };
    },
  },
  {
    key: 'costs',
    label: 'Модель расходов',
    deltaLabel: '−давление на OPEX',
    why: 'Снижать расходы имеет смысл только там, где не режется производственная способность и качество результата.',
    min: 0,
    max: 18,
    step: 1,
    unit: '%',
    current: 10,
    ceilingNote: 'Выше −18% OPEX уже есть риск повредить delivery и качество обработки клиентов.',
    base: { revenue: 13000, opex: 3500, cogs: 3900, grossProfit: 5600, leads: 10, deals: 2.0, aov: 3200, margin: 40 },
    project: (v) => {
      const revenue = 13000;
      const opex = Math.round(3500 * (1 - v / 100));
      const cogs = 3900;
      const grossProfit = revenue - opex - cogs;
      const margin = Math.round((grossProfit / revenue) * 100);
      return {
        revenue,
        opex,
        cogs,
        grossProfit,
        leads: 10,
        deals: 2.0,
        aov: 3200,
        margin,
        explanation: 'Рычаг работает через сокращение неключевого OPEX, перераспределение нагрузки и выравнивание операционной модели.',
      };
    },
  },
];

export default function ResultsPage() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);

  return (
    <main className="min-h-screen bg-[#07152d] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,210,55,0.08),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(92,115,255,0.12),transparent_24%),linear-gradient(180deg,#07152d_0%,#081830_48%,#0a1d3a_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 pb-20 pt-8 md:px-8">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_390px]">
          <div className="rounded-[34px] border border-white/10 bg-[#081327]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
                  Revenue Snapshot · Diagnostic Output
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-[2.45rem]">
                  Стратегическая диагностика модели роста
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65 md:text-[15px]">
                  Черновой executive-output: главные ограничения, рычаги роста и приоритетная практика на горизонте 6 месяцев.
                </p>
              </div>

              <div className="grid min-w-[290px] grid-cols-2 gap-3">
                <MiniStat label="Economic rate" value="0.5" sub="watch" />
                <MiniStat label="Main growth limit" value="0.8" sub="priority" />
                <MiniStat label="Priority horizon" value="6M" sub="active" />
                <MiniStat label="Status" value="Stable" sub="reviewed" />
              </div>
            </div>

            <HeroEconomyChart />
          </div>

          <SolutionEntryCard onOpen={() => setActivePanel('solution')} />
        </section>

        <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sectionCards.map((card) => (
            <SummaryCard key={card.key} card={card} onOpen={() => setActivePanel(card.key)} />
          ))}
        </section>

        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">Decoding session</div>
              <h3 className="mt-2 text-2xl font-semibold">Назначить встречу и выбрать слот</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
                После диагностики можно забронировать короткую сессию, чтобы пройтись по решениям, рискам и очередности действий.
              </p>
            </div>
            <button className="rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-semibold text-[#0b1d3a] transition hover:translate-y-[-1px]">
              Выбрать слот
            </button>
          </div>
        </section>
      </div>

      <RightDrawer activePanel={activePanel} onClose={() => setActivePanel(null)} />
    </main>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">{label}</div>
      <div className="mt-2 text-[28px] font-semibold text-white">{value}</div>
      <div className="text-xs text-white/45">{sub}</div>
    </div>
  );
}

function SummaryCard({
  card,
  onOpen,
}: {
  card: (typeof sectionCards)[number];
  onOpen: () => void;
}) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">Section</div>
          <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
        </div>
        <div className={`rounded-full border px-3 py-1 text-xs ${toneClass(card.status)}`}>{card.status}</div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">Score</div>
          <div className="mt-1 text-[34px] font-semibold text-white">{card.score}</div>
        </div>
        <button onClick={onOpen} className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/90 transition hover:bg-white/[0.1]">
          Open
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/68">{card.short}</p>

      <div className="mt-4 space-y-2">
        {card.points.map((point) => (
          <div key={point} className="rounded-2xl border border-white/8 bg-black/15 px-3 py-2 text-sm text-white/72">
            {point}
          </div>
        ))}
      </div>
    </article>
  );
}

function SolutionEntryCard({ onOpen }: { onOpen: () => void }) {
  return (
    <aside className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(247,210,55,0.12),rgba(255,255,255,0.03))] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="inline-flex rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-[#f7d237]">
        Solution & Practice
      </div>
      <h2 className="mt-4 text-[30px] font-semibold leading-[1.06] text-white">
        Главный фокус — рост AOV, перераспределение спроса и управляемое усиление воронки.
      </h2>
      <p className="mt-4 text-sm leading-6 text-white/72">
        Внутри: solution, practice, JTBD roadmap и инструмент, который показывает влияние вычисленных рычагов на выручку и gross profit.
      </p>

      <div className="mt-5 grid gap-3">
        <MetricLine label="Main lever" value="AOV + pricing logic" />
        <MetricLine label="Expected horizon" value="0–6 months" />
        <MetricLine label="Primary impact" value="+ revenue / + gross profit" />
      </div>

      <button
        onClick={onOpen}
        className="mt-6 w-full rounded-[22px] bg-[#f7d237] px-4 py-3 text-sm font-semibold text-[#0b1d3a] transition hover:translate-y-[-1px]"
      >
        Open Solution & Practice
      </button>
    </aside>
  );
}

function MetricLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm">
      <span className="text-white/58">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function RightDrawer({
  activePanel,
  onClose,
}: {
  activePanel: PanelKey;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${activePanel ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!activePanel}
    >
      <div
        className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${activePanel ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-[760px] transform border-l border-white/10 bg-[#08152b]/96 p-6 shadow-[-30px_0_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-transform duration-300 md:p-8 ${
          activePanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">Detail view</div>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {activePanel === 'solution'
                ? 'Solution & Practice'
                : sectionCards.find((item) => item.key === activePanel)?.title ?? ''}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/75"
          >
            Close
          </button>
        </div>

        <div className="mt-6 h-[calc(100%-88px)] overflow-y-auto pr-1">
          {activePanel === 'solution' ? (
            <SolutionWorkspace />
          ) : (
            <SectionDetail panel={activePanel} />
          )}
        </div>
      </div>
    </div>
  );
}

function SectionDetail({ panel }: { panel: PanelKey }) {
  const card = sectionCards.find((item) => item.key === panel);
  if (!card) return null;

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Executive summary</div>
            <div className="mt-2 text-xl font-semibold">{card.title}</div>
          </div>
          <div className={`rounded-full border px-3 py-1 text-xs ${toneClass(card.status)}`}>{card.status}</div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/72">{card.detail}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {card.points.map((point) => (
          <div key={point} className="rounded-[22px] border border-white/10 bg-black/15 p-4 text-sm leading-6 text-white/72">
            {point}
          </div>
        ))}
      </div>

      <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
        <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Why it matters</div>
        <p className="mt-3 text-sm leading-6 text-white/72">
          На самой странице эта карточка должна оставаться краткой, а вся длинная интерпретация, связки и причины должны читаться в выезжающей правой панели — как в Snapchat Action.
        </p>
      </div>
    </div>
  );
}

function SolutionWorkspace() {
  const [tab, setTab] = useState<'overview' | 'levers' | 'simulator' | 'execution' | 'jtbd'>('overview');
  const [leverKey, setLeverKey] = useState(levers[0].key);

  const lever = levers.find((item) => item.key === leverKey) ?? levers[0];

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-[#f7d237]/20 bg-[linear-gradient(180deg,rgba(247,210,55,0.08),rgba(255,255,255,0.03))] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.26em] text-[#f7d237]">Main recommendation</div>
            <div className="mt-2 text-2xl font-semibold text-white">
              Рост через AOV, pricing logic и точечное усиление потока
            </div>
          </div>
          <div className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-xs text-[#f7d237]">Priority horizon · 6M</div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/74">
          Здесь solution и JTBD должны быть расписаны шире остальных блоков. Отсюда же открывается инструмент, который показывает влияние вычисленных рычагов — по логике твоего референса — но уже в контексте конкретного решения.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <TabButton active={tab === 'overview'} onClick={() => setTab('overview')}>Overview</TabButton>
        <TabButton active={tab === 'levers'} onClick={() => setTab('levers')}>Levers</TabButton>
        <TabButton active={tab === 'simulator'} onClick={() => setTab('simulator')}>Simulator</TabButton>
        <TabButton active={tab === 'execution'} onClick={() => setTab('execution')}>Execution conditions</TabButton>
        <TabButton active={tab === 'jtbd'} onClick={() => setTab('jtbd')}>JTBD roadmap</TabButton>
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <PanelBlock
            eyebrow="Overview"
            title="Почему решение строится вокруг AOV и не сводится только к маркетингу"
            text="Маркетинг можно усиливать, но сейчас главный рычаг — не просто в объёме спроса, а в способности бизнеса брать больше денег с каждого входа, не разрушая конверсию. Поэтому решение фокусируется на AOV, цене, упаковке предложения и последовательности внедрения."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <KpiCard label="Primary lever" value="AOV" note="+ revenue / + GP" />
            <KpiCard label="Model change" value="Pricing logic" note="аргументация цены" />
            <KpiCard label="Support lever" value="Marketing" note="только после выравнивания capacity" />
          </div>
        </div>
      )}

      {tab === 'levers' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {levers.map((item) => (
              <button
                key={item.key}
                onClick={() => setLeverKey(item.key)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  item.key === lever.key
                    ? 'border-[#f7d237]/40 bg-[#f7d237] text-[#0b1d3a]'
                    : 'border-white/12 bg-white/[0.05] text-white/78 hover:bg-white/[0.08]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <PanelBlock eyebrow="Lever" title={lever.label} text={lever.why} />
          <div className="grid gap-4 md:grid-cols-2">
            <KpiCard label="Допустимый диапазон" value={`0–${lever.max}${lever.unit}`} note="выше нерационально" />
            <KpiCard label="Почему ceiling" value={lever.ceilingNote} note={lever.deltaLabel} />
          </div>
        </div>
      )}

      {tab === 'simulator' && <LeverImpactSimulator lever={lever} onLeverChange={setLeverKey} />}

      {tab === 'execution' && (
        <div className="space-y-4">
          <PanelBlock
            eyebrow="Execution conditions"
            title="Что должно быть готово для внедрения"
            text="Пересборка оффера, логика bundle / upsell, сценарии аргументации цены, контроль конверсии по этапам и ограничение по нагрузке на delivery. Без этого рост одного рычага будет либо краткосрочным, либо неустойчивым."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <BulletCard
              title="Что нужно подготовить"
              items={['Усилить упаковку предложения', 'Собрать bundle / допродажи', 'Пересобрать аргументацию цены', 'Привязать рост к capacity']}
            />
            <BulletCard
              title="Что может сорвать гипотезу"
              items={['Резкое повышение цены без подкрепления ценности', 'Рост входящего потока без обработки', 'Отсутствие owner у внедрения', 'Слабый контроль этапной конверсии']}
            />
          </div>
        </div>
      )}

      {tab === 'jtbd' && (
        <div className="space-y-4">
          <PanelBlock
            eyebrow="JTBD roadmap"
            title="Подробная карта действий"
            text="Job to be done здесь должен быть намного подробнее остальных блоков: objective, workstreams, dependencies, first actions, horizons и expected outcome. Это не просто summary, а рабочая карта реализации."
          />
          <div className="grid gap-4">
            <RoadmapRow period="0–6 недель" text="Упаковать новый оффер, пересобрать аргументацию цены, подготовить upsell-механику и контроль конверсии по этапам." />
            <RoadmapRow period="3 месяца" text="Провести тест bundle / price ladder, сравнить влияние на AOV и gross profit, закрепить рабочий сценарий." />
            <RoadmapRow period="6 месяцев" text="Масштабировать только те рычаги, которые дали управляемый рост без разрушения конверсии и capacity." />
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? 'border-[#f7d237]/40 bg-[#f7d237] text-[#0b1d3a]'
          : 'border-white/12 bg-white/[0.05] text-white/78 hover:bg-white/[0.08]'
      }`}
    >
      {children}
    </button>
  );
}

function PanelBlock({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">{eyebrow}</div>
      <div className="mt-2 text-xl font-semibold text-white">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/72">{text}</p>
    </div>
  );
}

function KpiCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/15 p-4">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">{label}</div>
      <div className="mt-2 text-lg font-semibold leading-7 text-white">{value}</div>
      <div className="mt-2 text-xs leading-5 text-white/5٠">{note}</div>
    </div>
  );
}

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/8 bg-black/15 px-3 py-2 text-sm text-white/72">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapRow({ period, text }: { period: string; text: string }) {
  return (
    <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.05] p-5 md:grid-cols-[180px_1fr]">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f7d237]">{period}</div>
      <div className="text-sm leading-6 text-white/72">{text}</div>
    </div>
  );
}

function HeroEconomyChart() {
  const base = {
    leads: 10,
    deals: 2.0,
    aov: 3200,
    margin: 40,
    revenue: 13000,
    opex: 3500,
    cogs: 3900,
    grossProfit: 5600,
  };

  const drivers = [
    {
      key: 'marketing',
      label: 'Маркетинг',
      full: 'Маркетинг',
      deltaLabel: '+30% лидов и рост спроса',
      leads: 13,
      deals: 2.4,
      aov: 3200,
      margin: 42,
      revenue: 14800,
      opex: 3200,
      cogs: 3600,
      grossProfit: 6200,
    },
    {
      key: 'aov',
      label: 'AOV',
      full: 'AOV',
      deltaLabel: '+рост среднего заказа',
      leads: 10,
      deals: 2.0,
      aov: 4100,
      margin: 44,
      revenue: 15200,
      opex: 3300,
      cogs: 3900,
      grossProfit: 6700,
    },
    {
      key: 'sales',
      label: 'Продажи',
      full: 'Продажи',
      deltaLabel: '+0.8 сделки',
      leads: 10,
      deals: 2.8,
      aov: 3200,
      margin: 45,
      revenue: 18200,
      opex: 4600,
      cogs: 5100,
      grossProfit: 8500,
    },
    {
      key: 'costs',
      label: 'Модель расходов',
      full: 'Модель расходов',
      deltaLabel: '−давление на OPEX и Margin',
      leads: 10,
      deals: 2.0,
      aov: 3200,
      margin: 51,
      revenue: 13000,
      opex: 2500,
      cogs: 3900,
      grossProfit: 6600,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % drivers.length);
    }, 3400);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [drivers.length]);

  const setDriver = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % drivers.length);
    }, 3400);
  };

  const active = drivers[activeIndex];
  const bars = [
    { name: 'Revenue', value: active.revenue, good: true },
    { name: 'OPEX', value: active.opex, good: false },
    { name: 'COGS', value: active.cogs, good: false },
    { name: 'Gross Profit', value: active.grossProfit, good: true },
  ];
  const maxBar = 20000;

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#050e20] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="text-[14px] uppercase tracking-[0.3em] text-white/55">MVP-DRIVERS</div>

      <div className="mt-4 flex flex-wrap gap-3">
        {drivers.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setDriver(index)}
            className={`rounded-full border px-6 py-3 text-lg font-semibold transition ${
              index === activeIndex
                ? 'border-[#f7d237]/50 bg-[#f7d237] text-[#0b1d3a] shadow-[0_0_28px_rgba(247,210,55,0.35)]'
                : 'border-white/12 bg-white/[0.05] text-white/85 hover:bg-white/[0.08]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)] p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <HeroMetric title="Лидов / мес" value={String(active.leads)} />
          <HeroMetric title="Сделок / мес" value={active.deals.toFixed(1)} />
          <HeroMetric title="AOV" value={fmtMoney(active.aov)} />
          <HeroMetric title="Маржа" value={`${active.margin}%`} />
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
          <div className="grid grid-cols-5 gap-3 text-right text-[15px] text-white/48">
            <span className="text-left">$0</span>
            <span>$5 000</span>
            <span>$10 000</span>
            <span>$15 000</span>
            <span>$20 000</span>
          </div>

          <div className="pointer-events-none absolute inset-y-[78px] left-5 right-5 grid grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-l border-white/8 first:border-l-0" />
            ))}
          </div>

          <div className="relative mt-6 space-y-5">
            {bars.map((bar) => {
              const width = Math.max(6, (bar.value / maxBar) * 100);

              return (
                <div key={bar.name}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="text-[15px] text-white/72">{bar.name}</div>
                    <div className="text-[15px] text-white/72">{fmtMoney(bar.value)}</div>
                  </div>
                  <div className="h-6 rounded-full bg-white/[0.06]">
                    <div
                      className={`h-6 rounded-full transition-all duration-500 ${
                        bar.good
                          ? bar.name === 'Revenue'
                            ? 'bg-[#f2df79]'
                            : 'bg-[#ead77a]'
                          : 'bg-[linear-gradient(90deg,#8398ff_0%,#93a5ff_100%)]'
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <MoneyCard title="База" revenue={fmtMoney(base.revenue)} gross={fmtMoney(base.grossProfit)} />
          <MoneyCard title="Активный драйвер" revenue={fmtMoney(active.revenue)} gross={fmtMoney(active.grossProfit)} />
        </div>

        <div className="mt-5 rounded-[22px] border border-[#f7d237]/18 bg-[linear-gradient(180deg,rgba(247,210,55,0.12),rgba(255,255,255,0.04))] px-4 py-4 text-[15px] text-white/78">
          <span className="mr-3 inline-block h-3.5 w-3.5 rounded-full bg-[#f7d237] shadow-[0_0_15px_rgba(247,210,55,0.45)]" />
          Сейчас подсвечен <b>{active.full}</b> — {active.deltaLabel}.
        </div>
      </div>
    </div>
  );
}

function HeroMetric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
      <div className="text-[15px] text-white/56">{title}</div>
      <div className="mt-3 text-[32px] font-semibold text-white">{value}</div>
    </div>
  );
}

function MoneyCard({ title, revenue, gross }: { title: string; revenue: string; gross: string }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(247,210,55,0.38),transparent_68%)]" />
      <div className="relative">
        <div className="text-[15px] text-white/56">{title}</div>
        <div className="mt-3 text-[34px] font-semibold text-white">{revenue}</div>
        <div className="mt-1 text-[15px] text-white/56">{gross} gross profit / мес</div>
      </div>
    </div>
  );
}

function LeverImpactSimulator({
  lever,
  onLeverChange,
}: {
  lever: LeverSim;
  onLeverChange: (key: string) => void;
}) {
  const [value, setValue] = useState(lever.current);

  useEffect(() => {
    setValue(lever.current);
  }, [lever]);

  const projected = useMemo(() => lever.project(clamp(value, lever.min, lever.max)), [lever, value]);

  const bars = [
    { name: 'Revenue', value: projected.revenue, good: true },
    { name: 'OPEX', value: projected.opex, good: false },
    { name: 'COGS', value: projected.cogs, good: false },
    { name: 'Gross Profit', value: projected.grossProfit, good: true },
  ];
  const maxBar = 20000;

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5">
        <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">Impact simulator</div>
        <h4 className="mt-2 text-xl font-semibold text-white">Инструмент влияния вычисленных рычагов</h4>
        <p className="mt-3 text-sm leading-6 text-white/72">
          Внутри Solution & Practice этот модуль показывает, как выбранный рычаг влияет на экономику на горизонте 6 месяцев — по мотивам референса из hero-инструмента. Выше допустимого диапазона значение не растёт, потому что это уже нереалистично без пересборки модели.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {levers.map((item) => (
          <button
            key={item.key}
            onClick={() => onLeverChange(item.key)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              item.key === lever.key
                ? 'border-[#f7d237]/40 bg-[#f7d237] text-[#0b1d3a]'
                : 'border-white/12 bg-white/[0.05] text-white/78 hover:bg-white/[0.08]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[#050e20] p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <HeroMetric title="Лидов / мес" value={String(projected.leads)} />
          <HeroMetric title="Сделок / мес" value={String(projected.deals)} />
          <HeroMetric title="AOV" value={fmtMoney(projected.aov)} />
          <HeroMetric title="Маржа" value={`${projected.margin}%`} />
        </div>

        <div className="mt-5 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <div className="grid grid-cols-5 gap-3 text-right text-[15px] text-white/48">
            <span className="text-left">$0</span>
            <span>$5 000</span>
            <span>$10 000</span>
            <span>$15 000</span>
            <span>$20 000</span>
          </div>

          <div className="mt-6 space-y-5">
            {bars.map((bar) => {
              const width = Math.max(6, (bar.value / maxBar) * 100);
              return (
                <div key={bar.name}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="text-[15px] text-white/72">{bar.name}</div>
                    <div className="text-[15px] text-white/72">{fmtMoney(bar.value)}</div>
                  </div>
                  <div className="h-6 rounded-full bg-white/[0.06]">
                    <div
                      className={`h-6 rounded-full ${
                        bar.good
                          ? bar.name === 'Revenue'
                            ? 'bg-[#f2df79]'
                            : 'bg-[#ead77a]'
                          : 'bg-[linear-gradient(90deg,#8398ff_0%,#93a5ff_100%)]'
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <MoneyCard title="База" revenue={fmtMoney(lever.base.revenue)} gross={fmtMoney(lever.base.grossProfit)} />
          <MoneyCard title="Активный рычаг" revenue={fmtMoney(projected.revenue)} gross={fmtMoney(projected.grossProfit)} />
        </div>

        <div className="mt-5 rounded-[22px] border border-[#f7d237]/18 bg-[linear-gradient(180deg,rgba(247,210,55,0.12),rgba(255,255,255,0.04))] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-white/72">
              <b>{lever.label}</b> — {lever.deltaLabel}
            </div>
            <div className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-sm text-white/72">
              Horizon: 6 months
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm text-white/62">
              <span>
                Изменение: {value}
                {lever.unit}
              </span>
              <span>Ceiling: {lever.max}{lever.unit}</span>
            </div>
            <input
              type="range"
              min={lever.min}
              max={lever.max}
              step={lever.step}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#f7d237]"
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <KpiCard label="Revenue impact" value={pctDelta(lever.base.revenue, projected.revenue)} note={fmtMoney(projected.revenue)} />
            <KpiCard label="Gross Profit impact" value={pctDelta(lever.base.grossProfit, projected.grossProfit)} note={fmtMoney(projected.grossProfit)} />
            <KpiCard label="Почему это работает" value={projected.explanation} note={lever.ceilingNote} />
          </div>
        </div>
      </div>
    </div>
  );
}
