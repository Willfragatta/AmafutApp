import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { NotificationService } from '../services/notification.service';
import { GoalService } from '../services/goal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private eventService = inject(EventService);
  private notificationService = inject(NotificationService);
  private goalService = inject(GoalService);
  private authService = inject(AuthService);
  private router = inject(Router);

  events: any[] = [];
  notifications: any[] = [];
  goals: any[] = [];
  loading = true;
  userId: string | undefined;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userId = user?._id;
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events = (res.events || []).slice(0, 3);
      },
      error: () => {},
      complete: () => { this.loading = false; }
    });
    if (this.userId) {
      this.notificationService.getNotificationsByUser(this.userId).subscribe({
        next: (res) => {
          this.notifications = (res.notifications || []).slice(0, 3);
        }
      });
      this.goalService.getGoalsByAthlete(this.userId).subscribe({
        next: (res) => {
          this.goals = (res.goals || []).filter((g: any) => g.status === 'em_progresso').slice(0, 3);
        }
      });
    }
  }

  goToEventos() {
    this.router.navigate(['/eventos']);
  }
  goToNotificacoes() {
    this.router.navigate(['/notificacoes']);
  }
  goToMetas() {
    this.router.navigate(['/metas']);
  }
}
