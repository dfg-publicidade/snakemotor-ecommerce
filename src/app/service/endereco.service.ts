import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class EnderecoService {
  urlServico: string;
  private KEY_SESSION: string = 'ENDERECO_FRETE';

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'api/cliente/endereco/';
  }

  inserir(entity: any): Observable<any> {
    let url = this.urlServico + 'inserir';

    let body = new FormData();

    body.append('cep', entity.value.cep);
    body.append('endereco', entity.value.endereco);
    body.append('numero', entity.value.numero);
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('cidade', entity.value.cidade);
    body.append('bairro', entity.value.bairro);

    return this.http.post(url, body);
  }

  visualizar(enderecoId: number): Observable<any> {
    let url = this.urlServico +  enderecoId + '/visualizar';

    return this.http.get(url);
  }

  alterar(enderecoId: number, entity: any): Observable<any> {
    let url = this.urlServico  +  enderecoId + '/alterar';

    let body = new FormData();

    body.append('cep', entity.value.cep);
    body.append('endereco', entity.value.endereco);
    body.append('numero', entity.value.numero);
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('cidade', entity.value.cidade);
    body.append('bairro', entity.value.bairro);

    return this.http.post(url, body);
  }

  excluir(enderecoId: number): Observable<any> {
    let url = this.urlServico   +  enderecoId + '/excluir';

    return this.http.get(url);
  }

  setEndereco(endereco: string) {
    localStorage.setItem(this.KEY_SESSION, JSON.stringify(endereco));
  }

  getEndereco(): any {
    let item: any = localStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removerEndereco() {
    localStorage.removeItem(this.KEY_SESSION);
  }
}
