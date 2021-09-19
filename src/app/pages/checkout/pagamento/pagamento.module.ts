import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { PagamentoComponent } from './listagem/pagamento.component';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoDetailComponent } from './visualizacao/pagamento-detail.component';

@NgModule({
  declarations: [
    PagamentoComponent,
    PagamentoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagamentoRoutingModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    AlertMessageModule,
    NgxMaskModule.forRoot({ 
      dropSpecialCharacters: false
    })
  ],
  providers: [
    CarrinhoService,
    PedidoService
  ]
})
export class PagamentoModule { }
