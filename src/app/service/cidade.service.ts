import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CidadeService {
  urlServico: string;
  prefix: string = 'cidade';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiSYS}/${environment.versao}/cidades`;
  }

  listarPorEstado(estadoId: string, cidadeNome?: string): Observable<any> {
    let url = `${this.urlServico}?_nopaginate=true`;
    url += `&${this.prefix}.estado.id=${estadoId}`;

    if (cidadeNome) {
      url += `&${this.prefix}.cidade.nome=${cidadeNome}`;
    }

    return this.http.get(url);
  }
}
