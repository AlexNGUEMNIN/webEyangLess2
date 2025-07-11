import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Photo {
  id: number;
  src: string;
  alt: string;
  additionalPhotos?: number;
}

@Component({
  selector: 'app-detail-city',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './detail-city.component.html',
  styleUrl: './detail-city.component.scss'
})
export class DetailCityComponent {

  currentImageIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  photos: Photo[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      alt: 'Modern apartment living room with built-in storage'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      alt: 'Cozy bedroom with warm lighting'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
      alt: 'Modern bedroom with striped bedding'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop',
      alt: 'Minimalist bedroom with plants'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
      alt: 'Dark modern interior',
      additionalPhotos: 7
    }
  ];

  onPhotoClick(photo: Photo): void {
    console.log('Photo clicked:', photo);
    // Implement photo modal or navigation logic here
  }

  onShowAllPhotos(): void {
    console.log('Show all photos clicked');
    // Implement show all photos logic here
  }
}
