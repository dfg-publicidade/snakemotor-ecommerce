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
  categorias: any;

  constructor(private router: Router, private categoriaService: CategoriaService, private perfilService: PerfilService, private carrinhoService: CarrinhoService, private configuracaoService: ConfiguracaoService) {

  }

  ngOnInit() {
    // this.buscarConfiguracao();

    this.listarCategorias();
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

  listarCategorias() {
    let categoriasPrincipais = this.categoriaService.categoriasPrincipais;

    this.categoriaService.listarPorSuperCategorias(categoriasPrincipais)
      .subscribe(
        result => {
          this.categorias = Object.entries(result.content);

          this.categoriaService.setCategoriasPrincipais(this.categorias);

          setTimeout(() => {
            $('li.item-menu').hover(() => {
              //
            },
              () => {
                this.closeMenus();
                $('body').removeClass('noscroll');
                $('header').removeClass('open-menu');
              });
          }, 100);
        }
      );
  }

  getCarrinho() {
    return this.carrinhoService.getCarrinho();
  }

  openMenu(menu: string) {
    this.closeMenus();
    $('body').addClass('noscroll');
    $('header').addClass('open-menu');

    let item = document.querySelector(`li.${menu}`);
    if (item) {
      let x = item.getBoundingClientRect().x;
      let width = item.getBoundingClientRect().width;

      $(`i.fa-sort-up`).css({ 'left': x + (width / 2) });
    }

    $(`div.menu-${menu}`).css({ 'display': 'flex' });
  }

  closeMenus() {
    this.categoriaService.categoriasPrincipais.split(',').forEach((categoria: any) => {
      let divCategoria = $(`div.menu-${categoria}`);
      if (divCategoria) {
        divCategoria.hide();
      }
    });
  }

  getCapaCategoria(categorias: any): string {
    if (categorias && categorias[0] && categorias[0].supercategoria && categorias[0].supercategoria.imagem) {
      return categorias[0].supercategoria.imagem ? categorias[0].supercategoria.imagem.original : '';
    } else {
      return ''
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollPage() {
    const win = $(window);

    this.scrolled = win.scrollTop() > 50;
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
