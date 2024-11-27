import { Component, OnInit } from '@angular/core';
import { ArduinoDataService, SensorData } from '../../services/arduino-data.service';

@Component({
  selector: 'app-hourly-data',
  standalone: true,
  template: `
    <div class="sensor-card">
      <h2>Données horaires</h2>
      <div class="sensor-value">
        <div>
          <span>09h00:</span>
          <span>{{ data0900?.temperature }}°C / {{ data0900?.humidity }}%</span>
        </div>
        <div>
          <span>09h01:</span>
          <span>{{ data0901?.temperature }}°C / {{ data0901?.humidity }}%</span>
        </div>
        <div>
          <span>09h02:</span>
          <span>{{ data0902?.temperature }}°C / {{ data0902?.humidity }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sensor-card {
      background-color: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .sensor-value {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 1.2em;
      font-weight: bold;
    }
  `]
})
export class HourlyDataComponent implements OnInit {
  data0900: SensorData | null = null;
  data0901: SensorData | null = null;
  data0902: SensorData | null = null;

  constructor(private arduinoDataService: ArduinoDataService) {}

  ngOnInit() {
    this.loadHourlyData();
  }

  loadHourlyData() {
    this.arduinoDataService.getDataForHour('09h00').subscribe((data) => {
      this.data0900 = data;
    });

    this.arduinoDataService.getDataForHour('09h01').subscribe((data) => {
      this.data0901 = data;
    });
    this.arduinoDataService.getDataForHour('09h02').subscribe((data) => {
      this.data0902 = data;
    });
  }
}
