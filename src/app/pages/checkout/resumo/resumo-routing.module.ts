import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoResumoComponent } from './resumo.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoResumoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoResumoRoutingModule { }
