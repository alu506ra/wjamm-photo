"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`py-24 px-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-800 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm opacity-40">Zdjęcie fotografa</p>
                </div>
              </div>
              {/* Decorative corner accent */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500 rounded-br-lg" />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                WJAMM Photo
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">{t("title")}</h2>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed">{t("p1")}</p>
            <p className="text-zinc-400 text-lg leading-relaxed">{t("p2")}</p>
            <p className="text-zinc-400 text-lg leading-relaxed">{t("p3")}</p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: "10+", label: "Lat doświadczenia" },
                { value: "50+", label: "Turniejów" },
                { value: "10k+", label: "Zdjęć" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black text-red-500">{stat.value}</div>
                  <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
