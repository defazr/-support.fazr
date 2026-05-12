# HOTFIX SPEC — 1차 종료 후 운영 상태 반영 (P0)

> **새 Claude Code 세션 시작용 핸드오프.**
> 5/13 첫 작업으로 이 파일의 STEP 0부터 시작.
> 사용자가 직접 작성한 지시서 (GPT 의존 X).

---

## 📌 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 (저녁) |
| 실행 예정 | 2026-05-13 오전 |
| 브랜치 (예상) | `hotfix/status-maintenance-20260512` (※ 프록시 제약 시 `claude/check-memory-handoff-4RKK5` 대체) |
| 베이스 | main `6f4ea20` (PR #8 머지 후, gas station 핫픽스 반영) |
| 사이트 | https://support.fazr.co.kr |

### 직전 작업 (5/12)
- PR #5: 건보료 5/11 발표 핫픽스 v4 (스펙 + 코드)
- PR #6: DisclaimerBanner 보강
- PR #7: 핸드오프 문서 3종
- PR #8: 주유소 5/1 사용처 확대 핫픽스
- 전수 오디트 완료 (P0 3건 / P1 3건 / P2 2건 발견)

---

## 🚨 작업 목적

5/8 1차 신청 종료된 지 4일 경과했으나 사이트는 여전히 "1차 신청 진행중 (4/27~5/8)" 만료 문구 노출 중. 전수 오디트에서 P0 3건 발견 = 운영 상태 모델 자체가 갱신 안 됨.

**핵심 목표:**
- Hero 배지에서 만료 문구 제거
- 5/9~5/17 시스템 정비 기간 명시
- status 데이터(subsidy.ts / banner.ts) 실제 상태와 정합화

---

## ⚠️ 작업 범위 한정

### 포함 (단일 커밋, 3개 파일 예상)
1. `src/app/page.tsx` — Hero 배지 문구 + 시스템 정비 안내
2. `src/data/subsidy.ts` — status 처리
3. `src/data/banner.ts` — status 정합성

### 제외 (절대 손대지 말 것)
- ❌ P1/P2 작업 (이의신청 FAQ, 1차 통계, weekly 글, 환산 연소득)
- ❌ 신규 글 발행
- ❌ calculator / eligibility / faq 페이지 본문
- ❌ 디자인 시스템 / shadcn / 광고 / Cloudflare
- ❌ regions / sitemap

### ⏰ 시간 제약
mini-audit 5분 + 변경 20분 + 검증 10분 + 커밋 5분 = **40분 이내**

---

## 🌿 브랜치 전략

```bash
git checkout main
git pull origin main
git checkout -b hotfix/status-maintenance-20260512
```

**프록시 제약 확인**: 만약 hotfix 브랜치 푸시가 HTTP 403이면, 5/12와 동일하게 `claude/check-memory-handoff-*` 브랜치로 우회.

빌드 통과 + 검증 완료 후 main 머지.

---

## STEP 0 — 변경 전 mini-audit (5분)

### 0.1 SubsidyStatus 타입 정의 + 컨슈머 전수

```bash
grep -n "type SubsidyStatus\|SubsidyStatus" src/data/subsidy.ts

grep -rn "SUBSIDY_CONFIG.status\|config.status\|subsidy.status\|\.status" src/app src/components | grep -v "node_modules"

grep -rn '"신청중"\|"심사중"\|"확정"\|"지급중"\|"종료"' src/app src/components
```

**보고:**
- SubsidyStatus 타입 정의 정확한 위치 (라인)
- 현재 union 값 목록 (이미 알려짐: "심사중" | "확정" | "신청중" | "지급중" | "종료")
- subsidy.status 읽는 곳: 파일 + 라인 목록
- 각 status 값에 따른 UI 분기 패턴 (switch / if 등)

### 0.2 banner.ts 구조 + 컨슈머

```bash
cat src/data/banner.ts
grep -rn "SKINNY_BAR.status\|banner.status" src/app src/components
```

**보고:**
- banner.ts 전체 구조 (이미 알려짐: text/link/active/status 4필드)
- banner.status 읽는 곳

### 0.3 홈 Hero 배지 위치 + 주변 구조

```bash
sed -n '70,100p' src/app/page.tsx
grep -n "1차 신청 진행중\|4/27~5/8" src/app/page.tsx
```

**보고:**
- Hero 배지 정확한 라인 + 주변 JSX 구조 (이미 알려짐: page.tsx:85)
- 배지가 단순 문자열인지 / status 기반 동적 렌더인지

### 0.4 시스템 정비 / 2차 시작 문구 기존 위치

```bash
grep -rn "5/9~5/17\|시스템 정비\|정비 기간\|2차 신청 시작\|2차 신청 5/18" src/
```

**보고:**
- 기존 문구 위치 (있다면 패턴 재사용)
- 이미 확인된 위치: updates.ts:33-34, 207-208, 220-221

### 🛑 STEP 0 보고 후 분기 처리 (사용자 결정 대기)

**옵션 A (타입 확장):**
- SubsidyStatus union에 `"정비중"` 추가
- subsidy.ts + banner.ts status 값 `"신청중"` → `"정비중"`
- 컨슈머의 모든 status 분기에 `"정비중"` 케이스 추가
- 조건: 컨슈머가 단순 표시용이면 안전

**옵션 B (타입 유지 + UI 문구만 변경):**
- SubsidyStatus 변경 X
- subsidy.ts / banner.ts status 값 변경 X
- page.tsx에서만 직접 "정비중" 메시지 렌더
- 조건: 컨슈머가 많거나 분기 처리 복잡할 때 안전

→ mini-audit 결과 보고 후 사용자 결정 받고 STEP 1 진행.

---

## STEP 1 — `src/data/subsidy.ts` status 처리

### 옵션 A (타입 확장)

```typescript
// 기존
export type SubsidyStatus = "심사중" | "확정" | "신청중" | "지급중" | "종료";

// 변경
export type SubsidyStatus = "심사중" | "확정" | "신청중" | "정비중" | "지급중" | "종료";
```

status 값 변경:
```typescript
status: "정비중"  // 기존 "신청중"에서 변경
```

⚠ 컨슈머에서 "정비중" 분기가 누락되면 UI가 빈 값 출력 가능. STEP 0.1에서 확인한 모든 컨슈머에 "정비중" 케이스 추가 필요.

### 옵션 B (타입 유지)

status 변경하지 않음. 대신 page.tsx에서 status 값을 무시하고 직접 "정비중" 메시지 렌더.

→ STEP 0 결과로 옵션 결정 후 진행.

---

## STEP 2 — `src/data/banner.ts` status 정합성

### 현재 상태 (이미 확인됨)
```typescript
export const SKINNY_BAR = {
  text: "5/18 2차 신청 시작 예정 — 5부제 일정과 주유소 사용처 확인",
  link: "/updates/secondary-application-guide-2026",
  active: true,
  status: "신청중" as const,
};
```

### 옵션 A 채택 시
```typescript
status: "정비중" as const,
```

### 옵션 B 채택 시
- status 변경하지 않음
- text는 이미 정합 ("시작 예정")이므로 그대로 유지

---

## STEP 3 — `src/app/page.tsx` Hero 배지 + 시스템 정비 안내

### 3.1 Hero 배지 문구 변경 (라인 85 — 이미 확인됨)

```
기존 (line 85): "1차 신청 진행중 (4/27~5/8)"
변경: "2차 신청 5/18 시작 예정 — 첫 주 5부제 적용"
```

⚠ 배지가 status 기반 동적 렌더라면, status 값에 따라 자동 변경되도록 처리 (옵션 A 채택 시).

### 3.2 시스템 정비 기간 안내 박스 추가

Hero 직하 또는 기존 스키니바 직하에 신규 박스 1개 추가:

```html
<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
  <p class="font-semibold text-blue-800">시스템 정비 기간 안내</p>
  <p class="text-blue-700 mt-1">
    현재 5/9~5/17은 1차 신청 종료 후 2차 신청 준비를 위한 시스템 정비 기간입니다.
    2차 신청은 5월 18일(월) 09:00부터 시작되며, 첫 주에는 출생연도 끝자리 5부제가 적용됩니다.
  </p>
  <a href="/updates/secondary-application-guide-2026" class="text-blue-700 underline text-sm mt-2 inline-block">
    2차 신청 가이드 자세히 보기 →
  </a>
</div>
```

### 위치 결정 (STEP 0 보고에 따라)
- Hero 영역 내부에 통합 가능하면 통합
- 분리가 자연스러우면 Hero 직하

---

## STEP 4 — 검증

### 4.1 만료 문구 제거 확인

```bash
grep -n "1차 신청 진행중" src/app/page.tsx
grep -n "1차 신청 진행중 (4/27~5/8)" src/
```

기대: 홈/subsidy/banner에서 0건
(※ updates.ts / FAQ의 역사 정보 "4/27~5/8"은 0건 검증 대상 아님 — 역사 정보로 유지)

### 4.2 새 문구 반영 확인

```bash
grep -n "2차 신청 5/18\|시스템 정비\|5/9~5/17" src/app/page.tsx
grep -n "정비중" src/data/subsidy.ts src/data/banner.ts
```

기대: 새 문구 1건 이상

### 4.3 빌드

```bash
npm run build
```
- 빌드 성공
- TypeScript 에러 0
- status 컨슈머에서 누락된 case 없음

### 4.4 라이브 curl (배포 후)

```bash
# 홈에서 만료 문구 0건
curl -s "https://support.fazr.co.kr/?_=$(date +%s)" | grep -oE "1차 신청 진행중" | head -3

# 새 안내 반영
curl -s "https://support.fazr.co.kr/?_=$(date +%s)" | grep -oE "2차 신청 5/18|시스템 정비|5/9~5/17" | head -5

# 회귀
curl -sI "https://support.fazr.co.kr/" | head -3
curl -sI "https://support.fazr.co.kr/eligibility" | head -3
curl -sI "https://support.fazr.co.kr/calculator" | head -3
curl -sI "https://support.fazr.co.kr/faq" | head -3
```

---

## STEP 5 — 커밋 + 머지

```bash
# 실제 변경 파일이 3개 초과 시 보고 후 진행
git add src/app/page.tsx src/data/subsidy.ts src/data/banner.ts

git commit -m "fix(status): 1차 종료 후 시스템 정비 상태 반영 (P0)

- 홈 Hero 배지 '1차 신청 진행중 (4/27~5/8)' 만료 문구 제거
- 5/9~5/17 시스템 정비 기간 안내 박스 추가
- 2차 신청 5/18 시작 예정 상태 명시
- subsidy.ts status: 신청중 → 정비중 (또는 타입 유지 + UI 처리)
- banner.ts status 정합성 정리

영향: 홈 운영 상태 안내
P1 작업(이의신청 FAQ, 1차 통계, weekly 글 갱신)은 별도 진행"

# 프록시 제약으로 main 직접 푸시 불가 시 claude/* 우회 후 PR 머지
```

Vercel 빌드 완료 후 STEP 4.4 curl 재실행.

---

## 🛑 절대 룰

1. **STEP 0 mini-audit 후 보고 + 옵션 A/B 결정 대기**
2. **status 컨슈머 영향 사전 점검 필수** (타입 확장 시 누락 case 0)
3. **변경 파일 3개 초과 시 보고 후 진행**
4. **P1/P2 작업은 절대 같이 하지 않음**
5. **updates.ts / FAQ 본문의 "4/27~5/8" 역사 정보는 건드리지 않음**
6. **광고 슬롯 / CTA 위치 절대 변경 X**
7. **단일 커밋, 빌드 1회**
8. **Playwright 시각 검증은 포그린 직접**

---

## 📋 최종 보고 형식

```
=== 5/12 운영 상태 P0 핫픽스 완료 ===

[STEP 0 mini-audit]
- 브랜치: hotfix/status-maintenance-20260512 (또는 claude/* 우회)
- 작업 트리 clean: yes
- SubsidyStatus 타입 정의: 파일:라인
- 현재 union 값: ...
- status 컨슈머 목록: 파일:라인 N개
- status 값별 UI 분기: 있음/없음 (있다면 패턴)
- banner.ts 구조: text/link/active/status 4필드
- Hero 배지 위치: page.tsx:N
- 옵션 A/B 결정: ...

[STEP 1-3 변경]
- subsidy.ts: status 변경 (라인 N) / 타입 변경 (라인 N) / 또는 유지
- banner.ts: status 변경 (라인 N) / 또는 유지
- page.tsx: Hero 배지 (라인 N) + 시스템 정비 박스 (라인 N)

[STEP 4 검증]
- 만료 문구 0건: ✅
- 새 문구 반영: ✅
- 빌드: 성공
- curl 라이브: ✅
- 회귀: 0

[STEP 5 커밋·머지]
- 커밋 해시: ...
- main 머지: ✅
- Vercel 빌드: 완료
- 라이브 확인: 정상

[발견 이슈]
- (있으면)
```

---

## 📚 P1/P2 후속 작업 큐 (이번 P0 후 진행)

### P1 (5/13~5/14)
1. **이의신청 5/18~7/17 안내** — FAQ Q&A 신규 추가 + eligibility 1줄 보강
2. **1차 신청자 통계 107만/6094억** — 신규 글 발행 또는 홈 박스
3. **5부제 amber 박스 링크 정리** — weekly-application-schedule-2026 글 갱신 또는 링크 변경

### P2 (5/15+)
4. **환산 연소득 노출 확장** — eligibility 박스에 추가 (FAQ에는 이미 있음)
5. **1차 중복 불가 FAQ Q&A 추가** — 1차 수급자 혼란 방지

### 별도 큐 (커밋 2/3 분리)
- **커밋 2**: 신규 글 발행 `health-insurance-criteria-confirmed-2026`
- **커밋 3**: calculator 가입자 유형 UI (직장/지역 Select)

---

## 🔗 시작 명령

새 세션에서:

```
GitHub 메모리/핸드오프 숙지해. SESSION-HANDOFF.md → GPT-HANDOFF-20260512.md / -v2.md → 이 파일(HOTFIX-STATUS-20260513.md) 순서로 읽고, STEP 0 mini-audit부터 시작.
```
