import { Component } from '@angular/core'; // Component usei pra criar o componente
import { CommonModule } from '@angular/common'; // CommonModule usei pra importar o módulo comum
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms'; // FormBuilder usei pra criar o formulário
import { Router } from '@angular/router'; // Router usei pra redirecionar as páginas
import { MatCardModule } from '@angular/material/card'; // MatCardModule usei pra criar o card
import { MatFormFieldModule } from '@angular/material/form-field'; // MatFormFieldModule usei pra criar o formulário
import { MatInputModule } from '@angular/material/input'; // MatInputModule usei pra criar o input
import { MatButtonModule } from '@angular/material/button'; // MatButtonModule usei pra criar o botão
import { MatIconModule } from '@angular/material/icon'; // MatIconModule usei pra criar o ícone
import { MatSelectModule } from '@angular/material/select'; // MatSelectModule usei pra criar o select
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBar usei pra criar o snackbar
import { AuthService } from '../../services/auth.service'; // AuthService usei pra autenticar o usuário
import { RegisterRequest } from '../../models/user.model'; // RegisterRequest usei pra criar o registro

@Component({
  selector: 'app-register', // pra chamar o componente
  standalone: true, // pra usar o componente em outro componente
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup; // pra criar o formulário
  loading = false; // pra verificar se o formulário está carregando
  hidePassword = true; // pra esconder a senha
  hideConfirmPassword = true; // pra esconder a confirmação de senha

  constructor(
    private fb: FormBuilder, // pra criar o formulário
    private authService: AuthService, // pra autenticar o usuário
    private router: Router, // pra redirecionar as páginas
    private snackBar: MatSnackBar // pra criar o snackbar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['atleta', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador customizado para verificar se as senhas coincidem
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const { confirmPassword, ...userData }: RegisterRequest & { confirmPassword: string } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Conta criada com sucesso!', 'Fechar', {
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
          const errorMessage = error.error?.error || 'Erro ao criar conta. Tente novamente.';
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
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para facilitar o acesso aos campos no template
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get role() {
    return this.registerForm.get('role');
  }

  // Verifica se as senhas não coincidem
  get passwordMismatch(): boolean {
    return this.registerForm.hasError('passwordMismatch') && 
           !!this.confirmPassword?.touched;
  }

  // Navega para a página de login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
