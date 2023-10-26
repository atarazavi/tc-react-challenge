import { CarouselItem } from '#shared/models/carouselItem.model';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SpotifyPlaylistsResponse } from '../../models/playlist.model';

@Component({
  selector: 'app-featured-playlists',
  templateUrl: './featured-playlists.component.html',
  styleUrls: ['./featured-playlists.component.scss']
})
export class FeaturedPlaylistsComponent {
  @Input()
  set featuredPlaylists(value: SpotifyPlaylistsResponse | null) {
    this._featuredPlaylists.next(value);
  }

  public _featuredPlaylists = new BehaviorSubject<SpotifyPlaylistsResponse | null>(null);

  toBeListedArray$: Observable<CarouselItem[]> = this._featuredPlaylists.pipe(
    map(featuredPlaylists => (featuredPlaylists?.playlists.items.map(eachPlaylist => {
      return {
        imageUrl: eachPlaylist.images[0].url,
        name: eachPlaylist.name,
        artistName: eachPlaylist.owner.display_name,
      };
    })) ?? [])
  );
}
