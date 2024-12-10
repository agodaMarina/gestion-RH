import { Component, computed, OnInit } from '@angular/core';
import { Poste } from '../../../../api/models/Poste';
import { PosteService } from '../../../../api/services/poste.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageEvent } from '../../../../api/models/pageEvent';
import { SearchService } from '../../../../api/services/search.service';
import { PosteDto } from '../../../../api/models/PosteDto';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrl: './poste.component.css',
})
export class PosteComponent implements OnInit {
  poste: Poste = {};
  posteForm: FormGroup;
  postes: PosteDto[] = [];
  paginate: PosteDto[] = [];
  first: number = 0;
  rows: number = 10;
  filteredData: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  onPageChange(event: number) {
    this.currentPage = event;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginate = this.postes.slice(start, end);
  }

  constructor(
    private service: PosteService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.posteForm = this.formBuilder.group({
      libelle: [''],
      niveauEtude: [''],
      description: [''],
      niveauDeSalaire: [0],
      remarque: [''],
    });
  }

  ngOnInit(): void {
    this.liste();
  }

  addPoste() {
    this.service.createPoste(this.posteForm?.value).subscribe({
      next: (data: Poste) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Poste ${data.libelle?.bold} ajouté avec succès`,
        });
        this.liste();
        this.posteForm?.reset();
      },
      error: (err) => {
        // Extraction du message d'erreur personnalisé du backend
        const errorMessage =
          err.error?.error || "Erreur lors de l'ajout du poste";
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: errorMessage,
        });
      },
    });
  }

  liste() {
    this.service.getAllPostes().subscribe({
      next: (data: PosteDto[]) => {
        this.postes = data;

        this.filteredData = computed(() => {
          const query = this.searchService.searchQuery().toLowerCase();
          const filtered = this.postes.filter((poste) =>
            poste.libelle?.toLowerCase().includes(query)
          );
          const start = this.first;
          const end = start + this.rows;

          // Applique la pagination sur les résultats filtrés
          return filtered.slice(start, end);
        });
        this.paginate = this.filteredData().slice(0, this.rows);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération de la liste des postes',
        });
      },
    });
  }

  deletePoste(id: number) {
    this.confirmationService.confirm({
      header: 'Êtes-Vous sûr ?',
      message: 'Veuillez confirmer la suppression',
      accept: () => {
        this.service.deletePoste(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Poste supprimé avec succès',
            });
            this.liste();
          },
          error: (err) => {
            const messageError =
              err.error?.error || 'Oups! Un problème est survenu';
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: messageError,
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Alert',
          detail: 'Vous avez annuler la suppression',
        });
      },
    });
  }

  afficher(poste: Poste) {
    this.posteForm.patchValue({
      libelle: poste.libelle,
      niveauEtude: poste.niveauEtude,
      description: poste.description,
      niveauDeSalaire: poste.niveauDeSalaire,
      remarque: poste.remarque,
    });
  }

  update() {
    if (this.poste.id)
      this.service.updatePoste(this.poste.id, this.posteForm?.value).subscribe({
        next: (data: Poste) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: `Poste ${data.libelle?.bold} modifié avec succès`,
          });
          this.liste();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la modification du poste',
          });
        },
      });
  }
}
