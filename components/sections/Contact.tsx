"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const phoneIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />;

  const contactItems = [
    {
      label: t("phone"),
      values: [
        { display: "+48 501 007 403", href: "tel:+48501007403" },
        { display: "+48 513 775 033", href: "tel:+48513775033" },
      ],
      icon: phoneIcon,
    },
    {
      label: t("emailLabel"),
      values: [{ display: "jacek@wjamm-photo.pl", href: "mailto:jacek@wjamm-photo.pl" }],
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    {
      label: t("location"),
      values: [{ display: t("locationValue"), href: null }],
      icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    },
  ];

  return (
    <section
      id="contact"
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
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag">wjamm-photo.pl</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        <div style={{ display: "grid", gap: 40 }} className="contact-grid">
          {/* Info column */}
          <div className="contact-info" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {contactItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: 20,
                  background: "#1a1a1a",
                  borderRadius: 14,
                  border: "1px solid #2a2a2a",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(230,57,70,0.1)",
                    border: "1px solid rgba(230,57,70,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#e63946">{item.icon}</svg>
                </div>
                <div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {item.values.map((v) =>
                      v.href ? (
                        <a key={v.display} href={v.href} style={{ color: "#f3f4f6", fontWeight: 600, textDecoration: "none", fontSize: 15, display: "block" }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#e63946"; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#f3f4f6"; }}>
                          {v.display}
                        </a>
                      ) : (
                        <span key={v.display} style={{ color: "#f3f4f6", fontWeight: 600, fontSize: 15 }}>{v.display}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              style={{
                aspectRatio: "16/9",
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#4b5563",
              }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ opacity: 0.4 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span style={{ fontSize: 12, opacity: 0.5 }}>Osadź Google Maps iframe</span>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#1a1a1a",
                borderRadius: 20,
                padding: "36px 32px",
                border: "1px solid #2a2a2a",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-2col">
                {[
                  { key: "name", type: "text", label: t("name"), ph: t("namePlaceholder") },
                  { key: "email", type: "email", label: t("email"), ph: t("emailPlaceholder") },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 8 }}>{f.label}</label>
                    <input
                      type={f.type}
                      required
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.ph}
                      className="input"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 8 }}>{t("subject")}</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={t("subjectPlaceholder")}
                  className="input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 8 }}>{t("message")}</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t("messagePlaceholder")}
                  className="input"
                  style={{ resize: "none" }}
                />
              </div>

              {status === "success" && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 10, color: "#4ade80", fontSize: 14 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {t("success")}
                </div>
              )}
              {status === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.25)", borderRadius: 10, color: "#e63946", fontSize: 14 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t("error")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
                style={{ width: "100%", opacity: status === "sending" ? 0.6 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
              >
                {status === "sending" ? t("sending") : t("send")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 2fr 3fr !important; }
        }
        @media (max-width: 540px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
