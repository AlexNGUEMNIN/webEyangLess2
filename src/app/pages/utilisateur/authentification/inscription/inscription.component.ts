import { AuthService } from './../../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  onInput: boolean = false;
  onInputConfirm: boolean = false;

  currentStep: number = 1;
  totalSteps: number = 3;
  isLoadingStep2: boolean = false;
  isLoadingStep3: boolean = false;
  isAccountVerified: boolean = false;
  isError: boolean = false;
  badCode: boolean = false;
  isEmailExists: boolean = false;

  formData: any = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    userType: null,
    codeOTP: ''
  };

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  toggleOnInput(): void {
    if(this.formData.motDePasse.length > 0){
      this.onInput = true;
    }else{
      this.onInput = false;
    }
  }
  toggleOnInputConfirm(): void {
    if(this.formData.confirmerMotDePasse.length > 0){
      this.onInputConfirm = true;
    }else{
      this.onInputConfirm = false;
    }
  }

  onSubmit(): void {
    // console.log('Login attempt:', { email: this.email, password: this.password });
    // Logique de connexion ici
    this.router.navigate(['/select-type']);
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // Logique mot de passe oublié
  }

  onCreateAccount(): void {
    console.log('Create account clicked');
    // Navigation vers la page d'inscription
  }

  onContinueAsGuest(): void {
    console.log('Continue as guest clicked');
    // Navigation en tant qu'invité
  }

  // Validation des étapes
  isStep1Valid(): boolean {
    return this.formData.nom.trim() !== '' &&
           this.formData.prenom.trim() !== '' &&
           this.formData.telephone.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.motDePasse.trim() !== '' &&
           this.formData.confirmerMotDePasse.trim() !== '' &&
           this.formData.motDePasse === this.formData.confirmerMotDePasse;
  }

  isStep2Valid(): boolean {
    return this.formData.userType !== null;
  }

  isStep3Valid(): boolean {
    return this.formData.codeOTP.length > 5;
  }

  // Navigation des étapes
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      if (this.currentStep === 1 && this.isStep1Valid()) {
        this.currentStep++;
      } else if (this.currentStep === 2 && this.isStep2Valid()) {
        console.log(this.formData);
        const user = {
          email: this.formData.email,
          nom: this.formData.nom,
          prenom: this.formData.prenom,
          telephone: this.formData.telephone,
          password: this.formData.motDePasse
        }

        this.isLoadingStep2 = true;

        if(this.formData.userType === 'locataire'){
          this.authService.addLocataire(user).subscribe({
            next: (response: any) => {
              console.log(response);
              this.isLoadingStep2 = false;
              this.currentStep++;
            },
            error: (err) => {
              console.error("Erreur lors de la création du locataire", err);
              this.isLoadingStep2 = false;
            }
          });
        }
        else if(this.formData.userType === 'bailleur'){
          this.authService.addBailleur(user).subscribe({
            next: (response: any) => {
              console.log(response);
              this.isLoadingStep2 = false;
              this.currentStep++;
            },
            error: (err) => {
              console.error("Erreur lors de la création du locataire", err);
              this.isLoadingStep2 = false;
            }
          });
        }
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Sélection du type d'utilisateur
  selectUserType(type: 'locataire' | 'bailleur'): void {
    this.formData.userType = type;
  }

  // Vérification et inscription finale
  verifyAndRegister(): void {
    if (this.isStep3Valid()) {
      this.isLoadingStep3 = true;
      this.authService.verifyOTP(this.formData.email, this.formData.codeOTP).subscribe({
        next: () => {
          this.authService.login(this.formData.email, this.formData.motDePasse).subscribe({
            next: (res) => {
              this.isLoadingStep3 = false;
              console.log('Vérification OTP réussie');
              this.isAccountVerified = true;
              localStorage.setItem('user', JSON.stringify(res)); // On stocke les informations de l'utilisateur connecté
              setTimeout(() => {
                this.router.navigate(['website/accueil']);
              }, 2000);
            }, error: (err) => {
              console.error('Erreur lors de la connexion après l\'inscription');
            }
          })

        }, error: (err) => {
          this.isLoadingStep3 = false;
          this.badCode = true;
          console.error('Erreur lors de la vérification par OTP', err);
        }
      })
    }
  }

  checkIfEmailExists(){
    this.authService.checkIfEmailExists(this.formData.email).subscribe({
      next: (res) => {
        if(res.data !== null){
          this.isEmailExists = true;
        }else
          this.isEmailExists = false;
        // console.log(res);
      }, error : (err) => {
        console.error("Compte existant", err);
      }
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Continuer en tant qu'invité
  continueAsGuest(): void {
    // console.log('Continuer en tant qu\'invité');
    this.router.navigate(['/website/accueil']);
    this.authService.setRoleAsGuest();
    // Ici vous implémenteriez la logique pour continuer sans compte
  }
}
