import { Component, computed, OnInit } from '@angular/core';
import { Csp } from '../../../../api/models/csp';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CspService } from '../../../../api/services/csp.service';
import { MessageService } from 'primeng/api';
import { SearchService } from '../../../../api/services/search.service';

@Component({
  selector: 'app-csp',
  templateUrl: './csp.component.html',
  styleUrl: './csp.component.css',
})
export class CspComponent implements OnInit {
  paginate!: Csp[];
  Csps: Csp[] = [];
  emloyes: string[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  // onPageChange(event: number) {
  //   this.currentPage = event;
  //   const start = (this.currentPage - 1) * this.itemsPerPage;;
  //   const end = start + this.itemsPerPage;
  //   this.paginate = this.Csps.slice(start, end);
  // }

  onPageChange(event: number) {
    this.currentPage = event;
    // Mise à jour explicite de `filteredData` via `currentPage`
    const query = this.searchService.searchQuery().toLowerCase();
    const filtered = this.Csps.filter((csp) =>
      csp.libelle.toLowerCase().includes(query)
    );

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.paginate = filtered.slice(start, end); // Recalcule `paginate`
  }
  cspForm!: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private service: CspService,
    private messageservice: MessageService,
    private searchService: SearchService
  ) {
    this.cspForm = this.fb.group({
      libelle: [''],
    });
  }
  ngOnInit(): void {
    this.liste();
  }

  add() {
    this.service.create(this.cspForm?.value).subscribe({
      next: (data: Csp) => {
        this.messageservice.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Csp ${data.libelle} ajouté avec succès`,
        });
        this.liste();
        this.cspForm?.reset();
      },
      error: (error: any) => {
        this.messageservice.add({
          severity: 'error',
          summary: 'Erreur',
          detail: `Erreur lors de l'ajout de la catégorie`,
        });
      },
    });
  }

  liste() {
    this.service.list().subscribe((data: Csp[]) => {
      this.Csps = data;
      this.paginate = this.Csps.slice(0, this.itemsPerPage);
    });
  }
  filteredData = computed(() => {
    const query = this.searchService.searchQuery().toLowerCase();

    // Applique le filtre de recherche
    const filtered = this.Csps.filter((csp) =>
      csp.libelle.toLowerCase().includes(query)
    );

    // Calcule les indices de début et de fin pour la pagination
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    // Applique la pagination sur les résultats filtrés
    return filtered.slice(start, end);
  });

  afficher(item: Csp) {
    this.cspForm.patchValue(item);
    this.cspForm.get('libelle')?.setValue(item.libelle);
    this.emloyes = item.employes!;
  }
  supprimer(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
