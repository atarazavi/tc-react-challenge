import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DiscoverRoutingModule } from './discover.routing.module';
import { SharedModule } from '#shared/shared.module';
import { DiscoverComponent } from './discover.component';
import { DiscoverStore } from './store/discover.store';
import { NewReleasesComponent } from './components/new-releases/new-releases.component';
import { FeaturedPlaylistsComponent } from './components/featured-playlists/featured-playlists.component';
import { BrowseGenresComponent } from './components/browse-genres/browse-genres.component';
import { SkeletonLoaderModule } from '#shared/components/skeleton-loader/skeleton-loader.module';

@NgModule({
  declarations: [
    DiscoverComponent,
    NewReleasesComponent,
    FeaturedPlaylistsComponent,
    BrowseGenresComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    DiscoverRoutingModule,
    SkeletonLoaderModule,
  ],
  exports: [DiscoverComponent],
  providers: [
    DiscoverStore,
  ]
})
export class DiscoverModule { }
