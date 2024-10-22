import { Component, OnInit } from '@angular/core';
import { Candidature } from '../../../../api/models/Candidature';
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
  candidats: Candidature[] = [];
  candidat: Candidature = {};
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  stadeClass = 'badge bg-label-primary me-1';
  candidatureForm: FormGroup;

  constructor(
    private service: CandidatureService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.candidatureForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      adresse: [''],
      prochaineAction: [''],
      dateEntretien1: [''],
      dateEntretien2: [''],
      dateEntretien3: [''],
      stadeDeRecrutement: [''],
      noteExperience: [0],
      noteCompetence: [0],
      moyenne: [0],
      noteSavoirEtre: [0],
      apreciationGlobale: [''],
      poste: [],
    });
  }

  ngOnInit(): void {
    this.liste();
  }

  liste() {
    this.service.getAll().subscribe({
      next: (data: Candidature[]) => {
        this.candidats = data;
        if (this.candidats) {
          this.candidats.forEach((candidat) => {
            if (candidat.stadeDeRecrutement == 'cours') {
              this.stadeClass = 'badge bg-label-warning me-1';
            }
            if (candidat.stadeDeRecrutement == 'recruter') {
              this.stadeClass = 'badge bg-label-success me-1';
            }
            if (candidat.stadeDeRecrutement == 'Refusé') {
              this.stadeClass = 'badge bg-label-danger me-1';
            }
          });
        }
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

  modifier(item: Candidature) {
    this.candidatureForm.patchValue({
      nom: item.nom,
      prenom: item.prenom,
      email: item.email,
      telephone: item.telephone,
      adresse: item.adresse,
      prochaineAction: item.prochaineAction,
      dateEntretien1: item.dateEntretien1,
      dateEntretien2: item.dateEntretien2,
      dateEntretien3: item.dateEntretien3,
      stadeDeRecrutement: item.stadeDeRecrutement,
      noteExperience: item.noteExperience,
      noteCompetence: item.noteCompetence,
      moyenne: item.moyenne,
      noteSavoirEtre: item.noteSavoirEtre,
      apreciationGlobale: item.apreciationGlobale,
      poste: item.poste,
    });
  }

  update() {
    this.service.updateCandidature(this.candidatureForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Candidature modifiée avec succès',
        });
        this.liste();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la modification de la candidature',
        });
      },
    });
  }
}
