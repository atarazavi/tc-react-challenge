import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SpotifyAlbumsResponse } from './models/album.model';
import { DiscoverStore } from './store/discover.store';
import { HttpErrorResponse } from '@angular/common/http';
import { SpotifyPlaylistsResponse } from './models/playlist.model';
import { CategoriesApiResponse } from './models/categories.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  newReleases$: Observable<SpotifyAlbumsResponse | null>;
  newReleasesError$: Observable<HttpErrorResponse | null>;
  featuredPlaylists$: Observable<SpotifyPlaylistsResponse | null>;
  featuredPlaylistsError$: Observable<HttpErrorResponse | null>;
  browseGenres$: Observable<CategoriesApiResponse | null>;
  browseGenresError$: Observable<HttpErrorResponse | null>;
  public readonly destroyed$ = new Subject<void>();

  constructor(
    public discoverStore: DiscoverStore,
  ) {
    this.newReleases$ = discoverStore.newReleases$;
    this.newReleasesError$ = discoverStore.newReleasesError$;
    this.featuredPlaylists$ = discoverStore.featuredPlaylists$;
    this.featuredPlaylistsError$ = discoverStore.featuredPlaylistsError$;
    this.browseGenres$ = discoverStore.browseGenres$;
    this.browseGenresError$ = discoverStore.browseGenresError$;
  }

  ngOnInit() {
    this.loadLists();
  }

  public loadLists() {
    this.discoverStore.loadNewReleases$();
    this.discoverStore.loadFeaturedPlaylists$();
    this.discoverStore.loadBrowseGenres$();
  }
  public loadNextPreviousNewReleases(url: string) {
    this.discoverStore.loadNewReleasesByPageUrl$(url);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}