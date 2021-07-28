import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfiguracaoService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'configuracao';
  }

  buscar(): Observable<any> {
    let url = this.urlServico;

    return this.http.get(url);
  }
}
