
export interface IProfile {
  id: string,
  username: string,
  description: string,
  videoLink: string,
  profilePhoto: string,
  profileViews: string,
  hashtagNames: string[]
}
export class Profile implements IProfile {
  id: string;
  username: string;
  description: string;
  videoLink: string;
  profilePhoto: string;
  profileViews: string;
  hashtagNames: string[];

  constructor(props: IProfile) {
    this.id = props.id;
    this.username = props.username;
    this.description = props.description;
    this.videoLink = props.videoLink;
    this.profilePhoto = props.profilePhoto;
    this.profileViews = props.profileViews;
    this.hashtagNames = props.hashtagNames;
  }
}
