import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PORTFOLIO } from './data/portfolio.data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('이름을 h1 하나로 렌더링한다', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('h1').length).toBe(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(PORTFOLIO.profile.name);
  });

  it('모든 경력의 근무처와 직무를 별도 요소로 표시한다', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const orgs = Array.from(compiled.querySelectorAll('.experience-item__org')).map((el) => el.textContent?.trim());
    expect(orgs).toEqual(PORTFOLIO.experienceGroups.flatMap((group) => group.items.map((item) => item.organization)));
  });

  it('이력서 공개 여부에 따라 이력서 섹션을 렌더링한다', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#resume') !== null).toBe(PORTFOLIO.resume !== null);
  });
});
