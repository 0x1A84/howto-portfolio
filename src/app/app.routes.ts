import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';

// 한국어(/)와 영어(/en) 두 페이지를 같은 컴포넌트로 그리고, 빌드할 때 각각 정적 HTML로 만듭니다.
export const routes: Routes = [
  { path: '', component: PortfolioPageComponent, data: { lang: 'ko' } },
  { path: 'en', component: PortfolioPageComponent, data: { lang: 'en' } },
  { path: '**', redirectTo: '' },
];
