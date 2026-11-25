import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { PORTFOLIO } from '../src/app/data/portfolio.data';

// npm run export:pdf로 만든 파일을 검사합니다.
const PDF_PATH = join(process.cwd(), 'dist/howto-portfolio/browser/files/portfolio.pdf');
const SECTION_TITLES = ['경력', '역량', '프로젝트', '학력'];

async function loadPdf() {
  return getDocument({ data: new Uint8Array(readFileSync(PDF_PATH)), useSystemFonts: false }).promise;
}

test.describe('빌드 PDF', () => {
  test('A4 크기로 2쪽 이내이고 1MB 이하다 (FR-31, FR-36)', async () => {
    const pdf = await loadPdf();
    expect(pdf.numPages).toBeLessThanOrEqual(2);
    for (let number = 1; number <= pdf.numPages; number++) {
      const [, , width, height] = (await pdf.getPage(number)).view;
      expect(Math.round(width)).toBe(595);
      expect(Math.round(height)).toBe(842);
    }
    expect(statSync(PDF_PATH).size).toBeLessThanOrEqual(1024 * 1024);
  });

  test('글자가 텍스트로 들어 있고 글꼴이 포함돼 있다 (FR-33)', async () => {
    const pdf = await loadPdf();
    let text = '';
    for (let number = 1; number <= pdf.numPages; number++) {
      const content = await (await pdf.getPage(number)).getTextContent();
      text += content.items.map((item) => ('str' in item ? item.str : '')).join('');
    }
    const compact = text.replace(/\s+/g, '');
    expect(compact).toContain(PORTFOLIO.profile.name);
    SECTION_TITLES.forEach((title) => expect(compact).toContain(title.replace(/\s+/g, '')));
    expect(readFileSync(PDF_PATH).toString('latin1')).toMatch(/\/FontFile2/);
  });

  test('외부 링크를 누를 수 있다 (FR-34)', async () => {
    const pdf = await loadPdf();
    const uris = new Set<string>();
    for (let number = 1; number <= pdf.numPages; number++) {
      for (const annotation of await (await pdf.getPage(number)).getAnnotations()) {
        if (annotation.url) uris.add(annotation.url);
      }
    }
    const expected = [...PORTFOLIO.profile.links.map((link) => link.href), PORTFOLIO.repoUrl];
    expected.forEach((href) => expect([...uris].map((uri) => uri.replace(/\/$/, ''))).toContain(href));
  });

  test('문서 제목과 언어, 책갈피가 들어 있다 (FR-35)', async () => {
    const pdf = await loadPdf();
    const { info } = (await pdf.getMetadata()) as { info: { Title?: string } };
    expect(info.Title).toBe('이재훈 포트폴리오');
    expect(readFileSync(PDF_PATH).toString('latin1')).toMatch(/\/Lang\s*\(ko\)/);
    const outline = await pdf.getOutline();
    expect(outline?.length ?? 0).toBeGreaterThan(0);
  });

});
