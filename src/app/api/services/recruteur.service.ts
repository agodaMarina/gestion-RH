import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruteur } from '../models/recruteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {
  baseurl = 'http://localhost:8000/recruteur';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Recruteur[]> {
    return this.http.get<Recruteur[]>(this.baseurl + '/all');
  }

  getrecruteurById(id: number): Observable<Recruteur> {
    return this.http.get<Recruteur>(`${this.baseurl}/${id}`);
  }

  create(recruteur: Recruteur): Observable<Recruteur> {
    return this.http.post<Recruteur>(this.baseurl + '/add', recruteur);
  }

  update(id: number, recruteur: Recruteur): Observable<Recruteur> {
    return this.http.put<Recruteur>(`${this.baseurl}/update/${id}`, recruteur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
  }
}
