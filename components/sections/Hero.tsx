"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#111",
      }}
    >
      {/* Background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(230,57,70,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(230,57,70,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Diagonal line accent */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "8%",
          width: 1,
          height: "40%",
          background: "linear-gradient(to bottom, transparent, rgba(230,57,70,0.4), transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 860,
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(230,57,70,0.1)",
            border: "1px solid rgba(230,57,70,0.3)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#e63946",
              display: "inline-block",
              animation: "pulse-dot 1.5s ease-in-out infinite",
            }}
          />
          <span style={{ color: "#e63946", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Fotografia WJAMM
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(3rem, 9vw, 7rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            margin: "0 0 24px",
          }}
        >
          {t("title").split(" ").map((word, i) => (
            <span key={i} style={{ display: "inline-block", marginRight: i < t("title").split(" ").length - 1 ? "0.25em" : 0 }}>
              {i === 0 ? word : <span style={{ color: "#e63946" }}>{word}</span>}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#9ca3af",
            lineHeight: 1.7,
            margin: "0 auto 40px",
            maxWidth: 560,
          }}
        >
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => scrollTo("tournaments")}
            className="btn-primary"
          >
            {t("cta")}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="btn-secondary"
          >
            {t("ctaContact")}
          </button>
        </div>

        {/* Stats strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            marginTop: 64,
            flexWrap: "wrap",
          }}
        >
          {[
            { n: "10+", l: "lat doświadczenia" },
            { n: "50+", l: "turniejów" },
            { n: "10k+", l: "zdjęć" },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#e63946", lineHeight: 1 }}>
                {s.n}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#4b5563",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
