export interface IUpdateProfile {
  username: string,
  description: string,
  videoLink: string,
  profilePhoto: string,
  userAccountId: string
}
export class UpdateProfile implements IUpdateProfile {
  username: string;
  description: string;
  videoLink: string;
  profilePhoto: string;
  userAccountId: string;

  constructor(props: IUpdateProfile) {
    this.username = props.username;
    this.description = props.description;
    this.videoLink = props.videoLink;
    this.profilePhoto = props.profilePhoto;
    this.userAccountId = props.userAccountId
  }
}
//
