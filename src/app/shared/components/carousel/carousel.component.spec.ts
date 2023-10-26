import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { By } from '@angular/platform-browser';
import { CarouselItem } from '#shared/models/carouselItem.model';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display carousel items correctly', () => {
    const mockItems: CarouselItem[] = [
      {
        imageUrl: 'https://example.com/image1.jpg',
        name: 'Item 1',
        artistName: 'Artist 1',
      },
      {
        imageUrl: 'https://example.com/image2.jpg',
        name: 'Item 2',
        artistName: 'Artist 2',
      },
    ];

    component.toBeListedArray = mockItems;
    fixture.detectChanges();

    const carouselItems = fixture.debugElement.queryAll(By.css('.album'));

    expect(carouselItems.length).toBe(mockItems.length);
    expect(carouselItems[0].nativeElement.textContent).toContain('Item 1');
    expect(carouselItems[0].nativeElement.textContent).toContain('Artist 1');
    expect(carouselItems[1].nativeElement.textContent).toContain('Item 2');
    expect(carouselItems[1].nativeElement.textContent).toContain('Artist 2');
  });
  describe('onMouseDown', () => {
    it('should set isDragging to true and set initialX', () => {
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: 100 } as MouseEventInit);
      component.onMouseDown(event);
      expect(component.isDragging).toBeTrue();
      expect(component.initialX).toBe(100 - component.scrollLeft);
    });
  });

  describe('onMouseUp', () => {
    it('should set isDragging to false', () => {
      component.isDragging = true;
      component.onMouseUp();
      expect(component.isDragging).toBeFalse();
    });
  });

  describe('onMouseMove', () => {
    it('should calculate and set the scrollLeft of the element', () => {
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: 150 } as MouseEventInit);
      const element = document.createElement('div');
      element.scrollLeft = 50;
      component.isDragging = true;
      component.initialX = 100;
      component.scrollLeft = element.scrollLeft;

      component.onMouseMove(event, element);
      expect(element.scrollLeft).toBeLessThan(50);
    });

    it('should not set the scrollLeft of the element if not dragging', () => {
      const event = new MouseEvent('mousemove', { bubbles: true, cancelable: true, clientX: 150 } as MouseEventInit);

      const container = document.createElement('div');
      document.body.appendChild(container);

      const element = document.createElement('div');
      element.style.width = '100px'; // Setting a fixed width
      element.style.overflow = 'auto'; // Making it scrollable

      // Appending larger child elements to make the container scrollable
      for (let i = 0; i < 10; i++) {
        const child = document.createElement('div');
        child.style.width = '200px';
        child.style.height = '200px';
        element.appendChild(child);
      }

      container.appendChild(element);

      element.scrollLeft = 50;
      component.isDragging = false;

      component.onMouseMove(event, element);

      expect(element.scrollLeft).toBe(50);

      document.body.removeChild(container);
    });


  });
});
