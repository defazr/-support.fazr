import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const INTERNAL_SERVICES = [
  { label: "유류비 계산기", href: "https://fuel.fazr.co.kr" },
  { label: "실시간 유가", href: "https://oil.newsforgreens.com" },
  { label: "대출 이자 계산", href: "https://debt.newsforgreens.com" },
  { label: "다른 계산기", href: "https://calc.fazr.co.kr" },
  { label: "지역 뉴스", href: "https://headlines.fazr.co.kr" },
];


export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1단: 사이트 정보 */}
          <div>
            <h3 className="font-bold text-foreground mb-3">
              고유가 피해지원금 안내
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              2026 고유가 피해지원금 대상 확인, 예상 금액 계산, 신청 방법을
              안내하는 정보 허브입니다.
            </p>
            <div className="flex flex-col gap-1 mt-4">
              <Link
                href="/eligibility"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                대상 확인
              </Link>
              <Link
                href="/calculator"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                계산기
              </Link>
              <Link
                href="/regions"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                지역별 안내
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                자주 묻는 질문
              </Link>
              <Link
                href="/updates"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                업데이트
              </Link>
            </div>
          </div>

          {/* 2단: 내부 서비스 링크 */}
          <div>
            <h3 className="font-bold text-foreground mb-3">관련 서비스</h3>
            <div className="flex flex-col gap-1">
              {INTERNAL_SERVICES.map((service) => (
                <a
                  key={service.href}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {service.label}
                </a>
              ))}
            </div>
          </div>

          {/* 3단: 면책 문구 */}
          <div>
            <h3 className="font-bold text-foreground mb-3">안내 사항</h3>
            <p className="text-xs text-muted-foreground leading-relaxed bg-muted/80 p-4 rounded-lg">
              본 사이트는 정부 공식 사이트가 아니며, 안내 정보는 정책 확정 전
              예상 기준으로 변경될 수 있습니다. 정확한 정보는 정부24 또는 관할
              주민센터를 통해 확인하시기 바랍니다.
            </p>
          </div>
        </div>

        <Separator className="my-8" />
        <p className="text-xs text-muted-foreground/60 text-center">
          &copy; {new Date().getFullYear()} support.fazr.co.kr. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
