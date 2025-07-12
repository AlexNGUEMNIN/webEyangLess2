import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselImage } from '../../../models/cacrouselImage';
import { SearchForm } from '../../../models/SearchForm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private intervalId: any;

  searchForm: SearchForm = {
    locality: '',
    budget: '',
    roomType: ''
  };

  carouselImages: CarouselImage[] = [
    {
      url: 'assets/images/image1.jpg',
      alt: 'Maison moderne avec piscine'
    },
    {
      url: 'assets/images/image2.jpg',
      alt: 'Résidence étudiante'
    },
    {
      url: 'assets/images/image3.jpg',
      alt: 'Chambre moderne'
    }
  ];

  // popularCities: PopularCity[] = [
  //   {
  //     id: 1,
  //     name: 'Cité Belvira',
  //     price: 55000,
  //     currency: 'FCFA',
  //     period: 'mois',
  //     location: 'Cité Belvira',
  //     distance: 'Située à 0,2 km du campus',
  //     image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  //   },
  //   {
  //     id: 2,
  //     name: 'Cité Digital City',
  //     price: 60000,
  //     currency: 'FCFA',
  //     period: 'mois',
  //     location: 'Cité Digital City',
  //     distance: 'Située à 0,7 km du campus',
  //     image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  //   },
  //   {
  //     id: 3,
  //     name: 'Cité Shekinah',
  //     price: 90000,
  //     currency: 'FCFA',
  //     period: 'mois',
  //     location: 'Cité Shekinah',
  //     distance: 'Située à 0,8 km du campus',
  //     image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  //   }
  // ];

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Reset the interval when user manually changes slide
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.startCarousel();
    }
  }

  onSearch() {
    console.log('Recherche:', this.searchForm);
    // Implement search logic here
  }

  isActive(index: number): boolean {
    return this.currentSlide === index;
  }
}
