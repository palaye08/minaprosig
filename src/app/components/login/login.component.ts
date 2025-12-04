import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  // SUPPRIMÉ: Ne pas fournir AuthService ici, il est déjà providedIn: 'root'
  templateUrl: './login.component.html'
})
export class LoginComponent {
  appTitle = 'MinaPro';
  appLogo = '/logo-minapro.png';
  
  email = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.error = '';
    
    // Validation des champs
    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }
  
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Veuillez entrer une adresse email valide';
      return;
    }
  
    // Validation mot de passe
    if (this.password.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }
  
    this.loading = true;
  
    // Appel au service d'authentification
    this.authService.authenticate({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.success) {
          console.log('Connexion réussie:', response);
          
          // Déterminer la redirection en fonction du profil
          this.redirectBasedOnProfile(response.data.utilisateur);
        } else {
          this.error = response.message || 'Échec de la connexion';
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Erreur de connexion:', error);
        
        // Gestion des erreurs spécifiques
        if (error.status === 401) {
          this.error = 'Email ou mot de passe incorrect';
        } else if (error.status === 0) {
          this.error = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else {
          this.error = error.message || 'Une erreur est survenue lors de la connexion';
        }
      }
    });
  }

  /**
   * Redirige l'utilisateur en fonction de son profil
   */
  private redirectBasedOnProfile(user: any): void {
    if (!user || !user.profile) {
      this.router.navigate(['/beneficiaire/dashboard']);
      return;
    }

    switch (user.profile) {
      case 'ADMIN':
        this.router.navigate(['/admin/beneficiaires']);
        break;
      case 'BENEFICIAIRE':
        this.router.navigate(['/beneficiaire/dashboard']);
        break;
      case 'COACH':
        this.router.navigate(['/coach/dashboard']);
        break;
      default:
        this.router.navigate(['/beneficiaire/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Pour la démo - à retirer en production
  fillDemoCredentials(): void {
    this.email = 'palaye@yopmail.com';
    this.password = 'passer123';
  }

  // Méthode pour se connecter avec les identifiants de démo
  loginWithDemo(): void {
    this.fillDemoCredentials();
    // Déclencher la soumission après avoir rempli les champs
    setTimeout(() => {
      const event = new Event('submit', { cancelable: true });
      this.onSubmit(event);
    }, 100);
  }
}