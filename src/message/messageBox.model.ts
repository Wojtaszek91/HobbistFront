import { IUserMessage } from './userMessage.model';

export interface IMessageBox {
  id: string,
  profileOneId: string,
  profileOneUsername: string,
  profileTwoId: string,
  profileTwoUsername: string,
  messageHistory: IUserMessage[]
}

export class MessageBox implements IMessageBox {
  id: string;
  profileOneId: string;
  profileOneUsername: string;
  profileTwoId: string;
  profileTwoUsername: string;
  messageHistory: IUserMessage[];

  constructor(props: IMessageBox) {
    this.id = props.id;
    this.profileOneId = props.profileOneId;
    this.profileOneUsername = props.profileOneUsername
    this.profileTwoId = props.profileTwoId;
    this.profileTwoUsername = props.profileTwoUsername;
    this.messageHistory = props.messageHistory;
  }
}


