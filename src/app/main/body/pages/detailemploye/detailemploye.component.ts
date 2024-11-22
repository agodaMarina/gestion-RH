import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../../../api/services/employe.service';
import { Employe } from '../../../../api/models/employe';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-detailemploye',
  templateUrl: './detailemploye.component.html',
  styleUrl: './detailemploye.component.css',
})
export class DetailemployeComponent implements OnInit {
  employe!: Employe;
  tabs: { title: string, content: string }[] = [];



  constructor(private route: ActivatedRoute, private service: EmployeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //récupérer l'id de l'employé via l'url
    if (id) {
      this.getDetail(Number(id));
    }
    
    
  }

  getDetail(id: number) {
    this.service.getEmploye(id).subscribe({
      next: (data: Employe) => {
        this.employe = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
