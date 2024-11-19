import { Component, OnInit } from '@angular/core';
import ITrack from '../../../interfaces/track.interface';
import { TrackService } from '../../../services/track.service';
import { EntryCardComponent } from '../../entry-card/entry-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entries-view',
  standalone: true,
  imports: [EntryCardComponent, CommonModule],
  providers: [TrackService, EntryCardComponent],
  templateUrl: './entries-view.component.html',
  styleUrl: './entries-view.component.css'
})
export class EntriesViewComponent implements OnInit {
  fetchedEntries: ITrack[] = [];

  constructor(private trackService: TrackService) {
    
  };

  ngOnInit(): void {
    console.log('trying to get');
    this.trackService.getAllTracks().subscribe((res) => {
      this.fetchedEntries = res as ITrack[];
      console.log(this.fetchedEntries);
    })
  }
}
