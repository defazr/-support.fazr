# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.

## 마지막 세션: 2026-04-07

### 프로젝트 상태: ✅ MVP 완성 + 라이브

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **총 페이지**: 103개

### 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — asChild 없음, render prop 사용)

### 환경변수 (Vercel)

| 변수 | 상태 |
|---|---|
| `NEXT_PUBLIC_GA_ID` | ❌ 미설정 |
| `NEXT_PUBLIC_ADSENSE_PUB_ID` | ❌ 미설정 (코드 준비 완료, `pub-7976139023602789` 넣으면 ON) |

### 데이터 파일

모든 수치는 `src/data/`에서 중앙 관리:
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

### 주의사항

1. **구조 변경 금지** — 수정 시 CSS 클래스만 변경, JSX/컴포넌트 재작성 금지
2. **shadcn v4** — `asChild` 대신 `render` prop, Accordion에 `type`/`collapsible` 없음
3. **Tailwind v4** — 플러그인은 `@plugin` 구문 (globals.css)
4. **Vercel env** — 값 끝에 줄바꿈 붙지 않게 주의 (printf 사용)
5. **정적 빌드** — 103페이지 모두 사전 렌더링, 빌드 약 10초

### 다음 작업 후보

1. GA4 환경변수 연결
2. 정책 변동 시 updates 글 추가 + data 파일 업데이트
3. 트래픽 유입 시 애드센스 ON
4. /faq → /regions/[slug] 광고 확장 (2~3단계)
5. 카카오톡 OG 공유 테스트
