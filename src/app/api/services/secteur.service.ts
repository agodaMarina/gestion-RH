import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secteur } from '../models/secteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {
  baseurl = 'http://localhost:8000/secteur';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.baseurl + '/lister');
  }

  getSecteurById(id: number): Observable<Secteur> {
    return this.http.get<Secteur>(`${this.baseurl}/${id}`);
  }

  create(secteur: Secteur): Observable<Secteur> {
    return this.http.post<Secteur>(this.baseurl + '/ajouter', secteur);
  }

  update(id: number, secteur: Secteur): Observable<Secteur> {
    return this.http.put<Secteur>(`${this.baseurl}/modifier/${id}`, secteur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
  }
}
