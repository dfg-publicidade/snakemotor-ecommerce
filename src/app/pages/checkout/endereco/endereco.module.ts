import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './endereco.component';

@NgModule({
  declarations: [
    EnderecoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EnderecoRoutingModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    })
  ],
  providers: [
    CarrinhoService,
    EnderecoService
  ]
})
export class EnderecoModule { }
