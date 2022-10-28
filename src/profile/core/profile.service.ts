import { UpdateProfileRequestModel } from './../../models/updateProfile.request.model';
import { ProfileHashtagRequestModel } from '../../models/profileHashtag.request.model';
import { ConfigurationService } from '../../shared/config/configuration.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  constructor(private http: HttpClient, private readonly configService: ConfigurationService) { }

  getProfile(id: string) {
    return this.http.get(`${this.configService.gateway_base_url}/api/UserProfile/GetProfileById?profileId=${id}`);
  }

  updateProfileHashtags(requestModel: ProfileHashtagRequestModel) {
    return this.http.post(
      `${this.configService.gateway_base_url}/api/UserProfile/UpdateHashtagsProfile`,
      requestModel);
  }

  updateProfile(requestModel: UpdateProfileRequestModel) {
    return this.http.post(
      `${this.configService.gateway_base_url}/api/UserProfile/updateProfile`,
      requestModel);
  }
}
