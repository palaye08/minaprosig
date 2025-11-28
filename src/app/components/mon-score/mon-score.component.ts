import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Critere {
  nom: string;
  score: number;
  maxScore: number;
  description: string;
  icon: string;
}

interface HistoriqueScore {
  date: string;
  score: number;
  commentaire: string;
  auteur: string;
}

@Component({
  selector: 'app-mon-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mon-score.component.html',
  styleUrl: './mon-score.component.css'
})
export class MonScoreComponent {
  scoreGlobal = 8.5;
  maxScore = 10;
  
  criteres: Critere[] = [
    {
      nom: 'Engagement',
      score: 9,
      maxScore: 10,
      description: 'Participation aux activités et implication dans le programme',
      icon: '🎯'
    },
    {
      nom: 'Respect des délais',
      score: 8,
      maxScore: 10,
      description: 'Ponctualité et respect des échéances fixées',
      icon: '⏰'
    },
    {
      nom: 'Participation',
      score: 9.5,
      maxScore: 10,
      description: 'Présence et interaction lors des sessions',
      icon: '👥'
    },
    {
      nom: 'Évolution du business',
      score: 8,
      maxScore: 10,
      description: 'Croissance et développement de l\'entreprise',
      icon: '📈'
    },
    {
      nom: 'Capacité d\'exécution',
      score: 8,
      maxScore: 10,
      description: 'Mise en œuvre des actions et recommandations',
      icon: '✅'
    }
  ];

  historique: HistoriqueScore[] = [
    {
      date: '2025-11-28',
      score: 8.5,
      commentaire: 'Excellente progression ce mois-ci. Continue sur cette lancée!',
      auteur: 'Fatou Sall'
    },
    {
      date: '2025-10-30',
      score: 8.0,
      commentaire: 'Bonne amélioration sur l\'engagement. Travailler sur le respect des délais.',
      auteur: 'Fatou Sall'
    },
    {
      date: '2025-09-28',
      score: 7.5,
      commentaire: 'Bon début. Continuer à participer activement aux sessions.',
      auteur: 'Fatou Sall'
    }
  ];

  pointsForts = [
    'Participation exceptionnelle aux sessions',
    'Très bon engagement dans les activités',
    'Croissance régulière du CA',
    'Bonne capacité d\'adaptation'
  ];

  pointsAmeliorer = [
    'Respecter davantage les délais fixés',
    'Compléter les documents en temps voulu',
    'Améliorer la gestion du temps'
  ];

  recommandations = [
    'Planifier les tâches une semaine à l\'avance',
    'Utiliser un outil de gestion de projet',
    'Participer au prochain atelier sur la gestion du temps'
  ];

  getScorePercentage(score: number, max: number): number {
    return (score / max) * 100;
  }

  getScoreColor(score: number, max: number): string {
    const percentage = this.getScorePercentage(score, max);
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  }

  getGlobalScoreColor(): string {
    const percentage = (this.scoreGlobal / this.maxScore) * 100;
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-blue-500 to-blue-600';
    if (percentage >= 40) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  }
}