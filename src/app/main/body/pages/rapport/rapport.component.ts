import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../../../api/services/rapport.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent implements OnInit {

  constructor(private service:RapportService) { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/dashboards-analytics.js';
    document.body.appendChild(script);
  }


}
