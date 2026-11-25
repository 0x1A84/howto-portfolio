import { PORTFOLIO } from './portfolio.data';
import { PORTFOLIO_EN } from './portfolio.data.en';
import { Lang, Portfolio, SectionLink } from './portfolio.model';

export function portfolioFor(lang: Lang): Portfolio {
  return lang === 'en' ? PORTFOLIO_EN : PORTFOLIO;
}

// 상단 내비게이션 순서. 이력서는 공개가 확정됐을 때만 넣습니다.
export function sectionsFor(data: Portfolio): SectionLink[] {
  const { sections } = data.ui;
  return [
    { id: 'experience', label: sections.experience },
    { id: 'skills', label: sections.skills },
    { id: 'projects', label: sections.projects },
    { id: 'education', label: sections.education },
    ...(data.resume ? [{ id: 'resume', label: sections.resume }] : []),
  ];
}
