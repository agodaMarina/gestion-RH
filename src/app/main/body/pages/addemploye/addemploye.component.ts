import { Component, OnInit } from '@angular/core';
import { EmployeDto } from '../../../../api/models/employe';
import { EmployeService } from '../../../../api/services/employe.service';
import { Contrat } from '../../../../api/models/contrat';
import { MessageService } from 'primeng/api';
import { Csp } from '../../../../api/models/csp';
import { PosteDto } from '../../../../api/models/PosteDto';
import { PosteService } from '../../../../api/services/poste.service';
import { CspService } from '../../../../api/services/csp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addemploye',
  templateUrl: './addemploye.component.html',
  styleUrl: './addemploye.component.css',
})
export class AddemployeComponent implements OnInit {
  employe!: EmployeDto;
  contrat: Contrat = {};
  csps: Csp[] = [];
  postes: PosteDto[] = [];
  form: FormGroup;
  constructor(
    private service: EmployeService,
    private posteService: PosteService,
    private cspService: CspService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nom: [''],
      prenom: [''],
      tel: [''],
      adresse: [''],
      sexe: [''],
      situationFamiliale: [''],
      dateNaissance: [''],
      csp: [''],
      poste: [''],
    });
  }
  ngOnInit(): void {
    this.getCsp();
    this.getPoste();
  }

  add() {
    this.service.addEmploye(this.form.value, this.contrat).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Employé ajouté',
          detail: 'Employé ajouté avec succès',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCsp() {
    this.cspService.list().subscribe({
      next: (data) => {
        this.csps = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPoste() {
    this.posteService.getAllPostes().subscribe({
      next: (data) => {
        this.postes = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
