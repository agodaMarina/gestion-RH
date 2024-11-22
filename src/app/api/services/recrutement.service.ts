import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../models/Candidature';
import { Evaluation } from '../models/evaluation';
import { Poste } from '../models/Poste';
import { Recrutement } from '../models/recrutement';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

  private baseUrl = 'http://localhost:8000/recrutement';

  constructor(private http: HttpClient) {}

  addRecrutement(posteId: number, recruteurId: number, nouveauPoste?: Poste): Observable<void> {
    const params: any = { posteId, recruteurId };
    return this.http.post<void>(`${this.baseUrl}/add`, nouveauPoste || {}, { params });
  }

  ajouterCandidats(recrutementId: number, candidatsRequest: Candidature[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/add/candidature`, candidatsRequest, {
      params: { recrutementId }
    });
  }

  evaluation(recrutementId: number, evaluationsRequest: Evaluation[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${recrutementId}/evaluations`, evaluationsRequest);
  }

  endRecrutement(recrutementId: number, ids: number[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/end`, ids, {
      params: { recrutementId }
    });
  }

  getAll(): Observable<Recrutement[]> {
    return this.http.get<Recrutement[]>(`${this.baseUrl}/all`);
  }
}
