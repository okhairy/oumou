/* import { Component, OnInit } from '@angular/core';
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
        <canvas id="combinedChart" width="400" height="300"></canvas> 
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
      max-width: 400px; 
      margin: 0 auto; 
    }
    canvas {
      max-width: 100%; 
      height: auto; 
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
        responsive: true, 
        maintainAspectRatio: false, 
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
} */
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
          <canvas id="combinedChart" width="400" height="300"></canvas>
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
        max-width: 400px;
        margin: 0 auto;
      }
      canvas {
        max-width: 100%;
        height: auto;
      }
    `]
  })
  export class DailyAverageComponent implements OnInit {
    private readonly HUMIDITY_COLOR = '#03045F';
    private readonly TEMPERATURE_COLOR = '#50ABE4';
  
    // Valeurs par défaut
    private readonly DEFAULT_AVERAGE_TEMP = 20; // Valeur par défaut pour la température
    private readonly DEFAULT_AVERAGE_HUMIDITY = 50; // Valeur par défaut pour l'humidité
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.fetchDailyAverages();
    }
  
    private fetchDailyAverages() {
      this.http.get<any>('http://localhost:3002/api/data/daily-averages')
        .subscribe({
          next: (data) => {
            const averageTemp = data.averageTemperature ?? this.DEFAULT_AVERAGE_TEMP; // Utiliser la valeur par défaut si non disponible
            const averageHumidity = data.averageHumidity ?? this.DEFAULT_AVERAGE_HUMIDITY; // Utiliser la valeur par défaut si non disponible
            this.createCombinedChart(averageTemp, averageHumidity);
          },
          error: (error) => {
            console.error('Error fetching daily averages:', error);
            // Utiliser les valeurs par défaut en cas d'erreur
            this.createCombinedChart(this.DEFAULT_AVERAGE_TEMP, this.DEFAULT_AVERAGE_HUMIDITY);
          }
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
          responsive: true,
          maintainAspectRatio: false,
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