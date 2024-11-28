import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez CommonModule
import { ArduinoDataService, SensorData } from '/home/oumoul-khairy/oumou/src/app/services/arduino-data.service';

@Component({
  selector: 'app-current-sensor-data',
  standalone: true,
  imports: [CommonModule], // Ajoutez CommonModule ici
  template: `
    <div class="sensor-card" [ngStyle]="{ 'background-image': 'url(' + backgroundImage + ')' }">
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
  `,
  styles: [`
    .sensor-card {
      position: relative;
      width: 100%; /* La carte occupe la largeur disponible */
      height: 250px; /* Augmentez la hauteur pour une meilleure visibilité */
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
      font-size: 1.5rem; /* Augmentez la taille des données pour plus de visibilité */
      font-weight: bold;
    }

    .label {
      display: block;
      font-size: 1.2rem; /* Augmentez la taille de la label */
      margin-bottom: 2px;
    }

    .value {
      font-size: 1.6rem; /* Augmentez la taille de la valeur */
    }
  `]
})
export class CurrentSensorDataComponent implements OnInit {
  currentTemperature: number = 0;
  currentHumidity: number = 0;
  backgroundImage: string = '/assets/sun.png'; // Image par défaut

  constructor(private arduinoDataService: ArduinoDataService) {}

  ngOnInit() {
    this.loadCurrentSensorData();
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
}