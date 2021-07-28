import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PerfilService {
  urlServico: string;
  urlServicoCliente: string;
  KEY_SESSION: string = "USUARIO";
  watchAutenticacaoService = new Subject();
  watchAutenticacaoService$ = this.watchAutenticacaoService.asObservable();

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'api/';
    this.urlServicoCliente = environment.urlServico;
  }

  login(entity: any): Observable<any> {
    let body = new FormData();

    body.append('email', entity.value.email);
    body.append('senha', entity.value.senha);

    return this.http.post(this.urlServico + 'access-token', body);
  }

  inserir(entity: any): Observable<any> {
    let url = this.urlServicoCliente + 'cliente/inserir';

    let body = new FormData();

    body.append('origem', 'site');
    body.append('tipo', entity.value.tipo);
    body.append('nome', entity.value.nome);
    body.append('apelido', entity.value.apelido);
    body.append('email', entity.value.email);
    if (entity.value.tipo === 'F') {
      body.append('dataNascto', entity.value.dataNascto);
      body.append('cpfCnpj', entity.value.cpf);
      body.append('rgIe', entity.value.rg);
    } else if (entity.value.tipo === 'J') {
      body.append('cpfCnpj', entity.value.cnpj);
      body.append('rgIe', entity.value.ie);
    }
    body.append('telefone', entity.value.telefone);
    body.append('celular', entity.value.celular);
    body.append('senha', entity.value.senha);
    body.append('email', entity.value.email);

    return this.http.post(url, body);
  }

  recuperarSenha(entity: any): Observable<any> {
    let url = this.urlServico + 'recuperacao-senha';

    let body = new FormData();

    body.append('email', entity.value.emailRecuperacaoSenha);

    return this.http.post(url, body);
  }

  visualizar(): Observable<any> {
    let url = this.urlServico + 'cliente';

    return this.http.get(url);
  }

  alterar(entity: any): Observable<any> {
    let url = this.urlServico + 'cliente/alterar';

    let body = new FormData();

    body.append('tipo', entity.value.tipo);
    body.append('nome', entity.value.nome);
    body.append('apelido', entity.value.apelido);
    body.append('email', entity.value.email);
    if (entity.value.tipo === 'F') {
      body.append('dataNascto', entity.value.dataNascto);
      body.append('cpfCnpj', entity.value.cpf);
      body.append('rgIe', entity.value.rg);
    } else if (entity.value.tipo === 'J') {
      body.append('cpfCnpj', entity.value.cnpj);
      body.append('rgIe', entity.value.ie);
    }
    body.append('telefone', entity.value.telefone);
    body.append('celular', entity.value.celular);
    body.append('email', entity.value.email);

    return this.http.post(url, body);
  }

  alterarSenha(entity: any): Observable<any> {
    let url = this.urlServico + 'cliente/alterar-senha';

    let body = new FormData();

    body.append('senhaAtual', entity.value.senhaAtual);
    body.append('senha', entity.value.senha);

    return this.http.post(url, body);
  }

  setSession(usuario: any) {
    localStorage.setItem(this.KEY_SESSION, JSON.stringify(usuario));

    this.watchAutenticacaoService.next();
  }

  getSession(): any {
    let item: any = localStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removerSessao() {
    localStorage.removeItem(this.KEY_SESSION);

    this.watchAutenticacaoService.next();
  }

  removerEndereco(item: any) {
    let usuario = this.getSession();
    let enderecos = this.getSession().enderecos;

    let itemSelecionado = enderecos.find((endereco: any) => endereco.id === item.id);
    let indexItem = enderecos.indexOf(itemSelecionado);

    enderecos.splice(indexItem, 1);

    usuario.enderecos = enderecos;

    this.setSession(usuario);
  }

  adicionarEndereco(enderecos: any) {
    let usuario = this.getSession();

    usuario.enderecos = enderecos;

    this.setSession(usuario);
  }

  logout(): Observable<any> {
    let url = this.urlServico + 'logout';

    return this.http.get(url);
  }
}
