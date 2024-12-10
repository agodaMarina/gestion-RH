import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges{
  @Input() totalItems: number = 0; // Total des éléments
  @Input() itemsPerPage: number = 10; // Nombre d'éléments par page
  @Input() currentPage: number = 1; // Page actuelle
  @Output() pageChanged = new EventEmitter<number>(); // Événement pour notifier la page sélectionnée

  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges(): void {
    // Calculer le nombre total de pages
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Générer les numéros de pages
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage); // Notifier le parent
  
  }

}
