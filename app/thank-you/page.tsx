"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const GIF_SRC = "/vicky_ticky_tavi_httpss.mj.runX8tiGZkFDLE_i_want_an_analogue__07099a01-3e02-4ea5-bb9d-70a6ff023a6a_2.gif";
const IMAGE_SRC = "/hero.svg";

type RevealStage = 0 | 1 | 2 | 3;

export default function ThankYouPage() {
  const router = useRouter();
  const [isTabActive, setIsTabActive] = useState(true);
  const [revealStage, setRevealStage] = useState<RevealStage>(0);
  const [isActivated, setIsActivated] = useState(false);
  const [overlayLifted, setOverlayLifted] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(document.visibilityState === "visible");
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isTabActive) return;

    let t1: ReturnType<typeof setTimeout> | null = null;
    let t2: ReturnType<typeof setTimeout> | null = null;
    let t3: ReturnType<typeof setTimeout> | null = null;

    if (revealStage < 1) t1 = setTimeout(() => setRevealStage(1), 250);
    if (revealStage < 2) t2 = setTimeout(() => setRevealStage(2), 950);
    if (revealStage < 3) t3 = setTimeout(() => setRevealStage(3), 1750);

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);
    };
  }, [isTabActive, revealStage]);

  const mediaBackground = useMemo(() => {
    return `url('${isActivated ? GIF_SRC : IMAGE_SRC}')`;
  }, [isActivated]);

  const handleEnterCabinet = () => {
    setIsActivated(true);
    setOverlayLifted(true);

    setTimeout(() => {
      router.push("/cabinet-login");
    }, 1400);
  };

  return (
    <main className="ga-thankyou-page">
      <div className="ga-thankyou-shell">
        <section className="ga-media-card">
          <div
            className={`ga-media-surface ${isActivated ? "is-activated" : ""}`}
            style={{ backgroundImage: mediaBackground }}
            aria-hidden="true"
          >
            <div className={`ga-media-overlay ${overlayLifted ? "is-lifted" : ""}`} />
          </div>
        </section>

        <section className="ga-copy-card">
          <div
            className="ga-copy-bg"
            style={{ backgroundImage: mediaBackground }}
            aria-hidden="true"
          />
          <div className={`ga-copy-overlay ${overlayLifted ? "is-lifted" : ""}`} />

          <div className="ga-copy-content">
            <div className={`ga-kicker cinematic-line ${revealStage >= 1 ? "is-visible" : ""}`}>
              Payment confirmed
            </div>

            <h1 className={`ga-title cinematic-line ${revealStage >= 1 ? "is-visible" : ""}`}>
              Добро пожаловать
            </h1>

            <h2 className={`ga-subtitle cinematic-line ${revealStage >= 2 ? "is-visible" : ""}`}>
              в экосистему growth<span className="ga-dot">.</span>avenue
            </h2>

            <div className={`ga-copy-block cinematic-line ${revealStage >= 3 ? "is-visible" : ""}`}>
              <p>
                Здесь вы найдете инструменты, которые дают возможности для
                контролируемого роста бизнеса и объективной оценки текущих
                возможностей.
              </p>

              <div className="ga-list-box">
                <div className="ga-list-title">В разработке находятся:</div>

                <div className="ga-list-item">
                  <div className="ga-list-name">Маркетинговый Календарь</div>
                  <div className="ga-list-note">* релиз планируется на июнь 2026</div>
                </div>

                <div className="ga-list-item">
                  <div className="ga-list-name">Трекер стратегии</div>
                  <div className="ga-list-note">* релиз планируется на конец лета 2026</div>
                </div>

                <div className="ga-list-item">
                  <div className="ga-list-name">Конструктор фин. модели</div>
                  <div className="ga-list-note">* релиз планируется на конец лета 2026</div>
                </div>
              </div>

              <p className="ga-final-note">
                У вас будет возможность попробовать их бесплатно!
              </p>
            </div>

            <div className={`ga-actions cinematic-line ${revealStage >= 3 ? "is-visible" : ""}`}>
              <button
                type="button"
                className="ga-primary-btn"
                onClick={handleEnterCabinet}
              >
                Перейти в Личный кабинет
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .ga-thankyou-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          background:
            radial-gradient(circle at 18% 22%, rgba(84, 122, 219, 0.16), transparent 24%),
            radial-gradient(circle at 82% 12%, rgba(247, 210, 55, 0.08), transparent 18%),
            linear-gradient(180deg, #061327 0%, #081a35 45%, #07162d 100%);
          overflow: hidden;
        }

        .ga-thankyou-shell {
          width: min(1380px, 100%);
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
          gap: 26px;
          align-items: stretch;
        }

        .ga-media-card,
        .ga-copy-card {
          position: relative;
          min-height: 820px;
          border-radius: 34px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 24px 70px rgba(0,0,0,0.28);
        }

        .ga-media-card {
          padding: 22px;
        }

        .ga-media-surface {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 776px;
          border-radius: 30px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #020812;
        }

        .ga-media-overlay,
        .ga-copy-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(2,8,18,0.74) 0%, rgba(2,8,18,0.66) 32%, rgba(2,8,18,0.46) 100%);
          transition: opacity 1.1s ease;
          pointer-events: none;
        }

        .ga-media-overlay.is-lifted,
        .ga-copy-overlay.is-lifted {
          opacity: 0.16;
        }

        .ga-copy-card {
          isolation: isolate;
        }

        .ga-copy-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.4;
          transform: scale(1.08);
        }

        .ga-copy-content {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 38px 34px 34px;
          display: flex;
          flex-direction: column;
        }

        .ga-kicker {
          color: #f7d237;
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .ga-title {
          margin: 22px 0 0;
          color: rgba(255,255,255,0.92);
          font-size: clamp(64px, 7vw, 94px);
          line-height: 0.92;
          letter-spacing: -0.07em;
          font-weight: 700;
          max-width: 560px;
        }

        .ga-subtitle {
          margin: 18px 0 0;
          color: rgba(255,255,255,0.88);
          font-size: clamp(28px, 2.6vw, 38px);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 500;
        }

        .ga-dot {
          display: inline-block;
          color: #f7d237;
          text-shadow: 0 0 18px rgba(247,210,55,0.65);
          animation: gaBlinkDot 1.8s ease-in-out infinite;
        }

        .ga-copy-block {
          margin-top: 28px;
          max-width: 620px;
          color: rgba(255,255,255,0.72);
          font-size: 17px;
          line-height: 1.7;
        }

        .ga-copy-block p {
          margin: 0 0 18px;
        }

        .ga-list-box {
          margin: 18px 0 18px;
          padding: 22px 20px;
          border-radius: 26px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .ga-list-title {
          margin-bottom: 18px;
          color: rgba(255,255,255,0.84);
          font-size: 20px;
          line-height: 1.1;
          font-weight: 700;
        }

        .ga-list-item + .ga-list-item {
          margin-top: 16px;
        }

        .ga-list-name {
          color: rgba(255,255,255,0.78);
          font-size: 18px;
          line-height: 1.2;
          font-weight: 500;
        }

        .ga-list-note {
          margin-top: 6px;
          color: rgba(247,210,55,0.84);
          font-size: 14px;
          line-height: 1.35;
        }

        .ga-final-note {
          color: rgba(255,255,255,0.88);
          font-size: 18px;
          line-height: 1.45;
          font-weight: 600;
        }

        .ga-actions {
          margin-top: auto;
          padding-top: 18px;
        }

        .ga-primary-btn {
          min-width: 270px;
          min-height: 58px;
          padding: 0 24px;
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

        .cinematic-line {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(10px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease,
            filter 0.8s ease;
        }

        .cinematic-line.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        @keyframes gaBlinkDot {
          0% { opacity: 0.45; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 0.45; transform: scale(0.92); }
        }

        @media (max-width: 1180px) {
          .ga-thankyou-shell {
            grid-template-columns: 1fr;
          }

          .ga-media-card,
          .ga-copy-card {
            min-height: auto;
          }

          .ga-media-surface {
            min-height: 420px;
          }

          .ga-copy-content {
            min-height: 620px;
          }
        }

        @media (max-width: 767px) {
          .ga-thankyou-page {
            padding: 16px;
          }

          .ga-media-card {
            padding: 14px;
          }

          .ga-media-surface {
            min-height: 300px;
            border-radius: 22px;
          }

          .ga-copy-card {
            border-radius: 24px;
          }

          .ga-copy-content {
            padding: 24px 20px 24px;
            min-height: auto;
          }

          .ga-title {
            font-size: clamp(46px, 15vw, 68px);
            max-width: none;
          }

          .ga-subtitle {
            font-size: 24px;
            line-height: 1.08;
          }

          .ga-copy-block {
            font-size: 15px;
            line-height: 1.6;
          }

          .ga-list-box {
            padding: 16px 14px;
            border-radius: 20px;
          }

          .ga-list-title {
            font-size: 17px;
          }

          .ga-list-name {
            font-size: 16px;
          }

          .ga-list-note {
            font-size: 13px;
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
