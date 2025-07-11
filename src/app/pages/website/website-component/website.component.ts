import { Component } from '@angular/core';
import { FooterComponent } from "../../../Component/website/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../Component/website/header/header.component';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss'
})
export class WebsiteComponent {

}
