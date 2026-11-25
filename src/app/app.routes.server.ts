import { RenderMode, ServerRoute } from '@angular/ssr';

// 페이지가 하나뿐이므로 빌드할 때 모두 정적 HTML로 만듭니다.
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
