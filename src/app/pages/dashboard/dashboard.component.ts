import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import {   Chart, BarController ,BarElement,CategoryScale,LinearScale,Tooltip,Legend, } from 'chart.js';
import { LayoutComponent } from "../../shared/layout/layout.component";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

recentCities = [
    {
      id: 1,
      name: 'Cité Bevina',
      rooms: 23,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/bevina.jpg'
    },
    {
      id: 2,
      name: 'Cité Colonel',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/colonel.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    },
    {
      id: 3,
      name: 'Cité RPN',
      rooms: 48,
      dateAdded: '20/01/2025',
      image: '/assets/images/cites/rpn.jpg'
    }
  ];
@ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  ngAfterViewInit(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Bevina', 'RPN', 'Grâce divine', 'Cité verte', 'La paix'],
        datasets: [{
          label: 'Note moyenne',
          data: [4.5, 3.8, 3.5, 3.5, 1.8],
          backgroundColor: ['#14b8a6', '#f59e0b', '#0ea5e9', '#a855f7', '#be123c'],
          borderRadius: 6,
          barThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111827',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 }
          }
        }
      }
    });
  }

}

