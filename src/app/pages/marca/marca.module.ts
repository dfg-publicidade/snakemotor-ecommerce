import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GalleryModule } from 'ngx-doe-gallery';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { ToastMessageModule } from 'src/app/componentes/toastMessage/toast-alert.module';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { MarcaRoutingModule } from './marca-routing.module';

@NgModule({
  declarations: [
    //
  ],
  imports: [
    MarcaRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    NgxSliderModule,
    GalleryModule,
    PipeModule,
    ToastMessageModule
  ],
  providers: [
    MarcaService,
    CategoriaService,
    ProdutoService,
    ProdutoOpcaoService,
    CarrinhoService,
    Location
  ]
})
export class MarcaModule { }
