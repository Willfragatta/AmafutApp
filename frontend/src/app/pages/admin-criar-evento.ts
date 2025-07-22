import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-criar-evento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-criar-evento.html',
  styleUrl: './admin-criar-evento.scss'
})
export class AdminCriarEvento implements OnInit {
  private eventService = inject(EventService);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup;
  loading = false;
  atletas: any[] = [];
  atletasConvocaveis: any[] = [];

  constructor() {
    this.form = inject(FormBuilder).group({
      modalidade: ['', Validators.required],
      data: ['', Validators.required],
      horario: ['', Validators.required],
      local: ['', [Validators.required, Validators.maxLength(20)]],
      contra: [''],
      nome_competicao: [''],
      fase: [''],
      observacoes: [''],
      atletas_convocados: this.fb.array([])
    });
  }

  get fb() { return inject(FormBuilder); }
  get atletasConvocados(): FormArray { return this.form.get('atletas_convocados') as FormArray; }

  ngOnInit(): void {
    this.loadAtletas();
    this.form.get('modalidade')?.valueChanges.subscribe(modalidade => {
      this.updateValidators(modalidade);
    });
  }

  loadAtletas() {
    // Buscar todos os atletas aprovados e não lesionados
    this.userService.getPendingUsers().subscribe({
      next: (res) => {
        this.atletas = (res.users || []).filter((u: any) => u.role === 'atleta' && u.status === 'approved');
        this.atletasConvocaveis = this.atletas.filter((a: any) => !a.lesao || a.lesao === 'nao');
      }
    });
  }

  updateValidators(modalidade: string) {
    const contra = this.form.get('contra');
    const nome_competicao = this.form.get('nome_competicao');
    const fase = this.form.get('fase');
    // Limpar validações
    contra?.clearValidators();
    nome_competicao?.clearValidators();
    fase?.clearValidators();
    // Aplicar regras
    if (modalidade === 'amistoso' || modalidade === 'campeonato') {
      contra?.setValidators([Validators.required, Validators.maxLength(20)]);
    }
    if (modalidade === 'campeonato') {
      nome_competicao?.setValidators([Validators.required, Validators.maxLength(20)]);
      fase?.setValidators([Validators.required]);
    }
    contra?.updateValueAndValidity();
    nome_competicao?.updateValueAndValidity();
    fase?.updateValueAndValidity();
  }

  toggleConvocado(atleta: any, checked: boolean) {
    const arr = this.atletasConvocados;
    if (checked) {
      arr.push(this.fb.control(atleta._id));
    } else {
      const idx = arr.controls.findIndex(c => c.value === atleta._id);
      if (idx > -1) arr.removeAt(idx);
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const data = {
      ...this.form.value,
      atletas_convocados: this.atletasConvocados.value
    };
    this.eventService.createEvent(data).subscribe({
      next: () => {
        this.snackBar.open('Evento criado com sucesso!', 'Fechar', { duration: 3000 });
        this.form.reset();
        this.atletasConvocados.clear();
      },
      error: () => {
        this.snackBar.open('Erro ao criar evento', 'Fechar', { duration: 4000 });
      },
      complete: () => { this.loading = false; }
    });
  }
}
