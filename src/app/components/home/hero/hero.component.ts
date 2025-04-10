import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribeButtonComponent } from '../../subscription/subscribe-button/subscribe-button.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [SubscribeButtonComponent]
})
export class HeroComponent {
  constructor(private router: Router) {}

  navigateToSubscription() {
    this.router.navigate(['/subscription']);
  }
}
