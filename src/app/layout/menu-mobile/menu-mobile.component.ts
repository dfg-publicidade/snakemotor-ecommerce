import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { PerfilService } from 'src/app/service/perfil.service';
declare var $: any;

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {
  categorias: any;

  configAlert: any = {};

  constructor(private categoriaService: CategoriaService, private perfilService: PerfilService) {
  }

  ngOnInit() {
    this.listarCategorias();
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

  getUsuario() {
    return this.perfilService.getSession();
  }

  public toggleMenu() {
    $('aside').toggleClass('open');
    $('body, html').toggleClass('aside-menu-open');
    return false;
  }
}
