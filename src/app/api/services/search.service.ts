import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTerm = new BehaviorSubject<string>(''); // Terme de recherche initialisé à vide
  currentSearchTerm = this.searchTerm.asObservable(); // Observable pour que d'autres composants puissent s'abonner

  // Mise à jour du terme de recherche
  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
