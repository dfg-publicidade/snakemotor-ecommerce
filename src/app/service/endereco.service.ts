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
    const data = entity && typeof entity.getRawValue === 'function' ? entity.getRawValue() : (entity?.value || entity || {});

    body.append('cep', data.cep ? data.cep : '');
    body.append('logradouro', data.logradouro ? data.logradouro : '');
    body.append('numero', data.numero ? data.numero : '');
    body.append('complemento', data.complemento ? data.complemento : '');
    body.append('bairro', data.bairro ? data.bairro : '');
    body.append('cidade', data.cidade ? data.cidade : '');
    body.append('principal', data.principal ? data.principal : false);

    return this.http.post(url, body);
  }

  visualizar(enderecoId: string): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}`;

    return this.http.get(url);
  }

  alterar(enderecoId: string, entity: any): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}`;

    let body = new FormData();
    const data = entity && typeof entity.getRawValue === 'function' ? entity.getRawValue() : (entity?.value || entity || {});

    body.append('cep', data.cep ? data.cep : '');
    body.append('logradouro', data.logradouro ? data.logradouro : '');
    body.append('numero', data.numero ? data.numero : '');
    body.append('complemento', data.complemento ? data.complemento : '');
    body.append('bairro', data.bairro ? data.bairro : '');
    body.append('cidade', data.cidade ? data.cidade : '');
    body.append('principal', data.principal ? data.principal : false);

    return this.http.put(url, body);
  }

  excluir(enderecoId: string): Observable<any> {
    let url = `${this.urlServico}/${enderecoId}`;

    return this.http.delete(url);
  }
}
