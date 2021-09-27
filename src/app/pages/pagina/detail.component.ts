import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { PaginaService } from 'src/app/service/pagina.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagina-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class PaginaDetailComponent implements OnInit {
  url: string = '/';
  title: string = '';

  metatag: any = {};

  permalink: string = '';
  entity: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paginaService: PaginaService,
    private metadataService: MetadataService
  ) {
    //
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permalink = params['permalink'];

      if (this.permalink) {
        this.visualizarPagina();
      }
    });
  }

  visualizarPagina() {
    this.paginaService.buscarPorPermalink(this.permalink)
      .subscribe(
        result => {
          if (result.content.items && result.content.items.length > 0) {
            this.entity = result.content.items[0];
            //INICIO META TAG
            this.metatag.url = this.router.url;
            this.metatag.title = `${this.entity.titulo} - ${environment.title}`;
            this.metadataService.updateMetadata(this.metatag);
            //FIM META TAG
          }
        }
      );
  }
}
