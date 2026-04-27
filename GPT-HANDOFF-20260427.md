# GPT HANDOFF — 2026-04-27 (D-Day)

## 오늘 성과 요약

- AdSense: $155+ (D-Day 트래픽)
- GA4: 5,696명 방문, 시간당 1,200명 동시접속
- GSC CTR: 30%
- 1위 키워드 유지 중

## 완료된 작업 (커밋 10개)

### 1. 행안부 추가 발표 3건 반영 (48082b5)
- updates.ts 신규 글 amber 박스 + eligibility/calculator 1줄 추가
- 4/30 통합, 5/1 근로자의 날, 등초본 수수료, 읍면 사용처

### 2. 모바일 가독성 (54ad06d → cc27c5d → be9f75b)
- list-disc/list-inside → list-none pl-0 + arbitrary variant [&>li]:mt-4
- span block 패턴으로 라벨/설명 분리
- 교훈: 디자인 수정은 로컬 스크린샷 확인 후 1회 푸시

### 3. .vercelignore 추가 (db723b6)
- *.md 빌드 업로드 제외 (빌드 트리거 차단은 Ignored Build Step 담당)

### 4. NoticeBox 컴포넌트화 (2305cb1)
- src/components/notice-box.tsx 신규 (shadcn Card 기반)
- UpdatePost에 notices?: Notice[] 옵셔널 필드 추가
- 신규 글 1건만 마이그레이션 (다른 글 9개 무변경)
- prose 밖 렌더 (li margin 충돌 회피)
- max-w-prose → max-w-3xl (박스 너비 통일)
- 공유 버튼-NoticeBox 간격 mt-6

### 5. FAQ 메타 리라이트 + Q1 한 줄 요약 (415bab5)
- title: "고유가 피해지원금 자주 묻는 질문｜지급 대상·금액·신청 방법 총정리"
- description: "지급 대상은 누구" 키워드 직격 (GSC 1순위 노출 13,881건)
- Q1 답변 앞 한 줄 요약: "2007년 12월 31일 이전 출생자 중 소득 하위 70%, 약 4,400만 명"
- FAQ Schema(JSON-LD) 자동 반영

### 6. amber/blue 박스 링크 줄바꿈 4곳 (8d52b05)
- eligibility + calculator의 amber/blue 박스
- {" "} 제거 + Link block mt-1 + → 화살표
- 모바일에서 링크가 본문과 분리되어 가독성 향상

### 7. Ignored Build Step 설정 (Vercel Dashboard)
- `git diff --quiet HEAD^ HEAD -- ':!*.md' ':!docs/'`
- .md만 변경 시 빌드 스킵 (빌드비 절감)
- .vercelignore는 빌드 트리거 차단 기능 없음 (교훈)

## 현재 사이트 상태

- 총 페이지: 109개
- updates 글: 10개
- 광고 슬롯: 10개 (수동)
- subsidy.ts status: "신청중"
- Hero: "1차 신청 진행중 (4/27~5/8)"
- Ignored Build Step: 설정 완료

## 구조적 개선 완료/예정

| 항목 | 상태 |
|------|------|
| .vercelignore | 완료 (빌드 업로드 제외) |
| Ignored Build Step | 완료 (.md 빌드 스킵) |
| NoticeBox 컴포넌트 | 완료 — 1건 적용 |
| max-w-3xl 통일 | 완료 |
| FAQ 메타 + Q1 | 완료 |
| 박스 링크 줄바꿈 | 완료 (4곳) |
| 요약 박스 동적화 | 미완 (4/28) |

## 4/28 작업 후보

1. 신규 글 색인 확인 (네이버/구글)
2. 전환율 → CTA 판단
3. 요약 박스 동적화 (하드코딩 → post별 데이터)
4. NoticeBox 다른 글 마이그레이션 검토
5. GSC /faq CTR 측정 (목표 2.7% → 6%+)
6. AdSense 슬롯 매핑 정리
