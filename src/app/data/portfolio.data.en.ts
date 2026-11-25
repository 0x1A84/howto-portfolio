import { Portfolio } from './portfolio.model';

// 영어판. 원본은 PORTFOLIO.en.md이고, 사실은 한국어판(portfolio.data.ts, PORTFOLIO.md)과 같아야 합니다.
// 한국어판의 내용을 바꾸면 이 파일과 PORTFOLIO.en.md도 같은 커밋에서 함께 고칩니다.
export const PORTFOLIO_EN: Portfolio = {
  lang: 'en',
  ui: {
    pageTitle: 'Jason Parker Portfolio',
    description:
      'Experience, skills, projects, and education of Jason Parker, a former Massimo Dutti Fashion Advisor with Angular frontend development experience.',
    ogLocale: 'en_US',
    skipLink: 'Skip to content',
    navLabel: 'Sections',
    sections: {
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      education: 'Education',
      resume: 'Resume',
    },
    langSwitch: { path: '/', label: 'KO', lang: 'ko', ariaLabel: '한국어 버전' },
    printButton: 'Print on A4',
    printHint: 'Turn off ‘Headers and footers’ in the print dialog for a clean printout.',
    printWebLabel: 'Web version',
    asOf: { before: 'As of ', after: '' },
    periodTo: 'to',
    skillsHead: { area: 'Area', items: 'Details' },
    gpa: 'GPA',
    stackTitle: 'Tech stack',
  },
  profile: {
    name: 'Jason Parker',
    handle: '0x1a84',
    photo: {
      src: 'images/profile-photo.jpg',
      exportSrc: 'images/profile-photo-print.jpg',
      alt: 'Profile photo of Jason Parker',
      width: 206,
      height: 264,
    },
    mobileIntro: { title: 'Fashionable Engineer', detail: 'Korean & English customer service' },
    tagline: 'I have served customers at Massimo Dutti and Zara, and I use AI tools fluently at work.',
    summary:
      'As a Fashion Advisor at Massimo Dutti Jamsil, I served customers in Korean and English and handled stock receiving, display, packing, and shipping. At Zara, I supported store operations in Gangnam and sales at Hanam Starfield during the Rebajas season. Before that, I built web interfaces with Angular and handled QA at a software company. Now I am combining both experiences to build a feature that compares Massimo Dutti products with runway looks, along with store onboarding and personal work log features. I would like to welcome customers at a Massimo Dutti store again and help run the store.',
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
      credit: 'Background photo: Korea Tourism Organization',
      creditHref: 'https://www.ktriptips.com/eng/shopping/2957752',
    },
  },
  experienceGroups: [
    {
      id: 'experience-fashion',
      title: 'ITX Korea',
      items: [
        {
          organization: 'Massimo Dutti Jamsil',
          role: 'Fashion Advisor',
          period: '2024.11–2025.02',
          duties: [
            'Customer service in Korean and English',
            'Stock receiving, dispatch, and display',
            'Packing and shipping',
          ],
        },
        {
          organization: 'Zara',
          role: 'Rebajas Season',
          period: '2023.12, 2024.06',
          duties: ['Gangnam, Operations Assistant (2023.12)', 'Hanam Starfield, Sales Assistant (2024.06)'],
        },
      ],
    },
    {
      id: 'experience-service',
      title: 'Service and logistics',
      items: [
        {
          organization: 'Grand InterContinental Seoul Parnas',
          role: 'Banquet',
          period: '2025.03–Present',
          duties: [
            'Customer service',
            'Hotel food and beverage service, including wine and cocktails',
            'Banquet hall setup and teardown',
          ],
        },
        {
          organization: 'Homeplus Gangdong',
          role: 'Vision Communication',
          period: '2025.06–2025.12',
          duties: [
            'Warehouse receiving, dispatch, loading, and unloading',
            'Inventory and store management',
            'Customer service',
          ],
        },
        {
          organization: 'Seoul Royal Marina',
          period: '2024.07–2024.09',
          duties: ['Mixing drinks and beverages', 'Store management', 'Floor service', 'Banquet preparation'],
        },
      ],
      note: 'From 2019 to 2024, I worked bar, floor, and kitchen assistant shifts at restaurants including VP&Partners and Bronx Nonhyeon.',
    },
    {
      id: 'experience-development',
      title: 'Web development',
      items: [
        {
          organization: 'Minga Company',
          role: 'Web Frontend',
          period: '2022.09–2023.12',
          duties: ['Angular web frontend development', 'QA testing'],
        },
      ],
    },
  ],
  skills: [
    {
      area: 'Store operations',
      items: ['Customer service', 'Apparel sales', 'Receiving and display', 'Packing and shipping', 'Store management'],
    },
    { area: 'Languages', items: ['OPIc IH', 'Conversational English', 'Serving international customers'] },
    { area: 'Logistics', items: ['Warehouse receiving and dispatch', 'Loading and unloading', 'Inventory management'] },
    { area: 'Development', items: ['Angular and TypeScript web frontend', 'NestJS API', 'QA testing'] },
  ],
  interestNote:
    'I use AI tools such as Claude comfortably at work. I turn recurring store tasks into checklists and quickly build the materials and features I need with AI tools.',
  projects: [
    {
      id: 'howto-dig-fashion',
      title: 'howto-dig-fashion',
      subtitle: 'Fashion learning and store operations',
      description:
        'I am building a Korean-language guide and web service that helps people new to fashion understand clothing and get comfortable with store work.',
      highlights: [
        {
          label: 'Product reference research',
          text: 'I built a feature that compares Massimo Dutti Korea products with the runway looks and signature brand items they resemble. Candidates are first narrowed down by image similarity and garment attributes, and a reviewer then checks the evidence on a comparison screen and confirms or rejects each one.',
        },
        {
          label: 'Learning and onboarding',
          text: 'I organized garment construction, fabrics and blend ratios, fit and measurements, and store tasks into guides. Practice questions are generated from the guides, so learners can review their results and missed questions after each attempt. Team members track their progress on an onboarding checklist and ask the person in charge for a review.',
        },
        {
          label: 'Personal work log',
          text: 'I built a feature that records the date, hours, and tasks of each shift. As records build up, hours and tasks can be totaled by period, so performance on the floor can be checked and explained in numbers. Drafts are saved automatically, and I built the API and screens for recording and totaling.',
        },
      ],
      stack: ['TypeScript', 'Angular', 'NestJS', 'Node.js', 'PostgreSQL', 'pgvector', 'Playwright', 'CLIP', 'Claude'],
    },
  ],
  education: [
    {
      school: 'Korea National Open University',
      major: 'Computer Science',
      period: '2023–2026',
      status: 'On leave',
    },
    {
      school: 'Wonkwang University',
      major: 'Computer Software Engineering',
      period: '2016–2018',
      gpa: '3.87',
    },
  ],
  educationNote: 'I studied at Korea National Open University while working 40 hours a week and earned a 3.5 GPA.',
  resume: null,
  siteUrl: 'https://0x1a84.github.io/howto-portfolio/en/',
  repoUrl: 'https://github.com/0x1a84/howto-portfolio',
  updatedAt: '2026-11-25',
  navTitle: 'Portfolio',
};
