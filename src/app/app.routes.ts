import { Routes } from '@angular/router';
import { DetailCityComponent } from './pages/website/detail-city/detail-city.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'detail-city',
    component: DetailCityComponent
  }
];
