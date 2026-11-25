import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-print-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button type="button" class="btn btn--primary" (click)="print()">{{ label() }}</button>`,
})
export class PrintButtonComponent {
  readonly label = input.required<string>();

  private readonly printService = inject(PrintService);

  protected print(): void {
    this.printService.print();
  }
}
