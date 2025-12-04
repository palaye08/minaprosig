// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface StatistiquesGlobales {
  totalBeneficiaires: number | null;
  totalActivites: number | null;
  totalCoachings: number | null;
  totalObjectifs: number | null;
  beneficiairesActifs: number | null;
  beneficiairesPause: number | null;
  beneficiairesSortis: number | null;
  beneficiairesDiplomes: number | null;
  activitesAVenir: any | null;
  activitesEnCours: any | null;
  activitesTerminees: any | null;
  objectifsEnCours: any | null;
  objectifsAtteints: any | null;
  objectifsNonAtteints: any | null;
  progressMoyen: number | null;
  coachingsPlanifies: any | null;
  coachingsCompletes: any | null;
  scoreMoyen: number | null;
  chiffreAffairesTotal: number | null;
  depensesTotales: number | null;
  margeMovenne: number | null;
  variationCA: number | null;
  variationMarge: number | null;
}

interface StatistiquesBeneficiaire {
  totalBeneficiaires: number | null;
  totalActivites: number | null;
  totalCoachings: number | null;
  totalObjectifs: number | null;
  beneficiairesActifs: number | null;
  beneficiairesPause: number | null;
  beneficiairesSortis: number | null;
  beneficiairesDiplomes: number | null;
  activitesAVenir: any | null;
  activitesEnCours: any | null;
  activitesTerminees: any | null;
  objectifsEnCours: number | null;
  objectifsAtteints: number | null;
  objectifsNonAtteints: any | null;
  progressMoyen: number | null;
  coachingsPlanifies: any | null;
  coachingsCompletes: any | null;
  scoreMoyen: number | null;
  chiffreAffairesTotal: number | null;
  depensesTotales: number | null;
  margeMovenne: number | null;
  variationCA: number | null;
  variationMarge: number | null;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'https://minaprosigbackend-2.onrender.com/api/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Données invalides';
          break;
        case 401:
          errorMessage = 'Non autorisé. Veuillez vous reconnecter.';
          break;
        case 403:
          errorMessage = 'Accès interdit';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur interne du serveur';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Erreur DashboardService:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Récupère les statistiques globales
   */
  getStatistiquesGlobales(profile?: string): Observable<ApiResponse<StatistiquesGlobales>> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams();
    
    if (profile) {
      params = params.set('profile', profile);
    }
    
    return this.http.get<ApiResponse<StatistiquesGlobales>>(
      `${this.baseUrl}dashboard/stats/global`,
      { headers, params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupère les statistiques d'un bénéficiaire spécifique
   */
  getStatistiquesBeneficiaire(id: number): Observable<ApiResponse<StatistiquesBeneficiaire>> {
    const headers = this.getAuthHeaders();
    
    return this.http.get<ApiResponse<StatistiquesBeneficiaire>>(
      `${this.baseUrl}dashboard/stats/beneficiaire/${id}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}