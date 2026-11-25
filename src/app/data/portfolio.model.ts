export type Lang = 'ko' | 'en';

export interface Portfolio {
  lang: Lang;
  ui: UiLabels; // 템플릿에 들어가는 화면 문구
  profile: {
    name: string;
    handle: string;
    // src: 원본. 화면에서는 CSS로 색조를 입히고, A4 인쇄에서는 그대로 보여 줌
    // exportSrc: 웹 디자인 PDF(export:pdf)용. 화면의 혼합 모드 색조를 미리 입힌 파일 (PDF에서 mix-blend-mode가 깨지기 때문)
    photo: { src: string; exportSrc: string; alt: string; width: number; height: number };
    mobileIntro: { title: string; detail: string };
    tagline: string; // 머리말의 한 줄 소개
    summary: string; // 소개 문단
    links: ContactLink[];
    // 머리말 필드 배경 사진. 장식용이라 대체 텍스트는 두지 않고, credit에 출처와 라이선스를 적음
    heroImage: { src: string; credit: string; creditHref: string };
  };
  experienceGroups: ExperienceGroup[]; // 지원 직무와 가까운 묶음부터 차례로 둠
  skills: Skill[];
  interestNote: string; // 역량 표 아래 관심 분야 문단
  projects: Project[];
  education: Education[];
  educationNote: string; // 학력 목록 아래 문단
  resume: { label: string; href: string } | null;
  siteUrl: string; // 링크 공유에 쓰는 페이지 주소
  repoUrl: string; // footer의 저장소 링크
  updatedAt: string; // ISO 날짜. footer와 인쇄본에 표시
  navTitle: string; // 상단 내비게이션 왼쪽 글자 (영어)
}

// 언어마다 다른 화면 문구. 콘텐츠가 아닌 제목, 버튼, 표 머리 같은 글자를 모읍니다.
export interface UiLabels {
  pageTitle: string; // <title>, og:title
  description: string; // meta description, og:description
  ogLocale: string; // ko_KR, en_US
  skipLink: string;
  navLabel: string; // 내비게이션 aria-label
  sections: { experience: string; skills: string; projects: string; education: string; resume: string };
  // 다른 언어 페이지로 가는 링크. path는 라우터 경로('/', '/en')
  langSwitch: { path: string; label: string; lang: Lang; ariaLabel: string };
  printButton: string;
  printHint: string;
  printWebLabel: string; // 인쇄본 머리말의 '웹 버전'
  asOf: { before: string; after: string }; // 인쇄본 갱신일 앞뒤 글자: '{날짜} 기준', 'As of {date}'
  periodTo: string; // 기간을 보조 기술로 읽을 때 시작과 끝 사이 말: '부터', 'to'
  skillsHead: { area: string; items: string };
  gpa: string; // '평점', 'GPA'
  stackTitle: string; // '사용 기술'
}

export interface ExperienceGroup {
  id: string; // 제목 요소의 id로 사용
  title: string; // ITX 코리아
  items: Experience[];
  note?: string; // 목록 아래 문단
}

export interface Experience {
  organization: string;
  role?: string; // PORTFOLIO.md에 직무가 없는 근무처는 비워 둠
  period: string; // 2025.03–현재
  duties: string[]; // 직무 이름만 확인된 단기 근무는 비워 둠
}

export interface Skill {
  area: string;
  items: string[];
}

export interface Project {
  id: string; // 앵커와 key로 사용
  title: string;
  subtitle: string;
  description: string;
  highlights: { label: string; text: string }[];
  stack: string[];
  url?: string;
}

export interface Education {
  school: string;
  major: string;
  period: string;
  status?: string;
  gpa?: string; // 평점. 화면에는 ui.gpa와 함께 '평점 3.87'로 표시
}

export interface ContactLink {
  kind: 'email' | 'github' | 'web';
  label: string;
  href: string;
  printText: string; // 인쇄본에 글자로 찍을 값
}

export interface SectionLink {
  id: string;
  label: string;
}
