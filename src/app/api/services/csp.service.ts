import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Csp } from '../models/csp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CspService {
  baseurl = 'http://localhost:8000/csp';

  constructor(private http: HttpClient) {}

  list(): Observable<Csp[]> {
    return this.http.get<Csp[]>(this.baseurl + '/lister');
  }

  getPosteById(id: number): Observable<Csp> {
    return this.http.get<Csp>(`${this.baseurl}/${id}`);
  }

  create(csp: Csp): Observable<Csp> {
    return this.http.post<Csp>(this.baseurl + '/ajouter', csp);
  }

  update(id: number, csp: Csp): Observable<Csp> {
    return this.http.put<Csp>(`${this.baseurl}/modifier/${id}`, csp);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
  }
  
}
