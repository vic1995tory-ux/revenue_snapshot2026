"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getPlaygroundPricingSnapshot } from "@/lib/playground-pricing";

const TG_CONTACT_URL = "https://t.me/growth_avenue_company";
const WA_PHONE = "995555163833";
const PROFILE_URL = "https://revenue-snapshot2026.vercel.app/cabinet-login";
const playgroundPricing = getPlaygroundPricingSnapshot();

type Service = {
  title: string;
  kicker: string;
  description: string;
  meta: string[];
  breakdown: string[];
};

type Tool = {
  title: string;
  status: string;
  description: string;
  prices?: Array<{ label: string; value: string }>;
  points: string[];
};

const heroTags = [
  "#масштабирование бизнеса",
  "#troubleshooting",
  "#C-level экспертиза",
  "#go-to-market",
  "#unit-economics",
];

const services: Service[] = [
  {
    title: "Strategic Session",
    kicker: "Point strategy",
    description:
      "Точечная стратегическая работа для предпринимателя или руководителя, когда нужен ясный взгляд со стороны, приоритизация задач и конкретный план роста без долгих консультационных циклов.",
    meta: ["Быстрый фокус", "Roadmap", "Next step"],
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
    meta: ["Аудит", "Unit economics", "Growth route"],
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
    meta: ["Спринты", "Контроль", "Leadership"],
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
    meta: ["Hypothesis", "Launch", "ROI"],
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
    meta: ["Темп", "Чат", "Решения"],
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
    meta: ["CRM", "KPI", "Pipeline"],
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

const tools: Tool[] = [
  {
    title: "Revenue Snapshot",
    status: "available",
    description:
      "Интерактивная диагностика экономики бизнеса: ограничения роста, точки потерь, рычаги усиления и управленческий roadmap в личном кабинете.",
    prices: [
      { label: "Online Playground", value: playgroundPricing.currentPriceLabel },
      { label: "On Rec", value: "$770" },
    ],
    points: [
      "Экономическая картина бизнеса",
      "Гипотезы роста и рисков",
      "Интерактивный результат",
      "Доступ из личного кабинета",
    ],
  },
  {
    title: "SellTimer",
    status: "coming soon",
    description:
      "Маркетинговый календарь, который собирается вокруг реального бизнеса: сезонность, ключевые временные точки, инструменты компенсации просадок и план активностей внутри личного кабинета.",
    points: [
      "Описание бизнеса и контекста",
      "Полуавтоматическая сборка календаря",
      "Ключевые периоды активности",
      "Трекинг задач и отметок в кабинете",
    ],
  },
  {
    title: "Forecaster",
    status: "coming soon",
    description:
      "Инструмент прогнозирования unit-экономики в трех сценариях: пессимистичном, целевом и оптимистичном. Для каждого сценария он показывает риски, защитные решения и плановую экономику на четыре месяца.",
    points: [
      "3 сценария развития экономики",
      "Риски и защитные действия",
      "4-месячная цель по unit-экономике",
      "Решения для каждого этапа",
    ],
  },
];

function makeWaUrl(subject: string) {
  const text = encodeURIComponent(
    `Здравствуйте! Хочу подобрать формат работы: ${subject}.`
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
        <div className="services-wave services-wave-a" />
        <div className="services-wave services-wave-b" />
        <div className="services-grid" />
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
          <div className="hero-tags" aria-label="Фокусы Growth Avenue">
            {heroTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a href={makeWaUrl("подобрать услугу")} target="_blank" rel="noreferrer" className="hero-primary-action">
            Подобрать услугу
          </a>
        </div>

        <aside className="services-about-card">
          <div className="about-eyebrow">Who we are</div>
          <h2>C-level команда на стыке маркетинга и продаж</h2>
          <p>
            Мы собираем в одну рабочую систему стратегию, маркетинг и продажи.
            В команде C-level специалисты, которые знают, насколько критично,
            чтобы спрос, оффер, воронка и коммерческая команда двигались в одном
            ритме.
          </p>
          <p>
            Мы работали с малым и средним бизнесом в Евросоюзе, с крупными
            игроками рынка в СНГ и проектами в SaaS, e-commerce, AdTech и
            HealthTech. Любим цифры, ясные решения и тот момент, когда бизнес
            наконец перестает спорить с собственной воронкой.
          </p>
          <div className="about-proof-grid">
            <span>EU + CIS</span>
            <span>SaaS</span>
            <span>E-com</span>
            <span>AdTech</span>
            <span>HealthTech</span>
          </div>
        </aside>
      </section>

      <section className="services-layout" aria-label="Список услуг">
        <div>
          <div className="section-title-row">
            <span>Services</span>
            <h2>Выберите формат работы</h2>
          </div>

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
                  aria-pressed={isActive}
                >
                  <span className="service-card-top">
                    <span className="service-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="service-card-kicker">{service.kicker}</span>
                  </span>
                  <strong>{service.title}</strong>
                  <span className="service-card-text">{service.description}</span>
                  <span className="service-card-meta" aria-label="Ключевые признаки услуги">
                    {service.meta.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="service-detail-card">
          <div className="service-detail-head">
            <span>{activeService.kicker}</span>
            <strong>{activeService.title}</strong>
          </div>

          <div className="detail-progress">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div>
              <i style={{ width: `${activeProgress}%` }} />
            </div>
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

      <section className="tools-section" aria-label="Инструменты Growth Avenue">
        <div className="section-title-row section-title-row-light">
          <span>Tools</span>
          <h2>Инструменты</h2>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <article key={tool.title} className="tool-card">
              <div className="tool-card-head">
                <h3>{tool.title}</h3>
                <span className={tool.status === "available" ? "status-live" : "status-soon"}>
                  {tool.status === "available" ? "available" : "coming soon"}
                </span>
              </div>
              <p>{tool.description}</p>
              {tool.prices ? (
                <div className="tool-prices">
                  {tool.prices.map((price) => (
                    <span key={price.label}>
                      <small>{price.label}</small>
                      <strong>{price.value}</strong>
                    </span>
                  ))}
                </div>
              ) : null}
              <ul>
                {tool.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="tool-actions">
                <a href={makeWaUrl(tool.title)} target="_blank" rel="noreferrer">
                  Обсудить в WA
                </a>
                <a href={TG_CONTACT_URL} target="_blank" rel="noreferrer">
                  TG
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx>{`
        .services-shell {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #08172d;
          color: #fefefe;
          padding: 26px 22px 56px;
        }

        .services-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          background:
            radial-gradient(circle at 18% 10%, rgba(247, 210, 55, 0.13), transparent 26%),
            radial-gradient(circle at 88% 8%, rgba(71, 182, 246, 0.12), transparent 24%),
            linear-gradient(180deg, #102238 0%, #061327 100%);
        }

        .services-wave {
          position: absolute;
          left: -14%;
          right: -14%;
          height: 300px;
          border-radius: 50%;
          background: linear-gradient(90deg, transparent, rgba(247,210,55,0.12), rgba(247,210,55,0.60), rgba(255,255,255,0.22), rgba(247,210,55,0.30), transparent);
          filter: blur(18px);
          transform: rotate(-8deg);
          animation: waveSlide 16s ease-in-out infinite alternate;
          opacity: .86;
        }

        .services-wave-a {
          bottom: 12%;
        }

        .services-wave-b {
          bottom: 4%;
          transform: rotate(6deg);
          opacity: .42;
          animation-delay: -5s;
        }

        .services-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black, black 78%, transparent);
        }

        .services-header,
        .services-hero,
        .services-layout,
        .tools-section {
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
          grid-template-columns: minmax(0, 1fr) minmax(360px, .72fr);
          gap: 22px;
          align-items: stretch;
          margin-top: 24px;
        }

        .services-hero-copy,
        .services-about-card {
          min-height: 520px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.14);
          background:
            linear-gradient(180deg, rgba(7,14,30,0.80), rgba(8,20,40,0.62)),
            radial-gradient(circle at bottom left, rgba(247,210,55,0.26), transparent 42%);
          color: #fff;
          backdrop-filter: blur(22px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10);
          overflow: hidden;
        }

        .services-hero-copy {
          padding: clamp(28px, 5vw, 58px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .services-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f7d237;
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
          color: #fff;
          font-size: clamp(44px, 6.2vw, 86px);
          line-height: .9;
          font-weight: 760;
          letter-spacing: 0;
        }

        .services-hero-copy p {
          margin: 24px 0 0;
          max-width: 740px;
          color: rgba(255,255,255,0.78);
          font-size: 18px;
          line-height: 1.55;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }

        .hero-tags span {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 0 14px;
          color: #102041;
          background: rgba(247,210,55,0.90);
          font-size: 13px;
          font-weight: 800;
        }

        .hero-primary-action {
          width: fit-content;
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          border-radius: 999px;
          padding: 0 22px;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 800;
          background: linear-gradient(90deg, #47b6f6, #7c84ff 58%, #c25cf3);
          box-shadow: 0 18px 36px rgba(71,96,255,0.24);
        }

        .services-about-card {
          padding: clamp(26px, 4vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .about-eyebrow {
          color: rgba(247,210,55,0.92);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .services-about-card h2 {
          margin: 20px 0 0;
          color: #fff;
          font-size: clamp(34px, 4vw, 54px);
          line-height: .94;
          font-weight: 720;
        }

        .services-about-card p {
          margin: 18px 0 0;
          color: rgba(255,255,255,0.74);
          font-size: 16px;
          line-height: 1.65;
        }

        .about-proof-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
        }

        .about-proof-grid span {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 0 12px;
          color: rgba(255,255,255,0.88);
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.10);
          font-size: 12px;
          font-weight: 800;
        }

        .services-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.54fr);
          gap: 22px;
          margin-top: 28px;
          align-items: start;
        }

        .section-title-row {
          margin-bottom: 14px;
        }

        .section-title-row span {
          color: #f7d237;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .section-title-row h2 {
          margin: 8px 0 0;
          color: #fff;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1;
        }

        .services-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .service-card,
        .service-detail-card,
        .tool-card {
          border: 1px solid rgba(255,255,255,0.34);
          background:
            linear-gradient(145deg, rgba(255,255,255,0.86), rgba(255,255,255,0.58)),
            radial-gradient(circle at top left, rgba(247,210,55,0.20), transparent 36%);
          color: #13213a;
          backdrop-filter: blur(28px);
          box-shadow: 0 24px 70px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.66);
        }

        .service-card {
          min-height: 268px;
          position: relative;
          overflow: hidden;
          display: grid;
          align-content: start;
          gap: 12px;
          border-radius: 26px;
          padding: 22px;
          text-align: left;
          cursor: pointer;
          transition: transform .24s ease, background .24s ease, border-color .24s ease, box-shadow .24s ease;
        }

        .service-card:hover,
        .service-card.is-active {
          transform: translateY(-4px);
          border-color: rgba(247,210,55,0.90);
          background:
            linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.72)),
            radial-gradient(circle at top right, rgba(247,210,55,0.34), transparent 42%);
          box-shadow: 0 28px 80px rgba(247,210,55,0.15), 0 20px 70px rgba(0,0,0,0.16);
        }

        .service-card.is-active::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid rgba(247,210,55,0.76);
          pointer-events: none;
        }

        .service-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .service-card-index {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          color: #102041;
          background: rgba(16,32,65,0.08);
          font-weight: 900;
          transition: background .24s ease, color .24s ease, transform .24s ease;
        }

        .service-card.is-active .service-card-index {
          color: #102041;
          background: #f7d237;
          transform: scale(1.05);
          box-shadow: 0 14px 24px rgba(247,210,55,0.32);
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

        .service-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .service-card-meta span {
          min-height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 10px;
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

        .detail-progress {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px;
          align-items: center;
          margin-top: 22px;
        }

        .detail-progress span {
          color: #102041;
          font-size: 22px;
          font-weight: 900;
        }

        .detail-progress div {
          height: 9px;
          border-radius: 999px;
          background: rgba(16,32,65,0.10);
          overflow: hidden;
        }

        .detail-progress i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #47b6f6, #7c84ff, #f7d237);
          transition: width .35s ease;
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

        .service-detail-actions,
        .tool-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .service-detail-actions a,
        .tool-actions a {
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

        .service-detail-actions a:nth-child(2),
        .tool-actions a:nth-child(2) {
          color: #102041;
          background: #f7d237;
          box-shadow: 0 14px 30px rgba(247,210,55,0.22);
        }

        .tools-section {
          margin-top: 46px;
        }

        .section-title-row-light h2 {
          color: #fff;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .tool-card {
          min-height: 390px;
          border-radius: 28px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .tool-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .tool-card h3 {
          margin: 0;
          color: #102041;
          font-size: 30px;
          line-height: 1;
        }

        .status-live,
        .status-soon {
          min-height: 28px;
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 0 10px;
          color: #102041;
          background: #f7d237;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .status-soon {
          color: rgba(16,32,65,0.72);
          background: rgba(16,32,65,0.10);
        }

        .tool-card p {
          margin: 18px 0 0;
          color: rgba(16,32,65,0.70);
          font-size: 15px;
          line-height: 1.62;
        }

        .tool-prices {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 18px;
        }

        .tool-prices span {
          min-height: 74px;
          border-radius: 18px;
          padding: 12px;
          background: rgba(16,32,65,0.08);
        }

        .tool-prices small {
          display: block;
          color: rgba(16,32,65,0.58);
          font-size: 12px;
          line-height: 1.25;
        }

        .tool-prices strong {
          display: block;
          margin-top: 8px;
          color: #102041;
          font-size: 28px;
          line-height: 1;
        }

        .tool-card ul {
          display: grid;
          gap: 9px;
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
        }

        .tool-card li {
          display: grid;
          grid-template-columns: 9px 1fr;
          gap: 10px;
          color: rgba(16,32,65,0.70);
          font-size: 14px;
          line-height: 1.45;
        }

        .tool-card li::before {
          content: "";
          width: 9px;
          height: 9px;
          margin-top: 6px;
          border-radius: 999px;
          background: #f7d237;
        }

        .tool-actions {
          margin-top: auto;
          padding-top: 22px;
        }

        @keyframes waveSlide {
          from { transform: translate3d(-2%, 0, 0) rotate(-8deg) scale(1); }
          to { transform: translate3d(4%, -18px, 0) rotate(-4deg) scale(1.04); }
        }

        @media (max-width: 1060px) {
          .services-hero,
          .services-layout,
          .tools-grid {
            grid-template-columns: 1fr;
          }

          .service-detail-card {
            position: relative;
            top: 0;
          }

          .services-hero-copy,
          .services-about-card {
            min-height: 420px;
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

          .services-hero h1 {
            font-size: 44px;
          }

          .services-cards {
            grid-template-columns: 1fr;
          }

          .service-detail-actions a,
          .tool-actions a,
          .hero-primary-action {
            width: 100%;
          }

          .tool-prices {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
