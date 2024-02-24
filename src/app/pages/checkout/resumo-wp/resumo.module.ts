import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { PedidoService } from 'src/app/service/pedido.service';
import { PedidoResumoWhatsappRoutingModule } from './resumo-routing.module';
import { PedidoResumoWhatsappComponent } from './resumo.component';
import { PedidoWhatsappService } from 'src/app/service/pedidoWhatspapp.service';

@NgModule({
  declarations: [PedidoResumoWhatsappComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PedidoResumoWhatsappRoutingModule,
    CommonModule,
    AlertMessageModule,
    PipeModule,
  ],
  providers: [PedidoWhatsappService],
})
export class PedidoResumoWhatsappModule {}
