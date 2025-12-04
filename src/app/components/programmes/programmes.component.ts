import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgrammeService } from '../../../services/programme.service';
import { UserService } from '../../../services/user.service';

interface Programme {
  id: number;
  nom: string;
  description: string;
  partenaire: string;
  montantTotal: number;
  activites: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  coachIds: number[] | null;
  coachs: any[] | null;
  beneficiaireIds: number[] | null;
  beneficiaires: any[] | null;
  createdAt: string;
  updatedAt: string;
}

interface Coach {
  id: number;
  prenom: string;
  nom: string;
  email: string;
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
  coachsDisponibles: Coach[] = [];
  
  showModal = false;
  showAssociationModal = false;
  modalMode: 'create' | 'edit' = 'create';
  searchTerm = '';
  filterStatut = 'tous';
  loading = false;
  error = '';

  selectedProgramme: Programme = this.getEmptyProgramme();
  programmeForAssociation: Programme | null = null;
  selectedBeneficiaireIds: number[] = [];
  selectedCoachIds: number[] = [];

  stats = {
    total: 0,
    actifs: 0,
    termines: 0,
    beneficiaires: 0
  };

  constructor(
    private programmeService: ProgrammeService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadProgrammes();
    this.loadBeneficiaires();
    this.loadCoachs();
  }

  loadProgrammes() {
    this.loading = true;
    this.error = '';
    
    this.programmeService.getProgrammes(0, 100).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.programmes = response.data.content || [];
          this.filteredProgrammes = [...this.programmes];
          this.calculateStats();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des programmes:', error);
        this.error = 'Impossible de charger les programmes';
        this.loading = false;
      }
    });
  }

  loadBeneficiaires() {
    this.userService.getUtilisateursByProfile('BENEFICIAIRE').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.beneficiairesDisponibles = response.data.map((user: any) => ({
            id: user.id,
            prenom: user.prenom,
            nom: user.nom,
            email: user.email,
            statut: user.statut || 'ACTIF'
          }));
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des bénéficiaires:', error);
      }
    });
  }

  loadCoachs() {
    this.userService.getUtilisateursByProfile('COACH').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.coachsDisponibles = response.data.map((user: any) => ({
            id: user.id,
            prenom: user.prenom,
            nom: user.nom,
            email: user.email
          }));
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des coachs:', error);
      }
    });
  }

  calculateStats() {
    this.stats.total = this.programmes.length;
    this.stats.actifs = this.programmes.filter(p => p.statut === 'ACTIF').length;
    this.stats.termines = this.programmes.filter(p => p.statut === 'TERMINE').length;
    this.stats.beneficiaires = this.programmes.reduce((sum, p) => 
      sum + (p.beneficiaireIds?.length || 0), 0
    );
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
    this.selectedCoachIds = [];
    this.showModal = true;
  }

  openEditModal(programme: Programme) {
    this.modalMode = 'edit';
    this.selectedProgramme = { ...programme };
    this.selectedCoachIds = programme.coachIds ? [...programme.coachIds] : [];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProgramme() {
    this.loading = true;
    this.error = '';
    
    // Préparer les données avec les IDs des coachs sélectionnés
    const programmeData = {
      ...this.selectedProgramme,
      coachIds: this.selectedCoachIds
    };
    
    if (this.modalMode === 'create') {
      this.programmeService.createProgramme(programmeData).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadProgrammes();
            this.closeModal();
            alert('Programme créé avec succès !');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.error = 'Impossible de créer le programme';
          this.loading = false;
        }
      });
    } else {
      this.programmeService.updateProgramme(this.selectedProgramme.id, programmeData).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadProgrammes();
            this.closeModal();
            alert('Programme modifié avec succès !');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          this.error = 'Impossible de modifier le programme';
          this.loading = false;
        }
      });
    }
  }

  deleteProgramme(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      this.loading = true;
      
      this.programmeService.deleteProgramme(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadProgrammes();
            alert('Programme supprimé avec succès !');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Impossible de supprimer le programme');
          this.loading = false;
        }
      });
    }
  }

  openAssociationModal(programme: Programme) {
    this.programmeForAssociation = programme;
    this.selectedBeneficiaireIds = programme.beneficiaireIds ? [...programme.beneficiaireIds] : [];
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

  toggleCoach(coachId: number) {
    const index = this.selectedCoachIds.indexOf(coachId);
    if (index > -1) {
      this.selectedCoachIds.splice(index, 1);
    } else {
      this.selectedCoachIds.push(coachId);
    }
  }

  isCoachSelected(coachId: number): boolean {
    return this.selectedCoachIds.includes(coachId);
  }

  saveAssociations() {
    if (this.programmeForAssociation) {
      this.loading = true;
      
      this.programmeService.associerBeneficiairesToProgramme(
        this.programmeForAssociation.id,
        this.selectedBeneficiaireIds
      ).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadProgrammes();
            this.closeAssociationModal();
            alert('Bénéficiaires associés avec succès !');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de l\'association:', error);
          alert('Impossible d\'associer les bénéficiaires');
          this.loading = false;
        }
      });
    }
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
      activites: '', // STRING, pas array
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