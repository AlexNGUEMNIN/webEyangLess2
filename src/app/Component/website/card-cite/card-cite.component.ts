import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-cite',
  standalone: true,
  imports: [],
  templateUrl: './card-cite.component.html',
  styleUrl: './card-cite.component.scss'
})
export class CardCiteComponent {
  @Input() city : any;


  calculNote(){
    let note_finale = 0;
    if(this.city.notes.length == 0)
      return 0
    else{
      for(let i =0; i< this.city.notes.length; i++){
        note_finale += this.city.notes[i];
      }
      note_finale = note_finale / this.city.notes.length;
      return note_finale;
    }
  }
}
