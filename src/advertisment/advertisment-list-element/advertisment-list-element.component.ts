import { Observable, Subscription } from 'rxjs';
import { UpsertMarkRequestModel } from '../core/upsertMark/upsert-mark-request.model';
import { AdvertismentFacade } from '../core/advertisment.facade';
import { ProfileFacade } from 'src/profile/core/profile.facade';
import { ConfigurationService } from 'src/shared/config/configuration.service';
import { Post } from 'src/models/post.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetPostsByHashtagRequestModel } from 'src/advertisment/core/getPostsByHashtag/getPostsByHashtag.request-model';
import { DeletePostRequestModel } from 'src/advertisment/core/deletePost/deletePost.request-model';

@Component({
  templateUrl: './advertisment-list-element.component.html',
  styleUrls: ['./advertisment-list-element.component.scss'],
  selector: 'app-advertisment-list-element'
})
export class AdvertismentListElementComponent implements OnInit, OnDestroy {

  mapSrc: any;
  @Input() advertisment: Post | undefined = undefined;
  @Output() onEditClicked: EventEmitter<Post> = new EventEmitter();
  profileId: string = '';
  profileName: string = '';
  isAdmin: boolean = true;
  isAuthor: boolean = false;

  subs: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private sanitizer: DomSanitizer,
    private readonly config: ConfigurationService,
    private readonly profileFacade: ProfileFacade,
    private readonly advertismentFacade: AdvertismentFacade
  ) { }

  ngOnInit(): void {
    console.log(this.advertisment);
    this.profileId = this.profileFacade.getProfileId();
    if (this.advertisment) {
      this.profileFacade.getProfileByIdToResponse(this.advertisment?.profileId).subscribe(profile => {
        this.profileName = profile.username;
      });
      this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.config.map_base_url}/?lat=${this.advertisment?.lat}&long=${this.advertisment?.lng}`);
      this.isAuthor = this.profileId === this.advertisment.profileId;
    } else {
      console.log('missing advertisment');
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      if (s) s.unsubscribe();
    });
  }

  onEditClick() {
    this.onEditClicked.emit(this.advertisment);
  }

  onBlockClick() {
    if (this.advertisment) {
      this.advertismentFacade.blockAdvertisment(
        new DeletePostRequestModel({ postId: this.advertisment.id }),
        this.getRequestModel(this.advertisment?.chainedTagName)
      );
    }
  }

  onUnblockClick() {
    if (this.advertisment)
      this.advertismentFacade.unblockAdvertisment(
        new DeletePostRequestModel({ postId: this.advertisment.id }),
        this.getRequestModel(this.advertisment?.chainedTagName)
      );
  }

  onStarClick(value: number) {
    if (this.advertisment) {
      const requestModel = new UpsertMarkRequestModel({
        postId: this.advertisment?.id,
        userProfileId: this.profileId,
        mark: value
      });
      this.subs.push(this.advertismentFacade.upsertMark(requestModel).subscribe({
        error: (e) => { console.log(e) }
      }));
    }
  }

  onProfileClick() {
    this.router.navigate(['/profile'], { state: { isOwner: false, profileId: 'profile id' }, });
  }

  getRequestModel = (hashtagName: string) => {
    const requestModel = new GetPostsByHashtagRequestModel({
      hashTagName: hashtagName,
      index: 0,
      requestingUserId: this.profileId
    });
    return requestModel;
  }
}
