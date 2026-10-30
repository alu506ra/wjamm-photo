"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60, alignItems: "center" }} className="about-grid">
          {/* Photo placeholder */}
          <div style={{ order: 2 }} className="about-img">
            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                maxWidth: 420,
                margin: "0 auto",
                borderRadius: 20,
                overflow: "hidden",
                background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
                border: "1px solid #2a2a2a",
              }}
            >
              {/* Camera icon */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#1f1f1f", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p style={{ color: "#444", fontSize: 12 }}>Dodaj zdjęcie fotografa</p>
              </div>
              {/* Corner accents */}
              <div style={{ position: "absolute", top: 16, left: 16, width: 32, height: 32, borderTop: "2px solid #e63946", borderLeft: "2px solid #e63946", borderRadius: "4px 0 0 0" }} />
              <div style={{ position: "absolute", bottom: 16, right: 16, width: 32, height: 32, borderBottom: "2px solid #e63946", borderRight: "2px solid #e63946", borderRadius: "0 0 4px 0" }} />
            </div>
          </div>

          {/* Text */}
          <div style={{ order: 1 }} className="about-text">
            <div className="section-tag">WJAMM Photo</div>
            <h2 className="section-title" style={{ marginBottom: 28 }}>{t("title")}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[t("p1"), t("p2"), t("p3")].map((para, i) => (
                <p key={i} style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.8 }}>{para}</p>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40, paddingTop: 36, borderTop: "1px solid #222" }}>
              {[
                { n: "10+", l: "Lat doświadczenia" },
                { n: "50+", l: "Turniejów" },
                { n: "10k+", l: "Zdjęć" },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#e63946" }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid  { grid-template-columns: 1fr 1fr !important; }
          .about-img   { order: 1 !important; }
          .about-text  { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}
