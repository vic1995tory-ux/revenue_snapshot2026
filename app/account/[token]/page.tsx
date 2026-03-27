"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type ResultRow = {
  id: string;
  date: string;
  executiveSummary: string;
  mainLever: string;
  riskZone: string;
  comment: string;
  resultUrl?: string;
  status?: string;
};

type CabinetData = {
  fullName: string;
  companyName: string;
  position: string;
  positionLocked: boolean;
  expiresAt: string;
  companySummary: string;
  launchCount: number;
  launchLimit: number;
  results: ResultRow[];
};

type AccountSessionResponse = {
  ok: boolean;
  error?: string;
  data?: {
    fullName?: string;
    companyName?: string;
    position?: string;
    positionLocked?: boolean;
    expiresAt?: string;
    companySummary?: string;
    launchCount?: number;
    launchLimit?: number;
    results?: Array<{
      id?: string | number;
      date?: string;
      executiveSummary?: string;
      mainLever?: string;
      riskZone?: string;
      comment?: string;
      resultUrl?: string;
      status?: string;
    }>;
  };
};

const POSITION_WEBHOOK_URL =
  "https://hook.us2.make.com/z5en2sa55efywylbva4w5sc57mawkrpb";

const DEFAULT_MAX_LAUNCHES = 3;

function makeAttemptId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `attempt_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function getLaunchAttemptStorageKey(token: string) {
  return `rs_launch_attempt_${token}`;
}

function storeAttemptId(token: string, attemptId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getLaunchAttemptStorageKey(token), attemptId);
}

export default function CabinetPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = String(params?.token ?? "");

  const [faqOpen, setFaqOpen] = useState(false);
  const [savingPosition, setSavingPosition] = useState(false);
  const [positionSaved, setPositionSaved] = useState(false);
  const [loadingCabinet, setLoadingCabinet] = useState(true);
  const [startingLaunch, setStartingLaunch] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<CabinetData>({
    fullName: "Имя Фамилия",
    companyName: "Название компании",
    position: "",
    positionLocked: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
    companySummary: "",
    launchCount: 0,
    launchLimit: DEFAULT_MAX_LAUNCHES,
    results: [],
  });

  const [comments, setComments] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadCabinet() {
      try {
        setLoadingCabinet(true);
        setError("");

        const res = await fetch(
          `/api/account/session?token=${encodeURIComponent(token)}`,
          {
            cache: "no-store",
          }
        );

        const contentType = res.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error("Кабинет вернул не JSON.");
        }

        const payload: AccountSessionResponse = await res.json();

        if (!res.ok || !payload?.ok || !payload?.data) {
          throw new Error(payload?.error || "Не удалось загрузить кабинет.");
        }

        const cabinet = payload.data;

        const normalizedResults: ResultRow[] = Array.isArray(cabinet.results)
          ? cabinet.results.map((item, index) => ({
              id: String(item?.id ?? index + 1),
              date: String(item?.date ?? ""),
              executiveSummary: String(item?.executiveSummary ?? ""),
              mainLever: String(item?.mainLever ?? ""),
              riskZone: String(item?.riskZone ?? ""),
              comment: String(item?.comment ?? ""),
              resultUrl: String(item?.resultUrl ?? ""),
              status: String(item?.status ?? "result_ready"),
            }))
          : [];

        const launchLimit =
          typeof cabinet.launchLimit === "number" && Number.isFinite(cabinet.launchLimit)
            ? cabinet.launchLimit
            : DEFAULT_MAX_LAUNCHES;

        const launchCount =
          typeof cabinet.launchCount === "number" && Number.isFinite(cabinet.launchCount)
            ? cabinet.launchCount
            : normalizedResults.length;

        setData({
          fullName: String(cabinet.fullName ?? "Имя Фамилия"),
          companyName: String(cabinet.companyName ?? "Название компании"),
          position: String(cabinet.position ?? ""),
          positionLocked: Boolean(cabinet.positionLocked ?? false),
          expiresAt: String(
            cabinet.expiresAt ??
              new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString()
          ),
          companySummary: String(cabinet.companySummary ?? ""),
          launchCount,
          launchLimit,
          results: normalizedResults,
        });

        setComments(
          Object.fromEntries(
            normalizedResults.map((item) => [item.id, item.comment || ""])
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Не удалось загрузить кабинет."
        );
      } finally {
        setLoadingCabinet(false);
      }
    }

    if (token) {
      void loadCabinet();
    }
  }, [token]);

  const launchesUsed = data.launchCount;
  const maxLaunches = data.launchLimit || DEFAULT_MAX_LAUNCHES;
  const launchesLeft = Math.max(0, maxLaunches - launchesUsed);

  const expiration = useMemo(() => {
    const now = Date.now();
    const end = new Date(data.expiresAt).getTime();
    const diff = Math.max(0, end - now);

    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const exactDate = new Date(data.expiresAt).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const progress = Math.min(100, Math.max(0, (daysLeft / 365) * 100));

    return {
      daysLeft,
      exactDate,
      progress,
    };
  }, [data.expiresAt]);

  async function handleSavePosition() {
    try {
      setSavingPosition(true);
      setError("");

      if (!data.position.trim()) {
        throw new Error("Введите должность.");
      }

      const payload = {
        action: "save_position",
        access_token: token,
        position: data.position.trim(),
        full_name: data.fullName,
        company_name: data.companyName,
        position_locked: true,
      };

      const res = await fetch(POSITION_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Не удалось сохранить должность.");
      }

      setData((prev) => ({
        ...prev,
        position: prev.position.trim(),
        positionLocked: true,
      }));

      setPositionSaved(true);
      window.setTimeout(() => setPositionSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения.");
    } finally {
      setSavingPosition(false);
    }
  }

  function handleCommentChange(id: string, value: string) {
    setComments((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleNewLaunch() {
    if (launchesUsed >= maxLaunches || !token || startingLaunch) return;

    try {
      setStartingLaunch(true);
      setError("");

      const launchAttemptId = makeAttemptId();
      storeAttemptId(token, launchAttemptId);

      const snapshotUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/snapshot-action/${encodeURIComponent(
              token
            )}?launch=${encodeURIComponent(launchAttemptId)}`
          : `/snapshot-action/${encodeURIComponent(token)}?launch=${encodeURIComponent(
              launchAttemptId
            )}`;

      const cabinetUrl =
        typeof window !== "undefined" ? window.location.href : "";

      const payload = {
        action: "launch_started",
        access_token: token,
        launch_attempt_id: launchAttemptId,
        started_at: new Date().toISOString(),
        full_name: data.fullName,
        company_name: data.companyName,
        position: data.position,
        position_locked: data.positionLocked,
        launches_used: launchesUsed,
        launches_left: launchesLeft,
        launch_limit: maxLaunches,
        expires_at: data.expiresAt,
        company_summary: data.companySummary,
        results_count: data.results.length,
        results: data.results.map((item) => ({
          id: item.id,
          date: item.date,
          executive_summary: item.executiveSummary,
          main_lever: item.mainLever,
          risk_zone: item.riskZone,
          comment: comments[item.id] ?? item.comment ?? "",
          result_url: item.resultUrl ?? "",
          status: item.status ?? "result_ready",
        })),
        cabinet_url: cabinetUrl,
        snapshot_url: snapshotUrl,
      };

      const res = await fetch(POSITION_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Не удалось зафиксировать запуск.");
      }

      router.push(
        `/snapshot-action/${encodeURIComponent(
          token
        )}?launch=${encodeURIComponent(launchAttemptId)}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось начать запуск.");
    } finally {
      setStartingLaunch(false);
    }
  }

  const ringRadius = 76;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset =
    ringCircumference - (expiration.progress / 100) * ringCircumference;

  return (
    <main style={styles.page}>
      <div className="ambient-gradient-bg" />

      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Image
            src="/logo.svg"
            alt="Growth Avenue"
            width={170}
            height={40}
            style={styles.logo}
            priority
          />
        </div>

        <div style={styles.headerRight}>
          <a
            href="https://api.whatsapp.com/send/?phone=995555163833&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
            style={styles.headerButton}
          >
            Помощь от создателей
          </a>

          <button
            type="button"
            onClick={() => setFaqOpen(true)}
            style={styles.headerGhostButton}
          >
            FAQ
          </button>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.heroVisual}>
            <Image
              src="/hero.svg"
              alt=""
              fill
              priority
              style={styles.heroVisualImg}
            />
          </div>

          <div style={styles.heroContent}>
            <div style={styles.kicker}>
              <span className="pulse-dot" style={styles.kickerDot} />
              <span>PERSONAL CABINET</span>
            </div>

            <h1 style={styles.h1}>{data.fullName}</h1>
            <h2 style={styles.h2}>{data.companyName}</h2>

            <div style={styles.positionBox}>
              <div style={styles.positionLabelRow}>
                <label style={styles.positionLabel}>Должность</label>
                {positionSaved && <span style={styles.savedMark}>сохранено</span>}
              </div>

              <div style={styles.positionInputRow}>
                <input
                  type="text"
                  value={data.position}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, position: e.target.value }))
                  }
                  placeholder="Необязательно к заполнению"
                  disabled={data.positionLocked || savingPosition}
                  style={{
                    ...styles.positionInput,
                    opacity: data.positionLocked ? 0.75 : 1,
                  }}
                />

                <button
                  type="button"
                  onClick={handleSavePosition}
                  disabled={data.positionLocked || savingPosition}
                  style={{
                    ...styles.positionSaveButton,
                    opacity: data.positionLocked || savingPosition ? 0.7 : 1,
                    cursor:
                      data.positionLocked || savingPosition ? "default" : "pointer",
                  }}
                  title="Сохранить должность для следующих сессий"
                >
                  {data.positionLocked ? "✓" : savingPosition ? "..." : "✓"}
                </button>
              </div>
            </div>

            {error ? <div style={styles.errorBox}>{error}</div> : null}
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.expirationCard}>
            <div style={styles.expirationTitle}>Expiration date</div>

            <div style={styles.ringWrap}>
              <svg width="210" height="210" viewBox="0 0 210 210">
                <defs>
                  <linearGradient id="expRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#47b6f6" />
                    <stop offset="55%" stopColor="#7c84ff" />
                    <stop offset="100%" stopColor="#f7d237" />
                  </linearGradient>
                </defs>

                <circle
                  cx="105"
                  cy="105"
                  r={ringRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="12"
                />
                <circle
                  cx="105"
                  cy="105"
                  r={ringRadius}
                  fill="none"
                  stroke="url(#expRing)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  transform="rotate(-90 105 105)"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>

              <div style={styles.ringCenter}>
                <div style={styles.ringDays}>{expiration.daysLeft}</div>
                <div style={styles.ringSmall}>expires in</div>
                <div style={styles.ringSmallBottom}>days</div>
              </div>
            </div>

            <div style={styles.expirationDate}>{expiration.exactDate}</div>
          </div>
        </div>
      </section>

      <section style={styles.cardsSection}>
        <div style={styles.infoCard}>
          <div style={styles.cardHeading}>Company summary</div>

          {loadingCabinet ? (
            <div style={styles.placeholderText}>Загрузка...</div>
          ) : data.companySummary ? (
            <div style={styles.cardText}>{data.companySummary}</div>
          ) : (
            <div style={styles.placeholderText}>
              Появится после первого запуска
            </div>
          )}
        </div>

        <div style={styles.launchesCard}>
          <div style={styles.launchesTop}>
            <div>
              <div style={styles.cardHeading}>Launches</div>

              <div style={styles.launchesValue}>
                {launchesUsed}/{maxLaunches}
              </div>

              <div style={styles.launchesMeta}>
                Осталось запусков: {launchesLeft}
              </div>
            </div>

            <button
              type="button"
              style={{
                ...styles.playButton,
                opacity: launchesUsed >= maxLaunches || startingLaunch ? 0.55 : 1,
                cursor:
                  launchesUsed >= maxLaunches || startingLaunch
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={launchesUsed >= maxLaunches || startingLaunch}
              onClick={handleNewLaunch}
              title="Начать запуск"
              aria-label="Начать запуск"
            >
              {startingLaunch ? "..." : "▶"}
            </button>
          </div>

          <div style={styles.launchProgressTrack}>
            <div
              style={{
                ...styles.launchProgressFill,
                width: `${(launchesUsed / maxLaunches) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section style={styles.resultsSection}>
        <div style={styles.resultsHeader}>
          <div style={{ ...styles.colDate, ...styles.resultHeaderCell }}>Date</div>
          <div style={{ ...styles.colSummary, ...styles.resultHeaderCell }}>
            Executive summary
          </div>
          <div style={{ ...styles.colLever, ...styles.resultHeaderCell }}>
            Main lever
          </div>
          <div style={{ ...styles.colRisk, ...styles.resultHeaderCell }}>
            Risk zone
          </div>
          <div style={{ ...styles.colComment, ...styles.resultHeaderCell }}>
            Comment
          </div>
          <div style={{ ...styles.colActions, ...styles.resultHeaderCell }}>
            Actions
          </div>
        </div>

        {loadingCabinet ? (
          <div style={styles.emptyResults}>Загружаем результаты...</div>
        ) : data.results.length === 0 ? (
          <div style={styles.emptyResults}>
            Первый результат появится после первого запуска.
          </div>
        ) : (
          data.results.map((item) => (
            <div key={item.id} style={styles.resultRow}>
              <div style={styles.colDate}>{item.date}</div>

              <div style={styles.colSummary}>
                <div style={styles.resultTextClamp}>{item.executiveSummary}</div>
              </div>

              <div style={styles.colLever}>
                <div style={styles.resultTextClamp}>{item.mainLever}</div>
              </div>

              <div style={styles.colRisk}>
                <div style={styles.resultTextClamp}>{item.riskZone}</div>
              </div>

              <div style={styles.colComment}>
                <textarea
                  value={comments[item.id] ?? ""}
                  onChange={(e) => handleCommentChange(item.id, e.target.value)}
                  placeholder="Например: предполагаемый MVP"
                  style={styles.commentInput}
                />
              </div>

              <div style={styles.colActions}>
                <div className="action-tooltip-wrap" style={styles.actionTooltipWrap}>
                  <button type="button" style={styles.actionButton}>
                    Открыть
                  </button>
                  <div className="action-tooltip" style={styles.tooltip}>
                    Функция находится в разработке
                  </div>
                </div>

                <div className="action-tooltip-wrap" style={styles.actionTooltipWrap}>
                  <button type="button" style={styles.actionGhostButton}>
                    Скачать PDF
                  </button>
                  <div className="action-tooltip" style={styles.tooltip}>
                    Функция находится в разработке
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {faqOpen && (
        <div style={styles.modalOverlay} onClick={() => setFaqOpen(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTop}>
              <h3 style={styles.modalTitle}>FAQ</h3>
              <button
                type="button"
                onClick={() => setFaqOpen(false)}
                style={styles.modalClose}
              >
                ×
              </button>
            </div>

            <div style={styles.faqList}>
              <div style={styles.faqItem}>
                <strong>Сколько действует ссылка?</strong>
                <p style={styles.faqText}>Ссылка активна 1 год с момента создания.</p>
              </div>

              <div style={styles.faqItem}>
                <strong>Сколько запусков доступно?</strong>
                <p style={styles.faqText}>
                  Максимум {maxLaunches} запуска на один доступ.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong>Куда писать, если нужен созвон или помощь?</strong>
                <p style={styles.faqText}>
                  Используй кнопку «Помощь от создателей» в шапке.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
  },
  header: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "0 auto 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  logo: {
    width: "auto",
    height: "38px",
    filter:
      "drop-shadow(0 0 12px rgba(255,255,255,0.08)) drop-shadow(0 0 20px rgba(255,255,255,0.04))",
  },
  headerButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    padding: "12px 16px",
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    textDecoration: "none",
    boxShadow: "0 10px 24px rgba(85,104,255,0.22)",
  },
  headerGhostButton: {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    borderRadius: "999px",
    padding: "12px 16px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
  hero: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "22px",
    alignItems: "stretch",
  },
  heroLeft: {
    position: "relative",
    borderRadius: "30px",
    padding: "34px 32px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
    overflow: "hidden",
  },
  heroVisual: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    overflow: "hidden",
    borderRadius: "30px",
    opacity: 0.18,
  },
  heroVisualImg: {
    objectFit: "cover",
    objectPosition: "right center",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
  },
  heroRight: {
    borderRadius: "30px",
    padding: "28px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  h1: {
    margin: 0,
    fontSize: "54px",
    lineHeight: 1.02,
    fontWeight: 700,
  },
  h2: {
    margin: "10px 0 0",
    fontSize: "24px",
    lineHeight: 1.25,
    fontWeight: 500,
    color: "rgba(255,255,255,0.82)",
  },
  positionBox: {
    marginTop: "28px",
    padding: "18px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
  },
  positionLabelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "10px",
  },
  positionLabel: {
    fontSize: "14px",
    color: "#dfe4f2",
  },
  savedMark: {
    fontSize: "12px",
    color: "#f7d237",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  positionInputRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "10px",
  },
  positionInput: {
    width: "100%",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "15px 16px",
    fontSize: "15px",
    outline: "none",
  },
  positionSaveButton: {
    width: "54px",
    borderRadius: "16px",
    border: 0,
    background: "#f7d237",
    color: "#0b1d3a",
    fontWeight: 800,
    fontSize: "18px",
  },
  expirationCard: {
    width: "100%",
    display: "grid",
    justifyItems: "center",
    gap: "10px",
  },
  expirationTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#fefefe",
    marginBottom: "4px",
  },
  ringWrap: {
    position: "relative",
    width: "210px",
    height: "210px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ringCenter: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  ringDays: {
    fontSize: "48px",
    fontWeight: 800,
    lineHeight: 1,
    color: "#fff",
  },
  ringSmall: {
    marginTop: "6px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#aab3c7",
  },
  ringSmallBottom: {
    marginTop: "2px",
    fontSize: "12px",
    color: "#aab3c7",
  },
  expirationDate: {
    fontSize: "15px",
    color: "#d8dce7",
  },
  cardsSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "22px auto 0",
    display: "grid",
    gridTemplateColumns: "1fr 0.52fr",
    gap: "22px",
  },
  infoCard: {
    borderRadius: "28px",
    padding: "26px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
    minHeight: "170px",
  },
  launchesCard: {
    borderRadius: "28px",
    padding: "26px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
    minHeight: "170px",
    display: "grid",
    alignContent: "space-between",
  },
  launchesTop: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "18px",
    alignItems: "end",
  },
  playButton: {
    minWidth: "110px",
    height: "64px",
    border: 0,
    borderRadius: "22px",
    padding: "0 24px",
    fontSize: "28px",
    fontWeight: 800,
    background:
      "linear-gradient(135deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    boxShadow: "0 18px 34px rgba(85,104,255,0.24)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeading: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "16px",
  },
  cardText: {
    fontSize: "16px",
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.82)",
  },
  placeholderText: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.52)",
  },
  launchesValue: {
    fontSize: "46px",
    fontWeight: 800,
    lineHeight: 1,
    color: "#fff",
  },
  launchesMeta: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#d8dce7",
  },
  launchProgressTrack: {
    marginTop: "18px",
    height: "10px",
    width: "100%",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  launchProgressFill: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #f7d237 100%)",
    transition: "width 0.35s ease",
  },
  resultsSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "22px auto 0",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
    overflow: "hidden",
  },
  resultsHeader: {
    display: "grid",
    gridTemplateColumns: "0.85fr 1.45fr 1fr 1fr 1.1fr 0.8fr",
    gap: "14px",
    padding: "18px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
  },
  resultHeaderCell: {
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#aab3c7",
    fontWeight: 700,
  },
  resultRow: {
    display: "grid",
    gridTemplateColumns: "0.85fr 1.45fr 1fr 1fr 1.1fr 0.8fr",
    gap: "14px",
    padding: "18px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    alignItems: "start",
  },
  colDate: {},
  colSummary: {},
  colLever: {},
  colRisk: {},
  colComment: {},
  colActions: {
    display: "grid",
    gap: "10px",
  },
  resultTextClamp: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#eef2fb",
  },
  commentInput: {
    width: "100%",
    minHeight: "82px",
    resize: "vertical",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    padding: "12px 13px",
    fontSize: "14px",
    outline: "none",
  },
  actionTooltipWrap: {
    position: "relative",
    display: "inline-block",
    width: "100%",
  },
  actionButton: {
    width: "100%",
    border: 0,
    borderRadius: "14px",
    padding: "12px 14px",
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #c25cf3 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "not-allowed",
  },
  actionGhostButton: {
    width: "100%",
    borderRadius: "14px",
    padding: "12px 14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "not-allowed",
  },
  tooltip: {
    position: "absolute",
    left: "50%",
    bottom: "calc(100% + 8px)",
    transform: "translateX(-50%)",
    background: "#101a35",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "8px 10px",
    fontSize: "12px",
    whiteSpace: "nowrap",
    boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    opacity: 0,
    pointerEvents: "none",
  },
  emptyResults: {
    padding: "28px 22px",
    fontSize: "15px",
    color: "rgba(255,255,255,0.58)",
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
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(3,8,20,0.68)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    zIndex: 40,
  },
  modalCard: {
    width: "100%",
    maxWidth: "620px",
    borderRadius: "26px",
    padding: "24px",
    background: "#0f1d42",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 28px 80px rgba(0,0,0,0.34)",
  },
  modalTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "18px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
  },
  modalClose: {
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
  },
  faqList: {
    display: "grid",
    gap: "14px",
  },
  faqItem: {
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  faqText: {
    margin: "8px 0 0",
    color: "#d8dce7",
    lineHeight: 1.6,
    fontSize: "15px",
  },
};
