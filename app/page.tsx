"use client";

import { useState } from "react";

const cases = [
  {
    niche: "HealthTech",
    stage: "Growth",
    title: "Ускорение сделки без давления на маржу",
    desc: "Snapshot собирает логику роста, выделяет ограничение и дает последовательность решений.",
    zones: ["Sales", "Retention"],
    result: ["CAC", "Margin"],
  },
  {
    niche: "B2B",
    stage: "Startup",
    title: "Сокращение ручного управления ростом",
    desc: "Результат показывает, где теряется скорость роста и какой сценарий дает наибольший эффект.",
    zones: ["Pipeline", "Offer"],
    result: ["Cycle", "Profit"],
  },
  {
    niche: "FinTech",
    stage: "Growth",
    title: "Пересборка экономики привлечения",
    desc: "Фокус смещается на каналы, payback и точку, которая реально тормозит масштабирование.",
    zones: ["CAC", "Quality"],
    result: ["Payback", "Scale"],
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % cases.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <main className="page">

      {/* ===== КАК ЭТО РАБОТАЕТ — БЕЗ АНИМАЦИИ ===== */}
      <section className="journey">
        {[
          "Выбор формата",
          "Сбор данных",
          "Генерация результата",
          "Изучение возможностей",
          "60-мин декомпозиция",
          "Личный кабинет",
        ].map((t, i) => (
          <div key={i} className="journey-card">
            <div className="num">0{i + 1}</div>
            <h3>{t}</h3>
          </div>
        ))}
      </section>

      {/* ===== КЕЙСЫ (ПЛАВНЫЙ КАРУСЕЛЬ) ===== */}
      <section className="cases">

        <div className="cases-header">
          <h2>Где Revenue Snapshot показал результат</h2>

          <div className="controls">
            <button onClick={prev}>←</button>
            <button onClick={next}>→</button>
          </div>
        </div>

        <div className="viewport">
          <div
            className="track"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {cases.map((c, i) => (
              <div className="card" key={i}>
                <div className="meta">НИША</div>
                <h3>{c.niche}</h3>
                <div className="stage">{c.stage}</div>

                <div className="block">
                  <div className="label">Выявленный рычаг</div>
                  <div className="title">{c.title}</div>
                  <div className="desc">{c.desc}</div>
                </div>

                <div className="bottom">
                  <div>
                    <div className="label">зоны влияния</div>
                    <div className="tags">
                      {c.zones.map((z) => (
                        <span key={z}>{z}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="label">результат</div>
                    <div className="tags highlight">
                      {c.result.map((z) => (
                        <span key={z}>{z}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`

        .page {
          background: #08142b;
          color: white;
          padding: 40px;
        }

        /* ===== JOURNEY ===== */

        .journey {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 80px;
        }

        .journey-card {
          border: 1px solid rgba(255,255,255,0.08);
          padding: 24px;
        }

        .num {
          opacity: 0.4;
          margin-bottom: 10px;
        }

        /* ===== CASES ===== */

        .cases-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .controls button {
          margin-left: 10px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 8px 12px;
          cursor: pointer;
        }

        .viewport {
          overflow: hidden;
        }

        .track {
          display: flex;
          transition: transform 0.6s cubic-bezier(.4,0,.2,1);
        }

        .card {
          min-width: 100%;
          padding: 40px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .meta {
          opacity: 0.5;
          font-size: 12px;
        }

        .stage {
          opacity: 0.6;
          margin-bottom: 20px;
        }

        .block .title {
          font-size: 20px;
          font-weight: 600;
          margin: 10px 0;
        }

        .desc {
          opacity: 0.6;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }

        .tags {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .tags span {
          padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          font-size: 12px;
        }

        .highlight span {
          border-color: gold;
          color: gold;
        }

      `}</style>
    </main>
  );
}
