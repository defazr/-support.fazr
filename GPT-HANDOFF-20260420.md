# GPT HANDOFF — 2026-04-20

> Claude Code 세션 완료. GPT가 이 파일을 읽고 다음 전략을 설계한다.

## 이전 핸드오프(GPT-HANDOFF-20260418.md) 이후 커밋 2개

| # | 커밋 | 내용 |
|---|---|---|
| 1 | e08a6a5 | chore(ads): add ads.txt for AdSense 판매자 인증 |
| 2 | 449e4b0 | fix(ads): AdSense Auto Ads hydration 타이밍 수정 (eitc 패턴 적용) |

머지 PR: #2, #3 (둘 다 main 반영 완료)

---

## 오늘(4/20) 핵심 작업 — AdSense 광고 노출 정상화

### 발단

사용자가 "만 명 가까이 들어왔는데 광고 안 나오잖아"로 긴급 알림. 특히 앵커(anchor)·전면(vignette) 광고 노출 실패.

### 진단 (수정 없이 조사만 진행)

라이브 사이트 + 코드 동시 조사:

**1. ads.txt 누락 확정**
- `public/ads.txt` 파일 부재 (`public/`에 `og/` 디렉토리만 존재)
- 라이브 `/ads.txt` → **404**
- AdSense 정책상 ads.txt 필수. 없으면 "승인되지 않은 판매자" 경고 + 수익성 광고주 입찰 배제

**2. AdSense 스크립트 hydration 타이밍 문제**
- `src/app/layout.tsx:67-72` — 원시 `<script async>` 태그를 `<head>` 안에 박음
- React hydration **전**에 실행되어 Auto Ads가 React 마운트한 `<ins>` 슬롯을 못 찾음
- 같은 파일 GA(line 77-88)는 `<Script strategy="afterInteractive">` body 안 위치로 정상
- **eitc.fazr.co.kr와 100% 동일한 원인** (eitc도 같은 패턴이었고 오늘 수정 후 정상화)

**왜 수동 슬롯 7개는 그래도 보이나**: `ad-slot.tsx:32-39`에서 useEffect로 마운트 후 `(window.adsbygoogle = window.adsbygoogle || []).push({})` 자기 등록. hydration 타이밍 영향 적음. 반면 Auto Ads는 페이지 자동 스캔 방식이라 hydration 전 실행 시 React 트리 못 봄.

### 조치 1: ads.txt 추가 (e08a6a5, PR #2)

```
google.com, pub-7976139023602789, DIRECT, f08c47fec0942fa0
```

- `public/ads.txt` 단일 파일 추가
- 배포 후 `curl -sI /ads.txt` → 200 OK 확인

### 조치 2: AdSense hydration 패턴 수정 (449e4b0, PR #3)

`src/app/layout.tsx` 67-72행 변경 — eitc 검증 패턴 그대로 이식.

**Before**:
```tsx
<head>
  {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
    <script async src="..." crossOrigin="anonymous" />
  )}
</head>
```

**After**:
```tsx
<head></head>
<body>
  {gaId && (<>...GA...</>)}
  {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
    <Script
      async
      src="..."
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  )}
</body>
```

**검증**:
- grep `<script async`: 0건 ✅
- grep `strategy="afterInteractive"`: 3건 (GA×2 + AdSense×1) ✅
- `npm run build`: 성공 (107 페이지) ✅
- 라이브 curl `adsbygoogle.js`: 매칭 ✅
- 라이브 curl `ads.txt`: 200 OK ✅

**무관 영역 (변경 없음)**:
- `ad-slot.tsx` 수동 슬롯 7개 push 로직
- `vignette-cleanup.tsx`
- AdSense pub ID, 슬롯 ID 7개

### 사용자 확인 결과

iPhone 사파리 새로고침 테스트 → "다 잘 되는 것 같아" 확정.

---

## 사이트 현재 상태 (2026-04-20)

| 항목 | 값 |
|---|---|
| URL | https://support.fazr.co.kr |
| 총 페이지 | 107개 |
| updates 글 | 8개 (변동 없음) |
| FAQ 항목 | 20개 (변동 없음) |
| 광고 슬롯 (수동) | 7개 ON (변동 없음) |
| **AdSense ads.txt** | **✅ 200 OK 응답** |
| **AdSense 스크립트 로드** | **✅ next/script + afterInteractive** |
| GA4 | G-GQTTM24X4D (변동 없음) |
| 스키니바 | 국민비서 알림 (4/20 시작 — 오늘) |
| Hero 배지 | "4월 27일 지급 시작" (다음 전환 4/27) |
| subsidy.ts status | "확정" (4/27에 "지급중" 전환 예정) |
| 건보료 컷오프 | "5월 중 발표 예정" 유지 |

---

## 워크플로 메모

### 브랜치 전략 (사용자 확립 + 이번 세션 검증)

- 모든 작업: main 기준 새 브랜치 1개당 단일 목적 1 커밋
- 과거 브랜치 재사용 금지 (4/17 핸드오프 브랜치를 4/18 작업 후 머지 시도하면 과거 복원 위험)
- PR #2, #3 모두 main 직진 머지 후 검증 패턴 정상 동작

### 검증 워크플로

- 모바일 작업 중에는 Playwright 시각 검증 생략 → grep + curl로만 가능
- 라이브 curl 시 캐시 미스 가능 → 캐시버스터(`?cb=$(date +%s)`) 또는 `Cache-Control: no-cache` 헤더 사용
- AdSense 같은 외부 의존성은 24-48h 후 효과 안정화

---

## 거른 것 (수정 보류)

| 제안 | 판단 | 이유 |
|---|---|---|
| Auto Ads 명시 활성화 코드 추가 (`enable_page_level_ads`) | 보류 | 현재 대시보드 설정에 의존 + 사용자 "정상 작동" 확인. 필요 시 별도 작업 |

---

## 건드리지 않은 것 (확정 전)

- 건보료 컷오프 기준 — 5월 초 발표 예정
- calculator 취약계층 +5만원 로직
- 전담 콜센터 구체 번호 — "4월 중 개설" 유지
- gov-links.ts active:false — 유지

---

## 다음 작업 후보 (GPT 판단)

1. **4/25~4/26**: 4/27 전환 통합 지시서 (스키니바 + Hero + status + 신규 글 + 요일제) — 4/18 핸드오프에서 이월
2. **5월 초**: 건보료 컷오프 발표 반영
3. AdSense 광고 노출 안정성 24-48h 후 재모니터링
4. calculator 취약계층 로직 보완
5. 전담 콜센터 번호 확정 시 FAQ Q18 업데이트
6. GA4 + AdSense 수익 지표 비교 (조치 전후)
7. 검색 유입 키워드 분석 → 콘텐츠 확장

---

## 원칙 추가 (이번 세션에서 확립)

1. **외부 스크립트는 next/script로 통일** — `<script async>` 원시 태그는 React hydration 타이밍 문제 유발. AdSense Auto Ads 같은 페이지 스캔 방식 스크립트에 치명적.
2. **타 사이트(eitc/fuel/calc) 검증된 패턴 그대로 이식** — 추측으로 변형 금지.
3. **ads.txt는 첫 배포 시 동시 추가** — AdSense 정책 필수. 누락 시 수익성 광고주 즉시 배제.
4. **긴급 수익 이슈는 최소 침습 + 단일 목적 커밋** — ads.txt(파일 1개) → hydration 수정(파일 1개 1블록) 분리. 롤백 단위 작게.

---

## 한 줄 핵심

ads.txt 추가 + AdSense 스크립트 next/script 전환으로 광고 노출 정상화. eitc와 동일 패턴 이식 검증 완료. 수익 회복.
