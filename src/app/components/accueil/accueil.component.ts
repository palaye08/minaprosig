import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accueil.component.html'
})
export class AccueilComponent {
  appTitle = 'MinaPro';
  appLogo = '/logo.png'; // Ajustez le chemin selon votre structure

  isAuthenticated = false; // À remplacer par votre service d'authentification

  features = [
    {
      icon: 'users',
      title: 'Gestion intégrée 360°',
      items: [
        'Profil complet bénéficiaire + entreprise',
        'Historique d\'accompagnement centralisé',
        'Segmentation automatique par maturité'
      ]
    },
    {
      icon: 'trending-up',
      title: 'Suivi de performance en temps réel',
      items: [
        'Évolution CA, emplois, marges par entreprise',
        'Indicateurs ESG automatisés',
        'Tableaux de bord personnalisables'
      ]
    },
    {
      icon: 'bar-chart',
      title: 'Reporting automatisé',
      items: [
        'Export PDF/Excel avec graphiques',
        'Rapports bailleurs personnalisés',
        'Génération en un clic'
      ]
    },
    {
      icon: 'smartphone',
      title: 'Collecte terrain mobile',
      items: [
        'Formulaires optimisés mobile',
        'Mode hors-ligne avec synchronisation',
        'Géolocalisation intégrée'
      ]
    },
    {
      icon: 'zap',
      title: 'Alertes intelligentes',
      items: [
        'Détection bénéficiaires inactifs',
        'Signalement entreprises en difficulté',
        'Dépassements budgétaires'
      ]
    },
    {
      icon: 'dollar-sign',
      title: 'Suivi budgétaire avancé',
      items: [
        'Exécution par programme et bailleur',
        'Prévisions et projections',
        'Alertes automatiques'
      ]
    }
  ];

  stats = [
    {
      value: '70%',
      title: 'Gain de temps',
      description: 'Réduction du temps passé sur les tâches administratives et le reporting'
    },
    {
      value: '100%',
      title: 'Données centralisées',
      description: 'Toutes les informations accessibles en un seul endroit, en temps réel'
    },
    {
      value: '3x',
      title: 'Capacité de suivi',
      description: 'Triplement du nombre de bénéficiaires suivis efficacement par coach'
    },
    {
      value: '24/7',
      title: 'Accès bénéficiaires',
      description: 'Portail en ligne permettant aux entrepreneurs de suivre leur progression'
    }
  ];

  advantages = [
    {
      icon: 'clock',
      title: 'Efficacité opérationnelle',
      description: 'Réduction de 70% du temps administratif grâce à l\'automatisation complète du suivi et du reporting'
    },
    {
      icon: 'target',
      title: 'Prise de décision data-driven',
      description: 'Tableaux de bord en temps réel permettant des ajustements stratégiques immédiats basés sur des données fiables'
    },
    {
      icon: 'award',
      title: 'Qualité d\'accompagnement supérieure',
      description: 'Suivi personnalisé et proactif de chaque bénéficiaire impossible à reproduire avec des outils standards'
    }
  ];
}