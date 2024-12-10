import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence } from '../models/Absence';


@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

baseurl="http://localhost:8000/absence";
constructor(private http: HttpClient) { }

getAllAbsences(): Observable<Absence[]> {
  return this.http.get<Absence[]>(`${this.baseurl}/lister`);
}
getAbsencesActive(): Observable<Absence[]> {
  return this.http.get<Absence[]>(`${this.baseurl}/listeActives`);
}

getAbsenceById(id: number): Observable<Absence> {
  return this.http.get<Absence>(`${this.baseurl}/${id}`);
}

createAbsence(absence: Absence): Observable<Absence> {
  return this.http.post<Absence>(`${this.baseurl}/ajouter`, absence);
}

updateAbsence(id: number, absence: Absence): Observable<Absence> {
  return this.http.put<Absence>(`${this.baseurl}/modifier/${id}`, absence);
}

deleteAbsence(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseurl}/supprimer/${id}`);
}
}
