import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AthleteAnalysisService {
  private apiUrl = 'http://localhost:5000/api/athlete-analyses';

  constructor(private http: HttpClient) {}

  getAllAnalyses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAnalysesByAthlete(atletaId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/athlete/${atletaId}`);
  }

  getAnalysisById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAnalysis(analysis: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, analysis);
  }

  updateAnalysis(id: string, analysis: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, analysis);
  }

  deleteAnalysis(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
} 