import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PerfilService } from './perfil.service';

@Injectable()
export class ProdutoService {
  urlServico: string;
  usuario: any;

  constructor(private http: HttpClient, private perfilService: PerfilService) {
    this.urlServico = environment.urlServico;
  }

  listar(page: number): Observable<any> {
    let url = this.urlServico + 'produto/'  + page;

    return this.http.get(url);
  }

  listarDestaques(limite: number): Observable<any> {
    let url = this.urlServico + 'produto?filtro=true&destaque=true&limite=' + limite;

    return this.http.get(url);
  }

  listarMaisVendidos(limite: number): Observable<any> {
    let url = this.urlServico + 'produto?filtro=true&maisVendidos=true&limite=' + limite;

    return this.http.get(url);
  }

  listarPorNome(q: string, page: number): Observable<any> {
    let url = this.urlServico + 'produto/'  + page + '?filtro=true&produto_filtroNome=' + q;

    return this.http.get(url);
  }

  listarPorCategoria(page: number, categoriaId: number): Observable<any> {
    let url = this.urlServico + 'produto/' + page + '?filtrar=true&produto_filtroCategoria=' + categoriaId;

    return this.http.get(url);
  }

  buscar(page: number, q: string): Observable<any> {
    let url = this.urlServico + 'produto/' + page + '?filtrar=true&produto_filtroNome=' + q;

    return this.http.get(url);
  }

  visualizar(id: number): Observable<any> {
    let url = this.urlServico + 'produto/' + id + "/visualizar";

    return this.http.get(url);
  }
}
