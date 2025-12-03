import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Participation {
  id: number;
  beneficiaireId: number;
  beneficiaireNom: string;
  programmeId: number;
  programmeNom: string;
  activiteId: number;
  activiteNom: string;
  dateInscription: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  progression: number;
  note: number | null;
  commentaire: string;
  presences: number;
  absences: number;
}

@Component({
  selector: 'app-participations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participations.component.html'
})
export class ParticipationsComponent implements OnInit {
  participations: Participation[] = [];
  filteredParticipations: Participation[] = [];
  
  searchTerm = '';
  filterStatut = 'tous';
  filterProgramme = 'tous';

  selectedParticipation: Participation | null = null;
  showDetailsModal = false;

  stats = {
    total: 0,
    enCours: 0,
    terminees: 0,
    tauxReussite: 0
  };

  constructor() {}

  ngOnInit() {
    this.loadParticipations();
    this.calculateStats();
  }

  loadParticipations() {
    // Mock data - À remplacer par un appel API
    this.participations = [
      {
        id: 1,
        beneficiaireId: 1,
        beneficiaireNom: 'Palaye DIOP',
        programmeId: 1,
        programmeNom: 'Programme Entrepreneuriat Jeunes',
        activiteId: 1,
        activiteNom: 'Formation en gestion financière',
        dateInscription: '2024-01-15',
        dateDebut: '2024-02-01',
        dateFin: '2024-05-31',
        statut: 'TERMINEE',
        progression: 100,
        note: 85,
        commentaire: 'Excellent travail, très motivé',
        presences: 20,
        absences: 0
      },
      {
        id: 2,
        beneficiaireId: 1,
        beneficiaireNom: 'Palaye DIOP',
        programmeId: 1,
        programmeNom: 'Programme Entrepreneuriat Jeunes',
        activiteId: 2,
        activiteNom: 'Atelier marketing digital',
        dateInscription: '2024-01-15',
        dateDebut: '2024-06-01',
        dateFin: '2024-12-31',
        statut: 'EN_COURS',
        progression: 65,
        note: null,
        commentaire: 'Bonne participation',
        presences: 12,
        absences: 2
      },
      {
        id: 3,
        beneficiaireId: 2,
        beneficiaireNom: 'Aminata FALL',
        programmeId: 2,
        programmeNom: 'Programme Commerce et Artisanat',
        activiteId: 3,
        activiteNom: 'Formation technique artisanale',
        dateInscription: '2024-02-20',
        dateDebut: '2024-03-01',
        dateFin: '2024-11-30',
        statut: 'EN_COURS',
        progression: 78,
        note: null,
        commentaire: 'Très impliquée dans les activités',
        presences: 18,
        absences: 1
      },
      {
        id: 4,
        beneficiaireId: 3,
        beneficiaireNom: 'Moussa NDIAYE',
        programmeId: 2,
        programmeNom: 'Programme Commerce et Artisanat',
        activiteId: 4,
        activiteNom: 'Marketing et vente',
        dateInscription: '2024-03-10',
        dateDebut: '2024-04-01',
        dateFin: '2024-10-31',
        statut: 'ABANDONNEE',
        progression: 25,
        note: null,
        commentaire: 'Difficultés personnelles',
        presences: 5,
        absences: 10
      }
    ];
    
    this.filteredParticipations = [...this.participations];
  }

  calculateStats() {
    this.stats.total = this.participations.length;
    this.stats.enCours = this.participations.filter(p => p.statut === 'EN_COURS').length;
    this.stats.terminees = this.participations.filter(p => p.statut === 'TERMINEE').length;
    
    const termineesAvecNote = this.participations.filter(p => p.statut === 'TERMINEE' && p.note !== null);
    if (termineesAvecNote.length > 0) {
      const moyenneNotes = termineesAvecNote.reduce((sum, p) => sum + (p.note || 0), 0) / termineesAvecNote.length;
      this.stats.tauxReussite = Math.round(moyenneNotes);
    } else {
      this.stats.tauxReussite = 0;
    }
  }

  filterParticipations() {
    this.filteredParticipations = this.participations.filter(p => {
      const matchSearch = !this.searchTerm || 
        p.beneficiaireNom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.programmeNom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.activiteNom.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchStatut = this.filterStatut === 'tous' || p.statut === this.filterStatut;
      const matchProgramme = this.filterProgramme === 'tous' || p.programmeNom === this.filterProgramme;
      
      return matchSearch && matchStatut && matchProgramme;
    });
  }

  viewDetails(participation: Participation) {
    this.selectedParticipation = participation;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedParticipation = null;
  }

  getStatusColor(statut: string): string {
    const colors: { [key: string]: string } = {
      'EN_COURS': 'bg-blue-100 text-blue-700 border-blue-200',
      'TERMINEE': 'bg-green-100 text-green-700 border-green-200',
      'ABANDONNEE': 'bg-red-100 text-red-700 border-red-200',
      'PLANIFIEE': 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700 border-gray-200';
  }

  getProgressionColor(progression: number): string {
    if (progression >= 80) return 'from-green-500 to-emerald-500';
    if (progression >= 50) return 'from-blue-500 to-cyan-500';
    if (progression >= 25) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  }

  getTauxPresence(participation: Participation): number {
    const total = participation.presences + participation.absences;
    return total > 0 ? Math.round((participation.presences / total) * 100) : 0;
  }

  getNoteColor(note: number): string {
    if (note >= 80) return 'text-green-600';
    if (note >= 60) return 'text-blue-600';
    if (note >= 40) return 'text-amber-600';
    return 'text-red-600';
  }
}