import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Programme {
  id: number;
  nom: string;
  description: string;
  partenaire: string;
  montantTotal: number;
  activites: string[];
  dateDebut: string;
  dateFin: string;
  statut: string;
  coachIds: number[];
  coachs: string[];
  beneficiaireIds: number[];
  beneficiaires: string[];
  createdAt: string;
  updatedAt: string;
}

interface Beneficiaire {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  statut: string;
}

@Component({
  selector: 'app-programmes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programmes.component.html'
})
export class ProgrammesComponent implements OnInit {
  programmes: Programme[] = [];
  filteredProgrammes: Programme[] = [];
  beneficiairesDisponibles: Beneficiaire[] = [];
  
  showModal = false;
  showAssociationModal = false;
  modalMode: 'create' | 'edit' = 'create';
  searchTerm = '';
  filterStatut = 'tous';

  selectedProgramme: Programme = this.getEmptyProgramme();
  programmeForAssociation: Programme | null = null;
  selectedBeneficiaireIds: number[] = [];

  stats = {
    total: 0,
    actifs: 0,
    termines: 0,
    beneficiaires: 0
  };

  constructor() {}

  ngOnInit() {
    this.loadProgrammes();
    this.loadBeneficiaires();
    this.calculateStats();
  }

  loadProgrammes() {
    // Mock data - À remplacer par un appel API
    this.programmes = [
      {
        id: 1,
        nom: 'Programme Entrepreneuriat Jeunes',
        description: 'Programme de formation et d\'accompagnement pour jeunes entrepreneurs',
        partenaire: 'Bailleur International',
        montantTotal: 50000000,
        activites: ['Formation gestion', 'Coaching individuel', 'Mentorat'],
        dateDebut: '2024-01-01',
        dateFin: '2024-12-31',
        statut: 'ACTIF',
        coachIds: [1, 2],
        coachs: ['Marie SARR', 'Jean DIALLO'],
        beneficiaireIds: [1, 2],
        beneficiaires: ['Palaye DIOP', 'Aminata FALL'],
        createdAt: '2023-12-01',
        updatedAt: '2024-11-01'
      },
      {
        id: 2,
        nom: 'Programme Commerce et Artisanat',
        description: 'Développement des compétences en commerce et artisanat traditionnel',
        partenaire: 'Bailleur Local',
        montantTotal: 30000000,
        activites: ['Formation technique', 'Marketing', 'Gestion financière'],
        dateDebut: '2024-02-01',
        dateFin: '2024-11-30',
        statut: 'ACTIF',
        coachIds: [3],
        coachs: ['Fatou SECK'],
        beneficiaireIds: [3],
        beneficiaires: ['Moussa NDIAYE'],
        createdAt: '2024-01-15',
        updatedAt: '2024-10-20'
      },
      {
        id: 3,
        nom: 'Programme Agriculture Durable',
        description: 'Formation aux techniques agricoles modernes et durables',
        partenaire: 'ONG Développement',
        montantTotal: 40000000,
        activites: ['Formation agro-écologie', 'Gestion de l\'eau', 'Marketing produits'],
        dateDebut: '2023-06-01',
        dateFin: '2023-12-31',
        statut: 'TERMINE',
        coachIds: [4],
        coachs: ['Ibrahima BA'],
        beneficiaireIds: [],
        beneficiaires: [],
        createdAt: '2023-05-10',
        updatedAt: '2024-01-05'
      }
    ];
    
    this.filteredProgrammes = [...this.programmes];
  }

  loadBeneficiaires() {
    // Mock data - À remplacer par un appel API
    this.beneficiairesDisponibles = [
      { id: 1, prenom: 'Palaye', nom: 'DIOP', email: 'palaye@yopmail.com', statut: 'ACTIF' },
      { id: 2, prenom: 'Aminata', nom: 'FALL', email: 'aminata@yopmail.com', statut: 'ACTIF' },
      { id: 3, prenom: 'Moussa', nom: 'NDIAYE', email: 'moussa@yopmail.com', statut: 'INACTIF' },
      { id: 4, prenom: 'Fatou', nom: 'SECK', email: 'fatou@yopmail.com', statut: 'ACTIF' },
      { id: 5, prenom: 'Ousmane', nom: 'SY', email: 'ousmane@yopmail.com', statut: 'ACTIF' }
    ];
  }

  calculateStats() {
    this.stats.total = this.programmes.length;
    this.stats.actifs = this.programmes.filter(p => p.statut === 'ACTIF').length;
    this.stats.termines = this.programmes.filter(p => p.statut === 'TERMINE').length;
    this.stats.beneficiaires = this.programmes.reduce((sum, p) => sum + p.beneficiaireIds.length, 0);
  }

  filterProgrammes() {
    this.filteredProgrammes = this.programmes.filter(p => {
      const matchSearch = !this.searchTerm || 
        p.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.partenaire.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchStatut = this.filterStatut === 'tous' || p.statut === this.filterStatut;
      
      return matchSearch && matchStatut;
    });
  }

  openCreateModal() {
    this.modalMode = 'create';
    this.selectedProgramme = this.getEmptyProgramme();
    this.showModal = true;
  }

  openEditModal(programme: Programme) {
    this.modalMode = 'edit';
    this.selectedProgramme = { ...programme };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProgramme() {
    if (this.modalMode === 'create') {
      this.selectedProgramme.id = this.programmes.length + 1;
      this.selectedProgramme.createdAt = new Date().toISOString();
      this.selectedProgramme.updatedAt = new Date().toISOString();
      this.programmes.push({ ...this.selectedProgramme });
    } else {
      const index = this.programmes.findIndex(p => p.id === this.selectedProgramme.id);
      if (index !== -1) {
        this.selectedProgramme.updatedAt = new Date().toISOString();
        this.programmes[index] = { ...this.selectedProgramme };
      }
    }
    
    this.filterProgrammes();
    this.calculateStats();
    this.closeModal();
  }

  deleteProgramme(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      this.programmes = this.programmes.filter(p => p.id !== id);
      this.filterProgrammes();
      this.calculateStats();
    }
  }

  openAssociationModal(programme: Programme) {
    this.programmeForAssociation = programme;
    this.selectedBeneficiaireIds = [...programme.beneficiaireIds];
    this.showAssociationModal = true;
  }

  closeAssociationModal() {
    this.showAssociationModal = false;
    this.programmeForAssociation = null;
    this.selectedBeneficiaireIds = [];
  }

  toggleBeneficiaire(beneficiaireId: number) {
    const index = this.selectedBeneficiaireIds.indexOf(beneficiaireId);
    if (index > -1) {
      this.selectedBeneficiaireIds.splice(index, 1);
    } else {
      this.selectedBeneficiaireIds.push(beneficiaireId);
    }
  }

  isBeneficiaireSelected(beneficiaireId: number): boolean {
    return this.selectedBeneficiaireIds.includes(beneficiaireId);
  }

  saveAssociations() {
    if (this.programmeForAssociation) {
      const index = this.programmes.findIndex(p => p.id === this.programmeForAssociation!.id);
      if (index !== -1) {
        this.programmes[index].beneficiaireIds = [...this.selectedBeneficiaireIds];
        this.programmes[index].beneficiaires = this.beneficiairesDisponibles
          .filter(b => this.selectedBeneficiaireIds.includes(b.id))
          .map(b => `${b.prenom} ${b.nom}`);
        this.programmes[index].updatedAt = new Date().toISOString();
      }
    }
    
    this.calculateStats();
    this.closeAssociationModal();
  }

  getStatusColor(statut: string): string {
    const colors: { [key: string]: string } = {
      'ACTIF': 'bg-green-100 text-green-700 border-green-200',
      'TERMINE': 'bg-gray-100 text-gray-700 border-gray-200',
      'PLANIFIE': 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700 border-gray-200';
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  }

  private getEmptyProgramme(): Programme {
    return {
      id: 0,
      nom: '',
      description: '',
      partenaire: '',
      montantTotal: 0,
      activites: [],
      dateDebut: '',
      dateFin: '',
      statut: 'PLANIFIE',
      coachIds: [],
      coachs: [],
      beneficiaireIds: [],
      beneficiaires: [],
      createdAt: '',
      updatedAt: ''
    };
  }
}