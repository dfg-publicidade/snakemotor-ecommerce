import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class FreteService {
  urlServico: string;
  KEY_SESSION: string = "FRETE";

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'api/carrinho/frete';
  }

  listar(carrinho): Observable<any> {
    let url = this.urlServico;

    let body = new FormData();
    body.append('carrinho', JSON.stringify(carrinho))
    return this.http.post(url, body);
  }

  setFrete(frete: string) {
    localStorage.setItem(this.KEY_SESSION, JSON.stringify(frete));
  }

  getFrete(): any {
    return JSON.parse(localStorage.getItem(this.KEY_SESSION));
  }

  removerFrete() {
    localStorage.removeItem(this.KEY_SESSION);
  }
}
