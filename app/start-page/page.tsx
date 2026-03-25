"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ResolveResponse = {
  ok: boolean;
  access_token?: string;
  launch_count?: number;
  launch_limit?: number;
  created?: boolean | null;
  page_id?: string | null;
  payment_id?: string;
  payment_status?: string;
  error?: string;
};

type StartActionResponse = {
  ok: boolean;
  error?: string;
};

function StartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [resolving, setResolving] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resolved, setResolved] = useState<ResolveResponse | null>(null);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const tx = useMemo(() => searchParams.get("tx") || "", [searchParams]);
  const st = useMemo(() => searchParams.get("st") || "", [searchParams]);
  const amt = useMemo(() => searchParams.get("amt") || "", [searchParams]);
  const cc = useMemo(() => searchParams.get("cc") || "", [searchParams]);

  useEffect(() => {
    let cancelled = false;

    async function resolveSession() {
      try {
        setResolving(true);
        setError("");

        if (!tx) {
          throw new Error("Не найден Payment ID в ссылке.");
        }

        if (String(st).toUpperCase() !== "COMPLETED") {
          throw new Error("Оплата не подтверждена.");
        }

        const res = await fetch("/api/paypal/resolve-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx,
            st,
            amt,
            cc,
          }),
        });

        const data: ResolveResponse = await res.json();

        if (cancelled) return;

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Не удалось подготовить доступ.");
        }

        if (!data.access_token) {
          throw new Error("Не удалось получить access token.");
        }

        setResolved(data);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Что-то пошло не так.";
        setError(message);
      } finally {
        if (!cancelled) {
          setResolving(false);
        }
      }
    }

    resolveSession();

    return () => {
      cancelled = true;
    };
  }, [tx, st, amt, cc]);

  async function handleStart() {
    try {
      setSubmitting(true);
      setError("");

      if (!resolved?.access_token) {
        throw new Error("Не найден access token.");
      }

      if (!fullName.trim()) {
        throw new Error("Введите имя и фамилию.");
      }

      if (!companyName.trim()) {
        throw new Error("Введите название компании.");
      }

      if (!whatsapp.trim()) {
        throw new Error("Введите WhatsApp.");
      }

      const payload = {
        payment_id: tx,
        access_token: resolved.access_token,
        full_name: fullName.trim(),
        company_name: companyName.trim(),
        whatsapp: whatsapp.trim(),
      };

      const res = await fetch("/api/paypal/start-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const raw = await res.text();
        throw new Error(
          `start-action вернул не JSON. Ответ: ${raw.slice(0, 120)}`
        );
      }

      const data: StartActionResponse = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Не удалось сохранить данные.");
      }

      router.push(`/start/${resolved.access_token}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Что-то пошло не так.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Image
            src="/logo.svg"
            alt="Growth Avenue"
            width={180}
            height={42}
            style={styles.logo}
            priority
          />
        </div>

        <div style={styles.badge}>
          <span className="pulse-dot" style={styles.badgeDot} />
          <span>REVENUE SNAPSHOT</span>
        </div>

        <h1 style={styles.title}>
          {resolving ? "Подготавливаем доступ" : "Завершите доступ"}
        </h1>

        <p style={styles.text}>
          {resolving
            ? "Мы проверяем оплату и подготавливаем ваш персональный доступ."
            : "Оплата подтверждена. Заполните данные ниже, чтобы перейти в персональную страницу."}
        </p>

        <div style={styles.infoBox}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Payment ID</span>
            <span style={styles.infoValue}>{tx || "—"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Status</span>
            <span style={styles.infoValue}>{st || "—"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Amount</span>
            <span style={styles.infoValue}>
              {amt ? `${amt} ${cc || ""}`.trim() : "—"}
            </span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Launches</span>
            <span style={styles.infoValue}>
              {resolved?.launch_count ?? 0} / {resolved?.launch_limit ?? 3}
            </span>
          </div>
        </div>

        {resolving && (
          <div style={styles.loaderWrap}>
            <div style={styles.loader} />
          </div>
        )}

        {!resolving && !error && (
          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Имя и фамилия</label>
              <input
                style={styles.input}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Введите имя и фамилию"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Название компании</label>
              <input
                style={styles.input}
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Введите название компании"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Телефон в WhatsApp</label>
              <input
                style={styles.input}
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+995..."
              />
            </div>

            <button
              type="button"
              onClick={handleStart}
              disabled={submitting}
              style={{
                ...styles.button,
                opacity: submitting ? 0.75 : 1,
                cursor: submitting ? "wait" : "pointer",
              }}
            >
              {submitting ? "Сохраняем..." : "Начать"}
            </button>
          </div>
        )}

        {!resolving && error && (
          <>
            <div style={styles.errorBox}>
              <strong style={styles.errorTitle}>Ошибка доступа</strong>
              <p style={styles.errorText}>{error}</p>
              <div style={styles.manualBox}>{tx || "Нет payment ID"}</div>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              style={styles.button}
            >
              Попробовать снова
            </button>
          </>
        )}

        {!resolving && resolved?.access_token && !error && (
          <p style={styles.smallText}>
            Доступ подготовлен. После нажатия «Начать» откроется персональная
            страница.
          </p>
        )}
      </div>
    </main>
  );
}

function StartPageFallback() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Image
            src="/logo.svg"
            alt="Growth Avenue"
            width={180}
            height={42}
            style={styles.logo}
            priority
          />
        </div>

        <div style={styles.badge}>
          <span className="pulse-dot" style={styles.badgeDot} />
          <span>REVENUE SNAPSHOT</span>
        </div>

        <h1 style={styles.title}>Подготавливаем доступ</h1>
        <p style={styles.text}>
          Мы проверяем оплату и подготавливаем ваш персональный доступ.
        </p>
      </div>
    </main>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<StartPageFallback />}>
      <StartPageContent />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background:
      "radial-gradient(circle at top, rgba(247,210,55,0.14), transparent 30%), #0b1d3a",
    color: "#fefefe",
  },
  card: {
    width: "100%",
    maxWidth: "760px",
    borderRadius: "32px",
    padding: "34px 32px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.28)",
    backdropFilter: "blur(18px)",
  },
  logoWrap: {
    marginBottom: "18px",
  },
  logo: {
    width: "auto",
    height: "38px",
  },
  badge: {
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
  badgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    background: "#f7d237",
    boxShadow: "0 0 10px rgba(247,210,55,0.95)",
  },
  title: {
    margin: 0,
    fontSize: "56px",
    lineHeight: 1.05,
    fontWeight: 700,
  },
  text: {
    marginTop: "18px",
    marginBottom: "26px",
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#d8dce7",
    maxWidth: "720px",
  },
  infoBox: {
    display: "grid",
    gap: "16px",
    padding: "22px 28px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
  },
  infoLabel: {
    fontSize: "16px",
    color: "#b4bccf",
  },
  infoValue: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "right",
    wordBreak: "break-all",
  },
  loaderWrap: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    border: "3px solid rgba(255,255,255,0.18)",
    borderTopColor: "#f7d237",
  },
  form: {
    marginTop: "28px",
    display: "grid",
    gap: "16px",
  },
  field: {
    display: "grid",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    color: "#e0e1e3",
  },
  input: {
    width: "100%",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "15px 16px",
    fontSize: "15px",
    outline: "none",
  },
  errorBox: {
    marginTop: "26px",
    padding: "18px",
    borderRadius: "22px",
    background: "rgba(255, 87, 87, 0.08)",
    border: "1px solid rgba(255, 87, 87, 0.22)",
  },
  errorTitle: {
    display: "block",
    marginBottom: "10px",
    fontSize: "16px",
    color: "#fff",
  },
  errorText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.55,
    color: "#f0d1d1",
  },
  manualBox: {
    marginTop: "14px",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.18)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    wordBreak: "break-all",
  },
  button: {
    marginTop: "18px",
    width: "100%",
    border: 0,
    borderRadius: "18px",
    padding: "18px 20px",
    fontSize: "16px",
    fontWeight: 700,
    background: "#f7d237",
    color: "#0b1d3a",
  },
  smallText: {
    marginTop: "14px",
    fontSize: "13px",
    color: "#a5aeb2",
  },
};
