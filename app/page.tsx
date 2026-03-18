"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CaseItem = {
  stage: string;
  niche: string[];
  intro: string;
  challenge: string;
  outcomeTitle: string;
  numbers: { label: string; value: string; delta: number }[];
  bars: { label: string; fact: number; target: number }[];
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function pct(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${Math.round(n)}%`;
}

function normalizeDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/^0+(?=\d)/, "");
}

function parseNumeric(value: string, fallback = 0) {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function metricTone(delta: number, invert = false) {
  if (invert) {
    if (delta < 0) return "good";
    if (delta > 0) return "bad";
  } else {
    if (delta > 0) return "good";
    if (delta < 0) return "bad";
  }
  return "neutral";
}

function Header({ activeId }: { activeId: string }) {
  const nav = [
    { id: "hero", label: "Блок 1" },
    { id: "preview", label: "Блок 2" },
    { id: "goals", label: "Блок 3" },
    { id: "cases", label: "Блок 4" },
    { id: "analysis", label: "Блок 5" },
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#hero" className="brand-mark" aria-label="Revenue Snapshot">
          <img src="/logo.svg" alt="Growth Avenue" />
        </a>

        <nav className="site-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? "nav-link is-active" : "nav-link"}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="https://t.me/growth_avenue_company" className="header-chip">
            TG
          </a>
          <a href="#try" className="header-cta">
            Попробовать Snapshot
          </a>
        </div>
      </div>
    </header>
  );
}

function SectionHead({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-head">
      <div className="section-kicker">{kicker}</div>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function PreviewMetric({
  title,
  value,
  delta,
  invert = false,
}: {
  title: string;
  value: string;
  delta: number;
  invert?: boolean;
}) {
  return (
    <div className="glass-card preview-metric">
      <div className="preview-metric-top">
        <span>{title}</span>
        <span className={`metric-pill ${metricTone(delta, invert)}`}>{pct(delta)}</span>
      </div>
      <strong>{value}</strong>
    </div>
  );
}

function SliderCard({
  title,
  hint,
  value,
  onChange,
}: {
  title: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="glass-card slider-card-v2">
      <div className="slider-copy">
        <div className="slider-title">{title}</div>
        <div className="slider-hint">{hint}</div>
      </div>
      <input
        className="range-input"
        type="range"
        min="-0.3"
        max="0.3"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="slider-value">{Math.round(value * 100)}%</div>
    </div>
  );
}

function GoalCard({
  tab,
  title,
  text,
  bottomGlow = false,
}: {
  tab: string;
  title: string;
  text: string;
  bottomGlow?: boolean;
}) {
  return (
    <div className="goal-card tilt-card">
      <div className={`goal-card-inner tilt-inner glass-card ${bottomGlow ? "has-bottom-glow" : ""}`}>
        <div className="goal-tab">{tab}</div>
        <div className="goal-title">{title}</div>
        <div className="goal-text">{text}</div>
        {bottomGlow ? (
          <div className="goal-bottom-glow" aria-hidden="true">
            <div className="goal-bottom-glow-core" />
            <div className="goal-bottom-glow-shine" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CaseStageCard({ item, isActive }: { item: CaseItem; isActive: boolean }) {
  return (
    <article className={isActive ? "case-stage-card is-active" : "case-stage-card"}>
      <div className="case-stage-card-top">
        <div>
          <div className="case-stage-label">Stage</div>
          <div className="case-stage-name">{item.stage}</div>
        </div>
        <div className="case-niches">
          {item.niche.map((tag) => (
            <span key={tag} className="case-niche-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="case-stage-card-copy">
        <div>
          <div className="case-copy-title">Исходная точка</div>
          <p>{item.intro}</p>
        </div>
        <div>
          <div className="case-copy-title">Фокус Snapshot</div>
          <p>{item.challenge}</p>
        </div>
      </div>

      <div className="case-stage-card-bottom">
        <div className="case-outcome-head">
          <span>Результат</span>
          <strong>{item.outcomeTitle}</strong>
        </div>

        <div className="case-numbers-grid">
          {item.numbers.map((metric) => (
            <div key={metric.label} className="case-number-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small className={metric.delta >= 0 ? "good" : "bad"}>{pct(metric.delta)}</small>
            </div>
          ))}
        </div>

        <div className="case-bars-wrap">
          {item.bars.map((bar) => {
            const max = Math.max(bar.fact, bar.target, 1);
            return (
              <div key={bar.label} className="case-bar-group">
                <div className="case-bar-meta">
                  <span>{bar.label}</span>
                  <span>
                    факт {bar.fact} / цель {bar.target}
                  </span>
                </div>
                <div className="case-bar-track case-bar-track-top">
                  <div className="case-bar-fill case-bar-fill-fact" style={{ width: `${(bar.fact / max) * 100}%` }} />
                </div>
                <div className="case-bar-track">
                  <div className="case-bar-fill case-bar-fill-target" style={{ width: `${(bar.target / max) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function CasesCarousel() {
  const items: CaseItem[] = [
    {
      stage: "Seed",
      niche: ["HealthTech", "SaaS"],
      intro:
        "Первые пилоты уже показали интерес, но команда не понимала, где именно теряется скорость: в структуре оффера, в цикле сделки или в unit-экономике входа.",
      challenge:
        "Snapshot показал, что проблема не в спросе, а в неупакованном пилотном предложении и слишком тяжёлом входе для клиник.",
      outcomeTitle: "Сформирован входной MVP для пилота",
      numbers: [
        { label: "Пилоты", value: "6 → 11", delta: 83 },
        { label: "Цикл сделки", value: "41 → 26 дн.", delta: -37 },
        { label: "Conversion", value: "18% → 29%", delta: 61 },
      ],
      bars: [
        { label: "Leads → Demo", fact: 8, target: 14 },
        { label: "Demo → Pilot", fact: 3, target: 5 },
      ],
    },
    {
      stage: "Startup",
      niche: ["FinTech", "E-com"],
      intro:
        "Выручка уже была, но рост происходил неровно: команда гнала объём, не понимая, какие сегменты тянут CAC вверх и почему часть каналов перестала окупаться.",
      challenge:
        "Snapshot разложил экономику по каналам и подсветил главный рычаг: смещение фокуса в платёжеспособный сегмент и выравнивание среднего чека.",
      outcomeTitle: "Пересобран канал роста без перегрева бюджета",
      numbers: [
        { label: "CAC", value: "$91 → $63", delta: -31 },
        { label: "AOV", value: "$148 → $196", delta: 32 },
        { label: "ROMI", value: "+18 п.п.", delta: 18 },
      ],
      bars: [
        { label: "Qualified leads", fact: 32, target: 45 },
        { label: "Deals", fact: 9, target: 14 },
      ],
    },
    {
      stage: "Growth",
      niche: ["SaaS", "B2B", "EdTech"],
      intro:
        "На этапе роста продукт уже доказал ценность, но дальнейшее масштабирование упиралось в разрыв между продажами, повторными покупками и операционной нагрузкой.",
      challenge:
        "Snapshot показал, что узкое место — не лидогенерация, а связка позиционирования, сегментации и загрузки команды на длинных сделках.",
      outcomeTitle: "Выделен самый прибыльный сегмент и рычаг масштаба",
      numbers: [
        { label: "MRR", value: "$42k → $57k", delta: 36 },
        { label: "Gross profit", value: "+$9.4k", delta: 28 },
        { label: "Load", value: "−17%", delta: 17 },
      ],
      bars: [
        { label: "SQL → Proposal", fact: 17, target: 24 },
        { label: "Proposal → Deal", fact: 6, target: 9 },
      ],
    },
    {
      stage: "Expansion",
      niche: ["B2B", "HealthTech", "E-com"],
      intro:
        "Бизнес выходил в новые направления, но не видел, какой сценарий масштабирования съедает маржу и где экономика начинает ломаться раньше роста.",
      challenge:
        "Snapshot собрал карту сегментов и показал, в каких продуктах расширение усиливает доход, а где оно создаёт только видимость роста.",
      outcomeTitle: "Убраны убыточные сценарии расширения",
      numbers: [
        { label: "Маржа", value: "24% → 31%", delta: 29 },
        { label: "Opex", value: "−12%", delta: 12 },
        { label: "Net revenue", value: "+$18k", delta: 22 },
      ],
      bars: [
        { label: "Новые сегменты", fact: 2, target: 3 },
        { label: "Окупаемые гипотезы", fact: 4, target: 6 },
      ],
    },
  ];

  const [active, setActive] = useState(2);
  const startX = useRef<number | null>(null);

  const goTo = (next: number) => {
    const total = items.length;
    setActive((next + total) % total);
  };

  return (
    <div className="cases-shell">
      <div className="cases-topline">
        <div className="cases-industry-filter">
          {Array.from(new Set(items.flatMap((item) => item.niche))).map((tag) => (
            <span key={tag} className={items[active].niche.includes(tag) ? "industry-pill is-active" : "industry-pill"}>
              {tag}
            </span>
          ))}
        </div>

        <div className="case-controls">
          <button className="case-arrow" onClick={() => goTo(active - 1)} aria-label="Предыдущий кейс">
            ←
          </button>
          <button className="case-arrow" onClick={() => goTo(active + 1)} aria-label="Следующий кейс">
            →
          </button>
        </div>
      </div>

      <div
        className="cases-carousel"
        onTouchStart={(e) => {
          startX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (startX.current === null) return;
          const delta = e.changedTouches[0].clientX - startX.current;
          if (delta > 40) goTo(active - 1);
          if (delta < -40) goTo(active + 1);
          startX.current = null;
        }}
      >
        {items.map((item, index) => {
          const offset = index - active;
          const abs = Math.abs(offset);
          const translateX = offset * 68;
          const scale = index === active ? 1 : 0.88 - abs * 0.05;
          const opacity = index === active ? 1 : 0.36;
          const zIndex = items.length - abs;
          return (
            <button
              type="button"
              key={item.stage}
              className="cases-card-button"
              style={{ zIndex }}
              onClick={() => setActive(index)}
            >
              <div
                className="cases-card-transform"
                style={{
                  transform: `translateX(${translateX}%) scale(${scale})`,
                  opacity,
                }}
              >
                <CaseStageCard item={item} isActive={index === active} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="case-dots">
        {items.map((item, index) => (
          <button
            key={item.stage}
            aria-label={item.stage}
            className={index === active ? "case-dot is-active" : "case-dot"}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}

function SnapshotMap() {
  const blocks = [
    { label: "Позиционирование", span: "wide", note: "27%" },
    { label: "Структура", span: "wide", note: "27%" },
    { label: "Экономика", span: "medium", note: "18%" },
    { label: "Клиенты", span: "small", note: "14%" },
    { label: "Продукт", span: "small", note: "14%" },
  ];

  return (
    <div className="snapshot-map-card">
      <h3 className="analysis-left-title">Из чего собирается гипотеза Snapshot</h3>
      <p className="snapshot-builder-copy">
        Мы не собираем ответы ради красивого отчёта. Каждый блок влияет на то,
        какие ограничения будут найдены, какие рычаги роста подсвечены и что
        именно попадёт в платную версию как план усиления.
      </p>

      <div className="snapshot-map-grid">
        {blocks.map((block) => (
          <div key={block.label} className={`snapshot-map-item ${block.span}`}>
            <span className="snapshot-map-note">{block.note}</span>
            <strong>{block.label}</strong>
            <small>
              {block.label === "Позиционирование" && "Что обещаете рынку и почему вам должны верить."}
              {block.label === "Структура" && "Как устроен бизнес, где возникает трение и кто влияет на деньги."}
              {block.label === "Экономика" && "Маржа, стоимость продаж, операционная нагрузка и денежные потоки."}
              {block.label === "Клиенты" && "Кто приносит выручку, возвращается и окупает усилия команды."}
              {block.label === "Продукт" && "Что именно продаётся, где скрыт рост и где ломается ценность."}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferCard({ title, icon, price, href, caption }: { title: string; icon: string; price: string; href: string; caption: string }) {
  return (
    <div className="offer-card tilt-card">
      <div className="offer-card-inner tilt-inner">
        <div className="offer-top">
          <img src={icon} alt="" className="offer-icon" />
          <div>
            <div className="offer-title">{title}</div>
            <div className="offer-caption">{caption}</div>
          </div>
        </div>
        <div className="offer-bottom">
          <div className="offer-price">{price}</div>
          <a href={href} className="tg-gradient-btn">
            Перейти
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">Revenue Snapshot</div>
        <div className="footer-links">
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="https://t.me/growth_avenue_company">Telegram</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [clientsInput, setClientsInput] = useState("20");
  const [checkInput, setCheckInput] = useState("2000");
  const [sales, setSales] = useState(0);
  const [retention, setRetention] = useState(0);
  const [upsell, setUpsell] = useState(0);
  const [opexEff, setOpexEff] = useState(0);
  const [activeId, setActiveId] = useState("hero");
  const [cursor, setCursor] = useState({ x: -240, y: -240 });
  const frameRef = useRef<number | null>(null);

  const clientsBase = parseNumeric(clientsInput, 0);
  const checkBase = parseNumeric(checkInput, 0);

  useEffect(() => {
    const sections = ["hero", "preview", "goals", "cases", "analysis", "try"];
    const observers = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
    );

    observers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setCursor({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const cleanups: Array<() => void> = [];

    tiltCards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>(".tilt-inner");
      if (!inner) return;

      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 8;
        const rotateX = (0.5 - py) * 8;
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      };

      const handleLeave = () => {
        inner.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const base = useMemo(() => {
    const revenue = clientsBase * checkBase;
    const salesCost = revenue * 0.18;
    const support = revenue * 0.06;
    const opex = revenue * 0.35;
    const costs = salesCost + support + opex;
    const profit = revenue - costs;

    return { revenue, salesCost, support, opex, costs, profit };
  }, [clientsBase, checkBase]);

  const data = useMemo(() => {
    const safeClients = Math.max(0, clientsBase);
    const safeCheck = Math.max(0, checkBase);
    const newClients = safeClients * (1 + sales * 0.6);
    const retainedRevenueLift = 1 + retention * 0.35;
    const avgCheck = safeCheck * (1 + upsell * 0.7);
    const revenue = newClients * avgCheck * retainedRevenueLift;
    const salesCost = revenue * 0.18 * (1 + sales * 0.4);
    const support = revenue * 0.06 * (1 + retention * 0.25);
    const opex = revenue * 0.35 * (1 - opexEff * 0.8);
    const costs = salesCost + support + opex;
    const profit = revenue - costs;

    return { clients: newClients, avgCheck, revenue, salesCost, support, opex, costs, profit };
  }, [clientsBase, checkBase, sales, retention, upsell, opexEff]);

  const safeDiv = (n: number, d: number) => (d === 0 ? 0 : (n / d) * 100);
  const deltas = {
    revenue: safeDiv(data.revenue - base.revenue, base.revenue),
    costs: safeDiv(data.costs - base.costs, base.costs),
    profit: safeDiv(data.profit - base.profit, base.profit),
  };

  return (
    <main className="landing-shell">
      <Header activeId={activeId} />

      <div
        className="cursor-glow"
        style={{ transform: `translate3d(${cursor.x - 120}px, ${cursor.y - 120}px, 0)` }}
      />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="line-grid" />
      <div className="vignette" />

      <div className="page-wrap">
        <section id="hero" className="hero-shell">
          <div className="hero-copy">
            <div className="section-kicker">Revenue Snapshot</div>
            <h1 className="hero-title">
              Показываем бесплатный слой так, чтобы стало интересно,
              <span> что именно скрыто в полной версии.</span>
            </h1>
            <p className="hero-text">
              Landing page не должна пересказывать всю услугу. Она должна дать
              почувствовать логику Snapshot, подсветить глубину анализа и оставить
              ощущение, что основная ценность начинается сразу после оплаты.
            </p>
            <div className="hero-tags">
              <span className="hero-tag is-active">Экономика</span>
              <span className="hero-tag">Рычаги роста</span>
              <span className="hero-tag">Гипотеза</span>
            </div>
            <div className="hero-actions">
              <a href="#preview" className="tg-gradient-btn">
                Смотреть превью
              </a>
              <a href="#try" className="hero-secondary-btn">
                Полная версия
              </a>
            </div>
          </div>

          <div className="glass-card hero-panel">
            <div className="hero-panel-topline">
              <span>Preview Layer</span>
              <span>Interactive</span>
            </div>
            <div className="hero-panel-grid">
              <div className="hero-stat-card">
                <small>Revenue</small>
                <strong>{fmtMoney(data.revenue)}</strong>
                <span>{pct(deltas.revenue)}</span>
              </div>
              <div className="hero-stat-card">
                <small>Costs</small>
                <strong>{fmtMoney(data.costs)}</strong>
                <span>{pct(deltas.costs)}</span>
              </div>
              <div className="hero-stat-card wide">
                <small>Что видно бесплатно</small>
                <strong>Сдвиг метрик и главный контраст</strong>
                <span>Но без полной декомпозиции приоритетов и плана.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="preview" className="content-section">
          <SectionHead
            kicker="Интерактивное превью"
            title="Бесплатный слой показывает контраст. Платный — объясняет, почему он появляется."
            copy="Пользователь видит, как меняются деньги и где появляется потенциал. Но выводы, логика ограничений и решение остаются за пределами превью."
          />

          <div className="preview-grid">
            <div className="preview-main">
              <div className="preview-inputs-row">
                <label className="glass-card input-card">
                  <span>Клиентов / месяц</span>
                  <input
                    value={clientsInput}
                    onChange={(e) => setClientsInput(normalizeDigits(e.target.value))}
                    inputMode="numeric"
                  />
                </label>
                <label className="glass-card input-card">
                  <span>Средний чек</span>
                  <input
                    value={checkInput}
                    onChange={(e) => setCheckInput(normalizeDigits(e.target.value))}
                    inputMode="numeric"
                  />
                </label>
              </div>

              <div className="preview-metrics-grid">
                <PreviewMetric title="Выручка" value={fmtMoney(data.revenue)} delta={deltas.revenue} />
                <PreviewMetric title="Прибыль" value={fmtMoney(data.profit)} delta={deltas.profit} />
                <PreviewMetric title="Расходы" value={fmtMoney(data.costs)} delta={deltas.costs} invert />
              </div>

              <div className="sliders-grid">
                <SliderCard title="Эффективность продаж" hint="Влияет на объём клиентов и на sales cost." value={sales} onChange={setSales} />
                <SliderCard title="Повторные продажи" hint="Повышает выручку за счёт возвратов и retention." value={retention} onChange={setRetention} />
                <SliderCard title="Средний чек" hint="Показывает эффект монетизации и upsell." value={upsell} onChange={setUpsell} />
                <SliderCard title="Загрузка команды" hint="Отражает влияние на opex и операционную эффективность." value={opexEff} onChange={setOpexEff} />
              </div>
            </div>

            <aside className="glass-card preview-aside">
              <div className="preview-aside-kicker">Что человек видит сейчас</div>
              <div className="preview-aside-title">Оценочный резерв</div>
              <div className="preview-aside-money">
                {fmtMoney(Math.max(0, Math.round((data.revenue - base.revenue) * 0.55 + (data.profit - base.profit) * 0.45)))}
              </div>
              <div className="preview-rows">
                <div>
                  <span>Выручка</span>
                  <strong>{pct(deltas.revenue)}</strong>
                </div>
                <div>
                  <span>Расходы</span>
                  <strong>{pct(deltas.costs)}</strong>
                </div>
                <div>
                  <span>Прибыль</span>
                  <strong>{pct(deltas.profit)}</strong>
                </div>
              </div>
              <p className="preview-aside-copy">
                В платной версии на этом месте появляется объяснение: какой именно
                блок бизнеса создаёт резерв, почему он возник и что нужно менять в
                первую очередь.
              </p>
              <a href="#try" className="tg-gradient-btn preview-aside-btn">
                Перейти к полной версии
              </a>
            </aside>
          </div>
        </section>

        <section id="goals" className="content-section">
          <SectionHead
            kicker="Цели Revenue Snapshot"
            title="Человек должен увидеть не просто красивые карточки, а почувствовать разницу между демонстрацией и настоящей стратегической глубиной."
            copy="Тексты и логика карточек сохранены, но сам блок стал чище, собраннее и ближе к продуктовой подаче, где интрига строится через недосказанность, а не через перегруз."
          />

          <div className="goals-grid">
            <GoalCard
              tab="EXECUTIVE SUMMARY"
              title="Executive Summary"
              text="Краткая сборка ключевой ситуации бизнеса, чтобы сразу было видно, на чём держится текущая выручка и где прячется ограничение роста."
            />
            <GoalCard
              tab="GROWTH LIMIT"
              title="Key Conclusions"
              text="Ключевые выводы из фактов о компании определяют, как достичь текущей цели бизнеса. Формируется управленческий вывод об экономической модели."
            />
            <GoalCard
              tab="SOLUTION"
              title="Strategy&Practice"
              text="Проведённый анализ данных определяет первичную задачу: целью всегда является повышение дохода."
            />
            <GoalCard
              tab="JTBD"
              title="RoadMap"
              text="Тезисный план действий на следующие 6 месяцев по запуску конкретного MVP."
              bottomGlow
            />
          </div>
        </section>

        <section id="cases" className="content-section cases-section">
          <SectionHead
            kicker="Где Revenue Snapshot показал результат"
            title="Карусель теперь показывает не просто стадию, а законченный срез кейса: вводные сверху, измеримый результат снизу, а ниши остаются привязанными к фронтовой карточке."
            copy="Логика блока стала ближе к product showcase: фронтовая карточка продаёт глубину кейса, соседние создают интригу, но не спорят с главным фокусом."
          />
          <CasesCarousel />
        </section>

        <section id="analysis" className="content-section analysis-section">
          <SectionHead
            kicker="Как строится Snapshot"
            title="Не анкета, а карта сигналов, из которых собирается гипотеза роста."
            copy="Размер блоков здесь не декоративный. Он показывает, где для нас больше веса при построении гипотезы, где находятся деньги и какие ответы сильнее всего влияют на платную версию результата."
          />

          <div className="analysis-grid-v2">
            <SnapshotMap />
            <div className="analysis-right-card">
              <div className="start-cards-row-v2">
                <OfferCard
                  title="Страт сессия"
                  icon="/stratsession.svg"
                  price="$770"
                  href="https://t.me/growth_avenue_company"
                  caption="Разбор ситуации с командой и приоритизация гипотез."
                />
                <OfferCard
                  title="Playground"
                  icon="/snapshot.svg"
                  price="$114"
                  href="#"
                  caption="Самостоятельное прохождение Snapshot и доступ к полной версии."
                />
              </div>
            </div>
          </div>
        </section>

        <section id="try" className="content-section cta-section">
          <div className="glass-card cta-card-v2">
            <div>
              <div className="section-kicker">Полная версия</div>
              <h2 className="section-title small-top">
                Бесплатно вы видите контур. После оплаты открывается логика
                решения.
              </h2>
              <p className="section-copy limited">
                Полная версия показывает не только сдвиг метрик, но и приоритеты,
                управленческие выводы, структуру ограничений и рабочий план на
                следующий шаг.
              </p>
            </div>
            <div className="cta-card-box">
              <div className="cta-card-label">Следующий шаг</div>
              <div className="cta-card-title">Получить Revenue Snapshot</div>
              <a href="#" className="tg-gradient-btn">
                Оплатить и открыть полную версию
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        :root {
          --bg: #041027;
          --bg-2: #0b1d3a;
          --fg: rgba(255, 255, 255, 0.96);
          --muted: rgba(255, 255, 255, 0.68);
          --line: rgba(255, 255, 255, 0.1);
          --line-2: rgba(255, 255, 255, 0.14);
          --glass: linear-gradient(180deg, rgba(224, 225, 227, 0.11) 0%, rgba(224, 225, 227, 0.06) 100%);
          --yellow: #f7d237;
          --yellow-soft: rgba(247, 210, 55, 0.22);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--fg);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        a { color: inherit; text-decoration: none; }
        button, input { font: inherit; }
        img { display: block; max-width: 100%; }

        .landing-shell {
          position: relative;
          overflow: clip;
          min-height: 100vh;
          background: var(--bg);
        }

        .page-wrap {
          width: min(1260px, calc(100vw - 32px));
          margin: 0 auto;
          padding: 104px 0 48px;
          position: relative;
          z-index: 2;
        }

        .content-section { margin-top: 104px; }
        .section-head { max-width: 960px; margin-bottom: 26px; }
        .section-kicker {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(247, 210, 55, 0.24);
          background: rgba(247, 210, 55, 0.08);
          color: var(--yellow);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .section-title {
          margin: 14px 0 0;
          font-size: clamp(32px, 5vw, 60px);
          line-height: 0.98;
          letter-spacing: -0.06em;
          font-weight: 700;
        }
        .section-title.small-top { margin-top: 16px; }
        .section-copy {
          margin: 18px 0 0;
          max-width: 760px;
          font-size: 16px;
          line-height: 1.72;
          color: var(--muted);
        }
        .section-copy.limited { max-width: 620px; }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 40;
          padding: 12px 16px 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .site-header-inner {
          width: min(1260px, calc(100vw - 32px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
          min-height: 72px;
          padding: 10px 14px;
          border: 1px solid var(--line-2);
          border-radius: 24px;
          background: rgba(4, 16, 39, 0.68);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
        }
        .brand-mark {
          display: inline-flex;
          width: 112px;
          opacity: 0.96;
        }
        .site-nav {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .nav-link {
          padding: 10px 14px;
          border-radius: 999px;
          color: rgba(255,255,255,0.58);
          transition: 0.25s ease;
        }
        .nav-link:hover,
        .nav-link.is-active {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }
        .header-actions { display: flex; gap: 10px; align-items: center; }
        .header-chip,
        .header-cta,
        .hero-secondary-btn,
        .case-arrow,
        .case-dot {
          transition: 0.22s ease;
        }
        .header-chip {
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid var(--line-2);
          color: rgba(255,255,255,0.84);
        }
        .header-cta,
        .hero-secondary-btn {
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          color: #fff;
        }
        .header-cta:hover,
        .hero-secondary-btn:hover,
        .header-chip:hover,
        .case-arrow:hover,
        .case-dot:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.22);
        }

        .cursor-glow {
          position: fixed;
          inset: 0 auto auto 0;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle, rgba(247,210,55,0.16) 0%, rgba(247,210,55,0.08) 40%, transparent 72%);
          filter: blur(24px);
          mix-blend-mode: screen;
        }
        .aurora,
        .line-grid,
        .vignette {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .aurora {
          filter: blur(70px);
          opacity: 0.34;
          animation: drift 18s ease-in-out infinite;
        }
        .aurora-a { background: radial-gradient(circle at 18% 24%, rgba(91, 168, 255, 0.22), transparent 32%); }
        .aurora-b { background: radial-gradient(circle at 82% 18%, rgba(247, 210, 55, 0.18), transparent 30%); animation-duration: 22s; }
        .aurora-c { background: radial-gradient(circle at 58% 78%, rgba(156, 109, 255, 0.16), transparent 36%); animation-duration: 26s; }
        .line-grid {
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.8), transparent 82%);
        }
        .vignette {
          background: radial-gradient(circle at center, transparent 46%, rgba(4,16,39,0.72) 100%);
        }

        .glass-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          background: var(--glass);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 20px 54px rgba(0,0,0,0.18);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
        }
        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0.1), transparent 24%, rgba(255,255,255,0.04) 55%, transparent 78%);
          opacity: 0.55;
          pointer-events: none;
        }

        .hero-shell {
          min-height: calc(100vh - 140px);
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          align-items: end;
          gap: 28px;
          padding-top: 26px;
        }
        .hero-title {
          margin: 18px 0 0;
          max-width: 820px;
          font-size: clamp(40px, 7vw, 92px);
          line-height: 0.94;
          letter-spacing: -0.075em;
          font-weight: 700;
        }
        .hero-title span { color: rgba(255,255,255,0.72); }
        .hero-text {
          max-width: 640px;
          margin: 24px 0 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.75;
        }
        .hero-tags,
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }
        .hero-tag {
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid var(--line-2);
          color: rgba(255,255,255,0.72);
          background: rgba(255,255,255,0.04);
        }
        .hero-tag.is-active {
          color: var(--bg-2);
          background: linear-gradient(135deg, rgba(247,210,55,0.96), rgba(247,210,55,0.84));
          border-color: rgba(247,210,55,0.45);
        }
        .hero-panel { padding: 18px; min-height: 420px; display: flex; flex-direction: column; justify-content: space-between; }
        .hero-panel-topline {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,0.56);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hero-panel-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: auto;
        }
        .hero-stat-card {
          border-radius: 24px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 138px;
        }
        .hero-stat-card.wide { grid-column: span 2; min-height: 176px; }
        .hero-stat-card small { color: rgba(255,255,255,0.54); font-size: 13px; }
        .hero-stat-card strong { font-size: clamp(24px, 3vw, 36px); line-height: 1; }
        .hero-stat-card span { color: rgba(255,255,255,0.68); line-height: 1.6; }

        .preview-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 18px;
          align-items: start;
        }
        .preview-main { display: grid; gap: 18px; }
        .preview-inputs-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .input-card { padding: 20px; display: grid; gap: 14px; }
        .input-card span { color: rgba(255,255,255,0.58); font-size: 13px; }
        .input-card input {
          background: transparent;
          border: 0;
          outline: none;
          color: #fff;
          font-size: clamp(28px, 5vw, 44px);
          letter-spacing: -0.05em;
          width: 100%;
        }
        .preview-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .preview-metric { padding: 18px; display: grid; gap: 18px; }
        .preview-metric-top { display: flex; justify-content: space-between; gap: 12px; align-items: center; }
        .preview-metric-top span:first-child { color: rgba(255,255,255,0.6); }
        .preview-metric strong { font-size: clamp(28px, 4vw, 44px); line-height: 0.95; }
        .metric-pill {
          padding: 8px 10px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid transparent;
        }
        .metric-pill.good { color: #b2f2cf; background: rgba(26, 127, 72, 0.16); border-color: rgba(167,243,208,0.16); }
        .metric-pill.bad { color: #ffc4cf; background: rgba(177, 29, 62, 0.16); border-color: rgba(253,164,175,0.18); }
        .metric-pill.neutral { color: rgba(255,255,255,0.64); background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.06); }

        .sliders-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .slider-card-v2 { padding: 18px; display: grid; gap: 14px; min-height: 190px; }
        .slider-title { font-weight: 600; }
        .slider-hint { margin-top: 8px; color: rgba(255,255,255,0.54); line-height: 1.6; font-size: 14px; }
        .range-input {
          width: 100%; appearance: none; background: transparent; cursor: pointer;
        }
        .range-input::-webkit-slider-runnable-track {
          height: 6px; border-radius: 999px; background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(247,210,55,0.54));
        }
        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none; width: 20px; height: 20px; margin-top: -7px; border-radius: 50%; background: #f7d237; border: 0; box-shadow: 0 0 0 6px rgba(247,210,55,0.16);
        }
        .slider-value { color: rgba(255,255,255,0.62); font-size: 13px; }
        .preview-aside {
          position: sticky; top: 96px; padding: 22px; display: grid; gap: 14px;
        }
        .preview-aside-kicker { color: rgba(255,255,255,0.54); text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; }
        .preview-aside-title { font-size: 18px; color: rgba(255,255,255,0.78); }
        .preview-aside-money { font-size: clamp(34px, 4vw, 52px); line-height: 0.92; letter-spacing: -0.06em; font-weight: 700; }
        .preview-rows { display: grid; gap: 12px; }
        .preview-rows div { display: flex; justify-content: space-between; gap: 12px; color: rgba(255,255,255,0.64); }
        .preview-rows strong { color: #fff; }
        .preview-aside-copy { color: rgba(255,255,255,0.64); line-height: 1.7; margin: 0; }
        .preview-aside-btn { margin-top: 6px; justify-content: center; }

        .goals-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .goal-card { perspective: 1400px; }
        .goal-card-inner { padding: 22px; min-height: 250px; transition: transform 0.18s ease-out; transform-style: preserve-3d; }
        .goal-tab {
          display: inline-flex;
          min-height: 28px;
          align-items: center;
          padding: 0 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.52);
          font-size: 11px;
          letter-spacing: 0.12em;
        }
        .goal-title { margin-top: 18px; font-size: 28px; line-height: 1.02; letter-spacing: -0.05em; font-weight: 600; }
        .goal-text { margin-top: 14px; color: rgba(255,255,255,0.68); line-height: 1.75; max-width: 92%; }
        .goal-card-inner.has-bottom-glow { padding-bottom: 54px; }
        .goal-bottom-glow {
          position: absolute; left: 20px; right: 20px; bottom: 18px; height: 22px; pointer-events: none;
        }
        .goal-bottom-glow-core {
          position: absolute; left: 0; right: 0; top: 9px; height: 3px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(247,210,55,0.4), rgba(247,210,55,1), rgba(255,226,122,0.9));
          box-shadow: 0 0 18px rgba(247,210,55,0.3);
        }
        .goal-bottom-glow-shine {
          position: absolute; top: 2px; width: 34%; height: 18px; border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.88), transparent);
          filter: blur(5px);
          animation: roadmapShine 5.6s ease-in-out infinite;
        }

        .cases-shell { display: grid; gap: 18px; }
        .cases-topline { display: flex; justify-content: space-between; gap: 16px; align-items: center; }
        .cases-industry-filter { display: flex; gap: 10px; flex-wrap: wrap; }
        .industry-pill {
          padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.48); background: rgba(255,255,255,0.04);
        }
        .industry-pill.is-active { color: var(--bg-2); background: linear-gradient(135deg, rgba(247,210,55,0.98), rgba(255,226,122,0.92)); border-color: rgba(247,210,55,0.32); }
        .case-controls { display: flex; gap: 10px; }
        .case-arrow {
          width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: #fff;
        }
        .cases-carousel {
          position: relative; min-height: 620px; perspective: 1400px; overflow: hidden;
        }
        .cases-card-button {
          position: absolute; inset: 0; background: transparent; border: 0; padding: 0; cursor: pointer;
        }
        .cases-card-transform {
          width: min(100%, 860px); height: 100%; margin: 0 auto; transition: transform 0.45s ease, opacity 0.35s ease;
        }
        .case-stage-card {
          height: 100%; border-radius: 34px; padding: 22px; background: linear-gradient(180deg, rgba(224,225,227,0.11), rgba(224,225,227,0.05)); border: 1px solid rgba(255,255,255,0.12); box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 30px 70px rgba(0,0,0,0.22); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); display: grid; grid-template-rows: auto auto 1fr; gap: 20px;
        }
        .case-stage-card.is-active { border-color: rgba(247,210,55,0.22); }
        .case-stage-card-top {
          display: flex; justify-content: space-between; gap: 16px; align-items: start;
        }
        .case-stage-label { color: rgba(255,255,255,0.48); text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; }
        .case-stage-name { margin-top: 10px; font-size: clamp(38px, 6vw, 74px); line-height: 0.92; letter-spacing: -0.08em; font-weight: 700; }
        .case-niches { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; max-width: 42%; }
        .case-niche-pill {
          padding: 8px 12px; border-radius: 999px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.82); border: 1px solid rgba(255,255,255,0.08);
        }
        .case-stage-card-copy {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px;
        }
        .case-stage-card-copy > div,
        .case-stage-card-bottom {
          border-radius: 24px; padding: 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
        }
        .case-copy-title,
        .case-outcome-head span { color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; }
        .case-stage-card-copy p { margin: 12px 0 0; color: rgba(255,255,255,0.72); line-height: 1.72; }
        .case-stage-card-bottom { display: grid; gap: 18px; }
        .case-outcome-head { display: flex; justify-content: space-between; gap: 12px; align-items: end; }
        .case-outcome-head strong { font-size: clamp(22px, 3vw, 30px); line-height: 1.08; max-width: 70%; }
        .case-numbers-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .case-number-card { border-radius: 18px; padding: 14px; background: rgba(4,16,39,0.34); border: 1px solid rgba(255,255,255,0.06); }
        .case-number-card span { color: rgba(255,255,255,0.5); font-size: 12px; }
        .case-number-card strong { display: block; margin-top: 8px; font-size: 24px; line-height: 1.02; }
        .case-number-card small { display: block; margin-top: 10px; }
        .case-number-card .good { color: #b2f2cf; }
        .case-number-card .bad { color: #ffc4cf; }
        .case-bars-wrap { display: grid; gap: 12px; }
        .case-bar-group { display: grid; gap: 8px; }
        .case-bar-meta { display: flex; justify-content: space-between; gap: 12px; color: rgba(255,255,255,0.62); font-size: 13px; }
        .case-bar-track { height: 14px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .case-bar-track-top { margin-bottom: 4px; }
        .case-bar-fill { height: 100%; border-radius: inherit; transition: width 0.7s ease; }
        .case-bar-fill-fact { background: linear-gradient(90deg, rgba(247,210,55,0.94), rgba(255,226,122,0.98)); }
        .case-bar-fill-target { background: linear-gradient(90deg, rgba(93,167,255,0.88), rgba(156,109,255,0.8)); }
        .case-dots { display: flex; justify-content: center; gap: 10px; }
        .case-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.2); border: 0; }
        .case-dot.is-active { width: 28px; border-radius: 999px; background: linear-gradient(90deg, rgba(247,210,55,0.98), rgba(255,226,122,0.92)); }

        .analysis-grid-v2 {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
          gap: 18px;
          align-items: stretch;
        }
        .snapshot-map-card {
          border-radius: 30px;
          padding: 24px;
          background: linear-gradient(180deg, rgba(224,225,227,0.08), rgba(224,225,227,0.04));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 54px rgba(0,0,0,0.16);
        }
        .analysis-left-title { margin: 0; font-size: 24px; line-height: 1.15; }
        .snapshot-builder-copy { margin: 16px 0 0; color: rgba(255,255,255,0.68); line-height: 1.75; }
        .snapshot-map-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 27fr 27fr 18fr;
          grid-template-rows: repeat(2, minmax(158px, 1fr));
          gap: 16px;
        }
        .snapshot-map-item {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          padding: 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .snapshot-map-item::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
          transform: translateX(-120%);
          animation: snapshotCardSweep 8.2s ease-in-out infinite;
          opacity: 0.55;
        }
        .snapshot-map-item.wide:nth-of-type(1) { grid-column: 1; grid-row: 1; }
        .snapshot-map-item.wide:nth-of-type(2) { grid-column: 2; grid-row: 1; }
        .snapshot-map-item.medium { grid-column: 3; grid-row: 1 / span 2; }
        .snapshot-map-item.small:nth-of-type(4) { grid-column: 1 / span 1; grid-row: 2; }
        .snapshot-map-item.small:nth-of-type(5) { grid-column: 2 / span 1; grid-row: 2; }
        .snapshot-map-note { color: var(--yellow); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
        .snapshot-map-item strong { display: block; margin-top: 18px; font-size: clamp(20px, 2.4vw, 28px); line-height: 1.02; letter-spacing: -0.04em; }
        .snapshot-map-item small { display: block; margin-top: 14px; color: rgba(255,255,255,0.66); line-height: 1.7; }
        .analysis-right-card { min-height: 100%; }
        .start-cards-row-v2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          height: 100%;
        }
        .offer-card { perspective: 1400px; }
        .offer-card-inner {
          height: 100%; min-height: 338px; border-radius: 30px; padding: 18px; background: linear-gradient(180deg, rgba(224,225,227,0.11), rgba(224,225,227,0.06)); border: 1px solid rgba(255,255,255,0.12); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.18s ease-out; transform-style: preserve-3d;
        }
        .offer-top { display: grid; gap: 18px; }
        .offer-icon { width: 100%; aspect-ratio: 1 / 1; object-fit: contain; border-radius: 24px; background: rgba(255,255,255,0.03); }
        .offer-title { font-size: 28px; letter-spacing: -0.05em; line-height: 1; font-weight: 600; }
        .offer-caption { margin-top: 10px; color: rgba(255,255,255,0.68); line-height: 1.7; }
        .offer-bottom { display: flex; justify-content: space-between; gap: 14px; align-items: center; margin-top: 18px; }
        .offer-price { font-size: 34px; line-height: 0.95; letter-spacing: -0.05em; font-weight: 700; }

        .cta-card-v2 {
          padding: 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 18px;
          align-items: end;
        }
        .cta-card-box {
          border-radius: 24px;
          padding: 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: grid;
          gap: 12px;
        }
        .cta-card-label { color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; }
        .cta-card-title { font-size: 28px; line-height: 1.02; letter-spacing: -0.05em; }

        .tg-gradient-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 18px;
          border-radius: 999px;
          color: #fff;
          background: linear-gradient(120deg, #47b6f6, #5da7ff, #7c84ff, #9c6dff, #c25cf3);
          background-size: 220% 220%;
          animation: tgGradientFlow 9s linear infinite;
          box-shadow: 0 12px 28px rgba(93,167,255,0.24);
          position: relative;
          overflow: hidden;
          border: 0;
        }
        .tg-gradient-btn::after {
          content: "";
          position: absolute;
          top: -24%; left: -130%; width: 38%; height: 150%;
          transform: skewX(-22deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent);
          animation: tgShine 4.8s ease-in-out infinite;
        }

        .site-footer {
          position: relative;
          z-index: 2;
          padding: 0 16px 20px;
        }
        .site-footer-inner {
          width: min(1260px, calc(100vw - 32px));
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: rgba(255,255,255,0.5);
        }
        .footer-brand { color: rgba(255,255,255,0.74); }
        .footer-links { display: flex; gap: 18px; flex-wrap: wrap; }

        @keyframes tgGradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes tgShine {
          0% { transform: translateX(-130%) skewX(-22deg); }
          52%, 100% { transform: translateX(330%) skewX(-22deg); }
        }
        @keyframes roadmapShine {
          0% { left: -38%; opacity: 0; }
          12% { opacity: 1; }
          55% { left: 104%; opacity: 0.95; }
          100% { left: 104%; opacity: 0; }
        }
        @keyframes snapshotCardSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          12% { opacity: 0.35; }
          48% { transform: translateX(120%); opacity: 0.7; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(18px, -20px, 0) scale(1.08); }
        }

        @media (max-width: 1160px) {
          .hero-shell,
          .preview-grid,
          .analysis-grid-v2,
          .cta-card-v2 {
            grid-template-columns: 1fr;
          }
          .preview-aside { position: relative; top: 0; }
          .hero-panel { min-height: auto; }
        }

        @media (max-width: 960px) {
          .page-wrap { width: min(100vw - 24px, 100%); padding-top: 96px; }
          .site-header-inner {
            grid-template-columns: 1fr auto;
            grid-template-areas: "brand actions" "nav nav";
            gap: 10px;
          }
          .brand-mark { grid-area: brand; }
          .header-actions { grid-area: actions; justify-content: flex-end; }
          .site-nav { grid-area: nav; justify-content: flex-start; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 2px; }
          .goals-grid,
          .preview-inputs-row,
          .preview-metrics-grid,
          .sliders-grid,
          .case-stage-card-copy,
          .case-numbers-grid,
          .start-cards-row-v2,
          .cta-card-v2 { grid-template-columns: 1fr; }
          .snapshot-map-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .snapshot-map-item,
          .snapshot-map-item.wide:nth-of-type(1),
          .snapshot-map-item.wide:nth-of-type(2),
          .snapshot-map-item.medium,
          .snapshot-map-item.small:nth-of-type(4),
          .snapshot-map-item.small:nth-of-type(5) {
            grid-column: auto;
            grid-row: auto;
            min-height: 168px;
          }
          .cases-carousel { min-height: 760px; }
          .cases-card-transform { width: 100%; }
          .case-stage-name { font-size: clamp(34px, 12vw, 64px); }
          .case-niches { max-width: none; justify-content: flex-start; }
          .case-stage-card-top,
          .case-outcome-head,
          .site-footer-inner { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 720px) {
          .page-wrap { padding-top: 88px; }
          .content-section { margin-top: 76px; }
          .hero-shell { min-height: auto; }
          .hero-title { font-size: clamp(36px, 13vw, 58px); }
          .section-title { font-size: clamp(30px, 11vw, 44px); }
          .site-header { padding: 10px 12px 0; }
          .site-header-inner { width: calc(100vw - 24px); border-radius: 20px; }
          .header-cta { display: none; }
          .hero-actions { align-items: stretch; }
          .hero-actions a,
          .preview-aside-btn,
          .tg-gradient-btn,
          .hero-secondary-btn { width: 100%; }
          .hero-panel-grid { grid-template-columns: 1fr; }
          .hero-stat-card.wide { grid-column: span 1; }
          .cases-carousel { min-height: 640px; }
          .cases-card-transform { transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </main>
  );
}
