import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerModule } from 'src/app/componentes/banner/banner.module';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { BannerService } from 'src/app/service/banner.service';
import { MarcaService } from 'src/app/service/marca.service';
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
  providers: [
    BannerService,
    MarcaService
  ]
})
export class HomeModule { }
