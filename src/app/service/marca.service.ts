import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarcaService {
  urlServico: string;
  prefix: string = 'marca';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/marcas`;
  }

  listarTodas(ativa: boolean, aleatorio: boolean, destaque: boolean, qtde?: number): Observable<any> {
    let url = `${this.urlServico}?${this.prefix}.destaque=${destaque}`;

    if (aleatorio) {
      url += `&${this.prefix}.aleatorio=${aleatorio}`;
    }
    if (ativa) {
      url += `&${this.prefix}.ativa=${ativa}`;
    }

    if (qtde) {
      url += `&_limit=${qtde}`;
    }

    return this.http.get(url);
  }

  visualizar(id: string): Observable<any> {
    let url = `${this.urlServico}/${id}`;

    return this.http.get(url);
  }
}
