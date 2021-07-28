import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CarrinhoService {
  urlServico: string;
  KEY_SESSION: string = "CARRINHO";

  watchCarrinhoService = new Subject();
  watchCarrinhoService$ = this.watchCarrinhoService.asObservable();

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'api/';
  }

  calcularFrete(entity: any): Observable<any> {
    let url = this.urlServico + 'cliente/inserir';

    let body = new FormData();

    body.append('nome', entity.value.nome);
    return this.http.post(url, body);
  }

  setCarrinho(carrinho: any) {
    localStorage.setItem(this.KEY_SESSION, JSON.stringify(carrinho));

    this.watchCarrinhoService.complete();
  }

  getCarrinho(): any {
    let item: any = localStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removerItemCarrinho(item: any) {
    let carrinho = this.getCarrinho();

    let itemSelecionado = carrinho.find((produto: any) => produto.id === item.id);
    let indexItem = carrinho.indexOf(itemSelecionado);

    carrinho.splice(indexItem, 1);

    if (carrinho.length > 0) {
      this.setCarrinho(carrinho);
    } else {
      this.removerCarrinho();
    }

    this.watchCarrinhoService.next();
  }

  removerCarrinho() {
    localStorage.removeItem(this.KEY_SESSION);

    this.watchCarrinhoService.next();
  }
}
