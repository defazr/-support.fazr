import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { AdSlot } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "고유가 피해지원금 자주 묻는 질문｜지급 대상·금액·신청 방법 총정리",
  description:
    "고유가 피해지원금 지급 대상은 누구? 소득 하위 70% 기준, 1인당 10~60만원, 4/27 신청 시작. 맞벌이·1인 가구·미성년자 지원 여부까지 한 번에 확인하세요.",
  alternates: { canonical: "/faq" },
};

const FAQ_SECTIONS = [
  {
    title: "대상 및 자격",
    items: [
      {
        q: "고유가 피해지원금 대상은 누구인가요?",
        a: '<p class="font-semibold text-slate-900 mb-3">📌 한 줄 요약: 2007년 12월 31일 이전 출생자 중 소득 하위 70%에 해당하는 약 4,400만 명이 지급 대상입니다 (2026년 행정안전부 기준).</p>소득 하위 70% 가구가 대상입니다. 건강보험료 납부액을 기준으로 선별되며, 4인 가구 기준 월 소득 약 974만원 이하가 해당됩니다. 건강보험료 컷오프 기준은 5월 중 발표 예정입니다. <a href="/eligibility" class="text-primary underline">대상 기준 자세히 보기</a>',
      },
      {
        q: "1인 가구도 고유가 피해지원금 받을 수 있나요?",
        a: "네, 1인 가구도 소득 하위 70%에 해당하면 대상입니다. 1인 가구 기준 월 소득 약 385만원 이하, 직장가입자 건강보험료 약 185,400원 이하가 예상 기준이나, 이는 확정 전 추정치입니다. 정확한 건강보험료 컷오프 기준은 5월 중 발표 예정이므로 반드시 확정 발표를 확인하시기 바랍니다.",
      },
      {
        q: "맞벌이도 고유가 피해지원금 받을 수 있나요?",
        a: "맞벌이 가구도 부부 합산 건강보험료가 하위 70% 기준 이내라면 대상에 포함됩니다. 가구원 수 대비 보험료 납부액으로 판정됩니다.",
      },
      {
        q: "직장인도 고유가 피해지원금을 받을 수 있나요?",
        a: "받을 수 있습니다. 고유가 피해지원금은 직업이 아니라 소득 기준으로 판단합니다. 소득 하위 70%에 해당하면 직장인도 지급 대상입니다. 대상 여부는 건강보험료 납부액 기준으로 산정되며, 구체적인 컷오프 기준은 5월 중 발표 예정입니다.",
      },
      {
        q: "고유가 피해지원금 대상이 아닌 경우도 있나요?",
        a: "소득 상위 30%에 해당하면 대상에서 제외됩니다. 건강보험료 납부액이 기준을 초과하는 경우가 이에 해당합니다. 건강보험료 컷오프 기준은 5월 중 발표 예정입니다.",
      },
      {
        q: "재산 기준이 따로 있나요?",
        a: "고유가 피해지원금은 건강보험료 납부액을 기준으로 대상 여부를 판단합니다. 별도의 재산 기준(부동산·금융자산 등)은 현재 공식적으로 발표된 바 없습니다.<br /><br />다만 지역가입자의 경우 건강보험료 산정 시 소득뿐만 아니라 재산(주택, 토지 등)과 자동차가 점수로 반영됩니다. 따라서 재산이 많으면 건강보험료 자체가 높아져 지원 대상에서 제외될 수 있습니다.<br /><br />고액 자산가 제외 여부 등 세부 지침은 5월 중 추가 발표 예정입니다.",
      },
      {
        q: "부모님 집에 같이 살면 받을 수 없나요?",
        a: "부모님과 건강보험 가구원으로 묶여 있는 경우 건강보험료가 합산되어 판단됩니다. 합산 건보료가 기준을 초과하면 대상에서 제외될 수 있습니다.<br /><br />다만 주소가 같더라도 건강보험료를 별도로 납부하고 있다면 각각의 가구로 인정받아 대상에 포함될 수 있습니다.",
      },
      {
        q: "미성년자도 받을 수 있나요?",
        a: "미성년자의 지원금은 주민등록표상 세대주가 통합하여 신청·수령합니다. 성인 구성원이 없고 미성년자가 세대주인 경우에 한해, 세대주인 미성년자 본인이 직접 신청할 수 있습니다.",
      },
    ],
  },
  {
    title: "금액 및 지급",
    items: [
      {
        q: "고유가 피해지원금 얼마 받나요?",
        a: '거주 지역에 따라 1인당 10만~25만원이 차등 지급됩니다. 수도권 10만원, 비수도권 15만원, 인구감소 우대지역 20만원, 특별지역 25만원입니다. 취약계층은 45만~60만원입니다. <a href="/calculator" class="text-primary underline">예상 금액 계산하기</a>',
      },
      {
        q: "고유가 피해지원금 언제 지급되나요?",
        a: "1차로 기초생활수급자·차상위계층에 4월 27일부터 자동 지급되고, 2차로 일반 가구에 5월 18일부터 지급됩니다. 사용 기한은 8월 31일까지입니다.",
      },
      {
        q: "고유가 피해지원금 사용처 제한이 있나요?",
        a: '매출액 30억원 이하 소상공인 매장에서 사용 가능합니다. 전통시장, 동네마트, 식당, 약국, 미용실, 프랜차이즈 가맹점(편의점·카페·치킨집 등)이 가능합니다. 프랜차이즈 직영점, 대형마트·백화점, 온라인쇼핑몰은 사용 불가입니다. 배달앱 결제는 불가하나, 가맹점 자체 단말기로 대면결제 시 사용 가능합니다. 사용 기한은 8월 31일까지이며, 미사용 시 자동 소멸됩니다. <a href="/regions" class="text-primary underline">지역별 금액 확인</a>',
      },
      {
        q: "주유소에서 고유가 피해지원금을 쓸 수 있나요?",
        a: '대부분의 주유소에서는 사용할 수 없는 경우가 많습니다. 주유소는 연매출 30억원 이하만 사용 가능한데, 상당수 주유소가 이 기준을 초과하는 것으로 나타나 현장에서 사용이 제한적인 경우가 많습니다. 또한 지급 수단에 따라 사용 조건이 달라집니다. 지역사랑상품권으로 받은 경우 상품권 가맹 주유소에서만 사용 가능하며, 지역에 따라 가맹 주유소가 매우 적거나 없는 곳도 있습니다. 주유를 주요 목적으로 한다면 지급 수단 선택 시 반드시 확인하세요. <a href="/updates/oil-subsidy-usage-guide-2026" class="text-primary underline">사용처 자세히 보기</a>',
      },
      {
        q: "카드와 지역사랑상품권 중 어떤 것으로 받는 게 좋은가요?",
        a: '사용 목적에 따라 다릅니다. 지급 수단에 따라 사용 가능한 범위가 달라지기 때문에 평소 사용 패턴을 먼저 확인하시는 것이 좋습니다. 주유 목적이 있는 경우 카드로 받아도 대부분의 주유소에서는 사용할 수 없는 경우가 많습니다. 거주 지역 내 사용 가능한 주유소가 있는지 반드시 미리 확인하세요. 동네 마트·식당·편의점 중심이라면 둘 다 적합합니다. 평소 지역사랑상품권을 자주 쓰는 경우 상품권이 편리할 수 있습니다. 주요 사용 목적(주유, 식비 등)이 있다면 지급 수단 선택 시 이를 반드시 고려하세요. <a href="/updates/oil-subsidy-usage-guide-2026" class="text-primary underline">지급 수단별 비교 보기</a>',
      },
    ],
  },
  {
    title: "신청 방법",
    items: [
      {
        q: "지금 바로 신청할 수 있나요?",
        a: '아직 지원금 신청은 시작되지 않았습니다.<br /><br />지원금 신청 일정:<br />- 1차 (취약계층): 4월 27일~5월 8일<br />- 2차 (일반 70%): 5월 18일~7월 3일<br /><br />다만 4월 20일부터 국민비서 알림서비스에서 사전 알림을 신청할 수 있습니다. 국민비서 누리집(<a href="https://ips.go.kr" target="_blank" rel="noopener noreferrer" class="text-primary underline">ips.go.kr</a>), 네이버앱, 카카오톡, 토스에서 신청 가능하며, 신청 시작일과 예상 금액을 미리 안내받을 수 있습니다.',
      },
      {
        q: "고유가 지원금 신청 방법은 어떻게 되나요?",
        a: "온라인은 카드사 앱·홈페이지·콜센터·ARS, 지역사랑상품권 앱에서 24시간 신청 가능합니다. 오프라인은 카드 연계 은행 영업점(16시까지), 읍면동 행정복지센터(18시까지)에서 신청합니다. 첫 주는 출생연도 끝자리 기준 요일제로 운영됩니다. 취약계층(기초생활수급자·차상위·한부모)은 별도 신청 없이 자동 지급됩니다.",
      },
      {
        q: "차상위·기초생활수급자는 고유가 지원금 얼마 받나요?",
        a: "일반 가구보다 더 많이 받습니다. 차상위·한부모 가구는 1인당 45만원(수도권)~50만원(비수도권), 기초생활수급자는 1인당 55만원(수도권)~60만원(비수도권)이 지급됩니다. 별도 신청 없이 4월 27일부터 자동 지급됩니다.",
      },
      {
        q: "1차 신청 기간을 놓치면 어떻게 되나요?",
        a: "2차 기간에 신청할 수 있습니다. 1차 기간(4월 27일~5월 8일)에 신청하지 못한 경우에도 2차 기간(5월 18일~7월 3일)에 신청하면 동일한 금액을 지급받을 수 있습니다.<br /><br />취약계층(기초생활수급자·차상위·한부모)은 별도 신청 없이 자동 지급 대상이나, 계좌 정보 불일치 등으로 지급받지 못한 경우 2차 기간에 직접 신청할 수 있습니다.<br /><br />다만 마감일(7월 3일 18시) 이후에는 신청이 불가능하므로 기한 내 반드시 확인하시기 바랍니다.",
      },
      {
        q: "기준일 이후 이사한 경우 어디서 신청하나요?",
        a: "기준일 당시 주소지 기준으로 신청합니다. 2026년 3월 30일 기준 주민등록상 주소지 관할 지자체에서 신청해야 합니다. 기준일 이후 이사하여 주소지가 바뀐 경우에도 기준일 당시 주소지 기준입니다. 주소 변경으로 인한 조정이 필요한 경우 이의신청 절차를 통해 조정할 수 있습니다.",
      },
      {
        q: "문의는 어디로 하나요?",
        a: "국민콜 110 또는 고유가 피해지원금 전담 콜센터(4월 중 개설)로 연락하세요.",
      },
    ],
  },
  {
    title: "추가 혜택",
    items: [
      {
        q: "고유가 지원금 외에 다른 혜택도 있나요?",
        a: '유류세 인하(휘발유 약 57원/L, 경유 약 58원/L)와 K패스 환급률 상향(일반 20→30%, 저소득층 53→83%)이 함께 시행됩니다. 유가·물가 부담으로 채무 상환이 어려워졌다면 <a href="https://debt.newsforgreens.com/" target="_blank" rel="noopener noreferrer" class="text-primary underline">개인회생 진단</a>을 통해 상환 계획을 점검해볼 수 있습니다.',
      },
    ],
  },
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function generateFaqJsonLd() {
  const allItems = FAQ_SECTIONS.flatMap((section) => section.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.a),
      },
    })),
  };
}

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqJsonLd()),
        }}
      />
      <div className="text-center mb-10">
        <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">자주 묻는 질문</h1>
        <p className="text-muted-foreground mt-2">
          고유가 피해지원금에 대해 궁금한 점을 정리했습니다
        </p>
      </div>

      {FAQ_SECTIONS.map((section) => (
        <div key={section.title} className="mb-8">
          <h2 className="text-lg font-bold mb-3">{section.title}</h2>
          <Accordion className="space-y-2">
            {section.items.map((item, idx) => (
              <AccordionItem
                key={idx}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      {/* CTA */}
      <div className="text-center mb-8">
        <Button size="lg" render={<Link href="/calculator" />} className="px-8">
            내 예상 지원금 계산하기
            <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Internal traffic */}
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100">
        <CardContent className="flex items-center gap-4 py-5">
          <div className="flex-1">
            <p className="font-semibold">개인회생 진단</p>
            <p className="text-sm text-muted-foreground">
              유가·물가 부담으로 채무 상환이 어렵다면 점검해보세요
            </p>
          </div>
          <a
            href="https://debt.newsforgreens.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              확인하기
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* 멀티플렉스 광고 — FAQ 하단 */}
      <div className="my-8">
        <AdSlot slot="8171712676" format="autorelaxed" minHeight="600px" />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 mb-8 text-sm">
        <Link href="/updates" className="text-primary hover:underline">
          고유가 피해지원금 최신 정책 변경 확인 →
        </Link>
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          전체 지원금 안내 다시 보기 →
        </Link>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
