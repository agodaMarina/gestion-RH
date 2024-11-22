import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  url = 'http://localhost:8000/employe';

  constructor(private http:HttpClient) { }

  getEmployes():Observable<Employe[]>{
    return this.http.get<Employe[]>(this.url+'/lister');
  }

  getEmploye(id:number):Observable<Employe>{
    return this.http.get<Employe>(this.url+'/detail/'+id);
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
