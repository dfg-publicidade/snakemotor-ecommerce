import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class VariacaoOpcaoService {
  urlServico: string;
  prefix: string = 'variacaoOpcao';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/variacao-opcoes`;
  }

  listarTodas(variacaoId?: string): Observable<any> {
    let url = `${this.urlServico}?_nopaginate=true`;

    if (variacaoId) {
      url += `&${this.prefix}.variacao.id=${variacaoId}`;
    }

    return this.http.get(url);
  }
}
