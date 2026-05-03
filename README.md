# Dessert Cafe Startup Planner

텍사스 Celina 또는 인근 지역에서 한국식 디저트 카페를 준비하는 VA 100% Disabled Veteran 부부를 위한 프론트엔드 MVP 웹앱입니다.

중요: 법률, 세금, 허가, 식품 규정, Veteran 혜택 정보는 확정 조언이 아닙니다. 반드시 City of Celina, Collin County, Texas Comptroller, Texas DSHS, IRS, SBA, Texas Veterans Commission, CPA/변호사 등 공식 기관과 전문가에게 확인해야 합니다.

## 1. 현재 구현 상태

- Vite + React + TypeScript + Tailwind CSS
- 한국식 디저트 카페 창업 대시보드
- 체크리스트 상태 변경 UI
- 검색/상태/우선순위 필터
- 문서별 링크, 파일 위치, 메모 입력
- 마감일 기준 이번 달 해야 할 일 자동 계산
- localStorage 저장
- localStorage JSON 내보내기/가져오기
- Supabase 클라이언트/Repository scaffolding
- Supabase SQL 테이블/RLS 설계
- 공식 링크 주기 검증 스크립트
- Celina / Collin County / Texas 공식 링크 검증 리서치 페이지

## 2. 실행 방법

매일 작업 시작:

```bash
npm run daily
```

또는 기본 개발 서버:

```bash
npm install
npm run dev
```

작업 완료 후 GitHub push + Vercel 자동 배포:

```bash
npm run ship -- "feat: 수정 내용 요약"
```

배포 확인:

```bash
npm run check:deploy
```

자세한 반복 작업 방식은 `DAILY-WORKFLOW.md`를 참고하세요.

빌드 확인:

```bash
npm run build
```

공식 링크 검증:

```bash
npm run verify:links
```

검증 결과는 아래에 생성됩니다.

- `reports/official-link-check.json`
- `reports/official-link-check.md`

## 3. 폴더 구조

```text
src/
  App.tsx                         # 전체 섹션을 조립하는 orchestrator
  components/
    Header.tsx
    Hero.tsx
    Dashboard.tsx
    ImportExportPanel.tsx
    ThisMonth.tsx
    Roadmap.tsx
    TaskChecklist.tsx
    DocumentsAndBenefits.tsx
    OfficialResearch.tsx
    DataSyncRoadmap.tsx
    ResourceLibrary.tsx
    CafeSections.tsx
    LegalNotice.tsx
    ui.tsx
  data/
    plannerData.ts                # 앱 seed 데이터
    officialResearch.json         # 링크 검증 스크립트와 UI가 공유하는 공식 링크 데이터
  lib/
    plannerState.ts               # localStorage key, 상태 타입, 저장/로드 헬퍼
    plannerImportExport.ts        # JSON export/import 검증
    plannerRepository.ts          # localStorage/Supabase 저장소 추상화
    plannerUtils.ts               # 날짜/검색 유틸
    supabase.ts                   # Supabase 클라이언트
  types/
    planner.ts
scripts/
  verify-official-links.mjs       # 공식 링크 주기 검증 스크립트
supabase/
  schema.sql                      # 실제 테이블/RLS 설계
reports/
  official-link-check.json
  official-link-check.md
```

## 4. localStorage 백업/복원

앱 상단 Dashboard 아래의 Backup 카드에서 사용할 수 있습니다.

- `JSON 내보내기`: 현재 체크리스트 상태, 문서 상태, 문서 링크/파일 위치/메모를 `.json` 파일로 다운로드합니다.
- `JSON 가져오기`: 이전에 내보낸 JSON 파일을 선택하면 형식을 검증한 뒤 현재 화면과 localStorage에 반영합니다.

백업 파일은 다음 앱 식별자를 포함합니다.

```json
{
  "app": "dessert-cafe-startup-planner",
  "version": 1
}
```

잘못된 앱 파일, 지원하지 않는 버전, 잘못된 상태값은 가져오기를 거부합니다.

## 5. Supabase 연동 준비

현재 UI는 credentials 없이도 localStorage 모드로 정상 작동합니다. Supabase는 여러 기기 동기화와 장기 저장을 위한 준비 코드가 들어가 있습니다.

### 5.1 환경 변수

`.env.example`을 복사해 `.env.local`을 만듭니다.

```bash
cp .env.example .env.local
```

`.env.local` 예시:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5.2 SQL 적용

Supabase SQL Editor에서 아래 파일 내용을 실행합니다.

```text
supabase/schema.sql
```

포함된 테이블:

- `roadmap_stages`
- `startup_tasks`
- `documents`
- `veteran_benefits`
- `resources`
- `official_research_items`
- `menu_items`
- `user_state`

RLS 설계:

- seed/public 데이터 테이블은 select 공개
- `user_state`는 `auth.uid() = user_id` 조건으로 본인만 select/insert/update/delete 가능
- 클라이언트 anon key를 써도 개인 상태는 사용자별로 분리되도록 설계

### 5.3 현재 앱 동작

- 환경 변수가 없으면 `localStorage` 모드
- 환경 변수가 있으면 Supabase client 생성
- 로그인 사용자가 없으면 localStorage fallback
- 로그인 사용자가 있으면 `user_state`에 상태 저장 가능

다음 실제 연동 단계는 Supabase Auth 로그인 UI를 추가하는 것입니다.

## 6. 공식 링크 주기 검증

공식 링크 목록은 `src/data/officialResearch.json`에 있습니다.

검증 실행:

```bash
npm run verify:links
```

동작:

1. `officialResearch.json` 읽기
2. 각 URL을 `HEAD`로 확인
3. `HEAD`가 막히는 사이트는 `GET`으로 재시도
4. redirect 반영
5. JSON/Markdown 리포트 생성

주의: 이 스크립트는 URL 접속 가능성만 확인합니다. 실제 법률/세금/허가/Veteran 혜택 적용 여부는 공식 기관 또는 전문가에게 재확인해야 합니다.

cron 예시:

```bash
0 8 * * 1 cd /home/ubuntu/sites/care-landing && npm run verify:links
```

## 7. 데이터 모델 요약

상태 값:

- `Not Started`
- `In Progress`
- `Completed`
- `Need Help`

우선순위:

- `High`
- `Medium`
- `Low`

주요 저장 데이터:

- task status map
- document status map
- document detail map: officialLink, fileLocation, notes
- official research item: name, agency, topic, url, verificationStatus, lastChecked, notes

## 8. 개발 메모

- `App.tsx`는 이제 각 섹션 컴포넌트를 조립하는 역할만 합니다.
- UI 공통 요소는 `src/components/ui.tsx`에 있습니다.
- localStorage와 Supabase fallback은 `src/lib/plannerRepository.ts`에 있습니다.
- JSON export/import 검증은 `src/lib/plannerImportExport.ts`에 있습니다.
- 공식 링크 데이터는 UI와 Node script가 같이 쓰기 쉽도록 JSON으로 분리했습니다.

## 9. 최종 검증 명령

```bash
npm run build
npm run verify:links
```
