import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../../../api/services/employe.service';
import { Employe, EmployeDto } from '../../../../api/models/employe';
import { Contrat } from '../../../../api/models/contrat';
import { Depart } from '../../../../api/models/Depart';
import { Absence } from '../../../../api/models/Absence';
import { CspService } from '../../../../api/services/csp.service';
import { Csp } from '../../../../api/models/csp';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../../api/services/loading.service';
import { finalize } from 'rxjs';

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
  csps: Csp[] = [];
  initials: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: EmployeService,
    private cspService: CspService,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //récupérer l'id de l'employé via l'url
    if (id) {
      this.getDetail(Number(id));
    }
    this.getAbsenceByUser(Number(id));
    this.getContratByUser(Number(id));
    this.getDepart(Number(id));
    this.getCsp();
  }

  getDetail(id: number) {
    this.loadingService.setLoading(true);
    this.service
      .getEmploye(id)
      .pipe(finalize(() => this.loadingService.setLoading(false)))
      .subscribe({
        next: (data: EmployeDto) => {
          this.employe = data;
          this.initials =
            this.employe.nom.charAt(0) +
            this.employe.prenom.charAt(0).toUpperCase();
          this.verifiedActivity();
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
      this.message = `Cet employé est Inactif car il ne fait plus partie du personnel depuis le ${this.employe.dateDepart}.`;
    }

    // Vérifie s'il y a des absences et si elles sont valides
    if (this.absences?.length > 0) {
      const lastAbsence = this.absences[this.absences.length - 1];
      const dateFin = new Date(lastAbsence.dateFin!);
      const currentDate = new Date();

      if (dateFin > currentDate) {
        this.message =
          `Cet employé est Inactif car du ${lastAbsence.dateDebut} au ${lastAbsence.dateFin}, ` +
          `il est en permission de type ${lastAbsence.type}.`;
        console.log(this.message);
      }
    }
  }

  getCsp() {
    this.cspService.list().subscribe({
      next: (data: Csp[]) => {
        this.csps = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  update() {
    this.modifierEmploye();
  }

  addContrat() {
    this.service.AddContrat(this.employe.id, this.contrat).subscribe({
      next: (data: Contrat) => {
        this.contrat = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  modifierEmploye() {
    this.service.update(this.employe,this.contrat).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Employé modifié avec succès`,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de la modification de l'employé",
        });
      },
    });
  }

  renouvellerContrat() {
    this.service.renouvelerContrat(this.employe.id, this.contrat).subscribe({
      next: (data: Contrat) => {
        this.contrat = data;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Contrat renouvelé avec succès`,
        });
      },
      error: (error) => {
       this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors du renouvellement du contrat",
        });
      },
    });
  }

  rompreContrat() {
    alert('Voulez-vous vraiment rompre le contrat de cet employé ?') ;
    this.service.rompreContrat(this.employe.id, 'RUPTURE CONVENTIONNELLE').subscribe({
      next: (data: Contrat) => {
        this.contrat = data;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Contrat rompu avec succès`,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de la rupture du contrat",
        });
      },
    });
  }
}
