import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CoachingSession {
  id: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  coach: string;
  modalite: string;
  statut: string;
  objectif: string;
  situationInitiale: string;
  themesAbordes: string[];
  actionsbeneficiaire: string[];
  actionsCoach: string[];
  difficultes: string[];
  prochaineSeason: string;
}

@Component({
  selector: 'app-mes-coachings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-coachings.component.html',
  styleUrl: './mes-coachings.component.css'
})
export class MesCoachingsComponent {
  selectedSession: CoachingSession | null = null;

  sessions: CoachingSession[] = [
    {
      id: 1,
      date: '2025-12-02',
      heureDebut: '14:00',
      heureFin: '15:30',
      coach: 'Fatou Sall',
      modalite: 'Présentiel',
      statut: 'Planifié',
      objectif: 'Optimiser la stratégie marketing',
      situationInitiale: 'Besoin d\'augmenter la visibilité sur les réseaux sociaux',
      themesAbordes: ['Marketing digital', 'Stratégie de contenu', 'Publicité Facebook'],
      actionsbeneficiaire: ['Créer un calendrier éditorial', 'Définir la charte graphique'],
      actionsCoach: ['Partager des ressources', 'Réviser le plan marketing'],
      difficultes: ['Budget limité pour la publicité'],
      prochaineSeason: '2025-12-16'
    },
    {
      id: 2,
      date: '2025-11-18',
      heureDebut: '10:00',
      heureFin: '11:30',
      coach: 'Fatou Sall',
      modalite: 'En ligne',
      statut: 'Complété',
      objectif: 'Améliorer la gestion financière',
      situationInitiale: 'Difficultés à suivre les flux de trésorerie',
      themesAbordes: ['Tableau de trésorerie', 'Prévisions financières', 'Gestion des stocks'],
      actionsbeneficiaire: ['Mettre en place un tableau de bord', 'Suivre les dépenses hebdomadaires'],
      actionsCoach: ['Envoyer template Excel', 'Programmer session de suivi'],
      difficultes: ['Manque de temps pour la saisie quotidienne'],
      prochaineSeason: '2025-12-02'
    },
    {
      id: 3,
      date: '2025-11-04',
      heureDebut: '15:00',
      heureFin: '16:30',
      coach: 'Fatou Sall',
      modalite: 'Présentiel',
      statut: 'Complété',
      objectif: 'Définir la stratégie commerciale',
      situationInitiale: 'Besoin de structurer l\'approche client',
      themesAbordes: ['Ciblage client', 'Proposition de valeur', 'Canaux de distribution'],
      actionsbeneficiaire: ['Créer profils clients', 'Identifier 3 canaux prioritaires'],
      actionsCoach: ['Partager études de cas', 'Connecter avec autres entrepreneurs'],
      difficultes: ['Concurrence accrue dans le secteur'],
      prochaineSeason: '2025-11-18'
    }
  ];

  get stats() {
    return {
      total: this.sessions.length,
      planifies: this.sessions.filter(s => s.statut === 'Planifié').length,
      completes: this.sessions.filter(s => s.statut === 'Complété').length,
      dureeTotal: this.sessions.length * 1.5
    };
  }

  getStatusColor(statut: string): string {
    const colors: { [key: string]: string } = {
      'Planifié': 'bg-blue-100 text-blue-700 border-blue-200',
      'Complété': 'bg-green-100 text-green-700 border-green-200',
      'Annulé': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700 border-gray-200';
  }

  getModaliteIcon(modalite: string): string {
    return modalite === 'Présentiel' ? '🏢' : '💻';
  }

  viewSession(session: CoachingSession) {
    this.selectedSession = session;
  }

  closeDetails() {
    this.selectedSession = null;
  }
}