"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CabinetLoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cleanLogin = login.trim();
      const cleanPassword = password.trim();

      if (!cleanLogin) {
        throw new Error("Введите логин.");
      }

      if (!cleanPassword) {
        throw new Error("Введите пароль.");
      }

      const res = await fetch(
        "https://hook.us2.make.com/29vgewdq138z7nlxajc7ozsogq9a3nwb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "login",
            login: cleanLogin,
            password: cleanPassword,
          }),
        }
      );

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        throw new Error(
          data?.error || "Не удалось выполнить вход. Попробуйте снова."
        );
      }

      /**
       * Ожидаемый ответ от Make webhook response:
       *
       * Успех:
       * {
       *   "ok": true,
       *   "redirectUrl": "/account"
       * }
       *
       * Пользователь не найден:
       * {
       *   "ok": false,
       *   "error": "Пользователя с таким логином не существует."
       * }
       *
       * Неверный пароль:
       * {
       *   "ok": false,
       *   "error": "Пароль неверный."
       * }
       */

      if (!data?.ok) {
        throw new Error(
          data?.error ||
            "Либо пользователя с таким логином не существует, либо пароль неверный."
        );
      }

      const redirectUrl =
        typeof data?.redirectUrl === "string" && data.redirectUrl.trim()
          ? data.redirectUrl.trim()
          : "/account";

      router.push(redirectUrl);
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

        <section style={styles.card}>
          <div style={styles.heroBg}>
            <Image
              src="/hero.svg"
              alt=""
              fill
              style={styles.heroImage}
              priority
            />
          </div>

          <div style={styles.cardContent}>
            <div style={styles.kicker}>
              <span className="pulse-dot" style={styles.kickerDot} />
              <span>PERSONAL CABINET</span>
            </div>

            <h1 style={styles.title}>Вход в кабинет</h1>

            <p style={styles.text}>
              Введите логин и пароль. После проверки данных вы автоматически
              попадёте в личный кабинет.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>Логин</label>

              <input
                type="text"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={styles.input}
                autoComplete="username"
              />

              <label style={styles.label}>Пароль</label>

              <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                autoComplete="current-password"
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Проверяем..." : "Войти"}
              </button>
            </form>

            {error ? <div style={styles.errorBox}>{error}</div> : null}
          </div>
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
    overflow: "hidden",
  },

  wrap: {
    width: "100%",
    maxWidth: "560px",
    zIndex: 1,
    position: "relative",
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
    position: "relative",
    overflow: "hidden",
    borderRadius: "28px",
    padding: "32px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    minHeight: "460px",
  },

  heroBg: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    opacity: 0.32,
    pointerEvents: "none",
  },

  heroImage: {
    objectFit: "cover",
    objectPosition: "center",
    filter: "blur(1px)",
  },

  cardContent: {
    position: "relative",
    zIndex: 2,
  },

  kicker: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#f7d237",
    marginBottom: "10px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  kickerDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#f7d237",
    boxShadow: "0 0 10px rgba(247,210,55,0.9)",
  },

  title: {
    fontSize: "42px",
    lineHeight: 1.05,
    margin: 0,
    fontWeight: 700,
  },

  text: {
    marginTop: "16px",
    marginBottom: "24px",
    color: "#d8dce7",
    fontSize: "16px",
    lineHeight: 1.7,
    maxWidth: "420px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "relative",
    zIndex: 2,
  },

  label: {
    fontSize: "14px",
    color: "#dfe4f2",
    marginTop: "2px",
  },

  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    fontWeight: 700,
    fontSize: "16px",
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 16px 34px rgba(85,104,255,0.22)",
  },

  errorBox: {
    marginTop: "16px",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(255,0,0,0.1)",
    border: "1px solid rgba(255,0,0,0.14)",
    color: "#ffd7d7",
  },
};
