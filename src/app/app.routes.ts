import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonProfilComponent } from './components/mon-profil/mon-profil.component';
import { MesActivitesComponent } from './components/mes-activites/mes-activites.component';
import { MesCoachingsComponent } from './components/mes-coachings/mes-coachings.component';
import { MesObjectifsComponent } from './components/mes-objectifs/mes-objectifs.component';
import { MesDocumentsComponent } from './components/mes-documents/mes-documents.component';
import { MonScoreComponent } from './components/mon-score/mon-score.component';
import { AppComponent } from './app.component';
import { BeneficiaireLayoutComponent } from './components/beneficiaire-layout/beneficiaire-layout.component';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    title: 'Minaprosig - Accueil'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion - MinaPro'
  },
  {
    path: 'beneficiaire',
    component: BeneficiaireLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard - Bénéficiaire'
      },
      {
        path: 'profil',
        component: MonProfilComponent,
        title: 'Mon Profil'
      },
      {
        path: 'activites',
        component: MesActivitesComponent,
        title: 'Mes Activités'
      },
      {
        path: 'coachings',
        component: MesCoachingsComponent,
        title: 'Mes Coachings'
      },
      {
        path: 'objectifs',
        component: MesObjectifsComponent,
        title: 'Mes Objectifs'
      },
      {
        path: 'documents',
        component: MesDocumentsComponent,
        title: 'Mes Documents'
      },
      {
        path: 'score',
        component: MonScoreComponent,
        title: 'Mon Score'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/accueil'
  }
];