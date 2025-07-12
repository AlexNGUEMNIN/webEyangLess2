import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponentComponent } from './utilisateur-component/utilisateur-component.component';



const routes: Routes = [

  {
    path: '',
    component: UtilisateurComponentComponent,
      children: [
      // { path: 'nomde la route', component: composant de la route }, exemple de route 
    ]
  } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
