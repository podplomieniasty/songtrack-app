import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../../services/track.service';
import ITrack from '../../../interfaces/track.interface';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../../services/spotify.service';

@Component({
  selector: 'app-single-entry-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-entry-view.component.html',
  styleUrl: './single-entry-view.component.css'
})
export class SingleEntryViewComponent implements OnInit {

  spotifyId!: string;
  trackData: ITrack = {
    spotifyId: '...',
    artist: '...',
    href: '...',
    img: '...',
    movies: [],
    name: '...'
  }
  apiTrackData: any = {};
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private trackService: TrackService,
    private spotifyService: SpotifyService) {
    
  }

  ngOnInit(): void {
    this.spotifyId = this.route.snapshot.paramMap.get('spotifyId')!;
    this.trackService.getSingleTrack(this.spotifyId).subscribe((res) => {
      const data = res as ITrack[];
      this.trackData = data[0];
      this.isLoaded = true;
      this.spotifyService.getTrackById(this.trackData.spotifyId).subscribe((res) => {
        this.apiTrackData = res;
        console.log(res);
      })
    });
    
  }
}
