import { Component } from '@angular/core'; // Component usei pra criar o componente
import { CommonModule } from '@angular/common'; // CommonModule usei pra importar o módulo comum
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // FormBuilder usei pra criar o formulário
import { Router } from '@angular/router'; // Router usei pra redirecionar as páginas
import { MatCardModule } from '@angular/material/card'; // MatCardModule usei pra criar o card
import { MatFormFieldModule } from '@angular/material/form-field'; // MatFormFieldModule usei pra criar o formulário
import { MatInputModule } from '@angular/material/input'; // MatInputModule usei pra criar o input
import { MatButtonModule } from '@angular/material/button'; // MatButtonModule usei pra criar o botão
import { MatIconModule } from '@angular/material/icon'; // MatIconModule usei pra criar o ícone
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBar usei pra criar o snackbar
import { AuthService } from '../../services/auth.service'; // AuthService usei pra autenticar o usuário
import { LoginRequest } from '../../models/user.model'; // LoginRequest usei pra criar o login

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const credentials: LoginRequest = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            
            // Redireciona baseado no role do usuário
            const user = this.authService.getCurrentUser();
            if (user?.role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (error) => {
          this.loading = false;
          const errorMessage = error.error?.error || 'Erro ao fazer login. Tente novamente.';
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  // Marca todos os campos como touched para mostrar erros
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para facilitar o acesso aos campos no template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Navega para a página de registro
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
