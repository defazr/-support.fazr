import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SkinnyBar } from "@/components/skinny-bar";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollTopButton } from "@/components/scroll-top-button";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "고유가 피해지원금 - 대상 확인 및 예상 금액 계산",
    template: "%s | 고유가 피해지원금",
  },
  description:
    "2026 고유가 피해지원금 대상 확인, 예상 금액 계산, 신청 방법 안내. 소득 하위 70% 기준, 최대 25만원 지급 예상.",
  metadataBase: new URL("https://support.fazr.co.kr"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "고유가 피해지원금 안내",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <head>
        {/* GA4 placeholder — replace GA_MEASUREMENT_ID when ready */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SkinnyBar />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}
