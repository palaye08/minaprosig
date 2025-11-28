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
  
    // Simulation de connexion
    setTimeout(() => {
      this.loading = false;
      
      if (this.email && this.password) {
        sessionStorage.setItem('user', JSON.stringify({ email: this.email }));
        
        // 🔥 CHANGEZ ICI : /dashboard → /beneficiaire/dashboard
        this.router.navigate(['/beneficiaire/dashboard']);
      } else {
        this.error = 'Email ou mot de passe incorrect';
      }
    }, 1500);
  }
  

  NavigateToDashboard() {
    this.router.navigate(['/beneficiaire/dashboard']);
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