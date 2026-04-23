import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#041027", color: "rgba(255,255,255,0.92)", padding: "56px 20px" }}>
      <div style={{ width: "min(900px, 100%)", margin: "0 auto" }}>
        <Link href="/" style={{ color: "#f7d237", textDecoration: "none" }}>← Back to Revenue Snapshot</Link>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.96, letterSpacing: "-0.06em", margin: "20px 0 0" }}>
          Privacy Policy
        </h1>
        <div style={{ marginTop: 18, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
          <p><strong>1. Data Controller.</strong> This Privacy Policy describes how personal data is processed by Viktoriia Terekhova, Individual Entrepreneur (Georgia), registration number 306459061, operating under the brand Growth Avenue.</p>
          <p><strong>2. Scope.</strong> This Policy applies to Revenue Snapshot and related digital interactions, including customer communications, forms, and payment flows.</p>
          <p><strong>3. Data We Collect.</strong> Depending on the service, we may collect contact data, questionnaire responses, payment confirmation data, usage timestamps, and technical data such as IP address, browser type, and device information when analytics tools are enabled.</p>
          <p><strong>4. Legal Basis.</strong> We process personal data on the basis of consent, performance of contract, and legal obligations, where applicable under GDPR.</p>
          <p><strong>5. Purpose.</strong> We process personal data to deliver services, generate reports, support customers, process payments, improve product performance, and comply with legal obligations.</p>
          <p><strong>6. Third Parties and Transfers.</strong> We may use platforms such as Telegram, payment providers, OpenAI, and analytics or advertising tools. Some providers may process data outside the EEA using appropriate contractual or technical safeguards.</p>
          <p><strong>7. Retention.</strong> We retain data only for as long as necessary to provide the service, comply with legal and accounting obligations, or respond to valid deletion requests.</p>
          <p><strong>8. Your Rights.</strong> If you are located in the EU or EEA, you may request access, correction, deletion, restriction, objection, portability, and withdrawal of consent at any time.</p>
          <p><strong>9. Cookies and Tracking.</strong> Analytics and advertising technologies, including Google Analytics and Meta Pixel, are activated only after consent. You can refuse non-essential cookies and continue using the website with necessary functionality only.</p>
          <p><strong>10. Contact.</strong> For privacy-related questions, contact <a href="mailto:vic1995tory@gmail.com" style={{ color: "#f7d237" }}>vic1995tory@gmail.com</a>. Terms of service are available in the <Link href="/terms-of-use" style={{ color: "#f7d237" }}>Terms of Use</Link>.</p>
          <p><strong>11. Updates.</strong> We may update this Privacy Policy from time to time. The latest version will always be available on this page.</p>
        </div>
      </div>
    </main>
  );
}
