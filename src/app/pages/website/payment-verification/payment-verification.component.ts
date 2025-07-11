import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-verification.component.html',
  styleUrl: './payment-verification.component.scss'
})
export class PaymentVerificationComponent implements OnInit, OnDestroy {
  private verificationTimer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simuler la vérification du paiement
    this.simulatePaymentVerification();
  }

  ngOnDestroy(): void {
    if (this.verificationTimer) {
      clearTimeout(this.verificationTimer);
    }
  }

  private simulatePaymentVerification(): void {
    // Simuler un délai de vérification de 3-5 secondes
    const verificationDelay = Math.random() * 2000 + 3000; // 3-5 secondes
    
    this.verificationTimer = setTimeout(() => {
      // Simuler un taux de succès de 80%
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        this.router.navigate(['/website/payment-success']);
      } else {
        this.router.navigate(['/website/payment-failed']);
      }
    }, verificationDelay);
  }
}