export interface IHashtag {
  hashtagName: string;
  popularity: number;
}

export class Hashtag implements IHashtag {
  hashtagName: string;
  popularity: number;

  constructor(props: IHashtag) {
    this.hashtagName = props.hashtagName;
    this.popularity = props.popularity;
  }
}
