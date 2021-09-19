import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metaData.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';

declare var $: any;

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class PedidoDetailComponent implements OnInit {
  url: string = '/pedidos';
  urlProduto: string = '/produtos';
  title: string = 'Meus pedidos';

  id: string = '';
  entity: any

  loadingService: boolean = false;

  metatag: any = {};

  formaEntrega: any;
  formaPagamento: any;
  endereco: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private metadataService: MetadataService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      console.log(this.id);

      if (this.id) {
        this.visualizarPedido();
      }
    });

  }

  visualizarPedido() {
    this.loadingService = true;

    this.pedidoService.visualizar(this.id)
      .subscribe(
        result => {
          this.loadingService = false;

          this.entity = result.content;

          //INICIO META TAG
          this.metatag.url = this.router.url;
          this.metatag.title = this.title;
          this.metadataService.updateMetadata(this.metatag);
          //FIM META TAG

          if (this.entity.produtos && this.entity.produto.length > 0) {
            this.entity.produtos.forEach((produto: any, index: number) => {
              this.entity.produtos[index].imagem = ProdutoUtil.getImagemDestaque(produto);

              if (!this.entity.produtos[index].imagem) {
                this.entity.produtos[index].imagem = '/res/imagens/sem-imagem.png';
              }
            });
          }

          this.formaEntrega = result.content.formaEntrega;
          this.formaPagamento = result.content.formPagamento;
          this.endereco = result.content.entity.recebimento;

        });
  }
}
