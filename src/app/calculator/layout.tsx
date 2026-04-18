import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고유가 피해지원금 계산기｜대상 확인 + 지원금 금액 바로 확인",
  description:
    "고유가 피해지원금 계산기로 대상 여부와 예상 금액을 한 번에 확인하세요. 2026 최신 기준 반영, 복잡한 조건 없이 바로 확인 가능합니다.",
  alternates: { canonical: "https://support.fazr.co.kr/calculator" },
  openGraph: {
    title: "고유가 피해지원금 계산기｜대상 확인 + 지원금 금액 바로 확인",
    description:
      "고유가 피해지원금 계산기로 대상 여부와 예상 금액을 한 번에 확인하세요. 2026 최신 기준 반영, 복잡한 조건 없이 바로 확인 가능합니다.",
    url: "https://support.fazr.co.kr/calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "고유가 피해지원금 계산기｜대상 확인 + 지원금 금액 바로 확인",
    description:
      "고유가 피해지원금 계산기로 대상 여부와 예상 금액을 한 번에 확인하세요. 2026 최신 기준 반영, 복잡한 조건 없이 바로 확인 가능합니다.",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
