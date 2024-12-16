import { Component, OnInit } from '@angular/core';
import { Candidature, CandidatureCreation } from '../../../../api/models/Candidature';
import { CandidatureService } from '../../../../api/services/candidature.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
@Component({
  selector: 'app-listecandidatures',
  templateUrl: './listecandidatures.component.html',
  styleUrl: './listecandidatures.component.css',
})
export class ListecandidaturesComponent implements OnInit {

  
  candidats: CandidatureCreation[] = [];
  candidat: Candidature = {};
  itemsPerPage = 8;
  currentPage = 1;

  onPageChange(page: number) {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
  }

  stadeClass = '';


  constructor(
    private service: CandidatureService,
    private messageService: MessageService,

    private confirmationService: ConfirmationService
  ) {
   
  }

  ngOnInit(): void {
    this.liste();
  }
  initials(arg0: String, arg1: String): String {
    return arg0.charAt(0).toUpperCase() + arg1.charAt(0).toUpperCase();
  }
  liste() {
    this.service.getAll().subscribe({
      next: (data: CandidatureCreation[]) => {
        this.candidats = data;
        
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération des candidatures',
        });
      },
    });
  }
  getStatusClass(status: string) {
    switch (status) {
      case 'New':
        return 'bg-purple text-white';
      case 'Scheduled':
        return 'bg-pink text-white';
      case 'Interviewed':
        return 'bg-primary text-white';
      case 'Offered':
        return 'bg-warning text-dark';
      case 'Hired':
        return 'bg-success text-white';
      case 'Rejected':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  details(id: number) {
    this.service.getCandidatureById(id).subscribe({
      next: (data: Candidature) => {
        this.candidat = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'impossible de charger les details du candidat',
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
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Candidature supprimée avec succès',
            });
            this.liste();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression de la candidature',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Annulation de la suppression de la candidature',
        });
      },
    });
  }

  // modifier(item: Candidature) {
  //   this.candidatureForm.patchValue({
  //     nom: item.nom,
  //     prenom: item.prenom,
  //     email: item.email,
  //     telephone: item.telephone,
  //     adresse: item.adresse,
  //     prochaineAction: item.prochaineAction,
  //     dateEntretien1: item.dateEntretien1,
  //     dateEntretien2: item.dateEntretien2,
  //     dateEntretien3: item.dateEntretien3,
  //     stadeDeRecrutement: item.stadeDeRecrutement,
  //     moyenne: item.moyenne,
  //     apreciationGlobale: item.apreciationGlobale,
  //   });
  // }

  // update() {
  //   this.service.updateCandidature(this.candidatureForm?.value).subscribe({
  //     next: () => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Succès',
  //         detail: 'Candidature modifiée avec succès',
  //       });
  //       this.liste();
  //     },
  //     error: (err) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Erreur',
  //         detail: 'Erreur lors de la modification de la candidature',
  //       });
  //     },
  //   });
  // }

  export() {
    this.service.exportToExcel().subscribe((response: Blob) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Liste des candidatures.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
