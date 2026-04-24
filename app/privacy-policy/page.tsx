import Link from "next/link";

const sections: Array<{
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}> = [
  {
    title: "1. Data Controller",
    paragraphs: [
      "This Privacy Policy describes how personal data and business information are processed by Viktoriia Terekhova, Individual Entrepreneur (Georgia), registration number 306459061, operating under the brand Growth Avenue.",
      "Revenue Snapshot is a digital business diagnostic tool created and operated by Growth Avenue.",
    ],
  },
  {
    title: "2. Scope",
    paragraphs: [
      "This Policy applies to Revenue Snapshot, the user account, payment flows, questionnaire forms, generated reports, customer support communications, and related digital interactions.",
      "By using Revenue Snapshot, the user understands that the service processes both personal contact data and business-related information provided by the user for the purpose of generating a structured business diagnostic result.",
    ],
  },
  {
    title: "3. Data We Collect",
    paragraphs: ["Depending on the service and user actions, we may collect and process:"],
    bullets: [
      "identification and contact data, including name, company name, login, WhatsApp contact, and email address if provided;",
      "payment confirmation data, including payment ID, payment status, amount, currency, service plan, and payment provider references;",
      "questionnaire answers, including business model, revenue, margin, sales, clients, acquisition channels, operational structure, team roles, analytics, strategy, goals, and related business context;",
      "generated Revenue Snapshot results, including diagnosis, economic interpretation, growth limits, recommendations, roadmap, forecasts, and structured analytical blocks;",
      "account usage data, including launch count, access token, account status, result links, timestamps, and access expiration date;",
      "technical data, such as device, browser, page interactions, and analytics data where the user has consented to analytics or advertising cookies.",
    ],
  },
  {
    title: "4. Purpose of Processing",
    paragraphs: ["We process user data to:"],
    bullets: [
      "create and manage the user’s Revenue Snapshot account;",
      "confirm payment and provide access to the purchased service;",
      "collect business answers and generate the Revenue Snapshot result;",
      "structure the user’s business information into analytical blocks;",
      "provide the result inside the user account;",
      "support the user in case of technical or access issues;",
      "improve the quality, logic, structure, prompts, and analytical consistency of Revenue Snapshot;",
      "comply with legal, tax, accounting, and operational obligations.",
    ],
  },
  {
    title: "5. AI-Assisted Processing",
    paragraphs: [
      "Revenue Snapshot uses OpenAI technology as part of the analytical processing flow.",
      "OpenAI helps structure the information provided by the user, break it into business analysis blocks, normalize the answers, and generate a clear diagnostic result based on the Revenue Snapshot logic.",
      "The AI system may process questionnaire answers, business context, financial indicators, operational information, strategic goals, and other information submitted by the user.",
      "OpenAI does not receive independent access to the user’s account, stored results, or Growth Avenue databases. The information is transmitted only as needed to generate or improve the Revenue Snapshot output.",
    ],
  },
  {
    title: "6. Methodology and Internal Logic",
    paragraphs: [
      "Revenue Snapshot is built on the professional experience and analytical frameworks of:",
    ],
    bullets: [
      "Victoria Terekhova, CEO / CMO, Growth Avenue;",
      "Revaz Nozadze, CSO / Business Development, Growth Avenue.",
    ],
  },
  {
    title: "6.1 Internal Logic",
    paragraphs: [
      "The system uses internal business logic, economic and business formulas, structured interpretation rules, and internal databases.",
      "Internal market databases are based on the latest available European market data accessible to Growth Avenue at the time of preparation and system updates. These databases may include market maturity, competition, online penetration, economic context, consumer behavior, and other business-relevant indicators.",
      "Revenue Snapshot is an informational and strategic diagnostic tool. It does not constitute financial, legal, tax, investment, or accounting advice and does not guarantee any specific revenue, profit, or business outcome.",
    ],
  },
  {
    title: "7. Data Storage and Access",
    paragraphs: [
      "User answers and generated results are stored in Growth Avenue’s Make database and are displayed in the user’s personal Revenue Snapshot account.",
      "Answers and generated results are not publicly available, are not sold, and are not shared with third parties for their own independent use.",
      "Access to user answers and results is limited to:",
    ],
    bullets: [
      "the user inside their personal account;",
      "authorized Growth Avenue operators where necessary to provide support, maintain the service, generate the result, fix technical errors, or improve service quality;",
      "technical service providers acting as processors only where necessary to operate the system, including Make, OpenAI, payment providers, hosting providers, analytics tools where consent is given, and communication tools.",
    ],
  },
  {
    title: "7.1 No Independent Third-Party Use",
    paragraphs: [
      "No external party is allowed to publish, resell, or independently use the user’s answers or Revenue Snapshot results.",
    ],
  },
  {
    title: "8. Retention Period",
    paragraphs: [
      "Revenue Snapshot account data, questionnaire answers, payment confirmation data, and generated results are stored during the active account access period.",
      "After the account access period expires, the data may be retained for up to 1 year.",
      "After this period, the data may be deleted, anonymized, or archived where retention is no longer necessary, unless longer storage is required for legal, accounting, tax, dispute resolution, fraud prevention, or legitimate operational reasons.",
      "The user may request deletion earlier by contacting Growth Avenue. Some payment, accounting, or transaction-related records may need to be retained where required by law.",
    ],
  },
  {
    title: "9. Use of Cases to Improve Revenue Snapshot",
    paragraphs: [
      "Growth Avenue may use user cases, questionnaire patterns, business answers, and generated results internally to improve the quality, structure, prompts, logic, and analytical accuracy of Revenue Snapshot.",
      "This internal use may include reviewing anonymized or pseudonymized examples, improving interpretation rules, testing output quality, and refining business diagnostic frameworks.",
      "Growth Avenue will not publish, disclose, advertise, or present an identifiable user case, company name, result, or business information as a public case study without asking for the user’s separate permission.",
      "If Growth Avenue wants to use a specific client case publicly, the user will be contacted separately and asked for explicit consent.",
    ],
  },
  {
    title: "10. Payment Processing",
    paragraphs: [
      "Payments may be processed through PayPal or other payment providers. Growth Avenue does not store full card numbers, CVV codes, or sensitive card credentials.",
      "Payment providers may process payment data according to their own privacy policies and security standards.",
      "Growth Avenue receives only the payment confirmation information necessary to provide access to the purchased service.",
    ],
  },
  {
    title: "11. Cookies and Tracking",
    paragraphs: [
      "Revenue Snapshot may use necessary cookies for basic functionality and account access.",
      "Analytics and advertising technologies, including Google Analytics and Meta Pixel, are activated only after the user gives consent.",
      "The user may refuse non-essential cookies and continue using the website with necessary functionality only.",
    ],
  },
  {
    title: "12. Third-Party Service Providers",
    paragraphs: [
      "To provide Revenue Snapshot, Growth Avenue may use third-party service providers, including:",
    ],
    bullets: [
      "Make for automation, database, and workflow processing;",
      "OpenAI for AI-assisted structuring and generation of analytical outputs;",
      "PayPal or other payment providers for payment processing;",
      "Vercel or other hosting providers for website hosting and deployment;",
      "Google Analytics and Meta Pixel where the user has consented to analytics or advertising cookies;",
      "communication tools such as email, WhatsApp, or Telegram where needed for support or service communication.",
    ],
  },
  {
    title: "12.1 International Processing",
    paragraphs: [
      "Some providers may process data outside the EEA. Where applicable, Growth Avenue relies on appropriate contractual, technical, and organizational safeguards.",
    ],
  },
  {
    title: "13. User Rights",
    paragraphs: [
      "Depending on the user’s location and applicable law, the user may have the right to:",
    ],
    bullets: [
      "request access to their data;",
      "request correction of inaccurate data;",
      "request deletion of data;",
      "request restriction of processing;",
      "object to processing;",
      "request data portability;",
      "withdraw consent where processing is based on consent;",
      "ask questions about how their data is processed.",
    ],
  },
  {
    title: "13.1 Requests",
    paragraphs: [
      "Requests can be sent to Growth Avenue using the contact details below.",
    ],
  },
  {
    title: "14. Confidentiality",
    paragraphs: [
      "Growth Avenue treats user business information, questionnaire answers, and generated Revenue Snapshot results as confidential.",
      "We do not publish, sell, or disclose the user’s answers or results except where necessary to provide the service, comply with legal obligations, protect our rights, prevent fraud, or with the user’s explicit permission.",
    ],
  },
  {
    title: "15. Updates",
    paragraphs: [
      "Growth Avenue may update this Privacy Policy from time to time. The latest version will always be available on this page.",
    ],
  },
  {
    title: "16. Contact",
    paragraphs: [
      "For privacy-related questions, data requests, or deletion requests, contact:",
      "dj.victoria.busdev@gmail.com",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#041027",
        color: "rgba(255,255,255,0.92)",
        padding: "56px 20px",
      }}
    >
      <div style={{ width: "min(960px, 100%)", margin: "0 auto" }}>
        <Link href="/" style={{ color: "#f7d237", textDecoration: "none" }}>
          ← Back to Revenue Snapshot
        </Link>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 0.96,
            letterSpacing: "-0.06em",
            margin: "20px 0 0",
          }}
        >
          Privacy Policy
        </h1>

        <div
          style={{
            marginTop: 24,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.8,
            display: "grid",
            gap: "22px",
          }}
        >
          {sections.map((section) => (
            <section key={section.title} style={{ display: "grid", gap: "10px" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  lineHeight: 1.25,
                  color: "#ffffff",
                }}
              >
                {section.title}
              </h2>

              {section.paragraphs?.map((paragraph) => {
                const isEmail = paragraph === "dj.victoria.busdev@gmail.com";

                return (
                  <p key={paragraph} style={{ margin: 0 }}>
                    {isEmail ? (
                      <a
                        href="mailto:dj.victoria.busdev@gmail.com"
                        style={{ color: "#f7d237" }}
                      >
                        dj.victoria.busdev@gmail.com
                      </a>
                    ) : (
                      paragraph
                    )}
                  </p>
                );
              })}

              {section.bullets ? (
                <ul style={{ margin: 0, paddingLeft: "22px", display: "grid", gap: "8px" }}>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <p style={{ margin: 0 }}>
            Terms of service are available in the{" "}
            <Link href="/terms-of-use" style={{ color: "#f7d237" }}>
              Terms of Use
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
