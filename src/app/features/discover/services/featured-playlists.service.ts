import { ApiEndpoints } from '#shared/config/api-endpoints';
import { appConfigurations } from '#shared/config/app-config';
import { GenericBackendService } from '#shared/services/backend/generic-backend.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyPlaylistsResponse } from '../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturedPlaylistsService extends GenericBackendService<SpotifyPlaylistsResponse, void> {
  constructor(
    httpClient: HttpClient,
  ) {
    super(appConfigurations.baseUrl + ApiEndpoints.featuredPlaylists, httpClient);
  }
}