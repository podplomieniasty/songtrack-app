import { Injectable } from '@angular/core';
import ITrack from '../interfaces/track.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addNewTrack(track: ITrack) {
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(`${API_ENDPOINTS.TRACK}/add`, {...track}, {headers: headers});
  }

  getSingleTrack(spotifyId: string) {
    return this.http.get(`${API_ENDPOINTS.TRACK}/single/${spotifyId}`);
  }
}
