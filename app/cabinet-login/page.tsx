"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function CabinetLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!email.trim()) {
        throw new Error("Введите email.");
      }

const res = await fetch("https://hook.us2.make.com/29vgewdq138z7nlxajc7ozsogq9a3nwb", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: email.trim().toLowerCase(),
    action: "send_code",
  }),
});

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Не удалось отправить код.");
      }

      setSuccess("Код доступа отправлен на email.");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div className="ambient-gradient-bg" />

      <div style={styles.wrap}>
<div style={styles.logoBox}>
  <Image
    src="/logo.svg"
    alt="Growth Avenue"
    width={180}
    height={42}
    style={styles.logo}
    priority
  />
</div>
        </div>

        <section style={styles.card}>
          <div style={styles.kicker}>
            <span className="pulse-dot" style={styles.kickerDot} />
            <span>PERSONAL CABINET</span>
          </div>

          <h1 style={styles.title}>Вход по email</h1>
          <p style={styles.text}>
            Введите email, который вы использовали для доступа. Мы отправим на
            него код подтверждения.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Email</label>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.75 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "Отправляем..." : "Отправить код"}
            </button>
          </form>

          {success ? <div style={styles.successBox}>{success}</div> : null}
          {error ? <div style={styles.errorBox}>{error}</div> : null}
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    background:
      "radial-gradient(circle at top, rgba(247,210,55,0.10), transparent 22%), #0b1d3a",
    color: "#fefefe",
    padding: "28px 22px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "560px",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "18px",
  },
  logo: {
    width: "auto",
    height: "40px",
    filter:
      "drop-shadow(0 0 12px rgba(255,255,255,0.08)) drop-shadow(0 0 20px rgba(255,255,255,0.04))",
  },
  card: {
    borderRadius: "30px",
    padding: "32px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.20)",
    backdropFilter: "blur(18px)",
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#f7d237",
    marginBottom: "14px",
  },
  kickerDot: {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    background: "#f7d237",
    boxShadow: "0 0 10px rgba(247,210,55,0.95)",
  },
  title: {
    margin: 0,
    fontSize: "42px",
    lineHeight: 1.05,
    fontWeight: 700,
  },
  text: {
    marginTop: "16px",
    marginBottom: "24px",
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#d8dce7",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  label: {
    fontSize: "14px",
    color: "#dfe4f2",
  },
  input: {
    width: "100%",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "16px",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    marginTop: "8px",
    width: "100%",
    border: 0,
    borderRadius: "18px",
    padding: "18px 20px",
    fontSize: "16px",
    fontWeight: 700,
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    boxShadow: "0 16px 34px rgba(85,104,255,0.22)",
  },
  successBox: {
    marginTop: "18px",
    padding: "14px 16px",
    borderRadius: "16px",
    background: "rgba(78, 201, 140, 0.10)",
    border: "1px solid rgba(78, 201, 140, 0.24)",
    color: "#d8f5e6",
    fontSize: "14px",
  },
  errorBox: {
    marginTop: "18px",
    padding: "14px 16px",
    borderRadius: "16px",
    background: "rgba(255, 87, 87, 0.08)",
    border: "1px solid rgba(255, 87, 87, 0.22)",
    color: "#f4d8d8",
    fontSize: "14px",
  },
};
