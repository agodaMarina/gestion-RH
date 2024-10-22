import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeService } from '../../../../api/services/employe.service';
import { Employe } from '../../../../api/models/employe';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
@Component({
  selector: 'app-listeemploye',
  templateUrl: './listeemploye.component.html',
  styleUrl: './listeemploye.component.css',
})
export class ListeemployeComponent {
supprimer(arg0: number) {
throw new Error('Method not implemented.');
}
modifier(_t67: Employe) {
throw new Error('Method not implemented.');
}
  employes:Employe[] = [];
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  constructor(private service: EmployeService) {}

  ngOnInit() {
    const scripts = [
      'assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js',
      'assets/js/app-user-list',
    ];
    scripts.forEach((scriptPath) => {
      const script = document.createElement('script');
      script.src = scriptPath;
      document.body.appendChild(script);
    });

    this.get();
  }

  get() {
    this.service.getEmployes().subscribe(
    (data: Employe[]) => {
      this.employes = data;
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
