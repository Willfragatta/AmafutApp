import { Injectable } from '@angular/core'; // Injectable usei pra criar o guard
import { CanActivate, Router } from '@angular/router'; // CanActivate usei pra verificar se o usuário pode acessar a página
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService, // pra autenticar o usuário
    private router: Router // pra redirecionar as páginas
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
} 