import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss']
})
export class ProdutoDetailComponent implements OnInit {
  op: string = '';
  produtoPermalink: string = '';
  url: string = '/produtos';

  produtoOpcao: any;
  produtosPorCategoria: any;

  variacaoOpcoes: any;
  idsVariacaoSelecionada: any = [];

  metatag: any = {};

  formVariacao: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produtoOpcaoService: ProdutoOpcaoService,
    private metadataService: MetadataService
  ) {
    this.formVariacao = this.formBuilder.group({});
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produtoPermalink = params['produtoPermalink'];
    });

    this.route.queryParams.subscribe(params => {
      this.op = params['op'];

      if (this.op) {
        this.buscarProdutoOpcao();
      }
    });
  }

  buscarProdutoOpcao() {
    this.idsVariacaoSelecionada = [];
    this.produtoOpcaoService.visualizar(this.op)
      .subscribe(
        result => {
          this.produtoOpcao = result.content;
          this.produtoOpcao.imagem = ProdutoUtil.getImagemDestaque(this.produtoOpcao);

          if (!this.produtoOpcao.imagem) {
            this.produtoOpcao.imagem = '/res/imagens/sem-imagem.png';
          }

          this.produtoOpcao.imagens = ProdutoUtil.getGaleriaImagens(this.produtoOpcao);

          //INICIO META TAG
          this.metatag.url = this.router.url;
          this.metatag.title = `${this.produtoOpcao.produto.nome} | ${environment.title}`;
          this.metatag.description = `${this.produtoOpcao.produto.descricaoCurta}`;
          this.metatag.image = `${this.produtoOpcao.produto.imagem}`;
          this.metadataService.updateMetadata(this.metatag);
          //FIM META TAG

          //PRODUTO RELACIONADOS
          this.listarProdutosPorCategoria(this.produtoOpcao.produto.categoria.id, 4, true);

          //VARIAÇÕES
          if (this.produtoOpcao.produto && this.produtoOpcao.produto.variacoes) {
            this.produtoOpcao.produto.variacoes.forEach((variacao: any, index: number) => {
              this.formVariacao.addControl(variacao.permalink, new FormControl(null));
              this.formVariacao.controls[variacao.permalink].disable();

              //lista agrupamento por cor e o proximo da lista, no caso tamanho de cor
              this.listarPorProdutoComAgrupamento(variacao.permalink, index);
              this.idsVariacaoSelecionada.push({
                permalink: variacao.permalink,
                id: this.produtoOpcao[variacao.permalink].id
              })
            });
          }
        }
      );
  }

  listarProdutosPorCategoria(categoriaId: string, limite: number, aleatorio: boolean) {
    this.produtoOpcaoService.listarPorCategoria(categoriaId, limite, aleatorio)
      .subscribe(
        result => {
          this.produtosPorCategoria = result.content.items;
        }
      );
  }

  listarPorProdutoComAgrupamento(agrupamento: string, index: number) {
    this.produtoOpcao.produto.variacoes[index].loadingVariacaoOpcaoService = true;

    this.produtoOpcaoService.listarPorProdutoComAgrupamento(this.produtoOpcao.produto.id, agrupamento, this.idsVariacaoSelecionada)
      .subscribe(
        result => {
          this.produtosPorCategoria = result.content.items;
          this.produtoOpcao.produto.variacoes[index].produtoOpcoes = result.content.items;
          this.formVariacao.controls[agrupamento].enable();

          this.produtoOpcao.produto.variacoes[index].produtoOpcoes.forEach((produtoopcao: any, indexOpcao: number) => {
            this.produtoOpcao.produto.variacoes[index].produtoOpcoes[indexOpcao].imagem = ProdutoUtil.getGaleriaImagens(produtoopcao);
          });

          this.produtoOpcao.produto.variacoes[index].loadingVariacaoOpcaoService = false;
        }
      );
  }

  trocarProdutoOpcao(variacaoSelecionadaId: any, agrupamento: string, index: number) {

    this.idsVariacaoSelecionada.find((variacao: any, index: number) => {
      if (variacao.permalink === agrupamento) {
        this.idsVariacaoSelecionada[index].id = variacaoSelecionadaId;
      }
    });

    this.listarPorProdutoComAgrupamento(agrupamento, index);
  }
}
