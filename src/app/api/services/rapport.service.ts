import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  url = 'http://localhost:8000/statistiques';

  constructor(private http:HttpClient) { }

  getBySexe():Observable<{ [key: string]: number }>{
    return this.http.get<{[key:string]:number}>(this.url + '/par-sexe');
  }

  getByAge():Observable<object>{
    return this.http.get<object>(this.url + '/par-age');
  }

  getByContrat():Observable<object>{
    return this.http.get<object>(this.url + '/par-contrat');
  }

  getByCsp():Observable<object>{
    return this.http.get<object>(this.url + '/par-csp');
  }

  getBySecteur():Observable<object>{
    return this.http.get<object>(this.url + '/par-secteur');
  }

  getByDepart():Observable<object>{
    return this.http.get<object>(this.url + '/par-depart');
  }
}
 