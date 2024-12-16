import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../../../../api/services/candidature.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {

  CandidatureCreation,
} from '../../../../api/models/Candidature';

import { RecrutementService } from '../../../../api/services/recrutement.service';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrl: './add-candidat.component.css',
})
export class 
AddCandidatComponent implements OnInit {
  Listcandidats: CandidatureCreation[] = [];
  recrutementId: number | null = null
  candidatureForm: FormGroup;

  constructor(
    private service: CandidatureService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private recrutementService: RecrutementService
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
    this.loadFromLocalStorage();
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
  ajoutCandidature() {
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
}
