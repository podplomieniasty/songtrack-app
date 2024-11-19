import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '',     loadComponent: () => import ('./components/views/main-view/main-view.component').then(c => c.MainViewComponent)},
    { path: 'entries',  loadComponent: () => import ('./components/views/entries-view/entries-view.component').then(c => c.EntriesViewComponent) },
];
