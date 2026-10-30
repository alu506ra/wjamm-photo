"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function Logo({ className = "" }: { className?: string }) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-black tracking-tighter text-white">WJAMM</span>
        <span className="text-2xl font-black tracking-tighter text-red-500">Photo</span>
      </div>
    </Link>
  );
}
