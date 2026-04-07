"use client";

import Link from "next/link";
import { SKINNY_BAR } from "@/data/banner";

export function SkinnyBar() {
  if (!SKINNY_BAR.active) return null;

  return (
    <div className="bg-primary text-primary-foreground text-sm py-2 overflow-hidden">
      <Link href={SKINNY_BAR.link} className="block">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">{SKINNY_BAR.text}</span>
          <span className="mx-8">{SKINNY_BAR.text}</span>
          <span className="mx-8">{SKINNY_BAR.text}</span>
        </div>
      </Link>
    </div>
  );
}
