"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const TG_CONTACT_URL = "https://t.me/growth_avenue_company";
const WA_PHONE = "995555163833";
const PROFILE_URL = "https://revenue-snapshot2026.vercel.app/cabinet-login";

type Service = {
  title: string;
  kicker: string;
  description: string;
  breakdown: string[];
};

const services: Service[] = [
  {
    title: "Strategic Session",
    kicker: "Point strategy",
    description:
      "Точечная стратегическая работа для предпринимателя или руководителя, когда нужен ясный взгляд со стороны, приоритизация задач и конкретный план роста без долгих консультационных циклов.",
    breakdown: [
      "Диагностика текущей ситуации бизнеса, целей и ограничений.",
      "Выявление ключевых точек роста и слабых мест.",
      "Декомпозиция целей на реальные этапы.",
      "Формирование пошагового roadmap действий.",
      "Рекомендации по инструментам, ресурсам и приоритетам.",
      "Финальная сессия с ответами на вопросы и фиксацией следующего шага.",
    ],
  },
  {
    title: "Growth Strategy",
    kicker: "Scale route",
    description:
      "Комплексная стратегия масштабирования компании. Для предпринимателя или руководителя, которому нужен не набор идей, а системный маршрут роста на основе цифр, рынка и внутренних ресурсов.",
    breakdown: [
      "Онбординг и стратегическая вводная сессия.",
      "Глубокий аудит продаж, экономики, маркетинга, позиционирования и финансовой модели.",
      "Customer Development и изучение клиентов/рынка.",
      "Формирование стратегии роста на основе данных.",
      "Разработка unit-экономики и прибыльной модели масштабирования.",
      "Создание продуктовых офферов и усиление позиционирования.",
      "Маркетинговый календарь и план каналов продвижения.",
      "Подбор инструментов и системы контроля результатов.",
    ],
  },
  {
    title: "Leading Strategy",
    kicker: "Execution control",
    description:
      "Сопровождение внедрения стратегии в реальную операционную работу. Для предпринимателя или руководителя, у которого стратегия уже есть, но нужен контроль исполнения и достижение результата.",
    breakdown: [
      "Аудит готовности команды и ресурсов к внедрению стратегии.",
      "Назначение ролей, зон ответственности и бюджетов.",
      "Наставничество руководителей направлений и CEO.",
      "Построение roadmap со спринтами и дедлайнами.",
      "Регулярные тактические корректировки по ходу реализации.",
      "Контроль рисков и промежуточных результатов.",
      "Передача системы управления компании для самостоятельного продолжения роста.",
    ],
  },
  {
    title: "MVP",
    kicker: "Fast validation",
    description:
      "Быстрый запуск новой гипотезы, продукта или канала продаж с минимальными рисками и контролируемыми инвестициями.",
    breakdown: [
      "Анализ продукта, рынка и целевой аудитории.",
      "Формирование сильного оффера и гипотезы запуска.",
      "Разработка маркетинговой стратегии теста.",
      "Подготовка лендинга, креативов, текстов и CTA.",
      "Настройка рекламной инфраструктуры и аналитики.",
      "Финансовое моделирование: маржинальность, ROI, окупаемость.",
      "Проведение теста и сбор данных.",
      "Post-campaign отчет и рекомендации по масштабированию.",
    ],
  },
  {
    title: "Mentoring",
    kicker: "Growth partner",
    description:
      "Практическое сопровождение предпринимателя или команды в формате регулярной работы. Для тех, кому нужен внешний сильный партнер, контроль темпа и быстрые решения.",
    breakdown: [
      "Первичный брифинг и сбор данных.",
      "Формирование четкого запроса и целей сотрудничества.",
      "Создание списка приоритетных действий.",
      "Серия рабочих встреч с контролем выполнения задач.",
      "Корректировка решений по мере движения.",
      "Поддержка между встречами в рабочем чате.",
      "Финальный блок рекомендаций и следующий этап роста.",
    ],
  },
  {
    title: "Sales Architecture",
    kicker: "Predictable sales",
    description:
      "Построение или перестройка системы продаж, чтобы компания росла предсказуемо, а продажи зависели не от хаоса, а от процесса.",
    breakdown: [
      "Интервью с бизнесом: рынок, цели, команда, текущие продажи.",
      "Анализ воронки, KPI, цикла сделки и слабых мест.",
      "Создание дорожной карты отдела продаж.",
      "Подбор CRM, инструментов и процессов управления.",
      "Построение KPI-системы и прозрачной воронки.",
      "Внедрение изменений совместно с командой клиента.",
      "Передача чек-листов, регламентов и отчетности.",
      "Подготовка компании к следующему этапу роста.",
    ],
  },
];

function makeWaUrl(serviceTitle: string) {
  const text = encodeURIComponent(
    `Здравствуйте! Хочу записаться на услугу ${serviceTitle}.`
  );
  return `https://wa.me/${WA_PHONE}?text=${text}`;
}

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  const activeProgress = useMemo(
    () => Math.round(((activeIndex + 1) / services.length) * 100),
    [activeIndex]
  );

  return (
    <main className="services-shell">
      <div className="services-bg" aria-hidden="true">
        <div className="services-orbit services-orbit-a" />
        <div className="services-orbit services-orbit-b" />
        <div className="services-light-grid" />
      </div>

      <header className="services-header">
        <Link href="/" className="services-logo-link" aria-label="Growth Avenue home">
          <Image
            src="/logo.svg"
            alt="Growth Avenue"
            width={170}
            height={40}
            className="services-logo"
            priority
          />
        </Link>

        <nav className="services-nav" aria-label="Основная навигация">
          <Link href="/" className="services-nav-link">
            Главная
          </Link>
          <a href={PROFILE_URL} className="services-nav-link">
            Profile
          </a>
          <a href={TG_CONTACT_URL} target="_blank" rel="noreferrer" className="services-nav-pill">
            TG
          </a>
          <a href={makeWaUrl(activeService.title)} target="_blank" rel="noreferrer" className="services-nav-pill">
            WA
          </a>
        </nav>
      </header>

      <section className="services-hero">
        <div className="services-hero-copy">
          <div className="services-kicker">
            <span />
            Growth Avenue services
          </div>
          <h1>Услуги для роста, стратегии и управляемого внедрения</h1>
          <p>
            Выберите формат работы: от точечной стратегической сессии до
            построения продаж, MVP-запуска и сопровождения реализации.
          </p>
        </div>

        <div className="services-hero-panel">
          <div className="services-panel-top">
            <span>Selected service</span>
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          </div>
          <h2>{activeService.title}</h2>
          <p>{activeService.description}</p>
          <div className="services-progress-track">
            <div style={{ width: `${activeProgress}%` }} />
          </div>
          <div className="services-panel-actions">
            <a href={makeWaUrl(activeService.title)} target="_blank" rel="noreferrer">
              Записаться в WA
            </a>
            <a href={TG_CONTACT_URL} target="_blank" rel="noreferrer">
              Записаться в TG
            </a>
          </div>
        </div>
      </section>

      <section className="services-layout" aria-label="Список услуг">
        <div className="services-cards">
          {services.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={service.title}
                type="button"
                className={`service-card ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="service-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-card-kicker">{service.kicker}</span>
                <strong>{service.title}</strong>
                <span className="service-card-text">{service.description}</span>
                <span className="service-card-actions" aria-hidden="true">
                  <span>WA</span>
                  <span>TG</span>
                </span>
              </button>
            );
          })}
        </div>

        <aside className="service-detail-card">
          <div className="service-detail-head">
            <span>{activeService.kicker}</span>
            <strong>{activeService.title}</strong>
          </div>

          <ol className="service-breakdown">
            {activeService.breakdown.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <div className="service-detail-actions">
            <a href={makeWaUrl(activeService.title)} target="_blank" rel="noreferrer">
              Записаться через WhatsApp
            </a>
            <a href={TG_CONTACT_URL} target="_blank" rel="noreferrer">
              Записаться через Telegram
            </a>
          </div>
        </aside>
      </section>

      <style jsx>{`
        .services-shell {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 8%, rgba(247, 210, 55, 0.16), transparent 24%),
            radial-gradient(circle at 84% 12%, rgba(71, 182, 246, 0.12), transparent 22%),
            #0b1d3a;
          color: #fefefe;
          padding: 26px 22px 56px;
        }

        .services-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .services-orbit {
          position: absolute;
          border-radius: 999px;
          filter: blur(4px);
          opacity: 0.68;
          animation: serviceFloat 14s ease-in-out infinite alternate;
        }

        .services-orbit-a {
          width: 520px;
          height: 520px;
          right: -180px;
          top: 90px;
          background: radial-gradient(circle, rgba(255,255,255,0.22), rgba(247,210,55,0.10) 38%, transparent 68%);
        }

        .services-orbit-b {
          width: 440px;
          height: 440px;
          left: -160px;
          bottom: 10%;
          background: radial-gradient(circle, rgba(255,255,255,0.20), rgba(71,182,246,0.10) 42%, transparent 70%);
          animation-delay: -4s;
        }

        .services-light-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, transparent, black 16%, black 72%, transparent);
          animation: gridDrift 18s linear infinite;
        }

        .services-header,
        .services-hero,
        .services-layout {
          position: relative;
          z-index: 1;
          width: min(1320px, 100%);
          margin: 0 auto;
        }

        .services-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 14px 16px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 24px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(24px);
          box-shadow: 0 18px 42px rgba(0,0,0,0.18);
        }

        .services-logo-link {
          display: inline-flex;
          align-items: center;
        }

        .services-logo {
          width: 170px;
          height: auto;
          filter: drop-shadow(0 0 18px rgba(255,255,255,0.10));
        }

        .services-nav {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }

        .services-nav-link,
        .services-nav-pill {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 16px;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          transition: transform .2s ease, background .2s ease;
        }

        .services-nav-pill {
          min-width: 46px;
          padding: 0 12px;
          background: linear-gradient(90deg, #47b6f6, #7c84ff 56%, #c25cf3);
        }

        .services-nav-link:hover,
        .services-nav-pill:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.15);
        }

        .services-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.72fr);
          gap: 22px;
          align-items: stretch;
          margin-top: 24px;
        }

        .services-hero-copy,
        .services-hero-panel,
        .service-card,
        .service-detail-card {
          border: 1px solid rgba(255,255,255,0.34);
          background:
            linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,255,255,0.56)),
            radial-gradient(circle at top left, rgba(247,210,55,0.22), transparent 36%);
          color: #13213a;
          backdrop-filter: blur(28px);
          box-shadow: 0 24px 70px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.66);
        }

        .services-hero-copy {
          min-height: 390px;
          border-radius: 34px;
          padding: clamp(28px, 5vw, 58px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        .services-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #7a6220;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .services-kicker span {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 16px rgba(247,210,55,0.8);
        }

        .services-hero h1 {
          margin: 18px 0 0;
          max-width: 920px;
          color: #102041;
          font-size: clamp(44px, 7vw, 92px);
          line-height: .88;
          font-weight: 760;
          letter-spacing: 0;
        }

        .services-hero-copy p {
          margin: 24px 0 0;
          max-width: 740px;
          color: rgba(16,32,65,0.72);
          font-size: 18px;
          line-height: 1.55;
        }

        .services-hero-panel {
          border-radius: 30px;
          padding: 28px;
          display: flex;
          flex-direction: column;
        }

        .services-panel-top {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: rgba(16,32,65,0.58);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .services-panel-top strong {
          color: #102041;
          font-size: 24px;
          letter-spacing: 0;
        }

        .services-hero-panel h2 {
          margin: 42px 0 0;
          color: #102041;
          font-size: 34px;
          line-height: 1;
        }

        .services-hero-panel p {
          margin: 16px 0 0;
          color: rgba(16,32,65,0.70);
          font-size: 15px;
          line-height: 1.7;
        }

        .services-progress-track {
          height: 9px;
          margin-top: auto;
          border-radius: 999px;
          background: rgba(16,32,65,0.10);
          overflow: hidden;
        }

        .services-progress-track div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #47b6f6, #7c84ff, #f7d237);
          transition: width .35s ease;
        }

        .services-panel-actions,
        .service-detail-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .services-panel-actions a,
        .service-detail-actions a {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 16px;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          background: linear-gradient(90deg, #47b6f6, #7c84ff 58%, #c25cf3);
          box-shadow: 0 14px 30px rgba(71,96,255,0.22);
        }

        .services-panel-actions a:nth-child(2),
        .service-detail-actions a:nth-child(2) {
          color: #102041;
          background: #f7d237;
          box-shadow: 0 14px 30px rgba(247,210,55,0.22);
        }

        .services-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.54fr);
          gap: 22px;
          margin-top: 22px;
          align-items: start;
        }

        .services-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .service-card {
          min-height: 250px;
          position: relative;
          overflow: hidden;
          display: grid;
          align-content: start;
          gap: 12px;
          border-radius: 26px;
          padding: 22px;
          text-align: left;
          cursor: pointer;
          transition: transform .24s ease, background .24s ease, border-color .24s ease;
        }

        .service-card:hover,
        .service-card.is-active {
          transform: translateY(-4px);
          border-color: rgba(247,210,55,0.72);
          background:
            linear-gradient(145deg, rgba(255,255,255,0.94), rgba(255,255,255,0.66)),
            radial-gradient(circle at top right, rgba(247,210,55,0.30), transparent 42%);
        }

        .service-card-index {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          color: #102041;
          background: rgba(16,32,65,0.08);
          font-weight: 800;
        }

        .service-card-kicker {
          color: #846a1f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .service-card strong {
          color: #102041;
          font-size: 28px;
          line-height: 1;
        }

        .service-card-text {
          color: rgba(16,32,65,0.68);
          font-size: 14px;
          line-height: 1.56;
        }

        .service-card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }

        .service-card-actions span {
          min-height: 30px;
          min-width: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #102041;
          background: rgba(16,32,65,0.08);
          font-size: 11px;
          font-weight: 800;
        }

        .service-detail-card {
          position: sticky;
          top: 24px;
          border-radius: 30px;
          padding: 26px;
        }

        .service-detail-head span {
          color: #846a1f;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .service-detail-head strong {
          display: block;
          margin-top: 10px;
          color: #102041;
          font-size: 32px;
          line-height: 1;
        }

        .service-breakdown {
          display: grid;
          gap: 10px;
          margin: 24px 0 0;
          padding: 0;
          list-style: none;
          counter-reset: serviceStep;
        }

        .service-breakdown li {
          counter-increment: serviceStep;
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: start;
          color: rgba(16,32,65,0.72);
          font-size: 14px;
          line-height: 1.5;
        }

        .service-breakdown li::before {
          content: counter(serviceStep);
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #102041;
          background: rgba(247,210,55,0.62);
          font-size: 12px;
          font-weight: 900;
        }

        @keyframes serviceFloat {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(-46px, 34px, 0) scale(1.06); }
        }

        @keyframes gridDrift {
          from { background-position: 0 0; }
          to { background-position: 72px 72px; }
        }

        @media (max-width: 1020px) {
          .services-hero,
          .services-layout {
            grid-template-columns: 1fr;
          }

          .service-detail-card {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 720px) {
          .services-shell {
            padding: 16px 14px 36px;
          }

          .services-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .services-nav {
            width: 100%;
            justify-content: flex-start;
          }

          .services-hero-copy {
            min-height: 360px;
          }

          .services-cards {
            grid-template-columns: 1fr;
          }

          .services-panel-actions a,
          .service-detail-actions a {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
