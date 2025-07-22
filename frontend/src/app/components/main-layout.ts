import { Component, inject, OnInit } from '@angular/core'; // Component usei pra criar o componente
import { CommonModule } from '@angular/common'; // CommonModule usei pra importar o módulo comum
import { Router, RouterModule } from '@angular/router'; // Router usei pra redirecionar as páginas
import { MatSidenavModule } from '@angular/material/sidenav'; // Sidenav usei pra esconder o menu
import { MatToolbarModule } from '@angular/material/toolbar'; // Toolbar usei pra colocar o toolbar no menu
import { MatIconModule } from '@angular/material/icon'; // Icones usei pra colocar os icones no menu
import { MatListModule } from '@angular/material/list'; // Lista usei pra colocar os itens no menu  
import { MatButtonModule } from '@angular/material/button'; // Botão usei pra colocar o botão de logout
import { MatBadgeModule } from '@angular/material/badge'; // Badge usei pra colocar o badge de notificações
import { AuthService } from '../services/auth.service'; // Pra autenticar o usuário
import { User } from '../models/user.model';  

@Component({
  selector: 'app-main-layout', // pra chamar o componente
  standalone: true, // pra usar o componente em outro componente
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
  authService = inject(AuthService); // pra autenticar o usuário
  router = inject(Router); // pra redirecionar as páginas
  user: User | null = null; // pra pegar o usuário logado
  isAdmin = false; // pra verificar se o usuário é admin
  isAthlete = false; // pra verificar se o usuário é atleta
  notificationsCount = 0; // pra contar as notificações
  sidenavOpened = false; // pra abrir e fechar o menu

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
