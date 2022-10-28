import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Message } from 'src/models/message.model';
@Injectable({
  providedIn: 'root'
})
export default class SignalRService implements OnInit {
  hubConnection!: signalR.HubConnection;

  ngOnInit(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("/hobbistHub")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  getConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("/hobbistHub")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
}
