import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoriaService {
  urlServico: string;

  constructor(private http: HttpClient) {
    this.urlServico = environment.urlServico + 'categoria/';
  }

  listar(page: number): Observable<any> {
    let url = this.urlServico + page;

    return this.http.get(url);
  }

  listarDestaques(): Observable<any> {
    let url =  environment.urlServico + 'categorias-destaque/';

    return this.http.get(url);
  }


  visualizar(id: number): Observable<any> {
    return this.http.get(this.urlServico + id + '/visualizar');
  }
}
