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
  initials: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute, private service: EmployeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //récupérer l'id de l'employé via l'url
    if (id) {
      this.getDetail(Number(id));
    }
    this.getAbsenceByUser(Number(id));
    this.getContratByUser(Number(id));
    this.getDepart(Number(id));
  }

  getDetail(id: number) {
    this.service.getEmploye(id).subscribe({
      next: (data: EmployeDto) => {
        this.employe = data;
        this.initials =
          this.employe.nom.charAt(0) +
          this.employe.prenom.charAt(0).toUpperCase();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getProfileImg(sexe: string): string {
    if (sexe === 'Masculin') {
      return 'assets/img/male_profile.png';
    } else {
      return 'assets/img/female_profile.png';
    }
  }
  getContratByUser(id: number) {
    this.service.getContratByUserId(id).subscribe({
      next: (data: Contrat) => {
        this.contrat = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAbsenceByUser(id: number) {
    this.service.getAllAbsencesByUserId(id).subscribe({
      next: (data: Absence[]) => {
        this.absences = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getDepart(id: number) {
    this.service.getDepartByUserId(id).subscribe({
      next: (data: Depart) => {
        this.depart = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getinverted(index: number): string {
    if (index % 2 === 0) {
      return 'timeline-inverted';
    }
    return '';
  }

  verifiedActivity() {
    if (!this.employe.isActif && this.employe.dateDepart) {
      this.message =
        'Cet employé est Inactif car il ne fait plus parti du personnel depuis le ' +
        this.employe.dateDepart;
    } else if (new Date(this.absences[this.absences.length - 1].dateDebut!) > new Date() && new Date(this.absences[this.absences.length - 1].dateFin!) > new Date()) {
      this.message = 'Cet employé est Inactif car du ' + this.absences[this.absences.length - 1].dateDebut + ' au ' + this.absences[this.absences.length - 1].dateFin 
      +'il est en permission de ' + this.absences[this.absences.length - 1].type;

    }
  }
}
