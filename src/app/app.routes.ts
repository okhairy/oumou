import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // Importation correcte avec import nommé

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent  // Utilisez le nom exact du composant
  }
];
