import { ApplicationRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor(private appRef: ApplicationRef) {
    // Configure l'URL du serveur WebSocket
    this.socket = io('http://localhost:3002', { autoConnect: false }); // Mettez à jour le port si nécessaire

    // Attends que l'application soit stable avant de connecter le WebSocket
    this.appRef.isStable
      .pipe(first((isStable) => isStable))
      .subscribe(() => {
        console.log('Application stable, connexion WebSocket...');
        this.socket.connect();
      });
  }

  public listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });

      // Cleanup function to unsubscribe from the socket event
      return () => {
        this.socket.off(eventName);
      };
    });
  }

  public emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  public disconnect(): void {
    this.socket.disconnect();
    console.log('WebSocket déconnecté');
  }
}