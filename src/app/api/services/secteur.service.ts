import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecteurDto } from '../models/secteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {
  baseurl = 'http://localhost:8000/secteur';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SecteurDto[]> {
    return this.http.get<SecteurDto[]>(this.baseurl + '/lister');
  }

  getSecteurById(id: number): Observable<SecteurDto> {
    return this.http.get<SecteurDto>(`${this.baseurl}/${id}`);
  }

  create(secteur: SecteurDto): Observable<SecteurDto> {
    return this.http.post<SecteurDto>(this.baseurl + '/ajouter', secteur);
  }

  update(id: number, secteur: SecteurDto): Observable<SecteurDto> {
    return this.http.put<SecteurDto>(`${this.baseurl}/modifier/${id}`, secteur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
  }
}
