import { Component } from '@angular/core';
import { ImdbService } from './imdb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { RouterModule, RouterOutlet } from '@angular/router';

interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HeaderComponent, EntryFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = ''; 
  movie: Movie | null = null;

  isModalVisible: boolean = false;

  constructor(private imdbService: ImdbService) {}

  searchMovie() {
    console.log('Searching for movie:', this.title);

    if (this.title.trim()) {
      this.imdbService.getMovieByTitle(this.title).subscribe(
        (data: any) => {
          console.log('Movie data received:', data);
          if (data.Response === 'True') {
            this.movie = data;
          } else {
            this.movie = null;
          }
        },
        (error: any) => {
          console.error('Error:', error);
          this.movie = null;
        }
      );
    } else {
      this.movie = null;
    }
  }

  toggleModalState(val: boolean): void {
    this.isModalVisible = val;
    console.log(val);
  } 
}
