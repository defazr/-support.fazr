# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.

## 마지막 세션: 2026-04-23

### 프로젝트 상태: ✅ 운영 중 + 취약계층 박스 + 속보 + 슬롯 10개

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **총 페이지**: 108개

### 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — asChild 없음, render prop 사용)
- Pretendard 폰트 (CDN)
- ui-ux-pro-max-skill 설치됨

### 환경변수 (Vercel)

| 변수 | 값 | 상태 |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-GQTTM24X4D` | ✅ 활성 (next/script) |
| `NEXT_PUBLIC_ADSENSE_PUB_ID` | `pub-7976139023602789` | ✅ 활성 (next/script + afterInteractive, 2026-04-20 수정) |

**중요**: NEXT_PUBLIC_ 변수는 빌드 타임. 추가/변경 후 `vercel --prod --yes` 재배포 필수.

### AdSense 정상화 (2026-04-20)

- **ads.txt**: `public/ads.txt` 1줄 추가 → `https://support.fazr.co.kr/ads.txt` 200 OK
  - `google.com, pub-7976139023602789, DIRECT, f08c47fec0942fa0`
- **AdSense 스크립트 로드 패턴**: 원시 `<script async>` (head) → `<Script strategy="afterInteractive">` (body, GA 옆)
  - 원인: hydration 전 실행 → Auto Ads(앵커·전면)가 React 마운트 ins 슬롯 못 찾음
  - 수정 파일: `src/app/layout.tsx` 1파일 1블록
  - 무관 영역: ad-slot.tsx 수동 10개 슬롯, vignette-cleanup.tsx, pub ID, 슬롯 ID

### 광고 슬롯 (10개) — 4/23 업데이트

| 위치 | 슬롯 ID | 타입 |
|---|---|---|
| 홈 Key Stats 아래 | 3245068480 | 인아티클 (fluid + in-article) |
| 홈 Hero 아래 | 4106279506 | 디스플레이 |
| Calculator 결과 아래 | 1480116169 | 디스플레이 |
| Calculator 기준표 위 | 4342527732 | 디스플레이 |
| Updates 글 중간 | 7853952826 | 디스플레이 |
| Updates 본문 끝 | 5972985780 | 멀티플렉스 수평 |
| Eligibility 기준표 아래 | 1340925456 | 디스플레이 |
| Regions/[slug] CTA 아래 | 9027843789 | 디스플레이 |
| FAQ 하단 | 8171712676 | 멀티플렉스 |
| Updates 목록 중간 | 9379409604 | 멀티플렉스 |

### 핵심 컴포넌트

- **VignetteCleanup** (`vignette-cleanup.tsx`): Vignette 자동 광고 body 잔류 정리. MutationObserver. **건드리지 마라.**
- **AdSlot** (`ad-slot.tsx`): 디스플레이 + 멀티플렉스 + 인아티클 통합. format/layout/minHeight prop. fluid 포맷 + layout prop 4/23 추가.
- **ShareButtons** (`share-buttons.tsx`): 모바일 navigator.share() / PC 네이버·X·페북·링크복사
- **GovLinkButton** (`gov-link-button.tsx`): 현재 active:false. calculator/regions에서 제거됨 → 내부 링크로 교체 완료.
- **SkinnyBar** (`skinny-bar.tsx`): "use client". `src/data/banner.ts`에서 단일 객체 import. 자동 전환 로직 없음.

### FAZR 브랜드 (2026-04-16 추가)

- 헤더: "FAZR" 라벨 (사이트명 좌측, text-xs muted)
- 홈: "FAZR에서 제공하는 고유가 피해지원금 안내 서비스입니다"
- 계산기: "FAZR에서 제공하는 고유가 피해지원금 계산 서비스입니다"
- 푸터: 사업자 정보 블록 (다파라코프, 208-09-27644)
- 카피라이트: © 2026 다파라코프 (eitc.fazr와 통일)

### Playwright MCP

- 설치 완료. 시각 검증 워크플로 확립.
- 모든 UI 수정 후 Playwright 스크린샷 검증 포함 원칙.

### 콘텐츠 현재 상태 (2026-04-23)

- 추경: **통과 확정** (4/10 본회의) + **정부 공식 발표** (4/11)
- subsidy.ts status: "확정"
- Hero 배지: "4월 27일 지급 시작"
- 스키니바: **"국민비서 알림 신청 시작 (4월 20일) — 신청 시작일 미리 받아보세요"** → /updates/government-assistant-notification-2026
- gov-links.ts: **active=false**
- updates 글 **9개** (카드사안내 + 국민비서알림 + 지급수단가이드 + 속보-정부발표 + 속보-추경통과 + 지급안내 + 신청방법 + 인구감소지역 + 기존 1개)
- 홈 취약계층 박스: Card 4장 + /eligibility 링크 + "자동 지급 대상" 라벨 (4/23 추가)
- "정부24" 표현: **사이트 전체 제거** (면책 조항만 "정부 공식 사이트 아님")
- 날짜: 전부 확정형 (4월 27일, 5월 18일, 8월 31일)
- 건보료 컷오프: "5월 중 발표 예정" 유지 (미확정)
- FAQ: **20개 항목**
- 국민비서: 4채널 명시 (ips.go.kr / 네이버앱 / 카카오톡 / 토스)

### SEO 메타 (2026-04-18 적용)

| 페이지 | title | canonical |
|---|---|---|
| 홈 | 고유가 피해지원금 대상 조회·계산기｜내가 받을 금액 바로 확인 | https://support.fazr.co.kr |
| /calculator | 고유가 피해지원금 계산기｜대상 확인 + 지원금 금액 바로 확인 | https://support.fazr.co.kr/calculator |
| /eligibility | 고유가 피해지원금 대상 확인｜행안부 발표 기준 반영 (2026) | https://support.fazr.co.kr/eligibility |

- 홈 메타: `src/app/page.tsx`에 신설 (layout.tsx 폴백 보존)
- OG/Twitter 카드: 3페이지 개별 적용
- OG 이미지: 3페이지 모두 og-main.jpg (4/22 수정)

### calculator 버튼 UX (2026-04-18 적용, 4/22 보강)

- disabled 조건 제거 → 버튼 항상 활성화
- 미입력 필드 순차 검증 + 인라인 에러 (text-red-600 text-sm font-medium, 4/22 강화)
- scrollIntoView(block: center) + Input만 focus
- onChange 에러 자동 리셋

### UX 마이크로 개선 (2026-04-22 적용)

**홈 (page.tsx)**:
- CTA 버튼: "내가 받을 수 있을까?" → "3초 계산으로 금액 확인하기" (2곳)
- Key Stats 카드 4장: 정적 → Link /regions 연결 + hover:shadow-md

**calculator (calculator/page.tsx)**:
- 계산 버튼 아래 체류 유도 블록: "아직 계산 안 하셨나요?" + outline 버튼 → /eligibility
  - `{!result && (...)}` 조건부 렌더링 (계산 후 숨김)
- 신청 경로 문구: "언제, 어떻게 받는지 전체 확인하기"
- 보조 설명 3곳: text-xs → text-sm (모바일 가독성)
- 작업1 블록: mt-8 + text-slate-600 (여백+대비)
- 결과 자동 스크롤: useRef + resultRef → 계산 후 scrollIntoView (smooth, block: start)
- 진입 시 scrollTo(0,0): useEffect 마운트 시 강제 상단 (Vignette 광고 하단 고착 해결)

### 디자인 시스템

- `design-system/고유가-피해지원금/MASTER.md`
- Primary: #0369A1 (딥블루), Background: #F8FAFC, Text: #020617
- Pretendard, Accessible & Ethical (WCAG AAA)

### 주의사항

1. **body/html에 높이 클래스 금지** — h-full, min-h-full, min-h-screen 넣으면 iOS 스크롤 버그 재발
2. **SSOT 전부 확인** — 항목 누락 금지. 타 제도 용어 혼입 주의 (예: 근로장려금)
3. **아닌 건 말해라** — 지시서가 와도 문제 보이면 의견 제시
4. **GA4 + AdSense = next/script + strategy="afterInteractive"** — 원시 `<script async>` 금지 (hydration 전 실행되어 Auto Ads 망가짐)
5. **구조 변경 금지** — CSS 클래스만 수정
6. **VignetteCleanup 건드리지 마라** — 자동 광고 충돌 방지 핵심
7. **"정부24" 사용 금지** — 실제 신청 채널 아님
8. **Vercel env** — printf로 줄바꿈 없이 추가, 변경 후 재배포 필수
9. **검증 필수** — 수정 후 grep + curl로 라이브 사이트 확인 (캐시 미스 시 캐시버스터 사용)
10. **calculator 로직 수정 금지** — 데이터만 교체, 로직 변경은 사용자 확인 후
11. **스키니바 자동 전환 금지** — 수동 텍스트 교체만. 4/27에 다시 변경 필요.
12. **YMRL 미확정 수치 인용 시** — 반드시 "확정 전 추정치"/"발표 예정" 명시
13. **브랜치 전략** — main 기준 새 브랜치에 단일 목적 1 커밋만. 과거 브랜치 재사용 금지.
14. **외부 스크립트 추가 시 ads.txt 필수 동시 추가** — AdSense 수익 직격

### 다음 작업 후보

1. **4/25**: GPT 효과 분석 + 4/27 전환 설계 + calculator 취약계층 로직 설계
2. **4/26**: 4/27 통합 지시서 작성
3. **4/27**: 1차 지급 시작 대응 (스키니바 + Hero + status + 요일제 안내)
4. **5월 초**: 건보료 컷오프 발표 반영
5. calculator 취약계층 로직 보완 (vulnerableAmounts 분기 — 4/25~26 통합)
6. 전담 콜센터 번호 확정 시 FAQ Q18 업데이트
7. GA4 + AdSense 수익 지표 비교
8. 검색 유입 키워드 분석 → 콘텐츠 확장
