import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewReleasesComponent } from './new-releases.component';
import { SpotifyAlbumsResponse, AlbumItem, Artist, ReleaseDatePrecision, Restriction, AlbumType } from '../../models/album.model';
import { UnitTestingModule } from '#shared/test/unit-testing.module';

describe('NewReleasesComponent', () => {
  let component: NewReleasesComponent;
  let fixture: ComponentFixture<NewReleasesComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewReleasesComponent,
      ],
      imports: [
        UnitTestingModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update _newReleases BehaviorSubject when set newReleases', () => {

    component.newReleases = spotifyAlbumsResponse;
    component._newReleases.subscribe(value => {
      expect(value).toEqual(spotifyAlbumsResponse);
    });
  });

  it('should correctly map to toBeListedArray$', (done: DoneFn) => {

    component._newReleases.next({ albums: { items: [albumItem], href: '', limit: 1, next: null, offset: 0, previous: null, total: 1 } });

    component.toBeListedArray$.subscribe(value => {
      expect(value).toEqual([{
        imageUrl: 'test-image-url',
        name: 'Test Album',
        artistName: 'Test Artist'
      }]);
      done();
    });
  });
});
