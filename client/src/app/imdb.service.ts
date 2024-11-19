import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  constructor(private http: HttpClient) {}

 
  getMovieByTitle(title: string): Observable<any> {
    const apiUrl = `http://www.omdbapi.com/?t=${title}&plot=full&apikey=8ad44020`;  
    return this.http.get<any>(apiUrl);
  }
}
