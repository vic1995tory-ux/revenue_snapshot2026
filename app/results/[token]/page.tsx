import { ResultsPage } from "@/components/results/ResultsPage";
import { OnRecResultsPage } from "@/components/onrec-results/OnRecResultsPage";
import { onRecResultsMockData } from "@/lib/onrec-results/mock-data";
import { resultsMockData } from "@/lib/results/mock-data";
import {
  fetchResultPayloadForToken,
  isOnRecPageData,
  isResultsPageData,
} from "@/lib/results/make-results";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const demoResultTokens = new Set(["mock-token", "demo-result-1", "demo-result-2"]);
  const normalizedToken = token.trim().toLowerCase();

  if (demoResultTokens.has(token)) {
    return <ResultsPage data={resultsMockData} profileHref="/account/demo" />;
  }

  if (normalizedToken === "on_rec_demo" || normalizedToken === "on_rec_demo_result") {
    return (
      <OnRecResultsPage
        data={onRecResultsMockData}
        profileHref="/account/demo"
      />
    );
  }

  let payload: unknown = null;

  try {
    const resultResponse = await fetchResultPayloadForToken(token);
    payload = resultResponse.payload;
  } catch {
    payload = null;
  }

  if (isOnRecPageData(payload)) {
    return (
      <OnRecResultsPage
        data={payload}
        profileHref={`/account/${token}`}
      />
    );
  }

  if (isResultsPageData(payload)) {
    return <ResultsPage data={payload} profileHref={`/account/${token}`} />;
  }

  if (
    normalizedToken === "on_rec" ||
    normalizedToken.startsWith("on_rec_") ||
    normalizedToken.startsWith("on_rec-")
  ) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#07152d",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <section style={{ maxWidth: "560px" }}>
          <p style={{ color: "#f7d237", marginBottom: "12px" }}>
            Revenue Snapshot
          </p>
          <h1 style={{ fontSize: "32px", marginBottom: "14px" }}>
            Результат пока не найден
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
            Мы больше не показываем тестовый отчёт для любого токена. Когда
            backend начнёт отдавать реальные результаты, эта страница сможет
            рендерить персональный snapshot.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07152d",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <section style={{ maxWidth: "560px" }}>
        <p style={{ color: "#f7d237", marginBottom: "12px" }}>
          Revenue Snapshot
        </p>
        <h1 style={{ fontSize: "32px", marginBottom: "14px" }}>
          Результат пока не найден
        </h1>
        <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
          Make пока не вернул готовый payload результата для этого токена.
        </p>
      </section>
    </main>
  );
}
