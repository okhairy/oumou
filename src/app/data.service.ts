import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3002/api/data';

  constructor(private http: HttpClient) {}

  getDataByHour(hour: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${hour}`);
  }
}
