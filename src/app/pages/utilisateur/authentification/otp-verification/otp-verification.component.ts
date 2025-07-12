import { AuthService } from './../../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  otp: string = '';
  onInput: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    this.isLoading = true;
    let email: any = localStorage.getItem('email');
    console.log(email, this.otp);
    this.authService.passwordVerifyOtp(email, this.otp).subscribe({
      next: (res) => {
        this.isLoading = false;
        if(res.success == true){
          localStorage.setItem('otp', this.otp);
          this.router.navigate(['/new-password']);
        }
      }, error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de la vérification du code OTP", err);
      }
    })
    this.router.navigate(['/new-password']);
  }
}
