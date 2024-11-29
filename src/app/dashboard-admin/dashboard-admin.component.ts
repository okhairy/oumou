import { Component , OnInit} from '@angular/core';
import { ArduinoDataService,SensorData } from '../services/arduino-data.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})





export class DashboardAdminComponent implements OnInit {
  currentTemperature: number = 0;
  currentHumidity: number = 0;
  backgroundImage: string = '/assets/sun.png'; // Image par défaut

  data: { hour: string, temperature: number, humidity: number, date: string }[] = [];
  specificHours: string[] = ['12h10', '12h11', '12h12'];
  loading = false;

  private readonly HUMIDITY_COLOR = '#03045F';
    private readonly TEMPERATURE_COLOR = '#50ABE4';
  
    // Valeurs par défaut
    private readonly DEFAULT_AVERAGE_TEMP = 20; // Valeur par défaut pour la température
    private readonly DEFAULT_AVERAGE_HUMIDITY = 50; // Valeur par défaut pour l'humidité
  

  constructor(private arduinoDataService: ArduinoDataService, private dataService: DataService,private http: HttpClient) {}

  ngOnInit() {
    this.loadCurrentSensorData();
    this.fetchData();
    this
    .fetchDailyAverages();
    this.initializeChart();
  }



  loadCurrentSensorData() {
    this.arduinoDataService.getTemperature().subscribe((data: SensorData) => {
      this.currentTemperature = data.value;
      this.updateBackgroundImage(); // Mettez à jour l'image de fond
    });
    this.arduinoDataService.getHumidity().subscribe((data: SensorData) => {
      this.currentHumidity = data.value;
    });
  }

  private updateBackgroundImage() {
    if (this.currentTemperature > 27) {
      this.backgroundImage = '/assets/copy.png'; // Image lorsque la température est supérieure à 27°
    } else {
      this.backgroundImage = '/assets/sun.png'; // Image par défaut
    }
  }
  getHumidityImage(humidity: number): string {
    if (humidity < 30) {
      return 'assets/sun.png'; // Faible humidité
    } else if (humidity >= 30 && humidity <= 60) {
      return 'assets/humidité.png'; // Humidité normale
    } else {
      return 'assets/chaleur.png'; // Forte humidité
    }
  }
  


  fetchData(): void {
    this.loading = true;
    this.data = [];

    const requests = this.specificHours.map(hour => 
      this.dataService.getDataByHour(hour).toPromise()
        .then(response => ({ hour, ...response }))
        .catch(() => ({ hour, error: true })) // Capture l'erreur sans message
    );

    Promise.all(requests).then(results => {
      this.data = results.filter(res => !res.error);
      this.loading = false;
    });
  }


  hasDataForHour(hour: string): boolean {
    return this.data.some(d => d.hour === hour);
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
  initializeChart() {
    // Données fictives pour les tests
    const fakeData = [
      { hour: '10h00', temperature: 22, humidity: 55 },
      { hour: '11h00', temperature: 24, humidity: 50 },
      { hour: '12h00', temperature: 26, humidity: 60 },
      { hour: '13h00', temperature: 27, humidity: 58 },
      { hour: '14h00', temperature: 28, humidity: 65 },
      { hour: '15h00', temperature: 29, humidity: 70 },
      { hour: '16h00', temperature: 30, humidity: 75 },
      { hour: '17h00', temperature: 31, humidity: 72 },
    ];
  
    const ctx = document.getElementById('historyChart') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'bar', // Type de graphique en barres verticales
      data: {
        labels: fakeData.map(d => d.hour), // Heures fictives
        datasets: [
          {
            label: 'Température (°C)',
            data: fakeData.map(d => d.temperature), // Températures fictives
            backgroundColor: 'rgba(80, 171, 228, 0.8)', // Couleur des barres pour température
            borderColor: this.TEMPERATURE_COLOR,
            borderWidth: 1
          },
          {
            label: 'Humidité (%)',
            data: fakeData.map(d => d.humidity), // Humidités fictives
            backgroundColor: 'rgba(3, 4, 95, 0.8)', // Couleur des barres pour humidité
            borderColor: this.HUMIDITY_COLOR,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Historique des températures et humidités (données fictives)'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Heures'
            },
            stacked: false // Les barres ne sont pas empilées
          },
          y: {
            title: {
              display: true,
              text: 'Valeurs'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
  

}
