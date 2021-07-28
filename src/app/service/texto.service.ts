import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TextoService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'pagina/';
  }

  visualizar(tipoPagina: string): Observable<any> {
    return this.http.get(this.urlServico + tipoPagina + '/origem');
  }
}
