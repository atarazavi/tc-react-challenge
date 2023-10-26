import { TestBed } from '@angular/core/testing';

import { FeaturedPlaylistsService } from './featured-playlists.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeaturedPlaylistsService', () => {
  let service: FeaturedPlaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(FeaturedPlaylistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
