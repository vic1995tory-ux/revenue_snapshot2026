"use client";

import { useMemo, useState } from "react";

type Tone = "default" | "yellow" | "blue" | "green";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Tag({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  const styles = {
    default: "border-white/10 bg-white/5 text-white/78",
    yellow: "border-[#f7d237]/25 bg-[#f7d237]/10 text-[#ffe27a]",
    blue: "border-[#8aa2ff]/20 bg-[#8aa2ff]/10 text-[#dbe5ff]",
    green: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-2 text-sm leading-none",
        styles[tone]
      )}
    >
      {children}
    </span>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
          {eyebrow}
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-white/66 md:text-lg">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}

function BlockCard({
  index,
  title,
  children,
  accent = "default",
}: {
  index?: string;
  title: string;
  children: React.ReactNode;
  accent?: "default" | "yellow" | "blue";
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          {index ? (
            <div
              className={cn(
                "text-xs uppercase tracking-[0.22em]",
                accent === "yellow"
                  ? "text-[#f7d237]"
                  : accent === "blue"
                  ? "text-[#cdd8ff]"
                  : "text-white/38"
              )}
            >
              {index}
            </div>
          ) : null}
          <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <div className="text-sm text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      {note ? <div className="mt-2 text-sm text-white/45">{note}</div> : null}
    </div>
  );
}

function SummaryPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[30px] border border-[#f7d237]/20 bg-[linear-gradient(180deg,rgba(247,210,55,0.08),rgba(255,255,255,0.04))] p-6 backdrop-blur-md md:p-8">
      <div className="text-xs uppercase tracking-[0.24em] text-[#f7d237]">
        {title}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ScaleBar({
  label,
  value,
  leftLabel = "низкий",
  rightLabel = "высокий",
}: {
  label: string;
  value: number;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <div className="text-sm text-white/82">{label}</div>
        <div className="text-sm text-white/44">{value}%</div>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-white/7">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${value}%`,
            background:
              "linear-gradient(90deg, #f7d237 0%, #cfbf5d 34%, #6878b2 68%, #0b1d3a 100%)",
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/34">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function VerticalLoad({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex min-w-[120px] flex-1 flex-col items-center gap-3">
      <div className="relative flex h-64 w-full max-w-[132px] items-end overflow-hidden rounded-[26px] border border-white/10 bg-white/6 p-3">
        <div
          className="w-full rounded-[18px]"
          style={{
            height: `${value}%`,
            background:
              "linear-gradient(180deg, #f7d237 0%, #b9af5d 25%, #6678b3 62%, #0b1d3a 100%)",
            boxShadow: "0 18px 40px rgba(11,29,58,0.45)",
          }}
        />
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/15 px-2 py-1 text-xs text-white/64">
          {value}%
        </div>
      </div>
      <div className="text-center text-sm text-white/8૨">{label}</div>
    </div>
  );
}

function CompareBar({
  label,
  before,
  after,
  beforeLabel = "до",
  afterLabel = "после",
}: {
  label: string;
  before: number;
  after: number;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-white/82">{label}</div>
        <div className="flex gap-3 text-xs text-white/42">
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
                "linear-gradient(90deg, rgba(247,210,55,0.95) 0%, rgba(146,135,81,0.95) 45%, rgba(74,89,140,0.95) 100%)",
            }}
          />
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/7">
          <div
            className="h-full rounded-full"
            style={{
              width: `${after}%`,
              background:
                "linear-gradient(90deg, rgba(255,226,122,1) 0%, rgba(157,177,255,0.95) 45%, rgba(11,29,58,1) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function DonutChart({
  title,
  centerValue,
  centerLabel,
  segments,
}: {
  title?: string;
  centerValue: string;
  centerLabel: string;
  segments: { value: number; color: string; label: string }[];
}) {
  const size = 240;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      {title ? (
        <div className="mb-5 text-sm text-white/55">{title}</div>
      ) : null}

      <div className="relative h-[240px] w-[240px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          {segments.map((segment, i) => {
            const segmentLength = (segment.value / 100) * circumference;
            const circle = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-offset}
              />
            );
            offset += segmentLength + 8;
            return circle;
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xs uppercase tracking-[0.24em] text-white/42">
            {centerLabel}
          </div>
          <div className="mt-2 text-4xl font-semibold text-white">
            {centerValue}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {segments.map((segment) => (
          <span
            key={segment.label}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/74"
          >
            <span
              className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: segment.color }}
            />
            {segment.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImpactBars({
  items,
}: {
  items: Array<{ label: string; value: number; note?: string }>;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-[110px] flex-1 flex-col items-center gap-3"
        >
          <div className="relative flex h-64 w-full max-w-[124px] items-end overflow-hidden rounded-[26px] border border-white/10 bg-white/6 p-3">
            <div
              className="w-full rounded-[18px]"
              style={{
                height: `${item.value}%`,
                background:
                  "linear-gradient(180deg, #ffe27a 0%, #f7d237 18%, #8297db 60%, #0b1d3a 100%)",
              }}
            />
            <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/15 px-2 py-1 text-xs text-white/64">
              {item.value}%
            </div>
          </div>
          <div className="text-center text-sm text-white/82">{item.label}</div>
          {item.note ? (
            <div className="text-center text-xs text-white/42">{item.note}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function TimelinePhase({
  phase,
  period,
  title,
  actions,
}: {
  phase: string;
  period: string;
  title: string;
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

export default function ResultsPage() {
  const [horizon, setHorizon] = useState<"3m" | "6m" | "12m">("6m");

  const horizonData = useMemo(() => {
    const map = {
      "3m": {
        metrics: [
          { label: "Конверсия lead → payment", before: 8, after: 14 },
          { label: "Обработанный спрос", before: 28, after: 46 },
          { label: "Предсказуемость выручки", before: 22, after: 38 },
          { label: "Повторные продажи", before: 18, after: 26 },
        ],
        impact: [
          { label: "Выручка", value: 46, note: "ранний эффект" },
          { label: "Нагрузка команды", value: 39, note: "меньше ручной перегрузки" },
          { label: "Скорость сделки", value: 44, note: "быстрее вход" },
          { label: "Управляемость", value: 41, note: "лучше видимость" },
        ],
      },
      "6m": {
        metrics: [
          { label: "Конверсия lead → payment", before: 8, after: 18 },
          { label: "Обработанный спрос", before: 28, after: 61 },
          { label: "Предсказуемость выручки", before: 22, after: 55 },
          { label: "Повторные продажи", before: 18, after: 37 },
        ],
        impact: [
          { label: "Выручка", value: 63, note: "прямой рост" },
          { label: "Нагрузка команды", value: 52, note: "снимается bottleneck" },
          { label: "Скорость сделки", value: 58, note: "сильнее упаковка" },
          { label: "Управляемость", value: 61, note: "появляется система" },
        ],
      },
      "12m": {
        metrics: [
          { label: "Конверсия lead → payment", before: 8, after: 24 },
          { label: "Обработанный спрос", before: 28, after: 76 },
          { label: "Предсказуемость выручки", before: 22, after: 73 },
          { label: "Повторные продажи", before: 18, after: 51 },
        ],
        impact: [
          { label: "Выручка", value: 79, note: "накопительный эффект" },
          { label: "Нагрузка команды", value: 66, note: "устойчивое снижение перегруза" },
          { label: "Скорость сделки", value: 68, note: "короче путь клиента" },
          { label: "Управляемость", value: 77, note: "модель масштабируется" },
        ],
      },
    } as const;
    return map[horizon];
  }, [horizon]);

  return (
    <main className="min-h-screen bg-[#07152b] text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-95"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(247,210,55,0.14), transparent 22%), radial-gradient(circle at 82% 16%, rgba(255,226,122,0.08), transparent 18%), radial-gradient(circle at 76% 80%, rgba(121,143,216,0.16), transparent 28%), linear-gradient(180deg, #0b1d3a 0%, #08162b 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1480px] px-6 py-8 md:px-8 lg:px-10">
        <div className="mb-8 rounded-[34px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
            Revenue Snapshot • Full Results
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-6xl">
            ECONOMIC RATE / GROWTH LIMIT / SOLUTION / JTBD
          </h1>
          <p className="mt-4 max-w-5xl text-base leading-7 text-white/68 md:text-lg">
            Страница выстроена как аналитический results dashboard: сначала
            диагностика текущего состояния, затем ключевое решение, затем
            дорожная карта внедрения. Логика чтения — сверху вниз, от причины к
            действию и ожидаемому эффекту.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#economic-rate"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/78"
            >
              Economic Rate
            </a>
            <a
              href="#growth-limit"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/78"
            >
              Growth Limit
            </a>
            <a
              href="#solution"
              className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#ffe27a]"
            >
              Solution
            </a>
            <a
              href="#jtbd"
              className="rounded-full border border-[#8aa2ff]/20 bg-[#8aa2ff]/10 px-4 py-2 text-sm text-[#dbe5ff]"
            >
              JTBD
            </a>
          </div>
        </div>

        <div className="space-y-16">
          <SectionShell
            id="economic-rate"
            eyebrow="01"
            title="ECONOMIC RATE"
            subtitle="Сводный анализ текущей экономической модели бизнеса с выявлением ключевых зон недополученной выручки и потенциала роста."
          >
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-sm uppercase tracking-[0.22em] text-white/35">
                Executive Summary
              </div>
              <div className="mt-4 max-w-5xl text-base leading-7 text-white/78">
                Экономика с упором на продуктовую трансформацию, но с
                недоиспользованным спросом и перегрузом системы. Текущая модель
                сочетает консалтинг и продуктовые решения, однако бизнес теряет
                значительный объём выручки из-за ограничения по обработке и
                отсутствия масштабируемой системы конверсии.
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
              <BlockCard index="1.1" title="Спрос vs обработка" accent="yellow">
                <div className="flex flex-wrap gap-2">
                  <Tag tone="yellow">Telegram</Tag>
                  <Tag tone="yellow">Органика</Tag>
                  <Tag tone="yellow">Личный бренд</Tag>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <MetricTile
                    label="Inbound"
                    value="120–180 / месяц"
                    note="входящий поток лидов"
                  />
                  <MetricTile
                    label="Capacity"
                    value="20–40 / месяц"
                    note="обработка командой"
                  />
                  <MetricTile
                    label="Demand Gap"
                    value="3–5x"
                    note="разрыв между спросом и capacity"
                  />
                </div>

                <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                  <p>
                    Входящий спрос уже сформирован и идёт из нескольких касаний,
                    но текущая система не успевает превращать этот поток в
                    выручку с сопоставимой скоростью.
                  </p>
                  <p>
                    Основная проблема здесь не в генерации интереса, а в
                    ограниченной способности команды пропускать через себя этот
                    объём без потери качества и без задержек на ручных этапах.
                  </p>
                  <p className="text-white">
                    Вывод: перегруз системы → теряется 60–80% потенциальной
                    выручки.
                  </p>
                </div>
              </BlockCard>

              <BlockCard index="1.2" title="Конверсия" accent="yellow">
                <DonutChart
                  centerValue="5–10%"
                  centerLabel="lead → оплата"
                  segments={[
                    { value: 8, color: "#ffe27a", label: "оплата" },
                    { value: 52, color: "#8aa2ff", label: "сложность продукта" },
                    { value: 40, color: "#f7d237", label: "нет быстрого входа" },
                  ]}
                />

                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag>Сложность продукта</Tag>
                  <Tag>Отсутствие быстрого входа</Tag>
                  <Tag>Ручная обработка</Tag>
                </div>

                <p className="mt-6 text-base leading-7 text-white/76">
                  Основной отвал возникает до оплаты: пользователю требуется
                  слишком долго понять формат, ценность и следующую точку входа.
                  Из-за этого часть спроса не доходит до транзакции, хотя
                  интерес к продукту уже есть.
                </p>

                <p className="mt-4 text-white">
                  Вывод: потери в конверсии происходят на этапе входа.
                </p>
              </BlockCard>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
              <BlockCard index="1.3" title="Структура дохода" accent="yellow">
                <div className="space-y-4 text-base leading-7 text-white/76">
                  <p>
                    Основной объём дохода по-прежнему завязан на консалтинг и
                    стратегическую работу. Это даёт высокий средний чек, но
                    делает модель тяжёлой в операционном обслуживании и почти
                    всегда требует прямого участия фаундера.
                  </p>
                  <p>
                    Новые продукты — Snapshot как low-ticket entry point и
                    Calendar как mid-ticket уровень — уже создают зачаток
                    продуктовой лестницы, но пока не перетягивают на себя
                    значимую часть монетизации.
                  </p>
                  <p className="text-white">
                    Вывод: структура дохода смещена в сторону высокоёмкого
                    продукта, что ограничивает масштабирование.
                  </p>
                </div>
              </BlockCard>

              <BlockCard index="1.4" title="Удержание" accent="yellow">
                <div className="space-y-4 text-base leading-7 text-white/76">
                  <p>
                    Повторные продажи присутствуют: часть клиентов естественно
                    переходит из стратегической диагностики во внедрение и более
                    глубокую работу. Это подтверждает ценность основного оффера и
                    наличие доверия к результату.
                  </p>
                  <p>
                    При этом системного retention-слоя пока нет. У бизнеса не
                    закреплена регулярная модель повторного касания через
                    подписку, сервисную линейку, recurring-формат или
                    стандартизированный post-purchase маршрут.
                  </p>
                  <p className="text-white">
                    Вывод: основная потеря здесь — недораскрытый LTV.
                  </p>
                </div>
              </BlockCard>
            </div>

            <SummaryPanel title="Итоговый вывод по блоку">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="text-sm text-white/45">Тип потерь</div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Processing constraint + conversion gap + retention gap
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/45">Главное ограничение</div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Бизнес упирается не в спрос, а в способность его обработать
                    и конвертировать.
                  </div>
                </div>
              </div>
            </SummaryPanel>
          </SectionShell>

          <SectionShell
            id="growth-limit"
            eyebrow="02"
            title="GROWTH LIMIT"
            subtitle="Определение системных ограничений, которые сдерживают масштабирование и влияют на выручку."
          >
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-sm uppercase tracking-[0.22em] text-white/35">
                Key Conclusions
              </div>
              <div className="mt-4 max-w-5xl text-base leading-7 text-white/78">
                Рост ограничен перегрузом фаундера и отсутствием масштабируемой
                воронки. Ограничение роста находится не на уровне интереса
                рынка, а на уровне внутренней пропускной способности системы.
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <BlockCard index="2.1" title="Загрузка системы" accent="yellow">
                <div className="space-y-7">
                  <ScaleBar label="Demand" value={88} />
                  <ScaleBar label="Capacity" value={26} />
                </div>

                <p className="mt-8 text-base leading-7 text-white/76">
                  Система получает высокий уровень входящего интереса, но
                  текущая операционная мощность остаётся заметно ниже. Из-за
                  этого рост уже сейчас упирается в исполнение, а не в рынок.
                </p>

                <p className="mt-4 text-white">Вывод: система перегружена.</p>
              </BlockCard>

              <BlockCard
                index="2.2"
                title="Структура команды и зависимость от фаундера"
                accent="yellow"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <VerticalLoad label="Стратегия" value={92} />
                  <VerticalLoad label="Продажи" value={84} />
                  <VerticalLoad label="Продукт" value={79} />
                </div>

                <p className="mt-8 text-base leading-7 text-white/76">
                  Основные критичные функции по-прежнему тяготеют к фаундеру.
                  Бизнес зависит от одного центра принятия решений и от одного
                  носителя экспертизы сразу в нескольких точках создания
                  выручки.
                </p>

                <p className="mt-4 text-white">
                  Вывод: узкое место системы — фаундер.
                </p>
              </BlockCard>
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <BlockCard index="2.3" title="Процессы" accent="yellow">
                <div className="flex flex-wrap gap-2">
                  <Tag>Маркетинг</Tag>
                  <Tag>Продажи</Tag>
                  <Tag>Продукт</Tag>
                  <Tag>Ручные переходы</Tag>
                  <Tag>Нет единой логики маршрута</Tag>
                  <Tag>Нет стандартизированной воронки</Tag>
                </div>

                <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                  <p>
                    Связка между маркетингом, продажами и продуктом существует,
                    но пока не собрана в одну предсказуемую систему. Каждый
                    следующий этап требует дополнительных ручных усилий и
                    объяснений.
                  </p>
                  <p className="text-white">
                    Вывод: разрыв возникает в передаче лида в выручку.
                  </p>
                </div>
              </BlockCard>

              <BlockCard index="2.4" title="Каналы" accent="yellow">
                <div>
                  <div className="text-sm text-white/45">Основной драйвер</div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    Личный бренд / органика
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-medium text-[#ffe27a]">
                      Возможности
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
                      <li>Высокое доверие к экспертности</li>
                      <li>Тёплый вход и короткий путь до интереса</li>
                      <li>Сильная органическая конверсия в диалог</li>
                      <li>Низкая стоимость первичного внимания</li>
                    </ul>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-medium text-[#ffe27a]">
                      Ограничения
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
                      <li>Зависимость от видимости и энергии фаундера</li>
                      <li>Слабая масштабируемость без системы дистрибуции</li>
                      <li>Высокий риск просадки при выпадении канала</li>
                      <li>Трудно отделить бренд от операционной нагрузки</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6 text-base leading-7 text-white/76">
                  Канал силён как источник доверия и первичного спроса, но опасен
                  как единственная опора роста. Пока бизнес не диверсифицирует
                  систему привлечения, масштаб будет ограничен ресурсом одного
                  человека.
                </p>
              </BlockCard>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
              <BlockCard index="2.5" title="Аналитика" accent="yellow">
                <div className="space-y-4 text-base leading-7 text-white/76">
                  <p>
                    Управление уже частично опирается на данные, но сквозной
                    системы, в которой в реальном времени видны unit-экономика,
                    загрузка, конверсия по этапам и эффективность каналов, пока
                    нет.
                  </p>
                  <p>
                    Из-за этого часть решений остаётся реактивной: проблема
                    распознаётся по напряжению внутри системы, а не по ранним
                    количественным сигналам.
                  </p>
                  <p className="text-white">
                    Вывод: решения принимаются в смешанной модели — между
                    данными и интуицией.
                  </p>
                </div>
              </BlockCard>

              <SummaryPanel title="Итог блока">
                <div className="space-y-5">
                  <div>
                    <div className="text-sm text-white/45">Главный bottleneck</div>
                    <div className="mt-2 text-lg font-medium text-white">
                      Processing capacity + founder dependency
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/45">Тип ограничения</div>
                    <div className="mt-2 text-lg font-medium text-white">
                      Операционно-управленческое
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/45">
                      Где теряются деньги
                    </div>
                    <div className="mt-2 text-lg font-medium text-white">
                      Между входящим спросом и возможностью его обработать.
                    </div>
                  </div>
                </div>
              </SummaryPanel>
            </div>
          </SectionShell>

          <SectionShell
            id="solution"
            eyebrow="03"
            title="SOLUTION"
            subtitle="Определение ключевого изменения в модели бизнеса, которое способно дать максимальный эффект на выручку, прибыль и управляемость бизнеса в текущем контексте."
          >
            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <BlockCard
                index="3.1"
                title="Primary Growth Lever"
                accent="blue"
              >
                <div className="flex flex-wrap gap-2">
                  <Tag tone="yellow">Snapshot as entry point</Tag>
                  <Tag tone="blue">standardized funnel</Tag>
                  <Tag>automation layer</Tag>
                </div>

                <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                  <p>
                    Главный рычаг роста — перестройка входа в модель. Текущий
                    спрос нужно переводить в стандартизированный продуктовый
                    маршрут, где первый шаг понятен, быстрый и масштабируемый.
                  </p>
                  <p className="text-white">
                    Приоритет: продуктизировать вход и убрать зависимость первой
                    конверсии от ручного объяснения ценности.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <MetricTile label="Рычаг" value="Entry product" />
                  <MetricTile label="Скорость эффекта" value="High" />
                  <MetricTile label="Сложность запуска" value="Medium" />
                </div>
              </BlockCard>

              <BlockCard
                index="3.2 / 3.3"
                title="Revenue Loss Source + Model Change Recommendation"
                accent="blue"
              >
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
                      Snapshot → Calendar → Strategy
                    </div>
                    <div className="mt-3 text-sm leading-6 text-white/60">
                      Быстрый вход, выше конверсия, предсказуемая передача
                      клиента вверх по модели.
                    </div>
                  </div>
                </div>
              </BlockCard>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
              <BlockCard
                index="3.4 / 3.5"
                title="Strategic Priority + Business Impact"
                accent="blue"
              >
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "3m", label: "3 months" },
                    { key: "6m", label: "6 months" },
                    { key: "12m", label: "12 months" },
                  ].map((tab) => {
                    const active = horizon === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setHorizon(tab.key as "3m" | "6m" | "12m")}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm transition",
                          active
                            ? "border-[#f7d237]/30 bg-[#f7d237]/12 text-[#ffe27a]"
                            : "border-white/10 bg-white/5 text-white/72 hover:bg-white/8"
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-5">
                  {horizonData.metrics.map((item) => (
                    <CompareBar
                      key={item.label}
                      label={item.label}
                      before={item.before}
                      after={item.after}
                    />
                  ))}
                </div>

                <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                  На выбранном горизонте видно, как меняется не одна метрика, а
                  целый набор взаимосвязанных показателей: конверсия, обработка
                  спроса, управляемость и повторные продажи.
                </div>
              </BlockCard>

              <BlockCard
                index="3.5"
                title="Business Impact"
                accent="blue"
              >
                <ImpactBars items={horizonData.impact} />

                <div className="mt-8 text-base leading-7 text-white/76">
                  Предложенное изменение влияет одновременно на выручку,
                  скорость прохождения клиента, нагрузку команды и общую
                  управляемость бизнеса. Самый ранний эффект проявляется в
                  конверсии и обработке спроса, более глубокий — в LTV и
                  устойчивости всей модели.
                </div>
              </BlockCard>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
              <BlockCard
                index="3.6"
                title="Implementation Conditions"
                accent="blue"
              >
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
              </BlockCard>

              <SummaryPanel title="Логика блока 3">
                <div className="space-y-4 text-base leading-7 text-white/82">
                  <p>
                    Где главный рычаг → где теряются деньги → какое изменение в
                    модели нужно внести → почему именно оно приоритетно → какой
                    эффект оно даст → что нужно, чтобы оно сработало.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag tone="yellow">growth lever</Tag>
                    <Tag tone="blue">model change</Tag>
                    <Tag>business impact</Tag>
                    <Tag>implementation conditions</Tag>
                  </div>
                </div>
              </SummaryPanel>
            </div>
          </SectionShell>

          <SectionShell
            id="jtbd"
            eyebrow="04"
            title="JTBD"
            subtitle="Структурированный план внедрения приоритетных изменений с разделением на этапы, зависимости, быстрые результаты и точки контроля."
          >
            <div className="grid gap-8 xl:grid-cols-[0.94fr_1.06fr]">
              <BlockCard
                index="4.1 / 4.2"
                title="Strategic Objective + Core JTBD"
                accent="blue"
              >
                <div className="space-y-5 text-base leading-7 text-white/76">
                  <p>
                    Главная цель внедрения — превратить входящий спрос в
                    предсказуемую выручку без пропорционального роста нагрузки на
                    фаундера и команду.
                  </p>
                  <p className="text-white">
                    Core JTBD: построить такой путь клиента, в котором первая
                    оплата, передача вверх по продуктам и контроль качества не
                    зависят от ручного героизма.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <MetricTile label="Цель" value="Scaleable revenue" />
                  <MetricTile label="Ключевая работа" value="Systemize conversion" />
                  <MetricTile label="Результат" value="Less manual load" />
                </div>
              </BlockCard>

              <BlockCard
                index="4.3 / 4.4"
                title="Workstreams + Phase Logic"
                accent="blue"
              >
                <div className="flex flex-wrap gap-2">
                  <Tag tone="yellow">маркетинг</Tag>
                  <Tag tone="blue">продукт</Tag>
                  <Tag>продажи</Tag>
                  <Tag>операционка</Tag>
                  <Tag>аналитика</Tag>
                  <Tag>управление</Tag>
                </div>

                <div className="mt-6 text-base leading-7 text-white/76">
                  Внедрение нельзя запускать как один длинный список задач. Это
                  несколько отдельных потоков работ, которые должны идти
                  синхронно, но в правильной логике: сначала стабилизация входа,
                  затем систематизация маршрута, затем масштабирование.
                </div>
              </BlockCard>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                4.5 / 4.6 / 4.7
              </div>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                First Priority Actions + Structural Changes + Dependencies
              </h3>

              <div className="mt-6 grid gap-5 xl:grid-cols-3">
                <TimelinePhase
                  phase="Phase 01"
                  period="Weeks 1–4"
                  title="Stabilize entry"
                  actions={[
                    "Упаковать Snapshot как понятный первый продукт",
                    "Сократить путь до первой ценности",
                    "Убрать ручные разрывы на первом касании",
                  ]}
                />
                <TimelinePhase
                  phase="Phase 02"
                  period="Weeks 5–10"
                  title="Build conversion system"
                  actions={[
                    "Собрать маршрут Snapshot → Calendar → Strategy",
                    "Распределить ownership между ролями",
                    "Включить базовые точки аналитики по этапам",
                  ]}
                />
                <TimelinePhase
                  phase="Phase 03"
                  period="Weeks 11–24"
                  title="Scale and retain"
                  actions={[
                    "Добавить retention-слой и повторные маршруты",
                    "Тестировать channel diversification",
                    "Усилить регулярный операционный контроль",
                  ]}
                />
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                Логика зависимости простая: нельзя масштабировать трафик, пока
                не стабилизирован вход; нельзя масштабировать delivery, пока не
                понятен маршрут клиента; нельзя рассчитывать на LTV, пока не
                существует пост-покупочного слоя.
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
              <BlockCard
                index="4.8 / 4.9"
                title="Resources, Ownership & Control Points"
                accent="blue"
              >
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

                <div className="mt-6 text-base leading-7 text-white/76">
                  Контрольные точки должны появляться раньше, чем итоговый
                  эффект в выручке. Это даёт возможность проверять, работает ли
                  стратегия, до того как пройдёт полный цикл монетизации.
                </div>
              </BlockCard>

              <BlockCard
                index="4.10"
                title="Expected Outcome by Horizon"
                accent="blue"
              >
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
              </BlockCard>
            </div>

            <SummaryPanel title="JTBD Summary">
              <div className="space-y-6">
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
            </SummaryPanel>
          </SectionShell>
        </div>
      </div>
    </main>
  );
}
