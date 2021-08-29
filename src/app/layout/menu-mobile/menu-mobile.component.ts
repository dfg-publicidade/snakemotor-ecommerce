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
  loadingCategoriaService: boolean = false;
  infiniteScroll: boolean = false;
  load: boolean = false;

  page: number = 1;
  total: string = '';
  categorias: any;

  configAlert: any = {};

  constructor(private categoriaService: CategoriaService, private perfilService: PerfilService) {
  }

  ngOnInit() {
    this.page = 1;
    // this.listarCategorias(false);
  }

  listarCategorias(loadMore: boolean) {
  }

  loadData() {
    this.page++;

    this.listarCategorias(true);
  }

  scrollPage(event: any) {
    if (this.infiniteScroll && !this.load) {
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        this.loadData();
      }
    }
  }
  getUsuario(){
    return this.perfilService.getSession();
  }

  public toggleMenu() {
    $('aside').toggleClass('open');
    $('body, html').toggleClass('aside-menu-open');
    return false;
  }
}
