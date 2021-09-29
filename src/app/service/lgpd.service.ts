import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class LgpdService {
  urlServico: string;
  KEY_SESSION: string = 'pltpvtlgpd';

  constructor() {
    this.urlServico = `${environment.urlServico}${environment.apiApp}/${environment.versao}`;
  }

  setSession() {
    localStorage.setItem(this.KEY_SESSION, 'true');
  }

  getSession(): any {
    let item: any = localStorage.getItem(this.KEY_SESSION);
    return JSON.parse(item);
  }

  removerSessao() {
    localStorage.removeItem(this.KEY_SESSION);
  }
}