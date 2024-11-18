import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [SpotifyService],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent {

  public formData = {
    trackName: ''
  }

  constructor(private spotify: SpotifyService) {}
  
  searchForTrack = () => {
    if(this.formData.trackName === '') return;
    this.spotify.getFirstTrack(this.formData.trackName)
      .subscribe((res) => {
        console.log(res);
      })
  }
}
