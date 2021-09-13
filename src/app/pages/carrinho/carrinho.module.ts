import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CarrinhoRoutingModule } from './carrinho-routing.module';
import { CarrinhoDetailComponent } from './visualizacao/carrinho-detail.component';

@NgModule({
  declarations: [
    CarrinhoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarrinhoRoutingModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    })
  ],
  providers: [
    CarrinhoService
  ]
})
export class CarrinhoModule { }
