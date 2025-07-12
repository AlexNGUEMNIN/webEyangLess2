import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../shared/header/header.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from "../../../shared/layout/layout.component";


@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [RouterLink, CommonModule, NgClass, FormsModule, LayoutComponent],
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.scss'
})
export class CitiesListComponent {
  viewMode: 'grid' | 'table' = 'table';
  searchTerm: string = "";
  sidebarOpen = false;

  cites = [
    {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },   {
      nom: 'Cité Shekina',
      nombreChambres: 25,
      prixMensuel: 90000,
      prixAnnuel: 1080000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    },
    {
      nom: 'Cité Bevina',
      nombreChambres: 28,
      prixMensuel: 45000,
      prixAnnuel: 540000,
      dateAjout: new Date('2025-02-21'),
      maj: new Date('2025-06-02'),
      image: 'assets/images/bg cité shekina.jpg'
    }
  ];
}
