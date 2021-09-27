import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metaData.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProdutoOpcaoAvaliacaoService } from 'src/app/service/produtoOpcaoAvaliacao.service';
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
  produtoSelecionado: any;

  loadingService: boolean = false;
  loadingAvaliacaoService: boolean = false;

  metatag: any = {};

  formaEntrega: any;
  formaPagamento: any;
  endereco: any;

  responseAvaliacao: any;

  formAvaliacao: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private metadataService: MetadataService,
    private produtoOpcaoAvaliacaoService: ProdutoOpcaoAvaliacaoService
  ) {

    this.formAvaliacao = formBuilder.group({
      avaliacao: new FormControl('',
        Validators.required
      ),
      observacao: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

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

          this.entity.produtos = result.content.produtos;

          if (this.entity.produtos && this.entity.produtos.length > 0) {
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

  abrirModalAvaliacao(produtoId: string) {
    delete this.responseAvaliacao;
    this.produtoSelecionado = this.entity.produtos.find((produtoOpcao: any) => produtoOpcao.id === produtoId);

    $('#modalAvaliacao').modal('show');
  }

  setAvaliacao(avaliacao: number) {
    if (avaliacao) {
      this.formAvaliacao.controls['avaliacao'].setValue(avaliacao);
    }
  }

  avaliarProduto() {
    delete this.responseAvaliacao;
    this.loadingAvaliacaoService = true;
    this.produtoOpcaoAvaliacaoService.avaliar(this.produtoSelecionado.id, this.formAvaliacao)
      .subscribe(
        result => {
          this.loadingAvaliacaoService = false;
          this.formAvaliacao.reset();

          this.responseAvaliacao = result;

          if (this.responseAvaliacao.status === 'success') {
            setTimeout(() => {
              $('#modalAvaliacao').modal('hide');
            }, 3000);
          }
        },
        (error) => {
          this.responseAvaliacao = error.error;
          this.loadingAvaliacaoService = false;
        });
  }
}
