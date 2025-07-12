import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { HeaderComponent } from "../../../shared/header/header.component";
import { LayoutComponent } from "../../../shared/layout/layout.component";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-cities',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, LayoutComponent, NgClass, CommonModule],
  templateUrl: './details-cities.component.html',
  styleUrl: './details-cities.component.scss'
})
export class DetailsCitiesComponent {
  option: 'caracteristique' | 'contact' |'galerie' | 'chambre' | 'suplement' | 'commentaire' = 'caracteristique';
selectedImage: string | null = null;
selectedVideoUrl: string | null = null;
selectedImageIndex: number | null = null;
selectedVideoIndex: number | null = null;

@ViewChild('imageModalContent') imageModalRef!: ElementRef;
@ViewChild('videoModalContent') videoModalRef!: ElementRef;

  niveaux = [
  {
    numero: 1,
    chambres: [
      { nom: 'Chambre A1', prix: 90000, status: 'libre' },
      { nom: 'Chambre A2', prix: 70000, status: 'reservee', attenteValidation: true },
      { nom: 'Chambre A2', prix: 70000, status: 'reservee', attenteValidation: true },
      { nom: 'Chambre A2', prix: 70000, status: 'reservee', attenteValidation: true },
      { nom: 'Chambre A2', prix: 70000, status: 'reservee', attenteValidation: true },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A1', prix: 90000, status: 'libre' },
      { nom: 'Chambre A1', prix: 90000, status: 'libre' },
      { nom: 'Chambre A1', prix: 90000, status: 'libre' },
      { nom: 'Chambre A1', prix: 90000, status: 'libre' },
      { nom: 'Chambre A1', prix: 90000, status: 'libre' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
      { nom: 'Chambre A3', prix: 90000, status: 'prise' },
    ]
  },
  {
    numero: 2,
    chambres: [
      { nom: 'Chambre B1', prix: 90000, status: 'libre' },
      { nom: 'Chambre B2', prix: 100000, status: 'reservee' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'prise' },
      { nom: 'Chambre B3', prix: 90000, status: 'reservee' },
      { nom: 'Chambre B3', prix: 90000, status: 'reservee' },
      { nom: 'Chambre B3', prix: 90000, status: 'reservee' },
      { nom: 'Chambre B3', prix: 90000, status: 'reservee' },
      { nom: 'Chambre B3', prix: 90000, status: 'reservee' },
    ]
  }

];
commentaires = [
  {
    nom: 'Anaïs FREDA',
    note: 5,
    texte: "Je recommande fortement ce laboratoire, j’y ai fait mes examens et les résultats ont été très rapides et précis.",
    photo: 'assets/images/bg cité shekina.jpg',
    date: new Date('2025-03-02')
  },
  {
    nom: 'Anaïs FREDA',
    note: 4,
    texte: "Très belle cité dans l’ensemble, mais trop chère pour rien et assez éloignée du campus universitaire.",
    photo: 'assets/images/bg cité shekina.jpg',
    date: new Date('2025-03-02')
  },
  {
    nom: 'Anaïs FREDA',
    note: 2,
    texte: "Il faut faire gaffe à la bailleresse, elle est souvent tendue…",
    photo: 'assets/images/bg cité shekina.jpg',
    date: new Date('2025-03-02')
  }
];

medias = [
  { type: 'image', url: 'assets/images/bg cité shekina.jpg' },
  { type: 'video' , url: 'assets/0223.mp4'},
  { type: 'video' , url: 'assets/0223.mp4'},
  { type: 'video' , url: 'assets/0223.mp4'  },
  { type: 'image' , url: 'assets/images/logo EyangLess.png' },
  { type: 'image' , url: 'assets/images/bg cité shekina.jpg' }
];

supplements = [
  { nom: 'Restaurant', icon: 'fas fa-utensils', statut: 'Opérationnel' },
  { nom: 'Piscine', icon: 'fas fa-swimmer', statut: 'Opérationnel' },
  { nom: 'Salle de jeux', icon: 'fas fa-gamepad', statut: 'Opérationnel' },
  { nom: 'Salle des fêtes', icon: 'fas fa-glass-cheers', statut: 'En cours' },
  { nom: 'Boutique', icon: 'fas fa-store', statut: 'En cours' }
];


get imageMedias() {
  return this.medias.filter(m => m.type === 'image');
}

get videoMedias() {
  return this.medias.filter(m => m.type === 'video');
}

openImage(url: string) {
  this.selectedImageIndex = this.imageMedias.findIndex(m => m.url === url);
  this.selectedVideoIndex = null;
}

openVideo(url: string) {
  this.selectedVideoIndex = this.videoMedias.findIndex(m => m.url === url);
  this.selectedImageIndex = null;
}

closeModals() {
  this.selectedImageIndex = null;
  this.selectedVideoIndex = null;
}

nextImage() {
  if (this.selectedImageIndex !== null && this.selectedImageIndex < this.imageMedias.length - 1) {
    this.selectedImageIndex++;
  }
}

prevImage() {
  if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
    this.selectedImageIndex--;
  }
}

nextVideo() {
  if (this.selectedVideoIndex !== null && this.selectedVideoIndex < this.videoMedias.length - 1) {
    this.selectedVideoIndex++;
  }
}

prevVideo() {
  if (this.selectedVideoIndex !== null && this.selectedVideoIndex > 0) {
    this.selectedVideoIndex--;
  }
}

onBackdropClick(event: MouseEvent, type: 'image' | 'video') {
  const contentElement =
    type === 'image' ? this.imageModalRef?.nativeElement : this.videoModalRef?.nativeElement;

  if (!contentElement || !contentElement.contains(event.target)) {
    this.closeModals();
  }
  }


}
