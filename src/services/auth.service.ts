// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface RegisterRequest {
  prenom: string;
  nom: string;
  email: string;
  password: string;
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
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
    type: string;
    utilisateur: any;
  };
  timestamp: string;
}

interface AuthTokens {
  token: string;
  refreshToken: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl =   environment.apiUrl;
  
  // Clés de stockage local
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'auth_user';

  constructor(private http: HttpClient) {}

  /**
   * Crée un nouvel utilisateur (ADMIN)
   */
  createUser(userData: Partial<RegisterRequest>): Observable<any> {
    const fullUserData: RegisterRequest = {
      prenom: 'Palaye',
      nom: 'DIOP',
      email: 'palaye@yopmail.com',
      password: 'passer123',
      profile: 'ADMIN',
      genre: 'MASCULIN',
      dateNaissance: '1990-01-01',
      telephone: '+221701234567',
      adresse: 'Adresse admin',
      pays: 'Sénégal',
      region: 'Dakar',
      ville: 'Dakar',
      zone: 'URBAINE',
      niveauEducation: 'Supérieur',
      situationProfessionnelle: 'Administrateur',
      programme: 'Programme Admin',
      bailleur: 'Bailleur Admin',
      coachId: null,
      ...userData
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}auth/register`, fullUserData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Authentifie un utilisateur
   */
  authenticate(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.baseUrl}auth/login`, credentials, { headers })
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.saveAuthData(response.data);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Authentifie avec les identifiants par défaut
   */
  // authenticateDefault(): Observable<LoginResponse> {
  //   const credentials: LoginRequest = {
  //     email: 'palaye@yopmail.com',
  //     password: 'passer123'
  //   };
  //   return this.authenticate(credentials);
  // }

  /**
   * Sauvegarde les données d'authentification
   */
  private saveAuthData(authData: any): void {
    if (authData.token) {
      localStorage.setItem(this.TOKEN_KEY, authData.token);
    }
    if (authData.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    }
    if (authData.utilisateur) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(authData.utilisateur));
    }
  }

  /**
   * Récupère le token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Récupère le refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Récupère les informations de l'utilisateur connecté
   */
  getCurrentUser(): any {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  hasRole(profile: string): boolean {
    const user = this.getCurrentUser();
    return user && user.profile === profile;
  }

  /**
   * Vérifie si l'utilisateur est ADMIN
   */
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Rafraîchit le token
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post(`${this.baseUrl}auth/refresh-token`, { refreshToken }, { headers })
      .pipe(
        tap((response: any) => {
          if (response.success && response.data) {
            this.saveAuthData(response.data);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Crée les en-têtes d'authentification
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Gestion des erreurs HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.status === 400) {
        errorMessage = error.error?.message || 'Données invalides';
      } else if (error.status === 401) {
        errorMessage = 'Non autorisé. Veuillez vous reconnecter.';
      } else if (error.status === 403) {
        errorMessage = 'Accès interdit';
      } else if (error.status === 404) {
        errorMessage = 'Ressource non trouvée';
      } else if (error.status === 409) {
        errorMessage = error.error?.message || 'Utilisateur déjà existant';
      } else if (error.status === 500) {
        errorMessage = 'Erreur interne du serveur';
      }
    }
    
    console.error('Erreur AuthService:', error);
    return throwError(() => new Error(errorMessage));
  }
}