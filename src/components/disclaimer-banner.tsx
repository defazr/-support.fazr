import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start">
      <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800">
        본 사이트는 행정안전부 발표 기준을 바탕으로 안내하며, 정부 공식
        사이트가 아닙니다. 최종 대상 여부는 신청 화면 또는 카드사·지자체
        안내에서 확인하세요.
      </p>
    </div>
  );
}
