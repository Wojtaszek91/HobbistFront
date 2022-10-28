
export interface IPost {
  id: string;
  chainedTagName: string;
  postMessage: string;
  lat: number;
  lng: number;
  postViews?: number;
  averageMark?: number;
  dayLast: number;
  beginDate: Date;
  profileId: string;
  isFollowed?: boolean;
  isBlocked?: boolean;
}

export class Post implements IPost {
  id: string;
  chainedTagName: string;
  postMessage: string;
  lat: number;
  lng: number;
  postViews?: number;
  averageMark?: number;
  dayLast: number;
  beginDate: Date;
  profileId: string;
  isFollowed?: boolean;
  isBlocked?: boolean;

  constructor(props: IPost) {
    this.id = props?.id;
    this.chainedTagName = props?.chainedTagName;
    this.postMessage = props?.postMessage;
    this.lat = props?.lat;
    this.lng = props?.lng;
    this.postViews = props?.postViews;
    this.averageMark = props?.averageMark;
    this.dayLast = props?.dayLast;
    this.beginDate = props?.beginDate;
    this.profileId = props?.profileId;
    this.isFollowed = props?.isFollowed;
    this.isBlocked = props.isBlocked;
  }
}
