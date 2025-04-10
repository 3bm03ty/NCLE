import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SubscribeButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() buttonText: string = 'Subscribe Now';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
