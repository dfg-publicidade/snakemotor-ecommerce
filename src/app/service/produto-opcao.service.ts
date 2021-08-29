import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProdutoOpcaoService {
  urlServico: string;
  prefix: string = 'produtoOpcao';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/produto-opcoes?loja=true`;
  }

  listar(page: number): Observable<any> {
    let url = `${this.urlServico}`;

    url += `&_page=${page}`;

    return this.http.get(url);
  }

  listarDestaques(limite: number, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}`;

    url += `&_limit=${limite}`;
    url += `&${this.prefix}.produto.destaque=true`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  listarPorCategoria(categoriaId: string, limite: number, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}`;

    url += `&_limit=${limite}`;
    url += `&${this.prefix}.produto.categoria.id=${categoriaId}`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  listarPorIdsProdutoPrincipal(ids: any, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}`;

    url += `?produtos=${ids.join()}`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    url += `&_sort:${this.prefix}.produto.nome:asc`;

    return this.http.get(url);
  }

  visualizar(id: number): Observable<any> {
    let url = this.urlServico + 'produto/' + id + "/visualizar";

    return this.http.get(url);
  }
}
