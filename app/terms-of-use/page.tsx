import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#041027", color: "rgba(255,255,255,0.92)", padding: "56px 20px" }}>
      <div style={{ width: "min(900px, 100%)", margin: "0 auto" }}>
        <Link href="/" style={{ color: "#f7d237", textDecoration: "none" }}>← Back to Revenue Snapshot</Link>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.96, letterSpacing: "-0.06em", margin: "20px 0 0" }}>
          Terms of Use
        </h1>
        <div style={{ marginTop: 18, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
          <p><strong>1. Service Provider.</strong> These Terms govern services provided by Viktoriia Terekhova, Individual Entrepreneur (Georgia), registration number 306459061, operating under the brand Growth Avenue.</p>
          <p><strong>2. Description of Services.</strong> Growth Avenue provides digital analytical tools including Revenue Snapshot and other strategic marketing and revenue diagnostics services. All services are informational and strategic in nature.</p>
          <p><strong>3. No Guarantees.</strong> The services do not guarantee revenue growth, do not constitute financial, legal, or tax advice, and do not promise any specific business result.</p>
          <p><strong>4. User Responsibilities.</strong> By using the services, the user confirms that the information provided is accurate and that implementation decisions remain their own responsibility.</p>
          <p><strong>5. Payment and Refunds.</strong> Services are provided after successful payment. Because the service is digital and customized, refunds are generally unavailable once delivery has started, except in documented technical error cases.</p>
          <p><strong>6. Intellectual Property.</strong> All analytical frameworks, models, structures, and content remain the intellectual property of Growth Avenue and may only be used internally by the client.</p>
          <p><strong>7. Limitation of Liability.</strong> The Provider&apos;s total liability shall not exceed the amount paid for the specific service. The Provider shall not be liable for indirect or consequential damages.</p>
          <p><strong>8. Data Protection.</strong> Personal data is processed in accordance with the <Link href="/privacy-policy" style={{ color: "#f7d237" }}>Privacy Policy</Link>.</p>
          <p><strong>9. Governing Law.</strong> These Terms are governed by the laws of Georgia. Mandatory EU consumer protections may apply where required.</p>
          <p><strong>10. Updates.</strong> We may update these Terms from time to time. The latest version will always be published on this page.</p>
        </div>
      </div>
    </main>
  );
}
