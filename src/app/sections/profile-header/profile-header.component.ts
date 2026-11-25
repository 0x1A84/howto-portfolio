import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PRINT_WEB_ADDRESS } from '../../data/portfolio.data';
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
  protected readonly printWebAddress = PRINT_WEB_ADDRESS;
  readonly updatedAt = input.required<string>();
  readonly ui = input.required<UiLabels>();
  readonly lang = input.required<Lang>();
}
