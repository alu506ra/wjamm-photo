"use client";

import { useTranslations } from "next-intl";

const NAV_IDS = ["about", "tournaments", "pricing", "contact"] as const;

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/wjamm_photo",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/wjamm.photo",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
                Fotografia <span style={{ color: "#e63946" }}>WJAMM</span>
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>
                Jacek Galewicz
              </div>
            </div>
            <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              {t("tagline")}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "#e63946";
                    el.style.borderColor = "#e63946";
                    el.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "#1a1a1a";
                    el.style.borderColor = "#2a2a2a";
                    el.style.color = "#9ca3af";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={link.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {t("quickLinks")}
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#6b7280",
                    fontSize: 14,
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#e63946"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#6b7280"; }}
                >
                  {tNav(id)}
                </button>
              ))}
            </nav>
          </div>

          {/* Follow */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {t("followUs")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 10, color: "#6b7280", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#e63946"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={link.path} />
                  </svg>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            color: "#4b5563",
            fontSize: 12,
          }}
        >
          <span>© {year} Fotografia WJAMM – Jacek Galewicz. {t("rights")}.</span>
          <a href="https://wjamm-photo.pl" style={{ color: "#4b5563", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#9ca3af"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#4b5563"; }}>
            wjamm-photo.pl
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
