import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Document {
  id: number;
  nom: string;
  categorie: string;
  type: string;
  taille: string;
  dateAjout: string;
  statut: string;
  tags: string[];
}

@Component({
  selector: 'app-mes-documents',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mes-documents.component.html',
  styleUrl: './mes-documents.component.css'
})
export class MesDocumentsComponent {
  filterCategorie = 'Tous';
  
  documents: Document[] = [
    {
      id: 1,
      nom: 'Rapport mensuel Novembre 2025',
      categorie: 'Financier',
      type: 'PDF',
      taille: '2.5 MB',
      dateAjout: '2025-11-28',
      statut: 'Complété',
      tags: ['Rapport', 'Mensuel', 'CA']
    },
    {
      id: 2,
      nom: 'Business Plan 2026',
      categorie: 'Stratégique',
      type: 'DOCX',
      taille: '1.8 MB',
      dateAjout: '2025-11-25',
      statut: 'Téléchargé',
      tags: ['Business Plan', 'Stratégie']
    },
    {
      id: 3,
      nom: 'Certificat de formation Marketing',
      categorie: 'Administratif',
      type: 'PDF',
      taille: '0.5 MB',
      dateAjout: '2025-11-22',
      statut: 'Complété',
      tags: ['Certificat', 'Formation']
    },
    {
      id: 4,
      nom: 'Fiche évaluation Q4',
      categorie: 'Administratif',
      type: 'PDF',
      taille: '1.2 MB',
      dateAjout: '2025-11-20',
      statut: 'Non téléchargé',
      tags: ['Évaluation', 'Performance']
    },
    {
      id: 5,
      nom: 'Plan d\'action Q1 2026',
      categorie: 'Stratégique',
      type: 'XLSX',
      taille: '0.8 MB',
      dateAjout: '2025-11-18',
      statut: 'Téléchargé',
      tags: ['Plan', 'Action', 'Objectifs']
    },
    {
      id: 6,
      nom: 'Factures fournisseurs Nov',
      categorie: 'Financier',
      type: 'ZIP',
      taille: '5.2 MB',
      dateAjout: '2025-11-15',
      statut: 'Complété',
      tags: ['Factures', 'Fournisseurs']
    }
  ];

  modeles = [
    { nom: 'Template Rapport Mensuel', type: 'XLSX', icon: '📊' },
    { nom: 'Guide Business Plan', type: 'PDF', icon: '📋' },
    { nom: 'Fiche Suivi CA', type: 'XLSX', icon: '💰' },
    { nom: 'Checklist Coaching', type: 'PDF', icon: '✅' }
  ];

  get filteredDocuments(): Document[] {
    if (this.filterCategorie === 'Tous') return this.documents;
    return this.documents.filter(d => d.categorie === this.filterCategorie);
  }

  get stats() {
    return {
      total: this.documents.length,
      completes: this.documents.filter(d => d.statut === 'Complété').length,
      telecharges: this.documents.filter(d => d.statut === 'Téléchargé').length,
      enAttente: this.documents.filter(d => d.statut === 'Non téléchargé').length
    };
  }

  getTypeIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'PDF': '📄',
      'DOCX': '📝',
      'XLSX': '📊',
      'ZIP': '🗜️'
    };
    return icons[type] || '📎';
  }

  getTypeColor(type: string): string {
    const colors: {[key: string]: string} = {
      'PDF': 'from-red-500 to-red-600',
      'DOCX': 'from-blue-500 to-blue-600',
      'XLSX': 'from-green-500 to-green-600',
      'ZIP': 'from-purple-500 to-purple-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  }

  getStatutColor(statut: string): string {
    const colors: {[key: string]: string} = {
      'Complété': 'bg-green-100 text-green-700 border-green-200',
      'Téléchargé': 'bg-blue-100 text-blue-700 border-blue-200',
      'Non téléchargé': 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700';
  }
}