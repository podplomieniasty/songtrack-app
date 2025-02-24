import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { ImdbService } from '../../imdb.service';
import ITrack from '../../interfaces/track.interface';
import { TrackService } from '../../services/track.service';
import { RawgService } from '../../services/rawg.service';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [SpotifyService],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent {

  @Output() popup: EventEmitter<any> = new EventEmitter();

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

  fetchedGame: any = {};
  isGameSelected: boolean = false;

  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter();

  constructor(private spotify: SpotifyService, private imdb: ImdbService, private trackService: TrackService, private rawg: RawgService) {}
  
  searchForTrack = () => {
    if(this.formData.trackName.trim() === '') {
      this.showPopup('Wpisz nazwę utworu.', 'FAIL');
      return;
    }
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
          const href = track.external_urls.spotify;
          const fetchedTrack = {
            spotifyId: id,
            img: img,
            name: name,
            artist: artist, 
            href: href
          }
          this.fetchedTracks.push(fetchedTrack);
        })
      })
      
  }

  searchForSource = () => {
    if(this.formData.sourceName.trim() === '') {
      this.showPopup('Wpisz nazwę filmu/serialu/gry.', 'FAIL');
      return;
    }
    this.isMovieSelected = false;
    this.isGameSelected = false;
    this.fetchedMovie = {};
    this.fetchedGame = {};
    if(this.formData.sourceType === 'game') {
      this.rawg.getGameByTitle(this.formData.sourceName)
      .subscribe((res: any) => {
        this.fetchedGame = {
          rawgId: res.results[0].id,
          name: res.results[0].name,
          description: ' ',
          img: res.results[0].background_image,
          released: res.results[0].released
        }
        console.log(this.fetchedGame);
        this.isGameSelected = true;
      })
    } else {
      this.imdb.getMovieByTitle(this.formData.sourceName)
      .subscribe((res: any) => {
        if(res.Response === "False") {
          this.showPopup('Nie znaleziono szukanego filmu.', 'FAIL');
          return;
        }
        this.fetchedMovie = {
          id: res.imdbID,
          name: res.Title,
          year: res.Year,
          plot: res.Plot,
          img: res.Poster,
        }
        this.isMovieSelected = true;
      })
    }
  }

  setSelectedTrack = (track: any) => {
    this.fetchedTracks = [];
    this.isTrackSelected = true;
    this.selectedTrack = track;
  }

  emitModalClose(): void {
    this.onModalClose.emit(true);
  }

  handleFormSubmit(): void {
    const track: ITrack = {
      ...this.selectedTrack,
      addDate: new Date(),
      updateDate: new Date(),
      movies: this.formData.sourceType === 'movie' ? [this.fetchedMovie] : [],
      series: this.formData.sourceType === 'series' ? [this.fetchedMovie] : [],
      games: this.formData.sourceType === 'game' ? [this.fetchedGame] : [],
    }
    this.trackService.addNewTrack(track).subscribe((res) => {
      this.showPopup('Pomyślnie dodano utwór!', 'SUCCESS');
      this.emitModalClose();
    })
  }

  showPopup(msg: string, type: string) {
    this.popup.emit({msg: msg, type: type});
  }


}
