import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { PagamentoService } from 'src/app/service/pagamento.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { PedidoWhatsappService } from 'src/app/service/pedidoWhatspapp.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';

declare var $: any;
declare var PagSeguroDirectPayment: any; // MÉTODO PAGSEGURO

@Component({
  selector: 'app-checkout-resumo-whatsapp',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class PedidoResumoWhatsappComponent implements OnInit {
  title: string = 'Resumo da compra';
  url: string = '/resumo';
  urlProduto: string = '/produtos';
  usuario: any;
  formaEntrega: any;
  carrinho: any;
  formaPagamento: any;
  endereco: any;
  response: any;

  loadingService: boolean = false;

  metatag: any = {};

  constructor(
    private router: Router,
    private metadataService: MetadataService,
    private pedidoService: PedidoWhatsappService,
    private perfilService: PerfilService,
    private santize: DomSanitizer
  ) {
    //
  }

  ngOnInit(): void {
    this.usuario = this.perfilService.getSession();

    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    this.response = this.pedidoService.getPedidoCache();

    if (this.response) {
      this.carrinho = this.response.content;

      this.carrinho.produtos.forEach((produto: any, index: number) => {
        this.carrinho.produtos[index].imagem =
          ProdutoUtil.getImagemDestaque(produto);

        if (!this.carrinho.produtos[index].imagem) {
          this.carrinho.produtos[index].imagem = '/res/imagens/sem-imagem.png';
        }
      });

      this.formaEntrega = this.response.content.formaEntrega;
      this.formaPagamento = this.response.content.formPagamento;
      this.endereco = this.response.content.entity.recebimento;
    }
  }

  getUrlWhatapp() {
    return this.santize.bypassSecurityTrustUrl(
      `https://api.whatsapp.com/send?phone=5519996257084&text=${this.carrinho.mensagemWpp}&app_absent=0`
    );
  }
}
