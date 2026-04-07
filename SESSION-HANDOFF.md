# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.

## 마지막 세션: 2026-04-07 (v2)

### 프로젝트 상태: ✅ 운영 중 + GA4 활성

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **총 페이지**: 103개

### 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — asChild 없음, render prop 사용)
- Pretendard 폰트 (CDN)
- ui-ux-pro-max-skill 설치됨

### 환경변수 (Vercel)

| 변수 | 값 | 상태 |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-GQTTM24X4D` | ✅ 활성 |
| `NEXT_PUBLIC_ADSENSE_PUB_ID` | (비어있음) | ⏸ OFF (`pub-7976139023602789` 넣으면 ON) |

**중요**: NEXT_PUBLIC_ 변수는 빌드 타임. 추가/변경 후 `vercel --prod --yes` 재배포 필수.

### 디자인 시스템

- `design-system/고유가-피해지원금/MASTER.md` — 디자인 SSOT
- 컬러: Primary #0369A1, Background #F8FAFC, Text #020617
- 폰트: Pretendard
- 스타일: Accessible & Ethical (WCAG AAA)

### 데이터 파일

`src/data/`에서 중앙 관리:
- `regions.json` — 89개 지역
- `subsidy.ts` — 지원금 기준 + 계산 로직
- `gov-links.ts` — 정부 링크 (정책 확정 시 URL 교체)
- `banner.ts` — 스키니바 텍스트
- `updates.ts` — 업데이트 글 3개

### 광고 슬롯

| 위치 | 슬롯 ID | 상태 |
|---|---|---|
| 메인 Hero 아래 | 4106279506 | 코드 O, 송출 OFF |
| Calculator 결과 아래 | 1480116169 | 코드 O, 송출 OFF |
| Updates 글 중간 | 7853952826 | 코드 O, 송출 OFF |
| /faq 하단 | — | placeholder만 |
| /regions/[slug] CTA 아래 | — | placeholder만 |
| /eligibility 기준표 아래 | — | placeholder만 |

### SNS 공유 버튼

- 모바일: navigator.share() + 링크복사 (2개)
- PC: 네이버, X(트위터), 페이스북, 링크복사 (4개)
- SDK 없음, URL share 방식만

### 주의사항

1. **SSOT 전부 확인** — 항목 누락하면 나중에 전면 재작업 필요 (ui-ux-pro-max-skill 교훈)
2. **아닌 건 말해라** — 지시서가 와도 문제 보이면 먼저 의견 제시
3. **GA4 = next/script** — dangerouslySetInnerHTML 쓰지 마라
4. **구조 변경 금지** — CSS 클래스만 수정, JSX 재작성 금지
5. **shadcn v4** — asChild 대신 render prop
6. **Tailwind v4** — @plugin 구문 (globals.css)
7. **Vercel env** — printf로 줄바꿈 없이 추가, 변경 후 재배포 필수

### 다음 작업 후보

1. 색인 모니터링 (GSC 14개 핵심 페이지)
2. 카카오톡 OG 공유 테스트
3. 트래픽 유입 시 애드센스 ON
4. 정책 변경 시 updates 글 추가 + data 파일 업데이트
5. 2단계 광고 확장 (/faq → /regions/[slug])
