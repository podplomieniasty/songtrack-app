import { Component, Input } from '@angular/core';
import ITrack from '../../interfaces/track.interface';

@Component({
  selector: 'app-entry-card',
  standalone: true,
  imports: [],
  templateUrl: './entry-card.component.html',
  styleUrl: './entry-card.component.css'
})
export class EntryCardComponent {
  @Input() track!: ITrack; 
  
}
