# SESSION MEMORY — 2026-05-12 (v2 — 저녁 추가 작업)

> v1(`SESSION-MEMORY-20260512.md`) 이후 코드/구조 변경 + 오디트 결과 code-level 기록.

## 세션 요약 (저녁 시점)

| 항목 | 값 |
|---|---|
| 추가 작업 시작 | 5/12 오후 |
| 추가 머지 | PR #8 (gas station 핫픽스) |
| 추가 분석 | 전수 오디트 (25개 항목) |
| 최종 main HEAD | `6f4ea20` |
| 5/13 예정 | P0 핫픽스 (HOTFIX-STATUS-20260513.md) |

## 추가 코드 변경 (PR #8 / `359b45f`)

### calculator/page.tsx — 블록 4 재구성

**위치**: 라인 447~464 (기존 라인 번호와 동일 영역)

**변경 전 (amber 경고 톤)**:
```tsx
<div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-lg p-4">
  <p className="font-semibold text-amber-800 mb-2">
    ⚠️ 주유소에서 사용하려면 반드시 확인하세요
  </p>
  <p className="text-base font-medium text-amber-900 mb-2">
    실제로 10곳 중 약 7곳은 기준을 초과합니다.
  </p>
  ...
```

**변경 후 (blue 안내 톤)**:
```tsx
<div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-lg p-4">
  <p className="font-semibold text-blue-800 mb-2">
    💡 주유소 사용 안내 (5월 1일부터 확대)
  </p>
  <p className="text-sm text-blue-800 mb-2">
    5월 1일부터 주소지 관할 지자체 내 주유소에서는 연 매출액과 관계없이...
  </p>
```

**핵심 결정**:
- 5/1 이후 사실상 안내 정보 → 경고(amber) 톤 부적절 → 안내(blue) 톤
- `⚠️` → `💡` 아이콘 교체
- "10곳 중 약 7곳" 옛 통계 라인 자체를 제거 (단순 치환 X)
- 마지막 "👉" 안내 톤: "특히 주유가 목적이라면 반드시 확인하세요" → "결제 전 가맹 여부 한 번 확인하면 더 안전합니다"

### faq/page.tsx 라인 77 — 답변 전체 재작성

**기존 (옛 정책)**:
```
'대부분의 주유소에서는 사용할 수 없는 경우가 많습니다. 주유소는 연매출 30억원 이하만 사용 가능한데...'
```

**변경 후 (짧은 버전 + 지역사랑상품권 보충)**:
```
'주유소는 5월 1일부터 연 매출액과 관계없이 사용 가능하도록 확대되었습니다. 다만 일부 예외 매장(대형매장과 사업자등록번호 또는 결제 단말기를 공유하는 주유소 등)은 결제 전 확인이 필요합니다.<br /><br />지역사랑상품권으로 받은 경우에는 기존 가맹 주유소와 한시적으로 추가 등록된 주유소에서 사용할 수 있으며, 가맹 여부는 지역사랑상품권 앱이나 지자체 누리집에서 확인하세요.'
```

### faq/page.tsx 라인 81 — 1문장 부분 수정

**기존**:
```
주유 목적이 있는 경우 카드로 받아도 대부분의 주유소에서는 사용할 수 없는 경우가 많습니다. 거주 지역 내 사용 가능한 주유소가 있는지 반드시 미리 확인하세요.
```

**변경**:
```
주유 목적이 있는 경우, 카드(신용/체크/선불)로 받으면 5/1부터 매출 무관하게 주유소에서 사용 가능합니다.
```

### updates.ts 변경 매핑

| 라인 | 글 (추정 slug) | 변경 |
|---|---|---|
| 490 | payment-method-comparison | 1문장 신 정책 통일 |
| 516 | oil-subsidy-usage-guide-2026 | H2 "왜 거의 안 된다" → "5월 1일부터 사용처 확대" |
| 518 | 동상 | 본문 첫 문단 신 정책 통일 (긴 버전) |
| 521 | 동상 | 카드 본문 — 직영/소상공인 옛 결론 제거 |
| 524 | 동상 | 지역사랑상품권 가맹 주유소 → 기존 + 한시 추가 등록 |
| 526 | 동상 | "→ 거의 안 된다" 결론 → "→ 정책 변경으로 대부분 사용 가능" |
| 531 | 동상 (주요 사용 목적별 추천) | 카드/상품권 옛 정책 → 신 정책 통일 |

## audit 적중률 (PR #8 회고)

### 잘 잡힌 패턴 (전수 오디트)
- 주유소+30억 결합 매칭: 100%
- 30억/연매출 표기 변형 전수: 100%
- 옛 정책 톤 (대부분/상당수/제한): 100%
- 옛 통계 (10곳 중 7곳): 100%
- 가맹 주유소 비율: 100%
- 신 정책 정합 (어제 5/11 신규 글에 이미 있던 부분): 정확히 매칭

### 보강 판단
- 박스 톤 변경 (amber → blue) — 스펙 외 능동적 판단
- 사용자 인정: "5/1 이후엔 경고가 아니라 안내가 맞으니까요"

## 전수 오디트 결과 — Code-Level 위치

### P0 — 즉시 (5/13 오전)

#### P0.1 src/app/page.tsx:85 Hero 배지 만료
**현재**:
```tsx
1차 신청 진행중 (4/27~5/8)
```
**변경 방향**:
```
2차 신청 5/18 시작 예정 — 첫 주 5부제 적용
```

#### P0.2 5/9~5/17 시스템 정비 안내 부재
**현재 위치**: `updates.ts:33-34, 207-208, 220-221` (글 본문에만 있음)
**누락 위치**: page.tsx, eligibility/page.tsx, calculator/page.tsx, faq/page.tsx
**추가 위치 권장**: 홈 Hero 직하 또는 스키니바 직하에 blue 박스 1개

#### P0.3 status 부정확
**현재**:
```typescript
// src/data/subsidy.ts:4
status: "신청중" as const,

// src/data/subsidy.ts:66
export type SubsidyStatus = "심사중" | "확정" | "신청중" | "지급중" | "종료";

// src/data/banner.ts:5
status: "신청중" as const,
```

**옵션 A (타입 확장)**:
```typescript
export type SubsidyStatus = "심사중" | "확정" | "신청중" | "정비중" | "지급중" | "종료";
```
status 값: `"신청중"` → `"정비중"`
**리스크**: 컨슈머 누락 case 발생 가능 → STEP 0에서 전수 grep 필수

**옵션 B (타입 유지)**:
- 타입 변경 X
- page.tsx UI에서 직접 "정비중" 메시지 렌더
- **장점**: 컨슈머 영향 0
- **단점**: 실제 상태와 status 값 불일치 유지

### P1 — 5/13~5/14

#### P1.4 이의신청 5/18~7/17
**현재 반영**: `src/data/updates.ts:604` (1줄, 본문 내)
**누락**: faq, eligibility, calculator
**참고**: `faq/page.tsx:106`에 "이의신청 절차" 일반 언급만 있음 (기간 명시 X)

#### P1.5 1차 신청자 통계 107만/6094억
**현재 반영**: 0건
**추천 위치**: 신규 글 발행 또는 홈 박스

#### P1.6 5부제 amber 박스 링크
**현재**: `eligibility/page.tsx:304`, `calculator/page.tsx:378`이 `/updates/weekly-application-schedule-2026` 링크
**weekly-application-schedule-2026 글 내용 확인**:
- `updates.ts:118` 슬러그 정의
- `updates.ts:156` H2 "1차 신청 일정 (4/27~5/8)"
- `updates.ts:185` H2 "2차 신청 일정 (5/18~7/3)"
- → 1·2차 둘 다 포함하지만, 1차 섹션이 상단

**옵션**:
1. weekly-application-schedule-2026 글의 1차 섹션을 "지난 일정" 톤으로 갱신
2. amber 박스 링크를 secondary-application-guide-2026로 변경

### P2 — 5/15+

#### P2.7 환산 연소득
**현재 반영**: `faq/page.tsx:28` (1억 682만), `faq/page.tsx:32` (4,340만)
**누락**: eligibility, calculator, updates.ts

#### P2.8 1차 중복 불가 FAQ
**현재 반영**: `updates.ts:27` (1줄, 어제 신규 글)
**누락**: FAQ 별도 Q&A 없음

## SubsidyStatus 컨슈머 (현재 알려진 위치)

```
src/data/subsidy.ts:4    SUBSIDY_CONFIG.status 정의
src/data/subsidy.ts:66   SubsidyStatus 타입 export
src/data/banner.ts:5     SKINNY_BAR.status 정의
```

**STEP 0에서 추가 확인 필요**:
- `SUBSIDY_CONFIG.status` 읽는 곳 (Hero, footer, 어디?)
- `SKINNY_BAR.status` 읽는 곳
- 값별 분기 처리 패턴 유무

## 5/12 코드베이스 전체 변화 (5/11 대비)

### 신규 컴포넌트/패턴
- **3-way status** (subsidy.ts checkEligibility — `eligible | ineligible | needsCheck`)
- **lower/upper 구간 분기** (Math.min + Math.max 동시 사용)
- **needsCheck UI 패턴** (amber Badge + 콜센터 박스, 금액 없음)
- **인라인 박스 4종** (blue 안내 / amber 경고 / green 강조 / red 위험)
- **calculator 블록 4 톤 전환** (amber → blue, 5/1 발표 사용처 확대 반영)

### 코드 결정 기록
- `as const` + tuple 변경 = OK (엔트리 +1 허용, 필드 +1 금지)
- `EligibilityResult` 타입 export 금지 (모듈 내부)
- 옛 표현 제거 시 단순 치환보다 **문장 전체 또는 섹션 재구성** 권장 (본문 모순 방지 — FAQ:48 사례)
- 박스 톤은 **정보 성격에 맞춰** (경고 X → 안내 O — gas station 사례)

## 5/13 작업 시 주의사항 (절대 룰)

### 5/12 핫픽스에서 확립된 룰 (유지)
1. **5인+ = 무조건 needsCheck** (subsidy.ts:checkEligibility 진입 즉시 분기, false 처리 X)
2. **1~4인 lower/upper 구간 분기 유지** (Math.max 단독 회귀 금지)
3. **EligibilityResult export 금지** (모듈 내부만)
4. **monthlyIncome SSOT 필드 유지** (페이지 렌더만 제거)
5. **needsCheck 시 amount UI 노출 금지** (콜센터 박스로 대체)
6. **신규 필드 추가 금지** (`insuranceMixed` 등 — tuple 길이 +1만 허용)

### 5/13 P0 작업 한정 룰
7. **STEP 0 mini-audit 후 사용자 결정 대기** (옵션 A/B 결정 후 STEP 1 진행)
8. **status 컨슈머 사전 전수 grep 필수** (옵션 A 선택 시 누락 case 0)
9. **변경 파일 3개 초과 시 보고**
10. **P1/P2 작업 절대 같이 하지 않음** (단일 커밋 룰)

## 5/13 시작 시 컨텍스트 (집/모바일/PC 어디서든)

### 터미널 시작 흐름
```bash
git checkout main
git pull origin main
# 또는 첫 클론:
# git clone https://github.com/defazr/-support.fazr.git && cd -support.fazr
```

### Claude Code 첫 명령
```
GitHub의 메모리/핸드오프 숙지해.
SESSION-HANDOFF.md → GPT-HANDOFF-20260512.md → GPT-HANDOFF-20260512-v2.md → HOTFIX-STATUS-20260513.md
순서로 읽고, STEP 0 mini-audit부터 시작.
```

### 핵심 문서 4종
1. **SESSION-HANDOFF.md** — living state doc (5/12 v2 갱신 반영)
2. **GPT-HANDOFF-20260512.md** (v1) — 5/12 핫픽스 narrative
3. **GPT-HANDOFF-20260512-v2.md** (v2) — 5/12 추가 작업 + 오디트 + P0 준비
4. **HOTFIX-STATUS-20260513.md** — 5/13 실행용 스펙 (STEP 0~5)

### 부차 문서 (참조용)
- **SESSION-MEMORY-20260512.md** (v1) — code-level 디테일 (5/11 발표 핫픽스)
- **SESSION-MEMORY-20260512-v2.md** (이 파일) — 5/12 추가 작업 code-level
- **HOTFIX-CRITERIA-20260511.md** — 5/12에 실행 완료된 핫픽스 스펙 (역사 자료)
