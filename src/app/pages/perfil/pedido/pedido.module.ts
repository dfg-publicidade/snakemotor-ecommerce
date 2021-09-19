import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
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
    CommonModule,
    PerfilMenuModule
  ],
  providers: [
    PedidoService
  ]
})
export class PedidoModule { }
