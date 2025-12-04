// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface User {
  createdAt: string;
  coachId: null;
  bailleur: string;
  programme: string;
  situationProfessionnelle: string;
  niveauEducation: string;
  zone: string;
  ville: string;
  region: string;
  adresse: string;
  telephone: string;
  dateNaissance: string;
  genre: string;
  id: number;
  idBeneficiaire: string;
  prenom: string;
  nom: string;
  email: string;
  profile: string;
  statut: string;
  avatar: string | null;
  coachNom: string | null;
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
export class UserService {
  private baseUrl = 'https://minaprosigbackend-2.onrender.com/api/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Méthodes privées utilitaires
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
    
    console.error('Erreur UserService:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Récupère tous les utilisateurs avec pagination
   */
  getUtilisateurs(page: number = 0, size: number = 20): Observable<ApiResponse<PaginatedResponse<User>>> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PaginatedResponse<User>>>(
      `${this.baseUrl}utilisateurs`,
      { headers, params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupère les utilisateurs par profil
   */
  getUtilisateursByProfile(profile: string): Observable<ApiResponse<User[]>> {
    const headers = this.getAuthHeaders();
    
    return this.http.get<ApiResponse<User[]>>(
      `${this.baseUrl}utilisateurs/profile/${profile}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Récupère un utilisateur par ID
   */
  getUtilisateurById(id: number): Observable<ApiResponse<User>> {
    const headers = this.getAuthHeaders();
    
    return this.http.get<ApiResponse<User>>(
      `${this.baseUrl}utilisateurs/${id}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Met à jour un utilisateur
   */
  updateUtilisateur(id: number, userData: any): Observable<ApiResponse<User>> {
    const headers = this.getAuthHeaders();
    
    return this.http.put<ApiResponse<User>>(
      `${this.baseUrl}utilisateurs/${id}`,
      userData,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Supprime un utilisateur
   */
  deleteUtilisateur(id: number): Observable<ApiResponse<any>> {
    const headers = this.getAuthHeaders();
    
    return this.http.delete<ApiResponse<any>>(
      `${this.baseUrl}utilisateurs/${id}`,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}