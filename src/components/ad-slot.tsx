"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export function AdSlot({
  slot,
  format = "auto",
  className = "",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!pubId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsense not loaded yet
    }
  }, []);

  if (!pubId) {
    return <div className={`min-h-[90px] w-full ${className}`} />;
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-${pubId}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
