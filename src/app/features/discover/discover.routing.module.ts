import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscoverComponent } from './discover.component';

export const routes: Routes = [

  {
    path: '',
    component: DiscoverComponent,
  },
  // {
  //   path: 'favorites',
  //   component: FavoritesComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverRoutingModule { }
