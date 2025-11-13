import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

  constructor(private router: Router) {}

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

    // Simulation de connexion (remplacer par votre logique réelle)
    setTimeout(() => {
      // Ici vous ajouterez votre logique d'authentification réelle
      // Pour l'instant, on simule une connexion réussie
      this.loading = false;
      
      // Exemple de validation simple (à remplacer)
      if (this.email && this.password) {
        // Stockage du token ou session (exemple)
        sessionStorage.setItem('user', JSON.stringify({ email: this.email }));
        
        // Redirection vers le dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Email ou mot de passe incorrect';
      }
    }, 1500);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Pour la démo - à retirer en production
  fillDemoCredentials(): void {
    this.email = 'demo@minapro.com';
    this.password = 'demo123';
  }
}