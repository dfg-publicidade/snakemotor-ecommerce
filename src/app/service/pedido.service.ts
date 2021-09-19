import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarrinhoService } from './carrinho.service';

@Injectable()
export class PedidoService {
  urlServico: string;
  KEY_SESSION: string = "PEDIDO";

  constructor(private http: HttpClient, private carrinhoService: CarrinhoService) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/pedidos`;
  }

  listar(page: number): Observable<any> {
    let url = `${this.urlServico}/${page}`;

    return this.http.get(url);
  }

  visualizar(id: number): Observable<any> {
    let url = `${this.urlServico}/${id}`;

    return this.http.get(url);
  }

  rastreamento(id: number): Observable<any> {
    let url = `${this.urlServico}/${id}/rastreamento`;

    return this.http.get(url);
  }

  concluirPedido(carrinho: any): Observable<any> {
    let url = this.urlServico;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(url, { carrinho: carrinho }, {
      headers: headers
    });
  }

  setPedidoCache(carrinho: any) {
    sessionStorage.setItem(this.KEY_SESSION, JSON.stringify(carrinho));
  }

  getPedidoCache(): any {
    let item: any = sessionStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removerPedidoCache() {
    sessionStorage.removeItem(this.KEY_SESSION);
  }
}
