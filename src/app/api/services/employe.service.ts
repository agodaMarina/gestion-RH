import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe, EmployeDto } from '../models/employe';
import { Contrat } from '../models/contrat';
import { Depart } from '../models/Depart';
import { Absence } from '../models/Absence';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  url = 'http://localhost:8000/employe';

  constructor(private http:HttpClient) { }

  getEmployes():Observable<EmployeDto[]>{
    return this.http.get<EmployeDto[]>(this.url+'/lister');
  }

  getEmploye(id:number):Observable<EmployeDto>{
    return this.http.get<EmployeDto>(this.url+'/detail/'+id);
  }

  getEmployeActifs():Observable<EmployeDto[]>{
    return this.http.get<EmployeDto[]>(this.url+'/listerActif');
  }

  // Récupérer le contrat d'un employé
  getContratByUserId(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.url}/${id}/contrat`);
  }

  // Récupérer toutes les absences d'un employé
  getAllAbsencesByUserId(id: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.url}/${id}/absences`);
  }

  // Récupérer le départ d'un employé
  getDepartByUserId(id: number): Observable<Depart> {
    return this.http.get<Depart>(`${this.url}/${id}/depart`);
  }

  prevoirRetraites(intervalleMax: number = 5): Observable<Map<number, any[]>> {
    return this.http.get<Map<number, any[]>>(`${this.url}?intervalleMax=${intervalleMax}`);
  }

  importEmployees(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.url}/import`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      }),
      responseType: 'text'
    });
  }

  

}
