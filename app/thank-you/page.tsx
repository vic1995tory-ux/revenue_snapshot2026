"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const GIF_SRC =
  "/vicky_ticky_tavi_httpss.mj.runX8tiGZkFDLE_i_want_an_analogue__07099a01-3e02-4ea5-bb9d-70a6ff023a6a_2.gif";
const BG_SRC = "/hero.svg";

export default function ThankYouPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterCabinet = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push("/cabinet-login");
    }, 1500);
  };

  return (
    <main className="ga-thankyou-page">
      <div className="ga-thankyou-bg" aria-hidden="true">
        <div className="ga-aurora ga-aurora-1" />
        <div className="ga-aurora ga-aurora-2" />
        <div className="ga-vignette" />
      </div>

      <section className="ga-thankyou-shell">
        <div className="ga-thankyou-card">
          <div
            className={`ga-card-media ${isTransitioning ? "is-transitioning" : ""}`}
            style={{ backgroundImage: `url("${isTransitioning ? GIF_SRC : BG_SRC}")` }}
            aria-hidden="true"
          />

          <div className={`ga-card-overlay ${isTransitioning ? "is-lifted" : ""}`} />

          <div className="ga-card-content">
            <div className="ga-kicker">
              <span className="ga-kicker-dot" />
              <span>Payment confirmed</span>
            </div>

            <h1 className="ga-title">Добро пожаловать</h1>

            <div className="ga-subtitle">
              в экосистему growth<span className="ga-brand-dot" />avenue
            </div>

            <p className="ga-copy">
              Здесь вы найдете инструменты, которые дают возможности для
              контролируемого роста бизнеса и объективной оценки текущих
              возможностей.
            </p>

            <div className="ga-products">
              <div className="ga-product-row ga-product-row-active">
                <div className="ga-product-main">
                  <div className="ga-product-name">Revenue Snapshot</div>
                </div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-active">Active</span>
                </div>
              </div>

              <div className="ga-product-row">
                <div className="ga-product-main">
                  <div className="ga-product-name">Marketing Calendar</div>
                </div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-upcoming">Upcoming</span>
                  <span className="ga-tag ga-tag-release">release JUNE 2026</span>
                </div>
              </div>

              <div className="ga-product-row">
                <div className="ga-product-main">
                  <div className="ga-product-name">Strategy Tracker</div>
                </div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-upcoming">Upcoming</span>
                  <span className="ga-tag ga-tag-release">release AUG 2026</span>
                </div>
              </div>

              <div className="ga-product-row">
                <div className="ga-product-main">
                  <div className="ga-product-name">Fin Model Forecaster</div>
                </div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-upcoming">Upcoming</span>
                  <span className="ga-tag ga-tag-release">release AUG-SEP 2026</span>
                </div>
              </div>
            </div>

            <p className="ga-final-note">
              У вас будет возможность попробовать их бесплатно!
            </p>

            <div className="ga-actions">
              <button
                type="button"
                className="ga-primary-btn"
                onClick={handleEnterCabinet}
                disabled={isTransitioning}
              >
                Перейти в Личный кабинет
              </button>
            </div>
          </div>
        </div>
      </section>

      {isTransitioning && (
        <div
          className="ga-gif-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Переход в личный кабинет"
        >
          <div className="ga-gif-backdrop" />
          <div className="ga-gif-content">
            <img src={GIF_SRC} alt="Transition" className="ga-gif-image" />
          </div>
        </div>
      )}

      <style jsx global>{`
        .ga-thankyou-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #07162d;
          color: #fefefe;
        }

        .ga-thankyou-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 18% 22%, rgba(84, 122, 219, 0.16), transparent 24%),
            radial-gradient(circle at 82% 12%, rgba(247, 210, 55, 0.08), transparent 18%),
            linear-gradient(180deg, #061327 0%, #081a35 45%, #07162d 100%);
        }

        .ga-aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(120px);
          opacity: 0.24;
        }

        .ga-aurora-1 {
          width: 360px;
          height: 360px;
          left: -60px;
          top: 40px;
          background: rgba(88, 114, 255, 0.22);
        }

        .ga-aurora-2 {
          width: 320px;
          height: 320px;
          right: 4%;
          top: 8%;
          background: rgba(247, 210, 55, 0.12);
        }

        .ga-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 42%,
            rgba(10, 21, 38, 0.18) 72%,
            rgba(10, 21, 38, 0.56) 100%
          );
        }

        .ga-thankyou-shell {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
        }

        .ga-thankyou-card {
          position: relative;
          width: min(1120px, 100%);
          min-height: 860px;
          border-radius: 34px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.015)
          );
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 24px 70px rgba(0, 0, 0, 0.28);
        }

        .ga-card-media {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .ga-card-media.is-transitioning {
          transform: scale(1.01);
        }

        .ga-card-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(2, 8, 18, 0.72) 0%, rgba(2, 8, 18, 0.6) 30%, rgba(2, 8, 18, 0.38) 100%),
            linear-gradient(90deg, rgba(2, 8, 18, 0.55) 0%, rgba(2, 8, 18, 0.18) 100%);
          transition: opacity 0.9s ease;
        }

        .ga-card-overlay.is-lifted {
          opacity: 0.18;
        }

        .ga-card-content {
          position: relative;
          z-index: 2;
          width: min(760px, 100%);
          padding: 42px 38px 38px;
        }

        .ga-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f7d237;
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .ga-kicker-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 16px rgba(247, 210, 55, 0.7);
          animation: gaBlinkSignal 1.8s ease-in-out infinite;
          flex: none;
        }

        .ga-title {
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.94);
          font-size: clamp(72px, 8vw, 104px);
          line-height: 0.9;
          letter-spacing: -0.075em;
          font-weight: 700;
          max-width: 680px;
        }

        .ga-subtitle {
          margin-top: 18px;
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(30px, 2.7vw, 44px);
          line-height: 1.02;
          letter-spacing: -0.05em;
          font-weight: 500;
        }

        .ga-brand-dot {
          display: inline-block;
          width: 0.34em;
          height: 0.34em;
          margin: 0 0.08em 0 0.02em;
          border-radius: 999px;
          background: #f7d237;
          vertical-align: middle;
          transform: translateY(-0.02em);
          box-shadow: 0 0 16px rgba(247, 210, 55, 0.55);
        }

        .ga-copy {
          margin: 26px 0 0;
          max-width: 650px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 17px;
          line-height: 1.7;
        }

        .ga-products {
          margin-top: 24px;
          display: grid;
          gap: 14px;
          max-width: 760px;
        }

        .ga-product-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .ga-product-row-active {
          background: rgba(247, 210, 55, 0.06);
          border-color: rgba(247, 210, 55, 0.14);
        }

        .ga-product-main {
          min-width: 0;
        }

        .ga-product-name {
          color: rgba(255, 255, 255, 0.9);
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: -0.03em;
          font-weight: 600;
        }

        .ga-product-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }

        .ga-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          border: 1px solid transparent;
        }

        .ga-tag-active {
          color: #081a35;
          background: linear-gradient(135deg, rgba(247, 210, 55, 0.98), rgba(247, 210, 55, 0.88));
          border-color: rgba(247, 210, 55, 0.24);
        }

        .ga-tag-upcoming {
          color: #ffffff;
          background: rgba(124, 132, 255, 0.16);
          border-color: rgba(124, 132, 255, 0.28);
        }

        .ga-tag-release {
          color: #f7d237;
          background: rgba(247, 210, 55, 0.08);
          border-color: rgba(247, 210, 55, 0.18);
        }

        .ga-final-note {
          margin: 24px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          line-height: 1.45;
          font-weight: 600;
        }

        .ga-actions {
          margin-top: 28px;
        }

        .ga-primary-btn {
          min-width: 320px;
          min-height: 58px;
          padding: 0 26px;
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(90deg, #47b6f6 0%, #6f8cff 52%, #c25cf3 100%);
          box-shadow: 0 18px 34px rgba(97, 98, 255, 0.24);
          transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.22s ease;
        }

        .ga-primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 22px 42px rgba(97, 98, 255, 0.32);
        }

        .ga-primary-btn:disabled {
          opacity: 0.76;
          cursor: default;
        }

        .ga-gif-overlay {
          position: fixed;
          inset: 0;
          z-index: 140;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .ga-gif-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(3, 10, 22, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .ga-gif-content {
          position: relative;
          z-index: 1;
          width: min(680px, 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ga-gif-image {
          width: 100%;
          max-width: 560px;
          height: auto;
          display: block;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          background: rgba(11, 20, 38, 0.92);
        }

        @keyframes gaBlinkSignal {
          0% {
            opacity: 0.42;
            transform: scale(0.92);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
          100% {
            opacity: 0.42;
            transform: scale(0.92);
          }
        }

        @media (max-width: 900px) {
          .ga-thankyou-shell {
            padding: 18px;
          }

          .ga-thankyou-card {
            min-height: auto;
          }

          .ga-card-content {
            width: 100%;
            padding: 28px 20px 24px;
          }

          .ga-title {
            font-size: clamp(52px, 16vw, 74px);
            max-width: none;
          }

          .ga-subtitle {
            font-size: 26px;
            line-height: 1.08;
          }

          .ga-copy {
            font-size: 15px;
            line-height: 1.6;
          }

          .ga-product-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .ga-product-name {
            font-size: 18px;
          }

          .ga-product-tags {
            justify-content: flex-start;
          }

          .ga-final-note {
            font-size: 16px;
          }

          .ga-primary-btn {
            width: 100%;
            min-width: 0;
            min-height: 54px;
            font-size: 16px;
          }

          .ga-gif-image {
            max-width: 100%;
            border-radius: 22px;
          }
        }
      `}</style>
    </main>
  );
}
