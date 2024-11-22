import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recruteur } from '../../../../api/models/recruteur';
import { PageEvent } from '../../../../api/models/pageEvent';
import { MessageService } from 'primeng/api';
import { RecruteurService } from '../../../../api/services/recruteur.service';
import { SearchService } from '../../../../api/services/search.service';

@Component({
  selector: 'app-recruteur',
  templateUrl: './recruteur.component.html',
  styleUrl: './recruteur.component.css',
})
export class RecruteurComponent implements OnInit {
  paginate: Recruteur[] = [];
  first: number = 0;
  rows: number = 10;
  recruteurs: Recruteur[] = [];
  recruteurForm!: FormGroup;
  filteredData: any;

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.paginate = this.recruteurs.slice(this.first, this.first + this.rows);
  }

  constructor(
    private fb: FormBuilder,
    private service: RecruteurService,
    private searchService: SearchService,
    private messageService: MessageService
  ) {
    this.recruteurForm = this.fb.group({
      nom: ['',Validators.required],
      telephone: [''],
      adresse: [''],
     
    });
  }
  ngOnInit(): void {
    this.liste();
  }

  add() {
    this.service.create(this.recruteurForm.value).subscribe({
      next: (data: Recruteur) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Recruteur${data.nom?.bold}ajouté avec succès`,
        });
        this.liste();
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de l\'ajout du recruteur',
        });
      },
    })
  }
  liste(){
    this.service.findAll().subscribe({
      next: (data: Recruteur[]) => {
        this.recruteurs = data;
        // Signal calculé pour filtrer la liste d'employés
        this.filteredData = computed(() => {
          const query = this.searchService.searchQuery().toLowerCase();
          
          // Applique le filtre de recherche
          const filtered = this.recruteurs.filter((rec) =>
            rec.nom?.toLowerCase().includes(query)
          );

          // Calcule les indices de début et de fin pour la pagination
          const start = this.first;
          const end = start + this.rows;

          // Renvoie la liste filtrée et paginée
          return filtered.slice(start, end);
        });
        this.paginate=this.filteredData().slice(0,this.rows);
      },
      error: (error:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors du chargement des données',
        });
      },
    });
  }
  modifier(_t19: any) {
    throw new Error('Method not implemented.');
  }
  
  supprimer(arg0: any) {
    throw new Error('Method not implemented.');
  }
}


