export interface Portfolio {
  profile: {
    name: string;
    handle: string;
    // printSrc: 인쇄와 PDF용. 화면의 혼합 모드 색조를 미리 입힌 파일 (PDF에서 mix-blend-mode가 깨지기 때문)
    photo: { src: string; printSrc: string; alt: string; width: number; height: number };
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
  siteUrl: string; // 인쇄본 머리말에 찍을 웹 주소
  repoUrl: string; // footer의 저장소 링크
  updatedAt: string; // ISO 날짜. footer와 인쇄본에 표시
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
  gpa?: string; // 평점. 화면에는 '평점 3.87'로 표시
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
