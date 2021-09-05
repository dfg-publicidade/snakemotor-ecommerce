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

  loadingService: boolean = false;
  infiniteScroll: boolean = false;
  load: boolean = true;

  constructor(private produtoOpcaoService: ProdutoOpcaoService) {

  }

  ngOnInit(): void {
    this.listarProdutos(false);
  }

  getValue() {
    console.log('min: ', this.minValue);
    console.log('max: ', this.maxValue);
  }

  listarProdutos(loadMore: boolean) {
    if (!loadMore) {
      this.loadingService = true;
    } else {
      this.load = true;
    }
    this.produtoOpcaoService.listar(this.page)
      .subscribe(
        result => {
          this.loadingService = false;
          this.load = false;
          if (!loadMore) {
            this.produtoOpcoes = result.content.items;
            this.total = result.content.total;
          } else {
            result.content.items.forEach((entity: any) => {
              this.produtoOpcoes.push(entity);
            });
          }

          this.infiniteScroll = this.produtoOpcoes.length < this.total;
        }
      );
  }

  @HostListener('window:scroll', ['$event'])
  scrollPage() {
    if (this.infiniteScroll && !this.load) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop);
      let max = $('div.produtos')[0].scrollHeight;

      console.log('pos: ', pos);
      console.log('max: ', max);

      if (pos >= max) {
        this.page++;
        console.log('PAGE:', this.page);
        this.listarProdutos(true);
      }
    }
  }
}
