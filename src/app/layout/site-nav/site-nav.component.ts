import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionLink, UiLabels } from '../../data/portfolio.model';

@Component({
  selector: 'app-site-nav',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.css',
})
export class SiteNavComponent {
  readonly sections = input.required<SectionLink[]>();
  readonly title = input.required<string>();
  readonly ui = input.required<UiLabels>();

  protected readonly current = signal<string | null>(null);

  private readonly document = inject(DOCUMENT);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // 링크 이동은 앵커만으로 동작하고, 현재 위치 강조만 브라우저에서 덧붙입니다.
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view || !('IntersectionObserver' in view)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting);
          if (visible.length > 0) this.current.set(visible[0].target.id);
        },
        { rootMargin: '-35% 0px -60% 0px' },
      );

      this.sections()
        .map(({ id }) => this.document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .forEach((section) => observer.observe(section));

      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
