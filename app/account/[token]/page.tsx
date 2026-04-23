"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import {
  buildDefaultAccountTools,
  getToolByKey,
  type AccountTool,
} from "@/lib/account-tools";
import { getPlaygroundPricingSnapshot } from "@/lib/playground-pricing";
import { getPurchasedServiceLabel } from "@/lib/purchase-service";

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
  tools: AccountTool[];
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
    tools?: Array<{
      key?: string;
      title?: string;
      variant?: string;
      description?: string;
      isActive?: boolean;
      isLocked?: boolean;
      launchCount?: number;
      launchLimit?: number;
      accessUrl?: string;
      serviceCode?: string;
    }>;
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
const DEMO_ACCOUNT_TOKEN = "demo";

const WHATSAPP_HELP_URL =
  "https://api.whatsapp.com/send/?phone=995555163833&text&type=phone_number&app_absent=0";

const WHATSAPP_DELETE_URL = `https://api.whatsapp.com/send/?phone=995555163833&text=${encodeURIComponent(
  "Прошу очистить данные в моем аккаунте"
)}&type=phone_number&app_absent=0`;
const SERVICES_TOOLS_URL = "/services#tools";

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

function FaqActionButton({
  label,
  href,
  tooltip = "Функция находится в разработке",
}: {
  label: string;
  href?: string;
  tooltip?: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={styles.faqActionButton}
      >
        {label}
      </a>
    );
  }

  return (
    <div className="action-tooltip-wrap" style={styles.faqActionWrap}>
      <button type="button" style={styles.faqActionButton} aria-label={label}>
        {label}
      </button>
      <div className="action-tooltip" style={styles.tooltip}>
        {tooltip}
      </div>
    </div>
  );
}

export default function CabinetPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = String(params?.token ?? "");
  const isDemoAccount = token.toLowerCase() === DEMO_ACCOUNT_TOKEN;
  const playgroundPricing = useMemo(() => getPlaygroundPricingSnapshot(), []);
  const purchasedServiceLabel = useMemo(
    () => getPurchasedServiceLabel(token, isDemoAccount),
    [token, isDemoAccount]
  );

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
    tools: [],
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
          typeof cabinet.launchLimit === "number" &&
          Number.isFinite(cabinet.launchLimit)
            ? cabinet.launchLimit
            : DEFAULT_MAX_LAUNCHES;

        const launchCount =
          typeof cabinet.launchCount === "number" &&
          Number.isFinite(cabinet.launchCount)
            ? cabinet.launchCount
            : normalizedResults.length;

        const fallbackTools = buildDefaultAccountTools({
          token,
          isDemoAccount,
          launchCount,
          launchLimit,
        });

        const tools = fallbackTools.map((tool) => {
          const sourceTool =
            Array.isArray(cabinet.tools) && cabinet.tools.length > 0
              ? cabinet.tools.find((raw) => raw?.key === tool.key)
              : undefined;

          return {
            ...tool,
            title: String(sourceTool?.title ?? tool.title),
            variant: String(sourceTool?.variant ?? tool.variant),
            description: String(sourceTool?.description ?? tool.description),
            isActive: Boolean(sourceTool?.isActive ?? tool.isActive),
            isLocked: Boolean(
              sourceTool?.isLocked ??
                !Boolean(sourceTool?.isActive ?? tool.isActive)
            ),
            launchCount:
              typeof sourceTool?.launchCount === "number" &&
              Number.isFinite(sourceTool.launchCount)
                ? sourceTool.launchCount
                : tool.launchCount,
            launchLimit:
              typeof sourceTool?.launchLimit === "number" &&
              Number.isFinite(sourceTool.launchLimit)
                ? sourceTool.launchLimit
                : tool.launchLimit,
            accessUrl:
              typeof sourceTool?.accessUrl === "string"
                ? sourceTool.accessUrl
                : tool.accessUrl,
          };
        });

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
          tools,
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
  }, [token, isDemoAccount]);

  const launchesUsed = data.launchCount;
  const maxLaunches = data.launchLimit || DEFAULT_MAX_LAUNCHES;
  const snapshotPlaygroundTool = getToolByKey(data.tools, "rs_playground");
  const snapshotLaunchesUsed =
    snapshotPlaygroundTool?.launchCount ?? launchesUsed;
  const snapshotLaunchLimit =
    snapshotPlaygroundTool?.launchLimit ?? maxLaunches;
  const snapshotLaunchesLeft = Math.max(
    0,
    snapshotLaunchLimit - snapshotLaunchesUsed
  );

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

  function handleToolPlay(tool: AccountTool) {
    if (!tool.isActive || tool.isLocked) return;

    if (tool.key === "rs_playground") {
      void handleNewLaunch();
      return;
    }

    if (tool.accessUrl) {
      router.push(tool.accessUrl);
    }
  }

  async function handleNewLaunch() {
    if (
      !snapshotPlaygroundTool?.isActive ||
      snapshotLaunchesUsed >= snapshotLaunchLimit ||
      !token ||
      startingLaunch
    ) {
      return;
    }

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
          : `/snapshot-action/${encodeURIComponent(
              token
            )}?launch=${encodeURIComponent(launchAttemptId)}`;

      const cabinetUrl =
        typeof window !== "undefined" ? window.location.href : "";

      const payload = {
        action: "launch_started",
        access_token: token,
        tool_key: "rs_playground",
        service_code: "pg",
        launch_attempt_id: launchAttemptId,
        started_at: new Date().toISOString(),
        full_name: data.fullName,
        company_name: data.companyName,
        position: data.position,
        position_locked: data.positionLocked,
        launches_used: snapshotLaunchesUsed,
        launches_left: snapshotLaunchesLeft,
        launch_limit: snapshotLaunchLimit,
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
          <Link href="/" style={styles.headerGhostLink}>
            Главная
          </Link>

          <Link href="/services" style={styles.headerGhostLink}>
            Услуги
          </Link>

          <a
            href={WHATSAPP_HELP_URL}
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

      <section style={styles.toolsSection}>
        <div style={styles.toolsSectionHeader}>
          <div>
            <div style={styles.toolsKicker}>INSTRUMENTS</div>
            <h2 style={styles.toolsTitle}>Доступные инструменты кабинета</h2>
          </div>
          {data.companySummary ? (
            <div style={styles.toolsSummary}>
              {data.companySummary}
            </div>
          ) : null}
        </div>

        <div style={styles.toolsGrid}>
          {data.tools.map((tool) => {
            const isPlaygroundSnapshot = tool.key === "rs_playground";
            const isOnRecSnapshot = tool.key === "rs_onrec";
            const currentLaunchCount =
              typeof tool.launchCount === "number"
                ? tool.launchCount
                : snapshotLaunchesUsed;
            const currentLaunchLimit =
              typeof tool.launchLimit === "number"
                ? tool.launchLimit
                : snapshotLaunchLimit;
            const currentLaunchProgress =
              currentLaunchLimit > 0
                ? Math.min(100, (currentLaunchCount / currentLaunchLimit) * 100)
                : 0;
            const playDisabled =
              !tool.isActive ||
              tool.isLocked ||
              (isPlaygroundSnapshot &&
                (currentLaunchCount >= currentLaunchLimit || startingLaunch));

            return (
              <article
                key={tool.key}
                style={{
                  ...styles.toolCard,
                  ...(tool.isActive ? styles.toolCardActive : styles.toolCardLocked),
                }}
              >
                <div style={styles.toolCardVisual}>
                  <Image
                    src="/acc_pic1.svg"
                    alt=""
                    fill
                    priority={tool.key === "rs_playground"}
                    style={{
                      ...styles.toolCardVisualImage,
                      ...(tool.isActive
                        ? styles.toolCardVisualImageActive
                        : styles.toolCardVisualImageLocked),
                    }}
                  />
                  <div
                    style={{
                      ...styles.toolCardVisualOverlay,
                      ...(tool.isActive
                        ? styles.toolCardVisualOverlayActive
                        : styles.toolCardVisualOverlayLocked),
                    }}
                  />
                </div>

                <div style={styles.toolCardBody}>
                  <div style={styles.toolCardTop}>
                    <div>
                      <div style={styles.toolVariant}>{tool.variant}</div>
                      <h3 style={styles.toolTitle}>{tool.title}</h3>
                    </div>
                    <div
                      style={{
                        ...styles.toolStatus,
                        ...(tool.isActive
                          ? styles.toolStatusActive
                          : styles.toolStatusLocked),
                      }}
                    >
                      {tool.isActive ? "active" : "locked"}
                    </div>
                  </div>

                  <p style={styles.toolDescription}>{tool.description}</p>

                  {isPlaygroundSnapshot ? (
                    <div style={styles.toolMetricBlock}>
                      <div style={styles.toolMetricLabel}>Запуски Snapshot</div>
                      <div style={styles.toolMetricValue}>
                        {currentLaunchCount}/{currentLaunchLimit}
                      </div>
                      <div style={styles.toolMetricSub}>
                        Осталось запусков:{" "}
                        {Math.max(0, currentLaunchLimit - currentLaunchCount)}
                      </div>
                      <div style={styles.toolProgressTrack}>
                        <div
                          style={{
                            ...styles.toolProgressFill,
                            width: `${currentLaunchProgress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : isOnRecSnapshot && tool.isActive ? (
                    <div style={styles.toolMetricBlock}>
                      <div style={styles.toolMetricLabel}>Формат доступа</div>
                      <div style={styles.toolMetricValue}>Result access</div>
                      <div style={styles.toolMetricSub}>
                        Доступ к персональной странице результата и рабочему контуру.
                      </div>
                    </div>
                  ) : (
                    <div style={styles.toolMetricBlock}>
                      <div style={styles.toolMetricLabel}>Статус</div>
                      <div style={styles.toolMetricValue}>Coming soon</div>
                      <div style={styles.toolMetricSub}>
                        Инструмент появится в кабинете после релиза и обновления доступа.
                      </div>
                    </div>
                  )}

                  <div style={styles.toolActions}>
                    <button
                      type="button"
                      style={{
                        ...styles.playButton,
                        ...styles.toolPlayButton,
                        opacity: playDisabled ? 0.45 : 1,
                        cursor: playDisabled ? "not-allowed" : "pointer",
                      }}
                      disabled={playDisabled}
                      onClick={() => handleToolPlay(tool)}
                      title="Открыть инструмент"
                      aria-label={`Открыть ${tool.title}`}
                    >
                      {startingLaunch && isPlaygroundSnapshot ? "..." : "Play"}
                    </button>

                    {!tool.isActive ? (
                      <div style={styles.toolLockedActions}>
                        <button type="button" style={styles.comingSoonButton}>
                          coming soon
                        </button>
                        <Link
                          href={SERVICES_TOOLS_URL}
                          style={styles.plusButton}
                          aria-label="Перейти к инструментам"
                        >
                          <Plus size={16} />
                        </Link>
                      </div>
                    ) : (
                      <div style={styles.toolAccessNote}>
                        {isPlaygroundSnapshot
                          ? "Интерактивный запуск из кабинета"
                          : "Переход к result page"}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section style={styles.releaseSection}>
        <div className="release-preorder-card" style={styles.releaseCard}>
          <div>
            <div style={styles.releaseKicker}>{playgroundPricing.releaseLabel}</div>
            <h2 style={styles.releaseTitle}>{playgroundPricing.title}</h2>
            <p style={styles.releaseText}>{playgroundPricing.description}</p>
          </div>

          <div style={styles.releaseMetaGrid}>
            {playgroundPricing.tiers.map((tier) => (
              <div
                key={tier.label}
                style={{
                  ...styles.releaseMetaItem,
                  ...(tier.active ? styles.releaseMetaItemActive : {}),
                }}
              >
                <div style={styles.releaseMetaLabel}>{tier.label}</div>
                <div style={styles.releaseMetaValue}>${tier.price}</div>
              </div>
            ))}
          </div>

          <a
            href={playgroundPricing.payUrl}
            target="_blank"
            rel="noreferrer"
            style={styles.releaseButton}
          >
            {playgroundPricing.buttonLabel}
          </a>
        </div>
      </section>

      <section style={styles.resultsSection}>
        <div style={styles.resultsHeader}>
          <div style={{ ...styles.colDate, ...styles.resultHeaderCell }}>Date / Service</div>
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
              <div style={styles.colDate}>
                <div style={styles.resultDateText}>{item.date}</div>
                <div style={styles.resultServiceTag}>{purchasedServiceLabel}</div>
              </div>

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
                {item.resultUrl ? (
                  <a
                    href={item.resultUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...styles.actionButton,
                      display: "inline-flex",
                      justifyContent: "center",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Открыть
                  </a>
                ) : (
                  <div className="action-tooltip-wrap" style={styles.actionTooltipWrap}>
                    <button type="button" style={styles.actionButton}>
                      Открыть
                    </button>
                    <div className="action-tooltip" style={styles.tooltip}>
                      Функция находится в разработке
                    </div>
                  </div>
                )}

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
                <strong style={styles.faqQuestion}>
                  1. Можно ли использовать разные бизнесы в разных попытках?
                </strong>
                <p style={styles.faqText}>
                  Да, каждая попытка может быть использована для анализа
                  отдельного бизнеса или направления.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  2. Можно ли купить дополнительные попытки?
                </strong>
                <p style={styles.faqText}>
                  Да, вы можете приобрести дополнительные попытки отдельно, без
                  необходимости повторной покупки основного доступа.
                </p>
                <div style={styles.faqActionsRow}>
                  <FaqActionButton label="Купить за $30" />
                </div>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  3. Можно ли отредактировать уже отправленные данные?
                </strong>
                <p style={styles.faqText}>
                  Нет, после отправки данные фиксируются. Для внесения изменений
                  потребуется использовать новую попытку.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  4. Что происходит, если я не закончил заполнение?
                </strong>
                <p style={styles.faqText}>
                  Ваш прогресс сохраняется. Вы можете продолжить с того же места
                  при следующем входе.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  5. Где хранятся мои результаты?
                </strong>
                <p style={styles.faqText}>
                  Все результаты сохраняются в личном кабинете и доступны в
                  любое время в рамках срока доступа.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  6. Можно ли удалить свои данные или результаты?
                </strong>
                <p style={styles.faqText}>
                  Да, вы можете запросить удаление данных или результатов.
                </p>
                <div style={styles.faqActionsRow}>
                  <FaqActionButton
                    label="Написать в WhatsApp"
                    href={WHATSAPP_DELETE_URL}
                  />
                </div>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  7. Используются ли мои данные для анализа или кейсов?
                </strong>
                <p style={styles.faqText}>
                  Данные используются исключительно для формирования вашего
                  результата. Любое использование в кейсах или примерах возможно
                  только с вашего предварительного согласия.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  8. Можно ли пройти Snapshot вместе с командой?
                </strong>
                <p style={styles.faqText}>
                  Да, вы можете заполнять данные совместно с командой,
                  используя один аккаунт.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  9. Что будет, если у меня закончились попытки, но доступ ещё
                  активен?
                </strong>
                <p style={styles.faqText}>
                  Вы сохраняете доступ ко всем ранее полученным результатам.
                </p>
                <div style={styles.faqSubList}>
                  <div style={styles.faqSubBullet}>
                    • в личном кабинете могут появляться новые инструменты и
                    возможности
                  </div>
                  <div style={styles.faqSubBullet}>
                    • для них могут предоставляться специальные условия
                  </div>
                </div>
                <p style={styles.faqText}>
                  Для получения новых результатов потребуется приобрести
                  дополнительные попытки.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  10. Можно ли экспортировать результат?
                </strong>
                <p style={styles.faqText}>
                  Да, результат доступен для просмотра в личном кабинете и может
                  быть сохранён или экспортирован.
                </p>
                <div style={styles.faqActionsRow}>
                  <FaqActionButton label="Запросить экспорт" />
                </div>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  11. Как понять, какую попытку лучше использовать сейчас?
                </strong>
                <p style={styles.faqText}>
                  Рекомендуется использовать попытку, когда у вас есть
                  максимально полные и актуальные данные по бизнесу — это
                  напрямую влияет на качество результата.
                </p>
              </div>

              <div style={styles.faqItem}>
                <strong style={styles.faqQuestion}>
                  12. Можно ли использовать Snapshot повторно для того же
                  бизнеса?
                </strong>
                <p style={styles.faqText}>
                  Да, это один из основных сценариев — вы можете отслеживать
                  изменения и проверять гипотезы через повторные прохождения.
                </p>
                <p style={styles.faqText}>
                  В разработке находится экосистема, которая позволит
                  отслеживать прогресс гипотез в реальном времени.
                </p>
                <div style={styles.faqActionsRow}>
                  <FaqActionButton label="Проинвестировать" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .action-tooltip-wrap:hover .action-tooltip,
        .action-tooltip-wrap:focus-within .action-tooltip {
          opacity: 1;
        }

        @keyframes yellowSheen {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @media (max-width: 1180px) {
          main {
            overflow-x: hidden;
          }
        }

        @media (max-width: 1080px) {
          .ambient-gradient-bg {
            display: none;
          }
        }

        @media (max-width: 980px) {
          main {
            padding: 20px 16px 34px;
          }
        }

        @media (max-width: 920px) {
          section[style*="grid-template-columns: 1.2fr 0.8fr"] {
            grid-template-columns: 1fr !important;
          }

          .release-preorder-card {
            grid-template-columns: 1fr !important;
          }

          div[style*="grid-template-columns: repeat(4, minmax(0, 1fr))"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          div[style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="grid-template-columns: 0.85fr 1.45fr 1fr 1fr 1.1fr 0.8fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 720px) {
          .action-tooltip {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .release-preorder-card div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="grid-template-columns: repeat(4, minmax(0, 1fr))"] {
            grid-template-columns: 1fr !important;
          }

          input,
          textarea,
          button,
          a {
            font-size: 16px;
          }
        }
      `}</style>
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
  headerGhostLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    borderRadius: "999px",
    padding: "12px 16px",
    fontWeight: 700,
    fontSize: "14px",
    textDecoration: "none",
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
  toolsSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "22px auto 0",
  },
  toolsSectionHeader: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "18px",
    alignItems: "end",
    marginBottom: "14px",
  },
  toolsKicker: {
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f7d237",
    fontWeight: 800,
    marginBottom: "8px",
  },
  toolsTitle: {
    margin: 0,
    fontSize: "28px",
    lineHeight: 1.08,
    color: "#fff",
  },
  toolsSummary: {
    maxWidth: "420px",
    fontSize: "13px",
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.62)",
    textAlign: "right",
  },
  toolsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px",
  },
  toolCard: {
    position: "relative",
    display: "grid",
    gridTemplateRows: "126px 1fr",
    borderRadius: "26px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
    minHeight: "360px",
  },
  toolCardActive: {
    background: "rgba(255,255,255,0.06)",
  },
  toolCardLocked: {
    background: "rgba(255,255,255,0.03)",
  },
  toolCardVisual: {
    position: "relative",
    overflow: "hidden",
  },
  toolCardVisualImage: {
    objectFit: "cover",
    objectPosition: "center",
    transform: "scale(1.02)",
  },
  toolCardVisualImageActive: {
    filter: "none",
    opacity: 0.96,
  },
  toolCardVisualImageLocked: {
    filter: "grayscale(1)",
    opacity: 0.42,
  },
  toolCardVisualOverlay: {
    position: "absolute",
    inset: 0,
  },
  toolCardVisualOverlayActive: {
    background:
      "linear-gradient(180deg, rgba(8,17,30,0.08) 0%, rgba(8,17,30,0.58) 100%)",
  },
  toolCardVisualOverlayLocked: {
    background:
      "linear-gradient(180deg, rgba(12,18,26,0.4) 0%, rgba(12,18,26,0.82) 100%)",
  },
  toolCardBody: {
    display: "grid",
    gap: "14px",
    padding: "16px",
    alignContent: "start",
  },
  toolCardTop: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "12px",
    alignItems: "start",
  },
  toolVariant: {
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f7d237",
    fontWeight: 800,
    marginBottom: "8px",
  },
  toolTitle: {
    margin: 0,
    fontSize: "22px",
    lineHeight: 1.08,
    color: "#fff",
  },
  toolStatus: {
    borderRadius: "999px",
    padding: "7px 10px",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  toolStatusActive: {
    border: "1px solid rgba(247,210,55,0.16)",
    background: "rgba(247,210,55,0.08)",
    color: "#f7d237",
  },
  toolStatusLocked: {
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.54)",
  },
  toolDescription: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.74)",
  },
  toolMetricBlock: {
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "12px",
  },
  toolMetricLabel: {
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.48)",
    marginBottom: "10px",
  },
  toolMetricValue: {
    fontSize: "28px",
    lineHeight: 1,
    fontWeight: 800,
    color: "#fff",
  },
  toolMetricSub: {
    marginTop: "8px",
    fontSize: "12px",
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.62)",
  },
  toolProgressTrack: {
    marginTop: "12px",
    height: "8px",
    width: "100%",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  toolProgressFill: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, #47b6f6 0%, #7c84ff 55%, #f7d237 100%)",
    transition: "width 0.35s ease",
  },
  toolActions: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "10px",
    alignItems: "center",
    marginTop: "auto",
  },
  toolPlayButton: {
    minWidth: 0,
    width: "100%",
    height: "48px",
    borderRadius: "16px",
    padding: "0 18px",
    fontSize: "15px",
    fontWeight: 800,
  },
  toolLockedActions: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  comingSoonButton: {
    minHeight: "42px",
    borderRadius: "999px",
    padding: "0 14px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.66)",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  plusButton: {
    width: "42px",
    height: "42px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
  toolAccessNote: {
    fontSize: "12px",
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.52)",
    textAlign: "right",
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
  releaseSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1320px",
    margin: "22px auto 0",
  },
  releaseCard: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr auto",
    gap: "22px",
    alignItems: "center",
    borderRadius: "28px",
    padding: "24px 26px",
    background:
      "linear-gradient(135deg, rgba(247,210,55,0.14), rgba(71,182,246,0.08) 48%, rgba(255,255,255,0.06))",
    border: "1px solid rgba(247,210,55,0.22)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
  },
  releaseKicker: {
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f7d237",
    fontWeight: 800,
    marginBottom: "10px",
  },
  releaseTitle: {
    margin: 0,
    fontSize: "28px",
    lineHeight: 1.08,
    color: "#fff",
  },
  releaseText: {
    margin: "10px 0 0",
    maxWidth: "520px",
    fontSize: "15px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.72)",
  },
  releaseMetaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "10px",
  },
  releaseMetaItem: {
    minHeight: "86px",
    borderRadius: "18px",
    padding: "14px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.09)",
  },
  releaseMetaItemActive: {
    border: "1px solid rgba(247,210,55,0.42)",
    background:
      "linear-gradient(180deg, rgba(247,210,55,0.18) 0%, rgba(255,255,255,0.08) 100%)",
    boxShadow: "0 0 0 1px rgba(247,210,55,0.08) inset",
  },
  releaseMetaLabel: {
    fontSize: "12px",
    lineHeight: 1.35,
    color: "rgba(255,255,255,0.58)",
  },
  releaseMetaValue: {
    marginTop: "8px",
    fontSize: "26px",
    lineHeight: 1,
    fontWeight: 800,
    color: "#fff",
  },
  releaseButton: {
    minWidth: "150px",
    minHeight: "48px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    padding: "0 22px",
    background: "#f7d237",
    color: "#0b1d3a",
    fontSize: "15px",
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 14px 28px rgba(247,210,55,0.18)",
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
  colDate: {
    display: "grid",
    gap: "8px",
  },
  resultDateText: {
    fontSize: "18px",
    color: "#f4f7ff",
  },
  resultServiceTag: {
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "999px",
    border: "1px solid rgba(247,210,55,0.16)",
    background: "rgba(247,210,55,0.08)",
    padding: "6px 10px",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f7d237",
  },
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
    maxWidth: "860px",
    maxHeight: "calc(100vh - 48px)",
    overflowY: "auto",
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
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  faqQuestion: {
    display: "block",
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#fefefe",
  },
  faqText: {
    margin: "10px 0 0",
    color: "#d8dce7",
    lineHeight: 1.7,
    fontSize: "15px",
  },
  faqActionsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "14px",
  },
  faqActionWrap: {
    position: "relative",
    display: "inline-flex",
    width: "fit-content",
    maxWidth: "100%",
  },
  faqActionButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "42px",
    borderRadius: "999px",
    padding: "10px 18px",
    border: "1px solid rgba(247,210,55,0.45)",
    background:
      "linear-gradient(110deg, rgba(247,210,55,0.96) 0%, rgba(255,232,122,0.98) 38%, rgba(247,210,55,0.96) 54%, rgba(255,240,166,0.98) 70%, rgba(247,210,55,0.96) 100%)",
    backgroundSize: "220% 220%",
    animation: "yellowSheen 7s ease-in-out infinite",
    color: "#0b1d3a",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "14px",
    letterSpacing: "0.01em",
    boxShadow:
      "0 8px 22px rgba(247,210,55,0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    cursor: "pointer",
  },
  faqSubList: {
    marginTop: "10px",
    display: "grid",
    gap: "6px",
  },
  faqSubBullet: {
    color: "#d8dce7",
    lineHeight: 1.6,
    fontSize: "15px",
  },
};
