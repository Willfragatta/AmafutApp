import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  getPendingUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pending`);
  }

  approveUser(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectUser(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reject/${id}`, {});
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, data);
  }
} 