import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  standalone: true
})
export class SubscribeButtonComponent {
  @Input() buttonText: string = 'Subscribe Now';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
