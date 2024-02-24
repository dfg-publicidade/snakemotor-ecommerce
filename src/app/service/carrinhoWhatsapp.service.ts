import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CarrinhoWhatsappService {
  urlServico: string;
  KEY_SESSION: string = "CARRINHO_WHATSAPP";

  watchCarrinhoService = new Subject();
  watchCarrinhoService$ = this.watchCarrinhoService.asObservable();

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}`;
  }

  calcularFrete(entity: any): Observable<any> {
    let url = this.urlServico + 'carrinho-wpp';

    let body = new FormData();

    body.append('nome', entity.value.nome);
    return this.http.post(url, body);
  }

  setCarrinho(carrinho: any) {
    sessionStorage.setItem(this.KEY_SESSION, JSON.stringify(carrinho));

    this.watchCarrinhoService.complete();
  }

  getCarrinho(): any {
    let item: any = sessionStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  getCarrinhoVazio(): any {
    return {
      produtos: [],
      cep: '',
      formaEntrega: '',
      cupom: ''
    };
  }

  atualizaCarrinho(): Observable<any> {
    let carrinho = this.getCarrinho();

    let url = `${this.urlServico}/carrinho-wpp`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(url, { carrinho: carrinho }, {
      headers: headers
    });
  }

  removerItemCarrinho(produto: any) {
    let carrinho = this.getCarrinho();

    let itemSelecionado = carrinho.produtos.find((p: any) => p.produto === produto.id);
    let indexItem = carrinho.produtos.indexOf(itemSelecionado);

    carrinho.produtos.splice(indexItem, 1);

    if (carrinho.produtos.length > 0) {
      this.setCarrinho(carrinho);
    } else {
      this.removerCarrinho();
    }

    this.watchCarrinhoService.next();
  }

  removerCarrinho() {
    sessionStorage.removeItem(this.KEY_SESSION);

    this.watchCarrinhoService.next();
  }
}
