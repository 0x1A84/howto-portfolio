import { Portfolio } from './portfolio.model';

export const PRINT_WEB_ADDRESS = '0x1a84ff.github.io';

// 원본은 PORTFOLIO.md입니다. 내용을 바꾸면 이 파일도 같은 커밋에서 함께 고칩니다.
// 영어판은 portfolio.data.en.ts(원본 PORTFOLIO.en.md)이며, 사실이 바뀌면 두 언어를 함께 고칩니다.
export const PORTFOLIO: Portfolio = {
  lang: 'ko',
  ui: {
    pageTitle: '이재훈 포트폴리오',
    description:
      'Massimo Dutti Fashion Advisor 경험과 Angular 프런트엔드 개발 경험을 갖춘 이재훈의 경력, 역량, 프로젝트, 학력.',
    ogLocale: 'ko_KR',
    skipLink: '본문으로 건너뛰기',
    navLabel: '섹션',
    sections: { experience: '경력', skills: '역량', projects: '프로젝트', education: '학력', resume: '이력서' },
    langSwitch: { path: '/en', label: 'EN', lang: 'en', ariaLabel: 'English version' },
    printButton: 'A4로 인쇄',
    printHint: '인쇄 대화상자에서 ‘머리글과 바닥글’을 끄면 깔끔하게 인쇄됩니다.',
    printWebLabel: '웹 버전',
    asOf: { before: '', after: ' 기준' },
    periodTo: '부터',
    skillsHead: { area: '분야', items: '내용' },
    gpa: '평점',
    stackTitle: '사용 기술',
  },
  profile: {
    name: '이재훈',
    handle: '0x1a84',
    photo: {
      src: 'images/profile-photo.jpg',
      exportSrc: 'images/profile-photo-print.jpg',
      alt: '이재훈 프로필 사진',
      width: 206,
      height: 264,
    },
    mobileIntro: { title: 'Fashionable Engineer', detail: '한국어·영어 고객 응대' },
    tagline: 'Massimo Dutti와 Zara 매장에서 고객을 맞았고, AI 도구를 업무에 능숙하게 활용합니다.',
    summary:
      'Massimo Dutti 잠실에서 Fashion Advisor로 일하며 한국어와 영어로 고객을 응대했고, 상품 입출고와 진열, 포장과 발송을 맡았습니다. Zara에서는 Rebajas 시즌에 강남 매장 운영과 하남 스타필드 매장 판매를 보조했습니다. 그 전에는 소프트웨어 회사에서 Angular로 웹 화면을 만들고 QA를 맡았습니다. 지금은 두 경험을 묶어 Massimo Dutti 상품을 런웨이 룩과 비교하는 기능, 매장 온보딩과 개인 근무기록 기능을 만들고 있습니다. Massimo Dutti 매장에서 다시 고객을 맞고 매장 운영을 돕고 싶습니다.',
    links: [
      {
        kind: 'github',
        label: 'GitHub',
        href: 'https://github.com/0x1a84',
        printText: 'github.com/0x1a84',
      },
    ],
    heroImage: {
      src: 'images/massimo-dutti-ifc-mall.jpg',
      credit: '배경 사진 한국관광공사',
      creditHref: 'https://www.ktriptips.com/eng/shopping/2957752',
    },
  },
  experienceGroups: [
    {
      id: 'experience-fashion',
      title: 'ITX 코리아',
      items: [
        {
          organization: 'Massimo Dutti 잠실',
          role: 'Fashion Advisor',
          period: '2024.11–2025.02',
          duties: ['한국어·영어 고객 응대', '상품 입출고와 진열', '포장 및 발송'],
        },
        {
          organization: 'Zara',
          role: 'Rebajas Season',
          period: '2023.12, 2024.06',
          duties: ['강남 Operations Assistant(2023.12)', '하남 스타필드 Sales Assistant(2024.06)'],
        },
      ],
    },
    {
      id: 'experience-service',
      title: '서비스와 물류',
      items: [
        {
          organization: 'Grand InterContinental Seoul Parnas',
          role: 'Banquet',
          period: '2025.03–현재',
          duties: ['고객 응대', '와인·칵테일 등 호텔 식음료 서비스', '연회장 준비와 정리'],
        },
        {
          organization: 'Homeplus 강동',
          role: '비전커뮤니케이션',
          period: '2025.06–2025.12',
          duties: ['창고 입출고와 상하차', '재고와 매장 관리', '고객 응대'],
        },
        {
          organization: '서울로열마리나',
          period: '2024.07–2024.09',
          duties: ['주류와 음료 제조', '매장 관리', '홀 서비스', '연회 준비'],
        },
      ],
      note: '2019년부터 2024년까지는 브이피앤파트너스, 브롱스 논현점 같은 외식 매장에서 바와 홀, 주방 보조 일을 했습니다.',
    },
    {
      id: 'experience-development',
      title: '웹 개발',
      items: [
        {
          organization: 'Minga Company',
          role: 'Web Frontend',
          period: '2022.09–2023.12',
          duties: ['Angular 웹 프런트엔드 개발', 'QA 테스트'],
        },
      ],
    },
  ],
  skills: [
    {
      area: '매장 운영',
      items: ['고객 응대', '의류 판매', '상품 입고와 진열', '포장과 발송', '매장 관리'],
    },
    { area: '어학', items: ['OPIc IH', '영어 일상 회화', '외국인 고객 응대'] },
    {
      area: '물류',
      items: ['창고 입출고', '상하차', '재고 관리'],
    },
    {
      area: '개발',
      items: ['Angular·TypeScript 웹 프런트엔드', 'NestJS API', 'QA 테스트'],
    },
  ],
  interestNote:
    'Claude 같은 AI 도구를 업무에 익숙하게 활용합니다. 매장에서 되풀이하는 일을 체크리스트로 정리하고, 필요한 자료와 기능도 AI 도구로 빠르게 만들어 봅니다.',
  projects: [
    {
      id: 'howto-dig-fashion',
      title: 'howto-dig-fashion',
      subtitle: '패션 학습과 매장 운영',
      description:
        '패션을 처음 배우는 사람이 옷을 이해하고 매장 일에 익숙해지도록 돕는 한국어 가이드와 웹 서비스를 만들고 있습니다.',
      highlights: [
        {
          label: '상품 레퍼런스 조사',
          text: 'Massimo Dutti Korea 상품이 어떤 런웨이 룩이나 브랜드 대표 아이템과 닮았는지 비교하는 기능을 만들었습니다. 이미지 유사도와 옷의 특징으로 후보를 먼저 추리고, 검토자가 비교 화면에서 근거를 보고 확정하거나 기각합니다.',
        },
        {
          label: '학습과 온보딩',
          text: '옷의 구조, 소재와 혼용률, 핏과 실측, 매장 업무를 가이드로 정리했습니다. 가이드 내용으로 연습 문제를 생성해, 학습자가 문제를 푼 뒤 결과와 틀린 문제를 다시 볼 수 있습니다. 구성원은 온보딩 체크리스트로 어디까지 했는지 확인하고 담당자에게 검토를 요청합니다.',
        },
        {
          label: '개인 근무기록 관리',
          text: '근무한 날짜와 시간, 그날 맡은 업무를 기록하는 기능을 만들었습니다. 기록이 쌓이면 기간별로 근무 시간과 업무를 모아 볼 수 있어, 매장에서 낸 실적을 숫자로 확인하고 설명할 수 있습니다. 작성 중인 기록은 자동으로 저장되고, 기록과 집계를 다루는 API와 화면을 함께 만들었습니다.',
        },
      ],
      stack: ['TypeScript', 'Angular', 'NestJS', 'Node.js', 'PostgreSQL', 'pgvector', 'Playwright', 'CLIP', 'Claude'],
    },
  ],
  education: [
    {
      school: '한국방송통신대학교',
      major: '컴퓨터과학과',
      period: '2023–2026',
      status: '휴학',
    },
    {
      school: '원광대학교',
      major: '컴퓨터소프트웨어공학과',
      period: '2016–2018',
      gpa: '3.87',
    },
  ],
  educationNote: '방송통신대학교는 주 40시간 일하면서 다녔고, 평점 3.5를 받았습니다.',
  // 공개 여부가 확정되면 { label: '국문 이력서 PDF', href: 'files/resume.pdf' }로 바꾸고
  // references/resume.pdf를 public/files/로 복사합니다.
  resume: null,
  siteUrl: 'https://0x1a84.github.io/howto-portfolio/',
  repoUrl: 'https://github.com/0x1a84/howto-portfolio',
  updatedAt: '2026-11-25',
  navTitle: 'Portfolio',
};
