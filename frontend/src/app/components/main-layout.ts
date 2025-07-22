import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'; // Sidenav usei pra esconder o menu
import { MatToolbarModule } from '@angular/material/toolbar'; // Toolbar usei pra colocar o toolbar no menu
import { MatIconModule } from '@angular/material/icon'; // Icones usei pra colocar os icones no menu
import { MatListModule } from '@angular/material/list'; // Lista usei pra colocar os itens no menu  
import { MatButtonModule } from '@angular/material/button'; // Botão usei pra colocar o botão de logout
import { MatBadgeModule } from '@angular/material/badge'; // Badge usei pra colocar o badge de notificações
import { AuthService } from '../services/auth.service'; // Pra autenticar o usuário
import { User } from '../models/user.model';  

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  user: User | null = null;
  isAdmin = false;
  isAthlete = false;
  notificationsCount = 0;
  sidenavOpened = false;

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();
    this.isAthlete = this.authService.isAthlete();
    // TODO: Buscar notificações não lidas do backend
    // this.notificationsCount = ...
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  goToNotifications() {
    this.router.navigate(['/notificacoes']);
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
