import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnDatePipe } from '../../shared/en-date.pipe';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, EnDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css',
})
export class SiteFooterComponent {
  readonly updatedAt = input.required<string>();
  readonly repoUrl = input.required<string>();

  protected readonly year = (): string => this.updatedAt().slice(0, 4);
}
