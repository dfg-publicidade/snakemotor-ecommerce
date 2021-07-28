import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BannerService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'banner';
  }

  listar(posicao: string): Observable<any> {
    let url = this.urlServico;

    url += '?filtro=true&filtro_posicaoTipo=SITE&filtro_posicaoNome=' + posicao;

    return this.http.get(url);
  }
}
