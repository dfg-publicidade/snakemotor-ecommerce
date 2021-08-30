import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LeadServiceService {
  urlServico: string;
  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}/leads`;
  }

  inserir(entity: any): Observable<any> {
    let body = new FormData();

    body.append('celular', entity.value.celular ?  entity.value.celular : '');

    return this.http.post(this.urlServico, body);
  }
}
