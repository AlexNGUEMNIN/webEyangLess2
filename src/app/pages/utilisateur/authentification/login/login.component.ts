import { AuthService } from './../../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  onInput: boolean = false;
  isEmailEmpty: boolean = false;
  isPasswordEmpty: boolean = false;
  notFound: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleOnInput(): void {
    if(this.password.length > 0){
      this.onInput = true;
    }else{
      this.onInput = false;
    }
  }

  onSubmit(): void {
    if(this.checkEmailAndPassword()){
      this.authService.login(this.email, this.password).subscribe({
        next: (res: any) => {
          console.log(res);
          this.authService.setToken(res.token);
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/website/accueil']);

        },
        error: (err) => {
          console.error("Erreur lors du login", err);
          this.notFound = true;
        }
      });
    }
    
  }

  hideErrors(){
    this.isEmailEmpty = false;
    this.isPasswordEmpty = false;
    this.notFound = false;
  }

  // Navigation en tant qu'invité
  onContinueAsGuest(): void {
    console.log('Continue as guest clicked');
    this.authService.setRoleAsGuest();
    this.router.navigate(['/website/accueil']);
    
  }

  checkEmailAndPassword(): boolean{
    if(this.email == '' && this.password == ''){
      this.isEmailEmpty = true;
      this.isPasswordEmpty = true;
      return false;
    }else if(this.email == '' && this.password != ''){
      this.isEmailEmpty = true;
      return false;
    }else if(this.email != '' && this.password == ''){
      this.isPasswordEmpty = true;
      return false;
    }
    return true;
  }
}
