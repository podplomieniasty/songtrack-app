import { Routes } from '@angular/router';
import { notFoundGuard } from './guards/not-found.guard';

export const routes: Routes = [
    { path: '',         loadComponent: () => import ('./components/views/main-view/main-view.component').then(c => c.MainViewComponent)},
    { path: 'entries',  loadComponent: () => import ('./components/views/entries-view/entries-view.component').then(c => c.EntriesViewComponent) },
    { 
        path: 'entries/:spotifyId',   
        loadComponent: () => import('./components/views/single-entry-view/single-entry-view.component').then(c => c.SingleEntryViewComponent),
        canActivate: [notFoundGuard],
     },
    { path: 'about',    loadComponent: () => import('./components/views/about-view/about-view.component').then(c => c.AboutViewComponent)},
    { path: 'login',    loadComponent: () => import('./components/views/login-view/login-view.component').then(c => c.LoginViewComponent)},
    {
        path: 'signup',
        loadComponent: () => import('./components/views/signup-view/signup-view.component').then(c => c.SignupViewComponent),
    },
    {
        path: 'notfound',
        loadComponent: () => import('./components/views/not-found-view/not-found-view.component').then(c => c.NotFoundViewComponent)
    }
    
];
