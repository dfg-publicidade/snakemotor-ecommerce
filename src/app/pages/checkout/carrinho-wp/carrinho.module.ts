import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoWhatsappService } from 'src/app/service/carrinhoWhatsapp.service';
import { CarrinhoDetailWhatsappComponent } from './carrinho-detail.component';
import { CarrinhoRoutingWhatsappModule } from './carrinho-routing.module';
import { PedidoWhatsappService } from 'src/app/service/pedidoWhatspapp.service';

@NgModule({
  declarations: [
    CarrinhoDetailWhatsappComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarrinhoRoutingWhatsappModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    })
  ],
  providers: [
    CarrinhoWhatsappService,
    PedidoWhatsappService
  ]
})
export class CarrinhoWhatsappModule { }
