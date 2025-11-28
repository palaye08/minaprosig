import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Activity {
  id: number;
  titre: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  type: string;
  modalite: string;
  formateur: string;
  lieu: string;
  statut: string;
  description: string;
  participants: number;
}

@Component({
  selector: 'app-mes-activites',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mes-activites.component.html',
  styleUrl: './mes-activites.component.css'
})
export class MesActivitesComponent {
  filterType = 'Tous';
  filterStatus = 'Tous';

  activities: Activity[] = [
    {
      id: 1,
      titre: 'Formation Marketing Digital',
      date: '2025-11-30',
      heureDebut: '09:00',
      heureFin: '13:00',
      type: 'Formation',
      modalite: 'Présentiel',
      formateur: 'Mamadou Ba',
      lieu: 'Salle A - MinaPro Hub',
      statut: 'Inscrit',
      description: 'Maîtriser les bases du marketing digital pour développer votre présence en ligne',
      participants: 25
    },
    {
      id: 2,
      titre: 'Atelier Business Model Canvas',
      date: '2025-12-02',
      heureDebut: '14:00',
      heureFin: '17:00',
      type: 'Atelier',
      modalite: 'Hybride',
      formateur: 'Aïssa Ndiaye',
      lieu: 'Salle B - MinaPro Hub',
      statut: 'Confirmé',
      description: 'Construisez et affinez votre modèle d\'affaires',
      participants: 15
    },
    {
      id: 3,
      titre: 'Webinaire Pitch Investisseurs',
      date: '2025-12-05',
      heureDebut: '15:00',
      heureFin: '16:30',
      type: 'Webinaire',
      modalite: 'En ligne',
      formateur: 'Ousmane Diallo',
      lieu: 'Zoom',
      statut: 'En attente',
      description: 'Apprenez à structurer un pitch convaincant pour les investisseurs',
      participants: 50
    },
    {
      id: 4,
      titre: 'Session de Networking',
      date: '2025-11-28',
      heureDebut: '18:00',
      heureFin: '20:00',
      type: 'Événement',
      modalite: 'Présentiel',
      formateur: 'Équipe MinaPro',
      lieu: 'Terrace - MinaPro Hub',
      statut: 'Présent',
      description: 'Rencontrez d\'autres entrepreneurs et élargissez votre réseau',
      participants: 40
    },
    {
      id: 5,
      titre: 'Formation Gestion Financière',
      date: '2025-11-25',
      heureDebut: '10:00',
      heureFin: '12:00',
      type: 'Formation',
      modalite: 'Présentiel',
      formateur: 'Fatou Sall',
      lieu: 'Salle C - MinaPro Hub',
      statut: 'Absent',
      description: 'Comprendre les fondamentaux de la gestion financière d\'entreprise',
      participants: 20
    }
  ];

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'Formation': '📚',
      'Atelier': '🛠️',
      'Webinaire': '💻',
      'Événement': '🎉'
    };
    return icons[type] || '📋';
  }

  getStatusColor(statut: string): string {
    const colors: { [key: string]: string } = {
      'Inscrit': 'bg-blue-100 text-blue-700 border-blue-200',
      'Confirmé': 'bg-green-100 text-green-700 border-green-200',
      'En attente': 'bg-amber-100 text-amber-700 border-amber-200',
      'Présent': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Absent': 'bg-red-100 text-red-700 border-red-200',
      'Excusé': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700 border-gray-200';
  }

  getModaliteIcon(modalite: string): string {
    const icons: { [key: string]: string } = {
      'Présentiel': '🏢',
      'En ligne': '💻',
      'Hybride': '🔄'
    };
    return icons[modalite] || '📍';
  }

  get filteredActivities(): Activity[] {
    return this.activities.filter(activity => {
      const typeMatch = this.filterType === 'Tous' || activity.type === this.filterType;
      const statusMatch = this.filterStatus === 'Tous' || activity.statut === this.filterStatus;
      return typeMatch && statusMatch;
    });
  }

  get stats() {
    return {
      total: this.activities.length,
      inscrit: this.activities.filter(a => a.statut === 'Inscrit').length,
      confirme: this.activities.filter(a => a.statut === 'Confirmé').length,
      present: this.activities.filter(a => a.statut === 'Présent').length
    };
  }
}