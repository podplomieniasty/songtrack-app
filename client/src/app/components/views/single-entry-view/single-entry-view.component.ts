import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    series: [],
    games: [],
    name: '...',
    updateDate: new Date(),
    addDate: new Date()
  }
  apiTrackData: any = {};
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private trackService: TrackService,
    private spotifyService: SpotifyService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.spotifyId = this.route.snapshot.paramMap.get('spotifyId')!;
    this.trackService.getSingleTrack(this.spotifyId).subscribe((res: any) => {
      if(res.length === 0) {
        this.router.navigate(['/notfound']);
      }
      const data = res as ITrack[];
      this.trackData = data[0];
      this.isLoaded = true;
      this.spotifyService.getTrackById(this.trackData.spotifyId).subscribe((res) => {
        this.apiTrackData = res;
      })
    });
    
  }
}
