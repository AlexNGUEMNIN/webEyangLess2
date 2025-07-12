import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BailleurComponentComponent } from './bailleur-component/bailleur-component.component';



const routes: Routes = [

  {
    path: '',
    component: BailleurComponentComponent,
    children: [
      // { path: 'nomde la route', component: composant de la route }, exemple de route 
    ]
  } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BailleurRoutingModule { }
