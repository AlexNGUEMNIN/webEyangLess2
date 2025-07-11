import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CardCiteComponent } from '../../../Component/website/card-cite/card-cite.component';
import { Router } from '@angular/router';

export interface Filters {
  wifi: boolean;
  parking: boolean;
  security: boolean;
}

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [ CommonModule, FormsModule, CardCiteComponent ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {
  // Données
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

  filteredCities: any[] = [];

  // État des filtres
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedSurfaceRange: string = '';
  selectedRoomType: string = '';
  sortBy: string = 'name';

  filters: Filters = {
    wifi: false,
    parking: false,
    security: false
  };

  // État de l'interface
  showFilters: boolean = false;
  loading: boolean = false;

  // Subjects pour la recherche avec debounce
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.filteredCities = [...this.cities];
    this.setupSearchDebounce();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  // Gestion de la recherche
  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  // Gestion des filtres
  onFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applySorting();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  // Application des filtres
  private applyFilters(): void {
    // this.loading = true;

    // // Simulation d'un léger délai pour l'effet de chargement
    // setTimeout(() => {
    //   let filtered = [...this.cities];

    //   // Filtre de recherche textuelle
    //   if (this.searchTerm.trim()) {
    //     const term = this.searchTerm.toLowerCase().trim();
    //     filtered = filtered.filter(city =>
    //       city.name.toLowerCase().includes(term) ||
    //       city.location.toLowerCase().includes(term) ||
    //       city.description.toLowerCase().includes(term)
    //     );
    //   }

    //   // Filtre prix
    //   if (this.selectedPriceRange) {
    //     filtered = filtered.filter(city => this.matchesPriceRange(city.price));
    //   }

    //   // Filtre superficie
    //   if (this.selectedSurfaceRange) {
    //     filtered = filtered.filter(city => this.matchesSurfaceRange(city.surface));
    //   }

    //   // Filtre type de chambre
    //   if (this.selectedRoomType) {
    //     filtered = filtered.filter(city => city.type === this.selectedRoomType);
    //   }

    //   // Filtres commodités
    //   if (this.filters.wifi) {
    //     filtered = filtered.filter(city => city.amenities.some(a => a.toLowerCase().includes('wifi')));
    //   }
    //   if (this.filters.parking) {
    //     filtered = filtered.filter(city => city.amenities.some(a => a.toLowerCase().includes('parking')));
    //   }
    //   if (this.filters.security) {
    //     filtered = filtered.filter(city => city.amenities.some(a => a.toLowerCase().includes('sécurité')));
    //   }

    //   this.filteredCities = filtered;
    //   this.applySorting();
    //   this.loading = false;
    // }, 200);
  }

  private matchesPriceRange(price: number): boolean {
    switch (this.selectedPriceRange) {
      case '0-50000': return price < 50000;
      case '50000-75000': return price >= 50000 && price <= 75000;
      case '75000-100000': return price >= 75000 && price <= 100000;
      case '100000-150000': return price >= 100000 && price <= 150000;
      case '150000+': return price > 150000;
      default: return true;
    }
  }

  private matchesSurfaceRange(surface: number): boolean {
    switch (this.selectedSurfaceRange) {
      case '0-15': return surface < 15;
      case '15-25': return surface >= 15 && surface <= 25;
      case '25-35': return surface >= 25 && surface <= 35;
      case '35+': return surface > 35;
      default: return true;
    }
  }

  // Tri
  private applySorting(): void {
    switch (this.sortBy) {
      case 'name':
        this.filteredCities.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        this.filteredCities.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredCities.sort((a, b) => b.price - a.price);
        break;
      case 'surface-asc':
        this.filteredCities.sort((a, b) => a.surface - b.surface);
        break;
      case 'surface-desc':
        this.filteredCities.sort((a, b) => b.surface - a.surface);
        break;
    }
  }

  // Utilitaires pour les labels
  getPriceRangeLabel(range: string): string {
    switch (range) {
      case '0-50000': return 'Moins de 50k';
      case '50000-75000': return '50k - 75k';
      case '75000-100000': return '75k - 100k';
      case '100000-150000': return '100k - 150k';
      case '150000+': return 'Plus de 150k';
      default: return '';
    }
  }

  getSurfaceRangeLabel(range: string): string {
    switch (range) {
      case '0-15': return 'Moins de 15 m²';
      case '15-25': return '15 - 25 m²';
      case '25-35': return '25 - 35 m²';
      case '35+': return 'Plus de 35 m²';
      default: return '';
    }
  }

  getRoomTypeLabel(type: string): string {
    switch (type) {
      case 'simple': return 'Chambre simple';
      case 'double': return 'Chambre double';
      case 'studio': return 'Studio';
      case 'appartement': return 'Appartement';
      default: return '';
    }
  }

  getAmenityIcon(amenity: string): string {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return '📶';
    if (lowerAmenity.includes('parking')) return '🚗';
    if (lowerAmenity.includes('sécurité')) return '🔐';
    if (lowerAmenity.includes('climatisation')) return '❄️';
    if (lowerAmenity.includes('cuisine')) return '🍳';
    if (lowerAmenity.includes('restauration')) return '🍽️';
    return '✨';
  }

  // Gestion des filtres actifs
  hasActiveFilters(): boolean {
    return !!(this.selectedPriceRange ||
             this.selectedSurfaceRange ||
             this.selectedRoomType ||
             this.filters.wifi ||
             this.filters.parking ||
             this.filters.security);
  }

  clearPriceFilter(): void {
    this.selectedPriceRange = '';
    this.applyFilters();
  }

  clearSurfaceFilter(): void {
    this.selectedSurfaceRange = '';
    this.applyFilters();
  }

  clearRoomTypeFilter(): void {
    this.selectedRoomType = '';
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.selectedPriceRange = '';
    this.selectedSurfaceRange = '';
    this.selectedRoomType = '';
    this.filters = {
      wifi: false,
      parking: false,
      security: false
    };
    this.applyFilters();
  }

  // Actions
  viewDetails(city: any): void {
    console.log('Voir détails de:', city);
    this.router.navigate(['/website/detail-city']);
    // Implémenter la navigation vers la page détail
    // this.router.navigate(['/cities', city.id]);
  }

  toggleFavorite(city: any): void {
    city.isFavorite = !city.isFavorite;
    console.log(`${city.name} ${city.isFavorite ? 'ajouté aux' : 'retiré des'} favoris`);
    // Implémenter la logique de sauvegarde des favoris
  }

  // TrackBy pour optimiser les performances de *ngFor
  trackByFn(index: number, item: any): string {
    return item.id;
  }
}
