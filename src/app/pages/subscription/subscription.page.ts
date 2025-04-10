import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { SubscriptionFormComponent } from '../../components/subscription/subscription-form/subscription-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  standalone: true,
  imports: [
    IonContent,
    SubscriptionFormComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SubscriptionPage {
  constructor() { }
}
