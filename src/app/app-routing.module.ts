import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AppCustomPreloader } from './service/AppCustomPreloader';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'recuperacao-senha',
    loadChildren: () => import('./pages/recuperacao-senha/recuperacao-senha.module').then(m => m.RecuperacaoSenhaModule)
  },
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
        loadChildren: () => import('./pages/checkout/carrinho/carrinho.module').then(m => m.CarrinhoModule)
      },
      {
        path: 'endereco',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/checkout/endereco/endereco.module').then(m => m.EnderecoModule)
      },
      {
        path: 'pagamento',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/checkout/pagamento/pagamento.module').then(m => m.PagamentoModule)
      },
      {
        path: 'resumo',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/checkout/resumo/resumo.module').then(m => m.PedidoResumoModule)
      },
      {
        path: 'perfil',
        'canActivate': [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/perfil/meus-dados/meusDados.module').then(m => m.MeusDadosModule)
          },
          {
            path: 'enderecos',
            loadChildren: () => import('./pages/perfil/endereco/endereco.module').then(m => m.EnderecoModule)
          },
          {
            path: 'senha',
            loadChildren: () => import('./pages/perfil/alteracao-senha/alteracaoSenha.module').then(m => m.AlteracaoSenhaModule)
          }
        ]
      },
      {
        path: 'pedidos',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/perfil/pedido/pedido.module').then(m => m.PedidoModule)
      },
      {
        path: ':categoriaPermalink',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/produto/produto.module').then(m => m.ProdutoModule)
          }
        ]
      },
      {
        path: ':marcaPermalink',
        loadChildren: () => import('./pages/produto/produto.module').then(m => m.ProdutoModule)
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
