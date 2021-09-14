import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CarrinhoDetailComponent } from './carrinho-detail.component';
import { CarrinhoRoutingModule } from './carrinho-routing.module';

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
