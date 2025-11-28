import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuickStat {
  icon: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  color: string;
}

interface Activity {
  id: number;
  title: string;
  date: string;
  type: string;
  status: string;
}

interface Objective {
  id: number;
  title: string;
  category: string;
  progress: number;
  deadline: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName = 'Amina';
  
  quickStats: QuickStat[] = [
    {
      icon: '🎯',
      label: 'Objectifs actifs',
      value: '5',
      change: '+2 ce mois',
      positive: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📚',
      label: 'Activités à venir',
      value: '3',
      change: 'Cette semaine',
      positive: true,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '💬',
      label: 'Sessions coaching',
      value: '12',
      change: '+3 ce mois',
      positive: true,
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '⭐',
      label: 'Score global',
      value: '8.5/10',
      change: '+0.5',
      positive: true,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  upcomingActivities: Activity[] = [
    {
      id: 1,
      title: 'Formation Marketing Digital',
      date: '2025-11-30',
      type: 'Formation',
      status: 'Inscrit'
    },
    {
      id: 2,
      title: 'Session de coaching individuel',
      date: '2025-12-02',
      type: 'Coaching',
      status: 'Confirmé'
    },
    {
      id: 3,
      title: 'Atelier Pitch Investisseurs',
      date: '2025-12-05',
      type: 'Atelier',
      status: 'En attente'
    }
  ];

  activeObjectives: Objective[] = [
    {
      id: 1,
      title: 'Augmenter le CA mensuel',
      category: 'Financier',
      progress: 75,
      deadline: '2025-12-31'
    },
    {
      id: 2,
      title: 'Recruter 2 nouveaux employés',
      category: 'Organisationnel',
      progress: 50,
      deadline: '2026-01-15'
    },
    {
      id: 3,
      title: 'Lancer nouveau produit',
      category: 'Commercial',
      progress: 30,
      deadline: '2026-02-01'
    }
  ];

  recentDocuments = [
    { name: 'Rapport mensuel Novembre', date: '2025-11-25', type: 'PDF' },
    { name: 'Plan d\'action Q1 2026', date: '2025-11-20', type: 'DOCX' },
    { name: 'Fiche évaluation performance', date: '2025-11-18', type: 'PDF' }
  ];

  ngOnInit() {
    console.log('Dashboard bénéficiaire chargé');
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-red-500';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Inscrit': 'bg-blue-100 text-blue-700',
      'Confirmé': 'bg-green-100 text-green-700',
      'En attente': 'bg-amber-100 text-amber-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  }
}