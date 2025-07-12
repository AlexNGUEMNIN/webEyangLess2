import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Input() data: any;

  constructor(){

  }

  removeContact(email: string){
    this.remove.emit(email);
  }
}
