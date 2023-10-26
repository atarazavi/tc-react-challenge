import { CarouselItem } from '#shared/models/carouselItem.model';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CategoriesApiResponse } from '../../models/categories.model';

@Component({
  selector: 'app-browse-genres',
  templateUrl: './browse-genres.component.html',
  styleUrls: ['./browse-genres.component.scss']
})
export class BrowseGenresComponent {
  @Input()
  set browseGenres(value: CategoriesApiResponse | null) {
    this._browseGenres.next(value);
  }

  public _browseGenres = new BehaviorSubject<CategoriesApiResponse | null>(null);

  toBeListedArray$: Observable<CarouselItem[]> = this._browseGenres.pipe(
    map(browseGenres => (browseGenres?.categories.items.map(eachCategory => {
      return {
        imageUrl: eachCategory.icons[0].url,
        name: eachCategory.name,
        artistName: '',
      };
    })) ?? [])
  );
}
