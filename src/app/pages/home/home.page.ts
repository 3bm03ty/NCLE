import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from 'src/app/components/home/hero/hero.component';
import { DiscoverComponent } from 'src/app/components/home/discover/discover.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    NavbarComponent,
    HeroComponent,
    RouterOutlet,
    DiscoverComponent,
    FooterComponent
  ]
})
export class HomePage {
  constructor() { }
}
