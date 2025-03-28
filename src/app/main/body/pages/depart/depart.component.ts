import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Depart } from '../../../../api/models/Depart';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartService } from '../../../../api/services/depart.service';
import { PageEvent } from '../../../../api/models/pageEvent';
import { EmployeService } from '../../../../api/services/employe.service';
import { EmployeDto } from '../../../../api/models/employe';

@Component({
  selector: 'app-depart',
  templateUrl: './depart.component.html',
  styleUrl: './depart.component.css',
})
export class DepartComponent implements OnInit {
  departs: Depart[] = [];
  departForm: FormGroup;
  paginate: Depart[] = [];
  employes: EmployeDto[] = [];
  first: number = 0;
  rows: number = 10;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  counts: { [key: string]: number } = {};

  onPageChange(event: number) {
    this.currentPage = event;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginate = this.departs.slice(start, end);
  }

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeService: EmployeService,
    private formBuilder: FormBuilder,
    private service: DepartService
  ) {
    this.departForm = this.formBuilder.group({
      raison: [''],
      employe: [''],
    });
  }

  ngOnInit(): void {
    this.liste();
    this.getEmployes();
  }

  getEmployes() {
    this.employeService.getEmployeActifs().subscribe({
      next: (data) => {
        this.employes = data
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération de la liste des employés',
        });
      },
    });
  }

  add() {
    this.service.create(this.departForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Départ de avec succès',
        });
        this.liste();
        this.departForm?.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'ajout du départ",
        });
      },
    });
  }

  liste() {
    this.service.getAll().subscribe({
      next: (data: Depart[]) => {
        this.departs = data;
        this.countDepartTypes(data);
        this.paginate = this.departs.slice(0, this.rows);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération de la liste des départs',
        });
      },
    });
  }

  supprimer(id: number) {
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

  modifier(item: Depart) {
    if (item.id)
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

  countDepartTypes(departs: Depart[]): { [key: string]: number } {
    this.counts = {
      DEMISSION: 0,
      'FIN DE CONTRAT': 0,
      LICENCIEMENT: 0,
      RETRAITE: 0,
      'RUPTURE CONVENTIONNELLE': 0,
      DECES: 0,
    };

    return departs.reduce((acc, depart) => {
      if (depart.raison) {
        acc[depart.raison]++;
      }
      return acc;
    }, this.counts);
  }
}
