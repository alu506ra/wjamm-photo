"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { tournaments } from "@/lib/tournaments";

export default function Tournaments() {
  const t = useTranslations("tournaments");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = tournaments.filter((tr) => {
    if (filter === "upcoming") return tr.upcoming;
    if (filter === "past") return !tr.upcoming;
    return true;
  });

  return (
    <section
      id="tournaments"
      ref={ref}
      style={{
        padding: "100px 24px",
        background: "#0d0d0d",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-tag">Zalamo</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
          {(["all", "upcoming", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                background: filter === f ? "#e63946" : "#1a1a1a",
                color: filter === f ? "#fff" : "#9ca3af",
                boxShadow: filter === f ? "0 4px 16px rgba(230,57,70,0.3)" : "none",
              }}
            >
              {f === "all" ? t("allTournaments") : f === "upcoming" ? t("upcoming") : t("past")}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((tr) => (
            <a
              key={tr.id}
              href={tr.zalamo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover"
              style={{
                display: "block",
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 16,
                padding: 20,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* Status badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: tr.upcoming ? "rgba(230,57,70,0.12)" : "rgba(255,255,255,0.04)",
                    color: tr.upcoming ? "#e63946" : "#6b7280",
                    border: `1px solid ${tr.upcoming ? "rgba(230,57,70,0.3)" : "#2a2a2a"}`,
                  }}
                >
                  {tr.upcoming && (
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e63946", display: "inline-block", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                  )}
                  {tr.upcoming ? t("upcoming") : t("past")}
                </span>
                <span style={{ fontSize: 11, color: "#4b5563", fontWeight: 600 }}>{tr.country}</span>
              </div>

              {/* Name */}
              <h3 style={{ color: "#f3f4f6", fontSize: 15, fontWeight: 700, lineHeight: 1.4, margin: "0 0 14px" }}>
                {tr.name}
              </h3>

              {/* Meta */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                    text: tr.city,
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
                    text: new Date(tr.date).toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" }),
                  },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: 13 }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
                      {row.icon}
                    </svg>
                    {row.text}
                  </div>
                ))}
              </div>

              {/* CTA link */}
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: "#e63946", fontSize: 12, fontWeight: 700 }}>
                {t("viewPhotos")}
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
