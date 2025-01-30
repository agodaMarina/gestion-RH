import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CandidatureCreation } from '../../../../api/models/Candidature';
import { RecrutementService } from '../../../../api/services/recrutement.service';
import { PosteDto } from '../../../../api/models/PosteDto';
import { Recruteur } from '../../../../api/models/recruteur';
import { SecteurDto } from '../../../../api/models/secteur';
import { PosteService } from '../../../../api/services/poste.service';
import { RecruteurService } from '../../../../api/services/recruteur.service';
import { SecteurService } from '../../../../api/services/secteur.service';


@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrl: './recrutement.component.css',
})
export class RecrutementComponent implements OnInit {
  Listcandidats: CandidatureCreation[] = [];
  recrutementId: number | null = null;
  candidatureForm!: FormGroup;
  items!: MenuItem[];
  subscription!: Subscription;
  currentStep: number = 1;
  poste: PosteDto = {
    libelle: '',
    niveauEtude: '',
    description: '',
    niveauDeSalaire: 0,
    remarque: '',
    secteur: '',
  };
  posteList: PosteDto[] = [];
  recruteurList: Recruteur[] = [];
  secteurList: SecteurDto[] = [];
  recruteur: Recruteur = { nom: '' };
  posteId: number = 0;
  recuteurId: number = 0;
  candidates: any;
  evaluations: any;
  formData = {
    step1: { posteId: 0, recruteurId: 0 },
    step2: { candidats: [] },
    step3: { evaluations: [] },
    step4: {},
  };

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private recrutementService: RecrutementService,
    private posteService: PosteService,
    private recruteurService: RecruteurService,
    private secteurService: SecteurService
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
    this.getSecteur();
    this.listeDesPotes();
    this.listeDesRecruteurs();
  }

  goToNextStep() {
    if (this.validateStep(this.currentStep)) {
      this.saveCurrentStepData();
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Veuillez remplir les champs obligatoires',
      });
    }
  }
  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  validateStep(step: number): boolean {
    switch (step) {
      case 1:
        return !!this.posteId && !!this.recuteurId;
      case 2:
        return this.Listcandidats.length > 0;
      default:
        return true; // L'étape 4 n'a pas besoin de validation
    }
  }
  saveCurrentStepData() {
    switch (this.currentStep) {
      case 1:
        this.formData.step1 = {
          posteId: this.posteId,
          recruteurId: this.recuteurId,
        };
        this.etape1();
        break;
      case 2:
        this.etape2();
        break;
      case 3:
        this.formData.step3 = { evaluations: this.evaluations };
        break;
      default:
        break;
    }
  }

  /*----------------------------------------------fonction por l'étape 2--------------------------------------------- */
  add() {
    if (this.candidatureForm.valid) {
      const candidature: CandidatureCreation = {
        nom: this.candidatureForm.get('nom')?.value,
        prenom: this.candidatureForm.get('prenom')?.value,
        email: this.candidatureForm.get('email')?.value,
        telephone: this.candidatureForm.get('telephone')?.value,
        adresse: this.candidatureForm.get('adresse')?.value,
        prochaineAction: this.candidatureForm.get('prochaineAction')?.value,
        dateEntretien1: this.candidatureForm.get('dateEntretien1')?.value,
        noteExperience: this.candidatureForm.get('noteExperience')?.value,
        notePresentation: this.candidatureForm.get('notePresentation')?.value,
        noteCompetenceEtAtout:
          this.candidatureForm.get('noteCompetenceEtAtout')?.value,
        noteSavoirEtre: this.candidatureForm.get('noteSavoirEtre')?.value,
        noteQualiteEtDefaut:
          this.candidatureForm.get('noteQualiteEtDefaut')?.value,
        apreciationGlobale:
          this.candidatureForm.get('apreciationGlobale')?.value,
      };
      this.Listcandidats.push(candidature);
      this.saveToLocalStorage();
    }
  }
  //fonction pour sauvegarder les candidats dans le local storage
  saveToLocalStorage() {
    localStorage.setItem('candidats', JSON.stringify(this.Listcandidats));
  }
  //fonction pour charger les candidats depuis le local storage
  loadFromLocalStorage() {
    const saved = localStorage.getItem('candidats');
    this.Listcandidats = saved ? JSON.parse(saved) : [];
  }
  //fonction pour enregistrer les candidats dans la base de données
  etape2() {
    const recrutementIdValue = this.recrutementService.getRecrutementId();
    if (recrutementIdValue !== null) {
      this.recrutementId = recrutementIdValue;
      this.recrutementService
        .ajouterCandidats(this.recrutementId, this.Listcandidats)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Candidats ajoutés avec succès',
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      // handle the case where recrutementId is null
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'veuillez référencer le processus',
      });
    }
  }
  supprimer(c: CandidatureCreation) {
    if (confirm(`Voulez-vous vraiment supprimer ${c.nom} ${c.prenom} ?`)) {
      this.Listcandidats = this.Listcandidats.filter((item) => item !== c);
    }
  }

  /*-----------------------------------------fonction pour l'etape1------------------------------------------------*/
  addPoste() {
    this.posteService.createPoste(this.poste).subscribe(
      (data) => {
        
        this.listeDesPotes();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addRecruteur() {
    this.recruteurService.create(this.recruteur).subscribe(
      (data) => {
        console.log(data);
        this.listeDesRecruteurs();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  listeDesPotes() {
    this.posteService.getAllPostes().subscribe(
      (data) => {
        this.posteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  listeDesRecruteurs() {
    this.recruteurService.findAll().subscribe(
      (data) => {
        this.recruteurList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getSecteur() {
    this.secteurService.getAll().subscribe({
      next: (data: SecteurDto[]) => {
        this.secteurList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  etape1() {
    this.recrutementService
      .addRecrutement(this.posteId, this.recuteurId)
      .subscribe({
        next: (data: number) => {
          if (data) this.recrutementService.setRecrutementId(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
