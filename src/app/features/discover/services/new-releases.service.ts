import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiEndpoints } from '#shared/config/api-endpoints';
import { GenericBackendService } from '#shared/services/backend/generic-backend.service';
import { SpotifyAlbumsResponse } from '../models/album.model';
import { appConfigurations } from '#shared/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class NewReleasesService extends GenericBackendService<SpotifyAlbumsResponse, void> {
  constructor(
    httpClient: HttpClient,
  ) {
    super(appConfigurations.baseUrl + ApiEndpoints.newReleases, httpClient);
  }

  getByUrl(url: string) {
    return this.get(url);
  }
}