import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature, CandidatureCreation } from '../models/Candidature';
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

  addRecrutement(posteId: number, recruteurId: number, nouveauPoste?: Poste): Observable<number> {
    const params: any = { posteId, recruteurId };
    return this.http.post<number>(`${this.baseUrl}/add`, nouveauPoste || {}, { params });
  }

  ajouterCandidats(recrutementId: number, candidatsRequest: CandidatureCreation[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/add/candidature`, candidatsRequest, {
      params: { recrutementId }
    });
  }
  getRecrutementById(recrutementId: number): Observable<RecrutementDto> {
    return this.http.get<RecrutementDto>(`${this.baseUrl}/${recrutementId}`);
  }

  getCandidats(recrutementId: number): Observable<CandidatureCreation[]> {
    return this.http.get<CandidatureCreation[]>(`${this.baseUrl}/${recrutementId}/allCandidates`);
  }

  evaluation(recrutementId: number, evaluationsRequest: Evaluation[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${recrutementId}/evaluations`, evaluationsRequest);
  }

  endRecrutement(recrutementId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/end`,{
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
