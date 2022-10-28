export interface IUserMessage {
  id: string;
  content: string;
  senderName: string;
  sendTime: Date;
  hasBeenOpen: boolean;
}


export class IUserMessage implements IUserMessage {
  id: string;
  content: string;
  senderName: string;
  sendTime: Date;
  hasBeenOpen: boolean;

  constructor(props: IUserMessage) {
    this.id = props.id;
    this.content = props.content;
    this.senderName = props.senderName;
    this.sendTime = props.sendTime;
    this.hasBeenOpen = props.hasBeenOpen;
  }
}
