import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PerfilService } from './perfil.service';

@Injectable()
export class FavoritoService {
  urlServico: string;
  usuario: any;

  constructor(private http: HttpClient, private perfilService: PerfilService) {
    this.urlServico = environment.urlServico + 'api/cliente/';
  }

  listar(): Observable<any> {
    let url = this.urlServico + 'favoritos';

    return this.http.get(url);
  }

  buscar(q: string): Observable<any> {
    let url = this.urlServico + 'favoritos?filtrar=true&produto_filtroNome=' + q;

    return this.http.get(url);
  }

  favoritar(entity: any, possuiFavorito: any): Observable<any> {
    this.usuario = this.perfilService.getSession();

    let url = this.urlServico + 'favoritos/alterar';

    let body = new FormData();

    body.append('produto', entity.id);
    body.append('adicionar', possuiFavorito ? 'false' : 'true');

    return this.http.post(url, body);
  }
}
