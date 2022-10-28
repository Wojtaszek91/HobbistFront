export interface IGetPostsByHashtagRequestModel {
  hashTagName: string;
  index: number;
  requestingUserId: string
}

export class GetPostsByHashtagRequestModel implements IGetPostsByHashtagRequestModel {
  hashTagName: string;
  index: number;
  requestingUserId: string;

  constructor(props: IGetPostsByHashtagRequestModel) {
    this.hashTagName = props?.hashTagName;
    this.index = props?.index;
    this.requestingUserId = props?.requestingUserId;
  }
}
