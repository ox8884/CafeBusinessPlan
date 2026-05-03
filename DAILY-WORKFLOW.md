# 매일 작업하는 방법

이 프로젝트는 GitHub `ox8884/CafeBusinessPlan`에 푸시하면 Vercel이 자동 배포합니다.

- 실제 공개 사이트: https://cafe-business-plan.vercel.app
- Vercel 대시보드: https://vercel.com/ox8884s-projects/cafe-business-plan
- 로컬 프로젝트 경로: `/home/ubuntu/sites/care-landing`

## 1. 가장 쉬운 흐름

```bash
cd /home/ubuntu/sites/care-landing
npm run daily
```

이 명령은 로컬 개발 서버를 켭니다.
화면을 보면서 파일을 수정하면 됩니다.

작업이 끝나면:

```bash
npm run ship -- "feat: 오늘 수정 내용 요약"
```

이 명령이 하는 일:

1. GitHub 최신 main 가져오기
2. `npm run build`로 빌드 확인
3. `npm run verify:links`로 공식 링크 확인
4. 변경 파일 commit
5. GitHub push
6. Vercel 자동 배포 트리거

## 2. 배포 확인

```bash
npm run check:deploy
```

기본으로 `https://cafe-business-plan.vercel.app`를 확인합니다.

## 3. 자주 수정할 파일

| 목적 | 파일 |
|---|---|
| 체크리스트/로드맵/문서 seed 데이터 | `src/data/plannerData.ts` |
| 공식 기관 링크 데이터 | `src/data/officialResearch.json` |
| 화면 섹션 UI | `src/components/*.tsx` |
| 전체 화면 조립 | `src/App.tsx` |
| Supabase 테이블/RLS | `supabase/schema.sql` |
| 사용 설명서 | `README.md` |

## 4. Hermes에게 맡길 때 이렇게 말하면 편합니다

예시:

- “카페 플래너에 이번 주 할 일 섹션 추가하고 배포까지 해줘.”
- “Celina permit 관련 공식 링크 최신으로 확인해서 반영하고 배포해줘.”
- “체크리스트 항목 10개 더 추가하고 보기 좋게 정리해줘.”
- “Vercel 배포 상태 확인하고 안 되면 고쳐줘.”

Hermes가 보통 할 일:

1. `/home/ubuntu/sites/care-landing`에서 현재 상태 확인
2. 필요한 파일 수정
3. `npm run build` 검증
4. 필요 시 `npm run verify:links` 실행
5. commit/push
6. `https://cafe-business-plan.vercel.app` 확인

## 5. 주의

- `https://vercel.com/ox8884s-projects/cafe-business-plan`는 대시보드 URL입니다.
- 사람들에게 공유할 주소는 `https://cafe-business-plan.vercel.app`입니다.
- 법률/세금/허가/Veteran benefits 정보는 앱에 적어도 최종 판단 전에 공식 기관 또는 전문가 확인이 필요합니다.
