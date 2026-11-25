import { RenderMode, ServerRoute } from '@angular/ssr';

// 한국어와 영어 페이지를 빌드할 때 정적 HTML로 만듭니다. 그 밖의 주소는 브라우저에서 한국어 페이지로 보냅니다.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'en', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
