import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PageEvent } from '../../../../api/models/pageEvent';
import { SecteurDto } from '../../../../api/models/secteur';
import { MessageService } from 'primeng/api';
import { SecteurService } from '../../../../api/services/secteur.service';
import { SearchService } from '../../../../api/services/search.service';

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrl: './secteur.component.css',
})
export class SecteurComponent implements OnInit {
  paginate: SecteurDto[] = [];
  secteurs: SecteurDto[] = [];
  filteredData: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  onPageChange(event: number) {
    this.currentPage = event;
    const start = this.currentPage;
    const end = start + this.itemsPerPage;
    this.paginate = this.secteurs.slice(start, end);
  }
  secteurForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private messageService: MessageService,
    private service: SecteurService
  ) {
    this.secteurForm = this.fb.group({
      libelle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.liste();
  }

  add() {
    this.service.create(this.secteurForm.value).subscribe({
      next: (data: SecteurDto) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Secteur ${data.libelle} ajouté avec succès`,
        });
        this.liste();
        this.secteurForm.reset();
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Une erreur est survenue lors de l'ajout du secteur",
        });
      },
    });
  }
  liste() {
    this.service.getAll().subscribe({
      next: (data: SecteurDto[]) => {
        this.secteurs = data;
        // Signal calculé pour filtrer la liste d'employés
        this.filteredData = computed(() => {
          const query = this.searchService.searchQuery().toLowerCase();

          // Applique le filtre de recherche
          const filtered = this.secteurs.filter((secteur) =>
            secteur.libelle.toLowerCase().includes(query)
          );

          // Calcule les indices de début et de fin pour la pagination
          const start = this.currentPage;
          const end = start + this.itemsPerPage;

          // Applique la pagination sur les résultats filtrés
          return filtered.slice(start, end);
        });

        this.paginate = this.filteredData().slice(0, this.itemsPerPage);
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des données',
        });
      },
    });
  }
  modifier(item: SecteurDto) {
    this.secteurForm.patchValue({
      libelle: item.libelle,
    });
  }

  supprimer(id: number) {
    alert('Voulez-vous vraiment supprimer ce secteur ?');
    
    this.service.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Secteur supprimé avec succès',
        });
        this.liste();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la suppression du secteur',
        });
      },
    });
  }
}
