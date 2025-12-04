import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

interface Beneficiaire {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  genre: string;
  dateNaissance: string;
  telephone: string;
  adresse: string;
  region: string;
  ville: string;
  zone: string;
  niveauEducation: string;
  situationProfessionnelle: string;
  programme: string;
  bailleur: string;
  coachId: number | null;
  coachNom?: string;
  statut: string;
  dateInscription: string;
  createdAt?: string;
}

interface Activite {
  id: number;
  titre: string;
  type: string;
  date: string;
  statut: string;
  progression: number;
}

interface Coaching {
  id: number;
  date: string;
  coach: string;
  objectif: string;
  statut: string;
}

@Component({
  selector: 'app-details-beneficiaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-beneficiaire.component.html'
})
export class DetailsBeneficiaireComponent implements OnInit {
  beneficiaire: Beneficiaire | null = null;
  activites: Activite[] = [];
  coachings: Coaching[] = [];
  loading = false;
  error = '';
  
  stats = {
    activitesTerminees: 0,
    coachingsRealises: 0,
    progression: 0,
    score: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadBeneficiaire(+id);
    this.loadActivites(+id);
    this.loadCoachings(+id);
  }

  loadBeneficiaire(id: number) {
    this.loading = true;
    this.error = '';
    
    this.userService.getUtilisateurById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const user = response.data;
          this.beneficiaire = {
            id: user.id,
            prenom: user.prenom || '',
            nom: user.nom || '',
            email: user.email || '',
            genre: user.genre || '',
            dateNaissance: user.dateNaissance || '',
            telephone: user.telephone || '',
            adresse: user.adresse || '',
            region: user.region || '',
            ville: user.ville || '',
            zone: user.zone || '',
            niveauEducation: user.niveauEducation || '',
            situationProfessionnelle: user.situationProfessionnelle || '',
            programme: user.programme || '',
            bailleur: user.bailleur || '',
            coachId: user.coachId || null,
            coachNom: user.coachNom || 'Non assigné',
            statut: user.statut || 'ACTIF',
            dateInscription: user.createdAt || '',
            createdAt: user.createdAt || ''
          };
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du bénéficiaire:', error);
        this.error = 'Impossible de charger les détails du bénéficiaire';
        this.loading = false;
      }
    });
  }

  loadActivites(beneficiaireId: number) {
    this.activites = [
      {
        id: 1,
        titre: 'Formation en gestion financière',
        type: 'Formation',
        date: '2024-11-15',
        statut: 'TERMINEE',
        progression: 100
      },
      {
        id: 2,
        titre: 'Atelier marketing digital',
        type: 'Atelier',
        date: '2024-11-20',
        statut: 'EN_COURS',
        progression: 65
      },
      {
        id: 3,
        titre: 'Élaboration du business plan',
        type: 'Projet',
        date: '2024-12-01',
        statut: 'PLANIFIEE',
        progression: 0
      }
    ];

    this.stats.activitesTerminees = this.activites.filter(a => a.statut === 'TERMINEE').length;
    this.stats.progression = Math.round(
      this.activites.reduce((sum, a) => sum + a.progression, 0) / this.activites.length
    );
  }

  loadCoachings(beneficiaireId: number) {
    this.coachings = [
      {
        id: 1,
        date: '2024-11-10',
        coach: 'Marie SARR',
        objectif: 'Définir la stratégie commerciale',
        statut: 'COMPLETE'
      },
      {
        id: 2,
        date: '2024-11-25',
        coach: 'Marie SARR',
        objectif: 'Suivi du développement produit',
        statut: 'PLANIFIE'
      }
    ];

    this.stats.coachingsRealises = this.coachings.filter(c => c.statut === 'COMPLETE').length;
    this.stats.score = 78;
  }

  getStatusColor(statut: string): string {
    const colors: { [key: string]: string } = {
      'ACTIF': 'bg-green-100 text-green-700 border-green-200',
      'INACTIF': 'bg-gray-100 text-gray-700 border-gray-200',
      'TERMINEE': 'bg-green-100 text-green-700 border-green-200',
      'EN_COURS': 'bg-blue-100 text-blue-700 border-blue-200',
      'PLANIFIEE': 'bg-amber-100 text-amber-700 border-amber-200',
      'COMPLETE': 'bg-green-100 text-green-700 border-green-200',
      'PLANIFIE': 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700 border-gray-200';
  }

  goBack() {
    this.router.navigate(['/admin/beneficiaires']);
  }

  calculateAge(dateNaissance: string): number {
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}