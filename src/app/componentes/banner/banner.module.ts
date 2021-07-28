import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerComponent } from './banner.component';
import { PipeModule } from 'src/app/pipe/pipeModule';

@NgModule({
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    CarouselModule,
    PipeModule
  ],
  providers: [],
})
export class BannerModule { }
