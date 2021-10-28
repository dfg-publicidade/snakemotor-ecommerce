import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerModule } from 'src/app/componentes/banner/banner.module';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { BannerService } from 'src/app/service/banner.service';
import { LeadServiceService } from 'src/app/service/lead.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: false,
};

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BannerModule,
    CarouselModule,
    ProdutoComponentModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    BannerService,
    MarcaService,
    ProdutoOpcaoService,
    LeadServiceService
  ]
})
export class HomeModule { }
