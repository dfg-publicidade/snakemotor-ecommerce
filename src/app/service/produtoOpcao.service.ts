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

  listar(page: number, filter: any): Observable<any> {
    let url = `${this.urlServico}?agrupar=cor&filtros=true`;

    let params = '';

    $.each(filter, function (index: string, value: string) {
      if (value) {
        params += '&' + index + '=' + value;
      }
    });

    url += `${params}`;
    url += `&_page=${page}`;
    url += `&_sort=${this.prefix}.produto.dataCriacao:desc`

    return this.http.get(url);
  }

  listarPorProduto(produto: any): Observable<any> {
    let url = `${this.urlServico}?_nopaginate=true&agrupar=cor`;

    url += `&${this.prefix}.produto.id=${produto.id}`;

    return this.http.get(url);
  }

  listarDestaques(limite: number, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}?agrupar=cor`;

    url += `&_limit=${limite}`;
    url += `&${this.prefix}.produto.destaque=true`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  listarPorCategoria(categoriaId: string, limite: number, aleatorio: boolean, ignore?: string): Observable<any> {
    let url = `${this.urlServico}?agrupar=cor`;

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
    let url = `${this.urlServico}?agrupar=cor`;

    url += `&produtos=${ids.join()}`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  buscarPorPermalink(permalink: string): Observable<any> {
    let url = `${this.urlServico}`

    url += `&${this.prefix}.produto.permalink=${permalink}`;

    return this.http.get(url);
  }

  listarPorProdutoComAgrupamento(produtoId: string, agrupamento: string, filtros: any, ignore?: string): Observable<any> {
    let url = `${this.urlServico}`

    url += `?${this.prefix}.produto.id=${produtoId}`;
    url += `&agrupar=${agrupamento}`;

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
