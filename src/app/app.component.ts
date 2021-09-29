import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import Helpers from './helpers';
import { CategoriaService } from './service/categoria.service';
import { LgpdService } from './service/lgpd.service';
import { Util } from './util/util';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listaCategorias: string = '';
  aceiteLgpd: boolean = false;

  constructor(private router: Router, private categoriaService: CategoriaService, private lgpdService: LgpdService) {
  }


  ngOnInit() {
    Util.loadCss('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

    this.aceiteLgpd = this.lgpdService.getSession();

    if (!this.aceiteLgpd) {
      $('.lgpd').removeClass('close');
      $('.lgpd').addClass('open');
    }

    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        this.listaCategorias = this.categoriaService.categoriasPrincipais;

        $('.modal').modal('hide');
        $('div.campo-busca').removeClass('expanded');
        $('div.dropbox-produtos').removeClass('expanded');

        $('aside').removeClass('open');
        $('body, html').removeClass('aside-menu-open');

        this.closeMenus();
      }
      else if (route instanceof NavigationEnd) {
        Helpers.scrollPageTop();
      }
    });
  }

  aceitarLgpd() {
    this.lgpdService.setSession();

    setTimeout(() => {
      $('.lgpd').removeClass('animate__bounceInUp');
      $('.lgpd').addClass('animate__bounceOutDown');
    }, 100);
  }

  closeMenus() {
    this.listaCategorias.split(',').forEach((categoria: any) => {
      let divCategoria = $(`div.menu-${categoria}`);
      if (divCategoria) {
        divCategoria.hide();
      }
    });
  }
}
