# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code / Claude UI / GPT 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.
> 5/12 세션 종료 갱신 (P0+P1+P1.5 완료 + 신규 글 + Article schema).

## 새 세션 시작 시 (READ ME FIRST)

```
SESSION-HANDOFF.md 읽고 현재 상태 파악.
P2 큐 확인 후 다음 작업 결정.
```

### 핵심 문서
1. **SESSION-HANDOFF.md** (이 파일) — 현 상태 / 룰 / 다음 작업
2. **docs/handoff/HANDOFF-20260512.md** — 5/12 세션 상세 인수인계

### 역사 문서 (참조용)
- GPT-HANDOFF-20260512.md / v2 — 5/12 오전/저녁 narrative
- HOTFIX-STATUS-20260513.md — P0 실행 스펙 (완료)
- HOTFIX-CRITERIA-20260511.md — 건보료 핫픽스 스펙 (완료)

---

## 마지막 세션: 2026-05-12

### 프로젝트 상태: 운영 중 + 1차 종료 + 정비 기간 (5/9~5/17) + 2차 5/18 시작

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main)
- **배포**: Vercel 자동 (push → 빌드)
- **Ignored Build Step**: .md만 변경 시 빌드 스킵
- **총 페이지**: 111개
- **updates 글**: 12개
- **main HEAD**: `fc02af5` (PR #12 머지)

### 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — render prop, asChild 없음)
- Pretendard 폰트 (CDN)

### 환경변수 (Vercel)

| 변수 | 값 |
|---|---|
| NEXT_PUBLIC_GA_ID | G-GQTTM24X4D |
| NEXT_PUBLIC_ADSENSE_PUB_ID | pub-7976139023602789 |

### 콘텐츠 현재 상태

- subsidy.ts status: **"정비중"**
- Hero 배지: **"2차 신청 5월 18일~7월 3일"**
- 스키니바: **"2차 신청 5월 18일~7월 3일 — 5부제 일정과 주유소 사용처 확인"**
- 홈 정비 박스: **"신청 일정 안내"** (일정형, 시간 의존 표현 0)
- 홈 1줄 신뢰: **"294만 4,073명 신청"** (행안부 5/8 18시 기준)
- FAQ: 21개 항목 (이의신청 Q&A 신규, 콜센터 1670-2626)
- eligibility: 박스 4개 (혼합/자산/맞벌이/이의신청)
- Article JSON-LD: 12개 글 전체 적용
- FAQPage JSON-LD: 자동 생성 (본문 동기화)
- 건보료 컷오프: 확정 반영 완료 (행안부 5/11 발표)
- 시간 의존 표현: src/ 전체 0건

### 5/12 완료 작업 요약

| PR | 내용 |
|---|---|
| #10 | P0: Hero + status "정비중" + 정비 박스 |
| #11 | P1: 이의신청 + 294만 통계 + weekly 종료 |
| #12 | P1.5 + 신규 글 + Article schema + dev fixes |

### 다음 작업 (P2 큐)

| # | 항목 | 긴급도 |
|---|---|---|
| 1 | 환산 연소득 eligibility 노출 | 낮음 |
| 2 | 1차 중복 불가 FAQ | 낮음 |
| 3 | "핵심 요약" 박스 하드코딩 → 글별 데이터 | 중간 |
| 4 | Button nativeButton 전수 리팩토링 | 낮음 |
| 5 | Article schema ISO 8601 + author.url | 낮음 |

### 5/18 D-Day 필수 작업

- status "정비중" → "신청중" 전환 (subsidy.ts + banner.ts)
- Hero 배지 / 정비 박스 문구 갱신 (2차 진행중 톤)

### 운영 룰

1. 시간 의존 표현 금지 ("현재는~" "~예정" → 일정형)
2. 푸시 전 localhost 검증 필수
3. 과거 보도형 updates 글 본문 = 역사 자료 (수정 X)
4. 신규 글 = 기존 글 prose 패턴 (커스텀 className 금지)
5. 구조화 데이터 추가 = rich result 보장 아님 (eligibility 충족)
6. 6 Gate: 정합성 → schema → 시간 의존 → 본문 → diff → 빌드/푸시
7. 5인+ = 무조건 needsCheck
8. 1~4인 lower/upper 구간 분기 유지
9. VignetteCleanup 건드리지 마라
10. push는 claude/* 브랜치 우회 → PR 머지

### 색인 요청 상태 (5/12)

- GSC sitemap.xml 제출 완료
- 네이버/GSC 개별 URL: 사용자 직접 수행 중
- 신규 글 sitemap 포함 확인 완료
