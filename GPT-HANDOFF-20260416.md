# GPT HANDOFF — 2026-04-16

> Claude Code 세션 완료. GPT가 이 파일을 읽고 다음 전략을 설계한다.

## 이전 세션 (4/14) 이후 이번 세션까지 전체 커밋

| # | 커밋 | 내용 |
|---|---|---|
| 1 | 893f257 | 지급 수단 선택 가이드 — calculator 박스 + updates 신규 + FAQ 6개 |
| 2 | e7c3fd8 | calculator CTA 버튼화 — Primary/Secondary 구조 |
| 3 | f5a350c | (롤백됨) updates 본문 끝 CTA 위계 정리 |
| 4 | 611ff59 | Revert f5a350c — 본문 CTA 중복 해소 |
| 5 | 4bda610 | CTA 과밀 정리 — calculator 링크바 3개 삭제 |
| 6 | 72cd2fa | 신규 글 본문 링크 가운데 정렬 + 날짜 4/16 |

## 오늘(4/16) 핵심 작업

### 지급 수단 선택 가이드 — 프레임 전환

**핵심**: "어디서 쓰냐(주유소)" → "어떻게 받느냐(지급 수단 선택)"

세 영역에 일관된 메시지:
- **calculator**: 결과 아래 사용 안내 박스 5블록 (Amber 배너 + 2단 비교 + ⚠️ 주유소 경고 + CTA)
- **updates**: 신규 글 `oil-subsidy-usage-guide-2026` (지급 수단별 사용 범위 완벽 정리)
- **FAQ**: 6개 추가 (주유소, 카드vs상품권, 직장인, 미성년자, 1차 놓치면, 이사)

### 공통 메시지 5원칙 (전부 검증 통과)

1. 숫자 "10곳 중 7곳" = calculator에만
2. 정성표현 "상당수 초과" = updates/FAQ
3. "사용할 수 없는 경우가 많" = 결정 문맥 5곳
4. "카드로 받아도" 경고 = 4곳
5. "지급 수단 선택" CTA = 5곳

### CTA 중복/과밀 정리

- updates: 본문 끝에 넣은 CTA 블록(훅+Primary+보조링크) → **롤백** (템플릿 CTA와 중복)
- calculator: 결과 내 텍스트 링크 3개 → **삭제** (버튼 2개로 충분, 선택 피로 해소)
- **교훈**: 본문 내비(텍스트 링크, prose 내 자연스러운 흐름) ≠ 전환 CTA(Button, 행동 유도). 역할 다른 걸 섞으면 깨진다.

## 사이트 현재 상태

| 항목 | 값 |
|---|---|
| URL | https://support.fazr.co.kr |
| 총 페이지 | 106개 |
| updates 글 | **6개** (신규: oil-subsidy-usage-guide-2026) |
| FAQ 항목 | **19개** (+6) |
| 광고 슬롯 | 7개 ON |
| GA4 | G-GQTTM24X4D |
| Hero 배지 | "4월 27일 지급 시작" |
| 스키니바 | "4월 27일 지급 시작! 고유가 피해지원금 대상 바로 확인하세요" |
| subsidy.ts status | "확정" |
| gov-links | active:false |
| "정부24" | 0건 |

## 금지 규칙 검증 (전부 0건)

- "카드가 상대적으로" / "상대적으로 넓음" → 0건
- "주유소 사용 불가" 단정 → 0건
- "정부24" → 0건
- 특정 지역명 (경기도, 과천 등) → 0건 (updates/faq/calculator 기준)

## 건드리지 않은 것 (확정 전)

- 요일제 2차 (5/18~5/22) — 미확인
- 건보료 컷오프 기준 — 5월 초 발표 예정
- 전담 콜센터 개설일 — "4월 중" 유지
- 국민비서 알림 앱 목록 — ips.go.kr만
- calculator 취약계층 +5만원 로직 — 사용자 확인 필요

## CTA 구조 현황 (audit 결과 기반)

| 페이지 | 메인 CTA | 보조 네비 | 비고 |
|---|---|---|---|
| / (홈) | Button lg ×2 | 텍스트 링크 1개 | Quick Links 카드 4개 |
| /calculator | Button default+outline (결과 내) | 최하단 텍스트 링크 2개 | 사용 안내 박스 5블록 포함 |
| /eligibility | Button lg | 텍스트 링크 3개 | |
| /faq | Button lg + outline sm | 텍스트 링크 2개 | |
| /updates/[slug] | 템플릿 Button default+outline | 본문 내 텍스트 링크 | 역할 분리 완료 |
| /regions/[slug] | Button default+outline | 텍스트 링크 2개 | |

**Button 15개 / 텍스트 링크 12개 / 보조 muted 3개** (src/app/ 기준)

## 다음 작업 후보 (GPT 판단)

1. **Playwright MCP 설치** (다음 세션 첫 작업) → 브라우저 스크린샷 검증 워크플로 구축
2. **4/20**: 국민비서 가입 시작 확인 → 콘텐츠 업데이트
3. **4/27**: 지급 시작 → status "지급중" 전환, 실제 신청 링크 확인
4. calculator 취약계층 로직 보완
5. 건보료 컷오프 발표 후 subsidy.ts 업데이트
6. 전담 콜센터 번호 확정 시 FAQ 업데이트
7. CTA 전체 통일 설계 (audit 결과 기반, 필요 시)
8. GA4 + AdSense 수익 모니터링
