import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProdutoService {
  urlServico: string;
  prefix: string = 'produto';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/produtos`;
  }
  buscarPorPermalink(permalink: string): Observable<any> {
    let url = `${this.urlServico}`

    url += `?${this.prefix}.permalink=${permalink}`;

    return this.http.get(url);
  }
}