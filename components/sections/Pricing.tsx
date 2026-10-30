"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { pricingTiers } from "@/lib/pricing";

export default function Pricing() {
  const t = useTranslations("pricing");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        padding: "100px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag">wjamm-photo.pl</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            alignItems: "end",
            marginBottom: 32,
          }}
        >
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                position: "relative",
                borderRadius: 20,
                padding: tier.popular ? "36px 20px 28px" : "28px 20px",
                textAlign: "center",
                background: tier.popular
                  ? "linear-gradient(145deg, #e63946 0%, #c1121f 100%)"
                  : "#1a1a1a",
                border: tier.popular ? "none" : "1px solid #2a2a2a",
                boxShadow: tier.popular ? "0 16px 48px rgba(230,57,70,0.35)" : "none",
                transform: tier.popular ? "scale(1.04)" : "none",
                transition: "transform 0.2s",
              }}
            >
              {tier.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -13,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#fff",
                    color: "#e63946",
                    fontSize: 10,
                    fontWeight: 900,
                    padding: "4px 12px",
                    borderRadius: 100,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Bestseller
                </div>
              )}

              <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {tier.quantity}
              </div>
              <div style={{ fontSize: 13, color: tier.popular ? "rgba(255,255,255,0.75)" : "#6b7280", marginBottom: 20, marginTop: 2 }}>
                {tier.quantity === 1 ? t("photo") : t("photos")}
              </div>

              <div style={{ fontSize: 34, fontWeight: 900, color: tier.popular ? "#fff" : "#e63946", lineHeight: 1 }}>
                {tier.price}
              </div>
              <div style={{ fontSize: 13, color: tier.popular ? "rgba(255,255,255,0.75)" : "#6b7280", marginBottom: 4 }}>
                {t("currency")}
              </div>

              <div style={{ fontSize: 11, color: tier.popular ? "rgba(255,255,255,0.5)" : "#4b5563", marginBottom: 20 }}>
                ~{Math.round(tier.price / tier.quantity)} {t("currency")}/{t("photo")}
              </div>

              <button
                onClick={scrollToContact}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  background: tier.popular ? "#fff" : "#222",
                  color: tier.popular ? "#e63946" : "#fff",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
              >
                {t("buyNow")}
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 8 }}>{t("note")}</p>
          <button
            onClick={scrollToContact}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e63946",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            {t("contact")}
          </button>
        </div>
      </div>
    </section>
  );
}
