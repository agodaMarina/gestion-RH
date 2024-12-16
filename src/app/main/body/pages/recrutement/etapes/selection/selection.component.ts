import { Component, OnInit } from '@angular/core';
import { RecrutementDto } from '../../../../../../api/models/recrutement';
import {
  Candidature,
  CandidatureCreation,
} from '../../../../../../api/models/Candidature';
import { RecrutementService } from '../../../../../../api/services/recrutement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  candidates = [
    {
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '0601020304',
      adresse: '10 rue de Paris, 75001 Paris',
      dateEntretien1: '2024-03-15',
      notePresentation: 8,
      noteExperience: 7,
      noteCompetenceEtAtout: 9,
      noteSavoirEtre: 8,
      noteQualiteEtDefaut: 7,
      prochaineAction: 'Envoyer une offre',
      apreciationGlobale: 'Bon profil, avec une excellente présentation.',
      estRetenu: true,
    },
    {
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      telephone: '0612345678',
      adresse: '20 avenue des Champs, 75008 Paris',
      dateEntretien1: '2024-03-10',
      notePresentation: 6,
      noteExperience: 7,
      noteCompetenceEtAtout: 8,
      noteSavoirEtre: 6,
      noteQualiteEtDefaut: 5,
      prochaineAction: 'Planifier un second entretien',
      apreciationGlobale:
        'Compétences techniques solides mais présentation à travailler.',
      estRetenu: false,
    },
    {
      nom: 'Lemoine',
      prenom: 'Antoine',
      email: 'antoine.lemoine@example.com',
      telephone: '0623456789',
      adresse: '5 place Bellecour, 69002 Lyon',
      dateEntretien1: '2024-03-12',
      noteCompetenceEtAtout: 7,
      noteSavoirEtre: 9,
      prochaineAction: 'Attente de décision',
      apreciationGlobale: "Très bon savoir-être mais manque d'expérience.",
      estRetenu: false,
    },
  ];

  constructor(
    private recrutementService: RecrutementService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
        console.log(error);
      },
    });

    this.recrutementService.getCandidats(this.id).subscribe({
      next: (data: CandidatureCreation[]) => {
        this.candidats = data;
      },
      error: (error: any) => {
        console.log(error);
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
        console.log(error);
      },
    });
  }
}
