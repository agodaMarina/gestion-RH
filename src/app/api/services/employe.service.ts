import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Employe[]>(this.url);
  }

}
