import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoriaService {
  urlServico: string;
  prefix: string = 'categoria';

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

  listarPorSuperCategorias(categoriaPermalink: string): Observable<any> {
    let url = `${this.urlServico}`;

    url += `?_nopaginate=true`;
    url += `&${this.prefix}.supercategoria.permalink=${categoriaPermalink}`;

    return this.http.get(url);
  }

  visualizar(id: number): Observable<any> {
    let url = this.urlServico + 'produto/' + id + "/visualizar";

    return this.http.get(url);
  }
}
