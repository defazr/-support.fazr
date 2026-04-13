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
  title: "자주 묻는 질문 - 고유가 피해지원금 FAQ",
  description:
    "고유가 피해지원금 신청 방법, 대상 기준, 맞벌이 가능 여부, 1인 가구 지원금, K패스 연계, 금리인하 등 자주 묻는 질문 총정리.",
  alternates: { canonical: "/faq" },
};

const FAQ_SECTIONS = [
  {
    title: "대상 및 자격",
    items: [
      {
        q: "고유가 피해지원금 대상은 누구인가요?",
        a: '소득 하위 70% 가구가 대상입니다. 건강보험료 납부액을 기준으로 선별되며, 4인 가구 기준 월 소득 약 974만원 이하가 해당됩니다. 건강보험료 컷오프 기준은 5월 중 발표 예정입니다. <a href="/eligibility" class="text-primary underline">대상 기준 자세히 보기</a>',
      },
      {
        q: "1인 가구도 고유가 피해지원금 받을 수 있나요?",
        a: "네, 1인 가구도 소득 하위 70%에 해당하면 대상입니다. 1인 가구 기준 월 소득 약 385만원 이하, 직장가입자 건강보험료 약 185,400원 이하가 예상 기준입니다.",
      },
      {
        q: "맞벌이도 고유가 피해지원금 받을 수 있나요?",
        a: "맞벌이 가구도 부부 합산 건강보험료가 하위 70% 기준 이내라면 대상에 포함됩니다. 가구원 수 대비 보험료 납부액으로 판정됩니다.",
      },
      {
        q: "고유가 피해지원금 대상이 아닌 경우도 있나요?",
        a: "소득 상위 30%에 해당하면 대상에서 제외됩니다. 건강보험료 납부액이 기준을 초과하는 경우가 이에 해당합니다. 건강보험료 컷오프 기준은 5월 중 발표 예정입니다.",
      },
      {
        q: "재산 기준은 실거래가인가요? 공시가격인가요?",
        a: "재산은 실거래가가 아니라 공시가격 기준으로 판단됩니다. 주택의 경우 국세청이 고시한 공시가격을 기준으로 재산이 산정됩니다. 전세는 간주전세금, 금융자산은 잔액 기준으로 평가됩니다.",
      },
      {
        q: "부모님 집에 같이 살면 받을 수 없나요?",
        a: "주민등록상 같은 주소로 함께 거주하는 경우 부모님의 재산이 합산되어 판단됩니다. 따라서 재산 기준을 초과하면 지급 대상에서 제외될 수 있습니다. 다만 세대가 분리되어 있다면 별도 가구로 인정될 수 있습니다.",
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
        a: '연매출 30억원 이하 소상공인 매장에서 사용할 수 있습니다. 전통시장, 동네마트, 식당, 카페 등이 가능하며, 대형마트·백화점·온라인쇼핑몰·유흥업종은 사용 불가입니다. 사용 기한은 8월 31일까지이며, 미사용 시 자동 소멸됩니다. <a href="/regions" class="text-primary underline">지역별 금액 확인</a>',
      },
    ],
  },
  {
    title: "신청 방법",
    items: [
      {
        q: "고유가 지원금 신청 방법은 어떻게 되나요?",
        a: "온라인은 카드사 앱·홈페이지·콜센터·ARS, 지역사랑상품권 앱에서 24시간 신청 가능합니다. 오프라인은 카드 연계 은행 영업점(16시까지), 읍면동 행정복지센터(18시까지)에서 신청합니다. 첫 주는 출생연도 끝자리 기준 요일제로 운영됩니다. 취약계층(기초생활수급자·차상위·한부모)은 별도 신청 없이 자동 지급됩니다.",
      },
      {
        q: "차상위·기초생활수급자는 고유가 지원금 얼마 받나요?",
        a: "일반 가구보다 더 많이 받습니다. 차상위·한부모 가구는 1인당 45만원(수도권)~50만원(비수도권), 기초생활수급자는 1인당 55만원(수도권)~60만원(비수도권)이 지급됩니다. 별도 신청 없이 4월 27일부터 자동 지급됩니다.",
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
            <p className="font-semibold">대출 이자 줄이는 법</p>
            <p className="text-sm text-muted-foreground">
              금리인하 요구권 활용으로 이자 부담을 줄여보세요
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
