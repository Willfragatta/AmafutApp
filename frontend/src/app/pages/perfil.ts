import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class Perfil implements OnInit { // pra criar o componente
  private userService = inject(UserService); // pra autenticar o usuário
  private authService = inject(AuthService); // pra autenticar o usuário
  private snackBar = inject(MatSnackBar); // pra criar o snackbar
  form: FormGroup;
  loading = true;
  user: any = null;
  isAdmin = false;

  constructor() {
    this.form = inject(FormBuilder).group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rg: [''],
      cpf: [''],
      posicao: [''],
      altura: [''],
      data_nascimento: [''],
      idade: ['']
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user || {};
        this.form.patchValue({
          name: this.user.name,
          email: this.user.email,
          rg: this.user.rg,
          cpf: this.user.cpf,
          posicao: this.user.posicao,
          altura: this.user.altura,
          data_nascimento: this.user.data_nascimento ? this.user.data_nascimento.substring(0, 10) : '',
          idade: this.user.idade
        });
      },
      error: () => {
        this.snackBar.open('Erro ao carregar perfil', 'Fechar', { duration: 4000 });
      },
      complete: () => { this.loading = false; }
    });
  }

  saveProfile() {
    if (this.form.invalid) return;
    const data = { ...this.form.value };
    // Converter altura e idade para número, se preenchidos
    if (data.altura) data.altura = Number(data.altura);
    if (data.idade) data.idade = Number(data.idade);
    this.userService.updateProfile(data).subscribe({
      next: () => {
        this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.loadProfile();
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar perfil', 'Fechar', { duration: 4000 });
      }
    });
  }

  deleteProfile() {
    if (!confirm('Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.')) return;
    this.userService.deleteProfile().subscribe({
      next: () => {
        this.snackBar.open('Perfil excluído com sucesso!', 'Fechar', { duration: 3000 });
        // Redirecionar para login ou página inicial após exclusão
        window.location.href = '/login';
      },
      error: () => {
        this.snackBar.open('Erro ao excluir perfil', 'Fechar', { duration: 4000 });
      }
    });
  }
}
