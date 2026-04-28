"use client";

import Link from "next/link";

const teamMembers = [
  {
    name: "Реваз Нозадзе",
    role: "Бизнес-девелопер и архитектор стратегических продаж",
    summary:
      "Отвечает за коммерческую архитектуру, unit economics и системное развитие продаж.",
    experience: [
      {
        title: "SaaS B2B продукты на рынках ЕС и США",
        responsibility:
          "Ключевые зоны: стратегия продаж, архитектура процессов, построение команды, GTM-логика и моделирование юнит-экономики.",
        result:
          "Результаты: реформирование Sales Department, новая CRM-интеграция, годовая выручка выросла с $350k до $800k.",
      },
      {
        title: "EdTech и консалтинговые B2B-сервисы",
        responsibility:
          "Ключевые зоны: outbound sales, управление командой, оптимизация кризисных процессов, настройка sales system.",
        result:
          "Результаты: сформирована sales-команда, выстроены процессы между отделами, годовая цель достигалась на 20% быстрее ожидаемого.",
      },
    ],
    wholePath:
      "14 лет в бизнес-девелопменте, 12 лет в B2B-продажах, 8 лет в развитии SaaS-проектов.",
    growthRoleTitle: "Зона ответственности в Growth Avenue",
    growthRole: [
      "Продажи",
      "Бизнес-девелопмент",
      "Управление бюджетом и масштабированием",
      "Разработка финансовой модели",
      "Юнит-экономика",
    ],
    teamArchetypeTitle: "Роль в команде",
    teamArchetype:
      "Риск-менеджер и стратег, который видит последствия до того, как решение принято.",
  },
  {
    name: "Виктория Терехова",
    role: "CEO / CMO, архитектор роста и операционной системы",
    summary:
      "Собирает маркетинг, delivery и управленческую логику в единую систему, чтобы рост не ломал компанию изнутри.",
    experience: [
      {
        title: "Маркетинговая стратегия и productized services",
        responsibility:
          "Ключевые зоны: позиционирование, упаковка ценности, demand architecture, операционный handoff и growth-приоритизация.",
        result:
          "Результаты: запускала новые сервисные направления, собирала управляемые customer journeys и делала рост более предсказуемым.",
      },
      {
        title: "Growth operations и аналитическая система",
        responsibility:
          "Ключевые зоны: аналитика, GTM-маршруты, внутренняя операционная дисциплина, поддержка founder-led команд в переходе к системе.",
        result:
          "Результаты: снижала хаос в исполнении, ускоряла принятие решений и связывала стратегию с ежедневным execution rhythm.",
      },
    ],
    wholePath:
      "10+ лет в маркетинге и growth-операциях, запуске сервисных моделей и управленческой упаковке команд.",
    growthRoleTitle: "Зона ответственности в Growth Avenue",
    growthRole: [
      "Маркетинг и позиционирование",
      "Структура delivery",
      "Аналитика и decision-making",
      "Партнёрства и сервисная упаковка",
      "Growth architecture",
    ],
    teamArchetypeTitle: "Роль в команде",
    teamArchetype:
      "Системный интегратор, который переводит стратегию в рабочие процессы, метрики и устойчивый execution.",
  },
];

export default function AboutCompanyPage() {
  return (
    <main className="about-company-page">
      <div className="about-company-bg" aria-hidden="true">
        <div className="about-company-aurora about-company-aurora-a" />
        <div className="about-company-aurora about-company-aurora-b" />
      </div>

      <section className="about-company-hero">
        <div className="about-company-hero-copy">
          <div className="about-company-kicker">Growth Avenue</div>
          <h1>BizDev company для компаний, которым нужен взрослый рост</h1>
          <p>
            Мы проектируем коммерческие системы, бизнес-девелопмент и
            стратегические маршруты роста так, чтобы команда выдерживала нагрузку,
            а рынок видел в компании зрелого игрока.
          </p>
          <div className="about-company-hero-actions">
            <Link href="/" className="about-company-home-link">
              На главную
            </Link>
            <a href="#team" className="about-company-scroll-link">
              Посмотреть команду
            </a>
          </div>
        </div>

        <div className="about-company-hero-card">
          <div className="about-company-photo-placeholder">Место для общей фотографии команды</div>
          <div className="about-company-hero-card-note">
            Здесь может быть командный визуал, backstage-фото или динамический
            рендер, который поддерживает доверие к бренду.
          </div>
        </div>
      </section>

      <section className="about-company-mission">
        <div className="about-company-mission-left">
          <img src="/logo.svg" alt="Growth Avenue" className="about-company-mission-logo" />
          <div className="about-company-mission-label">
            Наша миссия — здоровая конкурентная бизнес-среда
          </div>
        </div>

        <div className="about-company-mission-right">
          <div className="about-company-mission-topline">
            Наша главная цель — не просто оптимизировать процессы или увеличивать
            выручку, а формировать честную, зрелую конкуренцию среди малого и
            среднего бизнеса в Европе.
          </div>
          <div className="about-company-divider" />
          <p className="about-company-mission-quote">
            Мы верим, что в нестабильной экономической и политической среде именно
            устойчивые, ответственные и профессионально управляемые бизнесы
            формируют новую экономику.
          </p>
          <div className="about-company-highlight">
            Мы помогаем предпринимателям выстраивать сильные бизнес-процессы,
            управлять рисками и адаптироваться к внешним вызовам — чтобы они
            конкурировали не через демпинг и хаос, а через системную работу,
            осознанную стратегию и реальную ценность для конечного клиента.
          </div>
          <div className="about-company-divider" />
          <p className="about-company-mission-final">
            Наша миссия — делать бизнес-среду более зрелой, честной и сильной.
          </p>
        </div>
      </section>

      <section className="about-company-team" id="team">
        <div className="about-company-section-head">
          <div className="about-company-kicker">Команда</div>
          <h2>Люди, которые собирают стратегию, продажи и delivery в один контур</h2>
        </div>

        <div className="about-company-team-grid">
          {teamMembers.map((member, index) => (
            <article className="about-company-member-card" key={member.name}>
              <div className="about-company-member-top">
                <div>
                  <h3>{member.name}</h3>
                  <div className="about-company-member-role">{member.role}</div>
                  <p className="about-company-member-summary">{member.summary}</p>
                </div>
                <div className="about-company-photo-frame">
                  Фото {index + 1}
                </div>
              </div>

              <div className="about-company-member-divider" />

              <div className="about-company-member-columns">
                {member.experience.map((item) => (
                  <div className="about-company-member-column" key={item.title}>
                    <div className="about-company-member-column-title">{item.title}</div>
                    <p>{item.responsibility}</p>
                    <p>{item.result}</p>
                  </div>
                ))}
              </div>

              <div className="about-company-member-path">
                <strong>Весь путь:</strong> {member.wholePath}
              </div>

              <div className="about-company-member-bottom">
                <div className="about-company-member-responsibility">
                  <div className="about-company-member-bottom-title">
                    {member.growthRoleTitle}
                  </div>
                  <ul>
                    {member.growthRole.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="about-company-member-archetype">
                  <div className="about-company-member-bottom-title">
                    {member.teamArchetypeTitle}
                  </div>
                  <p>{member.teamArchetype}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx global>{`
        .about-company-page {
          position: relative;
          min-height: 100vh;
          overflow: clip;
          background:
            radial-gradient(circle at 14% 18%, rgba(112, 134, 255, 0.16), transparent 26%),
            radial-gradient(circle at 82% 10%, rgba(247, 210, 55, 0.12), transparent 22%),
            linear-gradient(145deg, #091426 0%, #0d1a31 46%, #0b1730 100%);
          color: #fefefe;
          padding: 120px 20px 64px;
        }

        .about-company-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: url("/noise3.png") repeat;
          opacity: .12;
          mix-blend-mode: soft-light;
        }

        .about-company-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .about-company-aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(58px);
          opacity: .55;
          animation: aboutFloat 10s ease-in-out infinite;
        }

        .about-company-aurora-a {
          width: 340px;
          height: 340px;
          top: 120px;
          right: 8%;
          background: rgba(113, 98, 255, 0.16);
        }

        .about-company-aurora-b {
          width: 420px;
          height: 420px;
          left: -80px;
          bottom: 10%;
          background: rgba(247, 210, 55, 0.12);
          animation-delay: -4s;
        }

        .about-company-hero,
        .about-company-mission,
        .about-company-team {
          position: relative;
          z-index: 2;
          max-width: 1380px;
          margin: 0 auto 28px;
        }

        .about-company-hero {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(340px, 0.88fr);
          gap: 24px;
          align-items: stretch;
        }

        .about-company-hero-copy,
        .about-company-hero-card,
        .about-company-member-card,
        .about-company-mission-right {
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(17,29,55,.82), rgba(10,19,38,.76));
          box-shadow: 0 24px 68px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .about-company-hero-copy {
          padding: 34px;
        }

        .about-company-kicker {
          color: #f7d237;
          font-size: 12px;
          letter-spacing: .22em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .about-company-hero-copy h1,
        .about-company-section-head h2 {
          margin: 0;
          font-size: clamp(42px, 6vw, 78px);
          line-height: .95;
          letter-spacing: -.05em;
        }

        .about-company-hero-copy p {
          margin: 20px 0 0;
          max-width: 640px;
          color: rgba(255,255,255,.82);
          font-size: 18px;
          line-height: 1.65;
        }

        .about-company-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .about-company-home-link,
        .about-company-scroll-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
        }

        .about-company-home-link {
          background: linear-gradient(90deg, #50b8ff, #c05cff);
          color: #fff;
        }

        .about-company-scroll-link {
          color: #fff;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.05);
        }

        .about-company-hero-card {
          padding: 26px;
          display: grid;
          gap: 16px;
          min-height: 360px;
        }

        .about-company-photo-placeholder,
        .about-company-photo-frame {
          display: grid;
          place-items: center;
          border-radius: 28px;
          border: 1px dashed rgba(255,255,255,.18);
          background:
            radial-gradient(circle at 20% 20%, rgba(247,210,55,.14), transparent 20%),
            rgba(255,255,255,.04);
          color: rgba(255,255,255,.72);
        }

        .about-company-photo-placeholder {
          min-height: 280px;
          font-size: 18px;
          font-weight: 600;
        }

        .about-company-hero-card-note {
          color: rgba(255,255,255,.68);
          font-size: 15px;
          line-height: 1.6;
        }

        .about-company-mission {
          display: grid;
          grid-template-columns: minmax(280px, 0.5fr) minmax(0, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .about-company-mission-left {
          border-radius: 34px;
          overflow: hidden;
          position: relative;
          padding: 34px 28px;
          background:
            linear-gradient(180deg, rgba(8,17,38,.94), rgba(12,23,45,.92)),
            url("/noise3.png");
          border: 1px solid rgba(255,255,255,.08);
          min-height: 100%;
        }

        .about-company-mission-left::after {
          content: "";
          position: absolute;
          inset: auto -5% -18% auto;
          width: 220px;
          height: 220px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(247,210,55,.34), rgba(247,210,55,0));
          filter: blur(16px);
        }

        .about-company-mission-logo {
          width: 320px;
          max-width: 100%;
        }

        .about-company-mission-label {
          position: absolute;
          left: 28px;
          bottom: 34px;
          max-width: 280px;
          color: #fff;
          font-size: clamp(34px, 3.8vw, 54px);
          line-height: .98;
          letter-spacing: -.04em;
        }

        .about-company-mission-right {
          padding: 30px 32px;
          color: #f9fafb;
        }

        .about-company-mission-topline,
        .about-company-mission-final {
          font-size: clamp(24px, 2.8vw, 40px);
          line-height: 1.15;
          letter-spacing: -.03em;
        }

        .about-company-mission-quote {
          margin: 0;
          color: rgba(255,255,255,.78);
          font-size: 22px;
          line-height: 1.45;
          font-style: italic;
        }

        .about-company-divider {
          height: 1px;
          margin: 24px 0;
          background: rgba(255,255,255,.14);
        }

        .about-company-highlight {
          padding: 22px 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(247,210,55,.12), rgba(255,255,255,.04));
          border: 1px solid rgba(247,210,55,.24);
          color: #fff;
          font-size: clamp(24px, 2.6vw, 38px);
          line-height: 1.18;
          letter-spacing: -.03em;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
        }

        .about-company-section-head {
          margin-bottom: 18px;
        }

        .about-company-section-head h2 {
          max-width: 940px;
          font-size: clamp(34px, 4.8vw, 64px);
        }

        .about-company-team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .about-company-member-card {
          padding: 30px;
        }

        .about-company-member-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 240px;
          gap: 22px;
          align-items: start;
        }

        .about-company-member-card h3 {
          margin: 0;
          font-size: clamp(34px, 4vw, 60px);
          line-height: .98;
          letter-spacing: -.04em;
        }

        .about-company-member-role {
          margin-top: 10px;
          color: rgba(255,255,255,.88);
          font-size: 22px;
          font-style: italic;
        }

        .about-company-member-summary {
          margin: 18px 0 0;
          color: rgba(255,255,255,.74);
          font-size: 17px;
          line-height: 1.65;
          max-width: 760px;
        }

        .about-company-photo-frame {
          min-height: 260px;
          font-weight: 700;
        }

        .about-company-member-divider {
          height: 1px;
          margin: 22px 0;
          background: rgba(255,255,255,.14);
        }

        .about-company-member-columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .about-company-member-column-title,
        .about-company-member-bottom-title {
          font-size: 17px;
          font-weight: 800;
          color: #fefefe;
          margin-bottom: 10px;
        }

        .about-company-member-column p,
        .about-company-member-archetype p,
        .about-company-member-responsibility li {
          color: rgba(255,255,255,.76);
          font-size: 17px;
          line-height: 1.55;
        }

        .about-company-member-path {
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,.14);
          font-size: 20px;
          line-height: 1.45;
        }

        .about-company-member-bottom {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 22px;
          margin-top: 24px;
        }

        .about-company-member-responsibility ul {
          margin: 0;
          padding-left: 22px;
        }

        .about-company-member-archetype {
          border-radius: 28px;
          padding: 22px;
          background: linear-gradient(180deg, rgba(13,24,46,.92), rgba(10,18,36,.88));
          border: 1px solid rgba(255,255,255,.1);
        }

        @keyframes aboutFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }

        @media (max-width: 1180px) {
          .about-company-hero,
          .about-company-mission,
          .about-company-member-top,
          .about-company-member-columns,
          .about-company-member-bottom {
            grid-template-columns: 1fr;
          }

          .about-company-mission-left {
            min-height: 360px;
          }

          .about-company-mission-label {
            max-width: 340px;
          }
        }

        @media (max-width: 767px) {
          .about-company-page {
            padding: 96px 14px 40px;
          }

          .about-company-hero-copy,
          .about-company-hero-card,
          .about-company-mission-right,
          .about-company-member-card,
          .about-company-mission-left {
            border-radius: 24px;
          }

          .about-company-hero-copy,
          .about-company-hero-card,
          .about-company-member-card,
          .about-company-mission-left,
          .about-company-mission-right {
            padding: 22px 18px;
          }

          .about-company-mission-label {
            left: 18px;
            bottom: 22px;
            font-size: 36px;
          }

          .about-company-mission-quote {
            font-size: 18px;
          }

          .about-company-highlight {
            padding: 18px;
            font-size: 24px;
          }

          .about-company-member-role {
            font-size: 18px;
          }

          .about-company-member-path {
            font-size: 17px;
          }
        }
      `}</style>
    </main>
  );
}
