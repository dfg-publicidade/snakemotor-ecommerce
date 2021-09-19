import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
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
  urlCarrinho: string = '/carrinho';

  produtoOpcao: any;
  cores: any;
  tamanhos: any;
  produtosPorCategoria: any;
  produtoOpcaoSelecionado: any;
  carrinho: any;
  qtdes: any = [];
  toastMessage: any;

  metatag: any = {};

  formVariacao: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produtoOpcaoService: ProdutoOpcaoService,
    private carrinhoService: CarrinhoService,
    private metadataService: MetadataService
  ) {
    this.formVariacao = this.formBuilder.group({
      tamanho: new FormControl(null, [
        Validators.required
      ]),
      qtde: new FormControl(1, [
        Validators.required
      ])
    });

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
    this.formVariacao.controls.qtde.disable();
    this.formVariacao.controls.tamanho.setValue(null);
    this.formVariacao.controls.qtde.setValue(1);

    this.produtoOpcaoService.visualizar(this.op)
      .subscribe(
        result => {
          this.produtoOpcao = result.content.entity;
          this.cores = result.content.cores;
          this.tamanhos = result.content.tamanhos;

          this.cores.forEach((pOpcao: any, index: number) => {
            this.cores[index].imagem = ProdutoUtil.getImagemDestaque(pOpcao);

            if (!this.cores[index].imagem) {
              this.cores[index].imagem = '/res/imagens/sem-imagem.png';
            }
          });

          this.produtoOpcao.imagens = ProdutoUtil.getGaleriaImagens(this.produtoOpcao);

          if (this.tamanhos && this.tamanhos.length === 1) {
            this.produtoOpcaoSelecionado = this.tamanhos[0];

            this.formVariacao.get('tamanho').clearValidators();
            this.formVariacao.get('tamanho').updateValueAndValidity();

            this.getQtdes();
          }

          //INICIO META TAG
          this.metatag.url = this.router.url;
          this.metatag.title = `${this.produtoOpcao.produto.nome} | ${environment.title}`;
          this.metatag.description = `${this.produtoOpcao.produto.descricaoCurta}`;
          this.metatag.image = `${this.produtoOpcao.produto.imagem}`;
          this.metadataService.updateMetadata(this.metatag);
          //FIM META TAG

          //PRODUTO RELACIONADOS
          this.listarProdutosPorCategoria(this.produtoOpcao.produto.categoria.id, 4, true);
        }
      );
  }

  listarProdutosPorCategoria(categoriaId: string, limite: number, aleatorio: boolean) {
    this.produtoOpcaoService.listarPorCategoria(categoriaId, limite, aleatorio, this.op)
      .subscribe(
        result => {
          this.produtosPorCategoria = result.content.items;
        }
      );
  }

  selecionarOpcao(event: any) {
    this.formVariacao.controls.qtde.setValue(null);
    this.op = event;
    this.produtoOpcaoSelecionado = this.tamanhos.find((pOpcao: any) => pOpcao && pOpcao.id === this.op);

    this.produtoOpcaoSelecionado.adicionadoCarrinho = this.jaPossuiCarrinho(this.produtoOpcaoSelecionado.id);

    this.getQtdes();
  }

  getQtdes() {
    this.qtdes = [];

    if (this.produtoOpcaoSelecionado) {
      for (let qtde = 1; qtde <= this.produtoOpcaoSelecionado.estoqueAtual; qtde++) {
        this.qtdes.push(qtde);
      }

      if (this.qtdes.length > 0) {
        this.formVariacao.controls.qtde.enable();
      }
    } else {
      this.formVariacao.controls.qtde.disable();
    }
  }

  adicionarCarrinho() {
    delete this.toastMessage;

    let carrinho = this.carrinhoService.getCarrinho();

    if (!carrinho) {
      carrinho = this.carrinhoService.getCarrinhoVazio();
    }

    carrinho.produtos.push({
      qtde: this.formVariacao.value.qtde,
      produto: this.produtoOpcaoSelecionado.id
    });

    this.carrinhoService.setCarrinho(carrinho);

    this.produtoOpcaoSelecionado.adicionadoCarrinho = true;

    this.produtoOpcaoSelecionado.adicionadoCarrinho = this.jaPossuiCarrinho(this.produtoOpcaoSelecionado.id);

    this.toastMessage = {
      status: 'success',
      message: 'Produto adicionado com sucesso!'
    };
  }

  comprar() {
    let carrinho = this.carrinhoService.getCarrinho();

    if (!carrinho) {
      carrinho = this.carrinhoService.getCarrinhoVazio();
    }

    carrinho.produtos.push({
      qtde: this.formVariacao.value.qtde,
      produto: this.produtoOpcaoSelecionado.id
    });

    this.carrinhoService.setCarrinho(carrinho);

    setTimeout(() => {
      this.router.navigate([this.urlCarrinho]);
    }, 100);
  }

  jaPossuiCarrinho(produtoOpcaoId: string): boolean {
    this.carrinho = this.carrinhoService.getCarrinho();

    let possuiCarrinho = false;

    if (this.carrinho) {
      possuiCarrinho = this.carrinho.produtos.find((pOpcao: any) => pOpcao && pOpcao.produto === produtoOpcaoId);
    }

    return possuiCarrinho;
  }
}
