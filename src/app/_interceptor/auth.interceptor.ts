import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PerfilService } from '../service/perfil.service';
declare var $: any;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    usuario: any;
    // ignoreRoutes = ['ouvidoria', 'certificados', 'documentos', 'tcc', 'calendario', 'revista', 'testecovid', 'indicamed', 'sorteio', 'graduacao', 'pos-graduacao', 'segunda-graduacao', 'colacao-fotos'];

    constructor(private router: Router, private perfilService: PerfilService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.usuario = this.perfilService.getSession();

        if (!this.usuario) {
            request = request.clone({
                setHeaders: {
                    'CLIENT_ID': environment.CLIENT_ID,
                    'domain': environment.domain
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    'CLIENT_ID': environment.CLIENT_ID,
                    'domain': environment.domain,
                    'Authorization': `${this.usuario ? this.usuario.token : ''}`
                }
            });
        }

        return next.handle(request)
            .pipe(
                catchError((error, caught) => {
                    switch (error.status) {
                        case 0:
                            // this.router.navigate(['/500'], { skipLocationChange: true });
                            break;
                        case 401:
                            this.perfilService.removerSessao();
                            location.href = '/';

                            break;
                        case 404:
                            this.router.navigate(['/404'], { skipLocationChange: true });

                            break;
                    }

                    return Promise.reject(error);
                })
            );
    }
}
