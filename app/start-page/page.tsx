"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ResolveResponse = {
  ok: boolean;
  access_token?: string;
  launch_count?: number;
  launch_limit?: number;
  created?: boolean | null;
  page_id?: string | null;
  payment_id?: string;
  payment_status?: string;
  error?: string;
};

type StartActionResponse = {
  ok: boolean;
  error?: string;
};

function StartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [resolving, setResolving] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resolved, setResolved] = useState<ResolveResponse | null>(null);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const tx = useMemo(() => searchParams.get("tx") || "", [searchParams]);
  const st = useMemo(() => searchParams.get("st") || "", [searchParams]);
  const amt = useMemo(() => searchParams.get("amt") || "", [searchParams]);
  const cc = useMemo(() => searchParams.get("cc") || "", [searchParams]);

  useEffect(() => {
    let cancelled = false;

    async function resolveSession() {
      try {
        setResolving(true);
        setError("");

        if (!tx) {
          throw new Error("Payment ID was not found in the link.");
        }

        if (String(st).toUpperCase() !== "COMPLETED") {
          throw new Error("Payment is not marked as completed.");
        }

        const res = await fetch("/api/paypal/resolve-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx,
            st,
            amt,
            cc,
          }),
        });

        const data: ResolveResponse = await res.json();

        if (cancelled) return;

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Failed to resolve payment session.");
        }

        if (!data.access_token) {
          throw new Error("Access token was not returned.");
        }

        setResolved(data);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
      } finally {
        if (!cancelled) {
          setResolving(false);
        }
      }
    }

    resolveSession();

    return () => {
      cancelled = true;
    };
  }, [tx, st, amt, cc]);

  async function handleStart() {
    try {
      setSubmitting(true);
      setError("");

      if (!resolved?.access_token) {
        throw new Error("Access token is missing.");
      }

      if (!fullName.trim()) {
        throw new Error("Please enter your name.");
      }

      if (!companyName.trim()) {
        throw new Error("Please enter your company name.");
      }

      if (!whatsapp.trim()) {
        throw new Error("Please enter your WhatsApp.");
      }

      const res = await fetch("/api/paypal/start-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: tx,
          access_token: resolved.access_token,
          full_name: fullName.trim(),
          company_name: companyName.trim(),
          whatsapp: whatsapp.trim(),
        }),
      });

      const data: StartActionResponse = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to save your details.");
      }

      router.push(`/start/${resolved.access_token}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>Revenue Snapshot</div>

        <h1 style={styles.title}>
          {resolving ? "Preparing your access..." : "Complete your access"}
        </h1>

        <p style={styles.text}>
          {resolving
            ? "We are checking your payment and preparing your personal access."
            : "Your payment is confirmed. Please fill in your details to continue to your personal page."}
        </p>

        <div style={styles.infoBox}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Payment ID</span>
            <span style={styles.infoValue}>{tx || "—"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Status</span>
            <span style={styles.infoValue}>{st || "—"}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Amount</span>
            <span style={styles.infoValue}>
              {amt ? `${amt} ${cc || ""}`.trim() : "—"}
            </span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Launches</span>
            <span style={styles.infoValue}>
              {resolved?.launch_count ?? 0} / {resolved?.launch_limit ?? 3}
            </span>
          </div>
        </div>

        {resolving && (
          <div style={styles.loaderWrap}>
            <div style={styles.loader} />
          </div>
        )}

        {!resolving && !error && (
          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Name and surname</label>
              <input
                style={styles.input}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Company name</label>
              <input
                style={styles.input}
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>WhatsApp</label>
              <input
                style={styles.input}
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+995..."
              />
            </div>

            <button
              type="button"
              onClick={handleStart}
              disabled={submitting}
              style={{
                ...styles.button,
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? "wait" : "pointer",
              }}
            >
              {submitting ? "Saving..." : "Start"}
            </button>
          </div>
        )}

        {!resolving && error && (
          <>
            <div style={styles.errorBox}>
              <strong style={styles.errorTitle}>Access issue</strong>
              <p style={styles.errorText}>{error}</p>
              <div style={styles.manualBox}>{tx || "No payment ID found"}</div>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              style={styles.button}
            >
              Try again
            </button>
          </>
        )}

        {!resolving && resolved?.access_token && !error && (
          <p style={styles.smallText}>
            Access prepared. Your personal page will open after you press Start.
          </p>
        )}
      </div>
    </main>
  );
}

function StartPageFallback() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>Revenue Snapshot</div>
        <h1 style={styles.title}>Preparing your access...</h1>
        <p style={styles.text}>
          We are checking your payment and preparing your personal access.
        </p>
      </div>
    </main>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<StartPageFallback />}>
      <StartPageContent />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background:
      "radial-gradient(circle at top, rgba(247,210,55,0.14), transparent 30%), #0b1d3a",
    color: "#fefefe",
  },
  card: {
    width: "100%",
    maxWidth: "640px",
    borderRadius: "28px",
    padding: "28px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.28)",
    backdropFilter: "blur(18px)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#f7d237",
    marginBottom: "14px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    lineHeight: 1.1,
    fontWeight: 700,
  },
  text: {
    marginTop: "14px",
    marginBottom: "22px",
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#d8dce7",
  },
  infoBox: {
    display: "grid",
    gap: "10px",
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },
  infoLabel: {
    fontSize: "13px",
    color: "#a5aeb2",
  },
  infoValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#ffffff",
    textAlign: "right",
    wordBreak: "break-all",
  },
  loaderWrap: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    width: "38px",
    height: "38px",
    borderRadius: "999px",
    border: "3px solid rgba(255,255,255,0.18)",
    borderTopColor: "#f7d237",
  },
  form: {
    marginTop: "22px",
    display: "grid",
    gap: "14px",
  },
  field: {
    display: "grid",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    color: "#e0e1e3",
  },
  input: {
    width: "100%",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "14px 16px",
    fontSize: "14px",
    outline: "none",
  },
  errorBox: {
    marginTop: "22px",
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255, 87, 87, 0.08)",
    border: "1px solid rgba(255, 87, 87, 0.22)",
  },
  errorTitle: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#fff",
  },
  errorText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.5,
    color: "#e8caca",
  },
  manualBox: {
    marginTop: "12px",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.18)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
    wordBreak: "break-all",
  },
  button: {
    marginTop: "8px",
    width: "100%",
    border: 0,
    borderRadius: "16px",
    padding: "14px 18px",
    fontSize: "14px",
    fontWeight: 700,
    background: "#f7d237",
    color: "#0b1d3a",
  },
  smallText: {
    marginTop: "14px",
    fontSize: "12px",
    color: "#a5aeb2",
  },
};
