import { Component, OnInit } from '@angular/core';
import { Candidature } from '../../../../../../api/models/Candidature';
import { CandidatureService } from '../../../../../../api/services/candidature.service';
import { RecrutementService } from '../../../../../../api/services/recrutement.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css',
})
export class EvaluationComponent implements OnInit {
submitScore(_t8: { name: string; roleFit: string; testScore: number; interviewScore: number; }) {
throw new Error('Method not implemented.');
}
  Listcandidats: Candidature[] = [];
  recrutementId: number | null = null;
  note:number=0;

  constructor(private service: CandidatureService,private recrutementService:RecrutementService) {}

  ngOnInit(): void {
    this.getCandidats();
  }

  getCandidats() {
    this.recrutementId=this.recrutementService.getRecrutementId();
    this.service.listerParRecrutement(this.recrutementId!).subscribe((data) => {
      this.Listcandidats = data;
    });
  }
  searchQuery: string = '';
  selectedResult: string = 'all';
  roleFit: string = 'all';

  candidates = [
    {
      name: 'Albert Necker',
      roleFit: 'Very High',
      testScore: 100,
      interviewScore: 100,
      note:0
    },
    {
      name: 'Venda Baskar',
      roleFit: 'High',
      testScore: 100,
      interviewScore: 99,
      note:0
    },
    {
      name: 'Nickolas Schmidt',
      roleFit: 'High',
      testScore: 100,
      interviewScore: 99,
      note:0
    },
    {
      name: 'Eston Etaly',
      roleFit: 'Medium',
      testScore: 88,
      interviewScore: 88,
      note:0
    },
    {
      name: 'Jose Ferro',
      roleFit: 'Low',
      testScore: 89,
      interviewScore: 44,
      note:0
    },
    {
      name: 'Vika Stalvant',
      roleFit: 'Very Low',
      testScore: 40,
      interviewScore: 44,
      note:0
    },
  ];
}





