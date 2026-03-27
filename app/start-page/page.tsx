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
  payment_status?: string;
  access_expires_at?: string;
  error?: string;
};

type StartActionResponse = {
  ok: boolean;
  error?: string;
};

function formatTimeLeft(expiresAt?: string) {
  if (!expiresAt) return "—";

  const now = new Date().getTime();
  const end = new Date(expiresAt).getTime();
  const diff = end - now;

  if (Number.isNaN(end) || diff <= 0) return "Срок доступа истёк";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days} дн.`;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 0) return `${hours} ч.`;

  const minutes = Math.floor(diff / (1000 * 60));
  return `${minutes} мин.`;
}

function StartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [logoTransform, setLogoTransform] = useState(
    "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );

  const [resolving, setResolving] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resolved, setResolved] = useState<ResolveResponse | null>(null);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
          throw new Error("Не найден параметр оплаты в ссылке.");
        }

        if (String(st).toUpperCase() !== "COMPLETED") {
          throw new Error("Оплата не подтверждена.");
        }

        const currentUrl =
          typeof window !== "undefined" ? window.location.href : "";

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
            current_url: currentUrl,
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

  function handleLogoMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;

    setLogoTransform(
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.045,1.045,1.045)`
    );
  }

  function handleLogoLeave() {
    setLogoTransform(
      "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
  }

  function handleLogoEnter() {
    setLogoTransform(
      "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1.025,1.025,1.025)"
    );
  }

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
        throw new Error("Введите телефон в WhatsApp.");
      }

      if (!login.trim()) {
        throw new Error("Придумайте логин.");
      }

      if (!password.trim()) {
        throw new Error("Придумайте пароль.");
      }

      if (password.trim().length < 6) {
        throw new Error("Пароль должен быть не короче 6 символов.");
      }

      const currentUrl =
        typeof window !== "undefined" ? window.location.href : "";

      const payload = {
        access_token: resolved.access_token,
        full_name: fullName.trim(),
        company_name: companyName.trim(),
        whatsapp: whatsapp.trim(),
        login: login.trim(),
        password: password.trim(),
        start_page_link: currentUrl,
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

      router.push(`/account/${resolved.access_token}`);
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
      <div style={styles.animatedBg}>
        <div style={styles.bgOrbOne} />
        <div style={styles.bgOrbTwo} />
        <div style={styles.bgOrbThree} />
        <div style={styles.bgNoise} />
      </div>

      <div style={styles.shell}>
        <div style={styles.logoOuter}>
          <div
            style={{
              ...styles.logoTilt,
              transform: logoTransform,
            }}
            onMouseMove={handleLogoMove}
            onMouseLeave={handleLogoLeave}
            onMouseEnter={handleLogoEnter}
          >
            <div style={styles.logoGlow} />
            <div style={styles.logoGlowSecondary} />
            <Image
              src="/logo.svg"
              alt="Growth Avenue"
              width={220}
              height={52}
              style={styles.logo}
              priority
            />
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardGradient} />

          <div style={styles.cardContent}>
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

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Осталось времени</span>
                <span style={styles.infoValue}>
                  {formatTimeLeft(resolved?.access_expires_at)}
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
                    autoComplete="name"
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
                    autoComplete="organization"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Телефон в WhatsApp</label>
                  <input
                    style={styles.input}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+995 5XX XX XX XX"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Придумайте логин</label>
                  <input
                    style={styles.input}
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Например: anna.studio"
                    autoComplete="username"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Придумайте пароль</label>
                  <input
                    style={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Не менее 6 символов"
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  disabled={submitting}
                  style={{
                    ...styles.button,
                    opacity: submitting ? 0.78 : 1,
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
                После нажатия «Начать» данные будут сохранены, а затем откроется
                ваша персональная страница.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StartPageFallback() {
  return (
    <main style={styles.page}>
      <div style={styles.animatedBg}>
        <div style={styles.bgOrbOne} />
        <div style={styles.bgOrbTwo} />
        <div style={styles.bgOrbThree} />
        <div style={styles.bgNoise} />
      </div>

      <div style={styles.shell}>
        <div style={styles.logoOuter}>
          <div style={styles.logoTilt}>
            <div style={styles.logoGlow} />
            <div style={styles.logoGlowSecondary} />
            <Image
              src="/logo.svg"
              alt="Growth Avenue"
              width={220}
              height={52}
              style={styles.logo}
              priority
            />
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardGradient} />
          <div style={styles.cardContent}>
            <div style={styles.badge}>
              <span className="pulse-dot" style={styles.badgeDot} />
              <span>REVENUE SNAPSHOT</span>
            </div>

            <h1 style={styles.title}>Подготавливаем доступ</h1>
            <p style={styles.text}>
              Мы проверяем оплату и подготавливаем ваш персональный доступ.
            </p>
          </div>
        </div>
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
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#08162f",
    color: "#fefefe",
    overflow: "hidden",
  },

  animatedBg: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0,
    background:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 24%), radial-gradient(circle at 80% 10%, rgba(247,210,55,0.12), transparent 18%), linear-gradient(180deg, #091833 0%, #0b1d3a 52%, #08162f 100%)",
  },

  bgOrbOne: {
    position: "absolute",
    width: "42vw",
    height: "42vw",
    minWidth: "320px",
    minHeight: "320px",
    top: "-10%",
    left: "-8%",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(154,197,255,0.10) 30%, rgba(154,197,255,0.00) 72%)",
    filter: "blur(18px)",
    animation: "gaFloatOne 18s ease-in-out infinite",
  },

  bgOrbTwo: {
    position: "absolute",
    width: "38vw",
    height: "38vw",
    minWidth: "280px",
    minHeight: "280px",
    right: "-6%",
    top: "8%",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, rgba(247,210,55,0.16) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0.00) 72%)",
    filter: "blur(20px)",
    animation: "gaFloatTwo 22s ease-in-out infinite",
  },

  bgOrbThree: {
    position: "absolute",
    width: "46vw",
    height: "46vw",
    minWidth: "340px",
    minHeight: "340px",
    left: "22%",
    bottom: "-18%",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, rgba(114,169,255,0.14) 0%, rgba(255,255,255,0.06) 26%, rgba(255,255,255,0.00) 72%)",
    filter: "blur(26px)",
    animation: "gaFloatThree 26s ease-in-out infinite",
  },

  bgNoise: {
    position: "absolute",
    inset: 0,
    opacity: 0.08,
    backgroundImage:
      "radial-gradient(rgba(255,255,255,0.5) 0.6px, transparent 0.6px)",
    backgroundSize: "18px 18px",
  },

  shell: {
    width: "100%",
    maxWidth: "920px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    zIndex: 1,
  },

  logoOuter: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "96px",
  },

  logoTilt: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transformStyle: "preserve-3d",
    transition: "transform 0.12s ease-out",
    willChange: "transform",
  },

  logoGlow: {
    position: "absolute",
    inset: "-22px -34px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 34%, rgba(255,255,255,0) 76%)",
    filter: "blur(16px)",
    pointerEvents: "none",
    animation: "gaLogoPulse 5.5s ease-in-out infinite",
  },

  logoGlowSecondary: {
    position: "absolute",
    inset: "-28px -42px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, rgba(247,210,55,0.12) 0%, rgba(113,150,255,0.10) 42%, rgba(255,255,255,0) 80%)",
    filter: "blur(24px)",
    pointerEvents: "none",
    animation: "gaLogoPulse 7.5s ease-in-out infinite reverse",
  },

  logo: {
    width: "auto",
    height: "50px",
    position: "relative",
    zIndex: 2,
    filter:
      "drop-shadow(0 0 10px rgba(255,255,255,0.18)) drop-shadow(0 0 28px rgba(255,255,255,0.08))",
  },

  card: {
    width: "100%",
    maxWidth: "780px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "34px",
    padding: "0",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 16px 56px rgba(0,0,0,0.30)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },

  cardGradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(114,169,255,0.06) 28%, rgba(247,210,55,0.05) 54%, rgba(255,255,255,0.04) 100%)",
    opacity: 0.95,
    animation: "gaCardShift 16s ease-in-out infinite",
    pointerEvents: "none",
  },

  cardContent: {
    position: "relative",
    zIndex: 2,
    padding: "34px 32px",
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
    lineHeight: 1.04,
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
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
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
    wordBreak: "break-word",
  },

  loaderWrap: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
  },

  loader: {
    width: "42px",
    height: "42px",
    borderRadius: "999px",
    border: "3px solid rgba(255,255,255,0.18)",
    borderTopColor: "#f7d237",
    animation: "gaSpin 0.9s linear infinite",
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
    border: "1px solid rgba(255,255,255,0.13)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "15px 16px",
    fontSize: "15px",
    outline: "none",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
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

  button: {
    marginTop: "18px",
    width: "100%",
    border: 0,
    borderRadius: "18px",
    padding: "18px 20px",
    fontSize: "16px",
    fontWeight: 700,
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(247,210,55,0.98) 52%, rgba(255,255,255,0.94) 100%)",
    color: "#0b1d3a",
    boxShadow: "0 14px 34px rgba(247,210,55,0.18)",
  },

  smallText: {
    marginTop: "14px",
    fontSize: "13px",
    color: "#a5aeb2",
  },
};
