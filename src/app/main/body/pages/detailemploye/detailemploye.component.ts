import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../../../api/services/employe.service';
import { Employe, EmployeDto } from '../../../../api/models/employe';
import { Contrat } from '../../../../api/models/contrat';
import { Depart } from '../../../../api/models/Depart';
import { Absence } from '../../../../api/models/Absence';

@Component({
  selector: 'app-detailemploye',
  templateUrl: './detailemploye.component.html',
  styleUrl: './detailemploye.component.css',
})
export class DetailemployeComponent implements OnInit {
  employe!: EmployeDto;
  contrat: Contrat = {};
  depart: Depart = {};
  absences: Absence[] = [];
  initials:string="";

  constructor(private route: ActivatedRoute, private service: EmployeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //récupérer l'id de l'employé via l'url
    if (id) {
      this.getDetail(Number(id));
    }
    this.getAbsenceByUser();
    this.getContratByUser();
    this.getDepart();
  }

  getDetail(id: number) {
    this.service.getEmploye(id).subscribe({
      next: (data: EmployeDto) => {
        this.employe = data;
        this.initials = this.employe.nom.charAt(0)+this.employe.prenom.charAt(0).toUpperCase();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getContratByUser() {
    this.service.getContratByUserId(this.employe.id).subscribe({
      next: (data: Contrat) => {
        this.contrat = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAbsenceByUser() {
    this.service.getAllAbsencesByUserId(this.employe.id).subscribe({
      next: (data: Absence[]) => {
        this.absences = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getDepart() {
    this.service.getDepartByUserId(this.employe.id).subscribe({
      next: (data: Depart) => {
        this.depart = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
