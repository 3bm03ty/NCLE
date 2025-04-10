import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribeButtonComponent } from '../../subscription/subscribe-button/subscribe-button.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  standalone: true,
  imports: [SubscribeButtonComponent]
})
export class DiscoverComponent {
  constructor(private router: Router) { }

  navigateToSubscription() {
    this.router.navigate(['/subscription']);
  }
}
