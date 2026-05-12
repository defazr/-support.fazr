import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { AdSlot } from "@/components/ad-slot";
import { SUBSIDY_CONFIG } from "@/data/subsidy";

export const metadata: Metadata = {
  title: "고유가 피해지원금 대상 확인｜행안부 발표 기준 반영 (2026)",
  description:
    "행안부 공식 발표 기준으로 고유가 피해지원금 대상 여부를 확인하세요. 건강보험료 기준 3초 판정, 복잡한 조건 없이 간단히 조회 가능합니다.",
  alternates: { canonical: "https://support.fazr.co.kr/eligibility" },
  openGraph: {
    title: "고유가 피해지원금 대상 확인｜행안부 발표 기준 반영 (2026)",
    description:
      "행안부 공식 발표 기준으로 고유가 피해지원금 대상 여부를 확인하세요. 건강보험료 기준 3초 판정, 복잡한 조건 없이 간단히 조회 가능합니다.",
    url: "https://support.fazr.co.kr/eligibility",
    type: "website",
    images: [
      {
        url: "/og/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "고유가 피해지원금 대상 확인｜행안부 발표 기준 반영 (2026)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "고유가 피해지원금 대상 확인｜행안부 발표 기준 반영 (2026)",
    description:
      "행안부 공식 발표 기준으로 고유가 피해지원금 대상 여부를 확인하세요. 건강보험료 기준 3초 판정, 복잡한 조건 없이 간단히 조회 가능합니다.",
    images: ["/og/og-main.jpg"],
  },
};

function formatAmount(num: number): string {
  return num.toLocaleString("ko-KR");
}

export default function EligibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-4">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">
          고유가 피해지원금 대상 확인
        </h1>
        <p className="text-muted-foreground mt-2">
          소득 하위 70% 가구가 대상이며, 건강보험료로 판단합니다
        </p>
      </div>

      {/* 핵심 기준 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-green-900">대상이 되는 경우</p>
                <ul className="text-sm text-green-800 mt-2 space-y-1">
                  <li>건강보험료가 가구원 수별 기준 이하</li>
                  <li>대한민국 거주 국민</li>
                  <li>가구 소득 하위 70% 이내</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-red-900">
                  대상이 아닌 경우
                </p>
                <ul className="text-sm text-red-800 mt-2 space-y-1">
                  <li>건강보험료 기준 초과</li>
                  <li>고소득 가구 (상위 30%)</li>
                  <li>자산 제외 대상 (한 가지라도 해당 시 가구 전원 제외)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 건강보험료 기준표 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            가구원 수별 건강보험료 기준 (예상)
            <Badge variant="secondary">소득 하위 70%</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-3 font-medium">가구원 수</th>
                  <th className="text-right py-3 px-3 font-medium">
                    직장가입자
                  </th>
                  <th className="text-right py-3 px-3 font-medium">
                    지역가입자
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUBSIDY_CONFIG.incomeThresholds.map((t) => (
                  <tr
                    key={t.members}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-3 px-3 font-medium">{t.members}인 가구</td>
                    <td className="text-right py-3 px-3">
                      {t.insuranceEmployee > 0 ? (
                        <span className="font-bold text-blue-600">
                          {formatAmount(t.insuranceEmployee)}원 이하
                        </span>
                      ) : (
                        <span className="text-muted-foreground">확인 필요</span>
                      )}
                    </td>
                    <td className="text-right py-3 px-3">
                      {t.insuranceRegional > 0 ? (
                        <span className="font-bold text-blue-600">
                          {formatAmount(t.insuranceRegional)}원 이하
                        </span>
                      ) : (
                        <span className="text-muted-foreground">확인 필요</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            ※ 위 기준은 2026년 3월 부과된 건강보험료 본인부담금(장기요양보험료 제외) 가구 합산액 기준입니다. 행정안전부 5/11 발표 기준.
            <br />
            ※ 위 기준은 외벌이 가구 기준입니다.
            <br />
            ※ 5인 이상 지역가입자 기준은 행안부 공식 표에서 미발표 항목입니다.
            <br />
            ※ 정확한 대상 여부는 콜센터 1670-2626 또는 건강보험공단 1577-1000으로 확인하세요.
          </p>
        </CardContent>
      </Card>

      {/* 혼합가구 안내 */}
      <Card className="mb-8 border-blue-200 bg-blue-50/50">
        <CardContent className="pt-5">
          <p className="font-semibold text-blue-900">혼합가구 안내</p>
          <p className="text-sm text-blue-800 mt-1">
            혼합가구는 직장가입자와 지역가입자가 함께 있는 가구를 말합니다.
          </p>
          <ul className="text-sm text-blue-800 mt-2 space-y-1">
            <li>4인 혼합가구: 월 건강보험료 합산 <strong>30만원 이하</strong> 기준</li>
            <li>1~3인 및 5인 이상 혼합가구: 공식 표에서 확인되지 않아 콜센터 확인 필요</li>
          </ul>
          <p className="text-sm text-blue-800 mt-2">
            전담 콜센터 <strong>1670-2626</strong> 또는 건강보험공단 <strong>1577-1000</strong>에서 확인하세요.
          </p>
        </CardContent>
      </Card>

      {/* 자산 제외 기준 */}
      <Card className="mb-8 border-amber-200 bg-amber-50/50">
        <CardContent className="pt-5">
          <p className="font-semibold text-amber-900">자산 제외 기준</p>
          <p className="text-sm text-amber-800 mt-1">
            다음 중 한 가지라도 해당하면 가구 전원이 지급 대상에서 제외됩니다.
          </p>
          <ul className="text-sm text-amber-800 mt-2 space-y-1">
            <li>가구원 합산 2025년 재산세 과세표준 <strong>12억원 초과</strong> (공시가 약 26.7억원 수준)</li>
            <li>가구원 합산 2024년 귀속 금융소득 <strong>2,000만원 초과</strong></li>
          </ul>
          <p className="text-sm text-amber-800 mt-3 font-medium">확인 방법</p>
          <ul className="text-sm text-amber-800 mt-1 space-y-1">
            <li>재산세 과세표준: 위택스 홈페이지/앱</li>
            <li>금융소득: 홈택스 홈페이지</li>
          </ul>
        </CardContent>
      </Card>

      {/* 맞벌이/다소득원 특례 */}
      <Card className="mb-8 border-green-200 bg-green-50/50">
        <CardContent className="pt-5">
          <p className="font-semibold text-green-900">맞벌이/다소득원 가구 특례</p>
          <p className="text-sm text-green-800 mt-1">
            가구 내 직장가입자가 여러 명인 경우, &quot;가구원 수 +1명&quot; 기준을 적용합니다.
          </p>
          <p className="text-sm text-green-800 mt-2">
            예) 직장가입자 2인이 포함된 4인 가구
            <br />
            → 일반 4인 기준(32만원) 대신 5인 기준(39만원) 이하 적용
          </p>
        </CardContent>
      </Card>

      {/* 이의신청 안내 */}
      <Card className="mb-8 border-gray-200 bg-gray-50/50">
        <CardContent className="pt-5">
          <p className="font-semibold text-gray-900">대상 여부에 이의가 있다면</p>
          <p className="text-sm text-gray-800 mt-1">
            이의신청 기간은 2026년 5월 18일~7월 17일입니다. 신청 방법과
            세부 안내는{" "}
            <Link href="/faq" className="text-primary underline">
              자주 묻는 질문
            </Link>
            에서 확인하세요.
          </p>
        </CardContent>
      </Card>

      {/* 지역별 지급액 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>지역별 1인당 지급액</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "수도권", amount: SUBSIDY_CONFIG.amounts.metropolitan },
              {
                label: "비수도권 일반",
                amount: SUBSIDY_CONFIG.amounts.nonMetropolitan,
              },
              {
                label: "인구감소 우대",
                amount: SUBSIDY_CONFIG.amounts.depopulationPreferred,
              },
              {
                label: "인구감소 특별",
                amount: SUBSIDY_CONFIG.amounts.depopulationSpecial,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center bg-muted/50 rounded-lg p-4"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-xl font-bold text-primary mt-1">
                  {formatAmount(item.amount)}원
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * 인구감소지역 거주자는 추가 혜택을 받을 수 있습니다.{" "}
            <Link href="/regions" className="text-primary underline">
              89개 지역 확인하기
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* 취약계층 지급 금액 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>취약계층 지급 금액 (1차: 4월 27일~5월 8일)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-3 font-medium">대상</th>
                  <th className="text-right py-3 px-3 font-medium">수도권</th>
                  <th className="text-right py-3 px-3 font-medium">비수도권·인구감소</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-3 font-medium">기초생활수급자</td>
                  <td className="text-right py-3 px-3"><span className="font-bold text-blue-600">55만원</span></td>
                  <td className="text-right py-3 px-3"><span className="font-bold text-blue-600">60만원</span></td>
                </tr>
                <tr className="border-b last:border-0">
                  <td className="py-3 px-3 font-medium">차상위·한부모</td>
                  <td className="text-right py-3 px-3"><span className="font-bold text-blue-600">45만원</span></td>
                  <td className="text-right py-3 px-3"><span className="font-bold text-blue-600">50만원</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * 취약계층은 별도 신청 없이 자동 지급됩니다.
          </p>
        </CardContent>
      </Card>

      {/* 요약 박스 */}
      <div className="bg-[#0369A1]/5 border border-[#0369A1]/20 rounded-lg p-5 mb-8 space-y-2">
        <p className="text-sm font-medium text-foreground">핵심 요약</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>대상: 소득 하위 <span className="text-blue-600 font-bold">70%</span> 가구 (건강보험료 기준)</li>
          <li>1차 지급: <span className="text-blue-600 font-bold">4월 27일~5월 8일</span> (취약계층 자동 지급)</li>
          <li>2차 지급: <span className="text-blue-600 font-bold">5월 18일~7월 3일</span> (일반 가구)</li>
          <li>금액: 일반 1인당 <span className="text-blue-600 font-bold">10만~25만원</span>, 취약계층 <span className="text-blue-600 font-bold">45만~60만원</span></li>
          <li>사용 기한: <span className="text-blue-600 font-bold">8월 31일까지</span> (미사용 시 자동 소멸)</li>
          <li>기준일: <span className="text-blue-600 font-bold">2026년 3월 30일</span> 주민등록상 주소지</li>
        </ul>
      </div>

      {/* 요일제 안내 (4/27 1차 신청) */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">📅 출생연도 끝자리에 따라 신청일이 다릅니다.</span>
          <Link href="/updates/weekly-application-schedule-2026" className="block mt-1 text-amber-900 font-medium underline">
            자세한 일정 확인 →
          </Link>
        </p>
        <p className="text-xs text-amber-800 mt-2">
          📢 4/26 추가 발표: 4/30 통합 운영(끝자리 4·9·5·0) · 등·초본 수수료 면제 · 읍·면 사용처 확장
        </p>
      </div>

      {/* 신청 경로 안내 */}
      <div className="bg-[#0369A1]/5 border border-[#0369A1]/20 rounded-lg p-4 mb-8">
        <p className="text-sm text-muted-foreground">
          신청은 카드사 앱, 지역사랑상품권 앱, 주민센터에서 가능합니다.
          <Link href="/updates/government-official-payment-plan-2026" className="block mt-1 text-[#0369A1] font-medium underline">
            지금 바로 신청 방법을 확인해보세요 →
          </Link>
        </p>
      </div>

      {/* 디스플레이 광고 — 대상 확인 */}
      <div className="my-8">
        <AdSlot slot="1340925456" format="auto" minHeight="280px" />
      </div>

      {/* CTA */}
      <div className="text-center mb-8">
        <Button size="lg" render={<Link href="/calculator" />} className="px-8 py-6 text-base">
            내 예상 지원금 계산하기
            <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 mb-8 text-sm">
        <Link href="/faq" className="text-primary hover:underline">
          고유가 지원금 대상 조건이 헷갈린다면 FAQ 보기 →
        </Link>
        <Link href="/regions" className="text-primary hover:underline">
          지역별 지급 금액 확인 →
        </Link>
        <Link href="/updates" className="text-primary hover:underline">
          고유가 피해지원금 최신 정책 변경 확인 →
        </Link>
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          고유가 피해지원금 전체 정보 보기 →
        </Link>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
