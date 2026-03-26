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

      const res = await fetch(
        "https://hook.us2.make.com/29vgewdq138z7nlxajc7ozsogq9a3nwb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            action: "send_code",
          }),
        }
      );

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
        {/* LOGO */}
        <div style={styles.logoBox}>
          <Link href="/" style={{ display: "inline-block", cursor: "pointer" }}>
            <Image
              src="/logo.svg"
              alt="Growth Avenue"
              width={180}
              height={42}
              style={styles.logo}
              priority
            />
          </Link>
        </div>

        {/* CARD */}
        <section style={styles.card}>
          {/* HERO SVG */}
          <div style={styles.heroBox}>
            <Image
              src="/hero.svg"
              alt="Hero"
              width={320}
              height={200}
              style={styles.hero}
            />
          </div>

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
                opacity: loading ? 0.7 : 1,
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
    background:
      "radial-gradient(circle at top, rgba(247,210,55,0.10), transparent 22%), #0b1d3a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    color: "#fff",
  },

  wrap: {
    width: "100%",
    maxWidth: "560px",
    zIndex: 1,
  },

  logoBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },

  logo: {
    height: "40px",
    width: "auto",
  },

  card: {
    borderRadius: "28px",
    padding: "32px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
  },

  heroBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },

  hero: {
    width: "100%",
    maxWidth: "300px",
    opacity: 0.9,
  },

  kicker: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#f7d237",
    marginBottom: "10px",
  },

  kickerDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#f7d237",
  },

  title: {
    fontSize: "36px",
    margin: 0,
  },

  text: {
    marginTop: "12px",
    marginBottom: "20px",
    color: "#cfd3e6",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  label: {
    fontSize: "14px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
  },

  button: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    fontWeight: 600,
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    cursor: "pointer",
  },

  successBox: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(0,255,150,0.1)",
  },

  errorBox: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255,0,0,0.1)",
  },
};
