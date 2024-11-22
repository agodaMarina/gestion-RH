import { Component, computed } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Csp } from '../../../../api/models/csp';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '../../../../api/models/pageEvent';
import { CspService } from '../../../../api/services/csp.service';
import { MessageService } from 'primeng/api';
import { SearchService } from '../../../../api/services/search.service';

@Component({
  selector: 'app-csp',
  templateUrl: './csp.component.html',
  styleUrl: './csp.component.css',
})
export class CspComponent {
  filteredData: any;
  paginate!: Csp[];
  first: number = 0;
  rows: number = 10;
  Csps: Csp[] = [];

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.paginate = this.Csps.slice(this.first, this.first + this.rows);
  }
  cspForm!: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private service: CspService,
    private messageservice: MessageService,
    private searchService:SearchService
  ) {
    this.cspForm = this.fb.group({
      libelle: [''],
    });
  }
  add() {
    this.service.create(this.cspForm?.value).subscribe({
      next: (data: Csp) => {
        this.messageservice.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Csp ${data.libelle?.bold} ajouté avec succès`,
        });
        this.liste();
        this.cspForm?.reset();
      },
      error: (error:any) => {
        this.messageservice.add({
          severity: 'error',
          summary: 'Erreur',
          detail: `Erreur lors de l'ajout de la catégorie`,
        });
      },
    })
  }
  liste() {
    this.service.list().subscribe(
      (data:Csp[]) => {
      this.Csps = data;
      this.filteredData = computed(() => {
        const query = this.searchService.searchQuery().toLowerCase();
        
        // Applique le filtre de recherche
        const filtered = this.Csps.filter((csp) =>
          csp.libelle.toLowerCase().includes(query)
        );

        // Calcule les indices de début et de fin pour la pagination
        const start = this.first;
        const end = start + this.rows;

        // Applique la pagination sur les résultats filtrés
        return filtered.slice(start, end);
      });
      this.paginate = this.Csps.slice(this.first, this.first + this.rows);
    });
  }

  modifier(_t16: any) {
    throw new Error('Method not implemented.');
  }
  afficher(arg0: any) {
    throw new Error('Method not implemented.');
  }
  supprimer(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
