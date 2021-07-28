import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CidadeService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico;
  }

  listarPorUf(idUf: number): Observable<any> {
    let url = this.urlServico + 'uf/' + idUf + '/cidades';

    return this.http.get(url);
  }
}
