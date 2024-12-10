import { Component, ViewChild, computed, effect, signal } from '@angular/core';

import { EmployeService } from '../../../../api/services/employe.service';
import { Employe, EmployeDto } from '../../../../api/models/employe';
import { Router } from '@angular/router';

import { DepartService } from '../../../../api/services/depart.service';
import { AbsenceService } from '../../../../api/services/absence.service';
import { ElementRef } from '@angular/core';
import { SearchService } from '../../../../api/services/search.service';

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
  employes: EmployeDto[] = [];
  paginateEmploye: EmployeDto[] = [];
  itemsPerPage = 8;
  currentPage = 1;
  departNumber!: number;
  totalAbsence!: number;
  totalEmployeActif!: number;
  selectedFile: File | null = null;
  filteredEmployees: any;

  
  constructor(
    private service: EmployeService,
    private router: Router,
    private departService: DepartService,
    private absenceService: AbsenceService,
    private searchService: SearchService
  ) {}

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
    this.getTotaldepart();
    this.getTotalAbsence();
    this.getTotalEmployeActif();
  }
  // Récupère la référence de l'input de fichier pour déclencher le clic
  @ViewChild('fileInput') fileInput!: ElementRef;

  onPageChange(page: number) {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginateEmploye = this.employes.slice(start, end);

  }
  initials(nom:string, prenom:string): string {
    return nom.charAt(0)+prenom.charAt(0).toUpperCase();
  }

  getClass(index:number):string {
    const classes = ['avatar bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; font-size: 18px; font-weight: bold;', 
      'avatar bg-danger text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; font-size: 18px; font-weight: bold;', 
      'avatar bg-success text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; font-size: 18px; font-weight: bold;',
       'avatar bg-info text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; font-size: 18px; font-weight: bold;'];
    return classes[index % classes.length];

  }
  get() {
    this.service.getEmployes().subscribe(
      (data: EmployeDto[]) => {
        this.employes = data;
       
        // Signal calculé pour filtrer la liste d'employés
        this.filteredEmployees = computed(() => {
          const query = this.searchService.searchQuery().toLowerCase();
          
          // Applique le filtre de recherche
          const filtered = this.employes.filter((emp) =>
            emp.nom.toLowerCase().includes(query)
          );

          // Calcule les indices de début et de fin pour la pagination
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;

          // Applique la pagination sur les résultats filtrés
          return filtered.slice(start, end);
        });
        this.paginateEmploye = this.filteredEmployees().slice(0, this.itemsPerPage);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTotaldepart() {
    this.departService.getAll().subscribe((data) => {
      this.departNumber = data.length;
    });
  }

  getTotalAbsence() {
    this.absenceService.getAllAbsences().subscribe((data) => {
      this.totalAbsence = data.length;
    });
  }

  getTotalEmployeActif() {
    this.service.getEmployes().subscribe((data) => {
      this.totalEmployeActif =
        data.length - (this.departNumber + this.totalAbsence);
    });
  }

  goToDetail(item: EmployeDto) {
    this.router.navigate(['/main/detail', item.id]);
  }

  supprimer(arg0: number) {
    throw new Error('Method not implemented.');
  }
  modifier(_t67: Employe) {
    throw new Error('Method not implemented.');
  }

  // Déclenche l'ouverture du sélecteur de fichier
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Gère la sélection du fichier
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.service.importEmployees(file).subscribe({
        next: (response) => alert('Importation réussie : ' + response),
        error: (error) => alert("Erreur d'importation : " + error.error),
      });
    }
  }

  // // Lance l'importation
  // onUpload() {
  //   if (this.selectedFile) {
  //     this.service.importEmployees(this.selectedFile).subscribe({
  //       next: (response) => alert(response),
  //       error: (error) => alert('Erreur : ' + error.error),
  //     });
  //   } else {
  //     alert('Veuillez sélectionner un fichier.');
  //   }
  // }
}
