import { AdminComponentComponent } from "./admin-component/admin-component.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  {
    path: '',
    component: AdminComponentComponent,
      children: [
      // { path: 'nomde la route', component: composant de la route }, exemple de route 
    ]
  } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
