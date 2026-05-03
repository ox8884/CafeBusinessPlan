import officialResearchData from './officialResearch.json'
import type { DocumentItem, MenuItem, OfficialResearchItem, ResourceItem, RoadmapStage, StartupTask, VeteranBenefit } from '../types/planner'

export const roadmap: RoadmapStage[] = [
  { id: 'idea', phase: '01 Validate', title: '아이디어 검증', description: 'Celina 가족 고객, 통근자, 교회/학교 커뮤니티에 한국 디저트 수요가 있는지 인터뷰합니다.', status: 'In Progress' },
  { id: 'market', phase: '02 Research', title: '시장 조사', description: 'Celina, Prosper, Frisco 인근 카페/베이커리 가격, 메뉴, 리뷰를 비교합니다.', status: 'Not Started' },
  { id: 'menu', phase: '03 Product', title: '메뉴 개발', description: '호두과자, 약과 타르트, 인절미 라떼, 과일 타르트 등 MVP 메뉴를 테스트합니다.', status: 'In Progress' },
  { id: 'plan', phase: '04 Plan', title: '비즈니스 플랜', description: '타깃 고객, 가격, 월 고정비, 손익분기점, 운영 시간을 문서화합니다.', status: 'Not Started' },
  { id: 'budget', phase: '05 Finance', title: '예산 계획', description: '장비, 인테리어, 보증금, 보험, 초기 재료비와 비상자금을 추정합니다.', status: 'Need Help' },
  { id: 'llc', phase: '06 Legal', title: '법인/사업자 구조', description: 'LLC 등 구조는 CPA/변호사와 공식 확인 후 결정합니다.', status: 'Not Started' },
  { id: 'ein', phase: '07 Tax', title: 'EIN 및 세금 등록', description: 'IRS EIN, Texas sales tax permit 필요 여부를 공식 기관에서 확인합니다.', status: 'Not Started' },
  { id: 'permit', phase: '08 Food Permit', title: '식품 관련 허가', description: 'Celina/Collin County/Texas DSHS 관할과 Food Establishment Permit 요건을 확인합니다.', status: 'Need Help' },
  { id: 'location', phase: '09 Site', title: '위치 선정과 임대', description: '주차, foot traffic, zoning, grease trap, HVAC, signage 조건을 체크합니다.', status: 'Not Started' },
  { id: 'buildout', phase: '10 Buildout', title: '인테리어와 장비', description: '오븐, 냉장고, 에스프레소 머신, 쇼케이스, POS, 위생 동선 계획을 세웁니다.', status: 'Not Started' },
  { id: 'open', phase: '11 Launch', title: 'Soft/Grand Opening', description: '프리오더, 팝업, 시식 이벤트, Google Business Profile, Instagram을 준비합니다.', status: 'Not Started' },
]

export const tasks: StartupTask[] = [
  { id: 't1', title: 'Celina 경쟁 카페 10곳 리서치', description: '가격, 인기 메뉴, 리뷰 불만, 영업시간을 표로 정리', priority: 'High', estimatedDuration: '1주', estimatedCost: '$0-$50', owner: 'Jay', status: 'In Progress', deadline: '2026-05-31', links: ['https://www.google.com/maps'], notes: 'Prosper/Frisco까지 포함' },
  { id: 't2', title: '메뉴 원가표 만들기', description: '재료비, 노동시간, 포장비, 목표 마진 계산', priority: 'High', estimatedDuration: '2주', estimatedCost: '$100-$300 테스트 재료', owner: 'Wave', status: 'Not Started', deadline: '2026-06-15', links: [], notes: '타르트/커피/한국 디저트 각각 5개 후보' },
  { id: 't3', title: 'Texas Sales Tax Permit 확인', description: '카페 판매 품목별 sales tax 적용 여부 확인', priority: 'High', estimatedDuration: '2-3일', estimatedCost: '공식 확인 필요', owner: 'Jay', status: 'Need Help', deadline: '2026-06-30', links: ['https://comptroller.texas.gov/taxes/permit/'], notes: '세무 전문가 확인 권장' },
  { id: 't4', title: '팝업/홈베이킹 가능성 검토', description: 'Cottage food law와 상업용 주방 필요 여부 확인', priority: 'Medium', estimatedDuration: '1주', estimatedCost: '공식 확인 필요', owner: 'Both', status: 'Need Help', deadline: '2026-07-15', links: ['https://www.dshs.texas.gov/retail-food-establishments/texas-cottage-food-production'], notes: '확정 전 공식 기관 확인 필요' },
]

export const documents: DocumentItem[] = [
  { name: 'Business Plan', purpose: '대출, 임대, 파트너 논의용 사업 계획서', status: 'In Progress', source: '내부 작성', fileLocation: 'Google Drive/Business Plan 초안', notes: 'Executive summary와 메뉴 원가표 연결' },
  { name: 'EIN', purpose: 'IRS 사업자 식별 번호', status: 'Not Started', source: 'IRS 공식 사이트 확인 필요', officialLink: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number', notes: 'LLC 구조 결정 후 신청 권장' },
  { name: 'LLC Documents', purpose: '사업 구조 및 책임 분리', status: 'Not Started', source: 'Texas SOS/전문가 확인 필요', officialLink: 'https://www.sos.state.tx.us/corp/sosda/index.shtml' },
  { name: 'Sales Tax Permit', purpose: '판매세 등록/보고', status: 'Need Help', source: 'Texas Comptroller 공식 확인 필요', officialLink: 'https://comptroller.texas.gov/taxes/permit/' },
  { name: 'Food Establishment Permit', purpose: '카페 식품 영업 허가', status: 'Need Help', source: '지역 관할/DSHS 공식 확인 필요', officialLink: 'https://www.dshs.texas.gov/retail-food-establishments' },
  { name: 'Food Handler Certificate', purpose: '식품 취급자 교육/인증', status: 'Not Started', source: '공식 승인 과정 확인 필요', officialLink: 'https://www.dshs.texas.gov/licensing-food-handler-training-programs' },
  { name: 'Lease Agreement', purpose: '매장 임대 계약', status: 'Not Started', source: '부동산/변호사 검토 권장' },
  { name: 'Insurance', purpose: '일반 책임, 재산, 근로자 보험 등', status: 'Not Started', source: '보험 에이전트 견적' },
  { name: 'Vendor Agreement', purpose: '원두, 유제품, 포장재 공급 계약', status: 'Not Started', source: '공급사별 확인' },
]

export const benefits: VeteranBenefit[] = [
  { name: 'SBA Veterans Advantage', category: 'Loan/Support', description: 'Veteran 사업주 대상 SBA 대출/수수료 관련 프로그램은 최신 조건 확인 필요.', status: 'Need Help', verification: '공식 기관 확인 필요', officialLink: 'https://www.sba.gov/' },
  { name: 'Boots to Business', category: 'Education', description: '군인/전역자 대상 창업 교육 프로그램.', status: 'Not Started', verification: '공식 일정 확인 필요', officialLink: 'https://www.sba.gov/sba-learning-platform/boots-business' },
  { name: 'Veterans Business Outreach Center', category: 'Mentoring', description: '비즈니스 플랜, 자금, 멘토링 지원 가능성 확인.', status: 'Need Help', verification: '가까운 VBOC 공식 확인 필요', officialLink: 'https://www.sba.gov/local-assistance/resource-partners/veterans-business-outreach-center-vboc-program' },
  { name: 'Texas Veterans Commission', category: 'Texas Resource', description: 'Texas veteran 리소스와 연결 가능성 확인.', status: 'Not Started', verification: '공식 기관 확인 필요', officialLink: 'https://tvc.texas.gov/entrepreneurs/' },
  { name: 'Disabled Veteran Local Benefits', category: 'State/Local', description: '재산세, 수수료, 사업 관련 혜택은 카운티/시/주별로 다르므로 확정 금지.', status: 'Need Help', verification: 'Celina/Collin County/Texas 공식 확인 필요', officialLink: 'https://www.collincountytx.gov/' },
]

export const resources: ResourceItem[] = [
  { name: 'City of Celina Business', type: 'Local government', url: 'https://www.celina-tx.gov/35/Business', notes: '사업 허가, zoning, signage, local contacts 확인 시작점' },
  { name: 'Collin County Government', type: 'County', url: 'https://www.collincountytx.gov/', notes: '카운티 수준 세금/재산/공공 기록 확인 시작점' },
  { name: 'Texas Comptroller', type: 'Tax', url: 'https://comptroller.texas.gov/taxes/permit/', notes: 'Sales tax permit 및 세금 안내 공식 확인' },
  { name: 'IRS EIN', type: 'Federal tax', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number', notes: 'EIN 신청 공식 페이지' },
  { name: 'Texas Secretary of State', type: 'Business formation', url: 'https://www.sos.state.tx.us/corp/sosda/index.shtml', notes: 'LLC/법인 등록 관련 공식 확인' },
  { name: 'Texas DSHS Retail Food', type: 'Food safety', url: 'https://www.dshs.texas.gov/retail-food-establishments', notes: '식품 안전, 허가, 인증 관련 공식 확인' },
  { name: 'SBA Dallas/Fort Worth District', type: 'Small business', url: 'https://www.sba.gov/district/dallas-fort-worth', notes: '지역 SBA 상담/교육 확인' },
]

export const officialResearch = officialResearchData as OfficialResearchItem[]

export const menu: MenuItem[] = [
  { name: 'Honey Yakgwa Tart', koreanName: '꿀약과 타르트', description: '전통 약과 향과 버터 타르트의 조합', price: '$6.50' },
  { name: 'Injeolmi Cream Latte', koreanName: '인절미 크림 라떼', description: '고소한 콩가루 크림과 에스프레소', price: '$6.75' },
  { name: 'Seasonal Fruit Tart', koreanName: '제철 과일 타르트', description: 'Wave의 섬세한 베이킹 경험을 살린 시그니처', price: '$7.25' },
  { name: 'Hodu-gwaja Box', koreanName: '호두과자 박스', description: '가족/선물용으로 좋은 따뜻한 한국 디저트', price: '$12' },
]
