import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mon-profil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './mon-profil.component.html',
  styleUrl: './mon-profil.component.css'
})
export class MonProfilComponent {
  editMode = false;

  profileData = {
    id: 'BEN-2025-001',
    prenom: 'Amina',
    nom: 'Diagne',
    genre: 'Féminin',
    dateNaissance: '1995-05-15',
    avatar: '👩🏾‍💼',
    telephone: '+221 77 123 45 67',
    telephoneSecondaire: '+221 70 987 65 43',
    email: 'amina.diagne@email.com',
    adresse: '15 Avenue Cheikh Anta Diop',
    pays: 'Sénégal',
    region: 'Dakar',
    ville: 'Dakar',
    zone: 'Urbaine',
    niveauEducation: 'Licence',
    situationProfessionnelle: 'Entrepreneure',
    dateEnrolement: '2024-01-15',
    programme: 'Programme Incubation 2024',
    bailleur: 'MinaPro x Banque Mondiale',
    statut: 'Actif',
    coachAssigne: 'Fatou Sall'
  };

  entrepriseData = {
    nom: 'BeautyLux Cosmétiques',
    secteur: 'Cosmétiques naturels',
    statutJuridique: 'SARL',
    anneeCreation: '2023',
    niveauAvancement: 'Croissance',
    nombreEmployesPermanents: 3,
    nombreEmployesTemporaires: 2,
    chiffreAffairesActuel: 2500000,
    depensesActuelles: 1800000,
    margeActuelle: 28
  };

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    this.editMode = false;
    console.log('Profil sauvegardé', this.profileData);
  }

  cancelEdit() {
    this.editMode = false;
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
      'Actif': 'bg-green-100 text-green-700',
      'En pause': 'bg-amber-100 text-amber-700',
      'Sorti': 'bg-red-100 text-red-700',
      'Diplômé': 'bg-blue-100 text-blue-700'
    };
    return colors[this.profileData.statut] || 'bg-gray-100 text-gray-700';
  }
}