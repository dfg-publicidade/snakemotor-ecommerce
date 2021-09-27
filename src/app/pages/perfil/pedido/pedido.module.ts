import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProdutoOpcaoAvaliacaoService } from 'src/app/service/produtoOpcaoAvaliacao.service';
import { PerfilMenuModule } from '../menu/perfil-menu.module';
import { PedidoComponent } from './listagem/listagem.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoDetailComponent } from './visualizacao/detail.component';

@NgModule({
  declarations: [
    PedidoComponent,
    PedidoDetailComponent
  ],
  imports: [
    PedidoRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    PerfilMenuModule,
    PipeModule,
    AlertMessageModule
  ],
  providers: [
    PedidoService,
    ProdutoOpcaoAvaliacaoService
  ]
})
export class PedidoModule { }
