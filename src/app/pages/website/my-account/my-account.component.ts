import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  fullName: string;
  status: string;
  phone: string;
  email: string;
  profilePhoto?: string;
}

interface Reservation {
  id: string;
  locationName: string;
  amount: number;
  duration: number;
  room: string;
  date: Date;
  status: 'En attente du paiement' | 'Confirmé' | 'Annulé';
}

interface Bail {
  id: string;
  locationName: string;
  amount: number;
  duration: number;
  room: string;
  startDate: Date;
  endDate: Date;
  deposit: number;
  daysRemaining?: number;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // État du composant
  editMode = false;
  saving = false;
  showPasswordModal = false;
  changingPassword = false;

  // Données utilisateur
  user: User = {
    id: '1',
    fullName: 'Roy WOUAMBA',
    status: 'Locataire',
    phone: '+237 673 589 900',
    email: 'wouambar@gmail.com'
  };

  editableUser: User = { ...this.user };

  // Formulaire mot de passe
  passwordForm: PasswordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Données de réservations
  reservations: Reservation[] = [
    {
      id: '1',
      locationName: 'Cité Bévina',
      amount: 540000,
      duration: 12,
      room: 'A4',
      date: new Date('2025-07-12'),
      status: 'En attente du paiement'
    }
  ];

  // Données de bails
  activeBails: Bail[] = [
    {
      id: '1',
      locationName: 'Cité Bévina',
      amount: 540000,
      duration: 12,
      room: 'A4',
      startDate: new Date('2025-07-12'),
      endDate: new Date('2026-07-31'),
      deposit: 2,
      daysRemaining: 185
    }
  ];

  // Notifications toast
  toasts: Toast[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadReservations();
    this.loadActiveBails();
  }

  private loadUserData(): void {
    // En production, charger depuis une API
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData['utilisateur connectee:']) {
          const userInfo = parsedData['utilisateur connectee:'].principal;
          this.user = {
            id: userInfo.id,
            fullName: `${userInfo.nom} ${userInfo.prenom || ''}`.trim(),
            status: userInfo.roles[0]?.libelle || 'Locataire',
            phone: userInfo.telephone || '',
            email: userInfo.email || '',
            profilePhoto: userInfo.profilePhoto
          };
          this.editableUser = { ...this.user };
        }
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
      }
    }
  }

  private loadReservations(): void {
    // En production, charger depuis une API
    // this.reservationService.getUserReservations(this.user.id).subscribe(...)
  }

  private loadActiveBails(): void {
    // En production, charger depuis une API
    // this.bailService.getUserActiveBails(this.user.id).subscribe(...)
  }

  // Gestion de la photo de profil
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onProfilePhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Validation du fichier
      if (!this.isValidImageFile(file)) {
        this.showToast('error', 'Format de fichier non supporté. Utilisez JPG, PNG ou WEBP.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        this.showToast('error', 'Le fichier est trop volumineux. Maximum 5MB.');
        return;
      }

      // Prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        this.user.profilePhoto = e.target?.result as string;
        this.editableUser.profilePhoto = this.user.profilePhoto;
        this.uploadProfilePhoto(file);
      };
      reader.readAsDataURL(file);
    }
  }

  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return validTypes.includes(file.type);
  }

  private uploadProfilePhoto(file: File): void {
    // En production, uploader vers le serveur
    // this.userService.uploadProfilePhoto(file).subscribe(...)
    this.showToast('success', 'Photo de profil mise à jour avec succès !');
  }

  // Gestion du mode édition
  enableEditMode(): void {
    this.editMode = true;
    this.editableUser = { ...this.user };
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editableUser = { ...this.user };
  }

  saveChanges(): void {
    if (!this.isFormValid()) return;

    this.saving = true;

    // Simuler la sauvegarde
    setTimeout(() => {
      this.user = { ...this.editableUser };
      this.editMode = false;
      this.saving = false;
      this.showToast('success', 'Informations mises à jour avec succès !');
      
      // En production, sauvegarder via API
      // this.userService.updateUser(this.editableUser).subscribe(...)
    }, 1500);
  }

  isFormValid(): boolean {
    return !!(
      this.editableUser.phone?.trim() &&
      this.editableUser.email?.trim() &&
      this.isValidEmail(this.editableUser.email) &&
      this.isValidPhone(this.editableUser.phone)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Gestion du changement de mot de passe
  openPasswordModal(): void {
    this.showPasswordModal = true;
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  changePassword(): void {
    if (!this.isPasswordFormValid()) return;

    this.changingPassword = true;

    // Simuler le changement de mot de passe
    setTimeout(() => {
      this.changingPassword = false;
      this.closePasswordModal();
      this.showToast('success', 'Mot de passe modifié avec succès !');
      
      // En production, changer via API
      // this.authService.changePassword(this.passwordForm).subscribe(...)
    }, 2000);
  }

  isPasswordFormValid(): boolean {
    return !!(
      this.passwordForm.currentPassword &&
      this.passwordForm.newPassword &&
      this.passwordForm.confirmPassword &&
      this.passwordForm.newPassword === this.passwordForm.confirmPassword &&
      this.isPasswordStrong()
    );
  }

  // Validation de la force du mot de passe
  isPasswordStrong(): boolean {
    return this.hasMinLength() && 
           this.hasUppercase() && 
           this.hasLowercase() && 
           this.hasNumber();
  }

  hasMinLength(): boolean {
    return this.passwordForm.newPassword.length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.passwordForm.newPassword);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.passwordForm.newPassword);
  }

  hasNumber(): boolean {
    return /\d/.test(this.passwordForm.newPassword);
  }

  getPasswordStrengthClass(): string {
    const score = this.getPasswordStrengthScore();
    if (score < 2) return 'weak';
    if (score < 3) return 'fair';
    if (score < 4) return 'good';
    return 'strong';
  }

  getPasswordStrengthPercentage(): number {
    const score = this.getPasswordStrengthScore();
    return (score / 4) * 100;
  }

  getPasswordStrengthText(): string {
    const score = this.getPasswordStrengthScore();
    if (score < 2) return 'Faible';
    if (score < 3) return 'Moyen';
    if (score < 4) return 'Bon';
    return 'Fort';
  }

  private getPasswordStrengthScore(): number {
    let score = 0;
    if (this.hasMinLength()) score++;
    if (this.hasUppercase()) score++;
    if (this.hasLowercase()) score++;
    if (this.hasNumber()) score++;
    return score;
  }

  // Gestion des détails
  viewReservationDetails(reservation: Reservation): void {
    // En production, naviguer vers la page de détails
    console.log('Voir détails réservation:', reservation);
  }

  viewBailDetails(bail: Bail): void {
    // En production, naviguer vers la page de détails
    console.log('Voir détails bail:', bail);
  }

  // Méthodes utilitaires
  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'En attente du paiement': return 'status-pending';
      case 'Confirmé': return 'status-confirmed';
      case 'Annulé': return 'status-cancelled';
      default: return 'status-pending';
    }
  }

  formatPrice(amount: number): string {
    return amount.toLocaleString('fr-FR');
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  getProgressPercentage(bail: Bail): number {
    if (!bail.daysRemaining) return 0;
    
    const totalDays = Math.ceil(
      (bail.endDate.getTime() - bail.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const elapsed = totalDays - bail.daysRemaining;
    return (elapsed / totalDays) * 100;
  }

  // Gestion des notifications toast
  showToast(type: 'success' | 'error' | 'info', message: string): void {
    const toast: Toast = {
      id: Date.now().toString(),
      type,
      message
    };

    this.toasts.push(toast);

    // Auto-suppression après 5 secondes
    setTimeout(() => {
      this.removeToast(toast);
    }, 5000);
  }

  removeToast(toast: Toast): void {
    const index = this.toasts.findIndex(t => t.id === toast.id);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }

  getToastClass(type: string): string {
    return `toast-${type}`;
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-info-circle';
    }
  }

  // TrackBy functions pour optimiser les performances
  trackByReservation(index: number, item: Reservation): string {
    return item.id;
  }

  trackByBail(index: number, item: Bail): string {
    return item.id;
  }

  trackByToast(index: number, item: Toast): string {
    return item.id;
  }
}