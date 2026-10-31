"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { tournaments } from "@/lib/tournaments";

const SHOW_INCREMENT = 48;

export default function Tournaments() {
  const t = useTranslations("tournaments");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [showCount, setShowCount] = useState(SHOW_INCREMENT);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = tournaments.filter((tr) => {
    if (filter === "upcoming") return tr.upcoming;
    if (filter === "past") return !tr.upcoming;
    return true;
  });

  const visible_items = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  return (
    <section
      id="tournaments"
      ref={ref}
      style={{
        padding: "80px 20px",
        background: "#0d0d0d",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-tag">Zalamo</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {(["all", "upcoming", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setShowCount(SHOW_INCREMENT); }}
              style={{
                padding: "6px 18px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                transition: "background 0.2s, box-shadow 0.2s",
                background: filter === f ? "#e63946" : "#1f1f1f",
                color: filter === f ? "#fff" : "#9ca3af",
                boxShadow: filter === f ? "0 3px 12px rgba(230,57,70,0.3)" : "none",
              }}
            >
              {f === "all" ? t("allTournaments") : f === "upcoming" ? t("upcoming") : t("past")}
              <span style={{
                marginLeft: 6,
                fontSize: 11,
                opacity: 0.7,
                background: filter === f ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                padding: "1px 6px",
                borderRadius: 100,
              }}>
                {f === "all" ? tournaments.length : f === "upcoming" ? tournaments.filter(t => t.upcoming).length : tournaments.filter(t => !t.upcoming).length}
              </span>
            </button>
          ))}
        </div>

        {/* Compact card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 8,
          }}
        >
          {visible_items.map((tr) => (
            <TournamentCard key={tr.id} tr={tr} t={t} />
          ))}
        </div>

        {/* Show more */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              onClick={() => setShowCount(c => c + SHOW_INCREMENT)}
              style={{
                padding: "10px 28px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: "#1a1a1a",
                color: "#9ca3af",
                border: "1px solid #2a2a2a",
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e63946";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#e63946";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.borderColor = "#2a2a2a";
              }}
            >
              Pokaż więcej ({filtered.length - showCount} pozostałych)
            </button>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, marginTop: 20 }}>
          Wyświetlono {Math.min(showCount, filtered.length)} z {filtered.length} turniejów
        </p>
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

/* ── Compact card ─────────────────────────────────────────── */
function TournamentCard({
  tr,
  t,
}: {
  tr: {
    id: string;
    name: string;
    date: string;
    city: string;
    country: string;
    zalamo_link: string;
    upcoming: boolean;
  };
  t: ReturnType<typeof useTranslations<"tournaments">>;
}) {
  const [hovered, setHovered] = useState(false);

  const formattedDate = tr.date
    ? (() => {
        try {
          return new Date(tr.date + "T12:00:00").toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch {
          return tr.date;
        }
      })()
    : "";

  const hasLink = Boolean(tr.zalamo_link);

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: hovered && hasLink ? "#222" : "#1a1a1a",
    border: tr.upcoming
      ? `1.5px solid ${hovered && hasLink ? "#ff6b77" : "#e63946"}`
      : `1.5px solid ${hovered && hasLink ? "#4ade80" : "#22c55e"}`,
    borderRadius: 12,
    padding: "8px 10px",
    textDecoration: "none",
    color: "inherit",
    cursor: hasLink ? "pointer" : "default",
    transition: "background 0.15s, border-color 0.15s, transform 0.15s",
    transform: hovered && hasLink ? "translateY(-2px)" : "none",
    boxShadow: hovered && hasLink ? "0 6px 20px rgba(34,197,94,0.10)" : "none",
    gap: 8,
    minHeight: 0,
  };

  const inner = (
    <>
      {/* Top row: status badge + link indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
        {tr.upcoming ? (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 9,
            fontWeight: 700,
            padding: "1px 5px",
            borderRadius: 100,
            background: "rgba(230,57,70,0.12)",
            color: "#e63946",
            border: "1px solid rgba(230,57,70,0.25)",
            lineHeight: 1.4,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e63946", animation: "pulse-dot 1.5s infinite", flexShrink: 0 }} />
            {t("upcoming")}
          </span>
        ) : (
          <span style={{
            fontSize: 9,
            fontWeight: 600,
            padding: "1px 5px",
            borderRadius: 100,
            background: "rgba(255,255,255,0.04)",
            color: "#4b5563",
            border: "1px solid #252525",
            lineHeight: 1.4,
          }}>
            {t("past")}
          </span>
        )}
        {hasLink ? (
          <svg
            width="11"
            height="11"
            fill="none"
            viewBox="0 0 24 24"
            stroke={hovered ? "#22c55e" : "#4b5563"}
            style={{ flexShrink: 0, transition: "stroke 0.15s" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        ) : (
          <span style={{ fontSize: 9, color: "#374151", fontStyle: "italic" }}>brak galerii</span>
        )}
      </div>

      {/* Tournament name — max 2 lines */}
      <p style={{
        color: hovered ? "#fff" : "#e5e7eb",
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1.4,
        margin: 0,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical" as const,
        flex: 1,
        transition: "color 0.15s",
      }}>
        {tr.name}
      </p>

      {/* Bottom: date + city */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: "auto" }}>
        {formattedDate && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#e63946", fontSize: 10, fontWeight: 600 }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </div>
        )}
        {tr.city && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#6b7280", fontSize: 10 }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tr.city}
          </div>
        )}
      </div>
    </>
  );

  if (hasLink) {
    return (
      <a
        href={tr.zalamo_link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={cardStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <div style={cardStyle}>
      {inner}
    </div>
  );
}
