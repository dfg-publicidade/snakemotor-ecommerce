import { Component, HostListener, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';

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

  loadingService: boolean = false;
  infiniteScroll: boolean = false;
  load: boolean = true;

  prefix: string = 'produtoOpcao';

  constructor(private produtoOpcaoService: ProdutoOpcaoService) {

  }

  ngOnInit(): void {
    this.listarProdutos(false);
  }

  listarProdutos(loadMore: boolean) {
    if (!loadMore) {
      this.loadingService = true;
    } else {
      this.load = true;
    }
    this.produtoOpcaoService.listar(this.page, this.filter)
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
    this.filter[`${this.prefix}.precoVenda`] = `${this.minValue}:${this.maxValue}`;
    this.filter = Object.assign({}, this.filter);

    this.page = 1;
    this.listarProdutos(false);
  }

  setFilterVariacao(variacao: string, val?: string): void {
    this.opcoesFiltro.forEach((opcaoFiltro: any, index: number) => {
      if (opcaoFiltro[0] === variacao) {
        let variacoes = '';
        opcaoFiltro[1].forEach((opcao: any, index: number) => {
          let value = !val ? $(`#filter_${variacao}_${opcao.id}:checked`).val() : val;
          if (!val && value) {
            variacoes += `${value},`;
          } else {
            if (opcao.id == val) {
              variacoes += `${val},`;
            }
          }
        });

        if (variacao === 'categorias' || variacao === 'marcas') {
          let prefix = this.prefix;
          switch (variacao) {
            case 'categorias': {
              prefix += `.produto.categoria`;
              break
            }
            case 'marcas': {
              prefix += `.produto.marca`;
              break
            }
          }
          this.filter[`${prefix}.id`] = variacoes.slice(0, -1);
        } else {
          this.filter[`${this.prefix}.${variacao}.id`] = variacoes.slice(0, -1);
        }

        this.filter = Object.assign({}, this.filter);

        this.page = 1;
        this.listarProdutos(false);
      }
    });
  }

  possuiFiltro(variacao: string, opcaoId: string) {
    let possuiFiltro: boolean = false;

    if (this.filter[`${this.prefix}.${variacao}.id`]) {
      let filtros = new Array();
      filtros = this.filter[`${this.prefix}.${variacao}.id`].split(",");

      possuiFiltro = filtros.find((filtro: any) => filtro === opcaoId);
    }

    return possuiFiltro;
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
