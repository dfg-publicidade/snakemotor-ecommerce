import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoWhatsappComponent } from './endereco.component';

const routes: Routes = [
  {
    path: '',
    component: EnderecoWhatsappComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnderecoWhatsappRoutingModule { }
