import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, pipe } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { SpotifyAlbumsResponse } from '../models/album.model';
import { NewReleasesService } from '../services/new-releases.service';
import { SpotifyPlaylistsResponse } from '../models/playlist.model';
import { FeaturedPlaylistsService } from '../services/featured-playlists.service';
import { CategoriesApiResponse } from '../models/categories.model';
import { BrowseGenresService } from '../services/browse-genres.service';

interface SpotifyAlbums {
  newReleases: SpotifyAlbumsResponse | null;
  newReleasesError: HttpErrorResponse | null;
  featuredPlaylists: SpotifyPlaylistsResponse | null;
  featuredPlaylistsError: HttpErrorResponse | null;
  browseGenres: CategoriesApiResponse | null;
  browseGenresError: HttpErrorResponse | null;
}

@Injectable()
export class DiscoverStore extends ComponentStore<SpotifyAlbums> {
  readonly newReleases$ = this.select((state) => state.newReleases);
  readonly newReleasesError$ = this.select((state) => state.newReleasesError);
  readonly featuredPlaylists$ = this.select((state) => state.featuredPlaylists);
  readonly featuredPlaylistsError$ = this.select((state) => state.featuredPlaylistsError);
  readonly browseGenres$ = this.select((state) => state.browseGenres);
  readonly browseGenresError$ = this.select((state) => state.browseGenresError);

  constructor(
    private readonly newReleasesService: NewReleasesService,
    private readonly featuredPlaylistsService: FeaturedPlaylistsService,
    private readonly browseGenresService: BrowseGenresService,
  ) {
    super({
      newReleases: null,
      newReleasesError: null,
      featuredPlaylists: null,
      featuredPlaylistsError: null,
      browseGenres: null,
      browseGenresError: null,
    });
  }

  loadNewReleases$ = this.effect<void>(
    pipe(
      switchMap(() =>
        this.newReleasesService.get().pipe(
          tap({
            next: (newReleases) => {
              this.patchState({ newReleases });
              this.patchState({ newReleasesError: null });
            },
            error: (newReleasesError) => this.patchState({ newReleasesError }),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadNewReleasesByPageUrl$ = this.effect<string>(
    (url$) =>
      url$.pipe(
        switchMap((url) =>
          this.newReleasesService.getByUrl(url).pipe(
            tap({
              next: (newReleases) => {
                this.patchState({ newReleases });
              },
              error: (newReleasesError) => this.patchState({ newReleasesError }),
            }),
            catchError(() => EMPTY)
          )
        )
      )
  );

  loadFeaturedPlaylists$ = this.effect<void>(
    pipe(
      switchMap(() =>
        this.featuredPlaylistsService.get().pipe(
          tap({
            next: (featuredPlaylists) => {
              this.patchState({ featuredPlaylists });
              this.patchState({ featuredPlaylistsError: null });
            },
            error: (featuredPlaylistsError) => this.patchState({ featuredPlaylistsError }),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadBrowseGenres$ = this.effect<void>(
    pipe(
      switchMap(() =>
        this.browseGenresService.get().pipe(
          tap({
            next: (browseGenres) => {
              this.patchState({ browseGenres });
              this.patchState({ browseGenresError: null });
            },
            error: (browseGenresError) => this.patchState({ browseGenresError }),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
