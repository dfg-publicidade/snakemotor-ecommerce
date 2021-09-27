import { Options } from '@angular-slider/ngx-slider';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Helpers from 'src/app/helpers';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MarcaService } from 'src/app/service/marca.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';

declare var $: any;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 50000;
  options: Options = {
    floor: 0,
    ceil: 50000,
    hideLimitLabels: true
  };

  page: number = 1;
  produtoOpcoes: any;
  total: number = 0;
  opcoesFiltro: any;
  categoriasFiltro: any;
  categoria: any;
  marcasFiltro: any;
  marca: any;
  filter: any = {};
  order: any;
  filtrosSelecionados: any;

  loadingService: boolean = false;
  infiniteScroll: boolean = false;
  load: boolean = true;

  prefix: string = 'produtoOpcao';
  metatag: any = {};

  categoriaPermalink: string = '';
  subcategoriaPermalink: string = '';
  marcaPermalink: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoOpcaoService: ProdutoOpcaoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private metadataService: MetadataService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaPermalink = params['categoriaPermalink'];
      this.subcategoriaPermalink = params['subcategoriaPermalink'];
      this.marcaPermalink = params['marcaPermalink'];

      if (this.categoriaPermalink && !this.subcategoriaPermalink) {
        this.buscarCategoriaPorPermalink();
      }

      if (this.subcategoriaPermalink) {
        this.categoriaPermalink = this.subcategoriaPermalink;
        this.buscarCategoriaPorPermalink();
      }

      if (this.marcaPermalink) {
        this.buscarMarcaPorPermalink();
      }
    });

    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = `Produtos`;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    if (!this.categoriaPermalink) {
      this.listarProdutos(false);
    }
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

        if (!variacoes && this.categoria) {
          variacoes += `${this.categoria.id},`;
        }

        if (this.categoria && !this.filter['categoria.id'].id) {
          this.filter['categoria.id'] = {
            id: this.categoria.id,
            nome: this.categoria.nome,
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
          this.categoria = result.content && result.content.items && result.content.items.length > 0 ? result.content.items[0] : '';

          if (this.categoria) {
            this.opcoesFiltro = {
              categorias: [{
                id: this.categoria.id,
                nome: this.categoria.nome,
              }]
            }

            this.opcoesFiltro = Object.entries(this.opcoesFiltro);

            this.setFilterVariacao('categorias', this.categoria.id);
          }
        }
      );
  }

  buscarMarcaPorPermalink() {
    this.marcaService.buscarPorPermalink(this.marcaPermalink)
      .subscribe(
        result => {
          this.marca = result.content && result.content.items && result.content.items.length > 0 ? result.content.items[0] : '';

          if (this.marca) {
            this.opcoesFiltro = {
              marcas: [{
                id: this.marca.id,
                nome: this.marca.nome,
              }]
            }

            this.opcoesFiltro = Object.entries(this.opcoesFiltro);

            this.setFilterVariacao('marcas', this.marca.id);
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

    if (this.categoria && !this.filter['categoria.id'] || (this.filter['categoria.id'] && !this.filter['categoria.id'].id)) {
      this.filter['categoria.id'] = {
        id: this.categoria.id,
        nome: this.categoria.nome,
      };
    }

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
