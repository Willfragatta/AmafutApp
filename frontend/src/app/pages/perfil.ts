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
export class Perfil implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup;
  loading = true;
  user: any = null;
  isAdmin = false;

  constructor() {
    this.form = inject(FormBuilder).group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Campos adicionais podem ser adicionados aqui
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
          email: this.user.email
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
    this.userService.updateProfile(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.loadProfile();
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar perfil', 'Fechar', { duration: 4000 });
      }
    });
  }
}
