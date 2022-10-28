export interface IUpdateProfileRequestModel {
  username: string;
  description: string;
  videoLink: string;
  profilePhoto: string;
  profileId: string;
}

export class UpdateProfileRequestModel implements IUpdateProfileRequestModel {
  username: string;
  description: string;
  videoLink: string;
  profilePhoto: string;
  profileId: string;

  constructor(props: IUpdateProfileRequestModel) {
    this.username = props?.username;
    this.description = props?.username;
    this.videoLink = props?.videoLink;
    this.profilePhoto = props?.profilePhoto;
    this.profileId = props?.profileId;
  }
}
