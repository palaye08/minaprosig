import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  // Données utilisateur
  userName = 'Amina Diagne';
  userRole = 'Bénéficiaire';
  userAvatar = '👩🏾‍💼';

  menuItems: MenuItem[] = [
    { icon: '📊', label: 'Dashboard', route: '/beneficiaire/dashboard' },
    { icon: '👤', label: 'Mon Profil', route: '/beneficiaire/profil' },
    { icon: '📚', label: 'Mes Activités', route: '/beneficiaire/activites', badge: '3' },
    { icon: '💬', label: 'Mes Coachings', route: '/beneficiaire/coachings' },
    { icon: '🎯', label: 'Mes Objectifs', route: '/beneficiaire/objectifs', badge: '5' },
    { icon: '📁', label: 'Mes Documents', route: '/beneficiaire/documents' },
    { icon: '⭐', label: 'Mon Score', route: '/beneficiaire/score' }
  ];

  onToggle() {
    this.toggleSidebar.emit();
  }

  logout() {
    // Logique de déconnexion
    console.log('Déconnexion...');
  }
}