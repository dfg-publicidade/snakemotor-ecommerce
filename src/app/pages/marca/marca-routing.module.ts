import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from '../produto/listagem/produto.component';
import { ProdutoDetailComponent } from '../produto/visualizacao/produto-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':marcaPermalink',
        component: ProdutoComponent
      },
      {
        path: ':produtoPermalink',
        component: ProdutoDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
