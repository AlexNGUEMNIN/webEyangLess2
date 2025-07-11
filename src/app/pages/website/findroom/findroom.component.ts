import { Component } from '@angular/core';
import { CarouselComponent } from "../../../Component/website/carousel/carousel.component";
import { CardCiteComponent } from '../../../Component/website/card-cite/card-cite.component';

@Component({
  selector: 'app-findroom',
  standalone: true,
  imports: [CarouselComponent, CardCiteComponent],
  templateUrl: './findroom.component.html',
  styleUrl: './findroom.component.scss'
})
export class FindroomComponent {
  cities = [
    {
      id: 1,
      name: 'Cité Belvira',
      price: 55000,
      currency: 'FCFA',
      period: 'mois',
      location: 'Cité Belvira',
      distance: 'Située à 0,2 km du campus',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Cité Digital City',
      price: 60000,
      currency: 'FCFA',
      period: 'mois',
      location: 'Cité Digital City',
      distance: 'Située à 0,7 km du campus',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Cité Shekinah',
      price: 90000,
      currency: 'FCFA',
      period: 'mois',
      location: 'Cité Shekinah',
      distance: 'Située à 0,8 km du campus',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Cité Digitale 2',
      price: 60000,
      currency: 'FCFA',
      period: 'mois',
      location: 'Cité Digitale 2',
      distance: 'Située à 0,8 km du campus',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    }
  ];
}
