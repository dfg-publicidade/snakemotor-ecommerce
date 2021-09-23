import { Component, HostListener, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import Helpers from 'src/app/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metaData.service';
import { CategoriaService } from 'src/app/service/categoria.service';

declare var $: any;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    hideLimitLabels: true
  };

  page: number = 1;
  produtoOpcoes: any;
  total: number = 0;
  opcoesFiltro: any;
  categoriasFiltro: any;
  marcasFiltro: any;
  filter: any = {};
  order: any;
  filtrosSelecionados: any;

  loadingService: boolean = false;
  infiniteScroll: boolean = false;
  load: boolean = true;

  prefix: string = 'produtoOpcao';
  metatag: any = {};

  categoriaPermalink: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoOpcaoService: ProdutoOpcaoService,
    private categoriaService: CategoriaService,
    private metadataService: MetadataService
  ) {

  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.categoriaPermalink = params['categoriaPermalink'];

    //   if (this.categoriaPermalink) {
    //     this.buscarCategoriaPorPermalink();
    //   }
    // });

    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = `Produtos`;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    // if (!this.categoriaPermalink) {
    //   this.listarProdutos(false);
    // }

    this.listarProdutos(false);
  }

  listarProdutos(loadMore: boolean) {
    if (!loadMore) {
      Helpers.scrollPageTop();
      this.loadingService = true;
    } else {
      this.load = true;
    }

    this.filtrosSelecionados = Object.entries(this.filter);

    this.produtoOpcaoService.listar(this.page, this.filter, this.order)
      .subscribe(
        result => {
          this.loadingService = false;
          this.load = false;
          if (!loadMore) {
            this.produtoOpcoes = result.content.items;
            this.total = result.content.total;
            this.opcoesFiltro = Object.entries(result.content.filtros);
          } else {
            result.content.items.forEach((entity: any) => {
              this.produtoOpcoes.push(entity);
            });
          }

          this.infiniteScroll = this.produtoOpcoes.length < this.total;
        }
      );
  }

  setFilterPreco(): void {
    this.filter[`preco`] = {
      nome: 'Preço',
      id: `${this.minValue};${this.maxValue}`
    };
    this.filter = Object.assign({}, this.filter);

    this.page = 1;
    this.listarProdutos(false);
  }

  setFilterVariacao(variacao: string, val?: string): void {
    this.opcoesFiltro.forEach((opcaoFiltro: any, index: number) => {
      if (opcaoFiltro[0] === variacao) {
        let variacoes = '';
        let nomeOpcao = '';
        opcaoFiltro[1].forEach((opcao: any, index: number) => {
          let value = !val ? $(`#filter_${variacao}_${opcao.id}:checked`).val() : val;
          if (!val && value) {
            variacoes += `${value},`;
            nomeOpcao = opcao.nome;
          } else {
            if (opcao.id === val) {
              variacoes += `${val},`;
              nomeOpcao = opcao.nome;
            }
          }
        });

        if (variacao === 'categorias' || variacao === 'marcas') {
          let prefix = this.prefix;
          switch (variacao) {
            case 'categorias': {
              prefix = `categoria`;
              break
            }
            case 'marcas': {
              prefix += `.produto.marca`;
              break
            }
          }
          this.filter[`${prefix}.id`] = {
            nome: nomeOpcao,
            id: variacoes.slice(0, -1)
          };


        } else {
          this.filter[`${this.prefix}.${variacao}.id`] = {
            nome: nomeOpcao,
            id: variacoes.slice(0, -1)
          };
        }

        this.filter = Object.assign({}, this.filter);

        this.page = 1;
        this.listarProdutos(false);
      }
    });
  }

  buscarCategoriaPorPermalink() {
    this.categoriaService.buscarPorPermalink(this.categoriaPermalink)
      .subscribe(
        result => {
          if (result.content.items && result.content.items.length > 0) {
            this.opcoesFiltro = {
              categorias: [{
                id: result.content.items[0].id,
                nome: result.content.items[0].nome,
              }]
            }

            this.opcoesFiltro = Object.entries(this.opcoesFiltro);

            this.setFilterVariacao('categorias', this.categoriaPermalink);
          }
        }
      );
  }

  possuiFiltro(variacao: string, opcaoId: string) {
    let possuiFiltro: boolean = false;

    if (this.filter[`${this.prefix}.${variacao}.id`]) {
      let filtros = new Array();
      filtros = (this.filter[`${this.prefix}.${variacao}.id`].id).split(',');

      possuiFiltro = filtros.find((filtro: any) => filtro === opcaoId);
    }

    return possuiFiltro;
  }

  removerFiltroSelecionado(filtro: string) {
    delete this.filter[filtro];

    this.filter = Object.assign({}, this.filter);

    this.listarProdutos(false);
  }

  setOrder(order: string) {
    this.order = order;

    this.listarProdutos(false);
  }

  getNomeVariacao(index: number) {
    return this.opcoesFiltro[index][0].replaceAll('_', ' ');
  }

  @HostListener('window:scroll', ['$event'])
  scrollPage() {
    if (this.infiniteScroll && !this.load) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + $('header')[0].scrollHeight;
      let max = $('div.produtos')[0].scrollHeight;

      if (pos >= max) {
        this.page++;
        this.listarProdutos(true);
      }
    }
  }
}
