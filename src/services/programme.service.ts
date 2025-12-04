// programme.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

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

interface CreateProgrammeRequest {
  nom: string;
  description: string;
  partenaire: string;
  montantTotal: number;
  activites: string;
  dateDebut: string;
  dateFin: string;
  coachIds: number[];
}

interface AssocierBenefRequest {
  beneficiaireIds: number[];
}

interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
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
export class ProgrammeService {
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
        case 409:
          errorMessage = error.error?.message || 'Conflit de données';
          break;
        case 500:
          errorMessage = 'Erreur interne du serveur';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Erreur ProgrammeService:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Crée un nouveau programme
   */
  createProgramme(programmeData: CreateProgrammeRequest): Observable<ApiResponse<Programme>> {
    const headers = this.getAuthHeaders();
    
    return this.http.post<ApiResponse<Programme>>(
      `${this.baseUrl}programmes`,
      programmeData,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupère tous les programmes avec pagination
   */
  getProgrammes(page: number = 0, size: number = 10): Observable<ApiResponse<PaginatedResponse<Programme>>> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PaginatedResponse<Programme>>>(
      `${this.baseUrl}programmes`,
      { headers, params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupère un programme par ID
   */
  getProgrammeById(id: number): Observable<ApiResponse<Programme>> {
    const headers = this.getAuthHeaders();
    
    return this.http.get<ApiResponse<Programme>>(
      `${this.baseUrl}programmes/${id}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Met à jour un programme
   */
  updateProgramme(id: number, programmeData: any): Observable<ApiResponse<Programme>> {
    const headers = this.getAuthHeaders();
    
    return this.http.put<ApiResponse<Programme>>(
      `${this.baseUrl}programmes/${id}`,
      programmeData,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Associe des bénéficiaires à un programme
   */
  associerBeneficiairesToProgramme(programmeId: number, beneficiaireIds: number[]): Observable<ApiResponse<any>> {
    const headers = this.getAuthHeaders();
    const data: AssocierBenefRequest = { beneficiaireIds };
    
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}programmes/${programmeId}/beneficiaires`,
      data,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retire un bénéficiaire d'un programme
   */
  retirerBeneficiaireFromProgramme(programmeId: number, beneficiaireId: number): Observable<ApiResponse<any>> {
    const headers = this.getAuthHeaders();
    
    return this.http.delete<ApiResponse<any>>(
      `${this.baseUrl}programmes/${programmeId}/beneficiaires/${beneficiaireId}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Supprime un programme
   */
  deleteProgramme(id: number): Observable<ApiResponse<any>> {
    const headers = this.getAuthHeaders();
    
    return this.http.delete<ApiResponse<any>>(
      `${this.baseUrl}programmes/${id}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}