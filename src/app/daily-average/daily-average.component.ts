import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-daily-average',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container">
      <h2>Moyenne Quotidienne</h2>
      <div class="chart-wrapper">
        <canvas id="combinedChart" width="400" height="300"></canvas> <!-- Définir une largeur et une hauteur -->
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
      background-color: #f0f4ff;
    }
    .chart-wrapper {
      width: 100%;
      max-width: 400px; /* Limite la largeur du conteneur */
      margin: 0 auto; /* Centre le conteneur */
    }
    canvas {
      max-width: 100%; /* Assure que le canvas ne dépasse pas la largeur du conteneur */
      height: auto; /* Hauteur automatique pour garder le ratio */
    }
  `]
})
export class DailyAverageComponent implements OnInit {
  private readonly HUMIDITY_COLOR = '#03045F';
  private readonly TEMPERATURE_COLOR = '#50ABE4';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDailyAverages();
  }

  private fetchDailyAverages() {
    this.http.get<any>('http://localhost:3002/api/data/daily-averages')
      .subscribe({
        next: (data) => this.createCombinedChart(data.averageTemperature, data.averageHumidity),
        error: (error) => console.error('Error fetching daily averages:', error)
      });
  }

  private createCombinedChart(averageTemp: number, averageHumidity: number) {
    new Chart('combinedChart', {
      type: 'doughnut',
      data: {
        labels: ['Température', 'Humidité'],
        datasets: [{
          data: [averageTemp, averageHumidity],
          backgroundColor: [this.TEMPERATURE_COLOR, this.HUMIDITY_COLOR],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        responsive: true, // Assure que le graphique est réactif
        maintainAspectRatio: false, // Permet de gérer la taille
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: [
              `Température: ${averageTemp.toFixed(1)}°C`,
              `Humidité: ${averageHumidity.toFixed(1)}%`
            ],
            padding: 20
          }
        }
      }
    });
  }
}