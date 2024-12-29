import { Component, OnInit } from '@angular/core';
import { RecrutementDto } from '../../../../../../api/models/recrutement';
import { CandidatureCreation } from '../../../../../../api/models/Candidature';
import { RecrutementService } from '../../../../../../api/services/recrutement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
})
export class SelectionComponent implements OnInit {
  candidatureForm!: FormGroup<any>;
  id: number = 0;
  recrutement: RecrutementDto = {};
  candidats: CandidatureCreation[] = [];
  Listcandidats: CandidatureCreation[] = [];


  constructor(
    private recrutementService: RecrutementService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.candidatureForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      prochaineAction: ['', Validators.required],
      dateEntretien1: ['', Validators.required],
      notePresentation: [0],
      noteExperience: [0],
      noteCompetenceEtAtout: [0],
      noteSavoirEtre: [0],
      noteQualiteEtDefaut: [0],
      estRetenu: [],
      apreciationGlobale: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? +idParam : 0;
    this.getRecrutementById();
  }

  getRecrutementById() {
    this.recrutementService.getRecrutementById(this.id).subscribe({
      next: (data: RecrutementDto) => {
        this.recrutement = data;
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération du recrutement',
        });
      },
    });

    this.recrutementService.getCandidats(this.id).subscribe({
      next: (data: CandidatureCreation[]) => {
        this.candidats = data;
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'erreur:' + error,
        });
      },
    });
  }

  add(recrutementId: number) {
    this.Listcandidats.push(this.candidatureForm.value);
    if (this.Listcandidats.length > 0) {
      this.recrutementService
        .ajouterCandidats(recrutementId, this.Listcandidats)
        .subscribe({
          next: () => {
            this.getRecrutementById();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      alert('Veuillez renseigner les informations du candidat');
    }
  }

  terminer() {
    this.recrutementService.endRecrutement(this.id).subscribe({
      next: () => {
        this.router.navigate(['recrutement']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la clôture du recrutement',
        });
      },
    });
  }

  selectedIds: number[] = []; // Contient les IDs sélectionnés

  onCheckboxChange(event: Event, id: number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter((itemId) => itemId !== id); // Supprimer l'ID
    }
  }
}
