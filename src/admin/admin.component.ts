import { AdvertismentFacade } from './../advertisment/core/advertisment.facade';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from "@angular/core";
import { HashtagFacade } from 'src/shared/hashtag/hashtag.facade';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  selector: 'app-admin'
})
export class AdminComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  hashtags$ = this.hashtagsFacade.hashtags$;
  advertisments$ = this.advertismentFacade.advertisments$;

  ///chips with name and delete
  ///name input + add btn

  //post wyświetlać normalnie tylko with isAdmin and isBlocked param
  constructor(private readonly hashtagsFacade: HashtagFacade, private readonly advertismentFacade: AdvertismentFacade) {

  }

  ngOnInit() {
    this.hashtagsFacade.getHashtags();
    this.advertismentFacade.getBlockedAdvertisments();
  }

  onAddHashtagClick(e: any) {
    if (e.value !== '') {
      this.hashtagsFacade.addHashtag(e.value);
      e.chipInput!.clear();
    }
  }

  // onRemoveHashtagClick(name: string) {
  //   console.log(name);
  // }
}
