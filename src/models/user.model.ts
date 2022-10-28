export interface IUser {
  email: string,
  accountId: string,
  role: string,
  token: string,
  tokenExpirationDate: string,
  profileId: string,
}

export class User implements IUser {
  email: string;
  accountId: string;
  role: string;
  token: string;
  tokenExpirationDate: string;
  profileId: string;

  constructor(props: IUser) {
    this.email = props.email;
    this.accountId = props.accountId;
    this.role = props.role;
    this.token = props.token;
    this.tokenExpirationDate = props.tokenExpirationDate;
    this.profileId = props.profileId;
  }
}
