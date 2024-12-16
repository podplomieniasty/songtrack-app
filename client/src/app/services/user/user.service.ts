import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Token } from '../../models/token.model';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = API_URL + '/api/user';
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  get currentUser() {
    const token = this.getToken();
    if(!token) return null;
    return new JwtHelperService().decodeToken(token);
  }

  public getCurrentUser(userId: string) {
    return this.http.get(`${this.url}/profile/${userId}`);
  }

  getToken() {
    const localStorage = this.document.defaultView?.localStorage;
    return localStorage?.getItem('token');
  }

  authenticate(creds: any) {
    const localStorage = this.document.defaultView?.localStorage;
    return this.http.post(`${this.url}/auth`, {
      name: creds.name,
      password: creds.password
    }).pipe(
      map((result: Token | any) => {
        if(result && result.token) {
          localStorage?.setItem('token', result.token);
          return true;
        }
        return false;
      })
    )
  }

  createOrUpdate(creds: any) {
    return this.http.post(`${this.url}/create`, creds);
  }

  logout() {
    const localStorage = this.document.defaultView?.localStorage;
    return this.http.delete(`${this.url}/logout/${this.currentUser.userId}`)
      .pipe(map(() => {
        localStorage?.removeItem('token');
      }));
      
  }

  isLoggedIn() {
    const localStorage = this.document.defaultView?.localStorage;
    const jwtHelper = new JwtHelperService();
    const token = localStorage?.getItem('token');
    if(!token) return false;
    return !(jwtHelper.isTokenExpired(token));
  }

  updateProjects(projectData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.url}/update`, projectData, {headers: headers});
  }
}
