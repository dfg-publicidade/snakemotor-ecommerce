import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PerfilService {
  urlServicoAutenticacao: string;
  urlServico: string;
  KEY_SESSION: string = "USUARIO";
  watchAutenticacaoService = new Subject();
  watchAutenticacaoService$ = this.watchAutenticacaoService.asObservable();

  constructor(private http: HttpClient) {
    this.urlServicoAutenticacao = `${environment.urlServico}${environment.apiAUTH}/${environment.versao}`;
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}`;
  }

  login(entity: any): Observable<any> {
    let url = `${this.urlServicoAutenticacao}/access-token`
    let body = new FormData();

    body.append('email', entity.value.email);
    body.append('senha', entity.value.senha);

    return this.http.post(url, body);
  }

  inserir(entity: any): Observable<any> {
    let url = `${this.urlServico}/clientes`;

    let body = new FormData();

    body.append('nome', entity.value.nome ? entity.value.nome : '');
    body.append('email', entity.value.email ? entity.value.email : '');
    body.append('senha', entity.value.senha ? entity.value.senha : '');
    body.append('tipo', entity.value.tipo ? entity.value.tipo : '');
    body.append('cpfCnpj', entity.value.cpfCnpj ? entity.value.cpfCnpj : '');
    body.append('celular', entity.value.celular ? entity.value.celular : '');
    body.append('telefone', entity.value.telefone ? entity.value.telefone : '');
    body.append('aceiteOferta', entity.value.aceiteOferta ? entity.value.aceitaOferta : false);
    body.append('aceiteContato', entity.value.aceiteContato ? entity.value.aceiteContato : false);

    if (entity.value.tipo === 'FISICA') {
      body.append('dataNascto', entity.value.dataNascto ? entity.value.dataNascto : '');
    }

    body.append('cep', entity.value.cep ? entity.value.cep : '');
    body.append('logradouro', entity.value.logradouro ? entity.value.logradouro : '');
    body.append('numero', entity.value.numero ? entity.value.numero : '');
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('bairro', entity.value.bairro ? entity.value.bairro : '');
    body.append('cidade', entity.value.cidade ? entity.value.cidade : '');

    return this.http.post(url, body);
  }

  envioEmailRecuperacaoSenha(entity: any): Observable<any> {
    let url = `${this.urlServicoAutenticacao}/recuperacao-senha`;

    let body = new FormData();
    body.append('email', entity.value.email);

    return this.http.post(url, body);
  }

  recuperarSenha(entity: any): Observable<any> {
    let url = `${this.urlServicoAutenticacao}/recuperacao-senha`;

    let body = new FormData();
    body.append('id', entity.value.id);
    body.append('hash', entity.value.hash);
    body.append('senha', entity.value.senha);

    return this.http.put(url, body);
  }

  visualizar(): Observable<any> {
    let url = this.urlServico + 'cliente';

    return this.http.get(url);
  }

  alterar(entity: any): Observable<any> {
    let url = `${this.urlServico}/cliente`;

    let body = new FormData();

    body.append('nome', entity.value.nome ? entity.value.nome : '');
    body.append('email', entity.value.email ? entity.value.email : '');
    body.append('senha', entity.value.senha ? entity.value.senha : '');
    body.append('tipo', entity.value.tipo ? entity.value.tipo : '');
    body.append('cpfCnpj', entity.value.cpfCnpj ? entity.value.cpfCnpj : '');
    body.append('celular', entity.value.celular ? entity.value.celular : '');
    body.append('telefone', entity.value.telefone ? entity.value.telefone : '');

    if (entity.value.tipo === 'FISICA') {
      body.append('dataNascto', entity.value.dataNascto ? entity.value.dataNascto : '');
    }

    body.append('cep', entity.value.cep ? entity.value.cep : '');
    body.append('logradouro', entity.value.logradouro ? entity.value.logradouro : '');
    body.append('numero', entity.value.numero ? entity.value.numero : '');
    body.append('complemento', entity.value.complemento ? entity.value.complemento : '');
    body.append('bairro', entity.value.bairro ? entity.value.bairro : '');
    body.append('cidade', entity.value.cidade ? entity.value.cidade : '');

    return this.http.put(url, body);
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
