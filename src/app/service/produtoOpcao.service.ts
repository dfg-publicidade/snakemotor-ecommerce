import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

declare var $: any;

@Injectable()
export class ProdutoOpcaoService {
  urlServico: string;
  prefix: any = 'produtoOpcao';


  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/produto-opcoes`;
  }

  listar(page: number, filter: any, order: any): Observable<any> {
    let url = `${this.urlServico}?agrupar=true&filtros=true&_limit=21`;

    let params = '';

    $.each(filter, function (index: string, value: any) {
      if (value && value.id) {
        params += '&' + index + '=' + value.id;
      }
    });

    url += `${params}`;
    url += `&_page=${page}`;

    if (order) {
      url += `&_sort=${order}`;
    } else {
      url += `&_sort=${this.prefix}.produto.dataCriacao:desc`
    }

    return this.http.get(url);
  }

  buscarProduto(busca: any): Observable<any> {
    let url = `${this.urlServico}?agrupar=true&_nopaginate=true`;

    url += `&nome=${busca}`;

    return this.http.get(url);
  }

  listarPorProduto(produto: any): Observable<any> {
    let url = `${this.urlServico}?agrupar=true&_nopaginate=true`;

    url += `&${this.prefix}.produto.id=${produto.id}`;

    return this.http.get(url);
  }

  listarDestaques(limite: number, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}?agrupar=true`;

    url += `&_limit=${limite}`;
    url += `&${this.prefix}.destaque=true`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  listarPorCategoria(categoriaId: string, limite: number, aleatorio: boolean, ignore?: string): Observable<any> {
    let url = `${this.urlServico}?agrupar=true`;

    url += `&_limit=${limite}`;
    url += `&${this.prefix}.produto.categoria.id=${categoriaId}`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    if (ignore) {
      url += `&ignore=${ignore}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  listarPorIdsProdutoPrincipal(ids: any, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}?agrupar=true`;

    url += `&produtos=${ids.join()}`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  buscarPorPermalink(permalink: string): Observable<any> {
    let url = `${this.urlServico}?agrupar=true`

    url += `&${this.prefix}.produto.permalink=${permalink}`;

    return this.http.get(url);
  }

  listarPorProdutoComAgrupamento(produtoId: string, agrupamento: string, filtros: any, ignore?: string): Observable<any> {
    let url = `${this.urlServico}?agrupar=${agrupamento}`

    url += `&${this.prefix}.produto.id=${produtoId}`;

    if (ignore) {
      url += `&ignore=${ignore}`;
    }

    if (filtros && filtros.length > 0) {
      filtros.forEach((filtro: any) => {
        let f = `&${this.prefix}.${filtro.permalink}.id=${filtro.id}`;
        url += `${f}`;
      });

    }

    let sort = `${this.prefix}.${agrupamento}.nome:asc`;

    url += `&_sort=${sort}`;

    return this.http.get(url);
  }

  visualizar(id: string): Observable<any> {
    let url = `${this.urlServico}/${id}`

    return this.http.get(url);
  }
}
