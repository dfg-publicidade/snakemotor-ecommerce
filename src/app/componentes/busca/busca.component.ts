import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
declare var $: any;

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  busca: string = '';
  produtos: any;
  urlProduto: string = '/produtos';

  loadingServiceBusca: boolean = false;
  constructor(private router: Router, private produtoOpcaoService: ProdutoOpcaoService) {

  }

  ngOnInit() {
  }

  buscarProdutos() {
    setTimeout(() => {
      this.busca = '';
    }, 500);
    this.router.navigate(['/produtos'], { queryParams: { q: this.busca } });
  }


  limparBusca() {
    this.busca = '';

    location.href = '/produtos';
  }
  // buscarProdutos() {
  //   delete this.produtos;
  //   this.loadingServiceBusca = true;
  //   this.produtoOpcaoService.buscarProduto(this.busca)
  //     .subscribe(
  //       result => {
  //         this.produtos = result.content.items;
  //         this.loadingServiceBusca = false;

  //         this.produtos.forEach((produto: any, index: number) => {
  //           this.produtos[index].imagem = ProdutoUtil.getImagemDestaque(produto);
  //         });
  //       }
  //     );
  // }
}
