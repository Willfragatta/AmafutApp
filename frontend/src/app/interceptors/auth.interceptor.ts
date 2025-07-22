import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core'; // inject usei pra injetar o AuthService e o Router
import { Router } from '@angular/router'; // Router usei pra redirecionar as páginas
import { catchError, throwError } from 'rxjs'; // catchError usei pra tratar os erros
import { AuthService } from '../services/auth.service'; // AuthService usei pra autenticar o usuário

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // pra autenticar o usuário
  const router = inject(Router); // pra redirecionar as páginas

  // Obtém o token do localStorage
  const token = authService.getToken(); // pra pegar o token do localStorage

  // Se existe um token, adiciona no header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Processa a requisição e trata erros
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o erro for 401 (não autorizado), faz logout e redireciona
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}; 