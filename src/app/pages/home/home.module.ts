import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerModule } from 'src/app/componentes/banner/banner.module';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    BannerModule,
    CarouselModule,
    ProdutoComponentModule
  ],
  providers: []
})
export class HomeModule { }
