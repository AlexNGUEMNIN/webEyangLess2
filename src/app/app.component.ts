import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailCityComponent } from "./pages/website/detail-city/detail-city.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DetailCityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eyangless';
}
