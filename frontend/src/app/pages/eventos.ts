import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './eventos.html',
  styleUrl: './eventos.scss'
})
export class Eventos implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  events: any[] = [];
  loading = true;
  userId: string | undefined;
  confirmForm: FormGroup;
  selectedEvent: any = null;
  confirmLoading = false;
  isAdmin: boolean = false;

  constructor() {
    this.confirmForm = this.fb.group({
      status: ['', Validators.required],
      motivo: ['']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userId = user?._id;
    this.isAdmin = this.authService.isAdmin();
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (res) => {
        let allEvents = res.events || [];
        if (!this.isAdmin && this.userId) {
          // Atleta: só eventos para os quais foi convocado
          this.events = allEvents.filter((ev: any) => Array.isArray(ev.atletas_convocados) && ev.atletas_convocados.some((a: any) => a._id === this.userId));
        } else {
          // Admin: vê todos
          this.events = allEvents;
        }
      },
      error: () => {
        this.snackBar.open('Erro ao carregar eventos', 'Fechar', { duration: 4000 });
      },
      complete: () => { this.loading = false; }
    });
  }

  openConfirmDialog(event: any) {
    this.selectedEvent = event;
    this.confirmForm.reset();
    // Pode abrir um modal customizado futuramente
  }

  confirmPresence(status: 'confirmado' | 'nao_posso') {
    if (!this.selectedEvent) return;
    this.confirmLoading = true;
    const motivo = status === 'nao_posso' ? this.confirmForm.value.motivo : undefined;
    this.eventService.confirmPresence(this.selectedEvent._id, { status, motivo }).subscribe({
      next: () => {
        this.snackBar.open('Confirmação registrada!', 'Fechar', { duration: 3000 });
        this.loadEvents();
        this.selectedEvent = null;
      },
      error: () => {
        this.snackBar.open('Erro ao confirmar presença', 'Fechar', { duration: 4000 });
      },
      complete: () => { this.confirmLoading = false; }
    });
  }

  canConfirm(event: any): boolean {
    // Só pode confirmar se for convocado e o evento estiver ativo
    const user = this.authService.getCurrentUser();
    return event.atletas_convocados?.some((a: any) => a._id === user?._id) && event.status === 'ativo';
  }
}
