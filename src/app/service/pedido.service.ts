import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PedidoService {
  urlServico: string;
  urlServicoPedido: string;
  KEY_SESSION: string = "PEDIDO";

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'api/carrinho/';
    this.urlServicoPedido = environment.urlServico + 'api/pedido/';
  }

  listar(page: number): Observable<any> {
    let url = this.urlServicoPedido + page;

    return this.http.get(url);
  }

  visualizar(id: number): Observable<any> {
    let url = this.urlServicoPedido + id + "/visualizar";

    return this.http.get(url);
  }

  rastreamento(id: number): Observable<any> {
    let url = this.urlServicoPedido + id + "/rastreamento";

    return this.http.get(url);
  }

  cancelar(id: number, entity: any): Observable<any> {
    let url = this.urlServicoPedido + id + "/cancelar";

    let body = new FormData();
    body.append('motivo', entity.value.motivoCancelamento);
    
    return this.http.post(url, body);
  }

  resumo(carrinho): Observable<any> {
    let url = this.urlServico + 'confirmacao';

    let body = new FormData();
    body.append('carrinho', JSON.stringify(carrinho))
    return this.http.post(url, body);
  }

  concluirPedido(carrinho): Observable<any> {
    let url = this.urlServico + 'pedido';

    let body = new FormData();
    body.append('origem', 'site')
    body.append('carrinho', JSON.stringify(carrinho))
    return this.http.post(url, body);
  }

  setPedidoConcluido(pedido: string) {
    localStorage.setItem(this.KEY_SESSION, JSON.stringify(pedido));
  }

  getPedidoConcluido(): any {
    return JSON.parse(localStorage.getItem(this.KEY_SESSION));
  }

  removerPedidoConcluido() {
    localStorage.removeItem(this.KEY_SESSION);
  }
}
