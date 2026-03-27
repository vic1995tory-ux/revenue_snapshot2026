"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Nullable<T> = T | null;

type AccountUser = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  whatsapp?: string;
  email?: string;
};

type AccountResult = {
  id?: string;
  title?: string;
  createdAt?: string;
  status?: string;
  summary?: string;
  resultUrl?: string;
  lever?: string;
  risk?: string;
};

type AccountSessionResponse = {
  ok?: boolean;
  user?: AccountUser;
  companySummary?: string;
  launchCount?: number;
  launchLimit?: number;
  results?: AccountResult[];
  error?: string;
};

type DraftCheckResponse = {
  ok?: boolean;
  hasDraft?: boolean;
  draftStep?: number;
  draftUpdatedAt?: string;
  launchAttemptId?: string;
  error?: string;
};

const MAKE_WEBHOOK_URL =
  "https://hook.us2.make.com/z5en2sa55efywylbva4w5sc57mawkrpb";

const FALLBACK_MAX_LAUNCHES = 3;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(value?: string) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getSafeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function getLaunchAttemptStorageKey(token: string) {
  return `rs_launch_attempt_${token}`;
}

function makeAttemptId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `attempt_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function readStoredAttemptId(token: string) {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(getLaunchAttemptStorageKey(token)) ?? "";
}

function storeAttemptId(token: string, attemptId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getLaunchAttemptStorageKey(token), attemptId);
}

function clearStoredAttemptId(token: string) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(getLaunchAttemptStorageKey(token));
}

async function postToMake<T>(payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Make webhook error: ${response.status}`);
  }

  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

function AmbientBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#07152c]" />
        <div className="absolute left-[-12%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#274d9f]/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#f7d237]/10 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[24%] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 0.55px, transparent 0.6px)",
            backgroundSize: "14px 14px",
          }}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.36))]" />
    </>
  );
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[30px] border border-white/10 bg-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 md:p-5">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 text-2xl font-semibold",
          accent ? "text-[#fff3b2]" : "text-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function LoaderBlock({ label = "Загружаем кабинет..." }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <GlassCard className="w-full max-w-md p-8 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#f7d237]" />
        <div className="mt-5 text-lg font-medium text-white">{label}</div>
        <div className="mt-2 text-sm text-white/55">
          Проверяем доступ, лимит запусков и текущий черновик.
        </div>
      </GlassCard>
    </div>
  );
}

function EmptyResults() {
  return (
    <GlassCard className="p-6 md:p-7">
      <div className="text-lg font-semibold text-white">Результатов пока нет</div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a5aeb2]">
        Первый завершённый Snapshot появится здесь после генерации результата.
        Черновики не списывают попытку и не считаются готовым запуском.
      </p>
    </GlassCard>
  );
}

function ResultCard({ item }: { item: AccountResult }) {
  return (
    <GlassCard className="p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
            {item.status || "result_ready"}
          </div>
          <div className="mt-2 text-xl font-semibold text-white">
            {item.title || "Revenue Snapshot Result"}
          </div>
          <div className="mt-2 text-sm text-white/45">
            {formatDate(item.createdAt)}
          </div>

          {item.summary ? (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[#a5aeb2]">
              {item.summary}
            </p>
          ) : null}

          {(item.lever || item.risk) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.lever ? (
                <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1.5 text-xs text-[#fff3b2]">
                  Lever: {item.lever}
                </span>
              ) : null}
              {item.risk ? (
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-100">
                  Risk: {item.risk}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-3">
          {item.resultUrl ? (
            <a
              href={item.resultUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
            >
              Открыть результат
            </a>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
}

function DraftModal({
  open,
  draftStep,
  draftUpdatedAt,
  loading,
  onClose,
  onContinue,
  onRestart,
}: {
  open: boolean;
  draftStep?: number;
  draftUpdatedAt?: string;
  loading?: boolean;
  onClose: () => void;
  onContinue: () => void;
  onRestart: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020816]/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#0b1d3a]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-7">
        <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
          Draft detected
        </div>

        <h3 className="text-2xl font-semibold text-white md:text-3xl">
          Есть незавершённый запуск
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#a5aeb2]">
          Мы нашли сохранённый черновик анкеты. Можно продолжить с того места,
          где пользователь остановился, или очистить его и начать новый запуск.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              Последний шаг
            </div>
            <div className="mt-2 text-xl font-semibold text-white">
              {typeof draftStep === "number" ? draftStep : "—"}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              Обновлён
            </div>
            <div className="mt-2 text-base font-medium text-white">
              {formatDate(draftUpdatedAt)}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onContinue}
            disabled={loading}
            className="rounded-2xl bg-[#f7d237] px-5 py-3.5 text-sm font-medium text-[#0b1d3a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Загрузка..." : "Восстановить"}
          </button>

          <button
            type="button"
            onClick={onRestart}
            disabled={loading}
            className="rounded-2xl border border-white/12 bg-white/[0.05] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Подготовка..." : "Начать сначала"}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="mt-3 w-full rounded-2xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/[0.04] hover:text-white"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();

  const tokenParam = params?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam || "";

  const [session, setSession] = useState<AccountSessionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunchLoading, setIsLaunchLoading] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasDraft, setHasDraft] = useState(false);
  const [draftStep, setDraftStep] = useState<number | undefined>(undefined);
  const [draftUpdatedAt, setDraftUpdatedAt] = useState<string | undefined>(
    undefined,
  );
  const [draftLaunchAttemptId, setDraftLaunchAttemptId] = useState("");
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  const user = session?.user || {};
  const results = useMemo(() => getSafeArray(session?.results), [session?.results]);
  const launchLimit = session?.launchLimit ?? FALLBACK_MAX_LAUNCHES;
  const launchesUsed = session?.launchCount ?? 0;
  const launchesLeft = Math.max(launchLimit - launchesUsed, 0);
  const reachedLimit = launchesLeft <= 0;

  const displayName = useMemo(() => {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
    return fullName || user.companyName || "Account";
  }, [user.firstName, user.lastName, user.companyName]);

  const fetchAccountSession = useCallback(async () => {
    if (!token) return null;

    const data = await postToMake<AccountSessionResponse>({
      action: "account_session",
      access_token: token,
    });

    if (data?.ok === false) {
      throw new Error(data.error || "Не удалось загрузить кабинет");
    }

    return data;
  }, [token]);

  const fetchDraftState = useCallback(async () => {
    if (!token) return null;

    const data = await postToMake<DraftCheckResponse>({
      action: "check_draft",
      access_token: token,
    });

    if (data?.ok === false) {
      throw new Error(data.error || "Не удалось проверить черновик");
    }

    return data;
  }, [token]);

  const syncPage = useCallback(async () => {
    if (!token) {
      setError("Токен пользователя не найден в URL.");
      setIsLoading(false);
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const [sessionData, draftData] = await Promise.all([
        fetchAccountSession(),
        fetchDraftState(),
      ]);

      if (sessionData) {
        setSession(sessionData);
      }

      setHasDraft(Boolean(draftData?.hasDraft));
      setDraftStep(draftData?.draftStep);
      setDraftUpdatedAt(draftData?.draftUpdatedAt);
      setDraftLaunchAttemptId(draftData?.launchAttemptId || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки кабинета");
    } finally {
      setIsLoading(false);
    }
  }, [fetchAccountSession, fetchDraftState, token]);

  useEffect(() => {
    void syncPage();
  }, [syncPage]);

  const createOrReuseAttemptId = useCallback(
    (preferred?: string) => {
      const nextAttemptId =
        preferred || readStoredAttemptId(token) || makeAttemptId();

      storeAttemptId(token, nextAttemptId);
      return nextAttemptId;
    },
    [token],
  );

  const sendLaunchStarted = useCallback(
    async (attemptId: string) => {
      const payload = {
        action: "launch_started",
        access_token: token,
        launch_attempt_id: attemptId,
        started_at: new Date().toISOString(),
        launch_count_before: launchesUsed,
        launch_limit: launchLimit,
        cabinet_url:
          typeof window !== "undefined" ? window.location.href : "",
        snapshot_url:
          typeof window !== "undefined"
            ? `${window.location.origin}/snapshot-action/${encodeURIComponent(token)}`
            : "",
      };

      const data = await postToMake<{ ok?: boolean; error?: string }>(payload);

      if (data?.ok === false) {
        throw new Error(data.error || "Не удалось зафиксировать старт запуска");
      }
    },
    [launchLimit, launchesUsed, token],
  );

  const goToSnapshot = useCallback(
    (attemptId: string, mode?: "restore" | "fresh") => {
      const params = new URLSearchParams();

      if (attemptId) {
        params.set("launch", attemptId);
      }

      if (mode) {
        params.set("mode", mode);
      }

      const queryString = params.toString();
      router.push(
        `/snapshot-action/${encodeURIComponent(token)}${
          queryString ? `?${queryString}` : ""
        }`,
      );
    },
    [router, token],
  );

  const handlePlay = useCallback(async () => {
    if (reachedLimit || !token) return;

    try {
      setError("");
      setIsDraftLoading(true);

      const draftData = await fetchDraftState();

      const nextHasDraft = Boolean(draftData?.hasDraft);
      setHasDraft(nextHasDraft);
      setDraftStep(draftData?.draftStep);
      setDraftUpdatedAt(draftData?.draftUpdatedAt);
      setDraftLaunchAttemptId(draftData?.launchAttemptId || "");

      if (nextHasDraft) {
        setIsDraftModalOpen(true);
        return;
      }

      setIsLaunchLoading(true);
      const attemptId = createOrReuseAttemptId();
      await sendLaunchStarted(attemptId);
      goToSnapshot(attemptId, "fresh");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось начать запуск");
    } finally {
      setIsDraftLoading(false);
      setIsLaunchLoading(false);
    }
  }, [
    createOrReuseAttemptId,
    fetchDraftState,
    goToSnapshot,
    reachedLimit,
    sendLaunchStarted,
    token,
  ]);

  const handleRestoreDraft = useCallback(async () => {
    if (!token) return;

    try {
      setError("");
      setIsDraftLoading(true);

      const attemptId = createOrReuseAttemptId(draftLaunchAttemptId);
      await sendLaunchStarted(attemptId);
      setIsDraftModalOpen(false);
      goToSnapshot(attemptId, "restore");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось восстановить черновик",
      );
    } finally {
      setIsDraftLoading(false);
    }
  }, [
    createOrReuseAttemptId,
    draftLaunchAttemptId,
    goToSnapshot,
    sendLaunchStarted,
    token,
  ]);

  const handleRestartDraft = useCallback(async () => {
    if (!token) return;

    try {
      setError("");
      setIsDraftLoading(true);

      const data = await postToMake<{ ok?: boolean; error?: string }>({
        action: "clear_draft",
        access_token: token,
      });

      if (data?.ok === false) {
        throw new Error(data.error || "Не удалось очистить черновик");
      }

      clearStoredAttemptId(token);
      const freshAttemptId = createOrReuseAttemptId();
      await sendLaunchStarted(freshAttemptId);

      setHasDraft(false);
      setDraftStep(undefined);
      setDraftUpdatedAt(undefined);
      setDraftLaunchAttemptId("");
      setIsDraftModalOpen(false);

      goToSnapshot(freshAttemptId, "fresh");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось начать новый запуск",
      );
    } finally {
      setIsDraftLoading(false);
    }
  }, [createOrReuseAttemptId, goToSnapshot, sendLaunchStarted, token]);

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#07152c] text-white">
        <AmbientBackground />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-6 md:px-8 lg:px-10">
          <LoaderBlock />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07152c] text-white">
      <AmbientBackground />

      <DraftModal
        open={isDraftModalOpen}
        draftStep={draftStep}
        draftUpdatedAt={draftUpdatedAt}
        loading={isDraftLoading}
        onClose={() => setIsDraftModalOpen(false)}
        onContinue={handleRestoreDraft}
        onRestart={handleRestartDraft}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <GlassCard className="mb-8 overflow-hidden p-5 md:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                <span className="text-[#f7d237]">●</span>
                Revenue Snapshot — Account
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#fefefe] md:text-5xl">
                Личный кабинет Snapshot
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a5aeb2] md:text-base">
                Здесь отображаются доступные попытки, сохранённые результаты и
                состояние незавершённого запуска.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">
                  User: {displayName}
                </span>
                {user.companyName ? (
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">
                    Company: {user.companyName}
                  </span>
                ) : null}
                {hasDraft ? (
                  <span className="rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 px-3 py-1.5 text-xs text-[#fff3b2]">
                    Есть незавершённый draft
                  </span>
                ) : null}
              </div>

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              ) : null}
            </div>

            <GlassCard className="p-5 md:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <StatCard
                  label="Использовано запусков"
                  value={`${launchesUsed}/${launchLimit}`}
                />
                <StatCard
                  label="Осталось"
                  value={String(launchesLeft)}
                  accent
                />
                <StatCard
                  label="Результатов"
                  value={String(results.length)}
                />
                <StatCard
                  label="Draft status"
                  value={hasDraft ? "active" : "empty"}
                />
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={handlePlay}
                  disabled={reachedLimit || isLaunchLoading || isDraftLoading}
                  className={cn(
                    "w-full rounded-[22px] px-5 py-4 text-sm font-medium transition",
                    reachedLimit
                      ? "cursor-not-allowed bg-white/10 text-white/35"
                      : "bg-[#f7d237] text-[#0b1d3a] hover:brightness-105 hover:shadow-[0_0_28px_rgba(247,210,55,0.18)]",
                  )}
                >
                  {isLaunchLoading || isDraftLoading
                    ? "Подготовка запуска..."
                    : reachedLimit
                    ? "Лимит запусков исчерпан"
                    : hasDraft
                    ? "Play / продолжить или начать заново"
                    : "Play"}
                </button>

                {hasDraft ? (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#a5aeb2]">
                    Найден незавершённый запуск. При нажатии откроется выбор:
                    восстановить черновик или очистить его и начать заново.
                  </div>
                ) : null}
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="p-5 md:p-7">
            <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
              Profile
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm text-white/45">Имя</div>
                <div className="mt-2 text-lg font-medium text-white">
                  {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm text-white/45">Компания</div>
                <div className="mt-2 text-lg font-medium text-white">
                  {user.companyName || "—"}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm text-white/45">WhatsApp</div>
                <div className="mt-2 text-lg font-medium text-white">
                  {user.whatsapp || "—"}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm text-white/45">Email</div>
                <div className="mt-2 text-lg font-medium text-white">
                  {user.email || "—"}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 md:p-5">
              <div className="text-sm text-white/45">Company summary</div>
              <p className="mt-3 text-sm leading-7 text-[#a5aeb2]">
                {session?.companySummary ||
                  "После первого завершённого Snapshot здесь можно показывать короткую выжимку по бизнесу и текущей динамике."}
              </p>
            </div>
          </GlassCard>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                  Results history
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  История результатов
                </div>
              </div>

              <button
                type="button"
                onClick={() => void syncPage()}
                className="rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white transition hover:bg-white/[0.08]"
              >
                Обновить
              </button>
            </div>

            {results.length ? (
              <div className="space-y-4">
                {results.map((item, index) => (
                  <ResultCard
                    key={item.id || `${item.createdAt || "result"}-${index}`}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <EmptyResults />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
