import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './listagem/produto.component';
import { ProdutoDetailComponent } from './visualizacao/produto-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutoComponent
  },
  {
    path: ':produtoPermalink',
    component: ProdutoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
