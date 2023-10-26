import { NotFoundComponent } from '#shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'discover',
    pathMatch: 'full',
  },
  {
    path: 'discover',
    loadChildren: () => import('./features/discover/discover.module').then(m => m.DiscoverModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
