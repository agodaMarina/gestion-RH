import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RapportService } from '../../../../api/services/rapport.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css',
})
export class RapportComponent implements OnInit, AfterViewInit {
  SexePieChart = new Chart({});
  AgeBarChart = new Chart({});
  SecteurPieChart = new Chart({});
  ContratPieChart = new Chart({});
  CspBarChart = new Chart({});
  DepartLineChart = new Chart({});

  constructor(private service: RapportService) {}
  ngAfterViewInit(): void {
    this.loadSexePieChart();
    this.loadAgeBarChart();
    this.loadSecteurBarChart();
    this.loadCspBarChart();
    this.loadContratPieChart();
    this.loadDepartLineChart();
    }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/dashboards-analytics.js';
    document.body.appendChild(script);
    
  }

  loadSexePieChart() {
    this.service.getBySexe().subscribe((data) => {
      const chartData = Object.values(data).map((value: any) => value);
 
      this.SexePieChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Répartition par sexe',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        legend: {
          enabled: true, // Active les légendes
          layout: 'vertical', // 'horizontal' ou 'vertical'
          align: 'right', // Aligne les légendes à droite
          verticalAlign: 'middle', // Alignement vertical : 'top', 'middle', 'bottom'
          itemStyle: {
            fontSize: '15px', // Taille de la police des légendes
            fontWeight: 'bold', // Style de police
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f} %',
              style: {
                fontSize: '0.7em',
                textOutline: 'none',
                opacity: 0.7,
              },
            },
          },
        },
        series: [
          {
            type: 'pie',
            name: 'valeur',
            data: chartData,
            colors: ['#ffab00','#696cff'],
          },
        ],
      });
    });
  }
  loadAgeBarChart() {
    this.service.getByAge().subscribe((data) => {
      // Séparation des données par sexe
      const ages = Object.values(data).map((item: any) => item[0]); // Liste des âges uniques
      const chartData = Object.values(data).map((value: any) => value);
      const dataFeminin = chartData
        .filter((item: any) => item[1] === 'Féminin')
        .map((item: any) => [parseInt(item[0], 10), parseInt(item[2], 10)]);
      const dataMasculin = chartData
        .filter((item: any) => item[1] === 'Masculin')
        .map((item: any) => [parseInt(item[0], 10), parseInt(item[2], 10)]);
  
      // Préparation des données pour les séries
      const femininData = ages.map(age => {
        const found = dataFeminin.find(item => item[0] === age);
        return found ? found[1] : 0;
      });
      const masculinData = ages.map(age => {
        const found = dataMasculin.find(item => item[0] === age);
        return found ? found[1] : 0;
      });
  
      this.AgeBarChart = new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Pyramide des âges',
        },
        xAxis: {
          title: {
            text: 'Nombre d\'employés',
          },
        },
        yAxis: {
          categories: ages, // Les âges comme catégories de l'axe X
          title: {
            text: 'Âge',
          },
         
        },
        series: [
          {
            type: 'column',
            name: 'Féminin',
            data: femininData,
            color:'#ffab00'
          },
          {
            type: 'column',
            name: 'Masculin',
            data: masculinData,
            color:'#696cff'
          },
        ],
      });
    });
  }
  loadSecteurBarChart() {
    this.service.getBySecteur().subscribe((data) => {
      const chartData = Object.values(data).map((value: any) => value);
      console.log(chartData);
      this.SecteurPieChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Répartition  par secteur',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        legend: {
          enabled: true, // Active les légendes
          layout: 'vertical', // 'horizontal' ou 'vertical'
          align: 'right', // Aligne les légendes à droite
          verticalAlign: 'middle', // Alignement vertical : 'top', 'middle', 'bottom'
          itemStyle: {
            fontSize: '15px', // Taille de la police des légendes
            fontWeight: 'bold', // Style de police
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f} %',
              style: {
                fontSize: '0.6em',
                textOutline: 'none',
                opacity: 0.7,
              },
            },
          },
        },
        series: [
          {
            type: 'pie',
            name: 'valeur',
            data: chartData,
          },
        ],
      });
    })
  }
  loadContratPieChart(){
    this.service.getByContrat().subscribe((data) => {
      const chartData = Object.values(data).map((value: any) => value);
      console.log(chartData);
      this.ContratPieChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Répartition  par Type de contrat',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        legend: {
          enabled: true, // Active les légendes
          layout: 'vertical', // 'horizontal' ou 'vertical'
          align: 'right', // Aligne les légendes à droite
          verticalAlign: 'middle', // Alignement vertical : 'top', 'middle', 'bottom'
          itemStyle: {
            fontSize: '15px', // Taille de la police des légendes
            fontWeight: 'bold', // Style de police
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f} %',
              style: {
                fontSize: '0.5em',
                textOutline: 'none',
                opacity: 0.7,
              },
            },
          },
        },
        series: [
          {
            type: 'pie',
            name: 'valeur',
            data: chartData,
          },
        ],
      });
    });
  }
  loadCspBarChart(){
    this.service.getByCsp().subscribe((data)=>{
      const chartData = Object.values(data).map((value: any) => value);
      this.CspBarChart=new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Catégorie Socioprofessionnelle',
        },
        xAxis: {
          title: {
            text: 'Nombre d\'employés',
          },
        },
        yAxis: {
          categories: Object.keys(data),
          
        },
        
        series: [
          
          {
            type: 'column',
            data: chartData,
            colorByPoint: true,
          },
        ],

  })})
}
  loadDepartLineChart(){
    this.service.getByDepart().subscribe((data)=>{
      const chartData = Object.values(data).map((value: any) => value);
      this.DepartLineChart=new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Causes de départ',
        },
        xAxis: {
          title: {
            text: 'Nombre d\'employés',
          },
        },
        yAxis: {
          categories: Object.keys(data),
          
        },
        legend: {
          enabled: true, // Active les légendes
          layout: 'vertical', // 'horizontal' ou 'vertical'
          align: 'right', // Aligne les légendes à droite
          verticalAlign: 'middle', // Alignement vertical : 'top', 'middle', 'bottom'
          itemStyle: {
            fontSize: '15px', // Taille de la police des légendes
            fontWeight: 'bold', // Style de police
          },
        },
        series: [
          {
            type: 'column',
            name: 'raison',
            data: chartData,
            colorByPoint: true,
          },
        ],
      })

    })
  }
}


