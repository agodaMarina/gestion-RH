import { Component, OnInit } from '@angular/core';
import { PosteService } from '../../../../../../api/services/poste.service';
import { Poste } from '../../../../../../api/models/Poste';
import { PosteDto } from '../../../../../../api/models/PosteDto';
import { RecruteurService } from '../../../../../../api/services/recruteur.service';
import { Recruteur } from '../../../../../../api/models/recruteur';
import { SecteurService } from '../../../../../../api/services/secteur.service';
import { RecrutementService } from '../../../../../../api/services/recrutement.service';
import { Recrutement } from '../../../../../../api/models/recrutement';
import { SecteurDto } from '../../../../../../api/models/secteur';

@Component({
  selector: 'app-add-poste',
  templateUrl: './add-poste.component.html',
  styleUrl: './add-poste.component.css',
})
export class AddPosteComponent implements OnInit {
  poste: PosteDto = {
    libelle: '',
    niveauEtude: '',
    description: '',
    niveauDeSalaire: 0,
    remarque: '',
    secteur: '',
  };
  posteList: PosteDto[] = [];
  recruteurList: Recruteur[] = [];
  secteurList:SecteurDto[] = [];
  recruteur: Recruteur = { nom: '' };
  posteId: number = 0;
  recuteurId: number = 0;

  constructor(
    private recrutementService: RecrutementService,
    private posteService: PosteService,
    private recruteurService: RecruteurService,
    private secteurService: SecteurService
  ) {}

  ngOnInit(): void {
    this.getSecteur();
    this.listeDesPotes();
    this.listeDesRecruteurs();
  }

  // addPoste() {
  //   this.posteService.createPoste(this.poste).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.listeDesPotes();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  addRecruteur() {
    this.recruteurService.create(this.recruteur).subscribe(
      (data) => {
        console.log(data);
        this.listeDesRecruteurs();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listeDesPotes() {
    this.posteService.getAllPostes().subscribe(
      (data) => {
        this.posteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listeDesRecruteurs() {
    this.recruteurService.findAll().subscribe(
      (data) => {
        this.recruteurList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // saveRecrutement() {
  //   this.recrutementService
  //     .addRecrutement(this.posteId, this.recuteurId)
  //     .subscribe({
  //       next: (data:Recrutement) => {
  //         if (data.id)
  //         this.recrutementService.setRecrutementId(data.id);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       },
  //     });
  // }

  getSecteur(){
    this.secteurService.getAll().subscribe({
      next: (data:SecteurDto[]) => {
        this.secteurList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
