import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoWhatsappService } from './carrinhoWhatsapp.service';

@Injectable()
export class PedidoWhatsappService {
  urlServico: string;
  KEY_SESSION: string = "PEDIDO_WHATSAPP";

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/pedidos-wpp`;
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
