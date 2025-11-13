import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AccueilComponent,
    title: 'Minaprosig - Accueil'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion - MinaPro'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];