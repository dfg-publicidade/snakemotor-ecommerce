import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/service/metaData.service';
import { Util } from 'src/app/util/util';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-pagina-404',
  templateUrl: './pagina-404.component.html',
  styleUrls: ['./pagina-404.component.scss']
})
export class Pagina404Component implements OnInit {
  url: string;
  title: string = 'Não conseguimos encontrar essa página';
  metatag: any = {};

  breadcrumbs = [];

  constructor(private metadataService: MetadataService) {
    this.url = window.location.href;
  }

  ngOnInit() {
    Util.loadCss('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

    //INICIO META TAG
    this.metatag.url = this.url;
    this.metatag.title = `${this.title} | ${environment.title}`;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    setTimeout(() => {
      $('div.ops h1').addClass('animate__bounceInDown');
    }, 100);
  }
}
