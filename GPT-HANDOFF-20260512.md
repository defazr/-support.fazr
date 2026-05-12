# GPT HANDOFF — 2026-05-12 (건보료 기준 5/11 발표 D+1)

## 오늘 성과 요약

- 행안부 5/11 2차 건보료 기준 공식 발표 → 사이트 전수 핫픽스 완료
- 계산 로직 자체 재작성 (3-way status + lower/upper 구간 분기)
- 5인+ 무조건 needsCheck (절대 탈락 처리 X)
- 신규 페이지 박스 3개 (혼합가구/자산제외/맞벌이) — 5/11 발표 정책 반영
- 라이브 4건 핵심 검증 통과: 옛 수치 0건 / 발표 예정 0건 / needsCheck 0원 미노출 / 빌드 통과
- PR 2건 머지 (#5 핫픽스 + #6 DisclaimerBanner 보강)

## 완료된 작업 (커밋 4개 + 머지 2개)

### 1. 핫픽스 스펙 문서화 (58fdc5f)
- HOTFIX-CRITERIA-20260511.md (946줄)
- v4 본문 + v4.1 보강 3건 통합
- 새 Claude Code 세션이 첫 번째로 읽고 시작 가능한 핸드오프 포맷

### 2. 건보료 기준 핫픽스 v4 (8286035)
- 6개 파일 / +182 / -58
- src/data/subsidy.ts:
  - 1~4인 새 값 (직장 13/14/26/32만, 지역 8/12/19/22만)
  - 5인 새 값 (직장 39만, 지역 0 유지)
  - **6인 엔트리 신규 추가** (직장 43만, 지역 0) — tuple 길이 +1
  - **checkEligibility 3-way 재작성**: `status: "eligible" | "ineligible" | "needsCheck"`
  - **lower/upper 구간 분기**: Math.min/Math.max로 보수 판정
  - 5인 이상 진입 시 즉시 needsCheck 반환 (이전 `eligible: false` 제거)
  - EligibilityResult 타입 export 안 함 (모듈 내부)
- src/app/eligibility/page.tsx:
  - "기준 중위소득 (예상)" 컬럼 제거 (옛 추정값 노출 차단)
  - "별도 산정" → "확인 필요" 통일
  - 표 하단 안내 4줄 추가 (행안부 5/11 + 콜센터 1670-2626/1577-1000)
  - 신규 박스 3개: 혼합가구(blue) / 자산제외(amber) / 맞벌이 특례(green)
- src/app/calculator/page.tsx:
  - CalcResult 타입에 status 필드 추가 (하위호환 eligible 유지)
  - amount 계산: `status === "eligible" ? ... : 0`
  - status 3-way 분기 UI (green/amber/gray)
  - needsCheck 시 금액 자리에 "콜센터 확인 후 산정 가능" 박스 (0원 노출 차단)
  - 5인+ 안내 = 결과 박스 상단 (result.members >= 5 조건)
  - 자산 제외 박스 (결과 하단 공통)
  - 표 "별도 산정" → "확인 필요"
  - 신청 경로 가드 status === "eligible"로 변경
- src/app/faq/page.tsx 6건 수정:
  - Q1(28): 4인 974만원 → 32만원/연 1억 682만원
  - Q2(32): 1인 185,400원/385만원 → 13만원/연 4,340만원
  - Q3(36): 맞벌이 +1명 특례 보강
  - Q4(40), Q5(44): 발표 예정 → 행안부 5/11 발표 기준
  - Q6(48): 답변 전체 재작성 (재산세 12억 + 금융 2,000만 명시)
- src/components/footer.tsx: 라인 84 면책 문구 갱신
- src/data/updates.ts: "발표 예정" 3건 grep 기반 교체

### 3. DisclaimerBanner 보강 (e2ea56b)
- 1개 파일 / +3 / -2
- src/components/disclaimer-banner.tsx 라인 8-9 면책 문구 갱신
- footer.tsx와 동일 패턴
- 라이브 검증 grep "예상 기준"에서 발견 → 후속 보강
- 8개 페이지 공통 컴포넌트라 영향 광범위

### 4. main 반영 (PR #5 / PR #6)
- PR #5 머지: 821952c (스펙 + 핫픽스 묶음)
- PR #6 머지: a83ee09 (DisclaimerBanner)
- Vercel 자동 배포 완료 → 라이브 반영

## 현재 사이트 상태

- 총 페이지: 110개 (1개 증가 — HOTFIX-CRITERIA-20260511.md 스펙 문서 추가)
- updates 글: 11개 (5/11 어제 secondary-application-guide-2026 신규 추가)
- 광고 슬롯: 10개 (변경 없음)
- subsidy.ts status: "신청중" (변경 없음 — 1차 5/8 종료됐지만 코드상 미반영)
- Hero: "1차 신청 진행중 (4/27~5/8)" (변경 없음 — 만료 문구 잔존)
- 스키니바: 5/11 변경된 2차 신청 가이드 링크 유지

## 사이트 신뢰성 개선

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| 건보료 컷오프 | "5월 중 발표 예정" 다수 페이지 | 행안부 5/11 발표 기준 노출 |
| 5인+ 가구 판정 | `eligible: false` → "별도 산정" Badge | `needsCheck` → "확인 필요" + 콜센터 박스 |
| 1~4인 구간 판정 | Math.max 단독 (관대) | lower/upper 분기 (보수, 모호 구간은 needsCheck) |
| 자산 기준 | "발표된 바 없습니다" (FAQ) | 재산세 12억 + 금융 2,000만 명시 |
| 맞벌이 특례 | 단순 합산 안내 | +1명 특례 명시 (FAQ + eligibility) |
| 혼합가구 | 안내 없음 | 4인 30만원 + 콜센터 안내 박스 |
| 면책 문구 | "정책 확정 전 예상" | "행정안전부 발표 기준" (footer + DisclaimerBanner) |

## 구조적 변경 완료

| 항목 | 상태 |
|---|---|
| checkEligibility 3-way 반환 | 완료 |
| result state status 필드 | 완료 |
| EligibilityResult 모듈 내부 | 완료 |
| 6인 엔트리 SSOT 추가 | 완료 |
| monthlyIncome 페이지 렌더 제거 | 완료 (SSOT 필드는 유지) |
| 박스 3개 신규 (eligibility) | 완료 |
| needsCheck 0원 차단 UI | 완료 |
| HOTFIX-CRITERIA-20260511.md | 완료 (스펙 문서 main 상주) |

## 별도 작업 큐 (5/13 이후)

| 우선순위 | 작업 | 비고 |
|---|---|---|
| 1 | 커밋 2: 신규 글 발행 health-insurance-criteria-confirmed-2026 | 5/18 D-Day 5일 전 색인 시간 확보 |
| 2 | 1차 종료 → 2차 대기 문구 (Hero/status/스키니바) | 4/27~5/8 만료 표현 정리 |
| 3 | 커밋 4: 사용처 정책 일괄 점검 (calc:413-429 + 동일 패턴 4곳) | 5/11 발표 후 사용처 변화 반영 필요 시 |
| 4 | 커밋 3: calculator 가입자 유형 UI 추가 | 직장/지역 선택 → checkEligibility 시그니처 확장 |
| 5 | FAQ 신규 Q&A 3건 (맞벌이/자산/5인+) | 검색 키워드 보강 |

## 5/13 작업 순서 권장

### 오전 (관찰)
1. 네이버 색인 반영 확인 (수집 요청 5건 처리 상태)
2. AdSense 5/12 vs 5/13 비교
3. GA — 신규 글(2차 신청 가이드) + eligibility 트래픽 변화

### 오후 (결정)
- 데이터 보고 우선순위 1~3 중 선택
- 5/18 D-Day 임박이므로 신규 글 발행이 가장 시급

## 5/12 색인 요청 던진 직후 상태

### 네이버 5건
1. /eligibility
2. /calculator
3. /faq
4. /updates/secondary-application-guide-2026
5. /sitemap.xml

### GSC 4건
1. /eligibility
2. /calculator
3. /faq
4. /updates/secondary-application-guide-2026

## 라이브 검증 4건 통과

| 체크 | 결과 |
|---|---|
| 옛 수치 0건 (185,400 / 312,800 / ...) | ✅ |
| 발표 예정 / 별도 산정 / 예상 기준 0건 | ✅ (DisclaimerBanner 보강 후) |
| needsCheck 0원 미노출 (콜센터 박스 표시) | ✅ |
| 빌드 통과 (`as const` + 6인 추가 TS 에러 0) | ✅ |

## 발견 이슈 / 회고

### audit 한계 (정직 평가)
- audit 1~10은 spec 명시 키워드(건보료/컷오프/발표 예정/예상 기준) 기준이라 정확
- DisclaimerBanner 누락: footer.tsx 외 별도 컴포넌트 미탐지 → 라이브 grep으로 발견 → 보강
- calculator/page.tsx:413-429 사용처/주유소 안내 블록: spec 범위 밖 (건보료 키워드 무관) → 5/13 별도 점검 필요

### 시스템 푸시 제약
- 로컬 프록시(127.0.0.1:34189)가 `claude/check-memory-handoff-4RKK5` 외 브랜치 push 차단 (HTTP 403)
- hotfix/criteria-20260511, main 직접 푸시 불가
- 우회: claude/* 브랜치로 푸시 → GitHub UI에서 PR 머지 (1차 PR #5, 2차 PR #6)
- 5/13 이후도 동일 패턴 (PR 1회씩) 진행 필요

### 잘된 부분
- v3/v4 검증 단계가 모두 도움됨 (블로커 사전 발견 → 추측 금지 룰 준수)
- HOTFIX-CRITERIA-20260511.md 스펙 문서가 새 세션 인계 효과적
- 단일 커밋 6개 파일 룰 준수
- lower/upper 구간 분기 — Math.max/min 단독 트랩 회피

## 핵심 메모 (5/13 세션 시작 시)

1. **5인+ 무조건 needsCheck**: SSOT subsidy.ts:77 진입 즉시 분기. 절대 false 처리 X.
2. **1~4인 구간 분기**: lower < monthlyInsurance <= upper = needsCheck. 자동 판정 X.
3. **EligibilityResult export 금지**: 함수 내부 또는 모듈 내부만.
4. **monthlyIncome SSOT 필드 유지**: subsidy.ts에는 있으나 페이지 렌더에서만 제거. 다른 컨슈머 보호.
5. **as const + tuple 변경**: 엔트리 +1은 OK, 필드 +1은 보고 후 대기.
6. **푸시 제약**: 항상 claude/check-memory-handoff-4RKK5에 푸시 후 PR 머지.
7. **사용처 정책 영역**: 건보료 spec과 별개로 5/11 발표 후 변화 가능성 → 5/13 별도 점검.
