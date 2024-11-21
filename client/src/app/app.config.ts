import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
export const API_ENDPOINTS = {
  SPOTIFY: 'http://localhost:4201/api/spotify',
  TRACK: 'http://localhost:4201/api/track'
}