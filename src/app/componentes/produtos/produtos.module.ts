import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { ProdutosCComponent } from './produtos.component';
import { ModalCarrinhoModule } from '../modalCarrinho/modal-carrinho.module';

@NgModule({
  declarations: [
    ProdutosCComponent
  ],
  exports: [
    ProdutosCComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    CarouselModule,
    PipeModule,
    ModalCarrinhoModule
  ],
  providers: [
    PerfilService,
    CarrinhoService
  ],
})
export class ProdutosComponenteModule { }
