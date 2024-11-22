import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Signal pour stocker la valeur de recherche
  searchQuery = signal('');
  
  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}
