import { Injectable } from '@angular/core'; // usado para criar o serviço
import { HttpClient } from '@angular/common/http'; // usado para fazer requisições HTTP
import { Observable } from 'rxjs'; // usado para trabalhar com observables

@Injectable({ providedIn: 'root' }) // usado para criar o serviço
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // usado para definir a URL da API

  constructor(private http: HttpClient) {} // usado para fazer requisições HTTP

  getPendingUsers(): Observable<any> { // usado para buscar usuários pendentes
    return this.http.get<any>(`${this.apiUrl}/pending`);
  }

  approveUser(id: string): Observable<any> { // usado para aprovar um usuário
    return this.http.put<any>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectUser(id: string): Observable<any> { // usado para rejeitar um usuário
    return this.http.put<any>(`${this.apiUrl}/reject/${id}`, {});
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/me`, data);
  }

  deleteProfile(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/me`);
  }
} 