import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseGenresComponent } from './browse-genres.component';
import { CategoriesApiResponse, CategoryItem } from '../../models/categories.model';
import { UnitTestingModule } from '#shared/test/unit-testing.module';

describe('BrowseGenresComponent', () => {
  let component: BrowseGenresComponent;
  let fixture: ComponentFixture<BrowseGenresComponent>;
  const categoriesApiResponse: CategoriesApiResponse = {
    categories: {
      href: '',
      limit: 1,
      next: null,
      offset: 0,
      previous: null,
      total: 1,
      items: [{
        href: '',
        icons: [{ height: null, url: 'test-url', width: null }],
        id: '1',
        name: 'Test Genre'
      }]
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BrowseGenresComponent,
      ],
      imports: [
        UnitTestingModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update _browseGenres BehaviorSubject when set browseGenres', () => {
    component.browseGenres = categoriesApiResponse;
    component._browseGenres.subscribe(value => {
      expect(value).toEqual(categoriesApiResponse);
    });
  });

  it('should correctly map to toBeListedArray$', (done: DoneFn) => {
    const categoryItem: CategoryItem = {
      href: '',
      icons: [{ height: null, url: 'test-url', width: null }],
      id: '1',
      name: 'Test Genre'
    };

    component._browseGenres.next({ categories: { items: [categoryItem], href: '', limit: 1, next: null, offset: 0, previous: null, total: 1 } });

    component.toBeListedArray$.subscribe(value => {
      expect(value).toEqual([{
        imageUrl: 'test-url',
        name: 'Test Genre',
        artistName: ''
      }]);
      done();
    });
  });
});
