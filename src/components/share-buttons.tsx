"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
  className?: string;
}

export function ShareButtons({ title, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  if (typeof window === "undefined") return null;

  const url = window.location.href;
  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function openShare(shareUrl: string) {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  }

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={`mt-6 ${className}`}>
      <p className="text-sm text-muted-foreground mb-3 text-center">
        이 정보가 도움이 됐다면 공유해주세요
      </p>
      <div className="grid grid-cols-2 gap-2">
        {/* 네이버 */}
        <Button
          variant="outline"
          className="gap-2 text-sm rounded-lg"
          onClick={() =>
            openShare(
              `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`
            )
          }
        >
          <span className="w-5 h-5 rounded bg-[#03C75A] text-white text-xs font-bold flex items-center justify-center shrink-0">
            N
          </span>
          네이버
        </Button>

        {/* X (트위터) */}
        <Button
          variant="outline"
          className="gap-2 text-sm rounded-lg"
          onClick={() =>
            openShare(
              `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
            )
          }
        >
          <span className="w-5 h-5 rounded bg-black text-white text-xs font-bold flex items-center justify-center shrink-0">
            X
          </span>
          X
        </Button>

        {/* 페이스북 */}
        <Button
          variant="outline"
          className="gap-2 text-sm rounded-lg"
          onClick={() =>
            openShare(
              `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
            )
          }
        >
          <span className="w-5 h-5 rounded bg-[#1877F2] text-white text-xs font-bold flex items-center justify-center shrink-0">
            f
          </span>
          페이스북
        </Button>

        {/* 링크 복사 */}
        <Button
          variant="outline"
          className="gap-2 text-sm rounded-lg"
          onClick={handleCopy}
        >
          <Link2 className="w-5 h-5 shrink-0" />
          {copied ? "복사됨!" : "링크 복사"}
        </Button>
      </div>
    </div>
  );
}
