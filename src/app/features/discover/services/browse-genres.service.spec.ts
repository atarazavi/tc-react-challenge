import { TestBed } from '@angular/core/testing';

import { BrowseGenresService } from './browse-genres.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BrowseGenresService', () => {
  let service: BrowseGenresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(BrowseGenresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
