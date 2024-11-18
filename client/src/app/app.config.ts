import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
export const API_ENDPOINTS = {
  SPOTIFY: 'http://localhost:4201/api/spotify',
}