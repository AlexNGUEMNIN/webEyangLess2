import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ReservationData {
  cityName: string;
  roomNumber: string;
  roomPrice: number;
  reservationFee: number;
}

@Component({
  selector: 'app-payment-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-reservation.component.html',
  styleUrl: './payment-reservation.component.scss'
})
export class PaymentReservationComponent implements OnInit {
  reservationData: ReservationData = {
    cityName: 'Bevina',
    roomNumber: 'A4',
    roomPrice: 45000,
    reservationFee: 10000
  };

  selectedPaymentMethod: 'orange' | 'mtn' = 'orange';
  phoneNumber: string = '';
  isPhoneValid: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Récupérer les données de réservation depuis localStorage
    const storedData = localStorage.getItem('reservationData');
    if (storedData) {
      this.reservationData = JSON.parse(storedData);
    }
  }

  onPaymentMethodChange(method: 'orange' | 'mtn'): void {
    this.selectedPaymentMethod = method;
  }

  onPhoneNumberChange(): void {
    // Validation du numéro de téléphone camerounais (6XXXXXXXX)
    const phoneRegex = /^6[0-9]{8}$/;
    this.isPhoneValid = phoneRegex.test(this.phoneNumber);
  }

  isFormValid(): boolean {
    return this.isPhoneValid && this.phoneNumber.length === 9;
  }

  onPay(): void {
    if (this.isFormValid()) {
      // Stocker les données de paiement
      const paymentData = {
        ...this.reservationData,
        paymentMethod: this.selectedPaymentMethod,
        phoneNumber: this.phoneNumber
      };
      
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      
      // Rediriger vers la page de vérification
      this.router.navigate(['/website/payment-verification']);
    }
  }

  onClose(): void {
    this.router.navigate(['/website/detail-city']);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-FR');
  }
}