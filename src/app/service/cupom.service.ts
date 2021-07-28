import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CupomService {
  urlServico: string;
  private KEY_SESSION: string = 'CUPOM';

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'api/carrinho/cupom/';
  }

  buscar(carrinho: any): Observable<any> {
    let url = this.urlServico;

    let body = new FormData();
    body.append('carrinho', JSON.stringify(carrinho));

    return this.http.post(url, body);
  }

  setCupom(cupom: any) {
    localStorage.setItem(this.KEY_SESSION, JSON.stringify(cupom));
  }

  getCupom(): any {
    let item: any = localStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removeCupom(): any{
    localStorage.removeItem(this.KEY_SESSION);
  }
}
