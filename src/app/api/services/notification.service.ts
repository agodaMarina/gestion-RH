import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private client: Client;
  private notifications = new BehaviorSubject<Notification[]>([]);

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8000/ws'),
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      
      this.client.subscribe('/topic/notifications', (message: Message) => {
        const notification: Notification = JSON.parse(message.body);
        const currentNotifications = this.notifications.value;
        this.notifications.next([...currentNotifications, notification]);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  getNotifications() {
    return this.notifications.asObservable();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }
}
