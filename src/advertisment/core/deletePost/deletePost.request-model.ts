export interface IDeletePostRequestModel {
  postId: string;
}

export class DeletePostRequestModel implements IDeletePostRequestModel {
  postId: string;

  constructor(props: IDeletePostRequestModel) {
    this.postId = props?.postId;
  }
}
