import { UpsertMarkRequestModel } from './upsertMark/upsert-mark-request.model';
import { GetPostsByHashtagRequestModel } from './getPostsByHashtag/getPostsByHashtag.request-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ConfigurationService } from 'src/shared/config/configuration.service';
import { Post } from 'src/models/post.model';
import { DeletePostRequestModel } from './deletePost/deletePost.request-model';

@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {
  constructor(private readonly http: HttpClient, private readonly configService: ConfigurationService) { }

  getBlockedAdvertismens() {
    return this.http.get(`${this.configService.gateway_base_url}/api/Post/GetBlockedPostList`);
  }
  getAdvertismentByHashtag(requestModel: GetPostsByHashtagRequestModel) {
    return this.http.get(
      `${this.configService.gateway_base_url}/api/Post/GetPostsByHashTag?hashTagName=${requestModel.hashTagName}&index=${requestModel.index}&requestingUserId=${requestModel.requestingUserId}`);
  }
  upsertAdvertisment(requestModel: Post) {
    return this.http.post(`${this.configService.gateway_base_url}/api/Post/upsertPost`, requestModel);
  }
  deleteAdvertisment(requestModel: DeletePostRequestModel) {
    return this.http.post(`${this.configService.gateway_base_url}/api/Post/deletePost`, requestModel);
  }
  blockAdvertisment(requestModel: DeletePostRequestModel) {
    return this.http.post(`${this.configService.gateway_base_url}/api/Post/blockPost`, requestModel);
  }
  unblockAdvertisment(requestModel: DeletePostRequestModel) {
    return this.http.post(`${this.configService.gateway_base_url}/api/Post/unblockPost`, requestModel);
  }
  upsertMark(requestModel: UpsertMarkRequestModel) {
    return this.http.post(`${this.configService.gateway_base_url}/api/PostMark/UpsertMark`, requestModel);
  }
}
