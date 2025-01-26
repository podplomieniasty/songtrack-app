import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RawgService {

  constructor(private http: HttpClient) { }

  getGameByTitle(title: string) {
        return this.http.get(`${API_ENDPOINTS.RAWG}/${title}`);
  }
}
