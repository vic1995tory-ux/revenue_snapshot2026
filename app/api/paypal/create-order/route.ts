import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal-expanded";
import { getPlaygroundPricingSnapshot } from "@/lib/playground-pricing";
import { getServiceCodeFromPlan, type CheckoutPlan } from "@/lib/purchase-service";

function normalizePlan(value: unknown): CheckoutPlan {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "onrec" ? "onrec" : "playground";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = normalizePlan(body?.plan);
    const amount =
      plan === "onrec" ? 770 : getPlaygroundPricingSnapshot().currentPrice;

    const order = await createPayPalOrder({ plan, amount });

    return NextResponse.json({
      ok: true,
      id: order.id,
      plan,
      amount,
      service_code: getServiceCodeFromPlan(plan),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to create PayPal order.",
      },
      { status: 500 }
    );
  }
}
