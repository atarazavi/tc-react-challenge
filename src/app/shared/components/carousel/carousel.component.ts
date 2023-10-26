import { CarouselItem } from '#shared/models/carouselItem.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() toBeListedArray: CarouselItem[] | null;
  isDragging = false;
  initialX = 0;
  scrollLeft = 0;

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.initialX = event.pageX - this.scrollLeft;
    event.preventDefault();
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent, element: HTMLElement): void {
    if (!this.isDragging) return;
    const x = event.pageX;
    const walk = (x - this.initialX) * 2; // scroll-fast
    element.scrollLeft = this.scrollLeft - walk;
  }
}
