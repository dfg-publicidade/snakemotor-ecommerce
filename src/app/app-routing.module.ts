import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AppCustomPreloader } from './service/AppCustomPreloader';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./pages/produto/produto.module').then(m => m.ProdutoModule)
      },
      {
        path: 'carrinho',
        loadChildren: () => import('./pages/carrinho/carrinho.module').then(m => m.CarrinhoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: AppCustomPreloader // Para realizar preloading de rotas. Adicione nas rotas o atributo preload
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
