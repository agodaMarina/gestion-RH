import { Component, OnInit } from '@angular/core';
import {
  Candidature,
  CandidatureCreation,
} from '../../../../../../api/models/Candidature';
import { CandidatureService } from '../../../../../../api/services/candidature.service';
import { RecrutementService } from '../../../../../../api/services/recrutement.service';
import { ActivatedRoute } from '@angular/router';
import { RecrutementDto } from '../../../../../../api/models/recrutement';
import { Evaluation } from '../../../../../../api/models/evaluation';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css',
})
export class EvaluationComponent implements OnInit {
  Listcandidats: CandidatureCreation[] = [];
  recrutement: RecrutementDto = {};
  
  id: number = 0;
  note: number = 0;
  ListEvaluation:Evaluation [] = [];
  evalationForm:FormGroup;

  constructor(
    private recrutementService: RecrutementService,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder
  ) {
    this.evalationForm = this.formBuilder.group({
      notePresentation: [0],
      noteExperience: [0],
      noteCompetenceEtAtout: [0],
      noteSavoirEtre: [0],
      noteQualiteEtDefaut: [0],
      candidat: [0],
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
        this.Listcandidats = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  evaluer(){

  }
}
