import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CiteService } from '../../../services/cite/cite.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  user: null | any = null;
  role: null | any = null;
  showUserMenu = false;

  isMobileMenuOpen = false;

  hasCite: boolean = false;
  isPopupBailleurVisible: boolean = true;

  constructor(private router: Router,
    private citeService: CiteService
  ){

  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      try {
        this.user = JSON.parse(userData);
        this.user = this.user['utilisateur connectee:'].principal;
        console.log(this.user);
        this.role = this.user.roles[0].libelle;
        this.checkIfBailleurHasCity();
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Gestion d'erreur (optionnel)
        localStorage.removeItem('user'); // Nettoyage si données corrompues
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Méthode pour basculer l'affichage du menu
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    // Implémentez votre logique de déconnexion ici
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Vérifie si une bailleur a au moins une cité
  checkIfBailleurHasCity(){
    this.citeService.checkIfBailleurHasCity(this.user.id).subscribe({
      next: (res) => {
        if(res.success == true){
          console.log(res.data);
          if(res.data.length === 0){
            this.hasCite = false;
          }else
            this.hasCite = true;
        }else{
          console.log("Erreur: Il ne s'agit pas d'un bailleur");
        }
        
      },
      error: (err) => {
        console.error("Erreur dans la vérification des cités du bailleur", err);
      }
    })
  }

  closePopup() {
    this.isPopupBailleurVisible = false;
  }

  goToCreateCity(){
    this.closePopup();
    this.router.navigate(['/website/create']);
  }
}
