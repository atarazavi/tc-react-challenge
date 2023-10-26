import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { NewReleasesService } from '../services/new-releases.service';
import { FeaturedPlaylistsService } from '../services/featured-playlists.service';
import { BrowseGenresService } from '../services/browse-genres.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DiscoverStore } from './discover.store';
import { Artist, AlbumItem, AlbumType, ReleaseDatePrecision, Restriction, SpotifyAlbumsResponse } from '../models/album.model';
import { UnitTestingModule } from '#shared/test/unit-testing.module';
import { SimplifiedPlaylistObject, SpotifyPlaylistsResponse } from '../models/playlist.model';
import { CategoriesApiResponse } from '../models/categories.model';

describe('DiscoverStore', () => {
    let store: DiscoverStore;
    let newReleasesService: jasmine.SpyObj<NewReleasesService>;
    let featuredPlaylistsService: jasmine.SpyObj<FeaturedPlaylistsService>;
    let browseGenresService: jasmine.SpyObj<BrowseGenresService>;

    const artist: Artist = {
        external_urls: { spotify: 'test-artist-url' },
        href: 'test-artist-href',
        id: '1',
        name: 'Test Artist',
        type: 'artist',
        uri: 'test-artist-uri'
    };

    const albumItem: AlbumItem = {
        album_type: AlbumType.Album,
        available_markets: ['US'],
        external_urls: { spotify: 'test-album-url' },
        href: 'test-album-href',
        id: '1',
        images: [{ url: 'test-image-url', height: 100, width: 100 }],
        name: 'Test Album',
        release_date: '2023-01-01',
        release_date_precision: ReleaseDatePrecision.Day,
        restrictions: Restriction.Market,
        total_tracks: 10,
        type: 'album',
        uri: 'test-album-uri',
        artists: [artist]
    };

    const spotifyAlbumsResponse: SpotifyAlbumsResponse = {
        albums: {
            href: 'test-href',
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total: 1,
            items: [albumItem]
        }
    };
    const simplifiedPlaylistObject: SimplifiedPlaylistObject = {
        collaborative: false,
        description: null,
        external_urls: { spotify: 'test-url' },
        href: '',
        id: '1',
        images: [{ url: 'test-image-url', height: 100, width: 100 }],
        name: 'Test Playlist',
        owner: {
            external_urls: { spotify: 'test-owner-url' },
            followers: { href: null, total: 100 },
            href: '',
            id: '1',
            type: '',
            uri: '',
            display_name: 'Test Owner'
        },
        public: null,
        snapshot_id: '1',
        tracks: { href: '', total: 10 },
        type: '',
        uri: ''
    };

    const spotifyPlaylistsResponse: SpotifyPlaylistsResponse = {
        message: 'Test Message',
        playlists: {
            href: '',
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total: 1,
            items: [simplifiedPlaylistObject]
        }
    };
    const categoriesApiResponse: CategoriesApiResponse = {
        categories: {
            href: '',
            limit: 1,
            next: null,
            offset: 0,
            previous: null,
            total: 1,
            items: [{
                href: '',
                icons: [{ height: null, url: 'test-url', width: null }],
                id: '1',
                name: 'Test Genre'
            }]
        }
    };
    beforeEach(() => {
        newReleasesService = jasmine.createSpyObj('NewReleasesService', ['get']);
        featuredPlaylistsService = jasmine.createSpyObj('FeaturedPlaylistsService', ['get']);
        browseGenresService = jasmine.createSpyObj('BrowseGenresService', ['get']);

        TestBed.configureTestingModule({
            providers: [
                DiscoverStore,
                { provide: NewReleasesService, useValue: newReleasesService },
                { provide: FeaturedPlaylistsService, useValue: featuredPlaylistsService },
                { provide: BrowseGenresService, useValue: browseGenresService },
            ],
            imports: [
                UnitTestingModule,
            ]
        });

        store = TestBed.inject(DiscoverStore);
    });

    it('should create the store', () => {
        expect(store).toBeTruthy();
    });

    describe('loadNewReleases$', () => {
        it('should load new releases and update the store', () => {
            newReleasesService.get.and.returnValue(of(spotifyAlbumsResponse));

            store.loadNewReleases$();

            store.newReleases$.subscribe(state => {
                expect(state).toEqual(spotifyAlbumsResponse);
                expect(newReleasesService.get).toHaveBeenCalled();
            });
        });

        it('should handle errors', () => {
            newReleasesService.get.and.returnValue(throwError(new HttpErrorResponse({ error: 'error' })));

            store.loadNewReleases$();

            store.newReleasesError$.subscribe(error => {
                expect(error?.error).toEqual('error');
            });
        });
    });

    describe('loadFeaturedPlaylists$', () => {
        it('should load featured playlists and update the store', () => {
            featuredPlaylistsService.get.and.returnValue(of(spotifyPlaylistsResponse));

            store.loadFeaturedPlaylists$();

            store.featuredPlaylists$.subscribe(state => {
                expect(state).toEqual(spotifyPlaylistsResponse);
                expect(featuredPlaylistsService.get).toHaveBeenCalled();
            });
        });

        it('should handle errors', () => {
            featuredPlaylistsService.get.and.returnValue(throwError(new HttpErrorResponse({ error: 'error' })));

            store.loadFeaturedPlaylists$();

            store.featuredPlaylistsError$.subscribe(error => {
                expect(error?.error).toEqual('error');
            });
        });
    });

    describe('loadBrowseGenres$', () => {
        it('should load browse genres and update the store', () => {
            browseGenresService.get.and.returnValue(of(categoriesApiResponse));

            store.loadBrowseGenres$();

            store.browseGenres$.subscribe(state => {
                expect(state).toEqual(categoriesApiResponse);
                expect(browseGenresService.get).toHaveBeenCalled();
            });
        });

        it('should handle errors', () => {
            browseGenresService.get.and.returnValue(throwError(new HttpErrorResponse({ error: 'error' })));

            store.loadBrowseGenres$();

            store.browseGenresError$.subscribe(error => {
                expect(error?.error).toEqual('error');
            });
        });
    });
});
