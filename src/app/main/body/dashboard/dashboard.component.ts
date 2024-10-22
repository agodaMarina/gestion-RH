import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models/user';
import { AuthenticationService } from '../../../api/services/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user:User = {};

  constructor(private service:AuthenticationService) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/dashboards-analytics.js';
    document.body.appendChild(script);
    this.getProfile();
  }

getProfile(){
this.service.getProfile().subscribe({
  next:(data)=>{
    this.user=data
  },
  error:(err)=>{
    console.log(err)
  }
});
}

}
