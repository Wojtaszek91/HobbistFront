import { AddHashtagRequestModel } from './AddHashtag/add-hashtag-request.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "../config/configuration.service";

@Injectable({
  providedIn: 'root',
})
export class HashtagService {
  constructor(private http: HttpClient, private readonly configService: ConfigurationService) { }

  getHashtags() {
    return this.http.get(`${this.configService.gateway_base_url}/api/Hashtag/GetHashtagsNameList`);
  }

  addHashtag(name: string) {
    return this.http.post(
      `${this.configService.gateway_base_url}/api/Hashtag/CreateHashtag`,
      new AddHashtagRequestModel({ hashTagName: name })
    );
  }
}
