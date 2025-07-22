import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '../services/event.service';
import { GoalService } from '../services/goal.service';
import { AthleteAnalysisService } from '../services/athlete-analysis.service';

@Component({
  selector: 'app-info-equipe',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './info-equipe.html',
  styleUrl: './info-equipe.scss'
})
export class InfoEquipe implements OnInit {
  private eventService = inject(EventService);
  private goalService = inject(GoalService);
  private analysisService = inject(AthleteAnalysisService);
  eventos: any[] = [];
  metas: any[] = [];
  analises: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (res) => { this.eventos = res.events || []; },
      complete: () => { this.loading = false; }
    });
    this.goalService.getAllGoals().subscribe({
      next: (res) => { this.metas = res.goals || []; }
    });
    this.analysisService.getAllAnalyses().subscribe({
      next: (res) => { this.analises = res.analyses || []; }
    });
  }
}
