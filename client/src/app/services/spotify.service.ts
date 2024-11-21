import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }
  
  getFirstTrack = (track: string) => {
    return this.http.get(`${API_ENDPOINTS.SPOTIFY}/search/${track}`);
  }
}
