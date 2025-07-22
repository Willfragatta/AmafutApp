import { Injectable } from '@angular/core'; // usado para criar o serviço
import { HttpClient } from '@angular/common/http'; // usado para fazer requisições HTTP
import { BehaviorSubject, Observable, tap } from 'rxjs'; // usado para trabalhar com observables
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model'; // usado para definir os modelos de usuário

@Injectable({
  providedIn: 'root' // usado para criar o serviço
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'; // usado para definir a URL da API
  private currentUserSubject = new BehaviorSubject<User | null>(null); // usado para definir o usuário atual
  public currentUser$ = this.currentUserSubject.asObservable(); // usado para definir o usuário atual

  constructor(private http: HttpClient) { // usado para fazer requisições HTTP
    this.loadUserFromStorage(); // usado para carregar o usuário do localStorage
  }

  // Carrega o usuário do localStorage se existir
  private loadUserFromStorage(): void { // usado para carregar o usuário do localStorage
    const token = localStorage.getItem('token'); // usado para definir o token
    const user = localStorage.getItem('user'); // usado para definir o usuário
    
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user)); // usado para definir o usuário atual
    }
  }

  // Registra um novo usuário
  register(userData: RegisterRequest): Observable<AuthResponse> { // usado para registrar um novo usuário
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setAuthData(response.token, response.user);
          }
        })
      );
  }

  // Faz login do usuário
  login(credentials: LoginRequest): Observable<AuthResponse> { // usado para fazer login do usuário
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setAuthData(response.token, response.user);
          }
        })
      );
  }

  // Define os dados de autenticação
  private setAuthData(token: string, user?: User): void { // usado para definir os dados de autenticação
    localStorage.setItem('token', token); // usado para definir o token
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // usado para definir o usuário
      this.currentUserSubject.next(user);
    }
  }

  // Faz logout do usuário
  logout(): void { // usado para fazer logout do usuário
    localStorage.removeItem('token'); // usado para remover o token
    localStorage.removeItem('user'); // usado para remover o usuário
    this.currentUserSubject.next(null); // usado para definir o usuário atual
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean { // usado para verificar se o usuário está autenticado
    return !!localStorage.getItem('token'); // usado para verificar se o token existe
  }

  // Obtém o token atual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtém o usuário atual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verifica se o usuário é admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Verifica se o usuário é atleta
  isAthlete(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'atleta';
  }
} 