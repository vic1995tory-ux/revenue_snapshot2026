import type { ResultsPageData } from "./types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function toStringSafe(value: unknown, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function toNumberSafe(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function toArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function confidenceToLevel(value: unknown): 1 | 2 | 3 {
  const normalized = toStringSafe(value, "").trim().toLowerCase();
  if (normalized === "high") return 3;
  if (normalized === "medium") return 2;
  return 1;
}

function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

function joinStrings(value: unknown, delimiter = ", ") {
  return toArray(value)
    .map((item) => toStringSafe(item, "").trim())
    .filter(Boolean)
    .join(delimiter);
}

function chartSeriesFrom(value: unknown) {
  return toArray(value).map((item) => {
    const record = asRecord(item);
    return {
      label: toStringSafe(record.label ?? record.product ?? record.channel ?? record.month),
      value: toNumberSafe(record.value ?? record.margin ?? record.change_percent, 0),
      unit: toStringSafe(record.unit, "").trim() || undefined,
    };
  });
}

function mapChart(id: string, chart: UnknownRecord): ResultsPageData["evidence"]["charts"][number] {
  return {
    id,
    title: toStringSafe(chart.title, id),
    chartType: toStringSafe(chart.chart_type ?? chart.chartType, "bar"),
    confidenceLevel: confidenceToLevel(chart.confidence_level ?? chart.confidenceLevel),
    series: chartSeriesFrom(chart.series),
  };
}

function mapTable(id: string, table: UnknownRecord): ResultsPageData["evidence"]["tables"][number] {
  const columns = toArray(table.columns).map((item) => toStringSafe(item));
  const rows = toArray(table.rows).map((row) => {
    if (Array.isArray(row)) {
      return columns.reduce<Record<string, string | number | boolean>>((acc, column, index) => {
        acc[column] = (row[index] as string | number | boolean | undefined) ?? "";
        return acc;
      }, {});
    }
    return asRecord(row) as Record<string, string | number | boolean>;
  });

  return {
    id,
    title: toStringSafe(table.title, id),
    columns,
    rows,
  };
}

export function adaptRawResultsPayload(input: unknown): ResultsPageData | null {
  const payload = asRecord(input);
  if (!payload.current_vs_target || !payload.solution) return null;

  const heroBlock = asRecord(payload.hero_block);
  const normalizedData = asRecord(payload.normalized_data);
  const company = asRecord(normalizedData.company);
  const customers = asRecord(normalizedData.customers);
  const financials = asRecord(normalizedData.financials);
  const team = asRecord(normalizedData.team);
  const offering = asRecord(normalizedData.offering);
  const operations = asRecord(normalizedData.operations);
  const analyticsPractice = asRecord(normalizedData.analytics_practice);
  const customerJourney = asRecord(normalizedData.customer_journey);
  const seasonality = asRecord(normalizedData.seasonality);
  const goals = asRecord(normalizedData.goals);
  const contacts = asRecord(normalizedData.contacts);
  const charts = asRecord(payload.charts);
  const tables = asRecord(payload.tables);
  const solution = asRecord(payload.solution);
  const roadmap = asRecord(payload.roadmap);
  const transition = asRecord(payload.current_vs_target);
  const scenarios = asRecord(payload.scenarios);
  const summary = asRecord(payload.summary);
  const insights = asRecord(payload.insights);
  const economics = asRecord(payload.economics);
  const positioning = asRecord(payload.positioning);
  const clientsFlow = asRecord(payload.clients_flow);
  const productSales = asRecord(payload.product_sales);
  const analyticsManagement = asRecord(payload.analytics_management);
  const structureProcesses = asRecord(payload.structure_processes);
  const strategy = asRecord(payload.strategy);
  const structureInputs = asRecord(structureProcesses.normalized_inputs);

  const heroRolesSource =
    Array.isArray(heroBlock.roles) && heroBlock.roles.length > 0
      ? heroBlock.roles
      : team.roles;
  const heroRoles = toArray(heroRolesSource).map((item) => {
    const record = asRecord(item);
    return {
      role: toStringSafe(record.role),
      responsibility: toStringSafe(record.responsibility),
    };
  });

  const heroProductMarginsSource = Array.isArray(asRecord(heroBlock.product_margins_chart).series)
    ? asRecord(heroBlock.product_margins_chart).series
    : asRecord(charts.product_margins).series;
  const heroProductMargins = toArray(heroProductMarginsSource).map((item) => {
    const record = asRecord(item);
    return {
      name: toStringSafe(record.product ?? record.label),
      marginPercent: toNumberSafe(record.margin ?? record.value),
    };
  });

  const chartMap: ResultsPageData["evidence"]["charts"] = Object.entries(charts).map(
    ([id, chart]) => mapChart(id, asRecord(chart)),
  );
  const tableMap: ResultsPageData["evidence"]["tables"] = Object.entries(tables).map(
    ([id, table]) => mapTable(id, asRecord(table)),
  );

  const expectedKpis = toArray(payload.expected_kpi_changes).map((item) => {
    const record = asRecord(item);
    return {
      metric: toStringSafe(record.metric),
      current: toStringSafe(record.current),
      expected: toStringSafe(record.expected),
      delta: toStringSafe(record.delta),
      driver: toStringSafe(record.driver),
      confidenceLevel: confidenceToLevel(record.confidence_level),
    };
  });

  const kpiLookup = (metricName: string) =>
    expectedKpis.find((item) => item.metric.toLowerCase() === metricName.toLowerCase());

  const strategicPriorities = toArray(solution.strategic_priorities).map((item) => {
    const record = asRecord(item);
    const rank = toNumberSafe(record.priority_rank, 0);
    return {
      step: rank,
      label: toStringSafe(record.action),
      description: toStringSafe(record.expected_result),
      priority: rank === 1 ? "high" : rank === 2 ? "medium" : "low",
    } as NonNullable<ResultsPageData["solution"]["priorities"]>[number];
  });

  const businessImpact = asRecord(solution.business_impact);
  const modelChange = asRecord(solution.model_change_recommendation);
  const revenueLoss = asRecord(solution.revenue_loss_source);
  const primaryConstraint = asRecord(solution.primary_constraint);
  const primaryLever = asRecord(solution.primary_growth_lever);
  const solutionSummary = asRecord(solution.solution_summary);

  const phases = toArray(roadmap.phases).map((phase) => {
    const record = asRecord(phase);
    const linkedDescription = toStringSafe(
      record.linked_constraint ?? record.linked_lever ?? record.linked_system,
    );
    return {
      period: toStringSafe(record.phase),
      title: toStringSafe(record.goal),
      description: linkedDescription,
      tasks: toArray(record.key_actions).map((task, index) => ({
        label: `${index + 1}`,
        action: toStringSafe(task),
        confidenceLevel: confidenceToLevel(record.confidence_level),
      })),
    };
  });

  const controlPoints = toArray(roadmap.control_points).map((item) => {
    const record = asRecord(item);
    return {
      metric: toStringSafe(record.metric),
      signal: toStringSafe(record.signal),
      whyItMatters: toStringSafe(record.why_it_matters),
      confidenceLevel: confidenceToLevel(record.confidence_level),
    };
  });

  const assumptions = toArray(scenarios.scenario_assumptions ?? payload.scenario_assumptions).map(
    (item) => {
      const record = asRecord(item);
      return toStringSafe(record.assumption || item);
    },
  );

  const sensitivityPoints = toArray(payload.sensitivity_points).map((item) => {
    const record = asRecord(item);
    return toStringSafe(record.variable || item);
  });

  const riskItems = toArray(payload.risks).map((item) => {
    const record = asRecord(item);
    return {
      risk: toStringSafe(record.risk),
      whyItMatters: toStringSafe(record.why_it_matters ?? record.impact),
      confidenceLevel: confidenceToLevel(record.confidence_level),
    };
  });

  const missingData = toArray(payload.missing_data).map((item) =>
    isRecord(item) ? toStringSafe(item.reason || item.field) : toStringSafe(item),
  );

  const businessContextSections: ResultsPageData["businessContext"]["sections"] = [
    {
      title: "Company",
      rows: [
        { label: "Stage", value: toStringSafe(company.stage) },
        { label: "Location", value: toStringSafe(company.physical_location) },
        { label: "Sales geography", value: joinStrings(company.sales_geography) },
        { label: "Core team", value: toStringSafe(company.team_size_core) },
      ],
    },
    {
      title: "Offer",
      rows: [
        { label: "Business type", value: toStringSafe(offering.business_type) },
        { label: "Products", value: joinStrings(toArray(offering.products).map((item) => asRecord(item).name)) },
        { label: "Target segments", value: joinStrings(customers.target_segments) },
      ],
    },
    {
      title: "Financials",
      rows: [
        {
          label: "Cash-in",
          value: `${toStringSafe(financials.cash_in_last_month)} ${toStringSafe(financials.currency)}`.trim(),
        },
        { label: "Contract value", value: toStringSafe(financials.contract_value_total) },
        { label: "Reported margin", value: `${toStringSafe(financials.reported_margin_percent)}%` },
      ],
    },
    {
      title: "Flow",
      rows: [
        { label: "Lead volume", value: toStringSafe(customers.lead_volume) },
        { label: "Capacity", value: toStringSafe(customers.processing_capacity) },
        {
          label: "Main bottleneck",
          value: toStringSafe(asRecord(insights.growth_limit).text ?? asRecord(summary).traction),
        },
      ],
    },
    {
      title: "Management",
      rows: [
        { label: "Decision making", value: toStringSafe(asRecord(team).decision_making) },
        { label: "Analytics", value: joinStrings(asRecord(analyticsPractice).used_models) },
        { label: "Main change needed", value: toStringSafe(asRecord(operations).main_change_needed) },
      ],
    },
    {
      title: "Goals",
      rows: [
        { label: "3 months", value: toStringSafe(goals.next_3_months) },
        { label: "6 months", value: toStringSafe(goals.next_6_months) },
        { label: "12 months", value: toStringSafe(goals.next_12_months) },
      ],
    },
    {
      title: "Contacts",
      rows: [
        { label: "Report email", value: toStringSafe(contacts.report_email) },
        { label: "Meeting contact", value: toStringSafe(contacts.meeting_contact) },
      ],
    },
    {
      title: "Customer Journey",
      rows: [
        {
          label: "Total time",
          value: `${(toNumberSafe(asRecord(normalizedData.calculated_metrics).cjm_time_minutes, 0) / 1440).toFixed(1)} days`,
        },
        {
          label: "Acquisition",
          value: joinStrings(asRecord(toArray(customerJourney.stages)[0]).problems),
        },
        {
          label: "Activation",
          value: joinStrings(asRecord(toArray(customerJourney.stages)[1]).problems),
        },
      ],
    },
    {
      title: "Seasonality",
      rows: [
        {
          label: "Peaks",
          value: toArray(seasonality.peaks)
            .map((item) => {
              const record = asRecord(item);
              return `${toStringSafe(record.month)} +${toStringSafe(record.change_percent)}%`;
            })
            .join(", "),
        },
      ],
    },
  ].map((section) => ({
    ...section,
    rows: section.rows.filter((row) => row.value.trim().length > 0),
  }));

  const blocks: ResultsPageData["blocks"] = [
    {
      id: "economics",
      title: "Economics",
      truthSummary: toStringSafe(asRecord(economics.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(economics.current_economic_state).explanation),
      confidenceLevel: confidenceToLevel(asRecord(economics.truth_summary).confidence_level),
      keySignals: [
        { label: "Cash-in", value: toStringSafe(asRecord(financials).cash_in_last_month) },
        { label: "Margin", value: `${toStringSafe(asRecord(financials).reported_margin_percent)}%` },
        { label: "Demand / Capacity", value: toStringSafe(asRecord(normalizedData.calculated_metrics).demand_to_capacity) },
        { label: "Unmet demand", value: toStringSafe(asRecord(normalizedData.calculated_metrics).unmet_demand) },
      ],
      explanation: toStringSafe(asRecord(economics.main_loss_pattern).explanation),
      implication: toStringSafe(asRecord(economics.economic_growth_limit_view).explanation),
    },
    {
      id: "positioning",
      title: "Positioning",
      truthSummary: toStringSafe(asRecord(positioning.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(positioning.positioning_type).explanation),
      confidenceLevel: confidenceToLevel(asRecord(positioning.truth_summary).confidence_level),
      keySignals: [
        { label: "Business model", value: toStringSafe(asRecord(positioning.business_model).type) },
        { label: "Core offer", value: toStringSafe(asRecord(positioning.core_offer).type) },
        { label: "Target client", value: toStringSafe(asRecord(positioning.target_client).type) },
        { label: "Risk", value: toStringSafe(asRecord(positioning.positioning_risks).level) },
      ],
      explanation: toStringSafe(asRecord(positioning.positioning_risks).explanation),
      implication: toStringSafe(asRecord(positioning.market_fit_view).explanation),
    },
    {
      id: "clients_flow",
      title: "Clients & Flow",
      truthSummary: toStringSafe(asRecord(clientsFlow.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(clientsFlow.current_flow_state).explanation),
      confidenceLevel: confidenceToLevel(asRecord(clientsFlow.truth_summary).confidence_level),
      keySignals: [
        { label: "Leads", value: toStringSafe(customers.lead_volume) },
        { label: "Clients", value: toStringSafe(customers.client_count_last_month) },
        { label: "Conversion", value: `${toStringSafe(asRecord(normalizedData.calculated_metrics).conversion_percent)}%` },
        { label: "Demand / Capacity", value: `${toStringSafe(asRecord(normalizedData.calculated_metrics).demand_to_capacity)}x` },
      ],
      explanation: toStringSafe(asRecord(clientsFlow.main_flow_loss_pattern).explanation),
      implication: toStringSafe(asRecord(clientsFlow.flow_growth_limit_view).explanation),
    },
    {
      id: "product_sales",
      title: "Product & Sales",
      truthSummary: toStringSafe(asRecord(productSales.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(productSales.product_model_type).explanation),
      confidenceLevel: confidenceToLevel(asRecord(productSales.truth_summary).confidence_level),
      keySignals: [
        { label: "Avg check", value: toStringSafe(asRecord(normalizedData.calculated_metrics).avg_check_last_month) },
        { label: "Avg product margin", value: `${toStringSafe(asRecord(normalizedData.calculated_metrics).avg_margin_percent)}%` },
        { label: "Margin spread", value: `${toStringSafe(asRecord(normalizedData.calculated_metrics).margin_spread_percent)} p.p.` },
        { label: "Dependency", value: toStringSafe(asRecord(productSales.revenue_dependency_type).type) },
      ],
      explanation: toStringSafe(asRecord(productSales.main_revenue_leak).explanation),
      implication: toStringSafe(asRecord(productSales.product_scalability_view).explanation),
    },
    {
      id: "analytics_management",
      title: "Analytics & Management",
      truthSummary: toStringSafe(asRecord(analyticsManagement.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(analyticsManagement.main_management_gap).explanation),
      confidenceLevel: confidenceToLevel(asRecord(analyticsManagement.truth_summary).confidence_level),
      keySignals: [
        { label: "Maturity", value: toStringSafe(asRecord(analyticsManagement.analytics_maturity_level).level) },
        { label: "Decision model", value: toStringSafe(asRecord(analyticsManagement.decision_model_type).type) },
        { label: "Controllability", value: toStringSafe(asRecord(analyticsManagement.controllability_level).level) },
        { label: "Growth limit", value: toStringSafe(asRecord(analyticsManagement.management_growth_limit_view).type) },
      ],
      explanation: toStringSafe(asRecord(analyticsManagement.data_usage_takeaway).explanation),
      implication: toStringSafe(asRecord(analyticsManagement.management_growth_limit_view).explanation),
    },
    {
      id: "structure_processes",
      title: "Structure & Processes",
      truthSummary: toStringSafe(asRecord(structureProcesses.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(structureProcesses.main_process_break).explanation),
      confidenceLevel: confidenceToLevel(asRecord(structureProcesses.truth_summary).confidence_level),
      keySignals: [
        { label: "Core team", value: toStringSafe(structureInputs.team_size) },
        { label: "Founder dependency", value: toStringSafe(asRecord(structureProcesses.founder_dependency_level).level) },
        { label: "Scalability", value: toStringSafe(asRecord(structureProcesses.team_scalability_limit).level) },
        { label: "Execution risk", value: toStringSafe(asRecord(structureProcesses.execution_risk).level) },
      ],
      explanation: toStringSafe(asRecord(structureProcesses.structure_growth_limit_view).explanation),
      implication: toStringSafe(asRecord(structureProcesses.execution_risk).trigger),
    },
    {
      id: "strategy",
      title: "Strategy",
      truthSummary: toStringSafe(asRecord(strategy.truth_summary).summary),
      mainDiagnosis: toStringSafe(asRecord(strategy.main_goal_conflict).explanation),
      confidenceLevel: confidenceToLevel(asRecord(strategy.truth_summary).confidence_level),
      keySignals: [
        { label: "Profit goal", value: `${toStringSafe(asRecord(goals).profit_goal_percent)}%` },
        { label: "Expense constraint", value: toStringSafe(asRecord(financials).expense_goal_note) },
        { label: "Primary priority", value: toStringSafe(asRecord(strategy.primary_priority).type) },
        { label: "Risk", value: toStringSafe(asRecord(strategy.execution_risk).level) },
      ],
      explanation: toStringSafe(asRecord(strategy.near_term_focus).explanation),
      implication: toStringSafe(asRecord(strategy.strategy_feasibility_view).explanation),
    },
  ];

  return {
    hero: {
      companyName: toStringSafe(heroBlock.companyName ?? company.name),
      salesGeography: joinStrings(heroBlock.sales_geography || company.sales_geography, " + "),
      summary: toStringSafe(heroBlock.summary ?? summary.snapshot),
      description: toStringSafe(heroBlock.description ?? company.description),
      growthLimit: toStringSafe(heroBlock.growth_limit ?? asRecord(insights.growth_limit).text),
      cashIn: heroBlock.cash_in
        ? `${toStringSafe(asRecord(heroBlock.cash_in).value)} ${toStringSafe(asRecord(heroBlock.cash_in).currency)}`
        : `${toStringSafe(financials.cash_in_last_month)} ${toStringSafe(financials.currency)}`.trim(),
      confidenceLevel: confidenceToLevel(
        asRecord(heroBlock.cash_in).confidence_level ?? payload.confidence_level,
      ),
      roles: heroRoles,
      productMargins: heroProductMargins,
      clientsVsLeads: {
        clients:
          toNumberSafe(
            asRecord(heroBlock.clients_vs_leads_chart).series &&
              toArray(asRecord(heroBlock.clients_vs_leads_chart).series).find(
                (item) => toStringSafe(asRecord(item).label) === "Клиенты",
              ) &&
              asRecord(
                toArray(asRecord(heroBlock.clients_vs_leads_chart).series).find(
                  (item) => toStringSafe(asRecord(item).label) === "Клиенты",
                ),
              ).value,
            toNumberSafe(customers.client_count_last_month),
          ),
        leads:
          toNumberSafe(
            asRecord(heroBlock.clients_vs_leads_chart).series &&
              toArray(asRecord(heroBlock.clients_vs_leads_chart).series).find(
                (item) => toStringSafe(asRecord(item).label) === "Лиды",
              ) &&
              asRecord(
                toArray(asRecord(heroBlock.clients_vs_leads_chart).series).find(
                  (item) => toStringSafe(asRecord(item).label) === "Лиды",
                ),
              ).value,
            toNumberSafe(customers.lead_volume),
          ),
      },
      channelMix: chartSeriesFrom(asRecord(charts.channel_mix).series).map((item) => ({
        name: item.label,
        value: item.value,
      })),
      stage: toStringSafe(company.stage),
      businessAgeMonths: (() => {
        const parsed = toNumberSafe(company.time_in_market_months, Number.NaN);
        return Number.isFinite(parsed) ? parsed : undefined;
      })(),
      physicalLocation: toStringSafe(company.physical_location),
      teamSizeCore: toNumberSafe(company.team_size_core, 0),
      snapshot: toStringSafe(summary.snapshot),
      currentPosition: toStringSafe(summary.company_profile),
    },
    solution: {
      title: toStringSafe(solutionSummary.headline),
      summary: toStringSafe(solutionSummary.core_logic),
      confidenceLevel: confidenceToLevel(solutionSummary.confidence_level),
      cards: [
        {
          title: "Growth Lever",
          value: toStringSafe(primaryLever.lever),
          note: toStringSafe(primaryLever.reason),
        },
        {
          title: "Constraint",
          value: toStringSafe(primaryConstraint.label),
          note: toStringSafe(primaryConstraint.reason),
        },
        {
          title: "Revenue Loss",
          value: toStringSafe(revenueLoss.label),
          note: toStringSafe(revenueLoss.explanation),
        },
        {
          title: "Model Shift",
          value: toStringSafe(modelChange.proposed_model_shift),
          note: toStringSafe(modelChange.expected_unlock),
        },
      ],
      decisionRule:
        "Не масштабировать входящий поток до стабилизации processing, ownership и delivery.",
      priorities: strategicPriorities,
      expectedOutcomes: [
        { label: "Revenue impact", description: toStringSafe(businessImpact.revenue_impact) },
        { label: "Profit impact", description: toStringSafe(businessImpact.profit_impact) },
        { label: "Flow impact", description: toStringSafe(businessImpact.flow_impact) },
        { label: "Team impact", description: toStringSafe(businessImpact.team_impact) },
        { label: "Management impact", description: toStringSafe(businessImpact.management_impact) },
        { label: "Scalability impact", description: toStringSafe(businessImpact.scalability_impact) },
      ],
      kpis: [
        {
          label: "Capacity load",
          current: toStringSafe(kpiLookup("capacity_load")?.current),
          target: toStringSafe(kpiLookup("capacity_load")?.expected),
          change: toStringSafe(kpiLookup("capacity_load")?.delta),
        },
        {
          label: "Conversion",
          current: toStringSafe(kpiLookup("conversion")?.current),
          target: toStringSafe(kpiLookup("conversion")?.expected),
          change: toStringSafe(kpiLookup("conversion")?.delta),
        },
        {
          label: "Revenue",
          current: toStringSafe(kpiLookup("revenue")?.current),
          target: toStringSafe(kpiLookup("revenue")?.expected),
          change: toStringSafe(kpiLookup("revenue")?.delta),
        },
        {
          label: "Profit",
          current: toStringSafe(kpiLookup("profit")?.current),
          target: toStringSafe(kpiLookup("profit")?.expected),
          change: toStringSafe(kpiLookup("profit")?.delta),
        },
      ],
    },
    roadmap: {
      phases,
      controlPoints,
    },
    forecasts: {
      revenue: {
        current: toStringSafe(kpiLookup("revenue")?.current),
        target: toStringSafe(kpiLookup("revenue")?.expected),
        delta: 100,
      },
      costs: {
        current: toStringSafe(kpiLookup("capacity_load")?.current),
        target: toStringSafe(kpiLookup("capacity_load")?.expected),
        delta: -225,
      },
      profit: {
        current: toStringSafe(kpiLookup("profit")?.current),
        target: toStringSafe(kpiLookup("profit")?.expected),
        delta: 75,
      },
      assumptions,
    },
    transition: {
      currentState: asRecord(transition.current_state) as Record<string, string>,
      targetState: asRecord(transition.target_state) as Record<string, string>,
      gapSummary: toStringSafe(transition.gap_summary),
      confidenceLevel: confidenceToLevel(transition.confidence_level),
      kpiChanges: expectedKpis,
    },
    scenarios: {
      items: [
        {
          name: "Baseline",
          description: toStringSafe(asRecord(scenarios.baseline).description),
          expectedOutcome: toStringSafe(asRecord(scenarios.baseline).expected_outcome),
          note: toStringSafe(asRecord(scenarios.baseline).risk),
        },
        {
          name: "Improved",
          description: toStringSafe(asRecord(scenarios.improved_execution).description),
          expectedOutcome: toStringSafe(
            asRecord(scenarios.improved_execution).expected_outcome,
          ),
          note: toStringSafe(asRecord(scenarios.improved_execution).upside),
        },
        {
          name: "Failure",
          description: toStringSafe(asRecord(scenarios.failure_case).description),
          expectedOutcome: toStringSafe(asRecord(scenarios.failure_case).expected_outcome),
          note: toStringSafe(asRecord(scenarios.failure_case).downside),
        },
      ],
      assumptions,
      sensitivityPoints,
    },
    evidence: {
      charts: chartMap,
      tables: tableMap,
    },
    reliability: {
      risks: riskItems,
      missingData,
      confidenceNote: toStringSafe(payload.confidence_note),
    },
    businessContext: {
      summary: [
        toStringSafe(summary.snapshot),
        toStringSafe(summary.company_profile),
        toStringSafe(summary.traction),
        toStringSafe(summary.economics),
      ]
        .filter(Boolean)
        .join(" "),
      sections: businessContextSections.filter((section) => section.rows.length > 0),
    },
    blocks,
    overallSummary: {
      cards: [
        { title: "Snapshot", value: toStringSafe(summary.snapshot) },
        { title: "Primary Need", value: toStringSafe(asRecord(operations).main_change_needed) },
        { title: "Growth Limit", value: toStringSafe(asRecord(insights.growth_limit).text) },
      ],
    },
  };
}
