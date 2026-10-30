"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const NAV_IDS = ["about", "tournaments", "pricing", "contact"] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px", color: "#fff" }}>
              WJAMM<span style={{ color: "#e63946" }}>Photo</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
            {NAV_IDS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#d1d5db",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "4px 0",
                  position: "relative",
                  transition: "color 0.2s",
                }}
                className="nav-link"
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#e63946"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#d1d5db"; }}
              >
                {t(id)}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LanguageSwitcher />
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
              className="show-mobile"
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: "#fff",
                    borderRadius: 2,
                    transition: "transform 0.2s, opacity 0.2s",
                    transform:
                      menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)"
                      : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(10,10,10,0.98)",
            borderTop: "1px solid #222",
            padding: "8px 0 16px",
          }}
          className="show-mobile"
        >
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#d1d5db",
                fontSize: 16,
                fontWeight: 500,
                padding: "14px 24px",
                borderBottom: "1px solid #1a1a1a",
              }}
            >
              {t(id)}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
