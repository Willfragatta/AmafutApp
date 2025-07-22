import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GoalService } from '../services/goal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './metas.html',
  styleUrl: './metas.scss'
})
export class Metas implements OnInit {
  private goalService = inject(GoalService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  metas: any[] = [];
  loading = true;
  userId: string | undefined;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userId = user?._id;
    this.loadMetas();
  }

  loadMetas() {
    this.loading = true;
    if (this.userId) {
      this.goalService.getGoalsByAthlete(this.userId).subscribe({
        next: (res) => { this.metas = res.goals || []; },
        error: () => { this.snackBar.open('Erro ao carregar metas', 'Fechar', { duration: 4000 }); },
        complete: () => { this.loading = false; }
      });
    }
  }

  marcarConcluida(meta: any) {
    this.goalService.updateGoalStatus(meta._id, 'concluida').subscribe({
      next: () => {
        this.snackBar.open('Meta marcada como concluída!', 'Fechar', { duration: 3000 });
        this.loadMetas();
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar meta', 'Fechar', { duration: 4000 });
      }
    });
  }
}
