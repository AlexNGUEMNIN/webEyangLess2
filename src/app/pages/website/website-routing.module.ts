import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FindroomComponent } from "./findroom/findroom.component";
import { CitiesComponent } from "./cities/cities.component";
import { AproposComponent } from "./apropos/apropos.component";
import { WebsiteComponent } from "./website-component/website.component";
import { DetailCityComponent } from "./detail-city/detail-city.component";



const website_routes : Routes = [
  {
    path: '', redirectTo: 'find', pathMatch: 'full'
  },
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: "accueil",
        component: FindroomComponent
      },
      {
        path: "find",
        component: CitiesComponent
      },
      {
        path: "detail-city",
        component: DetailCityComponent
      },
      {
        path: "apropos",
        component: AproposComponent
      },

      // Ce qui concerne le bailleur
      // {
      //   path: 'become-bailleur',
      //   component: BecomeBailleurComponent
      // },
      // {
      //   path: 'create',
      //   component: CreateCityComponent
      // },
    ]
  },


]


@NgModule({
  imports: [RouterModule.forChild(website_routes)],
  exports: [RouterModule]
})

export class WebsiteRoutingModule { }
