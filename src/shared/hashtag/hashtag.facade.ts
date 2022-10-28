import { HashtagService } from './hashtag.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HashtagFacade {

  hashtags$: Subject<string[]> = new Subject();

  constructor(private readonly service: HashtagService) { }

  getHashtags() {
    this.service.getHashtags().subscribe({
      next: (r) => { this.hashtags$.next(r as string[]) },
      error: (e) => { console.log(e) }
    });
  }
  setHashtags(hashtags: string[]) {
    this.hashtags$.next(hashtags);
  }

  addHashtag(name: string) {
    console.log('facade called');
    this.service.addHashtag(name).subscribe({
      next: (_) => { this.getHashtags() },
      error: (e) => { console.log(e) }
    })
  }
}
