import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Depart } from '../../../../api/models/Depart';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartService } from '../../../../api/services/depart.service';

@Component({
  selector: 'app-depart',
  templateUrl: './depart.component.html',
  styleUrl: './depart.component.css',
})
export class DepartComponent implements OnInit{
  departs: Depart[] = [];
  departForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private service:DepartService
  ) {
    this.departForm=this.formBuilder.group({
      raison:[''],
      employe:[]
    })
  }


  ngOnInit(): void {
      this.liste();
  }


  add() {
    this.service.create (this.departForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Départ ajouté avec succès',
        });
        this.liste();
        this.departForm?.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error', 
          summary: 'Erreur',
          detail: 'Erreur lors de l\'ajout du départ',
        });
      },
    });
  }

  liste() {
    this.service.getAll().subscribe({
      next: (data: Depart[]) => {
        this.departs = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération de la liste des départs',
        });
      }
    })
  }

  supprimer(id:number) {
    this.confirmationService.confirm({
      header: 'Etes-Vous sûr ?',
      message: 'Veuillez confirmer la suppression',
      accept: () => {
        this.service.delete(id).subscribe({
          next: () => {
            this.liste();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression du départ',
            });
          },
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Vous venez de supprimer un élément',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Vous avez annulé la suppression d un élément',
          life: 3000,
        });
      },
    });
  }

  modifier(item:Depart) {
    if(item.id)
    this.service.update(item.id, this.departForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Départ modifié avec succès',
        });
        this.liste();
        this.departForm?.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la modification du départ',
        });
      },
    });
  }
}
