import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() onNewItem: EventEmitter<boolean> = new EventEmitter();

  toggleModalOpening = (): void => {
    this.onNewItem.emit(true);
  }
}
