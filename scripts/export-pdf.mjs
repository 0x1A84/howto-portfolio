// 빌드한 페이지를 화면 디자인 그대로 A4 PDF로 만듭니다 (기능 명세서 4.4절).
// 데스크톱 너비(1360px)로 배치한 화면을 A4 너비에 맞게 줄이고, src/styles/export.css로 여백만 줄입니다.
// 사용: npm run build && npm run export:pdf
import { mkdir, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { DIST_DIR, startServer } from './serve-static.mjs';

const MAX_PAGES = 2; // FR-17
const MAX_BYTES = 1024 * 1024; // FR-36
const LAYOUT_WIDTH = 1360; // PDF에 옮길 화면 너비(px). 데스크톱 배치를 쓰면서 A4 두 쪽에 여유 있게 들어가는 값
const A4_WIDTH = 793.7; // 210mm를 96dpi 픽셀로 바꾼 값

const outDir = join(DIST_DIR, 'files');
const outFile = join(outDir, 'portfolio.pdf');

// PDF 안의 /Type /Page 객체 수로 쪽수를 셉니다. /Pages(페이지 트리)는 제외합니다.
export function countPdfPages(buffer) {
  return (buffer.toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? []).length;
}

async function main() {
  const { url, close } = await startServer();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: LAYOUT_WIDTH, height: 900 } });
    await page.emulateMedia({ media: 'screen', colorScheme: 'light' });
    await page.goto(url, { waitUntil: 'networkidle' });
    // 스타일시트가 늦게 적용되면 서식 없는 PDF가 나오므로, 섹션 틀 규칙이 적용될 때까지 기다립니다.
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.sheet__grid')).display === 'grid');
    await page.evaluate(() => {
      document.documentElement.dataset.export = 'pdf';
      return document.fonts.ready;
    });

    await mkdir(outDir, { recursive: true });
    await page.pdf({
      path: outFile,
      preferCSSPageSize: true, // export.css의 @page portfolio-export (A4, 여백 0)
      scale: A4_WIDTH / LAYOUT_WIDTH,
      printBackground: true, // 필드, 배경색, 구분선 색 유지
      tagged: true, // 접근성 태그
      outline: true, // 섹션 제목으로 책갈피 생성
    });
  } finally {
    await browser.close();
    close();
  }

  const pages = countPdfPages(readFileSync(outFile));
  const { size } = await stat(outFile);
  console.log(`${outFile}: A4 ${pages}쪽, ${Math.round(size / 1024)}KB`);

  const errors = [];
  if (pages > MAX_PAGES) errors.push(`쪽수가 ${MAX_PAGES}쪽을 넘습니다 (${pages}쪽).`);
  if (size > MAX_BYTES) errors.push(`용량이 1MB를 넘습니다 (${Math.round(size / 1024)}KB).`);
  if (errors.length > 0) {
    errors.forEach((message) => console.error(message));
    process.exit(1);
  }
}

await main();
