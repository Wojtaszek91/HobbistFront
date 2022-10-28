import { UpdateProfileRequestModel } from './../models/updateProfile.request.model';
import { FormControl } from '@angular/forms';
import { HashtagFacade } from './../shared/hashtag/hashtag.facade';
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProfileFacade } from "./core/profile.facade";
import { Subscription } from 'rxjs';
import { Profile } from 'src/models/profile.model';

@Component({
  templateUrl: './profile.component.html',
  selector: 'profile',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild('hashtags') hashtags: any;

  hashtagsForm = new FormControl('');

  nameForm = new FormControl('');
  imageForm = new FormControl('');
  descriptionForm = new FormControl('');
  youtubeURLForm = new FormControl('');

  isOwner: boolean = false;

  imageBase64: string = '';
  isNameEdit: boolean = false;
  isImageEdit: boolean = false;
  isDescriptionEdit: boolean = false;

  photo: SafeResourceUrl | undefined;
  name: string | undefined;
  description: string | undefined;
  youtubeUrl: SafeResourceUrl | undefined;
  userHashtags: string[] | undefined;


  profile$ = this.profileFacade.profile;
  hashtags$ = this.hashtagFacade.hashtags$;

  subs: Subscription[] = [];

  constructor(
    private readonly profileFacade: ProfileFacade,
    private readonly hashtagFacade: HashtagFacade,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const navigationState = this.profileFacade.getProfileNavigationState()
      ?? { isOwner: true, profileId: '' };
    if (navigationState.isOwner) {
      this.profileFacade.getProfile();
    } else {
      this.profileFacade.getProfileById(navigationState.profileId);
    }
    this.isOwner = navigationState.isOwner;
    this.subs.push(this.profile$.subscribe({
      next: (p: Profile) => {
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(p.profilePhoto);
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(p.videoLink);
        this.name = p.username;
        sessionStorage.setItem('profileName', p.username);
        this.description = p.description;
        this.userHashtags = p.hashtagNames;
        this.hashtagsForm.setValue(p.hashtagNames);
        this.nameForm.setValue(p.username);
        this.descriptionForm.setValue(p.description);
        this.youtubeURLForm.setValue(p.videoLink);
      },
      error: (e) => { console.log(e) },
    }));
  }

  openHashtagList = () => this.hashtags.open();


  onSelectHashtagsChange(isOpen: boolean) {
    if (!isOpen && this.hashtagsForm.value) {
      this.profileFacade.updateProfileHashtags(this.hashtagsForm.value);
    }
  }

  onEditNameClick() {
    if (this.isNameEdit) {
      this.updateProfile();
    }
    this.name = this.nameForm.value;
    this.isNameEdit = !this.isNameEdit;
  }

  onEditDescriptionClick() {
    if (this.isDescriptionEdit) {
      this.updateProfile();
    }
    this.description = this.descriptionForm.value;
    this.isDescriptionEdit = !this.isDescriptionEdit;
  }

  onImageInputChange(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBase64 = reader.result ? reader.result.toString() : '';
      this.updateProfile();
    };
  }

  onConfirmYoutubeClick() {
    this.updateProfile();
    this.youtubeUrl = this.youtubeURLForm.value;
  }

  updateProfile() {
    const requestModel: UpdateProfileRequestModel = {
      username: this.nameForm.value,
      description: this.descriptionForm.value,
      videoLink: this.youtubeURLForm.value,
      profilePhoto: this.imageBase64,
      profileId: ''
    };
    this.profileFacade.updateProfile(requestModel);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
