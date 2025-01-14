import { Component } from '@angular/core';
import { ImdbService } from './imdb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PopupComponent } from './components/popup/popup.component';

interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HeaderComponent, EntryFormComponent, PopupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  popup = {
    msg: '',
    state: '',
  }
  popups: any = [];

  isModalVisible: boolean = false;

  constructor() {}

  toggleModalState(val: boolean): void {
    this.isModalVisible = val;
  } 

  setPopup(obj: any) {
    this.popup = {
      msg: obj.msg,
      state: obj.type,
    }
    this.popups.push(obj)
    setTimeout(() => {
      this.popups.unshift();
    }, 4000);
  }

  
}
