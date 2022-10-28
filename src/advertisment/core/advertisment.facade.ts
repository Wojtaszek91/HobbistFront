import { GetPostsByHashtagResponseModel } from './getPostsByHashtag/getPostsByHashtag.response-model';
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Post } from "src/models/post.model";
import { AdvertismentService } from "./advetisment.service";
import { DeletePostRequestModel } from "./deletePost/deletePost.request-model";
import { GetPostsByHashtagRequestModel } from "./getPostsByHashtag/getPostsByHashtag.request-model";
import { UpsertMarkRequestModel } from './upsertMark/upsert-mark-request.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentFacade {

  advertisments$: Subject<Post[]> = new Subject();

  constructor(private readonly service: AdvertismentService) { }

  getAdvertismentByHashtag(requestModel: GetPostsByHashtagRequestModel) {
    this.service.getAdvertismentByHashtag(requestModel).subscribe({
      next: (response: any) => {
        const res = response as GetPostsByHashtagResponseModel;
        this.advertisments$.next(res.postList);
      },
      error: (e) => { console.log(e) }
    });
  }

  getBlockedAdvertisments() {
    this.service.getBlockedAdvertismens().subscribe({
      next: (response: any) => {
        const res = response as Post[];
        this.advertisments$.next(res);
      },
      error: (e) => { console.log(e) }
    })
  }

  upsertAdvertisment(requestModel: Post, getRequestModel: GetPostsByHashtagRequestModel) {
    this.service.upsertAdvertisment(requestModel).subscribe({
      next: (_) => {
        this.getAdvertismentByHashtag(getRequestModel);
      },
      error: (e) => { console.log(e) }
    })
  }

  deleteAdvertisment(requestModel: DeletePostRequestModel, getRequestModel: GetPostsByHashtagRequestModel) {
    this.service.deleteAdvertisment(requestModel).subscribe({
      next: (_) => {
        this.getAdvertismentByHashtag(getRequestModel);
      },
      error: (e) => { console.log(e) }
    });
  }

  blockAdvertisment(requestModel: DeletePostRequestModel, getRequestModel: GetPostsByHashtagRequestModel) {
    return this.service.blockAdvertisment(requestModel).subscribe({
      next: (_) => {
        this.getAdvertismentByHashtag(getRequestModel);
      },
      error: (e) => { console.log(e) }
    });;
  }

  unblockAdvertisment(requestModel: DeletePostRequestModel, getRequestModel: GetPostsByHashtagRequestModel) {
    return this.service.unblockAdvertisment(requestModel).subscribe({
      next: (_) => {
        this.getBlockedAdvertisments();
      },
      error: (e) => { console.log(e) }
    });;
  }

  upsertMark(requestModel: UpsertMarkRequestModel) {
    return this.service.upsertMark(requestModel);
  }
}

