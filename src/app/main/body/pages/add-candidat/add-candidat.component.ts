import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../../../../api/services/candidature.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidature } from '../../../../api/models/Candidature';
import { PosteService } from '../../../../api/services/poste.service';
import { Poste } from '../../../../api/models/Poste';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrl: './add-candidat.component.css',
})
export class AddCandidatComponent implements OnInit {
  postes: Poste[] = [];

  candidatureForm: FormGroup;

  constructor(
    private service: CandidatureService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private posteService: PosteService
  ) {
    this.candidatureForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      prochaineAction: ['', Validators.required],
      dateEntretien1: ['', Validators.required],
      dateEntretien2: [''],
      dateEntretien3: [''],
      stadeDeRecrutement: ['', Validators.required],
      noteExperience: [0, [Validators.required, Validators.max(20)]],
      noteCompetence: [0, [Validators.required, Validators.max(20)]],
      moyenne: [{ value: 0, disabled: true }],
      noteSavoirEtre: [0, [Validators.required, Validators.max(20)]],
      apreciationGlobale: [''],
      poste: [null, Validators.required],
    });
    this.onChanges();
  }

  ngOnInit(): void {
   this.liste();
  }
  onChanges():void {
    this.candidatureForm.get('noteExperience')?.valueChanges.subscribe((val) => {
      this.updateTotals();
    });

    this.candidatureForm.get('noteCompetence')?.valueChanges.subscribe((val) => {
      this.updateTotals();
    });

    this.candidatureForm.get('noteSavoirEtre')?.valueChanges.subscribe((val) => {
      this.updateTotals();
    });


  }
 updateTotals(): void {
    const note1 = this.candidatureForm.get('noteExperience')?.value;
    const note2 = this.candidatureForm.get('noteCompetence')?.value;
    const note3 = this.candidatureForm.get('noteSavoirEtre')?.value;
    if (note1 !== null && note2 !== null && note3 !==null) {
      const total = (note1+note2+note3)/3;
      console.log(total)
      this.candidatureForm.patchValue({
        moyenne: total
        
      });
    }
  }
  add() {
    if (this.candidatureForm.valid) {
      this.service.create(this.candidatureForm?.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Candidature ajoutée avec succès',
          });
          this.liste();
          this.candidatureForm?.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "erreur lors de l'ajout de la candidature",
          });
        },
      });
      
    }
  }

  liste() {
    this.posteService.getAllPostes().subscribe({
      next: (data: Candidature[]) => {
        this.postes = data;
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
  supprimer(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
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
  }

}
