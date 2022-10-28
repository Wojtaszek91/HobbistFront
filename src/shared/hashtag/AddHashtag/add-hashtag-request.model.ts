export interface IAddHashtagRequestModel {
  hashTagName: string;
}

export class AddHashtagRequestModel implements IAddHashtagRequestModel {
  hashTagName: string;

  constructor(props: IAddHashtagRequestModel) {
    this.hashTagName = props.hashTagName;
  }
}
