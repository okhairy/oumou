import { Component, OnInit } from '@angular/core';
import { ArduinoDataService, SensorData } from '/home/oumoul-khairy/oumou/src/app/services/arduino-data.service';

@Component({
  selector: 'app-current-sensor-data',
  standalone: true,
  template: `
    <div class="sensor-card">
      <div class="sensor-background">
        <div class="sensor-overlay">
          <div class="sensor-data">
            <div>
              <span class="label">Température :</span>
              <span class="value">{{ currentTemperature }}°C</span>
            </div>
            <div>
              <span class="label">Humidité :</span>
              <span class="value">{{ currentHumidity }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sensor-card {
      position: relative;
      width: 100%; /* La carte occupe la largeur disponible */
      height: 150px; /* Gardez la hauteur initiale (ajustez si nécessaire) */
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .sensor-background {
      width: 100%;
      height: 100%;
      background-image: url('/assets/sun.png'); /* Chemin vers l'image */
      background-size: cover; /* L'image s'adapte pour remplir la carte */
      background-position: center; /* Centre l'image */
    }

    .sensor-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3); /* Légère opacité pour améliorer la lisibilité */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .sensor-data {
      color: white;
      text-align: center;
      font-size: 1.2rem; /* Taille réduite pour correspondre à la hauteur */
      font-weight: bold;
    }

    .label {
      display: block;
      font-size: 1rem; /* Taille réduite pour correspondre à l'espace */
      margin-bottom: 2px;
    }

    .value {
      font-size: 1.4rem; /* Légèrement plus grand pour mettre en valeur les données */
    }
  `]
})
export class CurrentSensorDataComponent implements OnInit {
  currentTemperature: number = 0;
  currentHumidity: number = 0;

  constructor(private arduinoDataService: ArduinoDataService) {}

  ngOnInit() {
    this.loadCurrentSensorData();
  }

  loadCurrentSensorData() {
    this.arduinoDataService.getTemperature().subscribe((data: SensorData) => {
      this.currentTemperature = data.value;
    });
    this.arduinoDataService.getHumidity().subscribe((data: SensorData) => {
      this.currentHumidity = data.value;
    });
  }
}

