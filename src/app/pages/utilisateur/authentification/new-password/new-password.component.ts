import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  onInput: boolean = false;
  onInputConfirm: boolean = false;
  isLoading: boolean = false;
  passwordModified: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  toggleOnInput(): void {
    if(this.password.length > 0){
      this.onInput = true;
    }else{
      this.onInput = false;
    }
  }
  toggleOnInputConfirm(): void {
    if(this.confirmPassword.length > 0){
      this.onInputConfirm = true;
    }else{
      this.onInputConfirm = false;
    }
  }

  onSubmit(): void {
    // console.log('Login attempt:', { email: this.email, password: this.password });
    this.isLoading = true;
    if(this.checkPassword()){
      let email: any = localStorage.getItem('email');
      let otp: any = localStorage.getItem('otp');
      console.log(email, otp, this.password, this.password);
      this.authService.passwordReset(email, otp, this.password, this.password).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if(res.success == true){
            this.passwordModified = true;
            setTimeout( () => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        }, error: (err) => {
          this.isLoading = false;
          console.error("Erreur lors du changement de mot de passe", err);
        }
      })
    }
  }

  checkPassword(): boolean{
    if(this.password !== this.confirmPassword)
      return false;
    return true;
  }
}
