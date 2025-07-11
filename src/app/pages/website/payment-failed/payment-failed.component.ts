import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-failed.component.html',
  styleUrl: './payment-failed.component.scss'
})
export class PaymentFailedComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRetry(): void {
    // Retourner à la page de paiement pour réessayer
    this.router.navigate(['/website/payment-reservation']);
  }

  onContactSupport(): void {
    // Rediriger vers le service client (WhatsApp, email, etc.)
    // Pour l'exemple, on peut ouvrir WhatsApp
    const phoneNumber = '237xxxxxxxx'; // Remplacer par le vrai numéro
    const message = encodeURIComponent('Bonjour, j\'ai un problème avec le paiement de ma réservation de chambre.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}