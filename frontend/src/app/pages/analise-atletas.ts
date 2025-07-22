import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AthleteAnalysisService } from '../services/athlete-analysis.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-analise-atletas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './analise-atletas.html',
  styleUrl: './analise-atletas.scss'
})
export class AnaliseAtletas implements OnInit {
  private analysisService = inject(AthleteAnalysisService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  analyses: any[] = [];
  loading = true;
  isAdmin = false;
  userId: string | undefined;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    const user = this.authService.getCurrentUser();
    this.userId = user?._id;
    this.loadAnalyses();
  }

  loadAnalyses() {
    this.loading = true;
    if (this.isAdmin) {
      this.analysisService.getAllAnalyses().subscribe({
        next: (res) => { this.analyses = res.analyses || []; },
        error: () => { this.snackBar.open('Erro ao carregar análises', 'Fechar', { duration: 4000 }); },
        complete: () => { this.loading = false; }
      });
    } else if (this.userId) {
      this.analysisService.getAnalysesByAthlete(this.userId).subscribe({
        next: (res) => { this.analyses = res.analyses || []; },
        error: () => { this.snackBar.open('Erro ao carregar análises', 'Fechar', { duration: 4000 }); },
        complete: () => { this.loading = false; }
      });
    }
  }
}
