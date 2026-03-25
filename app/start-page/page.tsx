"use client";

import { useMemo, useState } from "react";

export default function StartPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanedPhone = useMemo(() => phone.replace(/[^\d+]/g, ""), [phone]);

  const isValid =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    cleanedPhone.replace(/\D/g, "").length >= 8;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      /**
       * ВАЖНО:
       * сюда потом подставишь свой API endpoint / webhook / route handler
       * например: /api/start-access
       */
      const response = await fetch("/api/start-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить данные");
      }

      const data = await response.json();

      /**
       * ожидается, что backend вернет redirectUrl
       * например: { redirectUrl: "/start/abc123token" }
       */
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      alert("Данные сохранены, но ссылка для перехода не была получена.");
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="start-page">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      <section className="card-wrap">
        <div className="brand-pill">
          <span className="brand-dot" />
          Revenue Snapshot Access
        </div>

        <h1 className="title">Активируйте доступ к вашему Snapshot</h1>

        <p className="subtitle">
          После заполнения формы вы перейдёте к анкете. Доступ привязывается к
          вашей покупке и позволяет использовать Snapshot в рамках заданных
          условий.
        </p>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">Лимит запусков</div>
            <div className="info-value">3 попытки</div>
            <p className="info-text">
              Вы можете прогнать Snapshot до трёх раз и получить до трёх
              результатов.
            </p>
          </div>

          <div className="info-card">
            <div className="info-label">Срок доступа</div>
            <div className="info-value">1 год</div>
            <p className="info-text">
              Персональная ссылка остаётся активной в течение 12 месяцев с
              момента активации.
            </p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field-grid">
            <label className="field">
              <span className="field-label">Имя</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Введите имя"
                autoComplete="given-name"
              />
            </label>

            <label className="field">
              <span className="field-label">Фамилия</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Введите фамилию"
                autoComplete="family-name"
              />
            </label>
          </div>

          <label className="field">
            <span className="field-label">Телефон / WhatsApp</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+995 5XX XX XX XX"
              autoComplete="tel"
            />
            <span className="field-hint">
              Укажите номер, по которому можно с вами связаться.
            </span>
          </label>

          <div className="terms-box">
            <div className="terms-title">Условия доступа</div>
            <ul className="terms-list">
              <li>После активации вам доступно 3 запуска Snapshot.</li>
              <li>Каждый запуск может привести к отдельному результату анализа.</li>
              <li>Персональная ссылка действует 1 год с момента активации.</li>
              <li>
                Доступ предназначен для использования в рамках одного бизнеса /
                одного проекта.
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Сохраняем..." : "Начать Snapshot"}
          </button>
        </form>
      </section>

      <style jsx>{`
        .start-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #0b1d3a;
          color: #fefefe;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .card-wrap {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 860px;
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          background: rgba(10, 20, 40, 0.62);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
          box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(247, 210, 55, 0.12);
          border: 1px solid rgba(247, 210, 55, 0.22);
          color: #f7d237;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 18px;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 16px rgba(247, 210, 55, 0.8);
        }

        .title {
          margin: 0;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 0.98;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fefefe;
        }

        .subtitle {
          margin: 16px 0 0;
          max-width: 680px;
          font-size: 16px;
          line-height: 1.65;
          color: #c8cfdb;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 28px;
        }

        .info-card {
          padding: 18px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .info-label {
          font-size: 12px;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #a5aeb2;
          margin-bottom: 10px;
        }

        .info-value {
          font-size: 28px;
          line-height: 1;
          font-weight: 700;
          color: #f7d237;
          margin-bottom: 10px;
        }

        .info-text {
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
          color: #d9dee6;
        }

        .form {
          margin-top: 30px;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 14px;
        }

        .field-label {
          font-size: 14px;
          font-weight: 600;
          color: #e0e1e3;
        }

        .field input {
          width: 100%;
          min-height: 56px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding: 0 16px;
          font-size: 15px;
          outline: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .field input::placeholder {
          color: #7f89a4;
        }

        .field input:focus {
          border-color: rgba(247, 210, 55, 0.5);
          box-shadow: 0 0 0 4px rgba(247, 210, 55, 0.08);
          background: rgba(255, 255, 255, 0.07);
        }

        .field-hint {
          font-size: 12px;
          color: #8e97b0;
          line-height: 1.4;
        }

        .terms-box {
          margin-top: 10px;
          padding: 18px;
          border-radius: 20px;
          background: linear-gradient(
            180deg,
            rgba(247, 210, 55, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 100%
          );
          border: 1px solid rgba(247, 210, 55, 0.16);
        }

        .terms-title {
          font-size: 15px;
          font-weight: 700;
          color: #f7d237;
          margin-bottom: 10px;
        }

        .terms-list {
          margin: 0;
          padding-left: 18px;
          color: #dce2eb;
          font-size: 14px;
          line-height: 1.65;
        }

        .submit-btn {
          width: 100%;
          margin-top: 18px;
          min-height: 58px;
          border: none;
          border-radius: 18px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          color: #0b1d3a;
          background: #f7d237;
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            opacity 0.18s ease;
          box-shadow:
            0 14px 32px rgba(247, 210, 55, 0.25),
            0 0 24px rgba(247, 210, 55, 0.18);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow:
            0 18px 40px rgba(247, 210, 55, 0.28),
            0 0 28px rgba(247, 210, 55, 0.2);
        }

        .submit-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .bg-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          opacity: 0.35;
          z-index: 0;
        }

        .orb-1 {
          width: 320px;
          height: 320px;
          background: rgba(247, 210, 55, 0.22);
          top: 8%;
          left: 7%;
        }

        .orb-2 {
          width: 420px;
          height: 420px;
          background: rgba(108, 122, 255, 0.18);
          bottom: 2%;
          right: 4%;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.08;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.045;
          background-image: radial-gradient(#ffffff 0.5px, transparent 0.5px);
          background-size: 8px 8px;
        }

        @media (max-width: 780px) {
          .card-wrap {
            padding: 22px;
            border-radius: 24px;
          }

          .info-grid,
          .field-grid {
            grid-template-columns: 1fr;
          }

          .title {
            font-size: 34px;
          }

          .subtitle {
            font-size: 15px;
          }

          .info-value {
            font-size: 24px;
          }

          .submit-btn {
            min-height: 54px;
          }
        }
      `}</style>
    </main>
  );
}
