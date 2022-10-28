export interface IUpsertMarkRequestModel {
  postId: string;
  userProfileId: string;
  mark: number;
}

export class UpsertMarkRequestModel implements IUpsertMarkRequestModel {
  postId: string;
  userProfileId: string;
  mark: number;

  constructor(props: IUpsertMarkRequestModel) {
    this.postId = props.postId;
    this.userProfileId = props.userProfileId;
    this.mark = props.mark;
  }
}
