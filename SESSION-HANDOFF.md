# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code / Claude GPT UI 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.
> 5/12 핫픽스 후 갱신.

## 마지막 세션: 2026-05-12

### 프로젝트 상태: ✅ 운영 중 + 1차 종료 + 2차 신청 대기

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **Ignored Build Step**: `.md만 변경 시 빌드 스킵` (Vercel Dashboard)
- **총 페이지**: 110개 (5/11 신규 글 1개 추가)
- **main HEAD**: `a83ee09` (PR #6 머지, DisclaimerBanner 보강)

### 기술 스택

- **Next.js 16 (App Router)** + TypeScript ※ 기존 인지와 다른 버전 — `node_modules/next/dist/docs/` 먼저 확인
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — asChild 없음, render prop 사용)
- Pretendard 폰트 (CDN)
- ui-ux-pro-max-skill 설치됨

### 환경변수 (Vercel)

| 변수 | 값 | 상태 |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-GQTTM24X4D` | ✅ 활성 (next/script) |
| `NEXT_PUBLIC_ADSENSE_PUB_ID` | `pub-7976139023602789` | ✅ 활성 |

**중요**: NEXT_PUBLIC_ 변수는 빌드 타임. 추가/변경 후 재배포 필수.

### 광고 슬롯 (10개) — 변경 없음

| 위치 | 슬롯 ID | 타입 |
|---|---|---|
| 홈 Key Stats 아래 | 3245068480 | 인아티클 |
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

- **AdSlot** (`ad-slot.tsx`): 변경 없음
- **NoticeBox** (`notice-box.tsx`): 4/27 도입, 변경 없음
- **VignetteCleanup** (`vignette-cleanup.tsx`): **건드리지 마라**
- **ShareButtons** (`share-buttons.tsx`): 변경 없음
- **SkinnyBar** (`skinny-bar.tsx`): 5/11 변경 (2차 신청 가이드 링크)
- **DisclaimerBanner** (`disclaimer-banner.tsx`): **5/12 핫픽스 시 면책 문구 갱신** ⚠ 변경 됨
- **Footer** (`footer.tsx`): **5/12 핫픽스 시 면책 문구 갱신** ⚠ 변경 됨

### 5/12 핫픽스 핵심 변경

#### subsidy.ts SSOT

- **incomeThresholds**: 1~6인 직장가입자 + 1~4인 지역가입자 값 갱신
  - 1인: 직장 13만 / 지역 8만
  - 2인: 직장 14만 / 지역 12만
  - 3인: 직장 26만 / 지역 19만
  - 4인: 직장 32만 / 지역 22만
  - 5인: 직장 39만 / 지역 0 (미발표)
  - 6인: 직장 43만 / 지역 0 (미발표) ← **신규 엔트리**
- **monthlyIncome 필드는 유지** (페이지 렌더만 제거, 다른 컨슈머 보호)

#### checkEligibility 3-way 재작성

- 반환 타입: `{ status: "eligible" | "ineligible" | "needsCheck", eligible: boolean, message: string }`
- **5인+ 진입 시 즉시 needsCheck** (이전 `eligible: false` 제거)
- **1~4인 lower/upper 구간 분기**:
  - `monthlyInsurance ≤ Math.min(직장, 지역)` → eligible
  - `lower < monthlyInsurance ≤ upper` → needsCheck (유형 모호)
  - `upper < monthlyInsurance` → ineligible
- `EligibilityResult` 타입 **export 안 함** (모듈 내부)

#### calculator/page.tsx

- `CalcResult` 타입에 `status` 필드 추가 (`eligible` 유지로 하위호환)
- amount 계산: `status === "eligible"` 조건
- status 3-way 분기 UI (green/amber/gray)
- needsCheck 시 금액 자리에 "콜센터 확인 후 산정 가능" 박스 (0원 노출 X)
- 5인+ 안내 = 결과 박스 상단 (`result.members >= 5` 조건)
- 자산 제외 박스 = 결과 하단 공통

#### eligibility/page.tsx

- 표 4컬럼 → 3컬럼 (`기준 중위소득 (예상)` 컬럼 제거)
- "별도 산정" → "확인 필요"
- 표 하단 안내 4줄 추가 (행안부 5/11 + 콜센터)
- **신규 박스 3개** (표 직후):
  - 혼합가구 (blue): 4인 30만원 + 콜센터 안내
  - 자산 제외 (amber): 재산세 12억 / 금융소득 2,000만 + 위택스/홈택스
  - 맞벌이 특례 (green): +1명 적용 + 4인→5인 기준 예시

### FAQ 갱신 (5/12)

- Q1: 4인 974만원 → 32만원 / 연 1억 682만원
- Q2: 1인 185,400원 → 13만원 / 연 4,340만원
- Q3 (맞벌이): +1명 특례 보강
- Q4/Q5: "5월 중 발표 예정" → "행안부 5/11 발표 기준"
- Q6 (자산): 답변 전체 재작성 (12억/2,000만 명시)

### updates.ts 갱신 (5/12 — 3건 grep 기반)

- 라인 620 (government-official-payment-plan-2026): 새 건보료 값 4개 명시
- 라인 770 (when-will-oil-subsidy-be-paid): 패턴 A (eligibility 링크)
- 라인 822 (how-to-apply-oil-subsidy-2026): 패턴 B (브리프)

### 콘텐츠 현재 상태 (2026-05-12)

- 추경: 통과 확정 (4/10) + 정부 공식 발표 (4/11)
- subsidy.ts status: **"신청중"** (1차 5/8 종료됐지만 코드 미반영 — 5/13 처리 필요)
- Hero: **"1차 신청 진행중 (4/27~5/8)"** (만료 문구, 5/13 처리 필요)
- 스키니바: 2차 신청 가이드 글 링크 (5/11 변경)
- eligibility: 5/11 발표 기준 반영, 박스 3개 신규
- calculator: 3-way status UI, needsCheck 콜센터 박스
- 신규 글 (5/11): secondary-application-guide-2026
- updates 글 **11개**
- FAQ: 20개 항목 + 5/12 6건 갱신
- 건보료 컷오프: **확정 반영 완료** (행안부 5/11 발표)

### 1차 취약계층 (변경 없음)

- 자동 지급 4/27~5/8 (종료)
- 기초생활: 수도권 55만 / 비수도권 60만
- 차상위·한부모: 수도권 45만 / 비수도권 50만

### SEO 메타 (변경 없음)

| 페이지 | title | canonical |
|---|---|---|
| 홈 | 고유가 피해지원금 대상 조회·계산기 | https://support.fazr.co.kr |
| /calculator | 고유가 피해지원금 계산기 | https://support.fazr.co.kr/calculator |
| /eligibility | 고유가 피해지원금 대상 확인 | https://support.fazr.co.kr/eligibility |
| /faq | 고유가 피해지원금 자주 묻는 질문 | https://support.fazr.co.kr/faq |

### 디자인 시스템

- `design-system/고유가-피해지원금/MASTER.md`
- Primary: #0369A1 (딥블루), Background: #F8FAFC, Text: #020617
- Pretendard, Accessible & Ethical (WCAG AAA)

### 핫픽스 절대 룰 (5/12 추가)

1. **5인+ = 무조건 needsCheck** (subsidy.ts:checkEligibility 진입 시 즉시 분기, false 처리 X)
2. **1~4인 lower/upper 구간 분기 유지** (Math.max 단독 회귀 금지)
3. **EligibilityResult export 금지** (모듈 내부만)
4. **monthlyIncome SSOT 필드 유지** (페이지 렌더만 제거, 다른 컨슈머 안전)
5. **needsCheck 시 amount UI 노출 금지** (콜센터 박스로 대체)
6. **신규 필드 추가 금지** (`insuranceMixed` 등 — tuple 길이 +1만 허용)

### 기존 주의사항 (유지)

1. **body/html에 높이 클래스 금지** — h-full 등 넣으면 iOS 스크롤 버그
2. **SSOT 전부 확인** — 항목 누락 금지
3. **아닌 건 말해라** — 지시서 와도 문제 보이면 의견 제시
4. **GA4 + AdSense = next/script + strategy="afterInteractive"**
5. **구조 변경 금지** — CSS 클래스만 수정
6. **VignetteCleanup 건드리지 마라**
7. **Vercel env** — printf로 줄바꿈 없이, 변경 후 재배포
8. **검증 필수** — 수정 후 grep + curl로 라이브 확인
9. **디자인 수정 = 로컬 스크린샷 확인 → 승인 → 푸시 1회**
10. **NoticeBox prose 밖 유지**
11. **브랜치 전략** — main 기준 새 브랜치에 단일 목적 1 커밋만
12. **.vercelignore ≠ 빌드 트리거 차단** — Ignored Build Step이 빌드 스킵 담당

### 시스템 푸시 제약 ⚠ 신규 (5/12 발견)

- 로컬 프록시(`127.0.0.1:포트`)가 push 브랜치 제한
- `claude/check-memory-handoff-4RKK5`만 push 허용
- `main`, `hotfix/*` 등 직접 push → HTTP 403
- **우회 흐름**: 변경 → `claude/check-memory-handoff-4RKK5` push → GitHub UI에서 PR 머지 → Vercel 자동 빌드

### 다음 작업 후보 (5/13 이후 우선순위)

#### 1️⃣ 커밋 2: 신규 글 발행 — 가장 시급

- 슬러그: `health-insurance-criteria-confirmed-2026`
- 내용: 5/11 발표 건보료 기준 확정 안내 (검색 트래픽 흡수)
- 사유: **5/18 D-Day 5일 전 색인 시간 확보**

#### 2️⃣ 1차 종료 → 2차 대기 문구 정리

- subsidy.ts status: "신청중" 유지 (2차 5/18 시작 전까지)
- Hero 배지: "1차 신청 진행중 (4/27~5/8)" → "2차 신청 5/18 시작 예정" 같은 톤
- 스키니바: 이미 2차 가이드 링크라 부분 OK
- eligibility 1차 취약계층 섹션 제목 강조

#### 3️⃣ 커밋 4: 사용처 정책 일괄 점검

- `calculator/page.tsx:413-429` "주유소 사용처 안내 블록" (5/11 발표 후 변화 시)
- 동일 패턴 사용처 안내 — FAQ + updates + 홈 4곳 점검
- 5/11 발표문 전체에 사용처/카드사 변경 사항이 있는지 사용자 확인 필요

#### 4️⃣ 커밋 3: calculator 가입자 유형 UI

- 직장/지역 선택 Select 추가
- checkEligibility 시그니처에 insuranceType 추가
- "5인 이상" → "5인" + "6인 이상" 분리 검토
- 정확한 자동 판정 가능

#### 5️⃣ FAQ 신규 Q&A 3건 (SEO 보강)

- Q: 맞벌이 가구 +1명 특례 적용 방법
- Q: 자산 기준 확인 방법 (위택스/홈택스)
- Q: 5인 이상 가구 신청 방법

### 5/13 작업 시작 방법

```bash
git checkout main
git pull origin main
# 작업 시작
```

### 핸드오프 문서 위치 (5/12 기준 최신)

- `GPT-HANDOFF-20260512.md` — narrative 핸드오프
- `SESSION-MEMORY-20260512.md` — 기술 디테일·결정 기록
- `SESSION-HANDOFF.md` — 이 파일 (living doc, 현 상태)
- `HOTFIX-CRITERIA-20260511.md` — 5/12 핫픽스 스펙 (참고 자료)

### 색인 요청 상태 (5/12 던진 직후)

#### 네이버 웹마스터 도구 — 5건 요청

1. /eligibility
2. /calculator
3. /faq
4. /updates/secondary-application-guide-2026
5. /sitemap.xml

#### Google Search Console — 4건 요청

1. /eligibility
2. /calculator
3. /faq
4. /updates/secondary-application-guide-2026

### 5/13 오전 관찰 항목

1. 네이버 색인 반영 확인 (수집 요청 5건 처리 상태)
2. AdSense 5/12 vs 5/13 비교
3. GA — 신규 글(2차 신청 가이드) + eligibility 트래픽 변화
