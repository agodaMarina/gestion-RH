import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrl: './recrutement.component.css'
})
export class RecrutementComponent implements OnInit{
  items!: MenuItem[];
  subscription!: Subscription;

  constructor(private messageService:MessageService){}

  ngOnInit(): void {
   this.items = [
            {
                label: 'Poste à pourvoir',
                routerLink: 'add-poste'
            },
            {
                label: 'Candidatures',
                routerLink: 'add-candidats'
            },
            {
                label: 'Evaluation',
                routerLink: 'add-evaluation'
            },
            {
                label: 'Sélection',
                routerLink: 'end-recrutement'
            }
        ];


  }
}
