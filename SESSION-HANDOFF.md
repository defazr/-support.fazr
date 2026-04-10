# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.

## 마지막 세션: 2026-04-11 (v2)

### 프로젝트 상태: ✅ 운영 중 + 광고 ON + 트래픽 유입 시작

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **총 페이지**: 104개

### 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + @tailwindcss/typography
- shadcn/ui v4 (@base-ui/react — asChild 없음, render prop 사용)
- Pretendard 폰트 (CDN)
- ui-ux-pro-max-skill 설치됨

### 환경변수 (Vercel)

| 변수 | 값 | 상태 |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-GQTTM24X4D` | ✅ 활성 (next/script) |
| `NEXT_PUBLIC_ADSENSE_PUB_ID` | `pub-7976139023602789` | ✅ 활성 |

**중요**: NEXT_PUBLIC_ 변수는 빌드 타임. 추가/변경 후 `vercel --prod --yes` 재배포 필수.

### 광고 슬롯 (7개)

| 위치 | 슬롯 ID | 타입 |
|---|---|---|
| 홈 Hero 아래 | 4106279506 | 디스플레이 |
| Calculator 결과 아래 | 1480116169 | 디스플레이 |
| Updates 글 중간 | 7853952826 | 디스플레이 |
| Eligibility 기준표 아래 | 1340925456 | 디스플레이 |
| Regions/[slug] CTA 아래 | 9027843789 | 디스플레이 |
| FAQ 하단 | 8171712676 | 멀티플렉스 |
| Updates 목록 중간 | 9379409604 | 멀티플렉스 |

### 핵심 컴포넌트

- **VignetteCleanup** (`vignette-cleanup.tsx`): Vignette 자동 광고 body 잔류 정리. MutationObserver. **건드리지 마라.**
- **AdSlot** (`ad-slot.tsx`): 디스플레이 + 멀티플렉스 통합. format/minHeight prop.
- **ShareButtons** (`share-buttons.tsx`): 모바일 navigator.share() / PC 네이버·X·페북·링크복사

### 콘텐츠 현재 상태 (2026-04-11)

- 추경: **통과 확정** (4/10 본회의)
- subsidy.ts status: "확정"
- 스키니바: "추경 통과! 4월 말 1차 지급 예정"
- 정부24 링크: **active=false** (국무회의 후 활성화)
- updates 글 4개 (속보 + 지급안내 + 신청방법 + 인구감소지역)

### 디자인 시스템

- `design-system/고유가-피해지원금/MASTER.md`
- Primary: #0369A1 (딥블루), Background: #F8FAFC, Text: #020617
- Pretendard, Accessible & Ethical (WCAG AAA)

### 주의사항

1. **body/html에 높이 클래스 금지** — h-full, min-h-full, min-h-screen 넣으면 iOS 스크롤 버그 재발. min-h-dvh는 main에만.
2. **SSOT 전부 확인** — 항목 누락 금지
2. **아닌 건 말해라** — 지시서가 와도 문제 보이면 의견 제시
3. **GA4 = next/script** — dangerouslySetInnerHTML 금지
4. **구조 변경 금지** — CSS 클래스만 수정
5. **VignetteCleanup 건드리지 마라** — 자동 광고 충돌 방지 핵심
6. **정부24 링크 = active:false 유지** — 공식 발표 전까지
7. **Vercel env** — printf로 줄바꿈 없이 추가, 변경 후 재배포 필수
8. **검증 필수** — 수정 후 grep + curl로 라이브 사이트 확인

### 다음 작업 후보

1. 4/11 국무회의 후 gov-links.ts 활성화
2. FAQ Phase 2 (추경 통과 반영)
3. updates.ts summary 필드 구조화
4. GA4 + AdSense 대시보드 모니터링
5. 콘텐츠 freshness 업데이트
