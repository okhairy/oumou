import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3002/api/data'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Créer un en-tête avec le token si disponible
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // -------- UTILISATEURS --------

  // Authentifier un utilisateur par email et mot de passe
  authenticateUser(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3002/api/auth/login`, { email, password })
      .pipe(catchError(this.handleError));
  }

  // S'inscrire un nouvel utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post(`http://localhost:3002/api/auth/signup`, user)
      .pipe(catchError(this.handleError));
  }
// Authentifier par code secret
authenticateByCodeSecret(code: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/authenticate-code`, { code }) // Assurez-vous que l'URL est correcte
    .pipe(catchError(this.handleError));
}
  // -------- COLLECTES --------

  // Récupérer toutes les collectes
  getCollectes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer une nouvelle collecte
  createCollecte(collecte: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, collecte, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer une collecte spécifique par ID
  getCollecteById(collecteId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${collecteId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer la moyenne journalière
  getDailyAverage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/daily-averages`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer l'historique hebdomadaire
  getWeeklyHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/weekly`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs API
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    
    // Vérifier si la réponse contient un message d'erreur spécifique
    if (error.error && error.error.message) {
      errorMessage = error.error.message;  // Utiliser le message d'erreur spécifique de l'API
    }

    // Retourner un Observable avec le message d'erreur
    return throwError(() => new Error(errorMessage));
  }
}