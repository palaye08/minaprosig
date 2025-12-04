import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mon-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mon-profil.component.html',
  styleUrl: './mon-profil.component.css'
})
export class MonProfilComponent implements OnInit {
  editMode = false;
  currentUser: any = null;

  profileData = {
    id: '',
    prenom: '',
    nom: '',
    genre: '',
    dateNaissance: '',
    avatar: '👤',
    telephone: '',
    telephoneSecondaire: '',
    email: '',
    adresse: '',
    pays: '',
    region: '',
    ville: '',
    zone: '',
    niveauEducation: '',
    situationProfessionnelle: '',
    dateEnrolement: '',
    programme: '',
    bailleur: '',
    statut: 'Actif',
    coachAssigne: '',
    profile: ''
  };

  entrepriseData = {
    nom: '',
    secteur: '',
    statutJuridique: '',
    anneeCreation: '',
    niveauAvancement: '',
    nombreEmployesPermanents: 0,
    nombreEmployesTemporaires: 0,
    chiffreAffairesActuel: 0,
    depensesActuelles: 0,
    margeActuelle: 0
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Récupérer l'utilisateur connecté
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      // Mapper les données de l'utilisateur vers profileData
      this.profileData = {
        id: this.currentUser.id || 'N/A',
        prenom: this.currentUser.prenom || '',
        nom: this.currentUser.nom || '',
        genre: this.currentUser.genre || '',
        dateNaissance: this.currentUser.dateNaissance || '',
        avatar: this.getAvatarByGenre(this.currentUser.genre, this.currentUser.profile),
        telephone: this.currentUser.telephone || '',
        telephoneSecondaire: this.currentUser.telephoneSecondaire || '',
        email: this.currentUser.email || '',
        adresse: this.currentUser.adresse || '',
        pays: this.currentUser.pays || 'Sénégal',
        region: this.currentUser.region || '',
        ville: this.currentUser.ville || '',
        zone: this.currentUser.zone || '',
        niveauEducation: this.currentUser.niveauEducation || '',
        situationProfessionnelle: this.currentUser.situationProfessionnelle || '',
        dateEnrolement: this.currentUser.createdAt || new Date().toISOString(),
        programme: this.currentUser.programme || 'N/A',
        bailleur: this.currentUser.bailleur || 'N/A',
        statut: 'Actif',
        coachAssigne: this.currentUser.coachNom || 'Non assigné',
        profile: this.currentUser.profile || 'BENEFICIAIRE'
      };

      // Données entreprise (si disponibles)
      if (this.currentUser.entreprise) {
        this.entrepriseData = {
          ...this.entrepriseData,
          ...this.currentUser.entreprise
        };
      }
    }
  }

  getAvatarByGenre(genre: string, profile: string): string {
    if (profile === 'ADMIN') {
      return genre === 'FEMININ' ? '👩‍💼' : '👨‍💼';
    } else if (profile === 'COACH') {
      return genre === 'FEMININ' ? '👩‍🏫' : '👨‍🏫';
    } else {
      return genre === 'FEMININ' ? '👩🏾‍💼' : '👨🏾‍💼';
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    this.editMode = false;
    console.log('Profil sauvegardé', this.profileData);
    
    // TODO: Appeler le service pour sauvegarder les modifications
    // this.authService.updateProfile(this.profileData).subscribe(...)
    
    alert('Profil sauvegardé avec succès !');
  }

  cancelEdit() {
    this.editMode = false;
    // Recharger les données originales
    this.loadUserProfile();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(value);
  }

  getStatusColor(): string {
    const colors: { [key: string]: string } = {
      'Actif': 'bg-green-100 text-green-700 border-2 border-green-200',
      'En pause': 'bg-amber-100 text-amber-700 border-2 border-amber-200',
      'Sorti': 'bg-red-100 text-red-700 border-2 border-red-200',
      'Diplômé': 'bg-blue-100 text-blue-700 border-2 border-blue-200'
    };
    return colors[this.profileData.statut] || 'bg-gray-100 text-gray-700 border-2 border-gray-200';
  }

  isAdmin(): boolean {
    return this.profileData.profile === 'ADMIN';
  }

  isBeneficiaire(): boolean {
    return this.profileData.profile === 'BENEFICIAIRE';
  }
}