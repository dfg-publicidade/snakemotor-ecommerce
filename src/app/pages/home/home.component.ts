import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BannerService } from 'src/app/service/banner.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LeadServiceService } from 'src/app/service/lead.service';
import { MarcaService } from 'src/app/service/marca.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';

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

  //FORMULÁRIO LEAD
  formLead: any;
  loadingServiceLead: boolean = false;
  resultLead: any;

  timestamp: any = new Date().getTime();

  constructor(
    private router: Router,
    private marcaService: MarcaService,
    private bannerService: BannerService,
    private produtoOpcaoService: ProdutoOpcaoService,
    private categoriaService: CategoriaService,
    private leadService: LeadServiceService,
    private formBuilder: FormBuilder,
    private metadataService: MetadataService
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
      responsiveRefreshRate: 1,

      responsive: {
        0: {
          items: 1
        },
        439: {
          items: 2
        },
        639: {
          items: 3
        },
        1000: {
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
          items: 3
        },
        439: {
          items: 3
        },
        639: {
          items: 4
        },
        1000: {
          items: 6
        }
      }
    };
  }

  loadingServiceMarca: boolean = false;

  ngOnInit(): void {
    //INICIALIZA META - default
    this.metadataService.updateMetadata({
      url: this.router.url
    });

    this.formLead = this.formBuilder.group({
      celular: new FormControl('', [
        Validators.required
      ])
    });

    this.listarMarcas();

    this.banners = [];
    this.listarbanners(this.tipoBannerIdPrincipal);
    this.listarProdutosDestaque(8);

    this.listarbanners(this.tipoBannerIdSegundaRolagem);
    this.listarbanners(this.tipoBannerIdTerceiraRolagem);

    this.buscarCategoriaDestaque(1);

    this.mobile();
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

  listarMarcas() {
    this.loadingServiceMarca = true;
    this.marcaService.listarTodas(true, true, true)
      .subscribe(
        result => {
          this.marcas = result.content.items;
          this.loadingServiceMarca = false;
        }
      );
  }

  cadastrarLead() {
    delete this.resultLead;
    this.loadingServiceLead = true;

    this.leadService.inserir(this.formLead)
      .subscribe(
        result => {
          this.loadingServiceLead = false;

          this.resultLead = result;

          if (this.resultLead.status === 'success') {
            this.formLead.patchValue({
              celular: ''
            })
          }
        },
        (error) => {
          this.loadingServiceLead = false;

          if (error.error) {
            this.resultLead = error.error;
          }
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
