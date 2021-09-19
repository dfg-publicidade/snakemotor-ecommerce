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
    let url = `${this.urlServico}?_nopaginate=true`;

    return this.http.get(url);
  }

  listar(page: number): Observable<any> {
    let url = `${this.urlServico}?_page=${page}`;

    return this.http.get(url);
  }

  inserir(entity: any): Observable<any> {
    let url = this.urlServico;

    let body = new FormData();

    body.append('cep', entity.value.cep ? entity.value.cep : '');
    body.append('logradouro', entity.value.logradouro ? entity.value.logradouro : '');
    body.append('numero', entity.value.numero ? entity.value.numero : '');
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('bairro', entity.value.bairro ? entity.value.bairro : '');
    body.append('cidade', entity.value.cidade ? entity.value.cidade : '');
    body.append('principal', entity.value.principal ? entity.value.principal : false);

    return this.http.post(url, body);
  }

  visualizar(enderecoId: string): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}`;

    return this.http.get(url);
  }

  alterar(enderecoId: string, entity: any): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}`;

    let body = new FormData();

    body.append('cep', entity.value.cep ? entity.value.cep : '');
    body.append('logradouro', entity.value.logradouro ? entity.value.logradouro : '');
    body.append('numero', entity.value.numero ? entity.value.numero : '');
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('bairro', entity.value.bairro ? entity.value.bairro : '');
    body.append('cidade', entity.value.cidade ? entity.value.cidade : '');
    body.append('principal', entity.value.principal ? entity.value.principal : false);

    return this.http.put(url, body);
  }

  excluir(enderecoId: string): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}`;

    return this.http.delete(url);
  }
}
