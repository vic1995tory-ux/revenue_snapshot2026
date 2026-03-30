"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HERO_SRC = "/hero.svg";
const GIF_SRC =
  "/vicky_ticky_tavi_httpss.mj.runX8tiGZkFDLE_i_want_an_analogue__07099a01-3e02-4ea5-bb9d-70a6ff023a6a_2.gif";

type RevealStage = 0 | 1 | 2 | 3 | 4 | 5;

export default function ThankYouPage() {
  const router = useRouter();
  const [revealStage, setRevealStage] = useState<RevealStage>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    timers.push(setTimeout(() => setRevealStage(1), 120));
    timers.push(setTimeout(() => setRevealStage(2), 420));
    timers.push(setTimeout(() => setRevealStage(3), 760));
    timers.push(setTimeout(() => setRevealStage(4), 1100));
    timers.push(setTimeout(() => setRevealStage(5), 1460));

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnterCabinet = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push("/cabinet-login");
    }, 1500);
  };

  return (
    <main className="ga-thankyou-page">
      <div
        className={`ga-page-media ${isTransitioning ? "is-gif" : ""}`}
        style={{
          backgroundImage: `url("${isTransitioning ? GIF_SRC : HERO_SRC}")`,
        }}
        aria-hidden="true"
      />

      <div className={`ga-page-shade ${isTransitioning ? "is-lifted" : ""}`} />
      <div className="ga-page-vignette" />

      <section className="ga-shell">
        <article className="ga-card">
          <div className="ga-card-inner">
            <div
              className={`ga-kicker cinematic-line ${revealStage >= 1 ? "is-visible" : ""}`}
            >
              <span className="ga-kicker-dot" />
              <span>Payment confirmed</span>
            </div>

            <h1
              className={`ga-title cinematic-line ${revealStage >= 2 ? "is-visible" : ""}`}
            >
              Добро
              <br />
              пожаловать
            </h1>

            <div
              className={`ga-subtitle cinematic-line ${revealStage >= 3 ? "is-visible" : ""}`}
            >
              <span className="ga-subtitle-prefix">в экосистему</span>
              <span className="ga-brand-lockup" aria-label="growth avenue">
                <span className="ga-brand-word">growth</span>
                <span className="ga-brand-separator" aria-hidden="true" />
                <span className="ga-brand-word">avenue</span>
              </span>
            </div>

            <p
              className={`ga-copy cinematic-line ${revealStage >= 4 ? "is-visible" : ""}`}
            >
              Здесь вы найдете инструменты, которые дают возможности для
              контролируемого роста бизнеса и объективной оценки текущих
              возможностей.
            </p>

            <div
              className={`ga-products cinematic-line ${revealStage >= 5 ? "is-visible" : ""}`}
            >
              <div className="ga-product-row ga-product-row-active">
                <div className="ga-product-name">Revenue Snapshot</div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-active">Active</span>
                </div>
              </div>

              <div className="ga-product-row">
                <div className="ga-product-name">Marketing Calendar</div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-upcoming">Upcoming</span>
                  <span className="ga-tag ga-tag-release">release JUNE 2026</span>
                </div>
              </div>

              <div className="ga-product-row">
                <div className="ga-product-name">Strategy Tracker</div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-upcoming">Upcoming</span>
                  <span className="ga-tag ga-tag-release">release AUG 2026</span>
                </div>
              </div>

              <div className="ga-product-row">
                <div className="ga-product-name">Fin Model Forecaster</div>
                <div className="ga-product-tags">
                  <span className="ga-tag ga-tag-upcoming">Upcoming</span>
                  <span className="ga-tag ga-tag-release">
                    release AUG-SEP 2026
                  </span>
                </div>
              </div>
            </div>

            <p
              className={`ga-final-note cinematic-line ${revealStage >= 5 ? "is-visible" : ""}`}
            >
              У вас будет возможность попробовать их бесплатно!
            </p>

            <div
              className={`ga-actions cinematic-line ${revealStage >= 5 ? "is-visible" : ""}`}
            >
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
        </article>
      </section>

      <style jsx global>{`
        html,
        body {
          background: #07162d;
        }

        .ga-thankyou-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #07162d;
          color: #fefefe;
        }

        .ga-page-media {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          transition:
            background-image 0.25s ease,
            transform 0.8s ease,
            filter 0.8s ease;
          filter: saturate(1) brightness(0.95);
        }

        .ga-page-media.is-gif {
          transform: scale(1.01);
          filter: saturate(1.02) brightness(0.98);
        }

        .ga-page-shade {
          position: fixed;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              180deg,
              rgba(3, 10, 22, 0.78) 0%,
              rgba(3, 10, 22, 0.66) 30%,
              rgba(3, 10, 22, 0.48) 100%
            ),
            linear-gradient(
              90deg,
              rgba(3, 10, 22, 0.52) 0%,
              rgba(3, 10, 22, 0.18) 48%,
              rgba(3, 10, 22, 0.34) 100%
            );
          transition: opacity 0.9s ease;
          pointer-events: none;
        }

        .ga-page-shade.is-lifted {
          opacity: 0.18;
        }

        .ga-page-vignette {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(
              circle at center,
              transparent 42%,
              rgba(10, 21, 38, 0.18) 74%,
              rgba(10, 21, 38, 0.52) 100%
            );
        }

        .ga-shell {
          position: relative;
          z-index: 3;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
        }

        .ga-card {
          width: min(1180px, 100%);
          border-radius: 34px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.025),
            rgba(255, 255, 255, 0.01)
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 24px 70px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .ga-card-inner {
          width: min(760px, 100%);
          padding: 40px 36px 38px;
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
          box-shadow: 0 0 16px rgba(247, 210, 55, 0.75);
          animation: gaBlinkSignal 1.8s ease-in-out infinite;
          flex: none;
        }

        .ga-title {
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.96);
          font-size: clamp(72px, 8vw, 106px);
          line-height: 0.9;
          letter-spacing: -0.078em;
          font-weight: 700;
          max-width: 720px;
        }

        .ga-subtitle {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 12px;
          color: rgba(255, 255, 255, 0.92);
          font-size: clamp(30px, 2.7vw, 44px);
          line-height: 1.04;
          letter-spacing: -0.05em;
          font-weight: 500;
        }

        .ga-subtitle-prefix {
          color: rgba(255, 255, 255, 0.88);
        }

        .ga-brand-lockup {
          display: inline-flex;
          align-items: center;
          gap: 0.18em;
          line-height: 1;
          white-space: nowrap;
        }

        .ga-brand-word {
          display: inline-block;
          color: rgba(255, 255, 255, 0.92);
        }

        .ga-brand-separator {
          width: 0.22em;
          height: 0.22em;
          margin: 0 0.04em 0 0.02em;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 16px rgba(247, 210, 55, 0.6);
          align-self: center;
          transform: translateY(0.02em);
          flex: none;
        }

        .ga-copy {
          margin: 28px 0 0;
          max-width: 660px;
          color: rgba(255, 255, 255, 0.76);
          font-size: 17px;
          line-height: 1.7;
        }

        .ga-products {
          margin-top: 24px;
          display: grid;
          gap: 14px;
          max-width: 780px;
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

        .ga-product-name {
          color: rgba(255, 255, 255, 0.92);
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: -0.03em;
          font-weight: 600;
          min-width: 0;
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
          background: linear-gradient(
            135deg,
            rgba(247, 210, 55, 0.98),
            rgba(247, 210, 55, 0.88)
          );
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
          color: rgba(255, 255, 255, 0.92);
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
          background: linear-gradient(
            90deg,
            #47b6f6 0%,
            #6f8cff 52%,
            #c25cf3 100%
          );
          box-shadow: 0 18px 34px rgba(97, 98, 255, 0.24);
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            opacity 0.22s ease;
        }

        .ga-primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 22px 42px rgba(97, 98, 255, 0.32);
        }

        .ga-primary-btn:disabled {
          opacity: 0.78;
          cursor: default;
        }

        .cinematic-line {
          opacity: 0;
          transform: translateY(22px);
          filter: blur(12px);
          transition:
            opacity 0.85s ease,
            transform 0.85s ease,
            filter 0.85s ease;
        }

        .cinematic-line.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
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
          .ga-shell {
            padding: 16px;
          }

          .ga-card-inner {
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
        }
      `}</style>
    </main>
  );
}
