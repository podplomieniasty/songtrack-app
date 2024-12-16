import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { UserInterceptor } from './services/user/user.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withInterceptors([UserInterceptor]))
  ]
};
export const API_ENDPOINTS = {
  SPOTIFY: 'http://localhost:4201/api/spotify',
  TRACK: 'http://localhost:4201/api/track'
}
export const API_URL: string = 'http://localhost:4201';