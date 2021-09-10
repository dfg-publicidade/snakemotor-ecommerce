import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class EstadoService {
  urlServico: string;
  prefix: string = 'estado';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiSYS}/${environment.versao}/estados`;
  }

  listarPorNomePais(nomePais: string): Observable<any> {
    let url = `${this.urlServico}?_nopaginate=true&${this.prefix}.pais.nome=${nomePais}`;
    return this.http.get(url);
  }

  buscarPorSigla(sigla: string): Observable<any> {
    let url = `${this.urlServico}?_nopaginate=true&${this.prefix}.sigla=${sigla}`;
    return this.http.get(url);
  }
}
