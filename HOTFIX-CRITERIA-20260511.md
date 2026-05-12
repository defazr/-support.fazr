# HOTFIX CRITERIA SPEC — 건보료 기준 5/11 행안부 발표 반영 (v4.1 최종)

> **새 Claude Code 세션 시작용 핸드오프.**
> 이 파일을 첫 번째로 읽고 STEP 0 mini-audit부터 시작한다.

---

## 📌 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 브랜치 | `hotfix/criteria-20260511` (main 기준) |
| 베이스 커밋 | `172c700` (5/11 "feat(updates): 2차 신청 가이드 신규 글 발행 + 스키니바 변경") |
| 사이트 | https://support.fazr.co.kr |
| 저장소 | https://github.com/defazr/-support.fazr.git |
| 배포 | Vercel 자동 (main push → 빌드 / `.md`-only 변경은 Ignored Build Step으로 스킵) |
| Next.js | **16 (App Router)** — 기존 인지와 다른 버전. `node_modules/next/dist/docs/` 먼저 확인 |

### 직전 작업 상태 (잃을 데이터 0)

- 5/11 작업(`172c700`)은 origin/main에 안전하게 푸시됨 — 어제 작업 손실 없음
- 작업 트리 clean, stash 없음, 로컬/원격 동기

---

## 🚀 시작 방법

1. 이 파일 전체 읽기 (특히 v4.1 보강 3건 + 절대 룰)
2. STEP 0 mini-audit 실행 → 사용자에게 결과 보고
3. 구조 충돌 없으면 STEP 1~8 순차 진행
4. 충돌 시(신규 필드 추가 필요 등) 즉시 중단 + 사용자 보고 + 대기
5. 완료 후 "최종 보고 형식"으로 보고

### 🛑 작업 시작 전 필수 체크

- [ ] 현재 브랜치 = `hotfix/criteria-20260511` 확인 (`git branch --show-current`)
- [ ] 베이스 = main 최신 확인 (`git log main..HEAD --oneline` = 0건)
- [ ] AGENTS.md / SESSION-HANDOFF.md / package.json 확인 (스택/룰)

---

## ⚙️ v4.1 보강 (v4 본문보다 우선 적용)

### 보강 1 — `monthlyIncome` 컨슈머 확인 (STEP 0에 추가)

STEP 0에 다음 grep을 추가하고 보고한다:

```bash
grep -rn "monthlyIncome\|기준 중위소득" src/
```

**보고:**
- eligibility 표 외 다른 노출 위치가 있는지
- 다른 노출이 있으면 이번 핫픽스 범위 안에서 함께 제거 또는 수정
- 없으면 `subsidy.ts`의 `monthlyIncome` 필드는 유지하고 화면 렌더링에서만 제거

### 보강 2 — calculator 표 처리 명확화 (STEP 3.7 교체)

**확정 사실:** `calculator/page.tsx:467-473` 표 헤더는 가구원/직장/지역 3컬럼 — `monthlyIncome` 컬럼 없음.

따라서 STEP 3.7은 다음으로 처리한다:

- ❌ calculator 표에서 `monthlyIncome` 컬럼 제거 작업은 **하지 않는다**
- ✅ calculator 표의 "별도 산정" 문구만 "확인 필요"로 변경한다
- 대상 위치: `calculator/page.tsx:480-487` (SSOT.map 표 영역)

### 보강 3 — 브랜치 분기 기준 (브랜치 전략 교체)

브랜치는 반드시 main 최신 기준에서 생성한다:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/criteria-20260511
```

**현재 `claude/check-memory-handoff-*` 계열 브랜치에서 바로 분기하지 말 것.**

> ※ 본 문서가 이미 `hotfix/criteria-20260511` 브랜치에 커밋되어 있다면, 새 세션은 이 브랜치를 그대로 체크아웃해서 사용하면 된다 (재생성 불필요).

---

# v4 본문 — 변경 지시서 (위 v4.1 보강 반영하여 진행)

## 🚨 v4 핵심 변경 (v3 대비)

v3는 계산 로직까지 다뤘으나, 코드 검증에서 5/6인 monthlyIncome 미명시, needsCheck amount 처리, 혼합가구 표 컬럼 모순 = 블로커 3건 발견.

v4 추가 사항:
1. **monthlyIncome 컬럼 제거** — 옛 추정값 노출 방지
2. **needsCheck 금액 자리에 "콜센터 확인 후 산정 가능" 박스** — 0 노출 금지
3. **혼합가구 = 표 컬럼 X, 표 직후 별도 박스** — 신규 필드 금지 룰 정합
4. **"별도 산정" → "확인 필요"로 통일**
5. **result state에 status 필드 추가 1줄 명시**
6. **EligibilityResult 타입 export 안 함**
7. **5인+ 안내 = 결과 박스 상단 위치 명시**

## 🚨 긴급 범위 축소 지시

1. **기존 thresholds 엔트리 구조 유지.** tuple 길이 변경(엔트리 +1)만 허용.
2. **신규 필드 추가 금지** (`insuranceMixed` 등). 혼합가구 = 페이지 박스로만.
3. **checkEligibility 반환 타입에 `status` 필드 추가는 핫픽스 핵심 안전장치로 예외 허용.**
4. **EligibilityResult 타입은 함수 내부 또는 inline. export 금지.**
5. **FAQ 신규 Q&A 추가 X.** 기존 Q&A 수정만.
6. **신규 export 추가 X** (assetExclusion 등 — 페이지 문구로만).
7. **calculator 가입자 유형 UI 추가 X** (커밋 3 분리).
8. **calculator "5인 이상" 옵션 분리 X** (커밋 3 분리).

## ⚙️ 타입 변경 룰

- **허용:** tuple 길이 변경 (6인 엔트리 추가)
- **허용:** checkEligibility 반환 타입에 `status` 필드 추가
- **허용:** result state에 `status` 필드 추가 (TypeScript 정합성 위해)
- **금지:** 신규 필드 추가 (`insuranceMixed` 등) → 보고 후 대기
- **금지:** thresholds 엔트리 필드 구조 변경 → 보고 후 대기

---

## 🎯 작업 범위

### 포함 (단일 커밋, 6개 파일)
1. `src/data/subsidy.ts` — 숫자 갱신 + checkEligibility 3-way 로직
2. `src/app/eligibility/page.tsx` — 표 + 문구 갱신 + 혼합/자산/맞벌이 박스 추가
3. `src/app/calculator/page.tsx` — 문구 갱신 + status 분기 UI + needsCheck 금액 박스
4. `src/app/faq/page.tsx` — 기존 Q&A 수정만 (신규 X)
5. `src/components/footer.tsx` — 면책 문구 변경
6. `src/data/updates.ts` — "발표 예정" grep 기반 수정

### 제외
- ❌ `src/app/page.tsx` (홈)
- ❌ 디자인 시스템 / shadcn
- ❌ 신규 updates 글 발행 (커밋 2)
- ❌ regions / sitemap
- ❌ Cloudflare
- ❌ FAQ 신규 Q&A 추가
- ❌ 신규 export 추가
- ❌ calculator 가입자 유형 UI 추가 (커밋 3)
- ❌ calculator "5인/6인" 옵션 분리 (커밋 3)

## ⏰ 시간 제약
mini-audit 7분 + 변경 45분 + 검증 10분 = **60분 이내**

## 🌿 브랜치 전략 — v4.1 보강 3 적용

```bash
# 새로 시작하는 경우만:
git checkout main
git pull origin main
git checkout -b hotfix/criteria-20260511

# 본 문서가 이미 이 브랜치에 있다면 체크아웃만:
git checkout hotfix/criteria-20260511
```

---

## STEP 0 — 변경 전 mini-audit (7분)

### 0.1 subsidy.ts checkEligibility 함수 정확 확인

```bash
sed -n '60,108p' src/data/subsidy.ts
grep -n "checkEligibility\|incomeThresholds\|Math.max\|Math.min" src/data/subsidy.ts
```
보고:
- checkEligibility 함수 전문
- 현재 5인+ 처리 라인 (예상: 81-86)
- Math.max 라인 (예상: 95-98)

### 0.2 calculator 컨슈머 + result state 구조 확인

```bash
sed -n '80,125p' src/app/calculator/page.tsx
grep -n "SelectItem\|insuranceType\|setResult\|useState" src/app/calculator/page.tsx | head -20
```
보고:
- checkEligibility 호출 부분 + 반환값 사용 방식
- result state 타입 정의 위치 + 현재 필드 목록
- amount 계산 로직 라인 (예상: 94-96)
- 가입자 유형 UI: 없음 확인
- "5인 이상" 단일 옵션 확인

### 0.3 eligibility 표 렌더링 구조 정밀 확인

```bash
sed -n '95,160p' src/app/eligibility/page.tsx
```
보고:
- 표 헤더 (`<th>` 목록) — monthlyIncome 컬럼 위치 확인
- 표 본문 (`<td>`) — formatAmount 사용 위치
- "별도 산정" 노출 라인 (예상: 135-137, 144-146)
- `t.insuranceEmployee > 0 ? ...` 처리 패턴

### 0.4 FAQ 영향 Q&A 전문

```bash
sed -n '25,55p' src/app/faq/page.tsx
sed -n '34,38p' src/app/faq/page.tsx
sed -n '46,54p' src/app/faq/page.tsx
```
보고: 라인 28, 32, 36, 40, 44, 48 답변 전문

### 0.5 updates.ts "발표 예정" 위치

```bash
grep -n "5월 중 발표\|발표 예정\|컷오프 5월" src/data/updates.ts
```
보고: 매칭 라인 + 주변 문맥

### 0.6 v4.1 보강 1 — monthlyIncome 컨슈머 grep

```bash
grep -rn "monthlyIncome\|기준 중위소득" src/
```
보고:
- eligibility 표 외 다른 노출 위치 유무
- 다른 노출 있으면 함께 제거/수정 계획
- 없으면 SSOT 필드 유지 + 렌더링만 제거

### 🛑 STEP 0 보고 후 분기 처리

**즉시 진행 (모두 충족):**
- thresholds 엔트리 구조 변경 불필요
- 6인 엔트리 추가 = tuple 길이 변경 = 허용
- checkEligibility status 필드 추가 = 핫픽스 예외 허용
- result state status 필드 추가 = 핫픽스 예외 허용
- 표 SSOT.map 자동 반영 확인 (이미 검증됨)

**중단·보고 (해당 항목만 보류, 나머지 계속 진행):**
- thresholds 엔트리에 새 필드(`insuranceMixed` 등) 추가 필요 = 전체 중단·대기
- 예상 못 한 컴포넌트 구조 = 전체 중단·대기
- calculator에 가입자 유형 UI 추가 필요 판단 = **그 분기만 보류** (나머지 계속 진행)

타입 변경 없이 갈 수 있으면 멈추지 말고 끝까지 진행.

---

## STEP 1 — `src/data/subsidy.ts` 갱신

### 1.1 incomeThresholds 숫자 갱신

```
기존 → 변경:
1인: insuranceEmployee 185400 → 130000, insuranceRegional 12500 → 80000
2인: insuranceEmployee 312800 → 140000, insuranceRegional 145200 → 120000
3인: insuranceEmployee 405200 → 260000, insuranceRegional 224100 → 190000
4인: insuranceEmployee 508600 → 320000, insuranceRegional 318700 → 220000
5인: insuranceEmployee 0 → 390000, insuranceRegional 0 (그대로)
6인: 신규 엔트리 추가 → insuranceEmployee 430000, insuranceRegional 0
```

`insuranceRegional` 0 의미: "값 미발표" (checkEligibility에서 5인+ 진입 즉시 needsCheck로 처리되므로 0 계산 안 됨)

### 1.2 monthlyIncome 처리

**기존 monthlyIncome 필드는 SSOT에서 그대로 유지** (다른 컨슈머 영향 방지).
표 렌더링 측에서 컬럼 제거 (STEP 2에서 처리).
※ 단, v4.1 보강 1의 grep 결과에 따라 추가 정리 위치 발생 가능.

### 1.3 checkEligibility 함수 3-way 재작성

기존 구조 (예상):
```ts
function checkEligibility(members, monthlyInsurance) {
  if (members >= 5) {
    return { eligible: false, message: "5인 이상 가구는 별도 기준 적용..." };
  }
  const maxInsurance = Math.max(threshold.insuranceEmployee, threshold.insuranceRegional);
  if (monthlyInsurance <= maxInsurance) {
    return { eligible: true, message: "..." };
  }
  return { eligible: false, message: "..." };
}
```

변경 후 (3-way 구간 분기, EligibilityResult는 함수 내부 타입 또는 inline):
```ts
// EligibilityResult 타입 — 함수 내부 또는 inline (export 금지)
type EligibilityStatus = "eligible" | "ineligible" | "needsCheck";

interface EligibilityResult {
  status: EligibilityStatus;
  eligible: boolean;  // 하위 호환용
  message: string;
}

function checkEligibility(members: number, monthlyInsurance: number): EligibilityResult {
  // 5인 이상 = 무조건 확인 필요
  if (members >= 5) {
    return {
      status: "needsCheck",
      eligible: false,
      message: "5인 이상 가구는 가입자 유형과 공식 기준 확인이 필요합니다. 콜센터 1670-2626 또는 건강보험공단 1577-1000으로 확인하세요.",
    };
  }

  const threshold = SUBSIDY_CONFIG.incomeThresholds.find(t => t.members === members);
  if (!threshold) {
    return {
      status: "needsCheck",
      eligible: false,
      message: "해당 가구원 수 기준은 별도 확인이 필요합니다.",
    };
  }

  const lower = Math.min(threshold.insuranceEmployee, threshold.insuranceRegional);
  const upper = Math.max(threshold.insuranceEmployee, threshold.insuranceRegional);

  // 낮은 값 이하 = 어느 유형이든 대상
  if (monthlyInsurance <= lower) {
    return {
      status: "eligible",
      eligible: true,
      message: "입력한 건강보험료 기준으로는 지원 대상 가능성이 있습니다. (자산 기준 추가 확인 필요)",
    };
  }

  // 낮은 값 초과 ~ 높은 값 이하 = 가입자 유형에 따라 달라짐
  if (monthlyInsurance <= upper) {
    return {
      status: "needsCheck",
      eligible: false,
      message: "가입자 유형(직장/지역)에 따라 대상 여부가 달라질 수 있습니다. 콜센터에 문의해 확인하세요.",
    };
  }

  // 높은 값 초과 = 대상 아님
  return {
    status: "ineligible",
    eligible: false,
    message: "입력한 건강보험료가 기준을 초과할 가능성이 높습니다.",
  };
}
```

**EligibilityResult 타입은 export 금지.** 함수 내부 또는 모듈 내부 사용만.

### 1.4 컨슈머 영향 최소화
- `eligible: boolean` 유지 = 기존 컨슈머 즉시 깨지지 않음
- 신규 컨슈머는 `status` 사용
- calculator만 STEP 3에서 `status` 분기 UI 적용

---

## STEP 2 — `src/app/eligibility/page.tsx` 갱신

### 2.1 라인 87 문구 변경
```
기존: "세부 제외 대상 (건보료 컷오프 5월 중 발표)"
변경: "자산 제외 대상 (한 가지라도 해당 시 가구 전원 제외)"
```

### 2.2 라인 154-155 문구 변경
```
기존: "예상 기준 / 컷오프 기준 5월 중 발표 예정"
변경: "※ 위 기준은 2026년 3월 부과된 건강보험료 본인부담금(장기요양보험료 제외) 가구 합산액 기준입니다. 행정안전부 5/11 발표 기준."
```

### 2.3 건보료 표 — monthlyIncome 컬럼 제거 + 5인+ 지역 "확인 필요"

**표 헤더 — 4컬럼 → 3컬럼:**
```
가구원 수 | 직장가입자 | 지역가입자
```
(기존 "기준 중위소득 (예상)" 컬럼 `<th>` 제거)

**표 본문 — monthlyIncome `<td>` 제거 + 0값 처리:**

기존:
```tsx
<td>{formatAmount(t.monthlyIncome)}원</td>
<td>{t.insuranceEmployee > 0 ? formatAmount(t.insuranceEmployee) + "원 이하" : "별도 산정"}</td>
<td>{t.insuranceRegional > 0 ? formatAmount(t.insuranceRegional) + "원 이하" : "별도 산정"}</td>
```

변경 후:
```tsx
{/* monthlyIncome <td> 완전 제거 */}
<td>{t.insuranceEmployee > 0 ? formatAmount(t.insuranceEmployee) + "원 이하" : "확인 필요"}</td>
<td>{t.insuranceRegional > 0 ? formatAmount(t.insuranceRegional) + "원 이하" : "확인 필요"}</td>
```

**"별도 산정" → "확인 필요"로 통일.**

표 결과:
```
가구원 수 | 직장가입자  | 지역가입자
1인       | 13만원 이하 | 8만원 이하
2인       | 14만원 이하 | 12만원 이하
3인       | 26만원 이하 | 19만원 이하
4인       | 32만원 이하 | 22만원 이하
5인       | 39만원 이하 | 확인 필요
6인       | 43만원 이하 | 확인 필요
```

표 하단 안내:
```
※ 위 기준은 외벌이 가구 기준입니다.
※ 5인 이상 지역가입자 기준은 행안부 공식 표에서 미발표 항목입니다.
※ 정확한 대상 여부는 콜센터 1670-2626 또는 건강보험공단 1577-1000으로 확인하세요.
```

### 2.4 혼합가구 박스 — 표 직후 신규 추가 (자산 제외 박스 앞)

```html
<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
  <p class="font-semibold text-blue-800">혼합가구 안내</p>
  <p class="text-blue-700 mt-1">
    혼합가구는 직장가입자와 지역가입자가 함께 있는 가구를 말합니다.
  </p>
  <ul class="text-blue-700 mt-2 text-sm">
    <li>4인 혼합가구: 월 건강보험료 합산 <strong>30만원 이하</strong> 기준</li>
    <li>1~3인 및 5인 이상 혼합가구: 공식 표에서 확인되지 않아 콜센터 확인 필요</li>
  </ul>
  <p class="text-blue-700 mt-2 text-sm">
    전담 콜센터 1670-2626 또는 건강보험공단 1577-1000에서 확인하세요.
  </p>
</div>
```

### 2.5 자산 제외 기준 박스 — 혼합가구 박스 직후

```
[자산 제외 기준]
다음 중 한 가지라도 해당하면 가구 전원이 지급 대상에서 제외됩니다.

- 가구원 합산 2025년 재산세 과세표준 12억원 초과 (공시가 약 26.7억원 수준)
- 가구원 합산 2024년 귀속 금융소득 2,000만원 초과

확인 방법:
- 재산세 과세표준: 위택스 홈페이지/앱
- 금융소득: 홈택스 홈페이지
```

### 2.6 맞벌이 특례 박스 — 자산 제외 박스 직후

```
[맞벌이/다소득원 가구 특례]
가구 내 직장가입자가 여러 명인 경우, "가구원 수 +1명" 기준을 적용합니다.

예) 직장가입자 2인이 포함된 4인 가구
    → 일반 4인 기준(32만원) 대신 5인 기준(39만원) 이하 적용
```

### 2.7 1차 취약계층 섹션 — 제목 강조만

기존 4행 (기초/차상위 등) 그대로. 섹션 제목에 **"1차 신청 대상"** 강조 추가.

### 박스 순서 (재확인)

```
1. 건보료 표 (3컬럼)
2. 표 하단 안내 (5인+ 지역 확인 필요 콜센터)
3. [신규] 혼합가구 박스 (blue)
4. [신규] 자산 제외 박스
5. [신규] 맞벌이 특례 박스
6. 1차 취약계층 섹션 (제목 강조)
```

---

## STEP 3 — `src/app/calculator/page.tsx` 갱신

### 3.1 라인 330 문구 변경
```
기존: "예상 기준 / 컷오프 기준에 따라 변경"
변경: "행정안전부 5/11 발표 기준. 최종 대상 여부는 신청 시 카드사·지자체 안내에서 확인됩니다."
```

### 3.2 라인 495 문구 변경
```
기존: "예상치 / 컷오프 5월 중 발표 예정"
변경: "건강보험료 본인부담금 가구 합산액 기준 (장기요양보험료 제외). 가입자 유형(직장/지역) 입력 없이 보수적으로 판정합니다."
```

### 3.3 result state 타입 수정 ⭐

기존 (예상):
```ts
interface ResultType {
  eligible: boolean;
  message: string;
  amount: number;
  regionLabel: string;
  members: number;
}
```

변경 후 (`status` 필드 추가):
```ts
interface ResultType {
  status: "eligible" | "ineligible" | "needsCheck";
  eligible: boolean;
  message: string;
  amount: number;
  regionLabel: string;
  members: number;
}
```

### 3.4 setResult 호출 시 status 전달

기존 (라인 98-104 근처):
```ts
setResult({
  eligible: eligibility.eligible,
  message: eligibility.message,
  amount,
  regionLabel: ...,
  members: memberNum,
});
```

변경 후:
```ts
setResult({
  status: eligibility.status,
  eligible: eligibility.eligible,
  message: eligibility.message,
  amount,
  regionLabel: ...,
  members: memberNum,
});
```

### 3.5 status 분기 UI — 결과 박스

```tsx
{result.status === "eligible" && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
    <p className="font-semibold text-green-800">예상 지원 대상</p>
    <p className="text-green-700 mt-1">{result.message}</p>
    <p className="text-green-800 mt-3 text-2xl font-bold">
      {result.amount.toLocaleString()}원
    </p>
  </div>
)}

{result.status === "needsCheck" && (
  <>
    {/* 5인+ 안내는 결과 박스 상단 */}
    {result.members >= 5 && (
      <p className="text-sm text-gray-600 mb-3">
        ※ 계산기에서는 5인 이상 가구를 단일 항목으로 입력하므로 자동 판정이 어렵습니다.
      </p>
    )}
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <p className="font-semibold text-amber-800">확인 필요</p>
      <p className="text-amber-700 mt-1">{result.message}</p>
      {/* 금액 자리 — 0원 대신 콜센터 안내 박스 */}
      <div className="bg-white border border-amber-100 rounded p-3 mt-3">
        <p className="font-semibold text-amber-900">콜센터 확인 후 산정 가능</p>
        <p className="text-amber-800 mt-1 text-sm">
          전담 콜센터 <strong>1670-2626</strong> 또는 건강보험공단 <strong>1577-1000</strong>에서 확인하세요.
        </p>
      </div>
    </div>
  </>
)}

{result.status === "ineligible" && (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
    <p className="font-semibold text-gray-800">예상 대상 외</p>
    <p className="text-gray-700 mt-1">{result.message}</p>
  </div>
)}
```

### 3.6 자산 제외 안내 박스 (결과 페이지 하단, 모든 결과 공통)

```html
<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
  <p class="font-semibold text-blue-800">자산 기준 확인 필요</p>
  <p class="text-blue-700 mt-1">
    건강보험료 기준을 충족해도 다음 중 하나에 해당하면 가구 전원이 제외됩니다.
  </p>
  <ul class="text-blue-700 mt-2 text-sm">
    <li>2025년 재산세 과세표준 합계 12억원 초과 (공시가 약 26.7억원)</li>
    <li>2024년 귀속 금융소득 합계 2,000만원 초과</li>
  </ul>
</div>
```

### 3.7 calculator 표 — v4.1 보강 2 적용

**확정 사실:** calculator 표는 monthlyIncome 컬럼 없음 (가구원/직장/지역 3컬럼).

따라서:
- ❌ monthlyIncome 컬럼 제거 작업 **하지 않는다**
- ✅ "별도 산정" → "확인 필요"로 변경만 적용
- 대상 위치: `calculator/page.tsx:480-487` (SSOT.map 표)

---

## STEP 4 — `src/app/faq/page.tsx` 기존 Q&A 수정만

### ⚠ 신규 Q&A 추가 절대 X

### 4.0 라인 36 답변 보강 (맞벌이 Q&A) — STEP 0.4 보고로 정확 문구 확인 후

```
기존 (추정): "맞벌이 가구도 부부 합산 건강보험료가 하위 70% 기준 이내라면 대상입니다."

변경 후 (1~2줄 추가):
"맞벌이 가구도 부부 합산 건강보험료가 하위 70% 기준 이내라면 대상입니다.
단, 직장가입자가 2명 이상인 경우 '가구원 수 +1명' 특례가 적용되어 일반 기준보다 완화됩니다.
예) 직장가입자 2인 포함 4인 가구는 5인 기준(39만원)이 적용됩니다."
```

### 4.1 라인 28
```
기존: "4인 가구 월 974만원"
변경: "외벌이 직장가입자 기준 4인 가구는 월 건강보험료 32만원 이하입니다. 환산 연소득으로는 약 1억 682만원 수준입니다."
```

### 4.2 라인 32
```
기존: "185,400원 이하 / 월 소득 약 385만원"
변경: "외벌이 직장가입자 기준 1인 가구는 월 건강보험료 13만원 이하입니다. 환산 연소득으로는 약 4,340만원 수준입니다."
```

### 4.3 라인 40
```
변경: "행정안전부 5/11 발표 기준이 적용됩니다."
```

### 4.4 라인 44
```
변경: "행정안전부 5/11 발표 기준이 적용됩니다."
```

### 4.5 라인 48 답변 전체 재작성 — 단순 치환 X (본문 모순 방지)

STEP 0.4 보고로 정확한 기존 답변 확인 후:
```
변경 후 (답변 전체 교체):
"행정안전부 5/11 발표에 따라 자산 제외 기준이 확정되었습니다.
다음 중 한 가지라도 해당하면 가구 전원이 지급 대상에서 제외됩니다.

- 가구원 합산 2025년 재산세 과세표준 12억원 초과 (공시가 약 26.7억원 수준)
- 가구원 합산 2024년 귀속 금융소득 2,000만원 초과

재산세 과세표준은 위택스, 금융소득은 홈택스에서 확인할 수 있습니다."
```

### 4.6 라인 52 외 영향 라인
STEP 0.4 보고에 추가 영향 라인 있으면 동일 패턴 처리.

---

## STEP 5 — `src/components/footer.tsx` 라인 84

```
기존:
"본 사이트는 정부 공식 사이트가 아니며, 안내 정보는 정책 확정 전 예상 기준으로 변경될 수 있습니다. 정확한 정보는 관할 주민센터 또는 카드사 앱을 통해 확인하시기 바랍니다."

변경:
"본 사이트는 행정안전부 발표 기준을 바탕으로 안내하며, 정부 공식 사이트가 아닙니다. 최종 대상 여부와 지급 수단은 신청 화면 또는 카드사·지자체 안내에서 확인하시기 바랍니다."
```

---

## STEP 6 — `src/data/updates.ts` "발표 예정" grep 기반 수정

```bash
grep -n "5월 중 발표\|발표 예정\|컷오프 5월" src/data/updates.ts
```

매칭 위치를 패턴 A/B로 교체:

### 6.1 어제 발행 글 (`secondary-application-guide-2026`)
```
변경: "2차 건보료 기준 (행안부 5/11 발표): 외벌이 직장가입자 1인 13만원, 2인 14만원, 3인 26만원, 4인 32만원 이하"
```

### 6.2 다른 글
```
패턴 A: "행안부 5/11 발표 기준 확정. 자세한 기준은 <a href=\"/eligibility\">자격 확인 페이지</a>에서 확인하세요."
패턴 B: "행안부 5/11 발표 기준 적용."
```

---

## STEP 7 — 검증

### 7.1 옛 수치 0건

```bash
grep -rn "185,400\|312,800\|405,200\|508,600" src/
grep -rn "185400\|312800\|405200\|508600" src/
grep -rn "12,500\|145,200\|224,100\|318,700" src/
```
**기대: 전부 0건**

### 7.2 새 수치 + 신규 박스 반영

```bash
grep -n "130000\|140000\|260000\|320000\|390000\|430000" src/data/subsidy.ts
grep -rn "13만원\|14만원\|26만원\|32만원\|39만원\|43만원" src/app/
grep -rn "재산세\|금융소득\|2,000만원\|12억원" src/
grep -rn "맞벌이\|가구원 수\|다소득원" src/
grep -rn "혼합가구" src/app/eligibility/
grep -rn "1670-2626\|1577-1000" src/
```

### 7.3 "발표 예정" + "별도 산정" 0건

```bash
grep -rn "5월 중 발표\|발표 예정\|예상 기준\|컷오프 5월" src/
grep -rn "별도 산정" src/app/
```
**기대: 전부 0건**

### 7.4 monthlyIncome 컬럼 제거 확인

```bash
# 표 헤더에 "기준 중위소득" 노출 0건
grep -n "기준 중위소득" src/app/eligibility/page.tsx
grep -n "기준 중위소득" src/app/calculator/page.tsx
```
**기대: 0건 (SSOT subsidy.ts의 monthlyIncome 필드는 유지하되 페이지 렌더링에서 제거)**

### 7.5 FAQ 본문 모순 0건

```bash
grep -rn "발표된 바 없습니다\|추가 발표 예정" src/app/faq/
grep -n "가구원 수 +1명\|+1명 특례\|5인 기준" src/app/faq/
```
**기대: 옛 표현 0건, +1명 룰 1건 이상**

### 7.6 checkEligibility 3-way + result state status 반영

```bash
grep -n "needsCheck\|status:" src/data/subsidy.ts
grep -n "status:\s*[\"']\|result.status\|eligibility.status" src/app/calculator/page.tsx
```
**기대: needsCheck 분기 존재, calculator status 분기 존재**

### 7.7 EligibilityResult export 안 함

```bash
grep -n "export.*EligibilityResult\|export type EligibilityResult\|export interface EligibilityResult" src/data/subsidy.ts
```
**기대: 0건**

### 7.8 빌드

```bash
npm run build
```
- 빌드 성공
- TypeScript 에러 0
- 5인+ 지역가입자 셀에서 "확인 필요" 정상 렌더

### 7.9 라이브 curl (배포 후)

```bash
# 새 수치 반영
curl -s "https://support.fazr.co.kr/eligibility?_=$(date +%s)" | grep -oE "13만원|32만원|39만원|확인 필요|재산세|혼합가구" | head -10

# 옛 수치 0건
curl -s "https://support.fazr.co.kr/eligibility?_=$(date +%s)" | grep -oE "185,400|312,800|발표 예정|기준 중위소득|별도 산정" | head -5

# FAQ 본문 모순 0건
curl -s "https://support.fazr.co.kr/faq?_=$(date +%s)" | grep -oE "발표된 바 없습니다|추가 발표 예정" | head -3
curl -s "https://support.fazr.co.kr/faq?_=$(date +%s)" | grep -oE "32만원|가구원 수|재산세" | head -5

# calculator 페이지 로드 확인
curl -sI "https://support.fazr.co.kr/calculator" | head -3

# 어제 글
curl -s "https://support.fazr.co.kr/updates/secondary-application-guide-2026?_=$(date +%s)" | grep -oE "5월 중 발표|행안부 5/11" | head -3

# 회귀
curl -sI "https://support.fazr.co.kr/" | head -3
curl -sI "https://support.fazr.co.kr/regions" | head -3
```

---

## STEP 8 — 커밋 + 머지 + 배포

### 단일 커밋

```bash
git add src/data/subsidy.ts src/data/updates.ts \
        src/app/eligibility/page.tsx \
        src/app/calculator/page.tsx \
        src/app/faq/page.tsx \
        src/components/footer.tsx

git commit -m "fix(criteria): 건보료 기준 행안부 5/11 발표 반영 (핫픽스 v4)

- subsidy.ts: 직장 1~6인, 지역 1~4인 SSOT 갱신
- checkEligibility 3-way (eligible/ineligible/needsCheck) 구간 분기
- 1~4인 lower/upper 구간 판정 (가입자 유형 불명확 시 needsCheck)
- 5인+ 무조건 needsCheck (탈락 처리 X)
- result state에 status 필드 추가
- 옛 수치(185,400 등) 전부 제거
- monthlyIncome 컬럼 제거 (옛 추정값 노출 차단)
- '별도 산정' → '확인 필요'로 통일
- 혼합가구 = 표 직후 별도 박스로 분리 (4인 30만원 안내)
- needsCheck 시 금액 자리에 '콜센터 확인 후 산정 가능' 박스
- 자산 제외(재산세 12억/금융 2천만), 맞벌이 +1명 페이지 박스 반영
- FAQ 자산 기준 답변 전체 재작성 (본문 모순 제거)
- FAQ 맞벌이 답변에 +1명 특례 추가
- footer 면책 문구 갱신
- updates.ts 발표 예정 문구를 행안부 5/11 기준으로 교체

영향: /eligibility /calculator /faq /updates 본문 + footer 공통
신규 글 발행 및 FAQ 신규 Q&A는 커밋 2로 분리
calculator 가입자 유형 UI 추가, 5인/6인 옵션 분리는 커밋 3으로 분리"
```

### main 머지·배포

```bash
git checkout main
git merge hotfix/criteria-20260511
git push origin main
```

Vercel 빌드 완료 후 STEP 7.9 curl 재실행.

---

## 🛑 절대 룰

1. **STEP 0 mini-audit 후 보고.** 신규 필드 추가 / 예상 못 한 구조 시 중단.
2. **6인 가구 엔트리 추가 = tuple 길이 변경 = OK**
3. **checkEligibility status 필드 추가 = 핫픽스 예외 허용**
4. **EligibilityResult 타입 export 금지** (함수 내부/모듈 내부만)
5. **result state status 필드 추가 = 핫픽스 예외 허용**
6. **신규 필드 추가 금지** (`insuranceMixed` 등) → 보고 후 대기
7. **5인+ = 절대 ineligible 처리 X. needsCheck 강제.**
8. **1~4인 구간 분기 (lower/upper) 반드시 적용 — Math.max 단독 금지**
9. **needsCheck 시 amount 0 노출 금지** → "콜센터 확인 후 산정 가능" 박스
10. **monthlyIncome 컬럼 페이지 렌더링에서 제거** (SSOT 필드는 유지)
11. **"별도 산정" → "확인 필요"로 통일**
12. **혼합가구 = 표 컬럼 X, 표 직후 별도 박스**
13. **1차 취약계층 금액(55만/45만)과 2차 일반 금액(10~25만) 절대 혼합 X**
14. **FAQ 라인 48 = 단순 치환 X. 답변 전체 재작성**
15. **FAQ 라인 36 = +1명 특례 보강**
16. **신규 updates 글 발행 X** (커밋 2)
17. **FAQ 신규 Q&A 추가 X**
18. **신규 export 추가 X**
19. **calculator 가입자 유형 UI 추가 X** (커밋 3)
20. **calculator "5인/6인" 옵션 분리 X** (커밋 3)
21. **updates.ts 라인 번호 의존 X** (grep 기반)
22. **단일 커밋, 6개 파일만**
23. **Playwright 시각 검증은 포그린 직접**

## 📋 최종 보고 형식

```
=== 건보료 기준 5/11 발표 반영 핫픽스 v4 완료 ===

[STEP 0 mini-audit]
- checkEligibility 함수 위치/구조: ...
- result state 타입 위치: ...
- 표 monthlyIncome 컬럼 위치: ...
- "별도 산정" 노출 위치: ...
- calculator 가입자 유형 UI: 없음 (재확인)
- FAQ 라인 36/48 답변 전문: ...
- updates.ts "발표 예정" 매칭: ...
- monthlyIncome 컨슈머(보강 1): ...

[STEP 1 SSOT]
- incomeThresholds 갱신: ✅
- 6인 엔트리 추가: ✅
- checkEligibility 3-way 재작성: ✅
- lower/upper 구간 분기: ✅
- EligibilityResult export: 없음 ✅

[STEP 2 eligibility]
- monthlyIncome 컬럼 제거: ✅
- "별도 산정" → "확인 필요": ✅
- 혼합가구 박스 (표 직후): ✅
- 자산 제외 박스: ✅
- 맞벌이 박스: ✅

[STEP 3 calculator]
- result state status 추가: ✅
- status 3-way 분기 UI: ✅
- needsCheck 금액 박스 ("콜센터 확인 후 산정 가능"): ✅
- 5인+ 안내 (결과 박스 상단): ✅
- 자산 박스: ✅
- 표 "별도 산정" → "확인 필요" (보강 2): ✅

[STEP 4 FAQ]
- 라인 28/32/40/44 갱신
- 라인 36 +1명 특례 보강: ✅
- 라인 48 전체 재작성: ✅
- 신규 Q&A: 0건

[STEP 5 footer]
- 라인 84 변경: ✅

[STEP 6 updates]
- grep 매칭 수정: ...

[STEP 7 검증]
- 옛 수치 0건: ✅
- 새 수치 반영: ✅
- 발표 예정 0건: ✅
- 별도 산정 0건: ✅
- 기준 중위소득 컬럼 0건: ✅
- FAQ 본문 모순 0건: ✅
- checkEligibility 3-way: ✅
- EligibilityResult export 0건: ✅
- 빌드: 성공
- curl 라이브: ✅
- 회귀: 0

[STEP 8 커밋·머지·배포]
- 브랜치: hotfix/criteria-20260511
- 커밋 해시: ...
- main 머지: ✅
- Vercel 빌드: 완료
- 라이브 확인: 정상

[발견 이슈]
- (있으면)

[커밋 2 대기 항목]
- 신규 업데이트 글: health-insurance-criteria-confirmed-2026
- FAQ 신규 Q&A 3건

[커밋 3 대기 항목]
- calculator 가입자 유형 UI
- calculator "5인/6인 이상" 옵션 분리
- checkEligibility 시그니처 확장
```

---

## 📚 참고 — 기존 사이트 룰 (SESSION-HANDOFF.md 발췌)

- **body/html에 높이 클래스 금지** — h-full, min-h-full, min-h-screen 넣으면 iOS 스크롤 버그 재발
- **GA4 + AdSense = next/script + strategy="afterInteractive"** — 원시 `<script async>` 금지
- **VignetteCleanup 건드리지 마라** — 자동 광고 충돌 방지 핵심
- **NoticeBox prose 밖 유지** — prose 안에 넣으면 li margin 충돌
- **Vercel env** — printf로 줄바꿈 없이 추가, 변경 후 재배포 필수
- **Ignored Build Step 활성** — `.md`만 변경 시 빌드 스킵 (Vercel Dashboard 설정 완료)
- **검증 필수** — 수정 후 grep + curl로 라이브 사이트 확인
