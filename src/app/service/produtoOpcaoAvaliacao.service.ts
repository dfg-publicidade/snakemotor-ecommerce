import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProdutoOpcaoAvaliacaoService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/produto-avaliacoes`;
  }

  avaliar(produtoId: any, entity: any): Observable<any> {
    let url = `${this.urlServico}`;

    let body = new FormData();

    body.set('produto', produtoId);
    body.set('avaliacao', entity.value.avaliacao);
    body.append('observacao', entity.value.observacao);

    return this.http.post(url, body);
  }
}
