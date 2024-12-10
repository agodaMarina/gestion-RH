import { Component, computed, OnInit } from '@angular/core';
import { RecrutementService } from '../../../../api/services/recrutement.service';
import { Recrutement, RecrutementDto } from '../../../../api/models/recrutement';
import { SearchService } from '../../../../api/services/search.service';

@Component({
  selector: 'app-listprocessus',
  templateUrl: './listprocessus.component.html',
  styleUrl: './listprocessus.component.css',
})
export class ListprocessusComponent implements OnInit {

  paginateJobs: RecrutementDto[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  recrutements: RecrutementDto[] = [];
  filteredjobs: any;
  nombreCandidats: number= 10;

  constructor(private recrutementService: RecrutementService,private searchService:SearchService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  onPageChange(event: number) {
    this.currentPage = event;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginateJobs = this.filteredjobs().slice(start, end);
  }

  getJobs(){
    this.recrutementService.getAll().subscribe({
      next: (data: RecrutementDto[]) => {
        this.recrutements = data;
            // Signal calculé pour filtrer la liste d'employés
            this.filteredjobs = computed(() => {
              const query = this.searchService.searchQuery().toLowerCase();
              
              // Applique le filtre de recherche
              const filtered = this.recrutements.filter((emp) =>
                emp.poste?.toLowerCase().includes(query)
              );
    
              // Calcule les indices de début et de fin pour la pagination
              const start = (this.currentPage - 1) * this.itemsPerPage;
              const end = start + this.itemsPerPage;
    
              // Applique la pagination sur les résultats filtrés
              return filtered.slice(start, end);
            });
            this.paginateJobs = this.filteredjobs().slice(0, this.itemsPerPage);
      }
    })
  }
  

}
