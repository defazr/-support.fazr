# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.

## 마지막 세션: 2026-04-27

### 프로젝트 상태: ✅ 운영 중 + 1차 신청 진행중 (4/27~5/8)

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **Ignored Build Step**: `git diff --quiet HEAD^ HEAD -- ':!*.md' ':!docs/'` (4/27 설정 — .md만 변경 시 빌드 스킵)
- **총 페이지**: 109개

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

- **NoticeBox** (`notice-box.tsx`): 4/27 신규. shadcn Card 기반. amber 톤. notices?: Notice[] 옵셔널로 글별 렌더. prose 밖 배치 (li margin 충돌 회피).
- **VignetteCleanup** (`vignette-cleanup.tsx`): Vignette 자동 광고 body 잔류 정리. MutationObserver. **건드리지 마라.**
- **AdSlot** (`ad-slot.tsx`): 디스플레이 + 멀티플렉스 + 인아티클 통합. format/layout/minHeight prop. pubId 없으면(로컬) 90px placeholder div.
- **ShareButtons** (`share-buttons.tsx`): 모바일 navigator.share() / PC 네이버·X·페북·링크복사
- **SkinnyBar** (`skinny-bar.tsx`): "use client". `src/data/banner.ts`에서 단일 객체 import.

### 4/27 구조 변경 사항

- **NoticeBox 컴포넌트화**: updates.ts의 raw HTML amber 박스 → notices 배열 + NoticeBox 컴포넌트 분리. 신규 글 1건만 적용. 다른 글 9개는 기존 raw HTML 유지.
- **prose max-w-3xl**: [slug]/page.tsx에서 max-w-prose(65ch) → max-w-3xl(768px). 부모 컨테이너와 동일 폭 통일. 한국어 가독성 OK.
- **요약 박스 mt-6**: 공유 버튼-요약 박스 간격 확보.
- **.vercelignore**: *.md 빌드 업로드 제외 (빌드 트리거 차단은 Ignored Build Step에서 처리).
- **Ignored Build Step**: Vercel Dashboard에서 설정. .md만 변경 시 빌드 스킵.

### FAZR 브랜드 (2026-04-16 추가)

- 헤더: "FAZR" 라벨 (사이트명 좌측, text-xs muted)
- 홈: "FAZR에서 제공하는 고유가 피해지원금 안내 서비스입니다"
- 계산기: "FAZR에서 제공하는 고유가 피해지원금 계산 서비스입니다"
- 푸터: 사업자 정보 블록 (다파라코프, 208-09-27644)

### 콘텐츠 현재 상태 (2026-04-27)

- 추경: **통과 확정** (4/10 본회의) + **정부 공식 발표** (4/11)
- subsidy.ts status: **"신청중"**
- Hero 배지: **"1차 신청 진행중 (4/27~5/8)"**
- 스키니바: **"1차 신청 진행중 (4/27~5/8) — 출생연도별 신청일 확인"** → /updates/weekly-application-schedule-2026
- eligibility: **요일제 안내 amber 박스** + "4/26 추가 발표" 1줄
- calculator: **요일제 안내 amber 박스** + "4/26 추가 발표" 1줄
- 신규 글 상단: **NoticeBox** (4/26 행안부 추가 발표 4항목 — 4/30 통합, 근로자의 날, 등초본 수수료, 읍면 사용처)
- updates 글 **10개**
- FAQ: **20개 항목**
- 건보료 컷오프: "5월 중 발표 예정" 유지 (미확정)

### SEO 메타 (2026-04-18 적용)

| 페이지 | title | canonical |
|---|---|---|
| 홈 | 고유가 피해지원금 대상 조회·계산기｜내가 받을 금액 바로 확인 | https://support.fazr.co.kr |
| /calculator | 고유가 피해지원금 계산기｜대상 확인 + 지원금 금액 바로 확인 | https://support.fazr.co.kr/calculator |
| /eligibility | 고유가 피해지원금 대상 확인｜행안부 발표 기준 반영 (2026) | https://support.fazr.co.kr/eligibility |

### 디자인 시스템

- `design-system/고유가-피해지원금/MASTER.md`
- Primary: #0369A1 (딥블루), Background: #F8FAFC, Text: #020617
- Pretendard, Accessible & Ethical (WCAG AAA)

### 주의사항

1. **body/html에 높이 클래스 금지** — h-full, min-h-full, min-h-screen 넣으면 iOS 스크롤 버그 재발
2. **SSOT 전부 확인** — 항목 누락 금지. 타 제도 용어 혼입 주의
3. **아닌 건 말해라** — 지시서가 와도 문제 보이면 의견 제시
4. **GA4 + AdSense = next/script + strategy="afterInteractive"** — 원시 `<script async>` 금지
5. **구조 변경 금지** — CSS 클래스만 수정
6. **VignetteCleanup 건드리지 마라** — 자동 광고 충돌 방지 핵심
7. **Vercel env** — printf로 줄바꿈 없이 추가, 변경 후 재배포 필수
8. **검증 필수** — 수정 후 grep + curl로 라이브 사이트 확인
9. **디자인 수정 = 로컬 스크린샷 확인 → 승인 → 푸시 1회** — 빌드 낭비 방지
10. **NoticeBox prose 밖 유지** — prose 안에 넣으면 li margin 충돌
11. **브랜치 전략** — main 기준 새 브랜치에 단일 목적 1 커밋만
12. **.vercelignore ≠ 빌드 트리거 차단** — Ignored Build Step(Vercel Dashboard)이 빌드 스킵 담당

### 다음 작업 후보

1. **4/28**: FAQ CTR 개선 (수익 직결)
2. **4/28**: 신규 글 색인 확인 (네이버/구글)
3. **4/28**: 전환율 → CTA 판단
4. **4/28+**: 요약 박스 동적화 (하드코딩 → post별 데이터)
5. **4/28+**: NoticeBox 다른 글 마이그레이션 검토 (card-company, oil-subsidy-usage-guide)
6. **5월 초**: 건보료 컷오프 발표 반영
7. **5/8 이후**: status "신청중" → "지급중" 전환
