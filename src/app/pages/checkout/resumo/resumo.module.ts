import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { PedidoService } from 'src/app/service/pedido.service';
import { PedidoResumoRoutingModule } from './resumo-routing.module';
import { PedidoResumoComponent } from './resumo.component';

@NgModule({
  declarations: [
    PedidoResumoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PedidoResumoRoutingModule,
    CommonModule,
    AlertMessageModule,
    PipeModule
  ],
  providers: [
    PedidoService
  ]
})
export class PedidoResumoModule { }
