import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Absence } from '../../../../api/models/Absence';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AbsenceService } from '../../../../api/services/absence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css',
})
export class AbsenceComponent implements OnInit {
  absence: Absence = {};
  abForm: FormGroup;

  absences: Absence[] = [];

  constructor(
    private service: AbsenceService,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.abForm = this.formbuilder.group({
      type: [''],
      dateDebut: [''],
      dateFin: [''],
      employe: [],
    });
  }

  ngOnInit(): void {
    this.liste();
  }

  

  add() {
    this.service.createAbsence(this.abForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Absence ajoutée avec succès',
        });
        this.liste();
        this.abForm?.reset();
        const modal = document.querySelector('.modal');
        if (modal) {
          modal.classList.remove('show');
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'ajout de l'absence",
        });
      },
    });
  }

  liste() {
    this.service.getAllAbsences().subscribe({
      next: (value: Absence[]) => {
        this.absences = value;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'affichage des absences",
        });
      },
    });
  }

  supprimer(id: number) {
    this.confirmationService.confirm({
      header: 'Etes-Vous sûr ?',
      message: 'Veuillez confirmer la suppression',
      accept: () => {
        this.service.deleteAbsence(id).subscribe({
          next: () => {
            this.liste();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: "Erreur lors de la suppression de l'absence",
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

  modifier(item:Absence) {
    if (item.id) 
    this.service.updateAbsence(item.id,this.absence).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Absence modifiée avec succès',
        });
        this.liste();
        this.abForm?.reset();
        const modal = document.querySelector('.modal');
        if (modal) {
          modal.classList.remove('show');
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de la modification de l'absence",
        });
      },
    });
  }
}
