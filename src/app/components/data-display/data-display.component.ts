import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-display',
  standalone:true,
  templateUrl: './data-display.component.html',
  imports: [CommonModule],
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  data: { hour: string, temperature: number, humidity: number, date: string }[] = [];
  specificHours: string[] = ['12h10', '12h11', '12h12'];
  loading = false;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.data = [];
    this.error = null;

    const requests = this.specificHours.map(hour => 
      this.dataService.getDataByHour(hour).toPromise()
        .then(response => ({ hour, ...response }))
        .catch(err => ({ hour, error: err.message }))
    );

    Promise.all(requests).then(results => {
      this.data = results.filter(res => !res.error);
      this.error = results.some(res => res.error) ? 'Certaines données n\'ont pas pu être récupérées.' : null;
      this.loading = false;
    });
  }
}
