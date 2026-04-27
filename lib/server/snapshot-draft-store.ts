type SnapshotDraftRecord = {
  accessToken: string;
  launchAttemptId: string;
  mode: string;
  answers: Record<string, unknown>;
  preparedAnswers: Array<{ question: string; answer: string }>;
  progress: {
    total: number;
    totalQuestions: number;
    sectionProgress: Record<string, number>;
  };
  draftStep: number;
  updatedAt: string;
};

const DRAFT_TTL_MS = 1000 * 60 * 60 * 12;

type DraftStoreMap = Map<string, SnapshotDraftRecord>;

function getStore(): DraftStoreMap {
  const globalScope = globalThis as typeof globalThis & {
    __rsSnapshotDraftStore?: DraftStoreMap;
  };

  if (!globalScope.__rsSnapshotDraftStore) {
    globalScope.__rsSnapshotDraftStore = new Map();
  }

  return globalScope.__rsSnapshotDraftStore;
}

function buildKey(sessionId: string, accessToken: string, launchAttemptId: string) {
  return `${sessionId}::${accessToken}::${launchAttemptId}`;
}

function isExpired(record: SnapshotDraftRecord) {
  const updatedAt = new Date(record.updatedAt).getTime();
  if (Number.isNaN(updatedAt)) return true;
  return Date.now() - updatedAt > DRAFT_TTL_MS;
}

function cleanupExpiredEntries(store: DraftStoreMap) {
  for (const [key, record] of store.entries()) {
    if (isExpired(record)) {
      store.delete(key);
    }
  }
}

export function getSnapshotDraft(
  sessionId: string,
  accessToken: string,
  launchAttemptId: string,
) {
  const store = getStore();
  cleanupExpiredEntries(store);

  const key = buildKey(sessionId, accessToken, launchAttemptId);
  const record = store.get(key);

  if (!record) return null;
  if (isExpired(record)) {
    store.delete(key);
    return null;
  }

  return record;
}

export function setSnapshotDraft(sessionId: string, record: SnapshotDraftRecord) {
  const store = getStore();
  cleanupExpiredEntries(store);

  const key = buildKey(sessionId, record.accessToken, record.launchAttemptId);
  store.set(key, record);

  return record;
}

export function clearSnapshotDraft(
  sessionId: string,
  accessToken: string,
  launchAttemptId: string,
) {
  const store = getStore();
  const key = buildKey(sessionId, accessToken, launchAttemptId);
  store.delete(key);
}

export type { SnapshotDraftRecord };
