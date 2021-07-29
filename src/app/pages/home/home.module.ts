import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerModule } from 'src/app/componentes/banner/banner.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    BannerModule
  ],
  providers: []
})
export class HomeModule { }
