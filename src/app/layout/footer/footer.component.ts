import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ConfiguracaoService } from 'src/app/service/configuracao.service';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  categorias: any;
  configuracao: any;
  time: any = new Date().getTime();
  constructor(
    private configuracaoService: ConfiguracaoService,
    private categoriaService: CategoriaService
  ) {
  }

  ngOnInit() {
    this.listarCategorias();
    // this.buscarConfiguracao();
  }

  listarCategorias() {
    this.categorias = this.categoriaService.getCategoriasPrincipais();
    
    if (!this.categorias) {
      let categoriasPrincipais = this.categoriaService.categoriasPrincipais;
      this.categoriaService.listarPorSuperCategorias(categoriasPrincipais)
        .subscribe(
          result => {
            this.categorias = Object.entries(result.content);
          }
        );
    }
  }

  buscarConfiguracao() {
    this.configuracaoService.buscar()
      .subscribe(
        result => {
          if (result) {
            this.configuracao = result;

            setTimeout(() => {
              $('.btn-group-fab').on('click', '.btn', function () {
                $('.btn-group-fab').toggleClass('active');
              });
              $('has-tooltip').tooltip();
            }, 100);
          }
        }
      );
  }

  getOnlyNumber(telefone: string) {
    return telefone.replace(/^\+|-|\(|\)/g, '').replace(' ', '');
  }
}
