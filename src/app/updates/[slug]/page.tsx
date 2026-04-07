import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { UPDATES } from "@/data/updates";

export function generateStaticParams() {
  return UPDATES.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = UPDATES.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function UpdateDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = UPDATES.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/updates"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        전체 업데이트
      </Link>

      <article>
        <Badge variant="secondary" className="mb-3">
          <Clock className="h-3 w-3 mr-1" />
          {post.date}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-6">{post.description}</p>

        {/* 요약 박스 */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-8 space-y-2">
          <p className="text-sm font-medium text-foreground">핵심 요약</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>현재 상태: 국회 추경 심사 중</li>
            <li>예상 지급: 확정 후 2~4주 내</li>
            <li>예상 금액: 1인당 10~25만원 (지역별 차등)</li>
          </ul>
        </div>

        <div
          className="prose prose-sm max-w-prose leading-relaxed prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-p:text-muted-foreground prose-p:mb-4 prose-li:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:my-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mt-10 mb-8">
        <Button render={<Link href="/calculator" />} className="gap-2">
            <Calculator className="h-4 w-4" />내 예상 지원금 계산하기
        </Button>
        <Button variant="outline" render={<Link href="/regions" />} className="gap-2">
            지역별 안내 보기
            <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
