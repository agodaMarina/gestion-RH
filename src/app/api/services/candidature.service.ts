import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature, CandidatureCreation } from '../models/Candidature';

@Injectable({
  providedIn: 'root',
})
export class CandidatureService {
  baseUrl = 'http://localhost:8000/candidature';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.baseUrl}/lister`);
  }

  getCandidatureById(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.baseUrl}/${id}`);
  }

  listerParRecrutement(id: number): Observable<CandidatureCreation[]> {
    return this.http.get<CandidatureCreation[]>(`${this.baseUrl}/listerParRecrutement`, {
      params: { id: id.toString() }
    });
  }

  create(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.baseUrl + '/ajouter', candidature);
  }

  updateCandidature(candidature: Candidature): Observable<Candidature> {
    return this.http.put<Candidature>(
      `${this.baseUrl}/modifier`,
      candidature
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`);
  }

  exportToExcel():Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseUrl+"/export",{ headers, responseType: 'blob' });
  }
}
