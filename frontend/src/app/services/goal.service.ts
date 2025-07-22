import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private apiUrl = 'http://localhost:5000/api/goals';

  constructor(private http: HttpClient) {}

  getAllGoals(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getGoalsByAthlete(atletaId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/athlete/${atletaId}`);
  }

  getGoalById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createGoal(goal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, goal);
  }

  updateGoal(id: string, goal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, goal);
  }

  deleteGoal(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateGoalStatus(id: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, { status });
  }
} 