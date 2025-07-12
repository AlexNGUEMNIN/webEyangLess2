import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

interface Place {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  category?: string;
  type?: string;
  rating?: number;
  verified?: boolean;
  image?: string;
  hours?: string;
  distance?: string;
  distanceFromUser?: string;
  walkTime?: string;
  bikeTime?: string;
  carTime?: string;
}

interface Suggestion extends Place {
  distance?: string;
  walkTime?: string;
}

interface RouteInstruction {
  type: string;
  text: string;
  distance: string;
}

interface Route {
  totalDistance: string;
  totalTime: string;
  instructions: RouteInstruction[];
}

interface TransportMode {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  // Map instance
  private map!: L.Map;
  private userLocationMarker?: L.Marker;
  private placeMarkers: L.Marker[] = [];
  private routeLayer?: L.Polyline;

  // Component state
  mapLoading = true;
  routeLoading = false;
  searchQuery = '';
  showSuggestions = false;
  selectedPlace: Place | null = null;
  currentRoute: Route | null = null;
  userLocation: { lat: number; lng: number } | null = null;

  // Search functionality
  suggestions: Suggestion[] = [];
  private searchSubject = new Subject<string>();

  // Transport modes
  selectedTransportMode = 'walking';
  transportModes: TransportMode[] = [
    { id: 'walking', label: 'À pied', icon: 'fas fa-walking' },
    { id: 'cycling', label: 'À vélo', icon: 'fas fa-bicycle' },
    { id: 'driving', label: 'Voiture', icon: 'fas fa-car' }
  ];

  // Sample data - En production, ces données viendraient d'une API
  private samplePlaces: Place[] = [
    {
      id: '1',
      name: 'Cité Bevina',
      address: 'Quartier Eyang, Cameroun',
      coordinates: { lat: 3.8480, lng: 11.5021 },
      category: 'Résidence étudiante',
      type: 'residence',
      rating: 4.5,
      verified: true,
      image: 'assets/images/bg cité shekina.jpg',
      hours: '24h/24',
      distanceFromUser: '0.2 km',
      walkTime: '3 min',
      bikeTime: '1 min',
      carTime: '1 min'
    },
    {
      id: '2',
      name: 'Shékina',
      address: 'A 423 m du campus universitaire',
      coordinates: { lat: 3.8490, lng: 11.5031 },
      category: 'Résidence étudiante',
      type: 'residence',
      rating: 4.2,
      verified: true,
      distanceFromUser: '0.4 km',
      walkTime: '5 min',
      bikeTime: '2 min',
      carTime: '1 min'
    },
    {
      id: '3',
      name: 'Institut Saint Jean',
      address: 'Campus principal, Eyang',
      coordinates: { lat: 3.8470, lng: 11.5011 },
      category: 'Université',
      type: 'university',
      verified: true,
      distanceFromUser: '0.1 km',
      walkTime: '1 min',
      bikeTime: '1 min',
      carTime: '1 min'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.setupSearchDebounce();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
    this.searchSubject.complete();
  }

  private initializeMap(): void {
    // Coordonnées d'Eyang (Institut Saint Jean)
    const eyangCoords: [number, number] = [3.8480, 11.5021];

    // Initialiser la carte
    this.map = L.map('map', {
      center: eyangCoords,
      zoom: 15,
      zoomControl: false
    });

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajouter les contrôles de zoom
    L.control.zoom({
      position: 'bottomleft'
    }).addTo(this.map);

    // Détecter la géolocalisation
    this.getCurrentLocation();

    // Ajouter les marqueurs des lieux
    this.addPlaceMarkers();

    this.mapLoading = false;
  }

  private getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.addUserLocationMarker();
          this.updateDistances();
        },
        (error) => {
          console.warn('Géolocalisation non disponible:', error);
          // Utiliser une position par défaut (Institut Saint Jean)
          this.userLocation = { lat: 3.8480, lng: 11.5021 };
          this.addUserLocationMarker();
          this.updateDistances();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      // Géolocalisation non supportée
      this.userLocation = { lat: 3.8480, lng: 11.5021 };
      this.addUserLocationMarker();
      this.updateDistances();
    }
  }

  private addUserLocationMarker(): void {
    if (!this.userLocation) return;

    const userIcon = L.divIcon({
      className: 'user-location-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    this.userLocationMarker = L.marker([this.userLocation.lat, this.userLocation.lng], {
      icon: userIcon
    }).addTo(this.map);

    this.userLocationMarker.bindPopup('Votre position').openPopup();
  }

  private addPlaceMarkers(): void {
    this.samplePlaces.forEach(place => {
      const icon = L.divIcon({
        className: 'place-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: icon
      }).addTo(this.map);

      marker.bindPopup(`
        <div style="text-align: center;">
          <strong>${place.name}</strong><br>
          ${place.address}<br>
          ${place.rating ? `⭐ ${place.rating}` : ''}
        </div>
      `);

      marker.on('click', () => {
        this.selectPlace(place);
      });

      this.placeMarkers.push(marker);
    });
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  private updateDistances(): void {
    if (!this.userLocation) return;

    this.samplePlaces.forEach(place => {
      const distance = this.calculateDistance(
        this.userLocation!.lat,
        this.userLocation!.lng,
        place.coordinates.lat,
        place.coordinates.lng
      );

      place.distanceFromUser = `${distance.toFixed(1)} km`;
      place.walkTime = `${Math.ceil(distance * 12)} min`; // ~5 km/h
      place.bikeTime = `${Math.ceil(distance * 4)} min`; // ~15 km/h
      place.carTime = `${Math.ceil(distance * 2)} min`; // ~30 km/h en ville
    });
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Méthodes publiques pour les interactions UI
  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private performSearch(query: string): void {
    if (query.length < 2) {
      this.suggestions = [];
      return;
    }

    // Filtrer les lieux selon la requête
    this.suggestions = this.samplePlaces
      .filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.address.toLowerCase().includes(query.toLowerCase()) ||
        place.category?.toLowerCase().includes(query.toLowerCase())
      )
      .map(place => ({
        ...place,
        distance: place.distanceFromUser,
        walkTime: place.walkTime
      }));
  }

  selectSuggestion(suggestion: Suggestion): void {
    this.searchQuery = suggestion.name;
    this.showSuggestions = false;
    this.selectPlace(suggestion);
  }

  selectPlace(place: Place): void {
    this.selectedPlace = place;
    
    // Centrer la carte sur le lieu
    this.map.setView([place.coordinates.lat, place.coordinates.lng], 17);
    
    // Mettre en évidence le marqueur
    this.highlightMarker(place);
  }

  highlightMarker(place: Place): void {
    // Réinitialiser tous les marqueurs
    this.placeMarkers.forEach(marker => {
      const element = marker.getElement();
      if (element) {
        element.classList.remove('highlighted');
      }
    });

    // Mettre en évidence le marqueur sélectionné
    const targetMarker = this.placeMarkers.find(marker => {
      const latLng = marker.getLatLng();
      return latLng.lat === place.coordinates.lat && latLng.lng === place.coordinates.lng;
    });

    if (targetMarker) {
      const element = targetMarker.getElement();
      if (element) {
        element.classList.add('highlighted');
      }
    }
  }

  closeDetailPanel(): void {
    this.selectedPlace = null;
    this.currentRoute = null;
    
    // Supprimer la route de la carte
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
      this.routeLayer = undefined;
    }

    // Réinitialiser les marqueurs
    this.placeMarkers.forEach(marker => {
      const element = marker.getElement();
      if (element) {
        element.classList.remove('highlighted');
      }
    });
  }

  calculateRoute(): void {
    if (!this.selectedPlace || !this.userLocation) return;

    this.routeLoading = true;

    // Simuler le calcul d'itinéraire (en production, utiliser une vraie API)
    setTimeout(() => {
      this.currentRoute = {
        totalDistance: '0.4 km',
        totalTime: '5 min',
        instructions: [
          {
            type: 'start',
            text: 'Partir de votre position',
            distance: '0 m'
          },
          {
            type: 'straight',
            text: 'Continuer tout droit sur Avenue Principale',
            distance: '200 m'
          },
          {
            type: 'right',
            text: 'Tourner à droite sur Rue de la Cité',
            distance: '150 m'
          },
          {
            type: 'arrive',
            text: `Arriver à ${this.selectedPlace!.name}`,
            distance: '50 m'
          }
        ]
      };

      // Dessiner la route sur la carte
      this.drawRoute();
      this.routeLoading = false;
    }, 1500);
  }

  private drawRoute(): void {
    if (!this.selectedPlace || !this.userLocation) return;

    // Supprimer l'ancienne route
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
    }

    // Créer une route simple (en production, utiliser les vraies coordonnées de l'API)
    const routeCoords: L.LatLngExpression[] = [
      [this.userLocation.lat, this.userLocation.lng],
      [this.selectedPlace.coordinates.lat, this.selectedPlace.coordinates.lng]
    ];

    this.routeLayer = L.polyline(routeCoords, {
      color: '#3B82F6',
      weight: 4,
      opacity: 0.8
    }).addTo(this.map);

    // Ajuster la vue pour inclure toute la route
    const group = new L.FeatureGroup([this.routeLayer]);
    this.map.fitBounds(group.getBounds().pad(0.1));
  }

  changeTransportMode(mode: string): void {
    this.selectedTransportMode = mode;
    if (this.currentRoute) {
      this.calculateRoute(); // Recalculer avec le nouveau mode
    }
  }

  centerOnUser(): void {
    if (this.userLocation) {
      this.map.setView([this.userLocation.lat, this.userLocation.lng], 16);
    }
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  sharePlace(): void {
    if (!this.selectedPlace) return;

    const shareUrl = `${window.location.origin}/website/map?place=${this.selectedPlace.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: this.selectedPlace.name,
        text: `Découvrez ${this.selectedPlace.name} sur Eyangless`,
        url: shareUrl
      });
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Lien copié dans le presse-papier !');
      });
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Vous pourriez ajouter une notification toast ici
      console.log('Adresse copiée !');
    });
  }

  // Méthodes utilitaires pour les templates
  getSuggestionIcon(type: string): string {
    switch (type) {
      case 'residence': return 'fas fa-building';
      case 'university': return 'fas fa-graduation-cap';
      case 'restaurant': return 'fas fa-utensils';
      case 'shop': return 'fas fa-store';
      default: return 'fas fa-map-marker-alt';
    }
  }

  getStars(rating: number): { class: string }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({
        class: i <= rating ? 'fas fa-star' : 'far fa-star'
      });
    }
    return stars;
  }

  getInstructionIcon(type: string): string {
    switch (type) {
      case 'start': return 'fas fa-play';
      case 'straight': return 'fas fa-arrow-up';
      case 'right': return 'fas fa-arrow-right';
      case 'left': return 'fas fa-arrow-left';
      case 'arrive': return 'fas fa-flag-checkered';
      default: return 'fas fa-arrow-up';
    }
  }

  // TrackBy functions pour optimiser les performances
  trackBySuggestion(index: number, item: Suggestion): string {
    return item.id;
  }

  trackByInstruction(index: number, item: RouteInstruction): string {
    return `${index}-${item.text}`;
  }
}