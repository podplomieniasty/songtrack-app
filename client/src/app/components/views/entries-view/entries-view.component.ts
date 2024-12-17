import { Component, OnInit } from '@angular/core';
import ITrack from '../../../interfaces/track.interface';
import { TrackService } from '../../../services/track.service';
import { EntryCardComponent } from '../../entry-card/entry-card.component';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../searchbar/searchbar.component';

@Component({
  selector: 'app-entries-view',
  standalone: true,
  imports: [EntryCardComponent, CommonModule, SearchbarComponent],
  providers: [TrackService, EntryCardComponent],
  templateUrl: './entries-view.component.html',
  styleUrl: './entries-view.component.css'
})
export class EntriesViewComponent implements OnInit {
  fetchedEntries: ITrack[] = [];
  filteredEntries: ITrack[] = [];
  constructor(private trackService: TrackService) {
    
  };

  ngOnInit(): void {
    this.trackService.getAllTracks().subscribe((res) => {
      this.fetchedEntries = res as ITrack[];
      this.fetchedEntries.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0);
      this.filteredEntries = this.fetchedEntries;
    })
  }

  filterByPhrase(phrase: string) {
    if(phrase === '') {
      this.filteredEntries = this.fetchedEntries;
      return;
    }
    
    this.filteredEntries = this.fetchedEntries.filter((entry) => entry.name.toLowerCase().includes(phrase.toLowerCase()));
  }
}
