import { Component, Input } from '@angular/core';
import ITrack from '../../interfaces/track.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entry-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './entry-card.component.html',
  styleUrl: './entry-card.component.css'
})
export class EntryCardComponent {
  @Input() track!: ITrack; 
  
}
