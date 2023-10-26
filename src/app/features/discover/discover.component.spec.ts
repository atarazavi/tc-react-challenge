import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoverComponent } from './discover.component';
import { DiscoverStore } from './store/discover.store';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UnitTestingModule } from '#shared/test/unit-testing.module';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  let discoverStoreSpy: jasmine.SpyObj<DiscoverStore>;

  beforeEach(async () => {
    discoverStoreSpy = jasmine.createSpyObj('DiscoverStore', [
      'loadNewReleases$',
      'loadFeaturedPlaylists$',
      'loadBrowseGenres$',
    ], {
      newReleases$: of(null),
      newReleasesError$: of(null),
      featuredPlaylists$: of(null),
      featuredPlaylistsError$: of(null),
      browseGenres$: of(null),
      browseGenresError$: of(null),
    });

    await TestBed.configureTestingModule({
      declarations: [DiscoverComponent],
      imports: [UnitTestingModule],
      providers: [{ provide: DiscoverStore, useValue: discoverStoreSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call the loadLists method', () => {
      spyOn(component, 'loadLists');
      component.ngOnInit();
      expect(component.loadLists).toHaveBeenCalled();
    });
  });

  describe('loadLists', () => {
    it('should call discoverStore methods to load lists', () => {
      component.loadLists();
      expect(discoverStoreSpy.loadNewReleases$).toHaveBeenCalled();
      expect(discoverStoreSpy.loadFeaturedPlaylists$).toHaveBeenCalled();
      expect(discoverStoreSpy.loadBrowseGenres$).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroyed$ subject', () => {
      spyOn(component.destroyed$, 'next');
      spyOn(component.destroyed$, 'complete');
      component.ngOnDestroy();
      expect(component.destroyed$.next).toHaveBeenCalled();
      expect(component.destroyed$.complete).toHaveBeenCalled();
    });
  });
});
