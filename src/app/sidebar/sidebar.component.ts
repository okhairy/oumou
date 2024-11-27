import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor() {}

  logout() {
    // Logique de déconnexion ici
    console.log('Déconnexion effectuée');
  }
}
