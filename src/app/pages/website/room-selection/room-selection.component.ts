import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface Room {
  id: string;
  number: string;
  status: 'libre' | 'prise' | 'reservee' | 'selected';
  floor: string;
}

@Component({
  selector: 'app-room-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-selection.component.html',
  styleUrl: './room-selection.component.scss'
})
export class RoomSelectionComponent implements OnInit {
  currentFloor = 'RDC';
  floors = ['RDC', 'R1', 'R2', 'R3'];
  selectedRoom: Room | null = null;

  rooms: Room[] = [
    // RDC
    { id: 'A1', number: 'A1', status: 'libre', floor: 'RDC' },
    { id: 'A2', number: 'A2', status: 'reservee', floor: 'RDC' },
    { id: 'A3', number: 'A3', status: 'prise', floor: 'RDC' },
    { id: 'A4', number: 'A4', status: 'libre', floor: 'RDC' },
    { id: 'A5', number: 'A5', status: 'prise', floor: 'RDC' },
    { id: 'A6', number: 'A6', status: 'prise', floor: 'RDC' },
    { id: 'A7', number: 'A7', status: 'reservee', floor: 'RDC' },
    { id: 'A8', number: 'A8', status: 'prise', floor: 'RDC' },
    { id: 'A9', number: 'A9', status: 'libre', floor: 'RDC' },
    { id: 'A10', number: 'A10', status: 'reservee', floor: 'RDC' },
    { id: 'A11', number: 'A11', status: 'reservee', floor: 'RDC' },
    { id: 'A12', number: 'A12', status: 'libre', floor: 'RDC' },
    // R1
    { id: 'B1', number: 'B1', status: 'libre', floor: 'R1' },
    { id: 'B2', number: 'B2', status: 'libre', floor: 'R1' },
    { id: 'B3', number: 'B3', status: 'prise', floor: 'R1' },
    { id: 'B4', number: 'B4', status: 'libre', floor: 'R1' },
    { id: 'B5', number: 'B5', status: 'reservee', floor: 'R1' },
    { id: 'B6', number: 'B6', status: 'prise', floor: 'R1' },
    { id: 'B7', number: 'B7', status: 'libre', floor: 'R1' },
    { id: 'B8', number: 'B8', status: 'libre', floor: 'R1' },
    { id: 'B9', number: 'B9', status: 'prise', floor: 'R1' },
    { id: 'B10', number: 'B10', status: 'libre', floor: 'R1' },
    { id: 'B11', number: 'B11', status: 'libre', floor: 'R1' },
    { id: 'B12', number: 'B12', status: 'reservee', floor: 'R1' },
  ];

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  get currentFloorRooms(): Room[] {
    return this.rooms.filter(room => room.floor === this.currentFloor);
  }

  get currentFloorIndex(): number {
    return this.floors.indexOf(this.currentFloor);
  }

  canGoToPreviousFloor(): boolean {
    return this.currentFloorIndex > 0;
  }

  canGoToNextFloor(): boolean {
    return this.currentFloorIndex < this.floors.length - 1;
  }

  goToPreviousFloor(): void {
    if (this.canGoToPreviousFloor()) {
      this.currentFloor = this.floors[this.currentFloorIndex - 1];
    }
  }

  goToNextFloor(): void {
    if (this.canGoToNextFloor()) {
      this.currentFloor = this.floors[this.currentFloorIndex + 1];
    }
  }

  selectRoom(room: Room): void {
    if (room.status === 'prise' || room.status === 'reservee') {
      return; // Ne pas permettre la sélection des chambres prises ou réservées
    }

    // Réinitialiser l'ancienne sélection
    if (this.selectedRoom) {
      this.selectedRoom.status = 'libre';
    }

    // Sélectionner la nouvelle chambre
    room.status = 'selected';
    this.selectedRoom = room;
  }

  getRoomStatusClass(room: Room): string {
    switch (room.status) {
      case 'libre':
        return 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer';
      case 'prise':
        return 'bg-pink-500 text-white cursor-not-allowed';
      case 'reservee':
        return 'bg-yellow-400 text-black cursor-not-allowed';
      case 'selected':
        return 'bg-teal-500 text-white cursor-pointer';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  getRoomIcon(room: Room): string {
    return room.status === 'selected' || room.status === 'prise' ? 'text-white' : 'text-gray-400';
  }

  isValidationDisabled(): boolean {
    return !this.selectedRoom;
  }

  validateChoice(): void {
    if (this.selectedRoom) {
      // Stocker les données de réservation dans le service ou localStorage
      const reservationData = {
        cityName: 'Bevina',
        roomNumber: this.selectedRoom.number,
        roomPrice: 45000,
        reservationFee: 10000
      };
      
      localStorage.setItem('reservationData', JSON.stringify(reservationData));
      this.router.navigate(['/website/payment-reservation']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}