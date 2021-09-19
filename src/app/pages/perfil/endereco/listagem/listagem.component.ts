import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Helpers from 'src/app/helpers';
import { MetadataService } from 'src/app/service/metaData.service';
import { EnderecoService } from 'src/app/service/endereco.service';

declare var $: any;

@Component({
  selector: 'app-endereco-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class EnderecoComponent implements OnInit {
  page: number = 1;
  url: string = '/perfil/enderecos';
  title: string = 'Meus endereços';

  loadingService: boolean = false;
  infiniteScroll: boolean = false;
  load: boolean = true;

  entities: any;
  total: number = 0;

  metatag: any = {};

  constructor(
    private router: Router,
    private enderecoService: EnderecoService,
    private metadataService: MetadataService
  ) {

  }

  ngOnInit(): void {
    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    this.listarEnderecos(false);
  }

  listarEnderecos(loadMore: boolean) {
    if (!loadMore) {
      Helpers.scrollPageTop();
      this.loadingService = true;
    } else {
      this.load = true;
    }

    this.enderecoService.listar(this.page)
      .subscribe(
        result => {
          this.loadingService = false;
          this.load = false;
          if (!loadMore) {
            this.entities = result.content.items;
            this.total = result.content.total;
          } else {
            result.content.items.forEach((entity: any) => {
              this.entities.push(entity);
            });
          }

          this.infiniteScroll = this.entities.length < this.total;
        }
      );
  }

  @HostListener('window:scroll', ['$event'])
  scrollPage() {
    if (this.infiniteScroll && !this.load) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + $('header')[0].scrollHeight;
      let max = $('div.enderecos')[0].scrollHeight;

      if (pos >= max) {
        this.page++;
        this.listarEnderecos(true);
      }
    }
  }
}
