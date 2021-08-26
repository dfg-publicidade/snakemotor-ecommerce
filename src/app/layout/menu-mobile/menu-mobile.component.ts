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
    if (!loadMore) {
      this.loadingCategoriaService = true;
    } else {
      this.load = true;
    }

    this.categoriaService.listar(this.page)
      .subscribe(
        result => {
          this.loadingCategoriaService = false;
          this.load = false;
          if (result) {
            if (!loadMore) {
              this.categorias = result.entities;
              this.total = result.total;

              if (!this.categorias) {
                this.configAlert = {
                  id: 'categoria',
                  titulo: 'Atenção',
                  mensagem: result.message
                }
              }
            } else {
              result.entities.forEach((entity: any) => {
                this.categorias.push(entity);
              });
            }

            this.infiniteScroll = this.categorias.length < this.total;

          } else {
            this.configAlert = {
              id: 'categoria',
              titulo: 'Atenção',
              mensagem: 'Ocorreu um erro ao listar as categorias'
            }
          }
        },
        (error) => {
          this.configAlert = {
            id: 'categoria',
            titulo: 'Atenção',
            mensagem: 'Ocorreu um erro ao listar as categorias'
          }
        }
      );
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
