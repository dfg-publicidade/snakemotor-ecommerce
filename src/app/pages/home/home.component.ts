import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BannerService } from 'src/app/service/banner.service';
import { MarcaService } from 'src/app/service/marca.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  innerWidth: number = 0;
  isMobile: boolean = false;

  marcas: any;
  banners: any;
  optionsRotativoProdutos: OwlOptions;
  optionsRotativoMarcas: OwlOptions;

  tipoBannerIdPrincipal = '611ea26f5c0f7a40491f64d0';
  tipoBannerIdSegundaRolagem = '611ea2da5c0f7ac1d41f64e9';
  tipoBannerIdTerceiraRolagem = '611ea35b5c0f7a834e1f64f6';

  constructor(
    private marcaService: MarcaService,
    private bannerService: BannerService
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
    this.listarbanners(this.tipoBannerIdSegundaRolagem);
    this.listarbanners(this.tipoBannerIdTerceiraRolagem);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    this.mobile();
    
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
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



  listarbanners(tipoId: string) {
    this.bannerService.listarPorPosicao(tipoId)
      .subscribe(
        result => {
          this.banners[tipoId] = result.content.items;

          console.log(this.banners);
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
