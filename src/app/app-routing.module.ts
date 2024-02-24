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
        path: 'c', //categorias
        loadChildren: () => import('./pages/categoria/categoria.module').then(m => m.CategoriaModule)
      },
      {
        path: 'm', //marcas
        loadChildren: () => import('./pages/marca/marca.module').then(m => m.MarcaModule)
      },
      {
        path: 'carrinho',
        loadChildren: () => import('./pages/checkout/carrinho/carrinho.module').then(m => m.CarrinhoModule)
      },
      {
        path: 'carrinho-wp',
        loadChildren: () => import('./pages/checkout/carrinho-wp/carrinho.module').then(m => m.CarrinhoWhatsappModule)
      },
      {
        path: 'endereco',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/checkout/endereco/endereco.module').then(m => m.EnderecoModule)
      },
      {
        path: 'endereco-wp',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/checkout/endereco-wp/endereco.module').then(m => m.EnderecoWhatsappModule)
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
        path: 'resumo-wp',
        'canActivate': [AuthGuard],
        loadChildren: () => import('./pages/checkout/resumo-wp/resumo.module').then(m => m.PedidoResumoWhatsappModule)
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
        path: '404',
        loadChildren: () => import('./pages/pagina-erro/pagina-404/pagina-404.module').then(m => m.Pagina404Module)
      },
      {
        path: ':permalink',
        loadChildren: () => import('./pages/pagina/pagina.module').then(m => m.PaginaModule)
      },
      {
        path: '**',
        redirectTo: '/404'
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
