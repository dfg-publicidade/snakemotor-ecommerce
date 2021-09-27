import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PaginaService {
  urlServico: string;
  prefix: string = 'pagina';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiCMS}/${environment.versao}/paginas`;
  }

  buscarPorPermalink(permalink: string): Observable<any> {
    let url = `${this.urlServico}?${this.prefix}.permalink=${permalink}`;

    return this.http.get(url);
  }
}
