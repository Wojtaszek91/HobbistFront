export interface IProfileHashtagRequestModel {
  profileId: string;
  hashtagNames: string[];
}

export class ProfileHashtagRequestModel implements IProfileHashtagRequestModel {
  profileId: string;
  hashtagNames: string[];

  constructor(props: IProfileHashtagRequestModel) {
    this.profileId = props.profileId;
    this.hashtagNames = props.hashtagNames;
  }
}
