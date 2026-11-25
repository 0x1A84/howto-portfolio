import { expect, test } from '@playwright/test';
import { PORTFOLIO } from '../src/app/data/portfolio.data';

const SECTION_TITLES = ['경력', '역량', '프로젝트', '학력'];

test.describe('화면', () => {
  for (const width of [360, 1280]) {
    test(`${width}px 너비에서 가로 스크롤이 없다`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('./');
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);
    });
  }

  for (const path of ['./', './en/']) {
    test(`${path} 모바일 머리말에서 배경 사진을 표시하고 프로필 GitHub 링크를 숨긴다`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(path);

      const field = page.locator('.profile__field');
      const name = page.locator('.profile__name');
      const printButton = page.locator('.profile__actions button');
      await expect(field).toHaveCSS('background-color', 'oklch(0.44 0.2 266)');
      const fieldImage = page.locator('.profile__field-image');
      await expect(fieldImage).toBeVisible();
      await fieldImage.evaluate((image: HTMLImageElement) => image.decode());
      await expect(page.locator('.profile__credit')).toBeVisible();
      await expect(name).toBeVisible();
      await expect(printButton).toBeVisible();
      await expect(page.locator('header.profile').getByRole('link', { name: 'github.com/0x1a84' })).toHaveCount(0);
      const intro = page.locator('.profile__mobile-intro');
      await expect(intro.getByText('Fashionable Engineer')).toBeVisible();
      await expect(intro.locator('strong')).toHaveCSS('font-size', '24px');
      await expect(intro.locator('span')).toHaveCSS('font-size', '18px');
      await expect(intro.locator('span')).toHaveText(
        path === './' ? '한국어·영어 고객 응대' : 'Korean & English customer service',
      );
      await expect(intro).toHaveCSS('background-clip', 'text');
      const photo = page.locator('.profile__photo');
      const gradient = await photo.evaluate((element) => getComputedStyle(element, '::after').backgroundImage);
      await expect(intro).toHaveCSS('background-image', gradient);
      await page.evaluate(() => document.fonts.ready);
      const photoBounds = (await photo.boundingBox())!;
      const introBounds = (await intro.boundingBox())!;
      expect(introBounds.x).toBeGreaterThanOrEqual(photoBounds.x + photoBounds.width);
      expect(introBounds.y).toBeGreaterThanOrEqual(photoBounds.y);
      expect(introBounds.y + introBounds.height).toBeLessThanOrEqual(photoBounds.y + photoBounds.height);

      const fieldBounds = (await field.boundingBox())!;
      const nameBounds = (await name.boundingBox())!;
      const buttonBounds = (await printButton.boundingBox())!;
      expect(nameBounds.y).toBeGreaterThanOrEqual(fieldBounds.y);
      expect(buttonBounds.y + buttonBounds.height).toBeLessThanOrEqual(fieldBounds.y + fieldBounds.height);
    });
  }

  test('콘솔 오류가 없다', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('./', { waitUntil: 'networkidle' });
    expect(errors).toEqual([]);
  });

  test('시스템이 다크 모드여도 라이트 모드로 보인다 (FR-20)', async ({ page }) => {
    const backgroundIn = async (colorScheme: 'light' | 'dark') => {
      await page.emulateMedia({ colorScheme });
      await page.goto('./');
      return page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    };
    expect(await backgroundIn('dark')).toBe(await backgroundIn('light'));
  });

  test('h1은 이름 하나이고 섹션마다 h2가 있다 (FR-01)', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText(PORTFOLIO.profile.name);
    for (const section of await page.locator('main section').all()) {
      await expect(section.locator('h2')).toHaveCount(1);
    }
  });

  test('해시 주소로 열면 해당 섹션으로 스크롤된다 (FR-02)', async ({ page }) => {
    await page.goto('./#projects');
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('스크롤하면 내비게이션의 현재 섹션이 바뀐다 (FR-03)', async ({ page }) => {
    await page.goto('./');
    await page.locator('#education').scrollIntoViewIfNeeded();
    await expect(page.locator('.site-nav a[aria-current="true"]')).toHaveText('학력');
  });

  test('프로젝트 기술 태그가 목록으로 나온다 (FR-04)', async ({ page }) => {
    await page.goto('./');
    const project = PORTFOLIO.projects.find((item) => item.stack.length > 0)!;
    await expect(page.locator(`#${project.id} ul > li.tag`)).toHaveCount(project.stack.length);
  });

  test('외부 링크는 새 탭으로 연다 (FR-05)', async ({ page }) => {
    await page.goto('./');
    for (const link of await page.locator('a[href^="http"]').all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('이력서가 공개 전이면 섹션을 숨긴다 (FR-06)', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#resume')).toHaveCount(PORTFOLIO.resume ? 1 : 0);
  });

  test('깨진 내부 링크와 자원이 없다', async ({ page, request }) => {
    const failed: string[] = [];
    page.on('response', (response) => response.status() >= 400 && failed.push(response.url()));
    await page.goto('./', { waitUntil: 'networkidle' });
    for (const href of await page.locator('a[href]:not([href^="http"]):not([href^="#"])').evaluateAll(
      (links) => links.map((link) => (link as HTMLAnchorElement).href),
    )) {
      const response = await request.get(href);
      if (!response.ok()) failed.push(href);
    }
    expect(failed).toEqual([]);
  });

  test('인쇄 버튼은 window.print()를 호출한다 (FR-10)', async ({ page }) => {
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      (window as unknown as { printed: number }).printed = 0;
      window.print = () => void (window as unknown as { printed: number }).printed++;
    });
    await page.getByRole('button', { name: 'A4로 인쇄' }).click();
    expect(await page.evaluate(() => (window as unknown as { printed: number }).printed)).toBe(1);
  });

  test('스크립트를 꺼도 모든 섹션을 읽을 수 있다 (NFR-02)', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto('./');
    for (const title of SECTION_TITLES) {
      await expect(page.getByRole('heading', { level: 2, name: title })).toBeVisible();
    }
    await expect(page.getByText(PORTFOLIO.projects[0].description)).toBeVisible();
    await context.close();
  });
});

test.describe('인쇄', () => {
  test('화면 전용 요소를 숨기고 인쇄 전용 요소를 보인다 (FR-12, FR-16)', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await page.goto('./');
    for (const element of await page.locator('.screen-only').all()) {
      await expect(element).toBeHidden();
    }
    await expect(page.locator('.profile__print-meta p').first()).toHaveText('웹 버전 0x1a84ff.github.io');
    await expect(page.locator('.profile__print-meta')).toContainText('2026년 11월 25일 기준');
  });

  test('다크 모드에서도 흰 바탕으로 인쇄한다 (FR-13)', async ({ page }) => {
    await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
    await page.goto('./');
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).toBe('rgb(255, 255, 255)');
  });

  test('카드와 경력 항목이 쪽 경계에서 잘리지 않는다 (FR-14)', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await page.goto('./');
    for (const selector of ['.project-card', '.experience-item']) {
      const value = await page.locator(selector).first().evaluate((el) => getComputedStyle(el).breakInside);
      expect(value).toBe('avoid');
    }
  });

  test('외부 링크 뒤에 주소를 찍고 내부 앵커는 찍지 않는다 (FR-15)', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await page.goto('./');
    const after = await page
      .locator('.site-footer a[href^="http"]')
      .evaluate((el) => getComputedStyle(el, '::after').content);
    expect(after).toContain('github.com/0x1a84/howto-portfolio');
    const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((link) => getComputedStyle(link, '::after').content),
    );
    anchors.forEach((content) => expect(['none', 'normal']).toContain(content));
  });

  test('A4 2쪽 이내로 인쇄된다 (FR-11, FR-17)', async ({ page }) => {
    await page.emulateMedia({ media: 'print', colorScheme: 'light' });
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? []).length;
    expect(pages).toBeGreaterThan(0);
    expect(pages).toBeLessThanOrEqual(2);
  });
});
