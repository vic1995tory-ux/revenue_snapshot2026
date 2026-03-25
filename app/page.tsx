"use client";

import Link from "next/link";
import { useEffect } from "react";

type TariffCardProps = {
  title: string;
  image: string;
  mobileImage?: string;
  price: string;
  href: string;
  priceClassName?: string;
};

function TariffCard({
  title,
  image,
  mobileImage,
  price,
  href,
  priceClassName = "",
}: TariffCardProps) {
  return (
    <div className="tariff-card tilt-card">
      <div className="tariff-shell tilt-inner">
        <div className="tariff-media">
          <picture>
            {mobileImage ? (
              <source media="(max-width: 767px)" srcSet={mobileImage} />
            ) : null}
            <img src={image} alt={title} className="tariff-image" />
          </picture>

          <div className={`tariff-price ${priceClassName}`}>{price}</div>
        </div>

        <a href={href} className="tariff-play tariff-play-desktop" aria-label={`Открыть ${title}`}>
          <span className="tariff-play-triangle" />
        </a>
      </div>

      <a href={href} className="tariff-play tariff-play-mobile" aria-label={`Открыть ${title}`}>
        <span className="tariff-play-triangle" />
      </a>
    </div>
  );
}

function ResultCard({
  tag,
  title,
  text,
}: {
  tag: string;
  title: string;
  text: string;
}) {
  return (
    <article className="result-card">
      <div className="result-tag">{tag}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function SignalCard({
  hint,
  weight,
  title,
  points,
  large = false,
}: {
  hint: string;
  weight: string;
  title: string;
  points: string[];
  large?: boolean;
}) {
  return (
    <article className={`signal-card ${large ? "signal-card-large" : ""}`}>
      <div className="signal-top">
        <span>{hint}</span>
        <b>{weight}</b>
      </div>
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="signal-meter">
        <span />
      </div>
      <div className="signal-caption">вес слоя в гипотезе</div>
    </article>
  );
}

export default function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 1023) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>(".tilt-inner");
      const playDesktop = card.querySelector<HTMLElement>(".tariff-play-desktop");
      if (!inner) return;

      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 10;
        const rotateX = (0.5 - py) * 10;

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        if (playDesktop) {
          playDesktop.style.transform = `translateY(-3px) rotateX(${rotateX * 0.42}deg) rotateY(${rotateY * 0.42}deg)`;
        }
      };

      const handleLeave = () => {
        inner.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
        if (playDesktop) {
          playDesktop.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)";
        }
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

  return (
    <main className="landing-page">
      <header className="site-header">
        <div className="shell header-shell">
          <a href="#top" className="logo-link" aria-label="Growth Avenue">
            <img src="/logo.svg" alt="Growth Avenue" className="logo-main" />
          </a>

          <nav className="desktop-nav">
            <a href="#how">Как это работает</a>
            <a href="#preview">Интерактивное превью</a>
            <a href="#results">Что вы получите</a>
            <a href="#analysis">Как проходит анализ</a>
          </nav>

          <div className="header-actions">
            <a href="https://www.paypal.com/ncp/payment/J573NHRDCJQZC" className="primary-btn">
              Попробовать Snapshot
            </a>
            <a href="https://t.me/growth_avenue_company" className="pill-btn">TG</a>
            <a href="https://wa.me/995555163833" className="pill-btn">WA</a>
          </div>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <h1>Revenue Snapshot</h1>
            <h2>
              стратегическая диагностика
              <br />
              экономики вашего бизнеса
            </h2>
            <p>
              Узнайте, какое изменение в модели способно дать наиболее сильный
              эффект на выручку, и где сейчас скрываются главные точки потери денег.
            </p>

            <div className="hero-chips">
              <span>MVP</span>
              <span>CashCow</span>
              <span>Scaling</span>
            </div>

            <div className="hero-actions">
              <a href="https://www.paypal.com/ncp/payment/J573NHRDCJQZC" className="primary-btn">
                Попробовать Snapshot
              </a>
              <a href="#preview" className="ghost-btn">Побаловаться</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <div className="hero-image-overlay" />
              <img src="/hero_mobile.svg" alt="" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="shell">
          <div className="section-head">
            <div className="section-kicker">Как это работает</div>
            <h2>Путь от простых ответов к структурированному результату</h2>
            <p>
              Пользователь проходит интерактивную диагностику, а на выходе
              получает не просто заметки, а карту решений по экономике, спросу,
              продукту и точкам роста.
            </p>
          </div>

          <div className="how-grid">
            <div className="glass-panel">
              <div className="step-num">01</div>
              <h3>Фиксация параметров бизнеса</h3>
              <p>
                Сначала пользователь вводит базовые цифры и проходит короткие
                блоки по спросу, продукту, расходам и структуре.
              </p>
            </div>

            <div className="glass-panel">
              <div className="step-num">02</div>
              <h3>Сборка аналитической логики</h3>
              <p>
                Snapshot связывает между собой сигналы из экономики, клиентов и
                позиционирования и выделяет главный рычаг.
              </p>
            </div>

            <div className="glass-panel">
              <div className="step-num">03</div>
              <h3>Структурированный итог</h3>
              <p>
                Пользователь видит, что тормозит рост сейчас, где теряются
                деньги и какие действия стоят первыми в очереди.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="preview">
        <div className="shell">
          <div className="section-head">
            <div className="section-kicker">Интерактивное превью</div>
            <h2>Поиграйте с моделью до оплаты</h2>
            <p>
              Это облегчённый preview-блок: он показывает логику продукта и
              помогает быстро понять, на какие зоны Snapshot смотрит в первую очередь.
            </p>
          </div>

          <div className="preview-grid">
            <div className="glass-panel preview-panel">
              <div className="input-label">Введите ваши данные или попробуйте пример ниже</div>
              <div className="example-pills">
                <button type="button">Пример: 20 клиентов / $2000</button>
                <button type="button">Пример: 45 клиентов / $1500</button>
              </div>
              <div className="mini-metrics">
                <div className="mini-input">
                  <span>Клиентов / месяц</span>
                  <strong>20</strong>
                </div>
                <div className="mini-input">
                  <span>Средний чек</span>
                  <strong>2000</strong>
                </div>
              </div>
            </div>

            <div className="preview-side">
              <div className="metric-box">
                <span>Выручка</span>
                <strong>$40 000</strong>
              </div>
              <div className="metric-box">
                <span>Затраты</span>
                <strong>$23 600</strong>
              </div>
              <div className="metric-box">
                <span>Потенциал сдвига</span>
                <strong>$8 400</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="results">
        <div className="shell">
          <div className="section-head">
            <div className="section-kicker">Что вы получите</div>
            <h2>Структура итогового Snapshot</h2>
            <p>
              Результат собирается в четыре читаемых блока, чтобы решение было видно сразу,
              без длинной расшифровки.
            </p>
          </div>

          <div className="results-grid">
            <ResultCard tag="ECONOMIC RATE" title="Executive Summary" text="Показывает логику экономики бизнеса и выделяет главный тип потерь." />
            <ResultCard tag="GROWTH LIMIT" title="Key Conclusions" text="Фиксирует главный системный предел роста: спрос, конверсия, модель или структура." />
            <ResultCard tag="SOLUTION" title="Strategy & Practice" text="Собирает первичный рычаг роста и объясняет, почему он сейчас главный." />
            <ResultCard tag="JTBD" title="RoadMap" text="Переводит выводы в следующую последовательность шагов без лишней теории." />
          </div>
        </div>
      </section>

      <section className="section" id="analysis">
        <div className="shell">
          <div className="section-head">
            <div className="section-kicker">Как проходит анализ</div>
            <h2>Что вас ждёт</h2>
            <p>
              Мы собираем сигналы по пяти направлениям, чтобы увидеть не просто набор ответов,
              а карту решений.
            </p>
          </div>

          <div className="analysis-grid">
            <div className="signal-board">
              <SignalCard hint="Точка входа" weight="27%" title="Позиционирование" large points={["что обещание делает понятным", "какой сегмент готов реагировать первым"]} />
              <SignalCard hint="Ресурсы и роли" weight="27%" title="Структура компании" large points={["кто удерживает выручку в системе", "где ручное управление тормозит рост"]} />
              <SignalCard hint="Unit-логика" weight="18%" title="Экономика" points={["что происходит с маржой и cost stack", "какой рычаг даёт главный финансовый сдвиг"]} />
              <SignalCard hint="Спрос и поведение" weight="14%" title="Клиенты" points={["кто приносит деньги сейчас", "где теряется конверсия по пути"]} />
              <SignalCard hint="Ценность и упаковка" weight="14%" title="Продукт" points={["что продаётся легче всего", "какая версия оффера масштабируется"]} />
            </div>

            <div className="tariffs-wrap">
              <TariffCard
                title="On Rec"
                image="/stratsession.svg"
                mobileImage="/on-rec_mobile.svg"
                price="$770"
                href="https://www.paypal.com/ncp/payment/GQLFG3CYUHM82"
                priceClassName="price-onrec"
              />
              <TariffCard
                title="Online-playground"
                image="/snapshot.svg"
                mobileImage="/online-playground_mobile.svg"
                price="$114"
                href="https://www.paypal.com/ncp/payment/J573NHRDCJQZC"
                priceClassName="price-playground"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-last" id="try">
        <div className="shell">
          <div className="cta-panel">
            <div>
              <div className="section-kicker">CTA</div>
              <h2>Откройте полный Revenue Snapshot</h2>
              <p>
                После оплаты пользователь переходит в Telegram, проходит диагностику
                и получает структурированный результат с финансовой логикой,
                проблемными зонами и главным направлением усиления.
              </p>
            </div>

            <div className="cta-box">
              <div className="cta-eyebrow">Следующий шаг</div>
              <div className="cta-title">Попробовать Snapshot</div>
              <a href="https://www.paypal.com/ncp/payment/J573NHRDCJQZC" className="primary-btn">
                Получить Revenue Snapshot
              </a>
            </div>
          </div>

          <footer className="footer">
            <div>Growth Avenue</div>
            <div className="footer-links">
              <Link href="/terms-of-use">Terms of Use</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </footer>
        </div>
      </section>

      <style jsx global>{`
        :root {
          --stroke: rgba(255,255,255,.10);
          --text: #fefefe;
          --muted: rgba(255,255,255,.70);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background:
            radial-gradient(circle at 20% 10%, rgba(94,167,255,.16), transparent 24%),
            radial-gradient(circle at 80% 28%, rgba(247,210,55,.10), transparent 22%),
            linear-gradient(180deg, #09152a 0%, #091a35 100%);
          color: var(--text);
          overflow-x: hidden;
          font-family: Inter, Arial, sans-serif;
        }

        a { color: inherit; }
        img { display: block; max-width: 100%; }
        .landing-page { min-height: 100vh; overflow: hidden; }
        .shell { width: min(1320px, calc(100% - 32px)); margin: 0 auto; }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 40;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(7,17,35,.74);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .header-shell {
          min-height: 82px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 28px;
        }

        .logo-main { width: 250px; height: auto; }

        .desktop-nav {
          display: flex;
          justify-content: center;
          gap: 28px;
          font-size: 15px;
        }

        .desktop-nav a {
          text-decoration: none;
          color: rgba(255,255,255,.82);
        }

        .header-actions { display: flex; gap: 10px; align-items: center; }

        .primary-btn,
        .ghost-btn,
        .pill-btn {
          min-height: 52px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: 800;
          padding: 0 22px;
          border: 1px solid rgba(255,255,255,.12);
        }

        .primary-btn {
          color: #fff;
          background: linear-gradient(90deg, #4eb7f6 0%, #6a93ff 34%, #9d72ff 68%, #cc63f0 100%);
          box-shadow: 0 14px 32px rgba(93,111,255,.18), inset 0 1px 0 rgba(255,255,255,.14);
        }

        .ghost-btn { color: #fff; background: rgba(255,255,255,.03); }

        .pill-btn {
          min-width: 52px;
          padding: 0 14px;
          color: #0b1d3a;
          background: rgba(247,210,55,.96);
        }

        .section { padding: 52px 0; }
        .section-last { padding-bottom: 34px; }
        .section-head { margin-bottom: 24px; }

        .section-kicker,
        .result-tag {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(247,210,55,.96);
          color: #0b1d3a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .section-kicker { margin-bottom: 14px; }

        .section-head h2,
        .hero-copy h1,
        .cta-panel h2 {
          margin: 0;
          letter-spacing: -0.045em;
          line-height: .96;
        }

        .hero-section { padding: 42px 0 26px; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.02fr .98fr;
          align-items: center;
          gap: 26px;
        }

        .hero-copy {
          border-radius: 34px;
          border: 1px solid var(--stroke);
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
          padding: 34px;
          position: relative;
          overflow: hidden;
        }

        .hero-copy::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(4,16,39,.16) 0%, rgba(4,16,39,.22) 42%, rgba(4,16,39,.46) 100%),
            url("/hero_mobile.svg");
          background-repeat: no-repeat;
          background-size: cover, cover;
          background-position: center, center;
          opacity: .40;
          pointer-events: none;
        }

        .hero-copy > * { position: relative; z-index: 1; }

        .hero-copy h1 {
          font-size: clamp(72px, 7vw, 122px);
          margin-bottom: 18px;
        }

        .hero-copy h2 {
          font-size: clamp(34px, 3.2vw, 56px);
          margin-bottom: 22px;
        }

        .hero-copy p,
        .section-head p,
        .glass-panel p,
        .result-card p,
        .cta-panel p {
          color: var(--muted);
          line-height: 1.58;
          font-size: 18px;
        }

        .hero-chips,
        .hero-actions,
        .example-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-chips { margin: 28px 0 24px; }

        .hero-chips span {
          min-height: 52px;
          padding: 0 24px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          font-size: 18px;
          font-weight: 900;
          color: #081d46;
          background: rgba(247,210,55,.96);
        }

        .hero-visual { display: flex; justify-content: center; }

        .hero-image-card {
          width: 100%;
          min-height: 520px;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid var(--stroke);
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
        }

        .hero-image { width: 100%; height: 100%; object-fit: cover; }

        .hero-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(3,10,22,.12), rgba(3,10,22,.34));
          z-index: 1;
          pointer-events: none;
        }

        .glass-panel,
        .result-card,
        .signal-card,
        .cta-panel,
        .cta-box,
        .preview-panel,
        .metric-box {
          border-radius: 30px;
          border: 1px solid var(--stroke);
          background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
          box-shadow: 0 22px 44px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .how-grid .glass-panel { padding: 24px; }

        .step-num {
          color: rgba(247,210,55,.96);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .14em;
          margin-bottom: 14px;
        }

        .glass-panel h3,
        .result-card h3,
        .signal-card h3 {
          margin: 0 0 14px;
          font-size: clamp(28px, 3vw, 42px);
          line-height: .98;
          letter-spacing: -0.04em;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 18px;
        }

        .preview-panel { padding: 24px; }

        .input-label {
          font-size: 30px;
          line-height: 1.04;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .example-pills { margin-bottom: 18px; }

        .example-pills button {
          border: 0;
          min-height: 56px;
          border-radius: 999px;
          padding: 0 22px;
          font-size: 18px;
          font-weight: 900;
          color: #081d46;
          background: rgba(247,210,55,.98);
          cursor: pointer;
        }

        .mini-metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .mini-input,
        .metric-box { padding: 20px; }

        .mini-input span,
        .metric-box span {
          display: block;
          color: rgba(255,255,255,.56);
          margin-bottom: 10px;
        }

        .mini-input strong,
        .metric-box strong {
          font-size: clamp(28px, 3vw, 42px);
        }

        .preview-side { display: grid; gap: 14px; }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .result-card {
          padding: 24px;
          min-height: 240px;
        }

        .result-tag { margin-bottom: 18px; }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .signal-board {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 18px;
        }

        .signal-card {
          padding: 22px;
          min-height: 240px;
          grid-column: span 2;
        }

        .signal-card-large { grid-column: span 3; }

        .signal-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,.56);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 24px;
        }

        .signal-top b {
          color: rgba(247,210,55,.96);
          font-size: 16px;
        }

        .signal-card ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 12px;
          color: rgba(255,255,255,.74);
        }

        .signal-card li {
          position: relative;
          padding-left: 20px;
          line-height: 1.45;
        }

        .signal-card li::before {
          content: "";
          position: absolute;
          left: 0;
          top: .55em;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(247,210,55,.96);
          box-shadow: 0 0 18px rgba(247,210,55,.42);
        }

        .signal-meter {
          height: 8px;
          margin-top: 26px;
          border-radius: 999px;
          background: rgba(255,255,255,.08);
          overflow: hidden;
        }

        .signal-meter span {
          display: block;
          width: 56%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(247,210,55,.96) 0%, rgba(162,122,255,.9) 100%);
        }

        .signal-caption {
          margin-top: 10px;
          color: rgba(255,255,255,.5);
          text-transform: uppercase;
          letter-spacing: .12em;
          font-size: 12px;
        }

        .tariffs-wrap {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 26px;
          align-items: start;
        }

        .tariff-card { perspective: 1400px; }

        .tariff-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 74px;
          gap: 12px;
          align-items: stretch;
          transform-style: preserve-3d;
          transition: transform .22s ease-out;
        }

        .tariff-media {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          background: transparent;
        }

        .tariff-image {
          width: 100%;
          height: auto;
          aspect-ratio: 1080 / 720;
          object-fit: contain;
          object-position: center;
          display: block;
          border-radius: 28px;
        }

        .tariff-price {
          position: absolute;
          font-weight: 800;
          line-height: .92;
          letter-spacing: -.06em;
          color: #fff;
          text-shadow: 0 10px 28px rgba(0,0,0,.22);
          font-size: clamp(42px, 4.2vw, 78px);
        }

        .price-onrec { top: 15.6%; right: 7.2%; }
        .price-playground { top: 15.6%; right: 7.2%; }

        .tariff-play {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-decoration: none;
          background: linear-gradient(180deg, #b490ff 0%, #d69d49 56%, #f0da63 82%, #d6c7ff 100%);
          background-size: 180% 180%;
          animation: cardPlayFlow 9s ease-in-out infinite;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 14px 30px rgba(0,0,0,.22);
          border: 1px solid rgba(255,255,255,.08);
          transition: transform .22s ease-out, box-shadow .22s ease-out;
        }

        .tariff-play-desktop {
          width: 74px;
          min-width: 74px;
          border-radius: 24px;
        }

        .tariff-play-mobile { display: none; }

        .tariff-play::before {
          content: "";
          position: absolute;
          inset: -18%;
          background: radial-gradient(circle at 50% 78%, rgba(255,255,255,.26) 0%, rgba(255,255,255,0) 48%);
          opacity: .92;
          pointer-events: none;
        }

        .tariff-play-triangle {
          position: relative;
          width: 0;
          height: 0;
          border-top: 16px solid transparent;
          border-bottom: 16px solid transparent;
          border-left: 24px solid #08285b;
          margin-left: 4px;
          filter: drop-shadow(0 8px 18px rgba(4,16,39,.18));
        }

        .cta-panel {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 18px;
          align-items: center;
          padding: 24px;
        }

        .cta-box { padding: 22px; }

        .cta-eyebrow {
          color: rgba(255,255,255,.52);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .cta-title {
          font-size: 32px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 18px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding-top: 18px;
          margin-top: 24px;
          border-top: 1px solid rgba(255,255,255,.08);
          color: rgba(255,255,255,.52);
          font-size: 13px;
        }

        .footer-links {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: rgba(255,255,255,.52);
          text-decoration: none;
        }

        @keyframes cardPlayFlow {
          0% { background-position: 0% 8%; }
          50% { background-position: 100% 92%; }
          100% { background-position: 0% 8%; }
        }

        @media (max-width: 1100px) {
          .desktop-nav { display: none; }
          .hero-grid,
          .preview-grid,
          .cta-panel { grid-template-columns: 1fr; }
          .signal-board { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .signal-card,
          .signal-card-large { grid-column: span 1; }
        }

        @media (max-width: 767px) {
          .shell { width: min(100%, calc(100% - 24px)); }
          .header-shell {
            grid-template-columns: 1fr auto;
            gap: 12px;
            min-height: 76px;
          }
          .header-actions { gap: 8px; }
          .header-actions .primary-btn { display: none; }
          .logo-main { width: 215px; }
          .section { padding: 38px 0; }
          .hero-section { padding-top: 24px; }
          .hero-copy { padding: 22px; }
          .hero-copy h1 { font-size: 72px; margin-bottom: 16px; }
          .hero-copy h2 { font-size: 28px; margin-bottom: 18px; }
          .hero-copy p,
          .section-head p,
          .glass-panel p,
          .result-card p,
          .cta-panel p { font-size: 16px; }

          .hero-copy::before {
            background-size: cover, cover;
            background-position: center, center;
            opacity: .84;
          }

          .hero-visual { display: none; }
          .hero-chips span {
            min-height: 44px;
            padding: 0 18px;
            font-size: 16px;
          }
          .primary-btn,
          .ghost-btn,
          .pill-btn { min-height: 48px; }
          .how-grid,
          .results-grid,
          .signal-board,
          .tariffs-wrap,
          .mini-metrics { grid-template-columns: 1fr; }
          .result-card,
          .signal-card { min-height: 0; }

          .tariff-shell {
            display: block;
            width: 100%;
            transform: none !important;
          }

          .tariff-play-desktop { display: none; }

          .tariff-play-mobile {
            display: flex;
            width: 72%;
            min-height: 86px;
            border-radius: 24px;
            margin-left: auto;
            margin-right: -8px;
            margin-top: -18px;
            position: relative;
            z-index: 3;
          }

          .tariff-price { display: none; }

          .tariff-play-triangle {
            border-top-width: 18px;
            border-bottom-width: 18px;
            border-left-width: 28px;
            margin-left: 6px;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
