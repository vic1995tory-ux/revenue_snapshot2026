import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal-expanded";
import { type CheckoutPlan } from "@/lib/purchase-service";

function normalizePlan(value: unknown): CheckoutPlan {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "onrec" ? "onrec" : "playground";
}

function extractCaptureDetails(capture: Record<string, unknown>) {
  const purchaseUnits = Array.isArray(capture.purchase_units)
    ? capture.purchase_units
    : [];
  const firstUnit =
    purchaseUnits.length > 0 &&
    typeof purchaseUnits[0] === "object" &&
    purchaseUnits[0] !== null
      ? (purchaseUnits[0] as Record<string, unknown>)
      : null;
  const payments =
    firstUnit && typeof firstUnit.payments === "object" && firstUnit.payments !== null
      ? (firstUnit.payments as Record<string, unknown>)
      : null;
  const captures = payments && Array.isArray(payments.captures) ? payments.captures : [];
  const firstCapture =
    captures.length > 0 && typeof captures[0] === "object" && captures[0] !== null
      ? (captures[0] as Record<string, unknown>)
      : null;
  const amount =
    firstCapture && typeof firstCapture.amount === "object" && firstCapture.amount !== null
      ? (firstCapture.amount as Record<string, unknown>)
      : null;

  return {
    tx:
      (typeof firstCapture?.id === "string" && firstCapture.id) ||
      (typeof capture.id === "string" && capture.id) ||
      "",
    st:
      (typeof firstCapture?.status === "string" && firstCapture.status) ||
      (typeof capture.status === "string" && capture.status) ||
      "COMPLETED",
    amt: (typeof amount?.value === "string" && amount.value) || "",
    cc: (typeof amount?.currency_code === "string" && amount.currency_code) || "USD",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderID = String(body?.orderID ?? "").trim();
    const plan = normalizePlan(body?.plan);

    if (!orderID) {
      return NextResponse.json(
        { ok: false, error: "orderID is required" },
        { status: 400 }
      );
    }

    const capture = await capturePayPalOrder(orderID);
    const details = extractCaptureDetails(capture);

    return NextResponse.json({
      ok: true,
      plan,
      orderID,
      capture,
      ...details,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to capture PayPal order.",
      },
      { status: 500 }
    );
  }
}

