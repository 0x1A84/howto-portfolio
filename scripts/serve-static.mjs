// 빌드 산출물(dist/<프로젝트>/browser)을 띄우는 정적 서버입니다.
// PDF 생성 스크립트와 Playwright 테스트가 같이 씁니다. 단독 실행: npm run preview
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DIST_DIR = resolve(fileURLToPath(new URL('../dist/howto-portfolio/browser', import.meta.url)));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

// GitHub Pages용으로 baseHref를 바꿔 빌드해도 같은 경로로 열 수 있도록 index.html의 <base>를 읽습니다.
export function readBaseHref(root = DIST_DIR) {
  const index = join(root, 'index.html');
  if (!existsSync(index)) return '/';
  const match = /<base href="([^"]*)"/.exec(readFileSync(index, 'utf8'));
  return match ? match[1] : '/';
}

export function startServer({ root = DIST_DIR, port = 0 } = {}) {
  if (!existsSync(join(root, 'index.html'))) {
    throw new Error(`${root}/index.html이 없습니다. 먼저 npm run build를 실행하세요.`);
  }
  const base = readBaseHref(root);

  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    let path = decodeURIComponent(url.pathname);
    if (!path.startsWith(base)) {
      res.writeHead(302, { location: base });
      res.end();
      return;
    }
    path = '/' + path.slice(base.length);
    if (path.endsWith('/')) path += 'index.html';

    const file = normalize(join(root, path));
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      const info = await stat(file);
      if (!info.isFile()) throw new Error('not a file');
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('404');
    }
  });

  return new Promise((done) => {
    server.listen(port, '127.0.0.1', () => {
      const { port: actual } = server.address();
      done({ server, url: `http://127.0.0.1:${actual}${base}`, close: () => server.close() });
    });
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4300);
  const { url } = await startServer({ port });
  console.log(`정적 서버: ${url}`);
}
