import { Routes } from '@angular/router';
import { WebsiteComponent } from './pages/website/website-component/website.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/website',
    pathMatch: 'full'
  },
  {
    path: 'website',
    loadChildren: () => import('./pages/website/website.module').then(m => m.WebsiteModule)
  }
];
