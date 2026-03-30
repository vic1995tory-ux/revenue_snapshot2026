"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ThankYouPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextUrl = "/cabinet-login";

  const handleGoToCabinet = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(nextUrl);
    }, 1800);
  };

  return (
    <main className="thankyou-page">
      <div className="thankyou-background" aria-hidden="true">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="vignette" />
      </div>

      <section className="thankyou-shell">
        <div className="thankyou-card">
          <div className="thankyou-visual">
            <img src="/hero.svg" alt="Growth Avenue" className="thankyou-hero" />
          </div>

          <div className="thankyou-content">
            <div className="thankyou-kicker">Payment confirmed</div>

            <h1 className="thankyou-title">Добро пожаловать!</h1>

            <div className="thankyou-text">
              <p>
                Добро пожаловать в экосистему growth.avenue!
              </p>

              <p>
                Здесь вы найдете инструменты, которые дают возможности для
                контролируемого роста бизнеса и объективной оценки текущих
                возможностей.
              </p>

              <div className="thankyou-list-block">
                <div className="thankyou-list-title">В разработке находятся:</div>

                <ul className="thankyou-list">
                  <li>
                    Маркетинговый Календарь
                    <span className="thankyou-note">
                      * релиз планируется на июнь 2026
                    </span>
                  </li>
                  <li>
                    Трекер стратегии
                    <span className="thankyou-note">
                      * релиз планируется на конец лета 2026
                    </span>
                  </li>
                  <li>
                    Конструктор фин. модели
                    <span className="thankyou-note">
                      * релиз планируется на конец лета 2026
                    </span>
                  </li>
                </ul>
              </div>

              <p className="thankyou-accent">
                У вас будет возможность попробовать их бесплатно!
              </p>
            </div>

            <div className="thankyou-actions">
              <button
                type="button"
                className="thankyou-btn"
                onClick={handleGoToCabinet}
                disabled={isTransitioning}
              >
                Перейти в Личный кабинет
              </button>
            </div>
          </div>
        </div>
      </section>

      {isTransitioning && (
        <div className="gif-overlay" role="dialog" aria-modal="true" aria-label="Переход в личный кабинет">
          <div className="gif-overlay-backdrop" />
          <div className="gif-overlay-content">
            <img
              src="/vicky_ticky_tavi_httpss.mj.runX8tiGZkFDLE_i_want_an_analogue__07099a01-3e02-4ea5-bb9d-70a6ff023a6a_2.gif"
              alt="Loading transition"
              className="gif-overlay-image"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        html,
        body {
          background: #0a1526;
        }

        .thankyou-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #0a1526;
          color: #fefefe;
        }

        .thankyou-background {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 18% 22%, rgba(112, 134, 255, 0.12), transparent 26%),
            radial-gradient(circle at 82% 18%, rgba(255, 255, 255, 0.05), transparent 22%),
            radial-gradient(circle at 62% 70%, rgba(135, 97, 255, 0.08), transparent 22%),
            linear-gradient(130deg, #0a1526 0%, #0c1830 34%, #0a1526 68%, #121f39 100%);
          background-size: 140% 140%;
          animation: pageAmbient 26s ease-in-out infinite alternate;
        }

        .aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(110px);
          opacity: 0.26;
        }

        .aurora-1 {
          width: 380px;
          height: 380px;
          left: -80px;
          top: 40px;
          background: rgba(80, 127, 255, 0.22);
        }

        .aurora-2 {
          width: 300px;
          height: 300px;
          right: 5%;
          top: 80px;
          background: rgba(247, 210, 55, 0.12);
        }

        .aurora-3 {
          width: 360px;
          height: 360px;
          left: 26%;
          top: 36%;
          background: rgba(88, 114, 255, 0.16);
        }

        .aurora-4 {
          width: 300px;
          height: 300px;
          right: 10%;
          bottom: 12%;
          background: rgba(255, 255, 255, 0.08);
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 42%,
            rgba(10, 21, 38, 0.24) 72%,
            rgba(10, 21, 38, 0.74) 100%
          );
        }

        .thankyou-shell {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
        }

        .thankyou-card {
          width: min(1240px, 100%);
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
          gap: 26px;
          align-items: stretch;
        }

        .thankyou-visual,
        .thankyou-content {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            rgba(224, 225, 227, 0.08) 0%,
            rgba(224, 225, 227, 0.04) 100%
          );
          border: 1px solid rgba(214, 220, 232, 0.14);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            inset 0 -1px 0 rgba(255, 255, 255, 0.025),
            0 18px 44px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(42px) saturate(155%);
          -webkit-backdrop-filter: blur(42px) saturate(155%);
        }

        .thankyou-visual {
          min-height: 680px;
          padding: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thankyou-hero {
          width: 100%;
          height: 100%;
          max-height: 636px;
          object-fit: cover;
          object-position: center;
          border-radius: 24px;
          display: block;
        }

        .thankyou-content {
          padding: 34px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .thankyou-kicker {
          margin-bottom: 12px;
          color: #f7d237;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .thankyou-title {
          margin: 0;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 0.94;
          letter-spacing: -0.06em;
          font-weight: 700;
          color: #ffffff;
        }

        .thankyou-text {
          margin-top: 24px;
          color: rgba(255, 255, 255, 0.76);
          font-size: 18px;
          line-height: 1.6;
        }

        .thankyou-text p {
          margin: 0 0 16px;
        }

        .thankyou-list-block {
          margin: 22px 0 12px;
          padding: 18px 18px 16px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .thankyou-list-title {
          margin-bottom: 12px;
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .thankyou-list {
          margin: 0;
          padding-left: 20px;
        }

        .thankyou-list li {
          margin: 0 0 12px;
          color: rgba(255, 255, 255, 0.84);
        }

        .thankyou-list li:last-child {
          margin-bottom: 0;
        }

        .thankyou-note {
          display: block;
          margin-top: 4px;
          color: #f7d237;
          font-size: 14px;
          line-height: 1.45;
        }

        .thankyou-accent {
          color: #ffffff;
          font-weight: 600;
        }

        .thankyou-actions {
          margin-top: 14px;
        }

        .thankyou-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          border-radius: 999px;
          padding: 0 22px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(
            90deg,
            #47b6f6 0%,
            #5da7ff 22%,
            #7c84ff 48%,
            #9c6dff 72%,
            #c25cf3 100%
          );
          background-size: 220% 220%;
          box-shadow:
            0 10px 30px rgba(71, 96, 255, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
          animation: tgGradientFlow 6s ease-in-out infinite;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .thankyou-btn:hover {
          transform: translateY(-1px);
        }

        .thankyou-btn:disabled {
          opacity: 0.7;
          cursor: default;
        }

        .gif-overlay {
          position: fixed;
          inset: 0;
          z-index: 140;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .gif-overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(3, 10, 22, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .gif-overlay-content {
          position: relative;
          z-index: 1;
          width: min(640px, 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gif-overlay-image {
          width: 100%;
          max-width: 520px;
          height: auto;
          display: block;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          background: rgba(11, 20, 38, 0.92);
        }

        @keyframes pageAmbient {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: translate3d(0, 0, 0) scale(1.05);
            filter: hue-rotate(4deg);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1.02);
            filter: hue-rotate(-4deg);
          }
        }

        @keyframes tgGradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @media (max-width: 1080px) {
          .thankyou-card {
            grid-template-columns: 1fr;
          }

          .thankyou-visual {
            min-height: 360px;
          }

          .thankyou-hero {
            max-height: 420px;
          }
        }

        @media (max-width: 640px) {
          .thankyou-shell {
            padding: 24px 14px;
          }

          .thankyou-content {
            padding: 24px 18px;
          }

          .thankyou-text {
            font-size: 16px;
          }

          .thankyou-list-title {
            font-size: 16px;
          }

          .thankyou-note {
            font-size: 13px;
          }

          .thankyou-btn {
            width: 100%;
          }

          .gif-overlay-image {
            max-width: 100%;
            border-radius: 22px;
          }
        }
      `}</style>
    </main>
  );
}
