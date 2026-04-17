# SESSION HANDOFF — support.fazr.co.kr

> 다음 Claude Code 세션이 이 파일을 먼저 읽고 현재 상태를 파악한다.

## 마지막 세션: 2026-04-17

### 프로젝트 상태: ✅ 운영 중 + 광고 ON + FAZR 브랜드 통일 + FAQ YMYL 팩트 교정 완료

- **사이트**: https://support.fazr.co.kr
- **저장소**: https://github.com/defazr/-support.fazr.git (main 브랜치)
- **배포**: Vercel 자동 배포 (push → 자동 빌드)
- **총 페이지**: 106개

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
- **GovLinkButton** (`gov-link-button.tsx`): 현재 active:false. calculator/regions에서 제거됨 → 내부 링크로 교체 완료.

### FAZR 브랜드 (2026-04-16 추가)

- 헤더: "FAZR" 라벨 (사이트명 좌측, text-xs muted)
- 홈: "FAZR에서 제공하는 고유가 피해지원금 안내 서비스입니다"
- 계산기: "FAZR에서 제공하는 고유가 피해지원금 계산 서비스입니다"
- 푸터: 사업자 정보 블록 (다파라코프, 208-09-27644)
- 카피라이트: © 2026 다파라코프 (eitc.fazr와 통일)

### Playwright MCP

- 설치 완료. 시각 검증 워크플로 확립.
- 모든 UI 수정 후 Playwright 스크린샷 검증 포함 원칙.

### 콘텐츠 현재 상태 (2026-04-17)

- 추경: **통과 확정** (4/10 본회의) + **정부 공식 발표** (4/11)
- subsidy.ts status: "확정"
- Hero 배지: "4월 27일 지급 시작"
- 스키니바: "4월 27일 지급 시작! 고유가 피해지원금 대상 바로 확인하세요"
- gov-links.ts: **active=false** (라벨 "최신 지급 소식 보기"로 교체 완료)
- updates 글 **6개** (지급수단가이드 + 속보-정부발표 + 속보-추경통과 + 지급안내 + 신청방법 + 인구감소지역)
- "정부24" 표현: **사이트 전체 제거** (실제 채널 아님)
- 날짜: 전부 확정형 (4월 27일, 5월 18일, 8월 31일)
- 건보료 컷오프: "5월 중 발표 예정" 유지 (미확정)
- **FAQ: 19개 항목 (2026-04-17 Q2/Q6/Q7/Q16 YMYL 팩트 교정)**
  - Q2: "확정 전 추정치" 명시
  - Q6: "재산 기준이 따로 있나요?" — 건보료 단일 기준 (근로장려금 용어 제거)
  - Q7: "건강보험 가구원 합산" (재산 합산 → 건보료 합산 정정)
  - Q16: 자동 지급 + 계좌 불일치 시 2차 신청 가능 (모순 해소)
- 홈: 스미싱 경고 박스 추가
- calculator: 신청 경로 안내 박스 + **사용 안내 박스 5블록** (지급 수단 비교, 주유소 경고)
- eligibility: 신청 경로 안내 박스 추가
- 속보 글: 사용처 상세(프랜차이즈 가맹점/직영점 구분, 배달앱 대면결제 예외)
- 속보 글: 국민비서 알림서비스 (4/20 가입, ips.go.kr)
- 속보 글: 찾아가는 신청 서비스

### 디자인 시스템

- `design-system/고유가-피해지원금/MASTER.md`
- Primary: #0369A1 (딥블루), Background: #F8FAFC, Text: #020617
- Pretendard, Accessible & Ethical (WCAG AAA)

### 주의사항

1. **body/html에 높이 클래스 금지** — h-full, min-h-full, min-h-screen 넣으면 iOS 스크롤 버그 재발. min-h-dvh는 main에만.
2. **SSOT 전부 확인** — 항목 누락 금지. **타 제도 용어 혼입 주의** (예: 근로장려금의 간주전세금/공시가격 기준)
3. **아닌 건 말해라** — 지시서가 와도 문제 보이면 의견 제시
4. **GA4 = next/script** — dangerouslySetInnerHTML 금지
5. **구조 변경 금지** — CSS 클래스만 수정
6. **VignetteCleanup 건드리지 마라** — 자동 광고 충돌 방지 핵심
7. **"정부24" 사용 금지** — 실제 신청 채널 아님. 카드사 앱/지역사랑상품권 앱/주민센터가 정확
8. **Vercel env** — printf로 줄바꿈 없이 추가, 변경 후 재배포 필수
9. **검증 필수** — 수정 후 grep + curl로 라이브 사이트 확인
10. **calculator 로직 수정 금지** — 데이터만 교체, 로직 변경은 사용자 확인 후
11. **YMYL 미확정 수치 인용 시** — 반드시 "확정 전 추정치"/"발표 예정" 명시
12. **브랜치 전략** — main 기준 새 브랜치에 단일 목적 커밋만. 과거 브랜치 재사용 금지.

### 다음 작업 후보

1. **4/20**: 국민비서 가입 시작 확인 → 콘텐츠 업데이트
2. **4/27**: 지급 시작 → 스키니바/status "지급중" 전환, 실제 신청 링크 확인
3. FAQ Q1/Q2 소득 수치(974만원/385만원) 근거 검증 → 출처 명시 또는 제거
4. calculator 취약계층 로직 보완 (비수도권·인구감소지역 +5만원)
5. 건보료 컷오프 발표 후 subsidy.ts incomeThresholds 업데이트
6. 전담 콜센터 번호 확정 시 FAQ Q18 업데이트
7. GA4 + AdSense 수익 모니터링 → 슬롯 최적화
8. 검색 유입 키워드 분석 → 콘텐츠 확장
