import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './notificacoes.html',
  styleUrl: './notificacoes.scss'
})
export class Notificacoes implements OnInit {
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  notificacoes: any[] = [];
  loading = true;
  userId: string | undefined;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userId = user?._id;
    this.loadNotificacoes();
  }

  loadNotificacoes() {
    this.loading = true;
    if (this.userId) {
      this.notificationService.getNotificationsByUser(this.userId).subscribe({
        next: (res) => { this.notificacoes = res.notifications || []; },
        error: () => { this.snackBar.open('Erro ao carregar notificações', 'Fechar', { duration: 4000 }); },
        complete: () => { this.loading = false; }
      });
    }
  }

  marcarLida(notificacao: any) {
    this.notificationService.markAsRead(notificacao._id).subscribe({
      next: () => {
        this.snackBar.open('Notificação marcada como lida!', 'Fechar', { duration: 3000 });
        this.loadNotificacoes();
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar notificação', 'Fechar', { duration: 4000 });
      }
    });
  }
}
