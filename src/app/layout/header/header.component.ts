import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from "src/app/service/carrinho.service";
import { CategoriaService } from 'src/app/service/categoria.service';
import { ConfiguracaoService } from 'src/app/service/configuracao.service';
import { PerfilService } from 'src/app/service/perfil.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  configuracao: any;
  scrolled: boolean = false;
  categorias: any = {
    capacetes: '',
    vestuario: '',
    bigtrail: '',
    street: '',
    escapamentos: ''
  }
  categoriaLista: any;

  constructor(private router: Router, private categoriaService: CategoriaService, private perfilService: PerfilService, private carrinhoService: CarrinhoService, private configuracaoService: ConfiguracaoService) {

  }

  ngOnInit() {
    // this.buscarConfiguracao();

    this.categoriaLista = Object.entries(this.categorias);

    this.categoriaLista.forEach((categoria: any) => {
      this.listarCategorias(categoria[0]);
    });

    $('li.item-menu').hover(() => {
      //
    },
      () => {
        this.closeMenus();
        $('body').removeClass('noscroll');
      });
  }

  buscarConfiguracao() {
    this.configuracaoService.buscar()
      .subscribe(
        result => {
          if (result) {
            this.configuracao = result;
          }
        }
      );
  }

  listarCategorias(categoriaPermalink: string) {
    this.categoriaService.listarPorSuperCategorias(categoriaPermalink)
      .subscribe(
        result => {
          this.categorias[categoriaPermalink] = result.content.items;
        }
      );
  }

  getCarrinho() {
    return this.carrinhoService.getCarrinho();
  }

  openMenu(menu: string) {
    this.closeMenus();
    $('body').addClass('noscroll');

    let item = document.querySelector(`li.${menu}`);
    if (item) {
      let x = item.getBoundingClientRect().x;
      let width = item.getBoundingClientRect().width;
      
      $(`div.menu-${menu} i.fas`).css({ 'left':  x});
    }

    $(`div.menu-${menu}`).css({ 'display': 'flex' });
  }

  closeMenus() {
    this.categoriaLista.forEach((categoria: any) => {
      let divCategoria = $(`div.menu-${categoria[0]}`);
      if (divCategoria) {
        divCategoria.hide();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  scrollPage() {
    const win = $(window);

    // this.scrolled = win.scrollTop() > 50;
  }

  overMenu() {
    $('html').addClass('on-menu');
  }

  outMenu() {
    $('html').removeClass('on-menu');
  }

  public toggleMenu() {
    $('aside').toggleClass('open');
    $('body, html').toggleClass('aside-menu-open');
    return false;
  }

  logout() {
    this.perfilService.removerSessao();
    this.router.navigate(['/']);
  }

  getUsuario() {
    return this.perfilService.getSession();
  }

}
