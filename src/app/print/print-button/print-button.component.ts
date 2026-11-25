import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-print-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button type="button" class="btn btn--primary" (click)="print()">A4로 인쇄</button>`,
})
export class PrintButtonComponent {
  private readonly printService = inject(PrintService);

  protected print(): void {
    this.printService.print();
  }
}
