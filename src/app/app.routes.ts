/* import { Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component';
import { DashboardComponent } from '/home/oumoul-khairy/oumou/src/app/dashboard/dashboard.component';
//import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
//import { CodeSecretComponent } from './code-secret/code-secret.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
 // { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
 // { path: 'user-dashboard', component: UserDashboardComponent },
  //{ path: 'code-secret', component: CodeSecretComponent },

  { path: '**', redirectTo: '/login' }, // Redirection pour les chemins inexistants

]; */
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // Importation correcte avec import nommé

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent  // Utilisez le nom exact du composant
  }
];