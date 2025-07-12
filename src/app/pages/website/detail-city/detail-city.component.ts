import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CiteService } from '../../../services/cite/cite.service';

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
  city: any;
  currentImageIndex = 0;
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
  isLoading: boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private citeService: CiteService
  ) { }

  ngOnInit(): void {
    this.getOneCity();
  }


  // Récupérer les informations d'une cité
  getOneCity(){
    let id: any = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.isLoading = true;
    this.citeService.getOneCity(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if(res.success == true ){
          this.city = res.data;
          console.log(this.city);
        }else{
          console.error("Cité introuvable");
        }
      }, error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de la récupération de la cité", err);
      }
    })
  }

  onPhotoClick(photo: Photo): void {
    console.log('Photo clicked:', photo);
    // Implement photo modal or navigation logic here
  }

  onShowAllPhotos(): void {
    console.log('Show all photos clicked');
    // Implement show all photos logic here
  }

  onReserve(): void {
    this.router.navigate(['/website/room-selection']);
  }

  parseCamelCaseToLabel(text: string): string {
    if (!text) return '';

    return text
      .replace(/([A-Z])/g, ' $1')     // Ajoute un espace avant chaque majuscule
      .replace(/^./, char => char.toUpperCase()) // Met la première lettre en majuscule
      .trim();
  }
}
