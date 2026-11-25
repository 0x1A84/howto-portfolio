import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { portfolioFor, sectionsFor } from '../../data/portfolio.locale';
import { Lang } from '../../data/portfolio.model';
import { SiteFooterComponent } from '../../layout/site-footer/site-footer.component';
import { SiteNavComponent } from '../../layout/site-nav/site-nav.component';
import { EducationSectionComponent } from '../../sections/education-section/education-section.component';
import { ExperienceSectionComponent } from '../../sections/experience-section/experience-section.component';
import { ProfileHeaderComponent } from '../../sections/profile-header/profile-header.component';
import { ProjectSectionComponent } from '../../sections/project-section/project-section.component';
import { ResumeSectionComponent } from '../../sections/resume-section/resume-section.component';
import { SkillsSectionComponent } from '../../sections/skills-section/skills-section.component';

// 라우트의 data.lang('ko' | 'en')에 맞는 콘텐츠로 페이지 전체를 그립니다.
@Component({
  selector: 'app-portfolio-page',
  imports: [
    RouterLink,
    SiteNavComponent,
    ProfileHeaderComponent,
    ExperienceSectionComponent,
    SkillsSectionComponent,
    ProjectSectionComponent,
    EducationSectionComponent,
    ResumeSectionComponent,
    SiteFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio-page.component.html',
})
export class PortfolioPageComponent {
  private readonly lang: Lang = inject(ActivatedRoute).snapshot.data['lang'] === 'en' ? 'en' : 'ko';
  protected readonly data = portfolioFor(this.lang);
  protected readonly sections = sectionsFor(this.data);

  constructor() {
    // prerender 때 문서 언어와 제목, 설명을 페이지 언어로 바꿔 정적 HTML에 남깁니다.
    const { ui } = this.data;
    inject(DOCUMENT).documentElement.lang = this.lang;
    inject(Title).setTitle(ui.pageTitle);
    const meta = inject(Meta);
    meta.updateTag({ name: 'description', content: ui.description });
    meta.updateTag({ property: 'og:title', content: ui.pageTitle });
    meta.updateTag({ property: 'og:description', content: ui.description });
    meta.updateTag({ property: 'og:locale', content: ui.ogLocale });
    meta.updateTag({ property: 'og:url', content: this.data.siteUrl });

    // 라우터의 앵커 이동은 scroll-padding-top을 따르지 않으므로, 고정된 내비게이션 높이만큼 띄웁니다.
    const scroller = inject(ViewportScroller);
    const document = inject(DOCUMENT);
    afterNextRender(() => {
      scroller.setOffset(() => [0, (document.querySelector<HTMLElement>('.site-nav')?.offsetHeight ?? 0) + 16]);
    });
  }
}
