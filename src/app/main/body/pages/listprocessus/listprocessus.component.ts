import { Component, computed, OnInit } from '@angular/core';
import { RecrutementService } from '../../../../api/services/recrutement.service';
import { RecrutementDto } from '../../../../api/models/recrutement';
import { SearchService } from '../../../../api/services/search.service';
import { Route, Router } from '@angular/router';

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
  nombreCandidats: number = 10;
  recrutementsActifs: RecrutementDto[] = [];
  recrutementsTermines: RecrutementDto[] = [];
  
  constructor(
    private recrutementService: RecrutementService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobs();
  }

  onPageChange(event: number) {
    this.currentPage = event;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginateJobs = this.filteredjobs().slice(start, end);
  }
  getClass(status: string) {
    if (status === 'EN_COURS') {
      return 'badge bg-label-success me-1';
    } else {
      return 'badge bg-label-danger me-1';
    }
  }

  add() {
    this.router.navigateByUrl('/main/recrutement');
  }

  getJobs() {
    this.recrutementService.getAll().subscribe({
      next: (data: RecrutementDto[]) => {
        this.recrutements = data;
        this.recrutementsActifs = data.filter(
          (recrutement) => recrutement.statut === 'EN_COURS'
        );
        this.recrutementsTermines = data.filter(
          (recrutement) => recrutement.statut === 'TERMINE'
        );
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
      },
    });
  }
}
