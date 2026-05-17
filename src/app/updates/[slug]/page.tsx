import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { AdSlot } from "@/components/ad-slot";
import { ShareButtons } from "@/components/share-buttons";
import { UPDATES } from "@/data/updates";
import { NoticeBox } from "@/components/notice-box";

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
    alternates: { canonical: `/updates/${slug}` },
  };
}

function generateArticleJsonLd(post: { slug: string; title: string; description: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "다파라코프" },
    publisher: {
      "@type": "Organization",
      name: "FAZR 고유가 피해지원금",
      logo: { "@type": "ImageObject", url: "https://support.fazr.co.kr/og/og-main.jpg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://support.fazr.co.kr/updates/${post.slug}`,
    },
    inLanguage: "ko",
  };
}

export default async function UpdateDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = UPDATES.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJsonLd(post)),
        }}
      />
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

        <ShareButtons title={post.title} />

        {post.notices?.map((notice, idx) => (
          <NoticeBox key={idx} notice={notice} />
        ))}

        {/* 정책 일정 안내 박스 */}
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-5 mb-8 space-y-2">
          <p className="text-sm font-medium text-foreground">정책 일정 안내</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>2차 신청: 2026년 5월 18일 09:00 ~ 7월 3일 18:00</li>
            <li>첫 주 요일제: 5월 18일 ~ 5월 22일 (출생연도 끝자리 기준)</li>
            <li>이의신청: 5월 18일 ~ 7월 17일</li>
            <li>사용기한: 8월 31일까지</li>
            <li>문의: 1670-2626 · 정부합동 민원센터 110 · 건강보험공단 1577-1000</li>
          </ul>
        </div>

        {/* Ad Slot 3 */}
        <div className="my-6">
          <AdSlot slot="7853952826" format="rectangle" />
        </div>

        <div
          className="prose prose-sm max-w-3xl leading-relaxed prose-headings:text-foreground prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:mb-4 prose-li:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:my-4 prose-ul:space-y-2 prose-ol:my-4 prose-ol:space-y-2 prose-hr:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Ad Slot — 멀티플렉스 수평 (본문 끝) */}
      <div className="my-6">
        <AdSlot slot="5972985780" format="autorelaxed" />
      </div>

      <ShareButtons title={post.title} />

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
