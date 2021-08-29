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

  visualizar(id: number): Observable<any> {
    let url = this.urlServico + 'produto/' + id + "/visualizar";

    return this.http.get(url);
  }
}
