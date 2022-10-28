import { Position } from './../shared/components/map-container/position.model';
import { Post } from 'src/models/post.model';
import { Subject, Subscription } from 'rxjs';
import { ProfileFacade } from 'src/profile/core/profile.facade';
import { GetPostsByHashtagRequestModel } from './core/getPostsByHashtag/getPostsByHashtag.request-model';
import { AdvertismentFacade } from './core/advertisment.facade';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { HashtagFacade } from "src/shared/hashtag/hashtag.facade";
import { MatSelectChange } from '@angular/material/select';
import { StringUtilities } from 'src/shared/utilities/String';

@Component({
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.scss'],
  selector: 'app-advertisment'
})
export class AdvertismentComponent implements OnInit, OnDestroy {

  hashtagsForm = new FormControl('');
  descriptionForm = new FormControl('');
  searchForm = new FormControl('');
  lastForm = new FormControl(1);
  startDateForm = new FormControl(new Date());

  advertisments$ = this.advertismentFacade.advertisments$;
  hashtags$ = this.hashtagFacade.hashtags$;
  selectedHashtag = '';
  isEdited: boolean = false;

  selectedPosition: Position = {
    lat: 50.0602,
    long: 19.9374
  };
  eventSubject: Subject<Position> = new Subject<Position>();

  id: string = StringUtilities.generateUUID()

  subs: (Subscription | undefined)[] = [];

  constructor(private readonly hashtagFacade: HashtagFacade, private readonly advertismentFacade: AdvertismentFacade, private readonly profileFacade: ProfileFacade) { }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      if (s) s.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.hashtagFacade.getHashtags();
    this.subs.push(this.hashtagFacade.hashtags$.subscribe((hashtags: string[]) => {
      this.searchForm.setValue(hashtags[0]);
      this.advertismentFacade.getAdvertismentByHashtag(this.getRequestModel(hashtags[0]));
      this.selectedHashtag = hashtags[0];
    }));
  }

  onEditClicked(e: Post) {
    this.id = e.id;
    this.hashtagsForm.setValue(e.chainedTagName);
    this.descriptionForm.setValue(e.postMessage);
    this.selectedPosition.lat = e.lat;
    this.selectedPosition.long = e.lng;
    this.lastForm.setValue(e.dayLast);
    this.startDateForm.setValue(e.beginDate);

    this.eventSubject.next({
      lat: e.lat,
      long: e.lng
    });

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.isEdited = true;
  }

  sendAdvertisment() {
    const advertisment: Post = {
      id: this.id,
      chainedTagName: this.hashtagsForm.value,
      postMessage: this.descriptionForm.value,
      lat: this.selectedPosition.lat,
      lng: this.selectedPosition.long,
      dayLast: this.lastForm.value,
      beginDate: this.startDateForm.value,
      profileId: this.profileFacade.getProfileId(),
    }
    const requestModel = this.getRequestModel(this.hashtagsForm.value);
    this.advertismentFacade.upsertAdvertisment(advertisment, requestModel);
    this.clearForm();
  }

  onSearch(e: MatSelectChange) {
    const requestModel = this.getRequestModel(e.value);
    this.advertismentFacade.getAdvertismentByHashtag(requestModel);
  }

  onLocationChange(e: Position) {
    this.selectedPosition = e;
  }

  clearForm() {
    this.hashtagsForm.setValue('');
    this.descriptionForm.setValue('');
    this.lastForm.setValue(1);
    this.startDateForm.setValue(new Date());
    this.isEdited = false;
  }

  getRequestModel = (hashtagName: string) => {
    const id = this.profileFacade.getProfileId();
    const requestModel = new GetPostsByHashtagRequestModel({
      hashTagName: hashtagName,
      index: 0,
      requestingUserId: id
    });
    return requestModel;
  }
}
