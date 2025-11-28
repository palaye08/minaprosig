import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Objectif {
  id: number;
  titre: string;
  categorie: string;
  description: string;
  indicateur: string;
  dateDebut: string;
  dateCible: string;
  statut: string;
  progress: number;
  commentaires: Array<{ date: string; auteur: string; texte: string }>;
}

@Component({
  selector: 'app-mes-objectifs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-objectifs.component.html',
  styleUrl: './mes-objectifs.component.css'
})
export class MesObjectifsComponent {
  objectifs: Objectif[] = [
    {
      id: 1,
      titre: 'Augmenter le CA mensuel de 30%',
      categorie: 'Financier',
      description: 'Passer de 2M FCFA à 2.6M FCFA de CA mensuel',
      indicateur: 'Chiffre d\'affaires mensuel',
      dateDebut: '2025-10-01',
      dateCible: '2025-12-31',
      statut: 'En cours',
      progress: 75,
      commentaires: [
        { date: '2025-11-20', auteur: 'Fatou Sall (Coach)', texte: 'Excellente progression! Continue sur cette lancée' },
        { date: '2025-11-15', auteur: 'Vous', texte: 'Nouvelle campagne marketing lancée avec succès' }
      ]
    },
    {
      id: 2,
      titre: 'Recruter 2 nouveaux employés',
      categorie: 'Organisationnel',
      description: 'Embaucher un vendeur et un gestionnaire de stock',
      indicateur: 'Nombre d\'employés',
      dateDebut: '2025-11-01',
      dateCible: '2026-01-15',
      statut: 'En cours',
      progress: 50,
      commentaires: [
        { date: '2025-11-25', auteur: 'Fatou Sall (Coach)', texte: 'As-tu finalisé les fiches de poste?' }
      ]
    },
    {
      id: 3,
      titre: 'Lancer nouvelle ligne de produits',
      categorie: 'Commercial',
      description: 'Introduire 5 nouveaux produits cosmétiques bio',
      indicateur: 'Nombre de produits lancés',
      dateDebut: '2025-11-15',
      dateCible: '2026-02-01',
      statut: 'En cours',
      progress: 30,
      commentaires: []
    },
    {
      id: 4,
      titre: 'Obtenir certification bio',
      categorie: 'Stratégique',
      description: 'Obtenir la certification pour les produits naturels',
      indicateur: 'Certification obtenue',
      dateDebut: '2025-09-01',
      dateCible: '2025-12-01',
      statut: 'Atteint',
      progress: 100,
      commentaires: [
        { date: '2025-11-28', auteur: 'Vous', texte: 'Certification reçue! 🎉' }
      ]
    }
  ];

  get stats() {
    return {
      total: this.objectifs.length,
      enCours: this.objectifs.filter(o => o.statut === 'En cours').length,
      atteints: this.objectifs.filter(o => o.statut === 'Atteint').length,
      progressMoyen: Math.round(this.objectifs.reduce((sum, o) => sum + o.progress, 0) / this.objectifs.length)
    };
  }

  getCategorieColor(categorie: string): string {
    const colors: {[key: string]: string} = {
      'Financier': 'from-green-500 to-emerald-600',
      'Commercial': 'from-blue-500 to-blue-600',
      'Organisationnel': 'from-purple-500 to-purple-600',
      'Stratégique': 'from-pink-500 to-pink-600',
      'Personnel': 'from-amber-500 to-amber-600'
    };
    return colors[categorie] || 'from-gray-500 to-gray-600';
  }

  getStatutColor(statut: string): string {
    const colors: {[key: string]: string} = {
      'En cours': 'bg-blue-100 text-blue-700 border-blue-200',
      'Atteint': 'bg-green-100 text-green-700 border-green-200',
      'Non atteint': 'bg-red-100 text-red-700 border-red-200',
      'Abandonné': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700';
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-red-500';
  }
}