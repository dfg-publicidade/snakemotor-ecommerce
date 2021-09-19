import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoComponent } from './listagem/listagem.component';
import { EnderecoCreateComponent } from './novo/create.component';
import { EnderecoDetailComponent } from './visualizacao/detail.component';

const routes: Routes = [
  {
    path: '',
    component: EnderecoComponent
  },
  {
    path: 'novo',
    component: EnderecoCreateComponent
  },
  {
    path: ':id',
    component: EnderecoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnderecoRoutingModule { }
