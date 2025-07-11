import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-cite.component.html',
  styleUrl: './card-cite.component.scss'
})
export class CardCiteComponent {
  @Input() city: any;

  constructor(private router: Router) {}

  onCardClick(): void {
    this.router.navigate(['/website/detail-city']);
  }
}