"use client";

import { useMemo, useState } from "react";

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

function color(delta: number, invert = false) {
  if (invert) {
    if (delta < 0) return "text-emerald-300";
    if (delta > 0) return "text-rose-300";
  } else {
    if (delta > 0) return "text-emerald-300";
    if (delta < 0) return "text-rose-300";
  }
  return "text-white/50";
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

function getMetricFlag(
  type: "revenue" | "costs" | "profit",
  delta: number
): string {
  if (type === "revenue") {
    if (delta >= 10) return "Сильный рост";
    if (delta >= 3) return "Рост";
    if (delta <= -10) return "Сильное падение";
    if (delta <= -3) return "Снижение";
    return "Стабильно";
  }

  if (type === "costs") {
    if (delta <= -10) return "Снижение затрат";
    if (delta <= -3) return "Экономия";
    if (delta >= 10) return "Рост затрат";
    if (delta >= 3) return "Давление затрат";
    return "Стабильно";
  }

  if (delta >= 10) return "Рост маржи";
  if (delta >= 3) return "Позитивный сдвиг";
  if (delta <= -10) return "Просадка маржи";
  if (delta <= -3) return "Давление на маржу";
  return "Стабильно";
}

function flagTone(
  type: "revenue" | "costs" | "profit",
  delta: number
): string {
  if (type === "costs") {
    if (delta <= -3) return "flag-good";
    if (delta >= 3) return "flag-bad";
    return "flag-neutral";
  }

  if (delta >= 3) return "flag-good";
  if (delta <= -3) return "flag-bad";
  return "flag-neutral";
}

function TopMetricCard({
  title,
  value,
  delta,
  type,
  invert = false,
  large = false,
}: {
  title: string;
  value: string;
  delta: number;
  type: "revenue" | "costs" | "profit";
  invert?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={[
        "glass-card soft-glow metric-card metric-card-main",
        large ? "metric-card-large" : "",
      ].join(" ")}
    >
      <div className="metric-head">
        <div className="text-sm text-white/55">{title}</div>
        <div className={`metric-flag ${flagTone(type, delta)}`}>
          {getMetricFlag(type, delta)}
        </div>
      </div>

      <div className="mt-4 text-3xl font-semibold tracking-tight md:text-2xl">
        {value}
      </div>

      <div className={`mt-3 text-base md:text-sm ${color(delta, invert)}`}>
        {pct(delta)}
      </div>
    </div>
  );
}

function ModelCard({
  title,
  value,
  delta,
  invert = false,
}: {
  title: string;
  value: string | number;
  delta: number;
  invert?: boolean;
}) {
  return (
    <div className="glass-card soft-glow model-card">
      <div className="text-xs text-white/55">{title}</div>
      <div className="mt-2 text-xl font-medium md:text-lg">{value}</div>
      <div className={`mt-2 text-sm ${color(delta, invert)}`}>{pct(delta)}</div>
    </div>
  );
}

function Row({
  label,
  delta,
  invert = false,
}: {
  label: string;
  delta: number;
  invert?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/60">{label}</span>
      <span className={color(delta, invert)}>{pct(delta)}</span>
    </div>
  );
}

function Slider({
  title,
  subtitle,
  value,
  set,
}: {
  title: string;
  subtitle: string;
  value: number;
  set: (v: number) => void;
}) {
  return (
    <div className="glass-card soft-glow slider-card">
      <div>
        <div className="text-sm font-medium leading-snug">{title}</div>
        <div className="mt-2 min-h-[56px] text-xs leading-snug text-white/42 md:min-h-[72px]">
          {subtitle}
        </div>
      </div>

      <div className="mt-auto">
        <input
          type="range"
          min="-0.3"
          max="0.3"
          step="0.01"
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="range-input mt-4 w-full accent-[#f7d237]"
        />

        <div className="mt-2 text-xs text-white/50">{Math.round(value * 100)}%</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [clientsInput, setClientsInput] = useState("20");
  const [checkInput, setCheckInput] = useState("2000");

  const clientsBase = parseNumeric(clientsInput, 0);
  const checkBase = parseNumeric(checkInput, 0);

  const [sales, setSales] = useState(0);
  const [retention, setRetention] = useState(0);
  const [upsell, setUpsell] = useState(0);
  const [opexEff, setOpexEff] = useState(0);

  const data = useMemo(() => {
    const safeClients = Math.max(0, clientsBase);
    const safeCheck = Math.max(0, checkBase);

    const clients = safeClients * (1 + sales * 0.6 + retention * 0.5);
    const avgCheck = safeCheck * (1 + upsell * 0.7);
    const revenue = clients * avgCheck;

    const salesCost = revenue * 0.18 * (1 + sales * 0.4);
    const support = revenue * 0.06 * (1 + retention * 0.4);
    const opex = revenue * 0.35 * (1 - opexEff * 0.8);

    const costs = salesCost + support + opex;
    const profit = revenue - costs;

    return { clients, avgCheck, revenue, salesCost, support, opex, costs, profit };
  }, [clientsBase, checkBase, sales, retention, upsell, opexEff]);

  const base = useMemo(() => {
    const revenue = clientsBase * checkBase;
    const salesCost = revenue * 0.18;
    const support = revenue * 0.06;
    const opex = revenue * 0.35;
    const costs = salesCost + support + opex;
    const profit = revenue - costs;

    return {
      clients: clientsBase,
      avgCheck: checkBase,
      revenue,
      salesCost,
      support,
      opex,
      costs,
      profit,
    };
  }, [clientsBase, checkBase]);

  const safeDiv = (n: number, d: number) => (d === 0 ? 0 : (n / d) * 100);

  const revDelta = safeDiv(data.revenue - base.revenue, base.revenue);
  const costDelta = safeDiv(data.costs - base.costs, base.costs);
  const profitDelta = safeDiv(data.profit - base.profit, base.profit);

  const clientsDelta = safeDiv(data.clients - base.clients, base.clients);
  const avgCheckDelta = safeDiv(data.avgCheck - base.avgCheck, base.avgCheck);
  const salesCostDelta = safeDiv(data.salesCost - base.salesCost, base.salesCost);
  const opexSupportDelta = safeDiv(
    data.opex + data.support - (base.opex + base.support),
    base.opex + base.support
  );

  const strongestLever = useMemo(() => {
    const levers = [
      { name: "Эффективность продаж", value: Math.abs(sales * 0.6) },
      { name: "Удержание", value: Math.abs(retention * 0.5) },
      { name: "Апселлы", value: Math.abs(upsell * 0.7) },
      { name: "Операционная эффективность", value: Math.abs(opexEff * 0.8) },
    ];
    levers.sort((a, b) => b.value - a.value);
    return levers[0];
  }, [sales, retention, upsell, opexEff]);

  const hasInteraction =
    Math.abs(sales) > 0.001 ||
    Math.abs(retention) > 0.001 ||
    Math.abs(upsell) > 0.001 ||
    Math.abs(opexEff) > 0.001;

  const snapshotBotUrl = "https://t.me/Revenue_snapshot_bot";
  const tgContactUrl = "https://t.me/growth_avenue_company";
  const waContactUrl = "https://wa.me/995555163833";

  const handleReset = () => {
    setClientsInput("20");
    setCheckInput("2000");
    setSales(0);
    setRetention(0);
    setUpsell(0);
    setOpexEff(0);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1d3a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="beam beam-1" />
        <div className="beam beam-2" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="vignette" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-5 md:px-8 md:py-10">
        <header className="sticky-header mb-7 md:mb-10">
          <div className="header-row">
            <img src="/logo.svg" alt="Growth Avenue" className="logo-main shrink-0" />

            <div className="header-actions">
              <a
                href={tgContactUrl}
                className="contact-btn contact-btn-invert"
                target="_blank"
                rel="noreferrer"
              >
                TG
              </a>

              <a
                href={waContactUrl}
                className="contact-btn contact-btn-invert"
                target="_blank"
                rel="noreferrer"
              >
                WA
              </a>

              <a
                href={snapshotBotUrl}
                className={[
                  "snapshot-btn hidden md:inline-flex",
                  hasInteraction ? "snapshot-btn-active" : "snapshot-btn-disabled",
                ].join(" ")}
                target="_blank"
                rel="noreferrer"
              >
                Revenue Snapshot
              </a>
            </div>
          </div>
        </header>

        <div className="mb-8 max-w-3xl md:mb-12">
          <div className="glass-pill inline-flex items-center gap-3 rounded-full px-4 py-2.5 text-xs font-semibold text-white md:px-5 md:py-3 md:text-sm">
            <span className="dot-yellow" />
            Revenue Snapshot • интерактивная карта экономики
          </div>

          <h1 className="mt-5 text-2xl font-semibold leading-[1.02] tracking-tight md:mt-6 md:text-6xl">
            Найдите скрытый рычаг
            <br />
            в экономике вашего бизнеса
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 md:mt-5 md:text-lg">
            Управляйте показателями и смотрите, как небольшие изменения влияют
            на выручку, расходы и прибыль.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mb-8">
              <label className="input-shell">
                <span className="input-label">Клиентов / месяц</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={clientsInput}
                  onChange={(e) => setClientsInput(normalizeDigits(e.target.value))}
                  className="glass-input"
                  placeholder="Клиентов / месяц"
                />
              </label>

              <label className="input-shell">
                <span className="input-label">Средний чек</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={checkInput}
                  onChange={(e) => setCheckInput(normalizeDigits(e.target.value))}
                  className="glass-input"
                  placeholder="Средний чек"
                />
              </label>
            </div>

            <section className="dashboard-grid">
              <div className="dashboard-revenue">
                <TopMetricCard
                  title="Выручка"
                  value={fmtMoney(data.revenue)}
                  delta={revDelta}
                  type="revenue"
                  large
                />
              </div>

              <div className="dashboard-profit">
                <TopMetricCard
                  title="Прибыль"
                  value={fmtMoney(data.profit)}
                  delta={profitDelta}
                  type="profit"
                />
              </div>

              <div className="dashboard-costs">
                <TopMetricCard
                  title="Расходы"
                  value={fmtMoney(data.costs)}
                  delta={costDelta}
                  type="costs"
                  invert
                />
              </div>
            </section>

            <div className="mt-7 md:mt-8">
              <div className="mb-3 text-sm text-white/58">Формирование экономики</div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
                <ModelCard
                  title="Клиенты"
                  value={Math.round(data.clients)}
                  delta={clientsDelta}
                />
                <ModelCard
                  title="Средний чек"
                  value={fmtMoney(data.avgCheck)}
                  delta={avgCheckDelta}
                />
                <ModelCard
                  title="Sales cost"
                  value={fmtMoney(data.salesCost)}
                  delta={salesCostDelta}
                />
                <ModelCard
                  title="Opex + Support"
                  value={fmtMoney(data.opex + data.support)}
                  delta={opexSupportDelta}
                  invert
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between md:mt-10">
              <div className="text-sm text-white/58">Рычаги управления</div>
              <button
                type="button"
                onClick={handleReset}
                className="reset-link"
              >
                Сбросить
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-4">
              <Slider
                title="Эффективность продаж"
                subtitle="Влияет на поток клиентов и увеличивает нагрузку на sales cost."
                value={sales}
                set={setSales}
              />
              <Slider
                title="Удержание"
                subtitle="Меняет устойчивость клиентской базы и повышает индекс LTV."
                value={retention}
                set={setRetention}
              />
              <Slider
                title="Апселлы"
                subtitle="Увеличивают средний чек и усиливают итоговую выручку."
                value={upsell}
                set={setUpsell}
              />
              <Slider
                title="Операционная эффективность"
                subtitle="Снижает операционные издержки и влияет на итоговую маржинальность."
                value={opexEff}
                set={setOpexEff}
              />
            </div>
          </div>

          <aside className="glass-card h-fit lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.18em] text-white/45">
              Insight
            </div>

            <div className="mt-3 text-lg font-semibold">Изменение динамики</div>

            <div className="mt-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
              {hasInteraction ? (
                <>
                  <div className="text-xs uppercase tracking-[0.14em] text-white/42">
                    Ключевой рычаг
                  </div>
                  <div className="mt-2 text-base font-semibold text-white/92">
                    {strongestLever.name}
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/68">
                    Сейчас именно этот драйвер сильнее всего влияет на общую
                    динамику модели. Чтобы подтвердить эффект, нужно уточнить
                    реальные параметры бизнеса.
                  </div>
                </>
              ) : (
                <div className="text-sm leading-relaxed text-white/68">
                  Подвигайте ползунки, чтобы увидеть какой рычаг сильнее всего
                  меняет структуру вашей экономики.
                </div>
              )}
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <Row label="Выручка" delta={revDelta} />
              <Row label="Расходы" delta={costDelta} invert />
              <Row label="Прибыль" delta={profitDelta} />
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={snapshotBotUrl}
                className={[
                  "block rounded-2xl py-3 text-center font-semibold transition",
                  hasInteraction
                    ? "bg-[#f7d237] text-[#0b1d3a] hover:brightness-95"
                    : "pointer-events-none bg-white/10 text-white/45",
                ].join(" ")}
                target="_blank"
                rel="noreferrer"
              >
                Перейти в Revenue Snapshot
              </a>

              <button
                onClick={handleReset}
                className="reset-insight-btn w-full"
              >
                Сбросить модель
              </button>
            </div>

            <div className="mt-3 text-xs text-white/40">
              {hasInteraction
                ? "Диагностика займёт около 24 минут"
                : "Кнопка станет активной после взаимодействия с рычагами"}
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .glass-card {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 24px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .glass-pill {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0.06)
          );
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .soft-glow {
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 40;
          margin: 0 -16px 18px;
          padding: 10px 16px 8px;
          backdrop-filter: blur(14px);
          background: linear-gradient(
            180deg,
            rgba(11, 29, 58, 0.86),
            rgba(11, 29, 58, 0.42)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 9px 12px;
          font-size: 12px;
          font-weight: 700;
          transition: 0.2s ease;
          border: 1px solid transparent;
        }

        .contact-btn-invert {
          background: rgba(255, 255, 255, 0.92);
          color: #0b1d3a;
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .contact-btn-invert:hover {
          background: #ffffff;
        }

        .snapshot-btn {
          border-radius: 9999px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 700;
          transition: 0.2s ease;
        }

        .snapshot-btn-active {
          background: #f7d237;
          color: #0b1d3a;
        }

        .snapshot-btn-active:hover {
          filter: brightness(0.97);
        }

        .snapshot-btn-disabled {
          pointer-events: none;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.45);
        }

        .logo-main {
          width: 216px;
          height: 60px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        .input-shell {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.52);
          padding-left: 4px;
        }

        .glass-input {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.055)
          );
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 14px 16px;
          border-radius: 18px;
          backdrop-filter: blur(18px);
          color: white;
          font-size: 20px;
          font-weight: 500;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
          transition: 0.25s ease;
          width: 100%;
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(247, 210, 55, 0.75);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.22),
            0 0 30px rgba(247, 210, 55, 0.12),
            0 10px 30px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .reset-link {
          background: transparent;
          border: 0;
          padding: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 14px;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .reset-link:hover {
          color: #ffffff;
        }

        .reset-insight-btn {
          border-radius: 16px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          color: rgba(255, 255, 255, 0.9);
          transition: 0.2s ease;
        }

        .reset-insight-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .range-input {
          cursor: pointer;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .metric-card {
          min-height: 150px;
        }

        .metric-card-large {
          min-height: 150px;
        }

        .metric-card-main {
          position: relative;
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow:
            0 14px 48px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .metric-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .metric-flag {
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.01em;
          border: 1px solid transparent;
        }

        .flag-good {
          background: rgba(74, 222, 128, 0.12);
          color: rgb(167, 243, 208);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .flag-bad {
          background: rgba(251, 113, 133, 0.12);
          color: rgb(253, 164, 175);
          border-color: rgba(251, 113, 133, 0.2);
        }

        .flag-neutral {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.72);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .model-card {
          min-height: 118px;
        }

        .slider-card {
          min-height: 178px;
          display: flex;
          flex-direction: column;
        }

        .dot-yellow {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #f7d237;
          animation: pulseYellow 1.8s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(247, 210, 55, 0.35);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 72px 72px;
          opacity: 0.18;
          mask-image: radial-gradient(circle at center, black 35%, transparent 95%);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.16;
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.055) 0.6px, transparent 0.6px),
            radial-gradient(rgba(255, 255, 255, 0.035) 0.45px, transparent 0.45px),
            radial-gradient(rgba(0, 0, 0, 0.06) 0.7px, transparent 0.7px);
          background-size: 4px 4px, 6px 6px, 7px 7px;
          background-position: 0 0, 1px 2px, 2px 1px;
          mix-blend-mode: soft-light;
          filter: contrast(115%) brightness(96%);
        }

        .aurora {
          position: absolute;
          filter: blur(95px);
          opacity: 0.5;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform, opacity;
        }

        .aurora-1 {
          width: 42vw;
          height: 42vw;
          min-width: 420px;
          min-height: 420px;
          left: -8vw;
          top: -12vh;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.18),
            transparent 68%
          );
          animation: driftOne 16s infinite alternate ease-in-out;
        }

        .aurora-2 {
          width: 46vw;
          height: 46vw;
          min-width: 460px;
          min-height: 460px;
          right: -10vw;
          top: 4vh;
          background: radial-gradient(
            circle,
            rgba(95, 179, 179, 0.2),
            transparent 68%
          );
          animation: driftTwo 14s infinite alternate ease-in-out;
        }

        .aurora-3 {
          width: 54vw;
          height: 34vw;
          min-width: 520px;
          min-height: 300px;
          left: 10vw;
          bottom: -10vh;
          background: radial-gradient(
            circle,
            rgba(120, 120, 255, 0.12),
            transparent 70%
          );
          animation: driftThree 18s infinite alternate ease-in-out;
        }

        .aurora-4 {
          width: 30vw;
          height: 30vw;
          min-width: 280px;
          min-height: 280px;
          left: 36%;
          top: 18%;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.08),
            transparent 65%
          );
          animation: driftFour 12s infinite alternate ease-in-out;
        }

        .beam {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.14;
          transform: rotate(-18deg);
        }

        .beam-1 {
          width: 520px;
          height: 120px;
          right: -60px;
          top: 22%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(247, 210, 55, 0.28),
            transparent
          );
          animation: beamMove 10s infinite ease-in-out;
        }

        .beam-2 {
          width: 420px;
          height: 110px;
          left: -80px;
          bottom: 18%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(95, 179, 179, 0.22),
            transparent
          );
          animation: beamMoveTwo 12s infinite ease-in-out;
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(42px);
          opacity: 0.14;
          will-change: transform, opacity;
        }

        .orb-1 {
          width: 220px;
          height: 220px;
          left: 10%;
          top: 42%;
          background: rgba(247, 210, 55, 0.14);
          animation: pulseOrb 9s infinite ease-in-out;
        }

        .orb-2 {
          width: 260px;
          height: 260px;
          right: 8%;
          bottom: 12%;
          background: rgba(95, 179, 179, 0.14);
          animation: pulseOrb 11s infinite ease-in-out;
          animation-delay: 1.5s;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(0, 0, 0, 0.22) 100%
          );
        }

        @keyframes pulseYellow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes driftOne {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(90px, 60px, 0) scale(1.15);
          }
        }

        @keyframes driftTwo {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-80px, 70px, 0) scale(1.12);
          }
        }

        @keyframes driftThree {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(50px, -30px, 0) scale(1.08);
          }
        }

        @keyframes driftFour {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-45px, 35px, 0) scale(1.1);
          }
        }

        @keyframes beamMove {
          0% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.08;
          }
          50% {
            transform: translateX(-120px) rotate(-18deg);
            opacity: 0.18;
          }
          100% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.08;
          }
        }

        @keyframes beamMoveTwo {
          0% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.06;
          }
          50% {
            transform: translateX(130px) rotate(-18deg);
            opacity: 0.16;
          }
          100% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.06;
          }
        }

        @keyframes pulseOrb {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.14;
          }
          50% {
            transform: scale(1.24) translate3d(24px, -18px, 0);
            opacity: 0.22;
          }
          100% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.14;
          }
        }

        @media (min-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 16px;
          }

          .metric-card,
          .metric-card-large {
            min-height: 170px;
          }

          .model-card {
            min-height: 140px;
          }

          .slider-card {
            min-height: 220px;
          }
        }

        @media (max-width: 767px) {
          .sticky-header {
            top: 0;
            margin: 0 -16px 18px;
            padding: 10px 16px 8px;
          }

          .logo-main {
            width: 170px;
            height: 48px;
          }

          .header-actions {
            gap: 6px;
          }

          .contact-btn {
            min-width: 44px;
            height: 40px;
            padding: 0 12px;
            font-size: 12px;
          }

          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "revenue revenue"
              "profit costs";
            gap: 10px;
          }

          .dashboard-revenue {
            grid-area: revenue;
          }

          .dashboard-profit {
            grid-area: profit;
          }

          .dashboard-costs {
            grid-area: costs;
          }

          .metric-card,
          .metric-card-large {
            min-height: 126px;
            padding: 16px;
            border-radius: 22px;
          }

          .metric-card .text-3xl,
          .metric-card-large .text-3xl {
            font-size: 2rem;
            line-height: 1;
          }

          .metric-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .metric-flag {
            font-size: 10px;
            padding: 5px 8px;
          }

          .model-card {
            min-height: 108px;
            padding: 16px;
            border-radius: 20px;
          }

          .model-card .text-xl {
            font-size: 1rem;
            line-height: 1.2;
          }

          .slider-card {
            min-height: 156px;
            padding: 16px;
            border-radius: 20px;
          }

          .slider-card .range-input {
            margin-top: 10px;
          }

          .glass-card {
            border-radius: 22px;
            padding: 16px;
          }

          .glass-input {
            font-size: 18px;
            padding: 16px;
          }

          .aurora {
            filter: blur(72px);
          }
        }
      `}</style>
    </main>
  );
}
