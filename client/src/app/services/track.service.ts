import { Injectable } from '@angular/core';
import ITrack from '../interfaces/track.interface';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getAllTracks() {
    return this.http.get(`${API_ENDPOINTS.TRACK}/all`);
  }
}
