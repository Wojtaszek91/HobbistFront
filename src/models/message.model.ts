export interface IMessage {
  text: string,
  messageType: string
}

export class Message implements IMessage {
  text: string;
  messageType: string;

  constructor(props: Message) {
    this.text = props.text;
    this.messageType = props.messageType;
  }
}
