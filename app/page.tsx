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

function Card({
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
    <div className="glass-card soft-glow">
      <div className="text-xs text-white/55">{title}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      <div className={`mt-2 text-sm ${color(delta, invert)}`}>{pct(delta)}</div>
    </div>
  );
}

function Model({
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
    <div className="glass-card soft-glow">
      <div className="text-xs text-white/55">{title}</div>
      <div className="mt-2 text-lg font-medium">{value}</div>
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
        <div className="mt-2 min-h-[72px] text-xs leading-snug text-white/42">
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
          className="w-full accent-[#f7d237]"
        />

        <div className="mt-2 text-xs text-white/50">{Math.round(value * 100)}%</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [clientsBase, setClientsBase] = useState(20);
  const [checkBase, setCheckBase] = useState(2000);

  const [sales, setSales] = useState(0);
  const [retention, setRetention] = useState(0);
  const [upsell, setUpsell] = useState(0);
  const [opexEff, setOpexEff] = useState(0);

  const data = useMemo(() => {
    const clients = clientsBase * (1 + sales * 0.6 + retention * 0.5);
    const avgCheck = checkBase * (1 + upsell * 0.7);
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

  const revDelta = ((data.revenue - base.revenue) / base.revenue) * 100;
  const costDelta = ((data.costs - base.costs) / base.costs) * 100;
  const profitDelta = ((data.profit - base.profit) / base.profit) * 100;

  const clientsDelta = ((data.clients - base.clients) / base.clients) * 100;
  const avgCheckDelta = ((data.avgCheck - base.avgCheck) / base.avgCheck) * 100;
  const salesCostDelta = ((data.salesCost - base.salesCost) / base.salesCost) * 100;
  const opexSupportDelta =
    ((data.opex + data.support - (base.opex + base.support)) /
      (base.opex + base.support)) *
    100;

  const strongestLever = useMemo(() => {
    const levers = [
      {
        name: "Эффективность продаж",
        value: Math.abs(sales * 0.6),
      },
      {
        name: "Удержание",
        value: Math.abs(retention * 0.5),
      },
      {
        name: "Апселлы",
        value: Math.abs(upsell * 0.7),
      },
      {
        name: "Операционная эффективность",
        value: Math.abs(opexEff * 0.8),
      },
    ];

    levers.sort((a, b) => b.value - a.value);
    return levers[0];
  }, [sales, retention, upsell, opexEff]);

  const hasInteraction =
    Math.abs(sales) > 0.001 ||
    Math.abs(retention) > 0.001 ||
    Math.abs(upsell) > 0.001 ||
    Math.abs(opexEff) > 0.001;

  const telegramUrl = "https://t.me/Revenue_snapshot_bot";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1d3a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="mesh mesh-1" />
        <div className="mesh mesh-2" />
        <div className="noise-overlay" />
        <div className="vignette" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src="/logo.svg"
              alt="Growth Avenue"
              className="logo-main shrink-0"
            />
          </div>

          <a
            href={telegramUrl}
            className="hidden rounded-full bg-[#f7d237] px-5 py-2 text-sm font-semibold text-black transition hover:brightness-95 md:inline-flex"
          >
            Перейти в Telegram
          </a>
        </div>

        <div className="mb-12 max-w-3xl">
          <div className="glass-pill inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white">
            <span className="dot-yellow" />
            Revenue Snapshot • интерактивная карта экономики
          </div>

          <h1 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Найдите скрытый сдвиг
            <br />
            в экономике вашего бизнеса
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
            Передвигайте рычаги и смотрите, как небольшие изменения влияют
            на выручку, расходы и прибыль.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="number"
                value={clientsBase}
                onChange={(e) => setClientsBase(Number(e.target.value))}
                className="glass-input"
                placeholder="Клиентов / месяц"
              />

              <input
                type="number"
                value={checkBase}
                onChange={(e) => setCheckBase(Number(e.target.value))}
                className="glass-input"
                placeholder="Средний чек"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card title="Выручка" value={fmtMoney(data.revenue)} delta={revDelta} />
              <Card
                title="Расходы"
                value={fmtMoney(data.costs)}
                delta={costDelta}
                invert
              />
              <Card title="Прибыль" value={fmtMoney(data.profit)} delta={profitDelta} />
            </div>

            <div className="mt-8">
              <div className="mb-3 text-sm text-white/58">Формирование экономики</div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Model title="Клиенты" value={Math.round(data.clients)} delta={clientsDelta} />
                <Model title="Средний чек" value={fmtMoney(data.avgCheck)} delta={avgCheckDelta} />
                <Model title="Sales cost" value={fmtMoney(data.salesCost)} delta={salesCostDelta} />
                <Model
                  title="Opex + Support"
                  value={fmtMoney(data.opex + data.support)}
                  delta={opexSupportDelta}
                  invert
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

          <aside className="glass-card h-fit lg:sticky lg:top-6">
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
                  Эта модель показывает направление изменений и общий эффект от
                  сдвига рычагов. Для точной оценки нужны реальные параметры бизнеса.
                </div>
              )}
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <Row label="Выручка" delta={revDelta} />
              <Row label="Расходы" delta={costDelta} invert />
              <Row label="Прибыль" delta={profitDelta} />
            </div>

            <a
              href={telegramUrl}
              className="mt-7 block rounded-2xl bg-[#f7d237] py-3 text-center font-semibold text-[#0b1d3a] transition hover:brightness-95"
            >
              Перейти в Telegram
            </a>

            <div className="mt-3 text-xs text-white/40">
              Диагностика займёт около 24 минут
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

        .glass-input {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 16px;
          border-radius: 16px;
          backdrop-filter: blur(16px);
          color: white;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(247, 210, 55, 0.65);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.2),
            0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .slider-card {
          min-height: 220px;
          display: flex;
          flex-direction: column;
        }

        .logo-main {
          width: 216px;
          height: 60px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        .dot-yellow {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #f7d237;
          animation: pulseYellow 1.8s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(247, 210, 55, 0.35);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.17) 1.2px, transparent 1.2px),
            radial-gradient(rgba(255, 255, 255, 0.09) 0.8px, transparent 0.8px);
          background-size: 12px 12px, 18px 18px;
          background-position: 0 0, 6px 6px;
          mix-blend-mode: soft-light;
          transform: scale(1.06);
        }

        .aurora {
          position: absolute;
          filter: blur(90px);
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
          animation: driftOne 18s infinite alternate ease-in-out;
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
            rgba(95, 179, 179, 0.22),
            transparent 68%
          );
          animation: driftTwo 16s infinite alternate ease-in-out;
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
            rgba(120, 120, 255, 0.14),
            transparent 70%
          );
          animation: driftThree 20s infinite alternate ease-in-out;
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
          animation: driftFour 14s infinite alternate ease-in-out;
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(42px);
          opacity: 0.18;
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

        .mesh {
          position: absolute;
          inset: auto;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          opacity: 0.4;
        }

        .mesh-1 {
          width: 620px;
          height: 620px;
          right: -180px;
          top: -120px;
          animation: spinSlow 50s linear infinite;
        }

        .mesh-2 {
          width: 440px;
          height: 440px;
          left: -120px;
          bottom: -120px;
          animation: spinSlowReverse 42s linear infinite;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(0, 0, 0, 0.18) 100%
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

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinSlowReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          .logo-main {
            width: 160px;
            height: 44px;
          }

          .slider-card {
            min-height: 200px;
          }
        }
      `}</style>
    </main>
  );
}