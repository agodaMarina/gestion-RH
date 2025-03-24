import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Absence } from '../../../../api/models/Absence';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AbsenceService } from '../../../../api/services/absence.service';
import { EmployeService } from '../../../../api/services/employe.service';
import { EmployeDto } from '../../../../api/models/employe';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css',
})
export class AbsenceComponent implements OnInit {
  absence: Absence = {};
  absencesActive: Absence[] = [];
  abForm: FormGroup;
  counts: { [key: string]: number } = {};
  absences: Absence[] = [];
  employes!: EmployeDto[];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  typeConge = [
    'CONGE',
    'MATERNITE',
    'PERMISSION',
    'REPOS MEDICAL',
    'SUSPENSION',
    'MISE A PIED',
    'CONGE FORMATION',
  ];

  constructor(
    private service: AbsenceService,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private emploiyerService: EmployeService
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.abForm = this.formbuilder.group({
      type: ['', Validators.required],
      motif: ['', Validators.required],
      dateDebut: [
        '',
        [
          Validators.required,
          (control: AbstractControl) => {
            if (!control.value) return null;
            const inputDate = new Date(control.value);
            inputDate.setHours(0, 0, 0, 0);
            return inputDate >= today ? null : { dateInvalid: true };
          },
        ],
      ],
      dateFin: [
        '',
        [
          Validators.required,
          (control: AbstractControl) => {
            if (!control.value) return null;
            const startDate = new Date(this.abForm?.get('dateDebut')?.value);
            const endDate = new Date(control.value);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            return endDate >= startDate ? null : { endDateInvalid: true };
          },
        ],
      ],
      idEmploye: [],
    });
    this.abForm.get('dateDebut')?.valueChanges.subscribe(() => {
      this.abForm.get('dateFin')?.updateValueAndValidity();
    });
  }

  onPageChange($event: number) {
    this.currentPage = $event;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.absences = this.absences.slice(start, end);
  }

  ngOnInit(): void {
    this.liste();
    this.listeEmploye();
  }

  add() {
    if (this.abForm?.valid) {
      this.service.createAbsence(this.abForm?.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Nouvelle absence ajoutée avec succès',
          });
          this.liste();
          this.abForm?.reset();
          const modal = document.querySelector('.modal');
          if (modal) {
            modal.classList.remove('show');
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Nouvelle absence ajoutée avec succès',
          });
        },
      });
    } else {
      Object.keys(this.abForm.controls).forEach((key) => {
        const control = this.abForm.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
    }
  }

 
  isFieldInvalid(fieldName: string): boolean {
    const field = this.abForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.abForm.get(controlName);

    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors['dateInvalid']) {
        return 'La date de début doit être égale ou postérieure à la date actuelle';
      }
      if (control.errors['endDateInvalid']) {
        return 'La date de fin doit être égale ou postérieure à la date de début';
      }
      if (control.errors['required']) {
        return 'Ce champ est requis';
      }
    }
    return '';
  }

  liste() {
    this.service.getAllAbsences().subscribe({
      next: (value: Absence[]) => {
        this.absences = value;
        this.countAbsenceTypes(value);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'affichage des absences",
        });
      },
    });
    this.service.getAbsencesActive().subscribe({
      next: (value: Absence[]) => {
        this.absencesActive = value;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'affichage des absences actives",
        });
      },
    });
  }

  getClass(item: Absence) {
    return item.type === 'MATERNITE' || item.type === 'REPOS MEDICAL'
      ? 'badge bg-primary'
      : item.type === 'PERMISSION' || item.type === 'CONGE FORMATION'
      ? 'badge bg-success'
      : item.type === 'MISE A PIED' || item.type === 'SUSPENSION'
      ? 'badge bg-info'
      : 'badge bg-warning';
  }

  details(absence: Absence) {
    this.abForm?.patchValue({
      type: absence.type,
      motif: absence.motif,
      dateDebut: absence.dateDebut,
      dateFin: absence.dateFin,
      idEmploye: absence.employe,
    });
    this.abForm?.disable();
  }

  supprimer(id: number) {
    this.confirmationService.confirm({
      header: 'Etes-Vous sûr ?',
      message: 'Veuillez confirmer la suppression',
      accept: () => {
        this.service.deleteAbsence(id).subscribe({
          next: () => {
            this.liste();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: "Erreur lors de la suppression de l'absence",
            });
          },
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Vous venez de supprimer un élément',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Vous avez annulé la suppression d un élément',
          life: 3000,
        });
      },
    });
  }

  modifier(item: Absence) {
    if (item.id)
      this.service.updateAbsence(item.id, this.absence).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Absence modifiée avec succès',
          });
          this.liste();
          this.abForm?.reset();
          const modal = document.querySelector('.modal');
          if (modal) {
            modal.classList.remove('show');
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Erreur lors de la modification de l'absence",
          });
        },
      });
  }

  listeEmploye() {
    this.emploiyerService.getEmployeActifs().subscribe({
      next: (value: EmployeDto[]) => {
        this.employes = value
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'affichage des employés",
        });
      },
    });
  }

  countAbsenceTypes(absences: Absence[]): { [key: string]: number } {
    this.counts = {
      CONGE: 0,
      'REPOS MEDICAL': 0,
      PERMISSION: 0,
      MATERNITE: 0,
      'MISE A PIED': 0,
      SUSPENSION: 0,
      'CONGE FORMATION': 0,
    };

    absences.forEach((absence) => {
      if (absence.type && absence.type in this.counts) {
        // Incrémente le type spécifique
        this.counts[absence.type as keyof typeof this.counts]++;
      }
    });

    return this.counts;
  }
}
