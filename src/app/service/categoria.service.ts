import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoriaService {
  urlServico: string;
  prefix: string = 'categoria';
  KEY_SESSION: string = 'categorias_principais';
  categoriasPrincipais: string = 'capacetes,vestuario,acessorios,escapamentos,pneu';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/categorias`;
  }

  buscarDestaque(limite: number, aleatorio: boolean): Observable<any> {
    let url = `${this.urlServico}`;

    url += `?_limit=${limite}`;
    url += `&${this.prefix}.destaqueHome=true`;

    if (aleatorio) {
      url += `&aleatorio=${aleatorio}`;
    }

    return this.http.get(url);
  }

  buscarPorPermalink(permalink: string): Observable<any> {
    let url = `${this.urlServico}`;

    url += `?${this.prefix}.permalink=${permalink}`;

    return this.http.get(url);
  }

  listarPorSuperCategorias(categoriasPermalink: string): Observable<any> {
    let timestamp = new Date().getTime();

    let url = `${this.urlServico}`;

    url += `?_nopaginate=true`;
    url += `&${this.prefix}.permalink=${categoriasPermalink}&destaque=true`;
    url += `&_fields=content(${categoriasPermalink})`;

    url += `&timestamp=${timestamp}`;

    return this.http.get(url);
  }

  visualizar(id: number): Observable<any> {
    let url = this.urlServico + 'produto/' + id + '/visualizar';

    return this.http.get(url);
  }

  setCategoriasPrincipais(categorias: any) {
    sessionStorage.setItem(this.KEY_SESSION, JSON.stringify(categorias));
  }

  getCategoriasPrincipais(): any {
    let item: any = localStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removerCategoriasPrincipais() {
    sessionStorage.removeItem(this.KEY_SESSION);
  }
}
