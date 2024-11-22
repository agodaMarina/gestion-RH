import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depart } from '../models/Depart';


@Injectable({
  providedIn: 'root'
})
export class DepartService {
baseurl='http://localhost:8000/depart'

constructor(private http: HttpClient) { }

getAll(): Observable<Depart[]> {
  return this.http.get<Depart[]>(`${this.baseurl}/lister`);
}

getById(id: number): Observable<Depart> {
  return this.http.get<Depart>(`${this.baseurl}/${id}`);
}

create(depart: Depart): Observable<Depart> {
  return this.http.post<Depart>(this.baseurl+'/ajouter', depart);
}

update(id: number, depart: Depart): Observable<Depart> {
  return this.http.put<Depart>(`${this.baseurl}/modifier/${id}`, depart);
}

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
}

}
