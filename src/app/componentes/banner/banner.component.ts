import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UrlFormatPipe } from 'src/app/pipe/urlFormatPipe';
declare var $: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() items: string;
  @Input() options: string;
  loadingImagemBanner: boolean;

  constructor(private router: Router) {
    this.loadingImagemBanner = true;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.items = changes.items.currentValue;
    }
    if (changes.options) {
      this.options = changes.options.currentValue;
    }
  }

  habilitarBanner() {
    this.loadingImagemBanner = false;

    $('div.owl-dots').show();
    $('div.owl-prev').show();
    $('div.owl-next').show();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  abrirBanner(banner) {
    if (banner.produto) {
      let urlFormatPipe = new UrlFormatPipe();
      this.router.navigate(['/produtos', banner.produto.id, urlFormatPipe.transform(banner.produto.nome)]);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }
}
