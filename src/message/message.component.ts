import { IUserMessage } from './userMessage.model';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MessageBox } from './messageBox.model';
import { MessageFacade } from './core/message.facade';
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as signalR from '@microsoft/signalr';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  selector: 'app-messages'
})
export class MessageComponent implements OnInit, OnDestroy {

  messages$ = this.messageFacade.messages$;
  messageBoxes: MessageBox[] = [];
  //messagesNotify$ = this.messageFacade.messagesNotify$;
  selectedMessageBox?: MessageBox;
  subs: Subscription[] = [];
  hubConnection!: signalR.HubConnection;
  ownerName: string = "";

  newMessageForm = new FormControl('');
  selectMessageForm = new FormControl('');

  constructor(private readonly messageFacade: MessageFacade) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("profileName")) {
      this.ownerName = sessionStorage.getItem("profileName") as string;
    }

    this.messageFacade.getMessagesAtLogin();

    this.messages$.subscribe({
      next: (value) => { this.messageBoxes = value }
    });

    this.selectedMessageBox = this.messageBoxes[0];
    this.selectMessageForm.setValue(this.messageBoxes[0]);

    const token = sessionStorage.getItem('token') as string;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5089/hobbistHub", { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.onclose(() => {
      setTimeout(this.tryReconnect(this.hubConnection), 5000);
    }
    );

    this.hubConnection.on("ReciveMessage", (messageBoxId: string, userMessage: IUserMessage) => {
      this.addMessageToMessageBox(messageBoxId, userMessage);
    });

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))


    console.log(this.hubConnection.connectionId);
  }

  addMessageToMessageBox(messageBoxId: string, userMessage: IUserMessage) {
    for (let box of this.messageBoxes) {
      if (box.id == messageBoxId) {
        box.messageHistory.push(userMessage);
        return;
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      if (s) s.unsubscribe();
    });
  }


  tryReconnect(hubConnection: signalR.HubConnection): any {
    hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  };


  onSelectMessageBox(message: MessageBox) {
    this.selectedMessageBox = message;
    this.selectMessageForm.setValue(message);
  }

  onConversationChange(e: any) {
    const message = e.target.value as MessageBox;
    this.onSelectMessageBox(message);
  }

  onSendMessageClick() {
    this.hubConnection.invoke("SendMessageAsync",
      this.selectedMessageBox?.id,
      this.newMessageForm.value,
      sessionStorage.getItem('profileId'),
      this.getOppositeProfileId()
    )
      .catch(function (err) {
        return console.error(err.toString());
      });
    this.newMessageForm.reset();
  }

  getMessageBoxUserName(messageBox: MessageBox) {
    if (messageBox.profileOneId == sessionStorage.getItem('profileId')) {
      return messageBox.profileTwoUsername;
    }
    else {
      return messageBox.profileOneUsername;
    }
  }

  getOppositeProfileId() {
    if (this.selectedMessageBox?.profileOneId == sessionStorage.getItem('profileId')) {
      return this.selectedMessageBox?.profileTwoId;
    } else {
      return this.selectedMessageBox?.profileOneId;
    }
  }

  getFirstLetter(messageBox: MessageBox) {
    if (messageBox.profileOneId == sessionStorage.getItem('profileId')) {
      return messageBox.profileTwoUsername[0];
    }
    else {
      return messageBox.profileOneUsername[0];
    }
  }
}
