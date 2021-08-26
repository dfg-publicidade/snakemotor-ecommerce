import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BannerService {
  urlServico: string;
  prefix: string = 'banner';

  constructor(private http: HttpClient) {
    this.urlServico = `${environment.urlServico}${environment.apiCMS}/${environment.versao}/banners`;
  }

  listarPorPosicao(tipoId: string): Observable<any> {
    let url = `${this.urlServico}?${this.prefix}.tipo.id=${tipoId}&_sort=${this.prefix}.ordem:asc`;

    // url += `&_fields=content(items(imagem,imagemMobile,_id,produtos,url))`;

    return this.http.get(url);
  }
}
