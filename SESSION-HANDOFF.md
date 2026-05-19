# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code / Claude UI / GPT 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.
> 5/19 세션 종료 갱신 (건보료 확장 + 카드사 링크 + 글 4 + 글 1·3 보강).

## 새 세션 시작 시 (READ ME FIRST)

```
SESSION-HANDOFF.md 읽고 현재 상태 파악.
P2 큐 확인 후 다음 작업 결정.
```

### 핵심 문서
1. **SESSION-HANDOFF.md** (이 파일) — 현 상태 / 룰 / 다음 작업
2. **docs/handoff/HANDOFF-20260519.md** — 5/19 세션 상세 인수인계

### 역사 문서 (참조용)
- docs/handoff/HANDOFF-20260517.md — 5/17 D-Day 전환 + Q&A 글 3개
- docs/handoff/HANDOFF-20260512.md — 5/12 P0/P1/P1.5 + Article schema

---

## 마지막 세션: 2026-05-19

### 프로젝트 상태: 운영 중 + 2차 신청 진행중 (5/18~7/3)

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main)
- **배포**: Vercel 자동 (push → 빌드)
- **Ignored Build Step**: .md만 변경 시 빌드 스킵
- **총 페이지**: 115개
- **updates 글**: 16개
- **main HEAD**: `0f4ff3a`

### 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — render prop, asChild 없음)
- Pretendard 폰트 (CDN)

### 콘텐츠 현재 상태

- subsidy.ts status: **"신청중"**
- Hero 배지: **"2차 신청 진행중 (5/18~7/3)"**
- 스키니바: **"2차 신청 진행중 — 5부제·신청 방법·사용처 확인"**
- 건보료 기준표: **1~10인 이상** (외벌이 + 다소득원 + 혼합)
- 카드사 링크: **14개 서비스** 글 3 하단 표
- FAQ: **28개** (JSON-LD 동기화)
- FAQPage: 글 1(9) + 글 2(10) + 글 3(10) + 글 4(9) = **38개**
- Article JSON-LD: 16개 글 전체 적용
- 시간 의존 표현: src/ 전체 0건

### 5/19 완료 작업 요약

| 커밋 | 해시 | 내용 |
|---|---|---|
| 1 | 600f37a | 건보료 기준표 10인 이상 확장 + 혼합 + 다소득원 |
| 2 | 94f0c59 | 카드사 링크 14개 + FAQ 2개 |
| A | 152ff83 | 글 4 카드 사용·결제 Q&A + FAQ 5개 |
| B | 0f4ff3a | 글 1 해외 체류 + 글 3 이사 차액 |

### 다음 작업 (P2 큐)

| # | 항목 | 긴급도 |
|---|---|---|
| 1 | 홈 카드사 신청 CTA (짧은 안내 + 글 3 링크) | 중간 |
| 2 | 다소득원 calculator UI (체크박스 + +1명) | 중간 |
| 3 | Article schema datetime ISO 8601 + author.url | 낮음 |
| 4 | summaryBox 글별 데이터화 (옵션 B) | 낮음 |
| 5 | 환산 연소득 eligibility 노출 | 낮음 |
| 6 | Button nativeButton 전수 리팩토링 | 낮음 |

### 운영 룰

1. 시간 의존 표현 금지 ("현재는~" "~예정" → 일정형)
2. 푸시 전 localhost 검증 필수
3. 과거 보도형 updates 글 본문 = 역사 자료 (수정 X)
4. 신규 글 = 기존 글 prose 패턴 (커스텀 className 금지)
5. 6 Gate: 정합성 → schema → 시간 의존 → 본문 → diff → 빌드/푸시
6. 5인+ = 이제 정상 판정 (needsCheck 방어용만 잔존)
7. VignetteCleanup 건드리지 마라
8. push는 main 직접 (PR 우회 가능)
9. 캡처 원문 직접 대조 불가 시 보고

### 색인 요청 상태 (5/19)

- 글 4 GSC + 네이버 색인 요청 완료
- sitemap.xml에 글 4 포함 확인
