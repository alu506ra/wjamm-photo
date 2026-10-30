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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
      className={`py-24 px-4 bg-zinc-950/50 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
            Zalamo
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-2">{t("title")}</h2>
          <p className="text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {(["all", "upcoming", "past"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {f === "all" ? t("allTournaments") : f === "upcoming" ? t("upcoming") : t("past")}
            </button>
          ))}
        </div>

        {/* Tournament cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tournament, i) => (
            <a
              key={tournament.id}
              href={tournament.zalamo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/50 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    tournament.upcoming
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                  }`}
                >
                  {tournament.upcoming ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {t("upcoming")}
                    </>
                  ) : (
                    t("past")
                  )}
                </span>
                <span className="text-zinc-600 text-xs">{tournament.country}</span>
              </div>

              <h3 className="text-white font-semibold text-base mb-3 leading-snug group-hover:text-red-400 transition-colors">
                {tournament.name}
              </h3>

              <div className="flex flex-col gap-1.5 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{tournament.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(tournament.date).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-red-400 group-hover:gap-2.5 transition-all">
                {t("viewPhotos")}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
