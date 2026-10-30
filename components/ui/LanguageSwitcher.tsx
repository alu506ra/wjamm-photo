"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ua", label: "Українська", flag: "🇺🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "cz", label: "Čeština", flag: "🇨🇿" },
  { code: "sk", label: "Slovenčina", flag: "🇸🇰" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "sl", label: "Slovenščina", flag: "🇸🇮" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  const switchLocale = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || "/");
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 8,
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          color: "#fff",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#222"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#1a1a1a"; }}
        aria-label="Change language"
      >
        <span style={{ fontSize: 16 }}>{current.flag}</span>
        <span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>{current.code}</span>
        <svg
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", color: "#9ca3af" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: 192,
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                background: lang.code === locale ? "#1a1a1a" : "transparent",
                border: "none",
                cursor: "pointer",
                color: lang.code === locale ? "#e63946" : "#d1d5db",
                fontSize: 13,
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (lang.code !== locale) {
                  e.currentTarget.style.background = "#1a1a1a";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (lang.code !== locale) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#d1d5db";
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
