import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PageEvent } from '../../../../api/models/pageEvent';
import { Secteur } from '../../../../api/models/secteur';
import { MessageService } from 'primeng/api';
import { SecteurService } from '../../../../api/services/secteur.service';
import { SearchService } from '../../../../api/services/search.service';

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrl: './secteur.component.css',
})
export class SecteurComponent implements OnInit {
  paginate: Secteur[]=[];
  first: number = 0;
  rows: number = 10;
  secteurs: Secteur[]=[];
  filteredData: any;

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.paginate = this.secteurs.slice(
      this.first,
      this.first + this.rows
    );
  }
  secteurForm!: FormGroup;

 constructor(private fb: FormBuilder,private searchService: SearchService,private messageService:MessageService,private service:SecteurService) {
  this.secteurForm=this.fb.group({
    libelle:['',Validators.required]
  })

 }

  ngOnInit(): void {
    this.liste();
  }

  add() {
    this.service.create(this.secteurForm.value).subscribe({
      next: (data: Secteur) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Secteur ${data.libelle.bold} ajouté avec succès`,
        });
        this.liste();
        this.secteurForm.reset();
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de l\'ajout du secteur',
        });
      },
    })
  }
  liste(){
    this.service.getAll().subscribe({
      next: (data:Secteur[]) => {
        this.secteurs = data;
         // Signal calculé pour filtrer la liste d'employés
         this.filteredData = computed(() => {
          const query = this.searchService.searchQuery().toLowerCase();
          
          // Applique le filtre de recherche
          const filtered = this.secteurs.filter((secteur) =>
            secteur.libelle.toLowerCase().includes(query)
          );

          // Calcule les indices de début et de fin pour la pagination
          const start = this.first;
          const end = start + this.rows;

          // Applique la pagination sur les résultats filtrés
          return filtered.slice(start, end);
        });
       
        this.paginate = this.filteredData().slice(0,this.rows);
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
  modifier(item: Secteur) {
    
  }
  
  supprimer(arg0: any) {
    
  }
}


