import { Component, OnInit } from '@angular/core';
import { Poste } from '../../../../api/models/Poste';
import { PosteService } from '../../../../api/services/poste.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrl: './poste.component.css',
})
export class PosteComponent implements OnInit {
  poste: Poste = {};
  posteForm: FormGroup;
  postes: Poste[] = [];

  constructor(
    private service: PosteService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.posteForm = this.formBuilder.group({
      libelle: [''],
      niveauEtude: [''],
      description: [''],
      niveauDeSalaire: [0],
      recruteur: [''],
      remarque: [''],
    });
  }

  ngOnInit(): void {
    this.liste();
  }

  addPoste() {
    this.service.createPoste(this.posteForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Poste ajouté avec succès',
        });
        this.liste();
        this.posteForm?.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de l'ajout du poste",
        });
      },
    });
  }

  liste() {
    this.service.getAllPostes().subscribe({
      next: (data: Poste[]) => {
        this.postes = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération de la liste des postes',
        });
      },
    });
  }

  deletePoste(id: number) {
    this.service.deletePoste(id).subscribe({
      next: () => {
        this.liste();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  afficher(poste: Poste) {
    this.posteForm.patchValue({
      libelle: poste.libelle,
      niveauEtude: poste.niveauEtude,
      description: poste.description,
      niveauDeSalaire: poste.niveauDeSalaire,
      recruteur: poste.recruteur,
      remarque: poste.remarque,
    });
  }

  update() {
    if (this.poste.id)
    this.service.updatePoste(this.poste.id, this.posteForm?.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Poste modifié avec succès',
        });
        this.liste();
        this.posteForm?.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Erreur lors de la modification du poste",
        });
      },
    });
  }
}
