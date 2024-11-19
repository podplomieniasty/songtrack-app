import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { ImdbService } from '../../imdb.service';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [SpotifyService],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent {

  public formData = {
    trackName: '',
    sourceType: 'movie',
    sourceName: '',
  }

  fetchedTracks: any = [];
  selectedTrack: any = {};
  isTrackSelected: boolean = false;

  fetchedMovie: any = {};
  isMovieSelected: boolean = false;

  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter();

  constructor(private spotify: SpotifyService, private imdb: ImdbService) {}
  
  searchForTrack = () => {
    if(this.formData.trackName === '') return;
    this.fetchedTracks = [];
    this.selectedTrack = {};
    this.isTrackSelected = false;
    this.fetchedMovie = {};
    this.isMovieSelected = false;
    this.spotify.getFirstTrack(this.formData.trackName)
      .subscribe((res: any) => {
        if(res.tracks.items.length === 0) return;
        res.tracks.items.forEach((track: any) => {
          const { id, name } = track;
          const img = track.album.images[0].url;
          const artist = track.album.artists[0].name;
          const fetchedTrack = {
            id: id,
            img: img,
            trackName: name,
            artist: artist
          }
          this.fetchedTracks.push(fetchedTrack);
        })
      })
      console.log(this.fetchedTracks);
  }

  searchForSource = () => {
    if(this.formData.sourceName === '') return;
    this.isMovieSelected = false;
    this.fetchedMovie = {};
    this.imdb.getMovieByTitle(this.formData.sourceName)
      .subscribe((res: any) => {
        this.fetchedMovie = {
          id: res.imdbID,
          title: res.Title,
          year: res.Year,
          plot: res.Plot,
          img: res.Poster
        }
        this.isMovieSelected = true;
      })
  }

  setSelectedTrack = (track: any) => {
    this.fetchedTracks = [];
    this.isTrackSelected = true;
    this.selectedTrack = track;
  }

  emitModalClose(): void {
    this.onModalClose.emit(true);
  }
}
