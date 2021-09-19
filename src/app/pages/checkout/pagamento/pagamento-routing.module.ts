import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentoComponent } from './listagem/pagamento.component';
import { PagamentoDetailComponent } from './visualizacao/pagamento-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PagamentoComponent
  },
  {
    path: 'detalhes',
    component: PagamentoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
