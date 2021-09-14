import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class EnderecoService {
  urlServico: string;
  prefix: any = 'endereco';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/cliente-enderecos`;
  }

  listarTodos(): Observable<any> {
    let url = this.urlServico;

    return this.http.get(url);
  }

  inserir(entity: any): Observable<any> {
    let url = this.urlServico + 'inserir';

    let body = new FormData();

    body.append('cep', entity.value.cep ? entity.value.cep : '');
    body.append('logradouro', entity.value.logradouro ? entity.value.logradouro : '');
    body.append('numero', entity.value.numero ? entity.value.numero : '');
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('bairro', entity.value.bairro ? entity.value.bairro : '');
    body.append('cidade', entity.value.cidade ? entity.value.cidade : '');

    return this.http.post(url, body);
  }

  visualizar(enderecoId: number): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}/visualizar`;

    return this.http.get(url);
  }

  alterar(enderecoId: number, entity: any): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}/visualizar`;

    let body = new FormData();

    body.append('cep', entity.value.cep ? entity.value.cep : '');
    body.append('logradouro', entity.value.logradouro ? entity.value.logradouro : '');
    body.append('numero', entity.value.numero ? entity.value.numero : '');
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('bairro', entity.value.bairro ? entity.value.bairro : '');
    body.append('cidade', entity.value.cidade ? entity.value.cidade : '');

    return this.http.post(url, body);
  }

  excluir(enderecoId: number): Observable<any> {
    let url = this.urlServico + enderecoId + '/excluir';

    return this.http.get(url);
  }
}
