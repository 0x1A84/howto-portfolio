import { TestBed } from '@angular/core/testing';
import { PeriodComponent } from './period.component';

describe('PeriodComponent', () => {
  it('기간을 대시 글자 없이 시작과 끝으로 나눈다', async () => {
    const fixture = TestBed.createComponent(PeriodComponent);
    fixture.componentRef.setInput('value', '2025.03–현재');
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toContain('–');
    expect(text.replace(/\s+/g, ' ').trim()).toBe('2025.03 부터 현재');
  });
});
