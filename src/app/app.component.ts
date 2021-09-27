import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import Helpers from './helpers';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listaCategorias: any = 'capacetes,vestuario,bigtrail,street,escapamentos';

  constructor(private router: Router) {
  }


  ngOnInit() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
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

  closeMenus() {
    this.listaCategorias.split(',').forEach((categoria: any) => {
      let divCategoria = $(`div.menu-${categoria}`);
      if (divCategoria) {
        divCategoria.hide();
      }
    });
  }
}
