import { MessageSseService } from './message-sse.service';
import { MessageService } from './message.service';
import { Subject } from "rxjs";
import { MessageBox } from '../messageBox.model';
import { Injectable } from '@angular/core';
import { ProfileFacade } from 'src/profile/core/profile.facade';



@Injectable({
  providedIn: 'root',
})
export class MessageFacade {

  messagesNotify$: Subject<any> = new Subject();
  messages$: Subject<MessageBox[]> = new Subject();


  constructor(
    private readonly service: MessageService,
    private readonly profileFacade: ProfileFacade) { }

  getMessagesAtLogin() {
    this.service.getMessagesAtLogin(this.profileFacade.getProfileId()).subscribe({
      next: (r) => {
        console.log("Messagebox response: ", r);

        const res = r as MessageBox[];
        this.messages$.next(res);
        //this.messages = res;
        //this.messagesNotify$.next(null);
        //this.getMessage();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
