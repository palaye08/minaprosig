import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Beneficiaire {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  profile: string;
  genre: string;
  dateNaissance: string;
  telephone: string;
  adresse: string;
  pays: string;
  region: string;
  ville: string;
  zone: string;
  niveauEducation: string;
  situationProfessionnelle: string;
  programme: string;
  bailleur: string;
  coachId: number | null;
  statut: string;
  dateInscription: string;
}

@Component({
  selector: 'app-beneficiaires',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiaires.component.html'
})
export class BeneficiairesComponent implements OnInit {
  beneficiaires: Beneficiaire[] = [];
  filteredBeneficiaires: Beneficiaire[] = [];
  showModal = false;
  modalMode: 'create' | 'edit' = 'create';
  searchTerm = '';
  filterStatut = 'tous';
  filterProgramme = 'tous';

  selectedBeneficiaire: Beneficiaire = this.getEmptyBeneficiaire();

  stats = {
    total: 0,
    actifs: 0,
    inactifs: 0,
    nouveaux: 0
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBeneficiaires();
    this.calculateStats();
  }

  loadBeneficiaires() {
    // Données mockées - À remplacer par un appel API
    this.beneficiaires = [
      {
        id: 1,
        prenom: 'Palaye',
        nom: 'DIOP',
        email: 'palaye@yopmail.com',
        profile: 'BENEFICIAIRE',
        genre: 'MASCULIN',
        dateNaissance: '1990-01-01',
        telephone: '+221701234567',
        adresse: 'Dakar Plateau',
        pays: 'Sénégal',
        region: 'Dakar',
        ville: 'Dakar',
        zone: 'URBAINE',
        niveauEducation: 'Supérieur',
        situationProfessionnelle: 'Entrepreneur',
        programme: 'Programme Entrepreneuriat',
        bailleur: 'Bailleur International',
        coachId: 1,
        statut: 'ACTIF',
        dateInscription: '2024-01-15'
      },
      {
        id: 2,
        prenom: 'Aminata',
        nom: 'FALL',
        email: 'aminata@yopmail.com',
        profile: 'BENEFICIAIRE',
        genre: 'FEMININ',
        dateNaissance: '1995-05-12',
        telephone: '+221772345678',
        adresse: 'Thiès Ville',
        pays: 'Sénégal',
        region: 'Thiès',
        ville: 'Thiès',
        zone: 'URBAINE',
        niveauEducation: 'Secondaire',
        situationProfessionnelle: 'Commerçante',
        programme: 'Programme Commerce',
        bailleur: 'Bailleur Local',
        coachId: 2,
        statut: 'ACTIF',
        dateInscription: '2024-02-20'
      },
      {
        id: 3,
        prenom: 'Moussa',
        nom: 'NDIAYE',
        email: 'moussa@yopmail.com',
        profile: 'BENEFICIAIRE',
        genre: 'MASCULIN',
        dateNaissance: '1988-08-25',
        telephone: '+221783456789',
        adresse: 'Saint-Louis Centre',
        pays: 'Sénégal',
        region: 'Saint-Louis',
        ville: 'Saint-Louis',
        zone: 'URBAINE',
        niveauEducation: 'Primaire',
        situationProfessionnelle: 'Artisan',
        programme: 'Programme Artisanat',
        bailleur: 'Bailleur International',
        coachId: null,
        statut: 'INACTIF',
        dateInscription: '2023-11-10'
      }
    ];
    
    this.filteredBeneficiaires = [...this.beneficiaires];
  }

  calculateStats() {
    this.stats.total = this.beneficiaires.length;
    this.stats.actifs = this.beneficiaires.filter(b => b.statut === 'ACTIF').length;
    this.stats.inactifs = this.beneficiaires.filter(b => b.statut === 'INACTIF').length;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    this.stats.nouveaux = this.beneficiaires.filter(b => 
      new Date(b.dateInscription) > thirtyDaysAgo
    ).length;
  }

  filterBeneficiaires() {
    this.filteredBeneficiaires = this.beneficiaires.filter(b => {
      const matchSearch = !this.searchTerm || 
        b.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchStatut = this.filterStatut === 'tous' || b.statut === this.filterStatut;
      const matchProgramme = this.filterProgramme === 'tous' || b.programme === this.filterProgramme;
      
      return matchSearch && matchStatut && matchProgramme;
    });
  }

  openCreateModal() {
    this.modalMode = 'create';
    this.selectedBeneficiaire = this.getEmptyBeneficiaire();
    this.showModal = true;
  }

  openEditModal(beneficiaire: Beneficiaire) {
    this.modalMode = 'edit';
    this.selectedBeneficiaire = { ...beneficiaire };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveBeneficiaire() {
    if (this.modalMode === 'create') {
      this.selectedBeneficiaire.id = this.beneficiaires.length + 1;
      this.selectedBeneficiaire.dateInscription = new Date().toISOString().split('T')[0];
      this.beneficiaires.push({ ...this.selectedBeneficiaire });
    } else {
      const index = this.beneficiaires.findIndex(b => b.id === this.selectedBeneficiaire.id);
      if (index !== -1) {
        this.beneficiaires[index] = { ...this.selectedBeneficiaire };
      }
    }
    
    this.filterBeneficiaires();
    this.calculateStats();
    this.closeModal();
  }

  deleteBeneficiaire(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
      this.beneficiaires = this.beneficiaires.filter(b => b.id !== id);
      this.filterBeneficiaires();
      this.calculateStats();
    }
  }

  viewDetails(id: number) {
    this.router.navigate(['/admin/beneficiaires', id]);
  }

  getStatusColor(statut: string): string {
    return statut === 'ACTIF' 
      ? 'bg-green-100 text-green-700 border-green-200' 
      : 'bg-gray-100 text-gray-700 border-gray-200';
  }

  private getEmptyBeneficiaire(): Beneficiaire {
    return {
      id: 0,
      prenom: '',
      nom: '',
      email: '',
      profile: 'BENEFICIAIRE',
      genre: 'MASCULIN',
      dateNaissance: '',
      telephone: '',
      adresse: '',
      pays: 'Sénégal',
      region: '',
      ville: '',
      zone: 'URBAINE',
      niveauEducation: '',
      situationProfessionnelle: '',
      programme: '',
      bailleur: '',
      coachId: null,
      statut: 'ACTIF',
      dateInscription: ''
    };
  }
}