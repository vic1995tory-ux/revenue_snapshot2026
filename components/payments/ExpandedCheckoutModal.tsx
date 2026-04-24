"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type CheckoutPlan } from "@/lib/purchase-service";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => {
        render: (selector: HTMLElement | string) => Promise<void>;
        close?: () => void;
      };
      CardFields: (config: Record<string, unknown>) => {
        isEligible: () => boolean;
        NameField: () => { render: (selector: HTMLElement | string) => Promise<void> };
        NumberField: () => { render: (selector: HTMLElement | string) => Promise<void> };
        CVVField: () => { render: (selector: HTMLElement | string) => Promise<void> };
        ExpiryField: () => { render: (selector: HTMLElement | string) => Promise<void> };
        submit: () => Promise<void>;
        close?: () => void;
      };
      Marks?: (config?: Record<string, unknown>) => {
        render: (selector: HTMLElement | string) => Promise<void>;
      };
    };
  }
}

const CHECKOUT_CONTEXT_STORAGE_KEY = "rs_checkout_context";
const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  "BAAhz9xcUqSNpy8eOX3LdpB-ZjYn1uN9rFRDWd4LydYq0I1X12kwyxbtJUAMQgIvypHW1T9244aYMkdpEQ";

type ExpandedCheckoutModalProps = {
  open: boolean;
  plan: CheckoutPlan;
  amount: number;
  title: string;
  onClose: () => void;
  onSuccess?: () => void;
};

export function ExpandedCheckoutModal({
  open,
  plan,
  amount,
  title,
  onClose,
  onSuccess,
}: ExpandedCheckoutModalProps) {
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const marksRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const expiryRef = useRef<HTMLDivElement | null>(null);
  const cvvRef = useRef<HTMLDivElement | null>(null);
  const [sdkReady, setSdkReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.paypal)
  );
  const [sdkError, setSdkError] = useState("");
  const [cardEligible, setCardEligible] = useState(false);
  const [submittingCard, setSubmittingCard] = useState(false);

  const serviceCode = useMemo(
    () => (plan === "onrec" ? "on_rec" : "pg"),
    [plan]
  );

  useEffect(() => {
    if (!open) return;

    try {
      window.localStorage.setItem(
        CHECKOUT_CONTEXT_STORAGE_KEY,
        JSON.stringify({
          servicePlan: plan,
          serviceCode,
          savedAt: new Date().toISOString(),
        })
      );
    } catch {}
  }, [open, plan, serviceCode]);

  useEffect(() => {
    if (!open) return;

    const existing = document.querySelector('script[data-paypal-expanded-sdk="true"]');
    const handleReady = () => {
      if (window.paypal) {
        setSdkReady(true);
      }
    };

    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    if (existing) {
      existing.addEventListener("load", handleReady);
      return () => existing.removeEventListener("load", handleReady);
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons,card-fields,marks`;
    script.async = true;
    script.dataset.paypalExpandedSdk = "true";
    script.addEventListener("load", handleReady);
    script.addEventListener("error", () => {
      setSdkError("Не удалось загрузить PayPal Checkout.");
    });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleReady);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !sdkReady || !window.paypal) {
      return;
    }

    if (!buttonsRef.current || !nameRef.current || !numberRef.current || !expiryRef.current || !cvvRef.current) {
      return;
    }

    buttonsRef.current.innerHTML = "";
    if (marksRef.current) marksRef.current.innerHTML = "";
    nameRef.current.innerHTML = "";
    numberRef.current.innerHTML = "";
    expiryRef.current.innerHTML = "";
    cvvRef.current.innerHTML = "";
    setSdkError("");
    setCardEligible(false);

    const createOrder = async () => {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, amount }),
      });

      const data = (await response.json()) as { ok?: boolean; id?: string; error?: string };
      if (!response.ok || !data?.ok || !data?.id) {
        throw new Error(data?.error || "Не удалось создать заказ.");
      }
      return data.id;
    };

    const handleApprove = async (orderID: string) => {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID, plan }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        tx?: string;
        st?: string;
        amt?: string;
        cc?: string;
        order_id?: string;
        error?: string;
      };

      if (!response.ok || !data?.ok || !data.tx) {
        throw new Error(data?.error || "Не удалось подтвердить оплату.");
      }

      onSuccess?.();
      const query = new URLSearchParams({
        tx: data.tx,
        oid: data.order_id || orderID,
        st: data.st || "COMPLETED",
        amt: data.amt || amount.toFixed(2),
        cc: data.cc || "USD",
      });
      window.location.href = `/start-page?${query.toString()}`;
    };

    const buttons = window.paypal.Buttons({
      style: {
        layout: "horizontal",
        shape: "pill",
        color: "gold",
        height: 46,
        label: "paypal",
        tagline: false,
      },
      createOrder,
      onApprove: async (data: { orderID?: string }) => {
        if (!data.orderID) {
          throw new Error("PayPal не вернул ID заказа.");
        }
        await handleApprove(data.orderID);
      },
      onError: () => {
        setSdkError("PayPal не завершил оплату. Попробуйте ещё раз.");
      },
    });

    void buttons.render(buttonsRef.current);

    if (window.paypal.Marks && marksRef.current) {
      const marks = window.paypal.Marks({ fundingSource: "paypal" });
      void marks.render(marksRef.current);
    }

    const cardFields = window.paypal.CardFields({
      createOrder,
      onApprove: async (data: { orderID?: string }) => {
        if (!data.orderID) {
          throw new Error("PayPal не вернул ID заказа.");
        }
        await handleApprove(data.orderID);
      },
      onError: () => {
        setSubmittingCard(false);
        setSdkError("Платёж картой не завершён. Проверьте данные и попробуйте ещё раз.");
      },
      inputEvents: {
        onChange: () => {
          setSdkError("");
        },
      },
    });

    if (cardFields.isEligible()) {
      setCardEligible(true);
      void cardFields.NameField().render(nameRef.current);
      void cardFields.NumberField().render(numberRef.current);
      void cardFields.ExpiryField().render(expiryRef.current);
      void cardFields.CVVField().render(cvvRef.current);

      const submit = async () => {
        try {
          setSubmittingCard(true);
          await cardFields.submit();
        } catch (error) {
          setSdkError(
            error instanceof Error
              ? error.message
              : "Не удалось отправить карту в PayPal."
          );
        } finally {
          setSubmittingCard(false);
        }
      };

      const cardForm = document.getElementById("paypal-card-submit");
      if (cardForm) {
        const handler = () => {
          void submit();
        };
        cardForm.addEventListener("click", handler);

        return () => {
          cardForm.removeEventListener("click", handler);
          cardFields.close?.();
        };
      }
    }

    return () => {
      cardFields.close?.();
    };
  }, [amount, onSuccess, open, plan, sdkReady]);

  if (!open) return null;

  return (
    <div className="expanded-checkout-root" role="dialog" aria-modal="true" aria-label="PayPal Expanded Checkout">
      <button
        type="button"
        className="expanded-checkout-backdrop"
        onClick={onClose}
        aria-label="Закрыть checkout"
      />
      <div className="expanded-checkout-card">
        <button
          type="button"
          className="expanded-checkout-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="expanded-checkout-kicker">Expanded Checkout</div>
        <h2 className="expanded-checkout-title">{title}</h2>
        <div className="expanded-checkout-amount">${amount}</div>
        <div className="expanded-checkout-marks" ref={marksRef} />

        <div className="expanded-checkout-buttons" ref={buttonsRef} />

        <div className="expanded-checkout-divider">
          <span>или оплатить картой</span>
        </div>

        {cardEligible ? (
          <div className="expanded-checkout-form">
            <label className="expanded-checkout-label">
              Имя на карте
              <div className="expanded-checkout-field" ref={nameRef} />
            </label>
            <label className="expanded-checkout-label">
              Номер карты
              <div className="expanded-checkout-field" ref={numberRef} />
            </label>
            <div className="expanded-checkout-row">
              <label className="expanded-checkout-label">
                MM/YY
                <div className="expanded-checkout-field" ref={expiryRef} />
              </label>
              <label className="expanded-checkout-label">
                CVV
                <div className="expanded-checkout-field" ref={cvvRef} />
              </label>
            </div>
            <button
              id="paypal-card-submit"
              type="button"
              className="expanded-checkout-submit"
              disabled={submittingCard}
            >
              {submittingCard ? "Обработка..." : "Оплатить картой"}
            </button>
          </div>
        ) : (
          <div className="expanded-checkout-note">
            Card Fields недоступны для этого устройства или конфигурации PayPal. Можно продолжить через PayPal button выше.
          </div>
        )}

        <div className="expanded-checkout-privacy">
          Secure card payment processed by PayPal. By paying with your card, you acknowledge that your data will be processed by PayPal in accordance with the
          {" "}
          <a
            href="https://www.paypal.com/us/legalhub/privacy-full"
            target="_blank"
            rel="noreferrer"
          >
            PayPal Privacy Statement
          </a>
          .
        </div>

        {sdkError ? <div className="expanded-checkout-error">{sdkError}</div> : null}
      </div>

      <style jsx global>{`
        .expanded-checkout-root {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .expanded-checkout-backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(4, 10, 18, 0.78);
          backdrop-filter: blur(12px);
        }
        .expanded-checkout-card {
          position: relative;
          z-index: 1;
          width: min(100%, 640px);
          border-radius: 28px;
          padding: 28px;
          background: linear-gradient(180deg, rgba(14,25,44,0.96), rgba(9,18,33,0.98));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 40px 120px rgba(0,0,0,0.45);
          color: #fff;
        }
        .expanded-checkout-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-size: 24px;
          line-height: 1;
        }
        .expanded-checkout-kicker {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f7d237;
        }
        .expanded-checkout-title {
          margin: 10px 0 0;
          font-size: 34px;
          line-height: 1.05;
        }
        .expanded-checkout-amount {
          margin-top: 10px;
          font-size: 42px;
          font-weight: 800;
          color: #fff;
        }
        .expanded-checkout-marks {
          margin-top: 16px;
          min-height: 24px;
        }
        .expanded-checkout-buttons {
          margin-top: 16px;
          min-height: 46px;
        }
        .expanded-checkout-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 18px 0 14px;
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .expanded-checkout-divider::before,
        .expanded-checkout-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .expanded-checkout-form {
          display: grid;
          gap: 12px;
        }
        .expanded-checkout-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .expanded-checkout-label {
          display: grid;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }
        .expanded-checkout-field {
          min-height: 48px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          padding: 12px 14px;
        }
        .expanded-checkout-submit {
          margin-top: 6px;
          min-height: 48px;
          border: 0;
          border-radius: 999px;
          padding: 0 22px;
          font-size: 15px;
          font-weight: 800;
          color: #08111e;
          background: linear-gradient(90deg, #f7d237 0%, #ffdf62 100%);
        }
        .expanded-checkout-privacy,
        .expanded-checkout-note,
        .expanded-checkout-error {
          margin-top: 14px;
          font-size: 12px;
          line-height: 1.6;
        }
        .expanded-checkout-privacy {
          color: rgba(255,255,255,0.62);
        }
        .expanded-checkout-privacy a {
          color: #f7d237;
        }
        .expanded-checkout-note {
          color: rgba(255,255,255,0.68);
        }
        .expanded-checkout-error {
          color: #ffb4b4;
        }
        @media (max-width: 640px) {
          .expanded-checkout-root {
            padding: 14px;
          }
          .expanded-checkout-card {
            padding: 22px 18px 18px;
            border-radius: 22px;
          }
          .expanded-checkout-title {
            font-size: 28px;
          }
          .expanded-checkout-amount {
            font-size: 34px;
          }
          .expanded-checkout-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
