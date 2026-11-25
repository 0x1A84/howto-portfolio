import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO, SECTIONS } from './data/portfolio.data';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteNavComponent } from './layout/site-nav/site-nav.component';
import { EducationSectionComponent } from './sections/education-section/education-section.component';
import { ExperienceSectionComponent } from './sections/experience-section/experience-section.component';
import { ProfileHeaderComponent } from './sections/profile-header/profile-header.component';
import { ProjectSectionComponent } from './sections/project-section/project-section.component';
import { ResumeSectionComponent } from './sections/resume-section/resume-section.component';
import { SkillsSectionComponent } from './sections/skills-section/skills-section.component';

@Component({
  selector: 'app-root',
  imports: [
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
  templateUrl: './app.html',
})
export class App {
  protected readonly data = PORTFOLIO;
  protected readonly sections = SECTIONS;
}
