import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../models/Candidature';
import { Evaluation } from '../models/evaluation';
import { Poste } from '../models/Poste';
import { Recrutement, RecrutementDto } from '../models/recrutement';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

  private baseUrl = 'http://localhost:8000/recrutement';
  private recrutementIdSignal: WritableSignal<number | null> = signal(null);


  constructor(private http: HttpClient) {}

  addRecrutement(posteId: number, recruteurId: number, nouveauPoste?: Poste): Observable<object> {
    const params: any = { posteId, recruteurId };
    return this.http.post<object>(`${this.baseUrl}/add`, nouveauPoste || {}, { params });
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

  getAll(): Observable<RecrutementDto[]> {
    return this.http.get<RecrutementDto[]>(`${this.baseUrl}/all`);
  }
  setRecrutementId(id: number): void {
    this.recrutementIdSignal.set(id);
  }

  getRecrutementId(): number | null {
    return this.recrutementIdSignal();
  }

  recrutementId() {
    return this.recrutementIdSignal;
  }
}
