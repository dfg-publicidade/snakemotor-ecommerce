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

    constructor(private router: Router, private perfilService: PerfilService) {
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.usuario = this.perfilService.getSession();

        if (!this.usuario) {
            request = request.clone({
                setHeaders: {
                    'Clientid': environment.CLIENT_ID
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    'Clientid': environment.CLIENT_ID,
                    'Token': `${this.usuario ? this.usuario.token : ''}`
                }
            });
        }

        return next.handle(request)
            .pipe(
                catchError((error, caught) => {
                    if (error.status === 0) {
                        this.router.navigate(['indisponivel'], { skipLocationChange: true });
                    } else {

                    }

                    return Promise.reject(error);
                })
            );
    }
}
