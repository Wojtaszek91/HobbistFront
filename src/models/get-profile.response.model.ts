import { Profile as UserProfile } from "./profile.model";

export interface IGetProfileResponseModel {
  userProfle: UserProfile;
  hashTagNames: string[];
}


export class GetProfileResponseModel implements IGetProfileResponseModel {
  userProfle: UserProfile;
  hashTagNames: string[];


  constructor(props: IGetProfileResponseModel) {
    this.userProfle = props.userProfle;
    this.hashTagNames = props.hashTagNames;
  }
}
