import { UpdateProfileRequestModel } from './../../models/updateProfile.request.model';
import { IProfileHashtagRequestModel } from './../../models/profileHashtag.request.model';
import { HashtagFacade } from './../../shared/hashtag/hashtag.facade';
import { GetProfileResponseModel } from './../../models/get-profile.response.model';
import { ProfileService } from './profile.service';
import { Profile } from './../../models/profile.model';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileFacade {

  profile: Subject<Profile> = new Subject();

  constructor(private readonly profileService: ProfileService, private readonly hashtagFacade: HashtagFacade, private readonly router: Router) { }

  getProfile() {
    const id = this.getProfileId();
    this.profileService.getProfile(id).subscribe({
      next: (response) => {
        const res = response as GetProfileResponseModel;
        this.hashtagFacade.setHashtags(res.hashTagNames);
        this.profile.next(res.userProfle);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getProfileNavigationState() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      isOwner: boolean,
      profileId: string
    } | undefined;
    return state;
  }


  getProfileById(id: string) {
    this.profileService.getProfile(id).subscribe({
      next: (response) => {
        const res = response as GetProfileResponseModel;
        this.hashtagFacade.setHashtags(res.hashTagNames);
        this.profile.next(res.userProfle);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getProfileByIdToResponse(id: string) {
    return this.profileService.getProfile(id).pipe(map(r => {
      const res = r as GetProfileResponseModel;
      return res.userProfle;
    }));
  }

  updateProfileHashtags(hashtags: string[]) {
    const id = this.getProfileId();
    const requestModel: IProfileHashtagRequestModel = {
      profileId: id,
      hashtagNames: hashtags
    }
    this.profileService.updateProfileHashtags(requestModel).subscribe({
      next: (_) => {
        this.getProfile();
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  updateProfile(requestModel: UpdateProfileRequestModel) {
    requestModel.profileId = this.getProfileId();
    this.profileService.updateProfile(requestModel).subscribe({
      error: (e) => {
        console.log(e)
      }
    })
  }

  getProfileId(): string {
    const id = sessionStorage.getItem('profileId');
    if (id) {
      return id;
    } else {
      throw new Error('Brak Id profilu');
    }
  }
}
