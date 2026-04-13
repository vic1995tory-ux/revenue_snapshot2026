"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Tone = "yellow" | "green" | "gray";

type HeroTag = {
  id: string;
  label: string;
  tone?: Tone;
};

type HeroMetric = {
  id: string;
  label: string;
  value: string;
  note?: string;
};

type InterpretationBlock = {
  id: string;
  title: string;
  signal: string;
  interpretation: string;
  dependencies: string;
  risk: string;
  unknown: string;
  conclusion: string;
  extra?: Record<string, string | number | null>;
};

type LeverRole =
  | "primary"
  | "amplifies"
  | "unlocks"
  | "stabilizes"
  | "rejected_now";

type LeverCard = {
  id: string;
  name: string;
  role: LeverRole;
  zone: string;
  text: string;
};

type RoadmapPhase = {
  phase: string;
  objective: string;
  why_this_phase_now: string;
  key_actions: string[];
  expected_intermediate_result: string;
  dependencies: string[];
  owner_logic: string;
  control_points: string[];
  risk_if_not_done: string;
};

type ControlMetric = {
  name: string;
  why_it_matters: string;
  current_if_known: string;
  target_if_inferable: string;
  direction: "up" | "down" | "stable";
  review_frequency: string;
};

type AlertRule = {
  label: string;
  trigger_logic: string;
  interpretation: string;
  required_action: string;
};

type ScenarioCard = {
  name: string;
  logic: string;
  expected_effect: string;
};

type PagePayload = {
  company: {
    name: string;
    niche: string;
    stage: string;
    geography: string;
  };
  hero: {
    eyebrow: string[];
    headline: string;
    summary: string;
    tags: HeroTag[];
    metrics: HeroMetric[];
    growth_limit: {
      title: string;
      bottleneck: string;
      explanation: string;
    };
    primary_lever: {
      title: string;
      description: string;
      zone: string;
    };
    market_adjustment: {
      title: string;
      text: string;
    };
  };
  interpretation: {
    title: string;
    intro: string;
    blocks: InterpretationBlock[];
  };
  solution: {
    strategic_scenario: {
      type: string;
      why_this_scenario: string;
      market_limits: string;
      not_now: string[];
    };
    primary_growth_lever: {
      name: string;
      essence: string;
      zone: string;
      why_this_lever: string;
      model_change_recommendation: string;
    };
    lever_system: LeverCard[];
    lever_mechanics: {
      lever: string;
      affected_metric: string;
      economic_shift: string;
      business_result: string;
    }[];
    implementation_logic: {
      what_must_change: string;
      application_points: string[];
      what_system_must_appear: string[];
      implementation_conditions: string[];
      core_dependencies: string[];
      main_risks: string[];
      fail_conditions: string[];
    };
    strategic_priorities: {
      priority_1: string;
      priority_2: string;
      priority_3: string;
      forbidden_now: string[];
    };
    expected_business_shift: {
      what_decreases: string[];
      what_grows: string[];
      key_metric_of_success: string;
      near_term_effect: string;
      medium_term_effect: string;
    };
  };
  roadmap: {
    title: string;
    intro: string;
    phases: RoadmapPhase[];
    control_metrics: ControlMetric[];
    alert_rules: AlertRule[];
    decision_signals: string[];
    operating_scenarios: ScenarioCard[];
    uncertainty_layer: {
      confirmed: string[];
      hypotheses: string[];
      requires_research: string[];
    };
  };
};

function toneClass(tone?: Tone) {
  if (tone === "yellow")
    return "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#f7d237]";
  if (tone === "green")
    return "border-[#18d4a4]/30 bg-[#18d4a4]/10 text-[#7ef0d2]";
  return "border-white/12 bg-white/5 text-[#c3cae1]";
}

function roleClass(role: LeverRole) {
  if (role === "primary") return "border-[#f7d237]/30 bg-[#f7d237]/10";
  if (role === "rejected_now") return "border-[#7c89b9]/18 bg-white/4";
  return "border-white/10 bg-white/4";
}

function roleLabel(role: LeverRole) {
  if (role === "primary") return "primary";
  if (role === "amplifies") return "amplifies";
  if (role === "unlocks") return "unlocks";
  if (role === "stabilizes") return "stabilizes";
  return "rejected now";
}

function SectionTitle({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-8 max-w-4xl">
      <div className="mb-3 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
        {kicker}
      </div>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-base leading-7 text-[#b9c3df] md:text-lg">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function MetricCard({ item }: { item: HeroMetric }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.52),rgba(4,17,45,0.82))] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#97a5ca]">
        {item.label}
      </div>
      <div className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">
        {item.value}
      </div>
      {item.note ? (
        <div className="mt-3 text-lg text-[#ccd3e9]">{item.note}</div>
      ) : null}
    </div>
  );
}

function SideCard({
  label,
  title,
  text,
  extra,
}: {
  label: string;
  title: string;
  text: string;
  extra?: string;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.52),rgba(4,17,45,0.84))] p-7 shadow-[0_18px_70px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
        {label}
      </div>
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-[38px] md:leading-[1.03]">
        {title}
      </h3>
      <p className="mt-5 text-lg leading-8 text-[#c9d2eb]">{text}</p>
      {extra ? (
        <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.28em] text-[#d1d9ee]">
          {extra}
        </div>
      ) : null}
    </div>
  );
}

function InterpretationTile({
  block,
  onOpen,
}: {
  block: InterpretationBlock;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(block.id)}
      className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.4),rgba(4,17,45,0.82))] p-6 text-left transition duration-500 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#97a5ca]">
        Block
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">
        {block.title}
      </div>
      <p className="mt-5 line-clamp-4 text-base leading-7 text-[#ccd3e9]">
        {block.conclusion}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#ecf0fb] transition group-hover:translate-x-1">
        Открыть разбор <span aria-hidden>→</span>
      </div>
    </button>
  );
}

function OverlayPanel({
  block,
  onClose,
}: {
  block: InterpretationBlock | null;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#04112d]/55 backdrop-blur-sm transition-opacity duration-300 ${
          block
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-full max-w-[34vw] min-w-[320px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(10,28,66,0.98),rgba(4,14,37,0.98))] shadow-[0_24px_100px_rgba(0,0,0,0.45)] transition-transform duration-500 ${
          block ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {block ? (
          <div className="flex h-full flex-col overflow-y-auto p-7 md:p-9">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="text-[12px] uppercase tracking-[0.3em] text-[#97a5ca]">
                  Interpretation block
                </div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
                  {block.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Закрыть
              </button>
            </div>

            <div className="space-y-6">
              {[
                ["Signal", block.signal],
                ["Interpretation", block.interpretation],
                ["Dependencies", block.dependencies],
                ["Risk", block.risk],
                ["Unknown", block.unknown],
                ["Conclusion", block.conclusion],
              ].map(([label, text]) => (
                <div
                  key={label}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">
                    {label}
                  </div>
                  <p className="mt-3 text-lg leading-8 text-[#d6ddf1]">
                    {text}
                  </p>
                </div>
              ))}

              {block.extra ? (
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">
                    Extra data
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(block.extra).map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-2xl border border-white/10 bg-[#081834] p-4"
                      >
                        <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
                          {key}
                        </div>
                        <div className="mt-2 text-lg text-white">
                          {value === null ? "n/a" : String(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}

function SolutionCard({
  title,
  text,
  items,
}: {
  title: string;
  text?: string;
  items?: string[];
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6">
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">
        {title}
      </div>
      {text ? (
        <p className="mt-4 text-lg leading-8 text-[#ccd3e9]">{text}</p>
      ) : null}
      {items?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#dbe2f3]"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RoadmapPhaseCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.86))] p-6 md:p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="text-[12px] uppercase tracking-[0.3em] text-[#f7d237]">
        {phase.phase}
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">
        {phase.objective}
      </h3>
      <p className="mt-5 text-lg leading-8 text-[#d6ddf1]">
        {phase.why_this_phase_now}
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <div className="text-[12px] uppercase tracking-[0.26em] text-[#97a5ca]">
            Key actions
          </div>
          <ul className="mt-3 space-y-3 text-[#d6ddf1]">
            {phase.key_actions.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[12px] uppercase tracking-[0.26em] text-[#97a5ca]">
            Control points
          </div>
          <ul className="mt-3 space-y-3 text-[#d6ddf1]">
            {phase.control_points.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
            Expected result
          </div>
          <div className="mt-3 text-base leading-7 text-white">
            {phase.expected_intermediate_result}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
            Dependencies
          </div>
          <div className="mt-3 text-base leading-7 text-white">
            {phase.dependencies.join(" · ")}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
            Owner logic
          </div>
          <div className="mt-3 text-base leading-7 text-white">
            {phase.owner_logic}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
            Risk if not done
          </div>
          <div className="mt-3 text-base leading-7 text-white">
            {phase.risk_if_not_done}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-[#071734] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1560px] items-center justify-center px-6">
        <div className="rounded-[28px] border border-white/10 bg-white/5 px-8 py-6 text-center">
          <div className="text-sm uppercase tracking-[0.28em] text-[#f7d237]">
            Results
          </div>
          <div className="mt-4 text-2xl font-semibold">Загрузка результатов...</div>
        </div>
      </div>
    </main>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-[#071734] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1560px] items-center justify-center px-6">
        <div className="max-w-xl rounded-[28px] border border-white/10 bg-white/5 px-8 py-6 text-center">
          <div className="text-sm uppercase tracking-[0.28em] text-[#f7d237]">
            Results
          </div>
          <div className="mt-4 text-2xl font-semibold">
            Не удалось загрузить результаты
          </div>
          <p className="mt-4 text-base leading-7 text-[#c8d0e8]">{message}</p>
        </div>
      </div>
    </main>
  );
}

export default function ResultsPageV2MapperReady() {
  const params = useParams<{ token: string }>();
  const token = params?.token;

  const [data, setData] = useState<PagePayload | null>(null);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeBlock = useMemo(
    () =>
      data?.interpretation.blocks.find((block) => block.id === activeBlockId) ??
      null,
    [activeBlockId, data]
  );

  useEffect(() => {
    async function loadResults() {
      if (!token) {
        setError("Token not found in URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/results/${token}`, {
          method: "GET",
          cache: "no-store",
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json?.details || json?.error || "Failed to load results");
        }

        setData(json as PagePayload);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [token]);

  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error || "No data"} />;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#071734] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,82,170,0.34),transparent_34%),linear-gradient(180deg,#0b1d3a_0%,#071734_55%,#041127_100%)]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute left-[-10%] top-[10%] h-[480px] w-[480px] rounded-full bg-[#1f58c7]/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[25%] h-[420px] w-[420px] rounded-full bg-[#133e8e]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1560px] px-4 pb-24 pt-8 md:px-8 md:pb-32 md:pt-10">
        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,41,95,0.72),rgba(4,17,45,0.86))] px-5 py-6 shadow-[0_30px_120px_rgba(0,0,0,0.24)] md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[1.55fr_0.95fr]">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.34em] text-[#aeb8d7]">
                {data.hero.eyebrow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    {index > 0 ? <span className="text-[#f7d237]">•</span> : null}
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white md:text-[80px]">
                {data.hero.headline}
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-[#d3dbf0] md:text-[22px]">
                {data.hero.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {data.hero.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.26em] ${toneClass(
                      tag.tone
                    )}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {data.hero.metrics.map((item) => (
                  <MetricCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:pl-2">
              <SideCard
                label="Growth limit"
                title={data.hero.growth_limit.title}
                text={`Bottleneck: ${data.hero.growth_limit.bottleneck}. ${data.hero.growth_limit.explanation}`}
              />
              <SideCard
                label="Primary lever"
                title={data.hero.primary_lever.title}
                text={data.hero.primary_lever.description}
                extra={`Zone: ${data.hero.primary_lever.zone}`}
              />
              <SideCard
                label="Market adjustment"
                title={data.hero.market_adjustment.title}
                text={data.hero.market_adjustment.text}
              />
            </div>
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Interpretation"
            title={data.interpretation.title}
            text={data.interpretation.intro}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.interpretation.blocks.map((block) => (
              <InterpretationTile
                key={block.id}
                block={block}
                onOpen={setActiveBlockId}
              />
            ))}
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Solution"
            title="Решение"
            text="Эта секция строится уже на финальном mapper-output третьего модуля: strategic scenario, primary lever, lever system, implementation logic, priorities и expected business shift."
          />

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <SolutionCard
                title="Strategic scenario"
                text={`${data.solution.strategic_scenario.type}. ${data.solution.strategic_scenario.why_this_scenario}`}
                items={data.solution.strategic_scenario.not_now}
              />
              <SolutionCard
                title="Primary growth lever"
                text={`${data.solution.primary_growth_lever.name}. ${data.solution.primary_growth_lever.essence}`}
                items={[`Zone: ${data.solution.primary_growth_lever.zone}`]}
              />
              <SolutionCard
                title="Why this lever"
                text={data.solution.primary_growth_lever.why_this_lever}
              />
              <SolutionCard
                title="Model change recommendation"
                text={data.solution.primary_growth_lever.model_change_recommendation}
              />
              <SolutionCard
                title="Strategic priorities"
                items={[
                  data.solution.strategic_priorities.priority_1,
                  data.solution.strategic_priorities.priority_2,
                  data.solution.strategic_priorities.priority_3,
                ]}
              />
            </div>

            <div className="space-y-5">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Lever system
                </div>
                <div className="mt-5 space-y-4">
                  {data.solution.lever_system.map((lever) => (
                    <div
                      key={lever.id}
                      className={`rounded-[22px] border p-5 ${roleClass(
                        lever.role
                      )}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xl font-semibold text-white">
                          {lever.name}
                        </div>
                        <div className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#d5ddf1]">
                          {roleLabel(lever.role)}
                        </div>
                      </div>
                      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-[#9aabd0]">
                        {lever.zone}
                      </div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">
                        {lever.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Lever mechanics
                </div>
                <div className="mt-5 space-y-4">
                  {data.solution.lever_mechanics.map((item) => (
                    <div
                      key={`${item.lever}-${item.affected_metric}`}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="text-lg font-semibold text-white">
                        {item.lever}
                      </div>
                      <div className="mt-2 text-sm text-[#9aa8ce]">
                        {item.affected_metric}
                      </div>
                      <p className="mt-3 text-base leading-7 text-[#d4dbef]">
                        {item.economic_shift}
                      </p>
                      <p className="mt-2 text-base leading-7 text-[#bac5df]">
                        {item.business_result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
              <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                Implementation logic
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SolutionCard
                  title="What must change"
                  text={data.solution.implementation_logic.what_must_change}
                />
                <SolutionCard
                  title="What system must appear"
                  items={data.solution.implementation_logic.what_system_must_appear}
                />
                <SolutionCard
                  title="Application points"
                  items={data.solution.implementation_logic.application_points}
                />
                <SolutionCard
                  title="Implementation conditions"
                  items={data.solution.implementation_logic.implementation_conditions}
                />
                <SolutionCard
                  title="Core dependencies"
                  items={data.solution.implementation_logic.core_dependencies}
                />
                <SolutionCard
                  title="Main risks & fail conditions"
                  items={[
                    ...data.solution.implementation_logic.main_risks,
                    ...data.solution.implementation_logic.fail_conditions,
                  ]}
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
              <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                Expected business shift
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SolutionCard
                  title="What decreases"
                  items={data.solution.expected_business_shift.what_decreases}
                />
                <SolutionCard
                  title="What grows"
                  items={data.solution.expected_business_shift.what_grows}
                />
                <SolutionCard
                  title="Key metric of success"
                  text={data.solution.expected_business_shift.key_metric_of_success}
                />
                <SolutionCard
                  title="Near-term effect"
                  text={data.solution.expected_business_shift.near_term_effect}
                />
                <SolutionCard
                  title="Medium-term effect"
                  text={data.solution.expected_business_shift.medium_term_effect}
                />
                <SolutionCard
                  title="Forbidden now"
                  items={data.solution.strategic_priorities.forbidden_now}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Roadmap"
            title={data.roadmap.title}
            text={data.roadmap.intro}
          />

          <div className="space-y-5">
            {data.roadmap.phases.map((phase) => (
              <RoadmapPhaseCard key={phase.phase} phase={phase} />
            ))}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Control metrics
                </div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.control_metrics.map((metric) => (
                    <div
                      key={metric.name}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {metric.name}
                          </div>
                          <p className="mt-2 text-base leading-7 text-[#c6d0eb]">
                            {metric.why_it_matters}
                          </p>
                        </div>
                        <div className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#d5ddf1]">
                          {metric.direction}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
                            Current
                          </div>
                          <div className="mt-2 text-base text-white">
                            {metric.current_if_known}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
                            Target
                          </div>
                          <div className="mt-2 text-base text-white">
                            {metric.target_if_inferable}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">
                            Review
                          </div>
                          <div className="mt-2 text-base text-white">
                            {metric.review_frequency}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Alert rules
                </div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.alert_rules.map((rule) => (
                    <div
                      key={rule.label}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="text-lg font-semibold text-white">
                        {rule.label}
                      </div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">
                        {rule.trigger_logic}
                      </p>
                      <p className="mt-2 text-base leading-7 text-[#b8c3df]">
                        {rule.interpretation}
                      </p>
                      <div className="mt-4 rounded-2xl border border-[#f7d237]/20 bg-[#f7d237]/8 p-4 text-base leading-7 text-[#f4e3a2]">
                        {rule.required_action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Decision signals
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {data.roadmap.decision_signals.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#dbe2f3]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Operating scenarios
                </div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.operating_scenarios.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="text-lg font-semibold text-white">
                        {item.name}
                      </div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">
                        {item.logic}
                      </p>
                      <p className="mt-2 text-base leading-7 text-[#b8c3df]">
                        {item.expected_effect}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">
                  Uncertainty layer
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <SolutionCard
                    title="Confirmed"
                    items={data.roadmap.uncertainty_layer.confirmed}
                  />
                  <SolutionCard
                    title="Hypotheses"
                    items={data.roadmap.uncertainty_layer.hypotheses}
                  />
                  <SolutionCard
                    title="Requires research"
                    items={data.roadmap.uncertainty_layer.requires_research}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <OverlayPanel block={activeBlock} onClose={() => setActiveBlockId(null)} />
    </main>
  );
}
