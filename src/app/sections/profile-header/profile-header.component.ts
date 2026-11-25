import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Portfolio } from '../../data/portfolio.model';
import { PrintButtonComponent } from '../../print/print-button/print-button.component';
import { KoDatePipe } from '../../shared/ko-date.pipe';

@Component({
  selector: 'app-profile-header',
  imports: [PrintButtonComponent, KoDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {
  readonly profile = input.required<Portfolio['profile']>();
  readonly siteUrl = input.required<string>();
  readonly updatedAt = input.required<string>();
}
