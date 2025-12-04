import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
  roles?: string[]; // Rôles autorisés pour ce menu
  separator?: boolean; // Pour ajouter un séparateur visuel
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  // Données utilisateur - Récupérées depuis AuthService
  userName = '';
  userRole: 'ADMIN' | 'BENEFICIAIRE' | 'COACH' = 'BENEFICIAIRE';
  userAvatar = '👤';
  currentUser: any = null;

  // Tous les items du menu (Bénéficiaire + Admin)
  allMenuItems: MenuItem[] = [
    // ====== MENU ADMIN ======
    { 
      icon: '📊', 
      label: 'Dashboard', 
      route: '/beneficiaire/dashboard',
      roles: ['ADMIN']
    },
    { 
      icon: '👥', 
      label: 'Bénéficiaires', 
      route: '/admin/beneficiaires',
      roles: ['ADMIN']
    },
    { 
      icon: '📚', 
      label: 'Programmes', 
      route: '/admin/programmes',
      roles: ['ADMIN']
    },
    // { 
    //   icon: '📊', 
    //   label: 'Participations', 
    //   route: '/admin/participations',
    //   roles: ['ADMIN']
    // },
    { 
      icon: '👤', 
      label: 'Mon Profil', 
      route: '/beneficiaire/profil',
      roles: ['ADMIN', 'BENEFICIAIRE', 'COACH'] // Accessible à tous
    },
    
    // ====== MENU BÉNÉFICIAIRE ======
    { 
      icon: '📊', 
      label: 'Dashboard', 
      route: '/beneficiaire/dashboard',
      roles: ['BENEFICIAIRE']
    },
    { 
      icon: '📚', 
      label: 'Mes Activités', 
      route: '/beneficiaire/activites', 
      badge: '3',
      roles: ['BENEFICIAIRE']
    },
    { 
      icon: '💬', 
      label: 'Mes Coachings', 
      route: '/beneficiaire/coachings',
      roles: ['BENEFICIAIRE']
    },
    { 
      icon: '🎯', 
      label: 'Mes Objectifs', 
      route: '/beneficiaire/objectifs', 
      badge: '5',
      roles: ['BENEFICIAIRE']
    },
    { 
      icon: '📁', 
      label: 'Mes Documents', 
      route: '/beneficiaire/documents',
      roles: ['BENEFICIAIRE']
    },
    { 
      icon: '⭐', 
      label: 'Mon Score', 
      route: '/beneficiaire/score',
      roles: ['BENEFICIAIRE']
    }
  ];

  // Menu filtré selon le rôle de l'utilisateur
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.filterMenuByRole();
  }

  // Charge l'utilisateur connecté depuis le service
  loadCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      // Récupérer le nom complet
      this.userName = `${this.currentUser.prenom || ''} ${this.currentUser.nom || ''}`.trim() || 'Utilisateur';
      
      // Récupérer le rôle/profil
      this.userRole = this.currentUser.profile || 'BENEFICIAIRE';
      
      // Définir l'avatar selon le genre et le rôle
      this.setUserAvatar();
    } else {
      // Valeurs par défaut si pas d'utilisateur connecté
      this.userName = 'Invité';
      this.userRole = 'BENEFICIAIRE';
      this.userAvatar = '👤';
    }
  }

  // Définit l'avatar selon le genre et le rôle
  setUserAvatar() {
    if (this.userRole === 'ADMIN') {
      this.userAvatar = this.currentUser.genre === 'FEMININ' ? '👩‍💼' : '👨‍💼';
    } else if (this.userRole === 'COACH') {
      this.userAvatar = this.currentUser.genre === 'FEMININ' ? '👩‍🏫' : '👨‍🏫';
    } else {
      this.userAvatar = this.currentUser.genre === 'FEMININ' ? '👩🏾‍💼' : '👨🏾‍💼';
    }
  }

  // Filtre le menu selon le rôle de l'utilisateur
  filterMenuByRole() {
    this.menuItems = this.allMenuItems.filter(item => 
      !item.roles || item.roles.includes(this.userRole)
    );
  }

  onToggle() {
    this.toggleSidebar.emit();
  }

  logout() {
    // Déconnexion via le service
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Obtenir le label du rôle en français
  getRoleLabel(): string {
    const roleLabels: { [key: string]: string } = {
      'ADMIN': 'Administrateur',
      'BENEFICIAIRE': 'Bénéficiaire',
      'COACH': 'Coach'
    };
    return roleLabels[this.userRole] || 'Utilisateur';
  }

  // Obtenir la couleur du rôle
  getRoleColor(): string {
    const roleColors: { [key: string]: string } = {
      'ADMIN': 'text-purple-600',
      'BENEFICIAIRE': 'text-blue-600',
      'COACH': 'text-green-600'
    };
    return roleColors[this.userRole] || 'text-gray-600';
  }

  // Obtenir la première lettre du menu pour la vue réduite
  getShortLabel(label: string): string {
    const words = label.split(' ');
    return words.length > 1 ? words[1] : words[0];
  }
}