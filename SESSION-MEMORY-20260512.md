# SESSION MEMORY — 2026-05-12 (건보료 기준 핫픽스 세션)

> 기술 디테일·결정 기록·코드 패턴. GPT-HANDOFF는 narrative, 이 파일은 code-level.

## 세션 개요

| 항목 | 값 |
|---|---|
| 날짜 | 2026-05-12 |
| 트리거 | 행안부 2026-05-11 2차 건보료 기준 공식 발표 |
| 결과 | 단일 핫픽스 + 1건 보강 머지 (PR #5 821952c + PR #6 a83ee09) |
| 최종 main HEAD | `a83ee09` |
| 변경 라인 | 8 파일 (스펙 문서 포함) +1,131 / -60 |

## SSOT 변경 (src/data/subsidy.ts)

### incomeThresholds 값

| 가구원 | insuranceEmployee (직장) | insuranceRegional (지역) | monthlyIncome |
|---|---|---|---|
| 1 | 130,000 | 80,000 | 3,850,000 (유지) |
| 2 | 140,000 | 120,000 | 6,300,000 (유지) |
| 3 | 260,000 | 190,000 | 8,040,000 (유지) |
| 4 | 320,000 | 220,000 | 9,740,000 (유지) |
| 5 | 390,000 | **0** (미발표) | 11,200,000 (유지) |
| 6 (신규) | 430,000 | **0** (미발표) | 12,700,000 |

### checkEligibility 함수 (재작성)

```ts
type EligibilityStatus = "eligible" | "ineligible" | "needsCheck";

interface EligibilityResult {
  status: EligibilityStatus;
  eligible: boolean;  // 하위호환
  message: string;
}

function checkEligibility(members: number, monthlyInsurance: number): EligibilityResult {
  // 5인+ → 무조건 needsCheck
  if (members >= 5) return { status: "needsCheck", eligible: false, message: "..." };

  const threshold = SUBSIDY_CONFIG.incomeThresholds.find(t => t.members === members);
  if (!threshold) return { status: "needsCheck", eligible: false, message: "..." };

  const lower = Math.min(threshold.insuranceEmployee, threshold.insuranceRegional);
  const upper = Math.max(threshold.insuranceEmployee, threshold.insuranceRegional);

  if (monthlyInsurance <= lower) return { status: "eligible", eligible: true, ... };
  if (monthlyInsurance <= upper) return { status: "needsCheck", eligible: false, ... };
  return { status: "ineligible", eligible: false, ... };
}
```

**핵심 룰**:
- 5인+ 진입 시 즉시 needsCheck → SSOT의 0값 계산 도달 X
- 1~4인 구간 분기:
  - `monthlyInsurance ≤ lower` → eligible (어느 유형이든 통과)
  - `lower < monthlyInsurance ≤ upper` → needsCheck (가입자 유형 모호)
  - `upper < monthlyInsurance` → ineligible (초과)
- EligibilityResult 타입 **export 안 함** (모듈 내부)

### `as const` + tuple 변경

- 6인 엔트리 추가 = tuple 길이 +1
- 컨슈머가 `.find()`/`.map()`만 써서 런타임 안전
- TypeScript 빌드 정상 통과 (110 페이지 생성, TS 에러 0)

## calculator/page.tsx 변경

### CalcResult 타입

```ts
type CalcResult = {
  status: "eligible" | "ineligible" | "needsCheck";  // 신규 추가
  eligible: boolean;  // 유지 (하위호환)
  message: string;
  amount: number;
  regionLabel: string;
  members: number;
} | null;
```

### amount 계산

```ts
const amount = eligibility.status === "eligible"
  ? getSubsidyAmount(regionType as RegionType) * memberNum
  : 0;  // needsCheck/ineligible 모두 0 (UI에서 0 자체는 안 보임)
```

### status 분기 UI (결과 박스)

- **eligible (green)**: 기존 UI 유지 (금액 + 1인당 계산 + CTA)
- **needsCheck (amber)**:
  - 5인+ 안내 텍스트 (`result.members >= 5` 조건부)
  - "확인 필요" Badge
  - 메시지
  - 콜센터 박스 ("콜센터 확인 후 산정 가능" + 1670-2626 / 1577-1000)
  - **금액은 표시 X** (0원 노출 차단)
- **ineligible (gray)**: "대상 외 추정" Badge + 메시지 + 주민센터 안내

### 자산 제외 박스

- 결과 박스 직후, 모든 status 공통 표시
- 재산세 12억 + 금융소득 2,000만 명시

### 신청 경로 가드

- 변경 전: `{result && result.eligible && (...) }`
- 변경 후: `{result && result.status === "eligible" && (...) }`

### calculator 표 (라인 460-498)

- monthlyIncome 컬럼 **없음** (헤더가 가구원/직장/지역 3컬럼)
- "별도 산정" → "확인 필요" 변경만 적용 (라인 480-487 영역)
- v4.1 보강 2 적용 위치

## eligibility/page.tsx 변경

### 표 구조 변경

- **헤더**: 4컬럼 → 3컬럼 (`기준 중위소득 (예상)` 컬럼 제거)
- **바디**: monthlyIncome `<td>` 제거
- **셀**: `t.insuranceX > 0 ? ... : "별도 산정"` → `"확인 필요"`
- 5인 지역 = 0, 6인 지역 = 0 → 셀에 "확인 필요" 자동 표시

### 표 하단 안내 (4줄)

```
※ 위 기준은 2026년 3월 부과된 건강보험료 본인부담금(장기요양보험료 제외) 가구 합산액 기준입니다. 행정안전부 5/11 발표 기준.
※ 위 기준은 외벌이 가구 기준입니다.
※ 5인 이상 지역가입자 기준은 행안부 공식 표에서 미발표 항목입니다.
※ 정확한 대상 여부는 콜센터 1670-2626 또는 건강보험공단 1577-1000으로 확인하세요.
```

### 신규 박스 3개 (표 직후)

1. **혼합가구 안내** (blue): 4인 30만원 + 1~3인/5인+ 콜센터 안내
2. **자산 제외 기준** (amber): 재산세 12억 / 금융소득 2,000만 + 위택스/홈택스 확인
3. **맞벌이/다소득원 특례** (green): +1명 적용 + 4인→5인 기준 예시

### 라인 87 (대상 아닌 경우 카드)

- 변경 전: "세부 제외 대상 (건보료 컷오프 5월 중 발표)"
- 변경 후: "자산 제외 대상 (한 가지라도 해당 시 가구 전원 제외)"

## faq/page.tsx 변경 (6건)

| 라인 | 변경 내용 |
|---|---|
| Q1 (28) | 4인 월 974만원 → 직장 월 32만원 / 연 1억 682만원 |
| Q2 (32) | 1인 185,400원 + 385만원 → 직장 월 13만원 / 연 4,340만원 |
| Q3 (36) | 맞벌이 +1명 특례 보강 (4인→5인 기준 적용 예시) |
| Q4 (40) | "5월 중 발표 예정" → "행안부 5/11 발표 기준" |
| Q5 (44) | "5월 중 발표 예정" → "행안부 5/11 발표 기준" |
| Q6 (48) | 답변 전체 재작성: 발표된 바 없습니다 → 12억/2,000만 명시 + 위택스/홈택스 |
| Q7 (52) | 미수정 (잘못된 수치/발표 예정 없음 → 처리 불필요) |

## footer.tsx (라인 82-86) 변경

- 변경 전: "정부 공식 사이트가 아니며, 안내 정보는 정책 확정 전 예상 기준으로 변경될 수 있습니다."
- 변경 후: "행정안전부 발표 기준을 바탕으로 안내하며, 정부 공식 사이트가 아닙니다."

## disclaimer-banner.tsx 변경 (PR #6 보강)

- 변경 전: "정부 공식 사이트가 아니며, 안내 정보는 정책 확정 전 예상 기준으로 변경될 수 있습니다."
- 변경 후: "행정안전부 발표 기준을 바탕으로 안내하며, 정부 공식 사이트가 아닙니다."
- 8개 페이지 공통 렌더링 → 영향 광범위
- 라이브 grep "예상 기준"에서 발견됨 (footer.tsx만 봤던 spec의 누락)

## updates.ts 변경 (3건)

| 라인 | 글 (추정) | 변경 |
|---|---|---|
| 620 | government-official-payment-plan-2026 (2차 안내) | 새 건보료 값 4개 명시 |
| 770 | when-will-oil-subsidy-be-paid | 패턴 A (자격 확인 페이지 링크) |
| 822 | how-to-apply-oil-subsidy-2026 | 패턴 B (브리프) + 사용 기한 유지 |

## audit 적중률 (회고)

### 잘 잡힌 패턴 (spec 키워드 안에서)

- 옛 수치 grep (185,400 등): 100% (8/8)
- "5월 중 발표" / "발표 예정": 100% (FAQ 5건 + updates.ts 3건 + eligibility/calculator 1줄씩)
- "별도 산정": 100% (eligibility 2건 + calculator 2건)
- "기준 중위소득" 컬럼: 100% (1건 — eligibility)
- FAQ Q&A 라인 매핑: 100% (28/32/36/40/44/48 정확)
- updates.ts grep 기반 처리: 100% (라인 의존 X)

### 누락 (spec 키워드 밖)

- **disclaimer-banner.tsx**: spec STEP 5는 footer.tsx만 명시. 라이브 grep으로 발견 → 보강 머지.
  - 교훈: 면책 문구는 footer 외 별도 컴포넌트도 점검 grep 필요 ("정책 확정 전" / "예상 기준" / "변경될 수 있습니다" 같은 키워드)
- **calculator 사용처 안내 (calc:413-429)**: spec 범위 밖. 5/13 별도 점검.
  - 교훈: spec scoping이 건보료에 한정되면 사용처/카드사/주유소 정책 변경은 누락됨. audit 키워드를 발표문 전체 키워드로 확장 필요.

## 5/11 어제 작업과 충돌

- 5/11 (yesterday) 커밋 172c700: secondary-application-guide-2026 신규 글 + 스키니바
- 그 글 본문에 "발표 예정" 문구 있었음 (라인 620)
- 5/12 핫픽스에서 라인 620 함께 갱신 = 충돌 X, 누적 변경

## 푸시 제약 (시스템 프록시)

- `local_proxy@127.0.0.1:34189` — 세션마다 포트 바뀜
- `claude/check-memory-handoff-4RKK5`만 push 허용 (시스템 메시지 정책)
- `hotfix/criteria-20260511`, `main` 직접 push → HTTP 403
- 우회: claude/* 푸시 → GitHub UI PR 머지

### 비고: 세션 초반엔 hotfix 푸시 성공

- 세션 초반 hotfix/criteria-20260511에 스펙 문서 푸시 = 성공 (포트 39909)
- 핫픽스 commit 푸시 시점부터 = 실패 (포트 34189, strict 모드)
- 결론: 프록시 재시작 후 strict 모드. 환경 의존적이므로 항상 claude/* 권장.

## 5/13 시작 시 주의사항

### 절대 룰 (변경 금지)

1. **5인+ = 무조건 needsCheck** (subsidy.ts:checkEligibility 진입 시 즉시 분기)
2. **1~4인 lower/upper 구간 분기 유지** (Math.max 단독으로 회귀 금지)
3. **EligibilityResult export 금지** (모듈 내부만)
4. **monthlyIncome SSOT 필드 유지** (페이지 렌더만 제거됨, 다른 컨슈머 안전)
5. **needsCheck 시 amount UI 노출 금지** (콜센터 박스로 대체)

### 보강 가능 (스펙 외)

- calculator/page.tsx:413-429 사용처/주유소 안내 (5/11 발표 후 변화 시)
- FAQ 신규 Q&A 3건 (맞벌이/자산/5인+ — 검색 SEO)
- Hero / status / 스키니바 만료 문구 (1차 5/8 종료 반영)

### 우선 처리 권장 순서 (5/13 오후)

1. 신규 글 발행 health-insurance-criteria-confirmed-2026 (5/18 D-Day 색인 시간)
2. 1차 종료 문구 처리
3. 사용처 정책 점검

## 신규 컴포넌트 / 패턴 (코드베이스 변화)

### 새로 도입

- **3-way status** (subsidy.ts checkEligibility)
- **lower/upper 구간 분기 패턴** (Math.min + Math.max 동시 사용)
- **needsCheck UI 패턴** (amber Badge + 콜센터 박스, 금액 없음)
- **status optional 필드 패턴** (CalcResult.status + .eligible 병존, 하위호환)
- **인라인 박스 3종** (blue/amber/green) — eligibility 페이지

### 기존 패턴 (변경 없음)

- NoticeBox (4/27 도입, 유지)
- VignetteCleanup (건드리지 마라)
- AdSlot (변경 없음)
- ShareButtons, SkinnyBar (변경 없음)

## 데이터 보관

- HOTFIX-CRITERIA-20260511.md (main에 상주) — 다음 세션 핸드오프 포맷 참고용
- GPT-HANDOFF-20260512.md (이 세션 narrative)
- SESSION-MEMORY-20260512.md (이 파일 — code-level 디테일)
- SESSION-HANDOFF.md (living doc — 5/12 업데이트 예정)
