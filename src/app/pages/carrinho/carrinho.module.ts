import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoRoutingModule } from './carrinho-routing.module';
import { CarrinhoDetailComponent } from './visualizacao/carrinho-detail.component';

@NgModule({
  declarations: [
    CarrinhoDetailComponent
  ],
  imports: [
    CarrinhoRoutingModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule
  ],
  providers: []
})
export class CarrinhoModule { }
