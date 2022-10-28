import { Post } from 'src/models/post.model';

export interface IGetPostsByHashtagResponseModel {
  postList: Post[];
  index: number;
}

export class GetPostsByHashtagResponseModel implements IGetPostsByHashtagResponseModel {
  postList: Post[];
  index: number;

  constructor(props: IGetPostsByHashtagResponseModel) {
    this.postList = props?.postList;
    this.index = props?.index;
  }
}
