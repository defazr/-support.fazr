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

export const metadata: Metadata = {
  title: "자주 묻는 질문 - 고유가 피해지원금 FAQ",
  description:
    "고유가 피해지원금 신청 방법, 대상 기준, 맞벌이 가능 여부, 1인 가구 지원금, K패스 연계, 금리인하 등 자주 묻는 질문 총정리.",
};

const FAQ_SECTIONS = [
  {
    title: "신청 및 자격",
    items: [
      {
        q: "고유가 피해지원금은 언제 신청할 수 있나요?",
        a: "현재 국회 추경 심사 중이며, 예산 확정 후 정부24를 통해 신청할 수 있을 것으로 예상됩니다. 확정 시 즉시 안내드리겠습니다.",
      },
      {
        q: "고유가 피해지원금 신청 방법은 어떻게 되나요?",
        a: "정부24(gov.kr) 온라인 신청이 기본이며, 오프라인으로는 관할 주민센터에서 신청할 수 있을 것으로 예상됩니다. 정확한 신청 절차는 정책 확정 후 안내될 예정입니다.",
      },
      {
        q: "맞벌이 가구도 받을 수 있나요?",
        a: "가구 단위로 합산 소득 기준을 적용할 것으로 예상됩니다. 맞벌이 가구의 경우 합산 건강보험료가 기준 이하이면 대상이 됩니다. 정확한 기준은 정책 확정 시 안내됩니다.",
      },
      {
        q: "1인 가구도 고유가 지원금을 받을 수 있나요?",
        a: "네, 1인 가구도 대상입니다. 1인 가구 기준 직장가입자 월 건강보험료 약 185,400원 이하, 지역가입자 약 12,500원 이하일 경우 지원 대상으로 예상됩니다.",
      },
      {
        q: "외국인도 받을 수 있나요?",
        a: "대한민국 국적 보유자가 기본 대상이며, 영주권자 등 일부 외국인 포함 여부는 정책 확정 시 결정될 예정입니다.",
      },
    ],
  },
  {
    title: "지급 방식 및 금액",
    items: [
      {
        q: "고유가 피해지원금은 어떤 방식으로 지급되나요?",
        a: "현금, 지역사랑상품권, 카드 충전 등 다양한 방식이 검토 중입니다. 이전 긴급생활지원금 사례를 참고하면 계좌 이체 또는 선불카드 방식이 유력합니다.",
      },
      {
        q: "지원금은 1인당 금액인가요, 가구당 금액인가요?",
        a: "1인당 금액입니다. 예를 들어 수도권 4인 가구의 경우 1인당 10만원 × 4인 = 40만원이 예상 총 지원금입니다.",
      },
      {
        q: "인구감소지역에 살면 얼마나 더 받나요?",
        a: "인구감소 우대지역은 1인당 20만원, 특별지역은 1인당 25만원으로 예상됩니다. 일반 비수도권(15만원) 대비 5~10만원 더 받을 수 있습니다. 89개 해당 지역은 지역별 안내에서 확인하세요.",
      },
    ],
  },
  {
    title: "취약계층 추가 지원",
    items: [
      {
        q: "차상위·한부모 가구는 더 많이 받을 수 있나요?",
        a: "네, 차상위·한부모 가구는 수도권 1인당 45만원, 비수도권 1인당 50만원으로 일반 가구보다 더 많은 지원금이 예상됩니다.",
      },
      {
        q: "기초생활보장 수급자는 얼마나 받나요?",
        a: "기초생활보장 수급자는 수도권 1인당 55만원, 비수도권 1인당 60만원으로 가장 높은 지원금이 예상됩니다. 별도 신청 없이 자동 지급될 가능성이 있으나, 정책 확정 시 안내됩니다.",
      },
    ],
  },
  {
    title: "관련 제도 안내",
    items: [
      {
        q: "K패스와 연계되는 혜택이 있나요?",
        a: "K패스(구 알뜰교통카드)는 대중교통 이용 시 마일리지를 적립해주는 별도 제도입니다. 고유가 피해지원금과 직접적인 연계는 아니지만, 유류비 절감 목적이 같으므로 함께 활용하면 교통비를 더 줄일 수 있습니다.",
      },
      {
        q: "금리인하 요구권과 관련이 있나요?",
        a: '금리인하 요구권은 소득이 줄거나 신용이 개선되었을 때 은행에 대출금리 인하를 요청할 수 있는 제도입니다. 고유가로 인한 가계 부담 완화를 위해 함께 활용할 수 있습니다. 자세한 내용은 <a href="https://debt.newsforgreens.com" target="_blank" rel="noopener noreferrer" class="text-primary underline">대출 이자 줄이는 법</a>에서 확인하세요.',
      },
      {
        q: "고유가 피해지원금 vs 긴급생활지원금, 차이가 뭔가요?",
        a: "긴급생활지원금은 코로나19 등 비상 상황에서 전 국민 또는 소득 하위 계층에 지급되었던 지원금입니다. 고유가 피해지원금은 유류비 상승에 따른 가계 부담 경감을 목적으로 하며, 지역별 차등 지급이 특징입니다.",
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

      <DisclaimerBanner />
    </div>
  );
}
