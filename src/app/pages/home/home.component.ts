import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BannerService } from 'src/app/service/banner.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ProdutoOpcaoService } from 'src/app/service/produto-opcao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  innerWidth: number = 0;
  isMobile: boolean = false;

  banners: any;
  produtosDestaque: any;
  produtosPorCategoriaDestaque: any;
  produtosPorIdsProdutoPrincipal: any;
  categoriaDestaque: any;
  marcas: any;

  optionsRotativoProdutos: OwlOptions;
  optionsRotativoMarcas: OwlOptions;

  tipoBannerIdPrincipal = '611ea26f5c0f7a40491f64d0';
  tipoBannerIdSegundaRolagem = '611ea2da5c0f7ac1d41f64e9';
  tipoBannerIdTerceiraRolagem = '611ea35b5c0f7a834e1f64f6';

  constructor(
    private marcaService: MarcaService,
    private bannerService: BannerService,
    private produtoOpcaoService: ProdutoOpcaoService,
    private categoriaService: CategoriaService
  ) {
    this.optionsRotativoProdutos = {
      loop: true,
      items: 4,
      margin: 15,
      nav: true,
      autoWidth: true,
      dots: true,
      autoplay: true,
      navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
      responsive: {
        0: {
          items: 4
        }
      }
    };

    this.optionsRotativoMarcas = {
      loop: true,
      items: 6,
      margin: 20,
      nav: false,
      autoWidth: true,
      dots: false,
      autoplay: true,
      responsive: {
        0: {
          items: 6
        }
      }
    };
  }

  loadingServiceMarca: boolean = false;

  ngOnInit(): void {
    this.listarMarcas();

    this.banners = [];
    this.listarbanners(this.tipoBannerIdPrincipal);
    this.listarProdutosDestaque(8);

    this.listarbanners(this.tipoBannerIdSegundaRolagem);
    this.listarbanners(this.tipoBannerIdTerceiraRolagem);

    this.buscarCategoriaDestaque(1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    this.mobile();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  listarbanners(tipoId: string) {
    this.bannerService.listarPorPosicao(tipoId)
      .subscribe(
        result => {
          this.banners[tipoId] = result.content.items;

          //LISTA PRODUTOS VINCULADOS AO BANNER DA TERCEIRA ROLAGEM
          if (this.banners[tipoId][0] && tipoId === this.tipoBannerIdTerceiraRolagem) {
            let produtos = this.banners[tipoId][0].produtos;

            if (produtos && produtos.length > 0) {
              let ids: any = [];
              produtos.forEach((produto: any) => {
                ids.push(produto.id);
              });
              this.listarProdutosPorIdsProdutoPrincipal(ids, true);
            }
          }
        }
      );
  }

  listarProdutosDestaque(limite: number) {
    this.produtoOpcaoService.listarDestaques(limite, true)
      .subscribe(
        result => {
          this.produtosDestaque = result.content.items;
        }
      );
  }

  buscarCategoriaDestaque(limite: number) {
    this.categoriaService.buscarDestaque(limite, true)
      .subscribe(
        result => {
          if (result.content.items && result.content.items.length > 0) {
            this.categoriaDestaque = result.content.items[0];

            if (this.categoriaDestaque) {
              this.listarProdutosPorCategoria(this.categoriaDestaque.id, 8, true);
            }
          }
        }
      );
  }

  listarProdutosPorCategoria(categoriaId: string, limite: number, aleatorio: boolean) {
    this.produtoOpcaoService.listarPorCategoria(categoriaId, limite, aleatorio)
      .subscribe(
        result => {
          this.produtosPorCategoriaDestaque = result.content.items;
        }
      );
  }

  listarProdutosPorIdsProdutoPrincipal(produtoIds: any, aleatorio: boolean) {
    this.produtoOpcaoService.listarPorIdsProdutoPrincipal(produtoIds, aleatorio)
      .subscribe(
        result => {
          this.produtosPorIdsProdutoPrincipal = result.content.items;
        }
      );
  }

  listarMarcas() {
    this.loadingServiceMarca = true;
    this.marcaService.listarTodas(true, true, true, 12)
      .subscribe(
        result => {
          this.marcas = result.content.items;
          this.loadingServiceMarca = false;
        }
      );
  }

  mobile() {
    if (this.innerWidth < 575) {
      this.isMobile = true
    } else {
      this.isMobile = false;
    }
  }
}
