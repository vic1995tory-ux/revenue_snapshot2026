"use client";

import { useState } from "react";

const WEBHOOK_URL =
  "https://hook.us2.make.com/z5en2sa55efywylbva4w5sc57mawkrpb";

export default function SnapshotPage() {
  const [answers, setAnswers] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: string, value: any) => {
    setAnswers((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submit_answers",
          created_at: new Date().toISOString(),
          answers: answers,
        }),
      });

      alert("Отправлено");
    } catch (e) {
      console.error(e);
      alert("Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Snapshot</h1>

      <input
        placeholder="Введите что-нибудь"
        onChange={(e) => handleChange("field1", e.target.value)}
      />

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "..." : "Отправить"}
      </button>
    </div>
  );
}
