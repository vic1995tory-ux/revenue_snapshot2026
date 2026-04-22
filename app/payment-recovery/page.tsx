"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type RecoveryResult = {
  ok: boolean;
  error?: string;
  message?: string;
  redirectUrl?: string;
};

function sanitizeWhatsapp(value: string) {
  let result = value.replace(/[^\d+]/g, "");

  if (result.includes("+")) {
    result = (result.startsWith("+") ? "+" : "") + result.replace(/\+/g, "");
  }

  return result;
}

export default function PaymentRecoveryPage() {
  const [paymentId, setPaymentId] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RecoveryResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const cleanPaymentId = paymentId.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanWhatsapp = sanitizeWhatsapp(whatsapp);

      if (!cleanPaymentId && !cleanEmail && !cleanWhatsapp) {
        throw new Error(
          "Укажите PayPal Transaction ID, email или WhatsApp, чтобы найти оплату."
        );
      }

      const res = await fetch("/api/paypal/recover-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: cleanPaymentId,
          email: cleanEmail,
          whatsapp: cleanWhatsapp,
          note: note.trim(),
          current_url:
            typeof window !== "undefined" ? window.location.href : "",
        }),
        cache: "no-store",
      });

      const data = (await res.json()) as RecoveryResult;

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error || "Оплату не удалось найти автоматически."
        );
      }

      setResult(data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Не удалось проверить оплату."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div className="ambient-gradient-bg" />

      <section style={styles.card}>
        <Link href="/" aria-label="Growth Avenue home" style={styles.logoLink}>
          <Image
            src="/logo.svg"
            alt="Growth Avenue"
            width={180}
            height={42}
            priority
            style={styles.logo}
          />
        </Link>

        <div style={styles.kicker}>PAYMENT RECOVERY</div>
        <h1 style={styles.title}>Восстановить доступ после оплаты</h1>
        <p style={styles.text}>
          Если PayPal закрылся или вы не попали на страницу регистрации,
          укажите данные оплаты. Мы проверим запись и вернём ссылку для
          завершения доступа.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>PayPal Transaction ID</label>
          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            placeholder="Например, 8AB12345CD678901E"
            style={styles.input}
            autoComplete="off"
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email, связанный с оплатой"
            style={styles.input}
            autoComplete="email"
          />

          <label style={styles.label}>WhatsApp</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+995..."
            style={styles.input}
            autoComplete="tel"
          />

          <label style={styles.label}>Комментарий</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Можно указать имя, компанию или примерное время оплаты"
            style={{ ...styles.input, ...styles.textarea }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.72 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Проверяем..." : "Найти оплату"}
          </button>
        </form>

        {error ? <div style={styles.errorBox}>{error}</div> : null}

        {result?.ok ? (
          <div style={styles.successBox}>
            <div>{result.message || "Оплата найдена."}</div>
            {result.redirectUrl ? (
              <a href={result.redirectUrl} style={styles.successLink}>
                Перейти к завершению регистрации
              </a>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(247,210,55,0.10), transparent 22%), #0b1d3a",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    overflow: "hidden",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "620px",
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    backdropFilter: "blur(20px)",
    padding: "30px",
  },
  logoLink: {
    display: "inline-flex",
    marginBottom: "26px",
  },
  logo: {
    width: "180px",
    height: "auto",
  },
  kicker: {
    color: "#f7d237",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.08em",
    marginBottom: "10px",
  },
  title: {
    margin: 0,
    fontSize: "36px",
    lineHeight: 1.08,
  },
  text: {
    color: "#d8dce7",
    lineHeight: 1.65,
    marginTop: "14px",
    marginBottom: "22px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "14px",
    color: "#dfe4f2",
  },
  input: {
    padding: "15px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    minHeight: "92px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  button: {
    marginTop: "8px",
    padding: "16px",
    borderRadius: "16px",
    border: 0,
    fontWeight: 800,
    fontSize: "16px",
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    boxShadow: "0 16px 34px rgba(85,104,255,0.22)",
  },
  errorBox: {
    marginTop: "16px",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(255,85,85,0.12)",
    border: "1px solid rgba(255,85,85,0.28)",
    color: "#ffd6d6",
  },
  successBox: {
    marginTop: "16px",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(70,220,150,0.12)",
    border: "1px solid rgba(70,220,150,0.28)",
    color: "#d9ffe9",
    display: "grid",
    gap: "10px",
  },
  successLink: {
    color: "#f7d237",
    fontWeight: 800,
  },
};
