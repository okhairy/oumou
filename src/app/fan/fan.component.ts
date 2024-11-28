import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fan" [class.on]="isOn">
      <i class="bi bi-gear" style="font-size: 100px; color: {{ isOn ? 'green' : 'red' }}"></i>
      <p *ngIf="isOn">Ventilateur : ON</p>
      <p *ngIf="!isOn">Ventilateur : OFF</p>
    </div>
  `,
  styles: [`
    .fan {
      text-align: center;
      font-size: 1.2rem;
      transition: opacity 0.5s;
    }
    .fan.on {
      opacity: 1; /* Ventilateur visible */
    }
    .fan:not(.on) {
      opacity: 0.5; /* Ventilateur moins visible lorsqu'il est éteint */
    }
  `]
})
export class FanComponent {
  @Input() isOn: boolean = false; // Propriété pour contrôler l'état du ventilateur
}