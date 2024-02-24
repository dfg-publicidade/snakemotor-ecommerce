import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoResumoWhatsappComponent } from './resumo.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoResumoWhatsappComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoResumoWhatsappRoutingModule {}
