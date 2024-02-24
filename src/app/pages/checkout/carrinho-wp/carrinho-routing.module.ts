import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoDetailWhatsappComponent } from './carrinho-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CarrinhoDetailWhatsappComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrinhoRoutingWhatsappModule { }
