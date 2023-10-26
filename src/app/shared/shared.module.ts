import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './materialdesign/materialdesign.module';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
  ],
  exports: [
    MaterialDesignModule,
    CarouselComponent,
  ],
  declarations: [
    CarouselComponent,
  ]
})
export class SharedModule { }
