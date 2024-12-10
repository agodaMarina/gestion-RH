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
import { Recrutement } from '../../../../api/models/recrutement';

@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrl: './recrutement.component.css',
})
export class RecrutementComponent implements OnInit {
submitScore(_t335: any) {
throw new Error('Method not implemented.');
}
  Listcandidats: CandidatureCreation[] = [];
  recrutementId: number | null = null
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
  secteurList:SecteurDto[] = [];
  recruteur: Recruteur = { nom: '' };
  posteId: number = 0;
  recuteurId: number = 0;
  candidates: any;

  

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private recrutementService:RecrutementService,
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
      apreciationGlobale: [''],
    });
  }

  ngOnInit(): void {
    this.getSecteur();
    this.listeDesPotes();
    this.listeDesRecruteurs();
    this.loadFromLocalStorage();
  }
  goToNextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }
  
  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
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
      this.recrutementId = recrutementIdValue
    } else {
      // handle the case where recrutementId is null
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'veuillez référencer le processus' });
    }
    this.recrutementService.ajouterCandidats(this.recrutementId!,this.Listcandidats)
  }
  supprimer(c: CandidatureCreation) {
    if (confirm(`Voulez-vous vraiment supprimer ${c.nom} ${c.prenom} ?`)) {
      this.Listcandidats = this.Listcandidats.filter(item => item !== c);
    }
  }
  addPoste() {
    this.posteService.createPoste(this.poste).subscribe(
      (data) => {
        console.log(data);
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

  etape1() {
    this.recrutementService
      .addRecrutement(this.posteId, this.recuteurId)
      .subscribe({
        next: (data:Recrutement) => {
          if (data.id)
          this.recrutementService.setRecrutementId(data.id);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getSecteur(){
    this.secteurService.getAll().subscribe({
      next: (data:SecteurDto[]) => {
        this.secteurList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
