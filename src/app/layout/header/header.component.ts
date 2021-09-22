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

  constructor(private router: Router, private categoriaService: CategoriaService, private perfilService: PerfilService, private carrinhoService: CarrinhoService, private configuracaoService: ConfiguracaoService) {

  }

  ngOnInit() {
    // this.buscarConfiguracao();
    // this.listarCategorias();

    // $('li.item-menu').hover(function () {
    //   $('body').addClass('noscroll');
    // },
    //   function () {
    //     $('body').removeClass('noscroll');
    //   });
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
  }

  getCarrinho() {
    return this.carrinhoService.getCarrinho();
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
