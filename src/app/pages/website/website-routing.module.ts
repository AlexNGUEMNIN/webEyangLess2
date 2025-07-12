import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FindroomComponent } from "./findroom/findroom.component";
import { CitiesComponent } from "./cities/cities.component";
import { AproposComponent } from "./apropos/apropos.component";
import { WebsiteComponent } from "./website-component/website.component";
import { DetailCityComponent } from "./detail-city/detail-city.component";
import { BecomeBailleurComponent } from "../bailleur/become-bailleur/become-bailleur.component";
import { CreateCityComponent } from "../bailleur/create-city/create-city.component";
import { MyCitiesComponent } from "../bailleur/my-cities/my-cities.component";
import { MapComponent } from "../map/map.component";
import { RoomSelectionComponent } from "./room-selection/room-selection.component";
import { PaymentReservationComponent } from "./payment-reservation/payment-reservation.component";
import { PaymentVerificationComponent } from "./payment-verification/payment-verification.component";
import { PaymentSuccessComponent } from "./payment-success/payment-success.component";
import { PaymentFailedComponent } from "./payment-failed/payment-failed.component";
import { MyAccountComponent } from "./my-account/my-account.component";



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
        path: "detail-city/:id",
        component: DetailCityComponent
      },
      {
        path: "room-selection",
        component: RoomSelectionComponent
      },
      {
        path: "payment-reservation",
        component: PaymentReservationComponent
      },
      {
        path: "payment-verification",
        component: PaymentVerificationComponent
      },
      {
        path: "payment-success",
        component: PaymentSuccessComponent
      },
      {
        path: "payment-failed",
        component: PaymentFailedComponent
      },
      {
        path: "apropos",
        component: AproposComponent
      },
      {
        path: "my-account",
        component: MyAccountComponent
      },

      // Ce qui concerne le bailleur
      {
        path: 'become-bailleur',
        component: BecomeBailleurComponent
      },
      {
        path: 'create',
        component: CreateCityComponent
      },
      {
        path: 'my-cities',
        component: MyCitiesComponent
      },
      {
        path: 'map',
        component: MapComponent
      }
    ]
  },


]


@NgModule({
  imports: [RouterModule.forChild(website_routes)],
  exports: [RouterModule]
})

export class WebsiteRoutingModule { }
