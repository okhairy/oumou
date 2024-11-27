/* import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArduinoDataService } from '../services/arduino-data.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="sensor-grid">
        <div class="sensor-card temperature">
          <h2>Température</h2>
          <div class="sensor-value">
            {{ currentTemperature | number:'1.1-1' }}°C
            <small>{{ temperatureTime }}</small>
          </div>
        </div>
        
        <div class="sensor-card humidity">
          <h2>Humidité</h2>
          <div class="sensor-value">
            {{ currentHumidity | number:'1.1-1' }}%
            <small>{{ humidityTime }}</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      background-color: #f4f7f6;
    }
    .sensor-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .sensor-card {
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
    }
    .sensor-value {
      font-size: 2.5em;
      font-weight: bold;
      color: #2c3e50;
    }
  `]
})
export default class DashboardComponent implements OnInit {
  currentTemperature: number = 0;
  currentHumidity: number = 0;
  temperatureTime: string = '';
  humidityTime: string = '';

  constructor(private arduinoService: ArduinoDataService) {}

  ngOnInit() {
    this.fetchSensorData();
  }

  private fetchSensorData() {
    // Récupération de la température
    this.arduinoService.getTemperature().subscribe({
      next: (data) => {
        this.currentTemperature = data.value;
        this.temperatureTime = data.time;
      },
      error: (err) => console.error('Erreur température', err)
    });

    // Récupération de l'humidité
    this.arduinoService.getHumidity().subscribe({
      next: (data) => {
        this.currentHumidity = data.value;
        this.humidityTime = data.time;
      },
      error: (err) => console.error('Erreur humidité', err)
    });
  }
} */
  //import { Component, OnInit } from '@angular/core';
  import { CurrentSensorDataComponent } from '/home/oumoul-khairy/oumou/src/app/components/current-sensor-data/current-sensor-data.component';
  import { HourlyDataComponent } from '../components/hourly-data/hourly-data.component';
  import { DailyAverageChartComponent } from '../daily-average-chart/daily-average-chart.component'; 
  import { ArduinoDataService } from '/home/oumoul-khairy/oumou/src/app/services/arduino-data.service';
  import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
  
  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
      CurrentSensorDataComponent,
      HourlyDataComponent,
      DailyAverageChartComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
      <div class="dashboard-wrapper">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="logo">
            <img src="assets/logo.png" alt="Yakar Logo" />
          </div>
          <nav>
            <ul>
              <li><a href="#">Dashboard</a></li>
            </ul>
          </nav>
          <button class="logout-btn">Déconnexion</button>
        </aside>
  
        <!-- Main Dashboard Content -->
        <main class="dashboard-content">
          <header class="header">
            <div class="user-info">
              <img src="assets/logo.png" alt="User Profile" />
              <span>user name</span>
            </div>
          </header>
          <div class="dashboard-container">
            <app-current-sensor-data></app-current-sensor-data>
            <app-hourly-data></app-hourly-data>
            <app-daily-average-chart></app-daily-average-chart>
          </div>
        </main>
      </div>
    `,
    styles: [`
      /* Set html and body to full height */
      html, body {
        height: 100%;
        margin: 0;
      }
  
      .dashboard-wrapper {
        display: flex;
        height: 100%;
        background-color: #f0f4f7;
      }
  
      /* Sidebar styles */
      .sidebar {
        width: 250px;
        background-color: #001f60;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        height: 100vh; /* Make sidebar fill the full height */
        position: fixed;
        left: 0;
        top: 0;
      }
  
      .logo img {
        width: 120px;
        margin-bottom: 20px;
      }
  
      .sidebar nav ul {
        list-style: none;
        padding: 0;
        width: 100%;
        text-align: center;
      }
  
      .sidebar nav ul li {
        margin: 15px 0;
      }
  
      .sidebar nav ul li a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        display: block;
        padding: 10px;
        border-radius: 8px;
        transition: background-color 0.3s;
      }
  
      .sidebar nav ul li a:hover {
        background-color: #003f8b;
      }
  
      .logout-btn {
        margin-top: auto;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
  
      .logout-btn:hover {
        background-color: #0056b3;
      }
  
      /* Main Content styles */
      .dashboard-content {
        margin-left: 250px; /* Leave space for the sidebar */
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
      }
  
      .header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
      }
  
      .header .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
  
      .header .user-info img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
  
      .dashboard-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        padding: 20px;
      }
  
      /* Responsive Styles */
      @media (max-width: 1024px) {
        .dashboard-wrapper {
          flex-direction: column;
        }
  
        .sidebar {
          width: 100%;
          height: auto;
          position: relative;
        }
  
        .dashboard-content {
          margin-left: 0;
        }
  
        .dashboard-container {
          grid-template-columns: repeat(2, 1fr);
        }
      }
  
      @media (max-width: 768px) {
        .dashboard-container {
          grid-template-columns: 1fr;
        }
  
        .header .user-info img {
          width: 30px;
          height: 30px;
        }
  
        .logout-btn {
          font-size: 14px;
        }
      }
    `]
  })
  export class DashboardComponent implements OnInit {
    constructor(private arduinoDataService: ArduinoDataService) {}
  
    ngOnInit() {
      // Charger les données initiales
      this.loadData();
    }
  
    loadData() {
      // Récupérer les données depuis le service Arduino
      // et les passer aux sous-composants
    }
  }
  