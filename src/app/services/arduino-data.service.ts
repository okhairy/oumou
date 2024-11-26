import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface SensorData {
  value: number;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArduinoDataService {
  private apiBaseUrl = 'http://localhost:3002/api/data';

  constructor(private http: HttpClient) {}

  getTemperature(): Observable<SensorData> {
    return this.http.get<SensorData>(`${this.apiBaseUrl}/temperature`);
  }

  getHumidity(): Observable<SensorData> {
    return this.http.get<SensorData>(`${this.apiBaseUrl}/humidity`);
  }

  getDailyAverages(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/daily-averages`);
  }

  getWeeklyData(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/weekly`);
  }

  // Méthode pour obtenir des mises à jour en temps réel
  getRealTimeSensorData(interval_ms: number = 5000): Observable<{temperature: SensorData, humidity: SensorData}> {
    return interval(interval_ms).pipe(
      switchMap(() => {
        return this.http.get<{temperature: SensorData, humidity: SensorData}>(`${this.apiBaseUrl}/current`);
      })
    );
  }
}