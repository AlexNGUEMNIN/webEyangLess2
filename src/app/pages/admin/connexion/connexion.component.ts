import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  email: string = "";
  password: string = "";
  errorTitle: string = "";
  errorMessage: string = "";
  displayErrorMessage: boolean = false;

  constructor(private authService: AuthService,
    private router: Router
  ){

  }

  login(){
    console.log(this.email, this.password);
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        // if(response.status === "UNAUTHORIZED"){
        //   throw new Error('UNAUTHORIZED');
        // }
        if(response.role[0].libelle === "Moderateur"){
          this.clearData();
          this.router.navigate(['/dashboard']);
        }else{
          this.errorTitle = "Accès refusé";
          this.errorMessage = "Votre compte n'est pas autorisé à se connecter";
          this.openPopup();
        }
      },
      error: (err) => {
        console.error("La connexion a échoué", err);
        this.errorTitle = "Authentification échouée";
        this.errorMessage = "Vérifiez bien vos informations";
        this.openPopup();
      }
    })
  }

  openPopup(){
    this.displayErrorMessage = true;
  }

  closePopup(){
    this.displayErrorMessage = false;
  }

  clearData(){
    this.email = "";
    this.password = "";
  }
}
