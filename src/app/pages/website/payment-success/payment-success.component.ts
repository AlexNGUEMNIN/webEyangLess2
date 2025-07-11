import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Nettoyer les données de paiement après succès
    localStorage.removeItem('paymentData');
  }

  onOk(): void {
    // Retourner à la page detail-city
    this.router.navigate(['/website/detail-city']);
  }
}