import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PeriodComponent } from '../../shared/period/period.component';
import { ExperienceGroup } from '../../data/portfolio.model';

@Component({
  selector: 'app-experience-section',
  imports: [PeriodComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css',
})
export class ExperienceSectionComponent {
  readonly groups = input.required<ExperienceGroup[]>();
}
