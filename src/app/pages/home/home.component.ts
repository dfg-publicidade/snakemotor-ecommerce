import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners: any;
  optionsRotativoProdutos: OwlOptions;
  optionsRotativoMarcas: OwlOptions;

  constructor() {
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
      items: 5,
      margin: 20,
      nav: false,
      autoWidth: true,
      dots: true,
      autoplay: true,
      responsive: {
        0: {
          items: 5
        }
      }
    };
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
}
