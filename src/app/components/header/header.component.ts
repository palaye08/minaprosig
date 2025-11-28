import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() sidebarOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  currentDate = new Date();
  notifications = [
    { id: 1, text: 'Nouvelle session de coaching planifiée', time: 'Il y a 2h', unread: true },
    { id: 2, text: 'Rapport mensuel disponible', time: 'Il y a 5h', unread: true },
    { id: 3, text: 'Objectif atteint: Chiffre d\'affaires', time: 'Hier', unread: false }
  ];
  showNotifications = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }
}