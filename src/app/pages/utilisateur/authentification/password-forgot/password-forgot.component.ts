import { AuthService } from './../../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-forgot',
  standalone: true,
  imports: [ RouterLink, FormsModule ],
  templateUrl: './password-forgot.component.html',
  styleUrl: './password-forgot.component.scss'
})
export class PasswordForgotComponent {
  email: string = '';
  isLoading: boolean = false;

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(): void {
    this.isLoading = true;
    // console.log('Login attempt:', { email: this.email, password: this.password });
    this.authService.passwordForgot(this.email).subscribe({
      next: (res) => {
        this.isLoading = false;
        if(res.success == true){
          localStorage.setItem('email', this.email);
          this.router.navigate(['/otp']);
        }
      }, error: (err) => {
        this.isLoading = false;
        console.error('Erreur lors de l\'envoi du mail', err);
      }
    })
  }
}
