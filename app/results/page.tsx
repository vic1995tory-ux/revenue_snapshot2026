"use client";

import { useMemo, useState } from "react";

type SlideTitleProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

type TagProps = {
  children: React.ReactNode;
  tone?: "default" | "yellow" | "blue";
};

type InsightCardProps = {
  index: string;
  title: string;
  children: React.ReactNode;
};

type CompareBarProps = {
  label: string;
  before: number;
  after: number;
  beforeLabel?: string;
  afterLabel?: string;
};

type VerticalImpactProps = {
  label: string;
  value: number;
  note?: string;
};

function SlideTitle({ eyebrow, title, subtitle }: SlideTitleProps) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-4xl text-base leading-7 text-white/68 md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function Tag({ children, tone = "default" }: TagProps) {
  const styles =
    tone === "yellow"
      ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#ffe27a]"
      : tone === "blue"
      ? "border-[#7c8fcb]/25 bg-[#7c8fcb]/10 text-[#c8d4ff]"
      : "border-white/10 bg-white/6 text-white/78";

  return (
    <span
      className={`rounded-full border px-3 py-2 text-sm leading-none ${styles}`}
    >
      {children}
    </span>
  );
}

function InsightCard({ index, title, children }: InsightCardProps) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
        {index}
      </div>
      <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function CompareBar({
  label,
  before,
  after,
  beforeLabel = "до",
  afterLabel = "после",
}: CompareBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-white/78">{label}</div>
        <div className="flex items-center gap-3 text-xs text-white/40">
          <span>
            {beforeLabel}: {before}%
          </span>
          <span>
            {afterLabel}: {after}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 overflow-hidden rounded-full bg-white/7">
          <div
            className="h-full rounded-full"
            style={{
              width: `${before}%`,
              background:
                "linear-gradient(90deg, rgba(247,210,55,0.95) 0%, rgba(164,148,76,0.95) 45%, rgba(84,97,146,0.95) 100%)",
            }}
          />
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/7">
          <div
            className="h-full rounded-full"
            style={{
              width: `${after}%`,
              background:
                "linear-gradient(90deg, rgba(255,226,122,1) 0%, rgba(133,151,218,0.95) 45%, rgba(11,29,58,1) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function VerticalImpact({ label, value, note }: VerticalImpactProps) {
  return (
    <div className="flex min-w-[120px] flex-1 flex-col items-center gap-3">
      <div className="relative flex h-64 w-full max-w-[132px] items-end overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-3">
        <div
          className="w-full rounded-[18px]"
          style={{
            height: `${value}%`,
            background:
              "linear-gradient(180deg, #ffe27a 0%, #f7d237 16%, #8697da 56%, #0b1d3a 100%)",
            boxShadow: "0 18px 40px rgba(11,29,58,0.38)",
          }}
        />
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/15 px-2 py-1 text-xs text-white/66">
          {value}%
        </div>
      </div>
      <div className="text-center text-sm text-white/82">{label}</div>
      {note ? <div className="text-center text-xs text-white/42">{note}</div> : null}
    </div>
  );
}

function OpportunityMatrix() {
  const items = [
    {
      title: "Snapshot как entry point",
      x: 84,
      y: 78,
      size: 116,
      note: "быстрый запуск / высокий эффект",
    },
    {
      title: "Автоматизация обработки",
      x: 66,
      y: 68,
      size: 102,
      note: "снимает нагрузку",
    },
    {
      title: "Новая channel layer",
      x: 54,
      y: 52,
      size: 92,
      note: "средний эффект позже",
    },
    {
      title: "Retention-линейка",
      x: 74,
      y: 42,
      size: 98,
      note: "LTV-эффект",
    },
  ];

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 md:p-6">
      <div className="mb-4">
        <div className="text-sm font-medium text-white">Матрица приоритетов</div>
        <div className="mt-1 text-sm text-white/48">
          выше — сильнее эффект, правее — проще запуск в текущей модели
        </div>
      </div>

      <div className="relative h-[360px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]">
        <div className="absolute inset-0">
          {[25, 50, 75].map((v) => (
            <div
              key={`h-${v}`}
              className="absolute left-0 right-0 border-t border-dashed border-white/8"
              style={{ top: `${100 - v}%` }}
            />
          ))}
          {[25, 50, 75].map((v) => (
            <div
              key={`v-${v}`}
              className="absolute bottom-0 top-0 border-l border-dashed border-white/8"
              style={{ left: `${v}%` }}
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.18em] text-white/32">
          сложность запуска →
        </div>
        <div className="absolute left-3 top-3 -rotate-90 origin-left text-xs uppercase tracking-[0.18em] text-white/32">
          ← эффект
        </div>

        {items.map((item) => (
          <div
            key={item.title}
            className="absolute flex flex-col items-center justify-center rounded-full border border-[#f7d237]/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,226,122,0.35),rgba(11,29,58,0.88))] p-4 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            style={{
              left: `calc(${item.x}% - ${item.size / 2}px)`,
              bottom: `calc(${item.y}% - ${item.size / 2}px)`,
              width: item.size,
              height: item.size,
            }}
          >
            <div className="text-xs font-medium leading-4">{item.title}</div>
            <div className="mt-2 text-[10px] leading-4 text-white/55">
              {item.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  title,
  period,
  actions,
}: {
  phase: string;
  title: string;
  period: string;
  actions: string[];
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
          {phase}
        </div>
        <div className="text-xs text-white/45">{period}</div>
      </div>

      <div className="mt-3 text-lg font-medium text-white">{title}</div>

      <div className="mt-4 space-y-3">
        {actions.map((action) => (
          <div
            key={action}
            className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-white/78"
          >
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {note ? <div className="mt-2 text-sm text-white/48">{note}</div> : null}
    </div>
  );
}

export default function ResultsPage() {
  const [horizon, setHorizon] = useState<"3m" | "6m" | "12m">("6m");

  const horizonData = useMemo(() => {
    const map = {
      "3m": {
        bars: [
          { label: "Конверсия lead → payment", before: 8, after: 14 },
          { label: "Обработанный спрос", before: 28, after: 46 },
          { label: "Предсказуемость выручки", before: 22, after: 38 },
          { label: "Повторные продажи", before: 18, after: 26 },
        ],
        impacts: [
          { label: "Выручка", value: 46, note: "ранний рост" },
          { label: "Нагрузка команды", value: 39, note: "снижение хаоса" },
          { label: "Скорость сделки", value: 44, note: "быстрее вход" },
          { label: "Управляемость", value: 41, note: "видимость этапов" },
        ],
      },
      "6m": {
        bars: [
          { label: "Конверсия lead → payment", before: 8, after: 18 },
          { label: "Обработанный спрос", before: 28, after: 61 },
          { label: "Предсказуемость выручки", before: 22, after: 55 },
          { label: "Повторные продажи", before: 18, after: 37 },
        ],
        impacts: [
          { label: "Выручка", value: 63, note: "прямой эффект" },
          { label: "Нагрузка команды", value: 52, note: "снимается bottleneck" },
          { label: "Скорость сделки", value: 58, note: "лучше упаковка" },
          { label: "Управляемость", value: 61, note: "появляется система" },
        ],
      },
      "12m": {
        bars: [
          { label: "Конверсия lead → payment", before: 8, after: 24 },
          { label: "Обработанный спрос", before: 28, after: 76 },
          { label: "Предсказуемость выручки", before: 22, after: 73 },
          { label: "Повторные продажи", before: 18, after: 51 },
        ],
        impacts: [
          { label: "Выручка", value: 79, note: "накопительный рост" },
          { label: "Нагрузка команды", value: 66, note: "системное снятие перегруза" },
          { label: "Скорость сделки", value: 68, note: "короче путь клиента" },
          { label: "Управляемость", value: 77, note: "модель масштабируется" },
        ],
      },
    } as const;

    return map[horizon];
  }, [horizon]);

  const tabs = [
    { key: "3m", label: "3 months" },
    { key: "6m", label: "6 months" },
    { key: "12m", label: "12 months" },
  ] as const;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07152b] text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-95"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(247,210,55,0.16), transparent 22%), radial-gradient(circle at 82% 16%, rgba(255,226,122,0.08), transparent 20%), radial-gradient(circle at 76% 80%, rgba(121,143,216,0.16), transparent 28%), linear-gradient(180deg, #0b1d3a 0%, #08162b 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 py-8 md:px-8 lg:px-10">
        <div className="mb-8 rounded-[34px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
            Results • Interactive Deck
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-6xl">
            ECONOMIC RATE / SOLUTION / JTBD
          </h1>
          <p className="mt-4 max-w-5xl text-base leading-7 text-white/68 md:text-lg">
            Страница собрана как горизонтальный deck: первый экран — текущая
            диагностика, второй — рекомендуемое решение, третий — roadmap внедрения.
            Блоки листаются вправо и визуально ощущаются как продолжение одного
            результата, а не как три отдельные страницы.
          </p>
        </div>

        <div className="mb-5 flex items-center gap-3 overflow-x-auto pb-2">
          <a
            href="#part-1"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            Part 1
          </a>
          <a
            href="#part-2"
            className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#ffe27a] transition hover:bg-[#f7d237]/15"
          >
            Part 2
          </a>
          <a
            href="#part-3"
            className="rounded-full border border-[#7c8fcb]/20 bg-[#7c8fcb]/10 px-4 py-2 text-sm text-[#c8d4ff] transition hover:bg-[#7c8fcb]/15"
          >
            Part 3
          </a>
        </div>

        <section className="overflow-x-auto pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-6 snap-x snap-mandatory">
            {/* PART 1 */}
            <section
              id="part-1"
              className="w-[92vw] max-w-[1420px] shrink-0 snap-start space-y-8"
            >
              <SlideTitle
                eyebrow="Part 1"
                title="ECONOMIC RATE & GROWTH LIMIT"
                subtitle="Первый слайд фиксирует текущую конфигурацию бизнеса: где теряются деньги, почему система перегружена и где проходит основное ограничение роста."
              />

              <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
                <InsightCard index="1.1" title="Главная экономическая проблема">
                  <div className="space-y-4 text-base leading-7 text-white/76">
                    <p>
                      Бизнес уже имеет сформированный спрос, но текущая модель
                      не справляется с его обработкой. Деньги теряются не на
                      уровне интереса к продукту, а на этапе прохождения клиента
                      через систему.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Tag tone="yellow">processing constraint</Tag>
                      <Tag tone="yellow">conversion gap</Tag>
                      <Tag tone="yellow">retention gap</Tag>
                    </div>
                  </div>
                </InsightCard>

                <InsightCard index="1.2" title="Главный bottleneck">
                  <div className="grid gap-4 md:grid-cols-2">
                    <MiniMetric label="Demand Gap" value="3–5x" />
                    <MiniMetric
                      label="Основное ограничение"
                      value="Founder dependency"
                      note="стратегия / продажи / продукт"
                    />
                  </div>

                  <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                    <p>
                      Рост сдерживается операционно-управленческой конфигурацией:
                      спрос уже есть, но нет достаточно широкой системы, которая
                      могла бы безопасно и регулярно превращать его в выручку.
                    </p>
                  </div>
                </InsightCard>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
                <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                  Part 1 Summary
                </div>
                <div className="mt-4 max-w-5xl text-lg leading-8 text-white/84">
                  Бизнес находится в точке, где следующая фаза роста зависит уже
                  не от поиска спроса, а от перестройки логики входа, обработки,
                  конверсии и последующего удержания клиента.
                </div>
              </div>
            </section>

            {/* PART 2 */}
            <section
              id="part-2"
              className="w-[92vw] max-w-[1520px] shrink-0 snap-start space-y-8"
            >
              <SlideTitle
                eyebrow="Part 2"
                title="SOLUTION"
                subtitle="Второй слайд показывает, какое изменение в модели бизнеса даст максимальный эффект: где главный рычаг роста, какой тип потерь сейчас критичен и как будет меняться система на горизонтах 3, 6 и 12 месяцев."
              />

              <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
                <InsightCard index="3.1" title="Primary Growth Lever">
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      <Tag tone="yellow">Snapshot as entry point</Tag>
                      <Tag tone="blue">standardized funnel</Tag>
                      <Tag>automation layer</Tag>
                    </div>

                    <div className="space-y-4 text-base leading-7 text-white/76">
                      <p>
                        Главный рычаг роста — не новый канал как таковой, а
                        перестройка входа в модель. Текущий спрос нужно
                        переводить в стандартизированный продуктовый маршрут,
                        где первый шаг понятен, быстрый и масштабируемый.
                      </p>
                      <p className="text-white">
                        Приоритет: продуктизировать вход и убрать зависимость
                        первой конверсии от ручного объяснения ценности.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <MiniMetric label="Рычаг" value="Entry product" />
                      <MiniMetric label="Скорость эффекта" value="High" />
                      <MiniMetric label="Сложность запуска" value="Medium" />
                    </div>
                  </div>
                </InsightCard>

                <InsightCard index="3.2 / 3.3" title="Revenue Loss Source + Model Change">
                  <div className="space-y-5 text-base leading-7 text-white/76">
                    <p>
                      Главная точка потери денег — участок между входящим
                      интересом и первой оплатой. Это не просто низкая конверсия,
                      а следствие текущей логики модели: слишком много ручного
                      сопровождения в моменте, где должен работать понятный и
                      повторяемый путь.
                    </p>
                    <p>
                      Поэтому менять нужно не отдельный симптом, а саму логику:
                      <span className="text-white">
                        {" "}
                        с “консалтинг-first” на “funnel-first”.
                      </span>
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-white/42">Сейчас</div>
                      <div className="mt-2 text-lg font-medium text-white">
                        Консультация как основной вход
                      </div>
                      <div className="mt-3 text-sm leading-6 text-white/60">
                        Высокая нагрузка, длинный путь до оплаты, зависимость от
                        фаундера.
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[#f7d237]/20 bg-[#f7d237]/7 p-5">
                      <div className="text-sm text-white/42">Нужно</div>
                      <div className="mt-2 text-lg font-medium text-white">
                        Продуктовая лестница: Snapshot → Calendar → Strategy
                      </div>
                      <div className="mt-3 text-sm leading-6 text-white/60">
                        Быстрый вход, выше конверсия, предсказуемая передача
                        клиента вверх по модели.
                      </div>
                    </div>
                  </div>
                </InsightCard>
              </div>

              <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
                <InsightCard index="3.4 / 3.5" title="Strategic Priority + Business Impact">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => {
                      const active = horizon === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setHorizon(tab.key)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            active
                              ? "border-[#f7d237]/30 bg-[#f7d237]/12 text-[#ffe27a]"
                              : "border-white/10 bg-white/5 text-white/72 hover:bg-white/8"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 space-y-5">
                    {horizonData.bars.map((item) => (
                      <CompareBar
                        key={item.label}
                        label={item.label}
                        before={item.before}
                        after={item.after}
                      />
                    ))}
                  </div>

                  <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                    На выбранном горизонте видно, как меняется не одна метрика,
                    а целый набор взаимосвязанных показателей: конверсия,
                    обработка спроса, управляемость и повторные продажи.
                  </div>
                </InsightCard>

                <InsightCard index="3.5" title="Direct & Indirect Impact">
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    {horizonData.impacts.map((item) => (
                      <VerticalImpact
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        note={item.note}
                      />
                    ))}
                  </div>

                  <div className="mt-8 text-base leading-7 text-white/76">
                    Предложенное изменение влияет одновременно на выручку,
                    скорость прохождения клиента, нагрузку команды и общую
                    управляемость бизнеса. Самый ранний эффект проявляется в
                    конверсии и обработке спроса, более глубокий — в LTV и
                    устойчивости всей модели.
                  </div>
                </InsightCard>
              </div>

              <div className="grid gap-8 xl:grid-cols-[0.98fr_1.02fr]">
                <InsightCard index="3.6" title="Implementation Conditions">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-medium text-[#ffe27a]">
                        Что нужно подготовить
                      </div>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                        <div>Упаковка Snapshot как массового entry продукта</div>
                        <div>Маршрут клиента между продуктами</div>
                        <div>Логика автоматической обработки заявок</div>
                        <div>Роли: sales / ops / strategy</div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm font-medium text-[#ffe27a]">
                        Основные риски
                      </div>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                        <div>Рост спроса раньше, чем стабилизируется delivery</div>
                        <div>Слабая упаковка первого продукта</div>
                        <div>Недостаточная аналитика по этапам воронки</div>
                        <div>Сохранение ручных bottleneck-переходов</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-base leading-7 text-white/76">
                    Решение даст результат только если вход, маршрут клиента и
                    распределение ответственности будут перестроены как единая
                    система, а не как набор отдельных улучшений.
                  </div>
                </InsightCard>

                <OpportunityMatrix />
              </div>
            </section>

            {/* PART 3 */}
            <section
              id="part-3"
              className="w-[92vw] max-w-[1560px] shrink-0 snap-start space-y-8"
            >
              <SlideTitle
                eyebrow="Part 3"
                title="JTBD"
                subtitle="Третий слайд переводит стратегию в дорожную карту: какую работу бизнес должен выполнить, по каким потокам, в какой последовательности и с какими контрольными точками."
              />

              <div className="grid gap-8 xl:grid-cols-[0.94fr_1.06fr]">
                <InsightCard index="4.1 / 4.2" title="Strategic Objective + Core JTBD">
                  <div className="space-y-5 text-base leading-7 text-white/76">
                    <p>
                      Главная цель внедрения — превратить входящий спрос в
                      предсказуемую выручку без пропорционального роста нагрузки
                      на фаундера и команду.
                    </p>
                    <p className="text-white">
                      Core JTBD: построить такой путь клиента, в котором первая
                      оплата, передача вверх по продуктам и контроль качества не
                      зависят от ручного героизма.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <MiniMetric label="Цель" value="Scaleable revenue" />
                    <MiniMetric label="Ключевая работа" value="Systemize conversion" />
                    <MiniMetric label="Результат" value="Less manual load" />
                  </div>
                </InsightCard>

                <InsightCard index="4.3 / 4.4" title="Workstreams + Phase Logic">
                  <div className="flex flex-wrap gap-2">
                    <Tag tone="yellow">маркетинг</Tag>
                    <Tag tone="blue">продукт</Tag>
                    <Tag>продажи</Tag>
                    <Tag>операционка</Tag>
                    <Tag>аналитика</Tag>
                    <Tag>управление</Tag>
                  </div>

                  <div className="mt-6 text-base leading-7 text-white/76">
                    Внедрение нельзя запускать как один длинный список задач.
                    Это несколько отдельных потоков работ, которые должны идти
                    синхронно, но в правильной логике: сначала стабилизация
                    входа, затем систематизация маршрута, затем масштабирование.
                  </div>
                </InsightCard>
              </div>

              <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
                  <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                    4.5 / 4.6 / 4.7
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                    First Priority Actions + Structural Changes + Dependencies
                  </h3>

                  <div className="mt-6 grid gap-5 xl:grid-cols-3">
                    <PhaseCard
                      phase="Phase 01"
                      title="Stabilize entry"
                      period="Weeks 1–4"
                      actions={[
                        "Упаковать Snapshot как понятный первый продукт",
                        "Сократить путь до первой ценности",
                        "Убрать ручные разрывы на первом касании",
                      ]}
                    />

                    <PhaseCard
                      phase="Phase 02"
                      title="Build conversion system"
                      period="Weeks 5–10"
                      actions={[
                        "Собрать маршрут Snapshot → Calendar → Strategy",
                        "Распределить ownership между ролями",
                        "Включить базовые точки аналитики по этапам",
                      ]}
                    />

                    <PhaseCard
                      phase="Phase 03"
                      title="Scale and retain"
                      period="Weeks 11–24"
                      actions={[
                        "Добавить retention-слой и повторные маршруты",
                        "Тестировать channel diversification",
                        "Усилить регулярный операционный контроль",
                      ]}
                    />
                  </div>

                  <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                    Логика зависимости простая: нельзя масштабировать трафик,
                    пока не стабилизирован вход; нельзя масштабировать delivery,
                    пока не понятен маршрут клиента; нельзя рассчитывать на LTV,
                    пока не существует пост-покупочного слоя.
                  </div>
                </div>

                <InsightCard index="4.8 / 4.9" title="Resources, Ownership & Control Points">
                  <div className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                        <div className="text-sm font-medium text-[#ffe27a]">
                          Ownership
                        </div>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                          <div>Founder → стратегия и контроль модели</div>
                          <div>Sales layer → первичная конверсия</div>
                          <div>Ops layer → delivery и передача клиента</div>
                          <div>Analytics layer → метрики и контроль прогресса</div>
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                        <div className="text-sm font-medium text-[#ffe27a]">
                          Control points
                        </div>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                          <div>Lead → first payment conversion</div>
                          <div>Время от лида до ценности</div>
                          <div>Процент обработанного спроса</div>
                          <div>Процент перехода на следующий продукт</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-base leading-7 text-white/76">
                      Контрольные точки должны появляться раньше, чем итоговый
                      эффект в выручке. Это даёт возможность проверять, работает
                      ли стратегия, до того как пройдёт полный цикл монетизации.
                    </div>
                  </div>
                </InsightCard>
              </div>

              <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
                <InsightCard index="4.10" title="Expected Outcome by Horizon">
                  <div className="space-y-5">
                    <CompareBar
                      label="3 months → ранний эффект"
                      before={24}
                      after={46}
                      beforeLabel="base"
                      afterLabel="expected"
                    />
                    <CompareBar
                      label="6 months → системный эффект"
                      before={32}
                      after={63}
                      beforeLabel="base"
                      afterLabel="expected"
                    />
                    <CompareBar
                      label="12 months → накопительный эффект"
                      before={36}
                      after={79}
                      beforeLabel="base"
                      afterLabel="expected"
                    />
                  </div>

                  <div className="mt-8 text-base leading-7 text-white/76">
                    Краткосрочно бизнес должен увидеть улучшение конверсии и
                    снижение перегруза. На среднем горизонте появится более
                    предсказуемая выручка. На длинном — модель станет устойчивее,
                    а рост перестанет быть полностью завязан на одном человеке.
                  </div>
                </InsightCard>

                <div className="rounded-[32px] border border-[#f7d237]/18 bg-[linear-gradient(180deg,rgba(247,210,55,0.08),rgba(255,255,255,0.04))] p-6 backdrop-blur-md md:p-8">
                  <div className="text-xs uppercase tracking-[0.24em] text-[#f7d237]">
                    JTBD Summary
                  </div>

                  <div className="mt-5 space-y-6">
                    <div>
                      <div className="text-sm text-white/42">Главная цель</div>
                      <div className="mt-2 text-2xl font-semibold text-white">
                        Сделать рост управляемым
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-white/42">
                        Что должно измениться
                      </div>
                      <div className="mt-2 text-base leading-7 text-white/82">
                        Бизнес должен перейти от ручного сопровождения спроса к
                        системе, где вход, конверсия, передача клиента и контроль
                        качества собираются в единую операционную логику.
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-white/42">
                        Как выглядит успех
                      </div>
                      <div className="mt-2 text-base leading-7 text-white/82">
                        Спрос больше не перегружает систему, конверсия растёт,
                        повторные продажи становятся управляемыми, а фаундер
                        перестаёт быть единственным узлом для принятия решений и
                        генерации выручки.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
