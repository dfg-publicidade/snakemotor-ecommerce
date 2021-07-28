import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class UfService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico  + 'uf/todos';
  }

  listar(): Observable<any> {
    return this.http.get(this.urlServico);
  }
}
