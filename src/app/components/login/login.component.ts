import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  appTitle = 'MinaPro';
  appLogo = '/logo.png'; // Ajustez le chemin selon votre structure
  
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.error = '';
    
    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;

    try {
      // Appel API pour la connexion
      const response = await this.http.post<any>('/api/auth/login', {
        email: this.email,
        password: this.password
      }, {
        withCredentials: true
      }).toPromise();

      // Redirection vers le dashboard après connexion réussie
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      const errorMessage = err.error?.message || 'Une erreur est survenue';
      this.error = errorMessage;
    } finally {
      this.loading = false;
    }
  }
}