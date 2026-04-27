import { NextRequest, NextResponse } from "next/server";

const MAKE_RESULTS_GENERATE_WEBHOOK_URL =
  process.env.MAKE_RESULTS_GENERATE_WEBHOOK_URL ||
  process.env.MAKE_RESULTS_WEBHOOK_URL ||
  "https://hook.us2.make.com/vxp3omwrxvmqa1glcsb4yyv8b07zb1v9";

const REQUEST_TIMEOUT_MS = 45_000;

type Nullable<T> = T | null;

type ChannelInput = {
  name?: unknown;
  share_percent?: unknown;
};

type ProductInput = {
  name?: unknown;
  margin_percent?: unknown;
};

type GenerateResultsRequest = {
  action?: unknown;
  access_token?: unknown;
  client_id?: unknown;
  company?: {
    name?: unknown;
    industry?: unknown;
    stage?: unknown;
    country_code?: unknown;
    country_name?: unknown;
  };
  meta?: {
    source?: unknown;
    submitted_at?: unknown;
    is_final_submit?: unknown;
    schema_version?: unknown;
    idempotency_key?: unknown;
  };
  answers?: {
    economics?: {
      margin_percent?: unknown;
      revenue_last_month?: unknown;
      clients_last_month?: unknown;
      tracked_metrics?: unknown;
    };
    clients_flow?: {
      main_segment?: unknown;
      profitable_segment?: unknown;
      typical_client?: unknown;
      leads_per_month?: unknown;
      capacity_per_month?: unknown;
      channels?: unknown;
    };
    product_sales?: {
      products?: unknown;
      retention_mechanics?: unknown;
      cjm?: unknown;
      seasonality?: unknown;
    };
    positioning?: {
      business_description?: unknown;
      sales_region?: unknown;
      business_location?: unknown;
    };
    structure_processes?: {
      team_roles?: unknown;
      interaction_logic?: unknown;
      decision_making?: unknown;
      stress_points?: unknown;
      efficiency_loss_zones?: unknown;
    };
    analytics_management?: {
      uses_analytics?: unknown;
      analytics_details?: unknown;
      needs_change?: unknown;
      implemented_last_6_months?: unknown;
    };
    strategy?: {
      profit_target_percent?: unknown;
      expense_target_mode?: unknown;
      expense_target_value?: unknown;
      plan_3_6_12?: unknown;
    };
  };
};

type NormalizedPayload = {
  action: "generate_results";
  access_token: string;
  client_id: string | null;
  company: {
    name: string;
    industry: string | null;
    stage: string | null;
    country_code: string | null;
    country_name: string | null;
  };
  meta: {
    source: "snapshot-action" | string;
    submitted_at: string;
    is_final_submit: true;
    schema_version: string;
    idempotency_key: string;
  };
  answers: {
    economics: {
      margin_percent: number | null;
      revenue_last_month: number | null;
      clients_last_month: number | null;
      tracked_metrics: string[];
    };
    clients_flow: {
      main_segment: string | null;
      profitable_segment: string | null;
      typical_client: string | null;
      leads_per_month: number | null;
      capacity_per_month: number | null;
      channels: Array<{
        name: string;
        share_percent: number | null;
      }>;
    };
    product_sales: {
      products: Array<{
        name: string;
        margin_percent: number | null;
      }>;
      retention_mechanics: string[];
      cjm: unknown[];
      seasonality: unknown[];
    };
    positioning: {
      business_description: string | null;
      sales_region: string | null;
      business_location: string | null;
    };
    structure_processes: {
      team_roles: string | null;
      interaction_logic: string | null;
      decision_making: string | null;
      stress_points: unknown[];
      efficiency_loss_zones: unknown[];
    };
    analytics_management: {
      uses_analytics: boolean | null;
      analytics_details: string | null;
      needs_change: string | null;
      implemented_last_6_months: string | null;
    };
    strategy: {
      profit_target_percent: number | null;
      expense_target_mode: string | null;
      expense_target_value: number | null;
      plan_3_6_12: string | null;
    };
  };
  derived_metrics: {
    avg_check: number | null;
    gross_profit: number | null;
    expense_share_percent: number | null;
    lead_to_sale_percent: number | null;
    demand_capacity_gap: number | null;
    capacity_gap_percent: number | null;
  };
  flags: {
    has_analytics: boolean;
    has_retention_mechanics: boolean;
    single_channel_dependency: boolean;
    capacity_overload: boolean;
    missing_positioning_data: boolean;
    missing_economics_data: boolean;
    missing_clients_flow_data: boolean;
    missing_strategy_data: boolean;
  };
};

function toTrimmedString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const result = String(value).trim();
  return result.length > 0 ? result : null;
}

function toRequiredTrimmedString(value: unknown, fieldName: string): string {
  const result = toTrimmedString(value);
  if (!result) {
    throw new Error(`Missing required field: ${fieldName}`);
  }
  return result;
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const normalized = String(value).replace(/\s+/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function toBooleanOrNull(value: unknown): boolean | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "y"].includes(normalized)) return true;
    if (["false", "0", "no", "n"].includes(normalized)) return false;
  }
  return null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => toTrimmedString(item))
    .filter((item): item is string => Boolean(item));
}

function toUnknownArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function normalizeChannels(value: unknown): Array<{ name: string; share_percent: number | null }> {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const channel = (item ?? {}) as ChannelInput;
      const name = toTrimmedString(channel.name);
      if (!name) return null;

      return {
        name,
        share_percent: toNumberOrNull(channel.share_percent),
      };
    })
    .filter((item): item is { name: string; share_percent: number | null } => Boolean(item));
}

function normalizeProducts(value: unknown): Array<{ name: string; margin_percent: number | null }> {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const product = (item ?? {}) as ProductInput;
      const name = toTrimmedString(product.name);
      if (!name) return null;

      return {
        name,
        margin_percent: toNumberOrNull(product.margin_percent),
      };
    })
    .filter((item): item is { name: string; margin_percent: number | null } => Boolean(item));
}

function round(value: number, digits = 1): number {
  const multiplier = 10 ** digits;
  return Math.round(value * multiplier) / multiplier;
}

function buildIdempotencyKey(accessToken: string): string {
  const stamp = new Date().toISOString().replace(/[.:]/g, "-");
  return `generate_${accessToken}_${stamp}`;
}

function calculateDerivedMetrics(payload: Omit<NormalizedPayload, "derived_metrics" | "flags">) {
  const revenue = payload.answers.economics.revenue_last_month;
  const clients = payload.answers.economics.clients_last_month;
  const margin = payload.answers.economics.margin_percent;
  const leads = payload.answers.clients_flow.leads_per_month;
  const capacity = payload.answers.clients_flow.capacity_per_month;

  const avgCheck = revenue !== null && clients && clients > 0 ? round(revenue / clients, 2) : null;
  const grossProfit = revenue !== null && margin !== null ? round((revenue * margin) / 100, 2) : null;
  const expenseSharePercent = margin !== null ? round(100 - margin, 2) : null;
  const leadToSalePercent = leads && leads > 0 && clients !== null ? round((clients / leads) * 100, 1) : null;
  const demandCapacityGap = leads !== null && capacity !== null ? round(leads - capacity, 2) : null;
  const capacityGapPercent =
    leads !== null && capacity !== null && capacity > 0
      ? round(((leads - capacity) / capacity) * 100, 1)
      : null;

  return {
    avg_check: avgCheck,
    gross_profit: grossProfit,
    expense_share_percent: expenseSharePercent,
    lead_to_sale_percent: leadToSalePercent,
    demand_capacity_gap: demandCapacityGap,
    capacity_gap_percent: capacityGapPercent,
  };
}

function calculateFlags(payload: Omit<NormalizedPayload, "derived_metrics" | "flags">) {
  const channels = payload.answers.clients_flow.channels;
  const hasAnalytics = payload.answers.analytics_management.uses_analytics === true;
  const hasRetentionMechanics = payload.answers.product_sales.retention_mechanics.length > 0;
  const singleChannelDependency = channels.some((channel) => (channel.share_percent ?? 0) > 50);

  const leads = payload.answers.clients_flow.leads_per_month;
  const capacity = payload.answers.clients_flow.capacity_per_month;
  const capacityOverload =
    leads !== null && capacity !== null ? leads > capacity : false;

  const missingPositioningData =
    !payload.answers.positioning.business_description &&
    !payload.answers.positioning.sales_region &&
    !payload.answers.positioning.business_location;

  const missingEconomicsData =
    payload.answers.economics.margin_percent === null &&
    payload.answers.economics.revenue_last_month === null &&
    payload.answers.economics.clients_last_month === null;

  const missingClientsFlowData =
    payload.answers.clients_flow.leads_per_month === null &&
    payload.answers.clients_flow.capacity_per_month === null &&
    payload.answers.clients_flow.channels.length === 0;

  const missingStrategyData =
    payload.answers.strategy.profit_target_percent === null &&
    !payload.answers.strategy.expense_target_mode &&
    !payload.answers.strategy.plan_3_6_12;

  return {
    has_analytics: hasAnalytics,
    has_retention_mechanics: hasRetentionMechanics,
    single_channel_dependency: singleChannelDependency,
    capacity_overload: capacityOverload,
    missing_positioning_data: missingPositioningData,
    missing_economics_data: missingEconomicsData,
    missing_clients_flow_data: missingClientsFlowData,
    missing_strategy_data: missingStrategyData,
  };
}

function normalizeRequestBody(body: GenerateResultsRequest): NormalizedPayload {
  const accessToken = toRequiredTrimmedString(body.access_token, "access_token");
  const action = toRequiredTrimmedString(body.action, "action");

  if (action !== "generate_results") {
    throw new Error("Invalid action. Expected 'generate_results'.");
  }

  const isFinalSubmit = body.meta?.is_final_submit;
  if (isFinalSubmit !== true) {
    throw new Error("Final submit is required. Expected meta.is_final_submit = true.");
  }

  const normalizedBase = {
    action: "generate_results" as const,
    access_token: accessToken,
    client_id: toTrimmedString(body.client_id),
    company: {
      name: toRequiredTrimmedString(body.company?.name, "company.name"),
      industry: toTrimmedString(body.company?.industry),
      stage: toTrimmedString(body.company?.stage),
      country_code: toTrimmedString(body.company?.country_code),
      country_name: toTrimmedString(body.company?.country_name),
    },
    meta: {
      source: toTrimmedString(body.meta?.source) || "snapshot-action",
      submitted_at: toTrimmedString(body.meta?.submitted_at) || new Date().toISOString(),
      is_final_submit: true as const,
      schema_version: toTrimmedString(body.meta?.schema_version) || "1.0",
      idempotency_key:
        toTrimmedString(body.meta?.idempotency_key) || buildIdempotencyKey(accessToken),
    },
    answers: {
      economics: {
        margin_percent: toNumberOrNull(body.answers?.economics?.margin_percent),
        revenue_last_month: toNumberOrNull(body.answers?.economics?.revenue_last_month),
        clients_last_month: toNumberOrNull(body.answers?.economics?.clients_last_month),
        tracked_metrics: toStringArray(body.answers?.economics?.tracked_metrics),
      },
      clients_flow: {
        main_segment: toTrimmedString(body.answers?.clients_flow?.main_segment),
        profitable_segment: toTrimmedString(body.answers?.clients_flow?.profitable_segment),
        typical_client: toTrimmedString(body.answers?.clients_flow?.typical_client),
        leads_per_month: toNumberOrNull(body.answers?.clients_flow?.leads_per_month),
        capacity_per_month: toNumberOrNull(body.answers?.clients_flow?.capacity_per_month),
        channels: normalizeChannels(body.answers?.clients_flow?.channels),
      },
      product_sales: {
        products: normalizeProducts(body.answers?.product_sales?.products),
        retention_mechanics: toStringArray(body.answers?.product_sales?.retention_mechanics),
        cjm: toUnknownArray(body.answers?.product_sales?.cjm),
        seasonality: toUnknownArray(body.answers?.product_sales?.seasonality),
      },
      positioning: {
        business_description: toTrimmedString(body.answers?.positioning?.business_description),
        sales_region: toTrimmedString(body.answers?.positioning?.sales_region),
        business_location: toTrimmedString(body.answers?.positioning?.business_location),
      },
      structure_processes: {
        team_roles: toTrimmedString(body.answers?.structure_processes?.team_roles),
        interaction_logic: toTrimmedString(body.answers?.structure_processes?.interaction_logic),
        decision_making: toTrimmedString(body.answers?.structure_processes?.decision_making),
        stress_points: toUnknownArray(body.answers?.structure_processes?.stress_points),
        efficiency_loss_zones: toUnknownArray(
          body.answers?.structure_processes?.efficiency_loss_zones,
        ),
      },
      analytics_management: {
        uses_analytics: toBooleanOrNull(body.answers?.analytics_management?.uses_analytics),
        analytics_details: toTrimmedString(body.answers?.analytics_management?.analytics_details),
        needs_change: toTrimmedString(body.answers?.analytics_management?.needs_change),
        implemented_last_6_months: toTrimmedString(
          body.answers?.analytics_management?.implemented_last_6_months,
        ),
      },
      strategy: {
        profit_target_percent: toNumberOrNull(body.answers?.strategy?.profit_target_percent),
        expense_target_mode: toTrimmedString(body.answers?.strategy?.expense_target_mode),
        expense_target_value: toNumberOrNull(body.answers?.strategy?.expense_target_value),
        plan_3_6_12: toTrimmedString(body.answers?.strategy?.plan_3_6_12),
      },
    },
  };

  return {
    ...normalizedBase,
    derived_metrics: calculateDerivedMetrics(normalizedBase),
    flags: calculateFlags(normalizedBase),
  };
}

function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

async function forwardToMake(payload: NormalizedPayload) {
  const response = await fetch(MAKE_RESULTS_GENERATE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: createTimeoutSignal(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  const rawText = await response.text();
  const parsed = safeJsonParse(rawText);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      data: parsed,
      rawText,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: parsed,
    rawText,
  };
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateResultsRequest;
    const normalizedPayload = normalizeRequestBody(body);

    const makeResponse = await forwardToMake(normalizedPayload);

    if (!makeResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Make webhook returned an error.",
          access_token: normalizedPayload.access_token,
          request_payload: normalizedPayload,
          make_status: makeResponse.status,
          make_response: makeResponse.data,
          make_raw_text: makeResponse.rawText || null,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        status: "processing",
        access_token: normalizedPayload.access_token,
        request_payload: normalizedPayload,
        make_response: makeResponse.data,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 400 },
    );
  }
}
