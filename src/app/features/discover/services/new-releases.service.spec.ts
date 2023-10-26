import { TestBed } from '@angular/core/testing';

import { NewReleasesService } from './new-releases.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewReleasesService', () => {
  let service: NewReleasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(NewReleasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
