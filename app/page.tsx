"use client";

import { useState } from "react";

type Pos = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
};

type CardProps = {
  icon: string;
  mobileIcon: string;
  price: string;
  href: string;
  buttonText: string;
  priceDesktop: Pos;
  priceMobile: Pos;
  buttonDesktop: Pos;
  buttonMobile: Pos;
};

function Card({
  icon,
  mobileIcon,
  price,
  href,
  buttonText,
  priceDesktop,
  priceMobile,
  buttonDesktop,
  buttonMobile,
}: CardProps) {
  const [transform, setTransform] = useState("");

  return (
    <div
      className="card-wrapper"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y / rect.height - 0.5) * 8;
        const rotateY = (x / rect.width - 0.5) * 8;

        setTransform(
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        );
      }}
      onMouseLeave={() => setTransform("")}
      style={{ transform }}
    >
      <div className="card">
        <img src={icon} className="img desktop" />
        <img src={mobileIcon} className="img mobile" />

        {/* PRICE */}
        <div className="price desktop" style={priceDesktop}>
          {price}
        </div>

        <div className="price mobile" style={priceMobile}>
          {price}
        </div>

        {/* BUTTON */}
        <a href={href} className="btn desktop" style={buttonDesktop}>
          {buttonText}
        </a>

        <a href={href} className="btn mobile" style={buttonMobile}>
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="page">
      <h1 className="title">Что вас ждет</h1>

      <div className="grid">
        <Card
          icon="/online_playground_desc.svg"
          mobileIcon="/online-playground_mobile.svg"
          price="$114"
          href="#"
          buttonText="Попробовать Snapshot"
          priceDesktop={{ top: "14%", right: "10%" }}
          priceMobile={{ top: "18%", right: "8%" }}
          buttonDesktop={{ left: "6%", bottom: "12%", width: "38%" }}
          buttonMobile={{ left: "7%", bottom: "10%", width: "50%" }}
        />

        <Card
          icon="/onrec_desc.svg"
          mobileIcon="/on-rec_mobile.svg"
          price="$770"
          href="#"
          buttonText="Выбрать слот"
          priceDesktop={{ top: "14%", right: "10%" }}
          priceMobile={{ top: "18%", right: "8%" }}
          buttonDesktop={{ left: "6%", bottom: "12%", width: "34%" }}
          buttonMobile={{ left: "7%", bottom: "10%", width: "46%" }}
        />
      </div>

      <style jsx>{`
        .page {
          padding: 40px;
          background: #0b1d3a;
          color: white;
        }

        .title {
          font-size: 42px;
          margin-bottom: 40px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .card-wrapper {
          transition: transform 0.2s ease;
        }

        .card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }

        .img {
          width: 100%;
          display: block;
        }

        .mobile {
          display: none;
        }

        .price {
          position: absolute;
          font-size: 42px;
          font-weight: 600;
        }

        .btn {
          position: absolute;
          display: inline-block;
          text-align: center;
          padding: 12px 18px;
          border-radius: 999px;
          background: linear-gradient(90deg, #5b8cff, #a855f7);
          color: white;
          text-decoration: none;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .desktop {
            display: none;
          }

          .mobile {
            display: block;
          }
        }
      `}</style>
    </main>
  );
}
