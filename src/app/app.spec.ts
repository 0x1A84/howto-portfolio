import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { PORTFOLIO } from './data/portfolio.data';
import { PORTFOLIO_EN } from './data/portfolio.data.en';

describe('포트폴리오 페이지', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  // 한국어(/)와 영어(/en) 페이지를 같은 기준으로 검사합니다.
  for (const [path, data] of [
    ['/', PORTFOLIO],
    ['/en', PORTFOLIO_EN],
  ] as const) {
    describe(path, () => {
      async function render(): Promise<HTMLElement> {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(path);
        return harness.routeNativeElement as HTMLElement;
      }

      it('이름을 h1 하나로 렌더링한다', async () => {
        const page = await render();
        expect(page.querySelectorAll('h1').length).toBe(1);
        expect(page.querySelector('h1')?.textContent).toContain(data.profile.name);
      });

      it('모든 경력의 근무처와 직무를 별도 요소로 표시한다', async () => {
        const page = await render();
        const orgs = Array.from(page.querySelectorAll('.experience-item__org')).map((el) => el.textContent?.trim());
        expect(orgs).toEqual(data.experienceGroups.flatMap((group) => group.items.map((item) => item.organization)));
      });

      it('이력서 공개 여부에 따라 이력서 섹션을 렌더링한다', async () => {
        const page = await render();
        expect(page.querySelector('#resume') !== null).toBe(data.resume !== null);
      });

      it('섹션 제목과 문서 언어를 페이지 언어로 표시한다', async () => {
        const page = await render();
        expect(document.documentElement.lang).toBe(data.lang);
        expect(page.querySelector('#experience-title')?.textContent?.trim()).toBe(data.ui.sections.experience);
        expect(page.querySelector('.site-nav__lang')?.textContent?.trim()).toBe(data.ui.langSwitch.label);
      });
    });
  }

  it('두 언어판의 경력, 학력, 프로젝트 항목 수가 같다', () => {
    const shape = (data: typeof PORTFOLIO) => [
      data.experienceGroups.map((group) => group.items.map((item) => [item.period, item.duties.length])),
      data.education.map((item) => [item.period, item.gpa]),
      data.projects.map((project) => [project.id, project.highlights.length, project.stack]),
      data.skills.map((skill) => skill.items.length),
    ];
    expect(shape(PORTFOLIO_EN)).toEqual(
      shape(PORTFOLIO).map((part, index) =>
        index === 0 ? JSON.parse(JSON.stringify(part).replace('현재', 'Present')) : part,
      ),
    );
  });
});
