import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PerfilService } from './perfil.service';

@Injectable()
export class PagamentoService {
  urlServico: string;
  usuario: any;

  constructor(private http: HttpClient, private perfilService: PerfilService) {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}`;
  }
}