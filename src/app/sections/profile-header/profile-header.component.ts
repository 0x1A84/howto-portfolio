import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Lang, Portfolio, UiLabels } from '../../data/portfolio.model';
import { PrintButtonComponent } from '../../print/print-button/print-button.component';
import { EnDatePipe } from '../../shared/en-date.pipe';
import { KoDatePipe } from '../../shared/ko-date.pipe';

@Component({
  selector: 'app-profile-header',
  imports: [PrintButtonComponent, KoDatePipe, EnDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {
  readonly profile = input.required<Portfolio['profile']>();
  readonly siteUrl = input.required<string>();
  readonly updatedAt = input.required<string>();
  readonly ui = input.required<UiLabels>();
  readonly lang = input.required<Lang>();
}
