"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { pricingTiers } from "@/lib/pricing";

export default function Pricing() {
  const t = useTranslations("pricing");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className={`py-24 px-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
            wjamm-photo.pl
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">{t("title")}</h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`relative flex flex-col items-center rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 ${
                tier.popular
                  ? "bg-red-500 border-red-400 shadow-2xl shadow-red-500/30 scale-105"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
                  Bestseller
                </div>
              )}

              <div className={`text-5xl font-black mb-1 ${tier.popular ? "text-white" : "text-white"}`}>
                {tier.quantity}
              </div>
              <div className={`text-sm mb-5 ${tier.popular ? "text-red-100" : "text-zinc-500"}`}>
                {tier.quantity === 1 ? t("photo") : t("photos")}
              </div>

              <div className={`text-3xl font-bold mb-1 ${tier.popular ? "text-white" : "text-red-400"}`}>
                {tier.price}
              </div>
              <div className={`text-sm mb-6 ${tier.popular ? "text-red-100" : "text-zinc-500"}`}>
                {t("currency")}
              </div>

              <div className={`text-xs text-center ${tier.popular ? "text-red-100" : "text-zinc-600"}`}>
                ~{Math.round(tier.price / tier.quantity)} {t("currency")} / {t("photo")}
              </div>

              <button
                onClick={scrollToContact}
                className={`mt-5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tier.popular
                    ? "bg-white text-red-500 hover:bg-red-50"
                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {t("buyNow")}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-zinc-500 text-sm">{t("note")}</p>
          <button
            onClick={scrollToContact}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors underline underline-offset-4"
          >
            {t("contact")}
          </button>
        </div>
      </div>
    </section>
  );
}
