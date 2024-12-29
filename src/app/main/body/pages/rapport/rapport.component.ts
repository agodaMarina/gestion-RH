import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RapportService } from '../../../../api/services/rapport.service';
import { Chart } from 'angular-highcharts';
import { Retraite } from '../../../../api/models/retraite';

@Component({
  selector: 'app-rapport',
  templateUrl: './statistique.component.html',
  styleUrl: './rapport.component.css',
})
export class RapportComponent implements OnInit, AfterViewInit {
  SexePieChart = new Chart({});
  AgeBarChart = new Chart({});
  SecteurPieChart = new Chart({});
  ContratPieChart = new Chart({});
  CspBarChart = new Chart({});
  DepartLineChart = new Chart({});
  RetraiteChart = new Chart({});
  selectedEmployees: Retraite[] = [];
  isModalVisible: boolean= false;

  constructor(private service: RapportService) {}
  ngAfterViewInit(): void {
    this.loadSexePieChart();
    this.loadAgeBarChart();
    this.loadSecteurBarChart();
    this.loadCspBarChart();
    this.loadContratPieChart();
    this.loadDepartLineChart();
    this.prevoirRetraites();
  }
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/dashboards-analytics.js';
    document.body.appendChild(script);
    this.prevoirRetraites();
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
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              style: {
                fontSize: '0.5em',
                textOutline: 'none',
                opacity: 0.7,
              },
            },
            showInLegend: true,
          },
        },
        series: [
          {
            type: 'pie',
            name: 'valeur',
            data: chartData,
            colors: ['#696cff', '#ffab00'],
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
      const femininData = ages.map((age) => {
        const found = dataFeminin.find((item) => item[0] === age);
        return found ? found[1] : 0;
      });
      const masculinData = ages.map((age) => {
        const found = dataMasculin.find((item) => item[0] === age);
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
          categories: ages, // Les âges comme catégories de l'axe X
          title: {
            text: 'Âge',
          },
        },
        yAxis: {
          title: {
            text: "Nombre d'employés",
          },
        },
        series: [
          {
            type: 'column',
            name: 'Féminin',
            data: femininData,
            color: '#ffab00',
          },
          {
            type: 'column',
            name: 'Masculin',
            data: masculinData,
            color: '#696cff',
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

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              style: {
                fontSize: '0.5em',
                fontWeight: 'bold',
                textOutline: 'none',
                opacity: 0.7,
              },
            },
            showInLegend: true,
          },
        },
        series: [
          {
            type: 'pie',
            name: 'pourcentage',
            data: chartData,
          },
        ],
      });
    });
  }
  loadContratPieChart() {
    this.service.getByContrat().subscribe((data) => {
      const chartData = Object.values(data).map((value: any) => value);
      console.log(chartData);
      this.ContratPieChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Répartition par type de contrat',
        },
        tooltip: {
          valueSuffix: '%',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,

              // format: '{point.name}: {point.percentage:.1f} %',
              style: {
                fontSize: '0.5em',
                fontWeight: 'bold',
                textOutline: 'none',
                opacity: 0.7,
              },
            },
          },
        },
        series: [
          {
            type: 'pie',
            name: 'pourcentage',
            data: chartData,
          },
        ],
      });
    });
  }
  loadCspBarChart() {
    this.service.getByCsp().subscribe((data) => {
      const chartData = Object.values(data).map((value: any) => value);
      this.CspBarChart = new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Catégorie Socioprofessionnelle',
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          categories: Object.keys(data),
          title: {
            text: "Nombre d'employés",
          },
        },

        series: [
          {
            type: 'column',
            data: chartData,
            colorByPoint: true,
          },
        ],
      });
    });
  }
  loadDepartLineChart() {
    this.service.getByDepart().subscribe((data) => {
      const chartData = Object.values(data).map((value: any) => value);
      this.DepartLineChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Causes de départ',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white',
              },
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%',
          },
        },

        series: [
          {
            type: 'pie',
            data: chartData,
          },
        ],
      });
    });
  }
  openModal() {
    this.isModalVisible = true;
  }

  prevoirRetraites() {
    this.service.prevoirRetraites().subscribe((data) => {
      // Transformer les données : [['1 année', 3], ['2 années', 4], ['3 années', 2]]
      const chartData = Object.entries(data).map(
        ([key, value]: [string, any[]]) => [
          `${key} année${parseInt(key, 10) > 1 ? 's' : ''}`, // Ajoute "année(s)" au label
          value.length, // Compte le nombre d'éléments dans chaque tableau
        ]
      );
      this.RetraiteChart = new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Prévision des départs à la retraite',
        },
        xAxis: {
          type: 'category',
          title: {
            text: 'Années restantes',
          },
        },
        yAxis: {
          title: {
            text: 'Nombre de départs',
          },
        },

        series: [
          {
            type: 'column',
            name: 'Départs à la retraite',
            data: chartData,
            colorByPoint: true,
            point: {
              events: {
                click: (event) => {
                  const index = event.point.index;
                  const clickedYear = Object.keys(data)[index];
                  this.selectedEmployees = (
                    data as unknown as { [key: string]: Retraite[] }
                  )[clickedYear]; // Met à jour la liste
                  this.openModal();
                },
              },
            },
          },
        ],
      });
    });
  }
}
