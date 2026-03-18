export default function TermsOfUsePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#041027", color: "rgba(255,255,255,0.92)", padding: "56px 20px" }}>
      <div style={{ width: "min(900px, 100%)", margin: "0 auto" }}>
        <a href="/" style={{ color: "#f7d237", textDecoration: "none" }}>← Back to Revenue Snapshot</a>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.96, letterSpacing: "-0.06em", margin: "20px 0 0" }}>
          Terms of Use
        </h1>
        <p style={{ marginTop: 18, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
          Placeholder page. Здесь позже можно разместить полные условия использования сервиса, правила оплаты, доступ к результатам,
          ограничения ответственности и порядок возвратов.
        </p>
      </div>
    </main>
  );
}
