import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { PerfilService } from 'src/app/service/perfil.service';
declare var $: any;

@Component({
  selector: 'app-produtos-component',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosCComponent implements OnInit {
  @Input() options: string;
  @Input() formato: string;
  @Input() produtos: any;

  usuario: any;
  carrinho: any;
  qtdeItens: any;
  modalCarrinhoOpen: any;

  constructor(private carrinhoService: CarrinhoService, private perfilService: PerfilService) {
  }

  ngOnInit() {
    this.usuario = this.perfilService.getSession();
  }

  ngAfterViewInit() {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    this.usuario = this.perfilService.getSession();

    this.carrinho = this.carrinhoService.getCarrinho();
    if (changes.options) {
      this.options = changes.options.currentValue;
    }
    if (changes.formato) {
      this.formato = changes.formato.currentValue;
    }
    if (changes.produtos) {
      this.produtos = changes.produtos.currentValue;
    }
  }

  getCarrinho() {
    return this.carrinhoService.getCarrinho();
  }

  adicionarCarrinho(produto) {
    this.modalCarrinhoOpen = {
      timestamp: new Date().getTime(),
      open: true
    };

    let carrinho = this.carrinhoService.getCarrinho();

    if (!carrinho) {
      carrinho = [];
    }

    carrinho.push(produto);

    this.carrinhoService.setCarrinho(carrinho);

    this.atualizaValorCarrinho(carrinho);
  }

  atualizaCorProdutoCarrinho(produto: any, index: number) {
    this.carrinho[index] = produto;

    this.carrinhoService.setCarrinho(this.carrinho);
  }

  atualizaValorCarrinho(carrinho) {
    if (carrinho) {
      carrinho.valorTotal = 0;

      if (carrinho.length > 0) {
        carrinho.forEach((produto, index) => {
          produto.valorTotal = 0;

          if (!produto.qtde) {
            produto.qtde = 1;
          }

          carrinho[index] = produto;

          produto.valorTotal = produto.precoVenda * produto.qtde;

          carrinho.valorTotal += produto.valorTotal;

          carrinho[index] = produto;
        });
      }

      this.carrinhoService.setCarrinho(carrinho);

      this.carrinho = carrinho;
    }
  }

  jaPossuiCarrinho(produto): boolean {
    let possuiCarrinho = false;

    if (this.carrinho) {
      if (this.getCarrinho()) {
        possuiCarrinho = this.getCarrinho().find(prod => prod && prod.id === produto.id);
      } else {
        false;
      }
    }

    return possuiCarrinho;
  }

  getUsuario() {
    return this.perfilService.getSession();
  }
}
