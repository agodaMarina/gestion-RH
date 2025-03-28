import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../api/services/search.service';
import { AuthenticationService } from '../../../api/services/authentication.service';
import { User } from '../../../api/models/user';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user:User={};
  constructor(
    private searchService: SearchService,
    private route:Router,
    private service: AuthenticationService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    const scripts = ['assets/js/main.js', 'assets/vendor/js/menu.js'];
    scripts.forEach((scriptPath) => {
      const script = document.createElement('script');
      script.src = scriptPath;

      document.body.appendChild(script);
    });

    this.profile();
  }

  // Fonction appelée lorsque l'utilisateur saisit dans le champ de recherche
  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchService.setSearchQuery(query);
    console.log(query);
  }
  profile(){
    this.service.getProfile().subscribe({
      next:(data)=>{
       this.user=data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  openBugReportModal() {
    this.modalService.openModal();
  }
  
  logout() {
    this.service.logout();
  }

}
