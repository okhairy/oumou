import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from '/home/oumoul-khairy/oumou/src/app/dashboard/dashboard.component';
import { DashboardAdminComponent } from '/home/oumoul-khairy/oumou/src/app/dashboard-admin/dashboard-admin.component';
//import { CodeSecretComponent } from './code-secret/code-secret.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  //{ path: 'code-secret', component: CodeSecretComponent },

  { path: '**', redirectTo: '/login' }, // Redirection pour les chemins inexistants

]; 

//
/* import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // Importation correcte avec import nommé

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent  // Utilisez le nom exact du composant
  }
]; */