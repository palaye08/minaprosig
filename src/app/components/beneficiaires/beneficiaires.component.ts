import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

interface Beneficiaire {
  id: number;
  idBeneficiaire?: string;
  prenom: string;
  nom: string;
  email: string;
  password?: string;
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
  dateInscription?: string;
  createdAt?: string;
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
  loading = false;
  error = '';

  selectedBeneficiaire: Beneficiaire = this.getEmptyBeneficiaire();

  stats = {
    total: 0,
    actifs: 0,
    inactifs: 0,
    nouveaux: 0
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBeneficiaires();
  }

  loadBeneficiaires() {
    this.loading = true;
    this.error = '';
    
    // Appel API pour récupérer les bénéficiaires
    this.userService.getUtilisateursByProfile('BENEFICIAIRE').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.beneficiaires = response.data.map((user: any) => ({
            id: user.id,
            idBeneficiaire: user.idBeneficiaire || `BEN-${user.id}`,
            prenom: user.prenom || '',
            nom: user.nom || '',
            email: user.email || '',
            profile: user.profile || 'BENEFICIAIRE',
            genre: user.genre || '',
            dateNaissance: user.dateNaissance || '',
            telephone: user.telephone || '',
            adresse: user.adresse || '',
            pays: user.pays || 'Sénégal',
            region: user.region || '',
            ville: user.ville || '',
            zone: user.zone || '',
            niveauEducation: user.niveauEducation || '',
            situationProfessionnelle: user.situationProfessionnelle || '',
            programme: user.programme || '',
            bailleur: user.bailleur || '',
            coachId: user.coachId || null,
            statut: user.statut || 'ACTIF',
            dateInscription: user.createdAt || '',
            createdAt: user.createdAt || ''
          }));
          
          this.filteredBeneficiaires = [...this.beneficiaires];
          this.calculateStats();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des bénéficiaires:', error);
        this.error = 'Impossible de charger les bénéficiaires';
        this.loading = false;
      }
    });
  }

  calculateStats() {
    this.stats.total = this.beneficiaires.length;
    this.stats.actifs = this.beneficiaires.filter(b => b.statut === 'ACTIF').length;
    this.stats.inactifs = this.beneficiaires.filter(b => b.statut === 'INACTIF').length;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    this.stats.nouveaux = this.beneficiaires.filter(b => 
      b.createdAt && new Date(b.createdAt) > thirtyDaysAgo
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
    this.loading = true;
    this.error = '';
    
    if (this.modalMode === 'create') {
      // Création via AuthService avec profil BENEFICIAIRE
      const userData = {
        prenom: this.selectedBeneficiaire.prenom,
        nom: this.selectedBeneficiaire.nom,
        email: this.selectedBeneficiaire.email,
        password: this.selectedBeneficiaire.password || 'passer123', // Mot de passe par défaut
        profile: 'BENEFICIAIRE', // Fixé à BENEFICIAIRE
        genre: this.selectedBeneficiaire.genre,
        dateNaissance: this.selectedBeneficiaire.dateNaissance,
        telephone: this.selectedBeneficiaire.telephone,
        adresse: this.selectedBeneficiaire.adresse,
        pays: this.selectedBeneficiaire.pays,
        region: this.selectedBeneficiaire.region,
        ville: this.selectedBeneficiaire.ville,
        zone: this.selectedBeneficiaire.zone,
        niveauEducation: this.selectedBeneficiaire.niveauEducation,
        situationProfessionnelle: this.selectedBeneficiaire.situationProfessionnelle,
        programme: this.selectedBeneficiaire.programme,
        bailleur: this.selectedBeneficiaire.bailleur,
        coachId: this.selectedBeneficiaire.coachId
      };

      this.authService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Bénéficiaire créé:', response);
          this.loadBeneficiaires(); // Recharger la liste
          this.closeModal();
          alert('Bénéficiaire créé avec succès !');
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.error = error.message || 'Impossible de créer le bénéficiaire';
          this.loading = false;
        }
      });
    } else {
      // Mise à jour via UserService
      this.userService.updateUtilisateur(this.selectedBeneficiaire.id, this.selectedBeneficiaire).subscribe({
        next: (response) => {
          if (response.success) {
            const index = this.beneficiaires.findIndex(b => b.id === this.selectedBeneficiaire.id);
            if (index !== -1) {
              this.beneficiaires[index] = { ...this.selectedBeneficiaire };
            }
            this.filterBeneficiaires();
            this.calculateStats();
            this.closeModal();
            alert('Bénéficiaire modifié avec succès !');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde:', error);
          this.error = error.message || 'Impossible de sauvegarder les modifications';
          this.loading = false;
        }
      });
    }
  }

  deleteBeneficiaire(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
      this.loading = true;
      
      this.userService.deleteUtilisateur(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.beneficiaires = this.beneficiaires.filter(b => b.id !== id);
            this.filterBeneficiaires();
            this.calculateStats();
            alert('Bénéficiaire supprimé avec succès !');
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Impossible de supprimer le bénéficiaire');
          this.loading = false;
        }
      });
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
      password: 'passer123', // Mot de passe par défaut pour la création
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