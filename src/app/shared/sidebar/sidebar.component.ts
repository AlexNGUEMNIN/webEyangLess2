import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  emitClose() {
    this.close.emit();
  }


  donnesSlidebar = [
  { title: 'Dashboard', url: '/dashboard', icon: 'fas fa-tachometer-alt' },
  { title: 'Cités', url: '/cities', icon: 'fas fa-city' },
  { title: 'Carte', url: '/carte', icon: 'fas fa-map' },
  { title: 'Utilisateurs', url: '/utilisateurs', icon: 'fas fa-users' },
  { title: 'Mon compte', url: '/mon-compte', icon: 'fas fa-user-cog' },
  { title: 'Paramètres', url: '/parametres', icon: 'fas fa-cogs' }
];


  constructor(public router: Router) {}

  isActive(url: string): boolean {
    const route = this.router.url
    if ((url === "/cities") && (route.startsWith('details-cites')) ){
      return true
    } else{
      return url === route;
    }
  }
  
}
