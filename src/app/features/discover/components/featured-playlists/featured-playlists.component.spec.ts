import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedPlaylistsComponent } from './featured-playlists.component';
import { SpotifyPlaylistsResponse, SimplifiedPlaylistObject } from '../../models/playlist.model';
import { UnitTestingModule } from '#shared/test/unit-testing.module';

describe('FeaturedPlaylistsComponent', () => {
  let component: FeaturedPlaylistsComponent;
  let fixture: ComponentFixture<FeaturedPlaylistsComponent>;

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeaturedPlaylistsComponent,
      ],
      imports: [
        UnitTestingModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update _featuredPlaylists BehaviorSubject when set featuredPlaylists', () => {

    component.featuredPlaylists = spotifyPlaylistsResponse;
    component._featuredPlaylists.subscribe(value => {
      expect(value).toEqual(spotifyPlaylistsResponse);
    });
  });

  it('should correctly map to toBeListedArray$', (done: DoneFn) => {
    component._featuredPlaylists.next({
      message: 'Test Message',
      playlists: { items: [simplifiedPlaylistObject], href: '', limit: 1, next: null, offset: 0, previous: null, total: 1 }
    });

    component.toBeListedArray$.subscribe(value => {
      expect(value).toEqual([{
        imageUrl: 'test-image-url',
        name: 'Test Playlist',
        artistName: 'Test Owner'
      }]);
      done();
    });
  });
});
