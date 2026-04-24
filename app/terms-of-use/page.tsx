import Link from "next/link";

const sections: Array<{
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}> = [
  {
    title: "1. Service Provider",
    paragraphs: [
      "These Terms of Use govern the use of Revenue Snapshot and related digital services provided by Viktoriia Terekhova, Individual Entrepreneur (Georgia), registration number 306459061, operating under the brand Growth Avenue.",
    ],
  },
  {
    title: "2. Description of the Service",
    paragraphs: [
      "Revenue Snapshot is a digital business diagnostic tool designed to help users structure and interpret information about their business model, economics, clients, sales, positioning, operations, analytics, and strategy.",
      "The service provides a structured analytical result, including diagnostic observations, possible growth limits, business risks, recommendations, roadmap elements, forecasts, and related business interpretation.",
      "Revenue Snapshot is informational and strategic in nature. It is not a substitute for individual financial, legal, tax, investment, accounting, or operational advice.",
    ],
  },
  {
    title: "3. User Account and Access",
    paragraphs: [
      "After successful payment, the user may receive access to a personal Revenue Snapshot account.",
      "The user is responsible for providing accurate registration information, keeping login credentials secure, and not sharing access with unauthorized third parties.",
      "Access may be limited by time, number of launches, service plan, or other conditions described at the point of purchase.",
      "Growth Avenue may suspend or restrict access if there is evidence of misuse, unauthorized sharing, fraud, payment dispute, technical abuse, or violation of these Terms.",
    ],
  },
  {
    title: "4. User Information and Responsibility",
    paragraphs: [
      "Revenue Snapshot relies on the information provided by the user.",
      "The user confirms that the business information, financial indicators, questionnaire answers, and other submitted data are accurate to the best of their knowledge.",
      "The quality and relevance of the generated result depend on the accuracy, completeness, and clarity of the information provided by the user.",
      "Growth Avenue is not responsible for incorrect, incomplete, outdated, or misleading results caused by inaccurate or incomplete user input.",
    ],
  },
  {
    title: "5. AI-Assisted Processing and Methodology",
    paragraphs: [
      "Revenue Snapshot uses AI-assisted processing, including OpenAI technology, to structure user-provided information, divide it into business analysis blocks, normalize answers, and generate a structured diagnostic result.",
      "The analytical logic of Revenue Snapshot is based on internal business frameworks, economic and business formulas, structured interpretation rules, internal databases, and the professional experience of:",
    ],
    bullets: [
      "Victoria Terekhova, CEO / CMO, Growth Avenue;",
      "Revaz Nozadze, CSO / Business Development, Growth Avenue.",
    ],
  },
  {
    title: "5.1 Internal Databases and Interpretation",
    paragraphs: [
      "Internal market databases are based on the latest available European market data accessible to Growth Avenue at the time of system preparation and updates.",
      "Revenue Snapshot may use business formulas, economic models, market context, and internal rules to interpret user answers. However, the output remains an analytical interpretation, not a guaranteed prediction or binding professional advice.",
    ],
  },
  {
    title: "6. No Guaranteed Business Outcome",
    paragraphs: [
      "Revenue Snapshot does not guarantee revenue growth, profit growth, cost reduction, investment attraction, client acquisition, sales growth, operational improvement, or any specific business result.",
      "Any decisions made by the user based on the Revenue Snapshot result are made at the user’s own discretion and responsibility.",
      "The result should be treated as a diagnostic and strategic support tool, not as a final instruction or mandatory business decision.",
    ],
  },
  {
    title: "7. Payment and Digital Delivery",
    paragraphs: [
      "Payment is required to access paid Revenue Snapshot services.",
      "After successful payment, Growth Avenue may provide access to the user account, questionnaire, result generation flow, or other purchased service elements.",
      "The service is digital and may begin immediately after payment, including account creation, access activation, processing of user information, and generation of analytical results.",
      "Prices, service scope, access duration, number of launches, and included features may vary depending on the selected service plan.",
    ],
  },
  {
    title: "8. Refunds",
    paragraphs: [
      "Because Revenue Snapshot is a digital and customized analytical service, refunds are generally unavailable once access has been activated, questionnaire processing has started, or result generation has begun.",
      "Refunds may be considered in cases of documented technical error, duplicate payment, non-delivery of access caused by Growth Avenue, or where required by applicable law.",
      "Payment provider fees, currency conversion fees, bank fees, and third-party transaction costs may be non-refundable where applicable.",
      "To request a refund review, the user must contact Growth Avenue with payment details and a description of the issue.",
    ],
  },
  {
    title: "9. Use of Results",
    paragraphs: [
      "The user may use their Revenue Snapshot result internally for business analysis, planning, team discussions, and strategic decision-making.",
      "The user may not resell, sublicense, reproduce, publicly distribute, or present Revenue Snapshot materials as their own product, methodology, or commercial framework without written permission from Growth Avenue.",
      "All analytical frameworks, structures, logic, visual materials, prompts, formulas, interpretation models, and product architecture remain the intellectual property of Growth Avenue.",
    ],
  },
  {
    title: "10. Use of Cases for Product Improvement",
    paragraphs: [
      "Growth Avenue may use user cases, questionnaire patterns, answers, and generated results internally to improve Revenue Snapshot, including its prompts, structure, logic, quality control, and analytical consistency.",
      "This may include reviewing anonymized or pseudonymized examples and improving interpretation rules.",
      "Growth Avenue will not publicly publish, advertise, present, or disclose an identifiable user case, company name, result, or business information without asking for the user’s separate permission.",
      "If Growth Avenue wants to use a specific client case publicly, the user will be contacted separately and asked for explicit consent.",
    ],
  },
  {
    title: "11. Confidentiality and Data Protection",
    paragraphs: [
      "Growth Avenue treats user business information, questionnaire answers, and generated Revenue Snapshot results as confidential.",
      "Data processing is described in the Privacy Policy.",
      "The user’s answers and results are stored in Growth Avenue’s Make database and displayed in the user’s personal account. Access is limited to the user, authorized Growth Avenue operators where necessary, and technical service providers acting as processors for the operation of the service.",
    ],
  },
  {
    title: "12. Third-Party Services",
    paragraphs: [
      "Revenue Snapshot may rely on third-party services, including payment providers, Make, OpenAI, hosting providers, analytics tools where consent is given, and communication tools.",
      "Growth Avenue is not responsible for outages, delays, restrictions, or technical failures caused by third-party services, but will take reasonable steps to restore service availability where possible.",
    ],
  },
  {
    title: "13. Acceptable Use",
    paragraphs: [
      "The user agrees not to:",
    ],
    bullets: [
      "attempt to access accounts, results, tokens, or data that do not belong to them;",
      "bypass payment, access limits, launch limits, or technical restrictions;",
      "interfere with the operation of the website, APIs, automations, or payment flow;",
      "copy, reverse engineer, scrape, or reproduce the Revenue Snapshot system, prompts, logic, or methodology;",
      "use the service for illegal, misleading, fraudulent, or harmful purposes.",
    ],
  },
  {
    title: "14. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, Growth Avenue shall not be liable for indirect, incidental, consequential, special, punitive, or loss-of-profit damages.",
      "Growth Avenue’s total liability for any claim related to Revenue Snapshot shall not exceed the amount paid by the user for the specific service giving rise to the claim.",
      "Nothing in these Terms limits liability where such limitation is not permitted by applicable law.",
    ],
  },
  {
    title: "15. Changes to the Service",
    paragraphs: [
      "Growth Avenue may update, improve, modify, suspend, or discontinue parts of Revenue Snapshot, including features, visual interface, prompts, databases, formulas, pricing, access structure, and product logic.",
      "Where changes materially affect paid access, Growth Avenue will take reasonable steps to avoid disrupting already purchased services.",
    ],
  },
  {
    title: "16. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of Georgia.",
      "Where mandatory consumer protection laws apply to the user, such rights remain unaffected.",
    ],
  },
  {
    title: "17. Contact",
    paragraphs: [
      "For questions about these Terms, payment issues, access problems, or refund review requests, contact:",
      "dj.victoria.busdev@gmail.com",
    ],
  },
];

export default function TermsOfUsePage() {
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
          Terms of Use
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
            Personal data is processed in accordance with the{" "}
            <Link href="/privacy-policy" style={{ color: "#f7d237" }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
