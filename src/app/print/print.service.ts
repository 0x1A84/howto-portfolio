import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrintService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private opened: HTMLDetailsElement[] = [];

  constructor() {
    if (!this.isBrowser) return;
    const view = this.document.defaultView;
    // 단축키로 인쇄해도 같은 결과가 나오도록 버튼이 아니라 인쇄 이벤트에서 처리합니다.
    view?.addEventListener('beforeprint', () => this.expandDetails());
    view?.addEventListener('afterprint', () => this.restoreDetails());
  }

  print(): void {
    if (!this.isBrowser) return;
    this.document.defaultView?.print();
  }

  private expandDetails(): void {
    this.opened = Array.from(this.document.querySelectorAll('details:not([open])'));
    this.opened.forEach((details) => (details.open = true));
  }

  private restoreDetails(): void {
    this.opened.forEach((details) => (details.open = false));
    this.opened = [];
  }
}
