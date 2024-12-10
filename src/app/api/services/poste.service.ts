import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from '../models/Poste';

@Injectable({
  providedIn: 'root',
})
export class PosteService {
  baseurl = 'http://localhost:8000/poste';

  constructor(private http: HttpClient) {}

  getAllPostes(): Observable<object[]> {
    return this.http.get<object[]>(this.baseurl + '/lister');
  }

  getPosteById(id: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.baseurl}/${id}`);
  }

  createPoste(poste: object): Observable<object> {
    return this.http.post<object>(this.baseurl + '/ajouter', poste);
  }

  updatePoste(id: number, poste: Poste): Observable<Poste> {
    return this.http.put<Poste>(`${this.baseurl}/modifier/${id}`, poste);
  }

  deletePoste(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
  }
}
