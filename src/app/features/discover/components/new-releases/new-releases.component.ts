import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyAlbumsResponse } from '../../models/album.model';
import { CarouselItem } from '#shared/models/carouselItem.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent {
  @Output() loadNextPage = new EventEmitter<string>();
  @Output() loadPreviousPage = new EventEmitter<string>();

  @Input()
  set newReleases(value: SpotifyAlbumsResponse | null) {
    this._newReleases.next(value);
  }

  public _newReleases = new BehaviorSubject<SpotifyAlbumsResponse | null>(null);

  toBeListedArray$: Observable<CarouselItem[]> = this._newReleases.pipe(
    map(newReleases => (newReleases?.albums.items.map(eachAlbum => {
      return {
        imageUrl: eachAlbum.images[0].url,
        name: eachAlbum.name,
        artistName: eachAlbum.artists[0].name,
      };
    })) ?? [])
  );

  onNextPageClick() {
    const nextPageUrl = this._newReleases.value?.albums.next;
    if (nextPageUrl) {
      this.loadNextPage.emit(nextPageUrl);
    }
  }

  onPreviousPageClick() {
    const previousPageUrl = this._newReleases.value?.albums.previous;
    if (previousPageUrl) {
      this.loadPreviousPage.emit(previousPageUrl);
    }
  }
}
