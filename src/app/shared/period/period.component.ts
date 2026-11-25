import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// '2025.03–현재'처럼 en dash로 이은 기간을 시작과 끝으로 나눠 표시합니다.
// 화면에는 대시 글자 대신 짧은 선을 그리고, 보조 기술과 PDF 텍스트에는 '부터'로 읽히게 합니다.
@Component({
  selector: 'app-period',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="period num">
    {{ parts().start }}
    @if (parts().end) {
      <span class="period__to"
        ><span class="visually-hidden">{{ to() }}</span></span
      >
      {{ parts().end }}
    }
  </span>`,
  styleUrl: './period.component.css',
})
export class PeriodComponent {
  readonly value = input.required<string>();
  readonly to = input('부터'); // 보조 기술이 읽는 시작과 끝 사이 말 (영어판은 'to')

  protected readonly parts = computed(() => {
    const [start, end] = this.value().split('–');
    return { start: start.trim(), end: end?.trim() };
  });
}
