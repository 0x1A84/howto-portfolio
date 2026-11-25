import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Portfolio, UiLabels } from '../../data/portfolio.model';

@Component({
  selector: 'app-resume-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resume-section.component.html',
})
export class ResumeSectionComponent {
  // null이면 공개가 확정되지 않은 상태이므로 섹션을 렌더링하지 않습니다 (FR-06).
  readonly resume = input.required<Portfolio['resume']>();
  readonly ui = input.required<UiLabels>();
}
