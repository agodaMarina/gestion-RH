import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../../../api/services/employe.service';
import { Employe, EmployeDto } from '../../../../api/models/employe';
import { Contrat } from '../../../../api/models/contrat';
import { Depart } from '../../../../api/models/Depart';
import { Absence } from '../../../../api/models/Absence';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
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
  calendarOptions: CalendarOptions={
    initialView: 'dayGridMonth',
    plugins:[ dayGridPlugin, interactionPlugin],
    headerToolbar:{
      left: 'retour,suivant today', // Boutons pour naviguer
      center: 'Absences', // Titre au centre
      right: 'dayGridMonth,timeGridWeek,timeGridDay', // Changements de vu
    },
     events: [
      // Événements dynamiques
      {
        title: 'Client Presentation Preparation',
        start: '2024-03-25T08:00:00',
        end: '2024-03-25T09:00:00',
        backgroundColor: '#dcb5f4',
      },
      {
        title: 'New Project Kickoff Meeting',
        start: '2024-03-25T09:00:00',
        end: '2024-03-25T10:00:00',
        backgroundColor: '#b5d6f4',
      },
      {
        title: 'Design Revisions',
        start: '2024-03-25T09:00:00',
        end: '2024-03-25T10:30:00',
        backgroundColor: '#f4ddb5',
      },
    ],
    editable: true, // Permet le glisser-déposer
  };

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
}
