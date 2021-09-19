import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './listagem/listagem.component';
import { PedidoDetailComponent } from './visualizacao/detail.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent
  },
  {
    path: ':id',
    component: PedidoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
