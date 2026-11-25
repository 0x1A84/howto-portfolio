import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PeriodComponent } from '../../shared/period/period.component';
import { Education } from '../../data/portfolio.model';

@Component({
  selector: 'app-education-section',
  imports: [PeriodComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.css',
})
export class EducationSectionComponent {
  readonly education = input.required<Education[]>();
  readonly note = input.required<string>();
}
