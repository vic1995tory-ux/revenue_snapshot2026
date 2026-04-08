"use client";

import { useState } from "react";

export default function SnapshotTestPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const payload = {
    type: "snapshot_final",
    source: "test_page",

    meta: {
      access_token: "test_token_123",
      launch_attempt_id: "test_launch_001",
      created_at: new Date().toISOString()
    },

    progress: {
      total: 100,
      totalQuestions: 26,
      sectionProgress: {
        positioning: 100,
        economics: 100,
        flow: 100,
        product: 100,
        analytics: 100,
        structure: 100,
        strategy: 100,
        contact: 100
      }
    },

    answers: {
      raw: {
        positioning: {
          description: "HealthTech SaaS для отслеживания ментального состояния",
          region: "Germany",
          location: "Berlin"
        },

        economics: {
          revenue: 45000,
          clients: 1200,
          margin: 32,
          kpi_tracking: ["CAC", "LTV", "Retention"]
        },

        flow: {
          leads: 3000,
          capacity: 1500,
          channels: {
            ads: 60,
            organic: 25,
            referrals: 15
          }
        },

        product: {
          main_products: [
            { name: "Monthly subscription", margin: 70 },
            { name: "Annual plan", margin: 85 }
          ],
          retention_mechanics: ["Push notifications", "Gamification"]
        },

        analytics: {
          tools: ["Amplitude", "Mixpanel"],
          changes_last_6m: "Добавили onboarding и улучшили аналитику"
        },

        structure: {
          team: "8 человек, перегруз в маркетинге",
          decision_making: "Фаундер + маркетинг",
          efficiency_loss: {
            marketing: 7,
            sales: 3,
            operations: 2,
            management: 6
          }
        },

        strategy: {
          profit_target: 25,
          expense_strategy: "reduce",
          planning: "есть 3-6-12 roadmap"
        }
      },

      prepared: {
        summary: "SaaS с высокой зависимостью от маркетинга и недозагруженной capacity"
      }
    },

    body_text:
      "HealthTech SaaS с фокусом на ментальное здоровье. Основной рост через performance marketing.",

    divider:
      "==================== SNAPSHOT FINAL ANSWERS ===================="
  };

  const sendData = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        "https://hook.us2.make.com/vxp3omwrxvmqa1glcsb4yyv8b07zb1v9",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Snapshot Test Page</h1>

      <button
        onClick={sendData}
        style={{
          padding: "12px 20px",
          background: "#f7d237",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Отправка..." : "Отправить тестовые ответы"}
      </button>

      <pre style={{ marginTop: 30 }}>
        {JSON.stringify(payload, null, 2)}
      </pre>

      {response && (
        <pre style={{ marginTop: 30 }}>
          RESPONSE: {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
