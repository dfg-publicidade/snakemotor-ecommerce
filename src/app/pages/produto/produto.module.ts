import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GalleryModule } from 'ngx-doe-gallery';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { ToastMessageModule } from 'src/app/componentes/toastMessage/toast-alert.module';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { ProdutoComponent } from './listagem/produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoDetailComponent } from './visualizacao/produto-detail.component';

@NgModule({
  declarations: [
    ProdutoComponent,
    ProdutoDetailComponent
  ],
  imports: [
    ProdutoRoutingModule,
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
    ProdutoService,
    ProdutoOpcaoService,
    CarrinhoService
  ]
})
export class ProdutoModule { }
